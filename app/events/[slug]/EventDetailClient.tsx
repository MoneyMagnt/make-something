"use client";

import { Button, Card, CardBody, Chip, Image, Input, Link, Textarea } from "@heroui/react";
import MuxPlayer from "@mux/mux-player-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ZyraSiteNav } from "@/components/ZyraSiteNav";
import { ZyraBrandMark } from "@/components/ZyraBrandMark";
import {
  EVENT_CONTROL_DEFAULTS,
  EVENT_TRACK_SESSION_KEY,
  type EventControl,
  type EventFeatureKey,
  type EventPublicSnapshot,
} from "@/lib/eventOps";
import type { EventMeta, TicketItem } from "@/lib/eventsData";

type EventDetailClientProps = {
  event: EventMeta;
  tickets: TicketItem[];
  venusFreePassLimit: number;
};

type FanCamMoment = {
  id: string;
  event: EventMeta["name"];
  kind: "image" | "video";
  name: string;
  createdAt: number;
  src?: string;
  playbackId?: string;
};

const FAN_CAM_REFRESH_MS = 60000;
const isDocumentVisible = () =>
  typeof document === "undefined" || document.visibilityState === "visible";

const normalizeFanCamMoment = (entry: unknown): FanCamMoment | null => {
  if (!entry || typeof entry !== "object") {
    return null;
  }

  const item = entry as {
    id?: unknown;
    event?: unknown;
    kind?: unknown;
    name?: unknown;
    createdAt?: unknown;
    src?: unknown;
    playbackId?: unknown;
  };

  const id = typeof item.id === "string" ? item.id : "";
  const event = item.event === "VENUS" || item.event === "We Outside" ? item.event : null;
  const kind = item.kind === "image" || item.kind === "video" ? item.kind : null;
  const name = typeof item.name === "string" ? item.name : "";
  const createdAt = typeof item.createdAt === "number" ? item.createdAt : 0;
  const src = typeof item.src === "string" ? item.src : undefined;
  const playbackId = typeof item.playbackId === "string" ? item.playbackId : undefined;

  if (!id || !event || !kind || !name || !createdAt) {
    return null;
  }

  if (kind === "image" && !src) {
    return null;
  }

  if (kind === "video" && !src && !playbackId) {
    return null;
  }

  return {
    id,
    event,
    kind,
    name,
    createdAt,
    src,
    playbackId,
  };
};

const toSafeControl = (entry: unknown, fallback: EventControl): EventControl => {
  if (!entry || typeof entry !== "object") {
    return fallback;
  }

  const item = entry as Partial<EventControl>;
  const passLimit =
    typeof item.passLimit === "number" && Number.isFinite(item.passLimit)
      ? Math.max(0, Math.floor(item.passLimit))
      : fallback.passLimit;
  const liveTicketCount =
    typeof item.liveTicketCount === "number" && Number.isFinite(item.liveTicketCount)
      ? Math.max(0, Math.floor(item.liveTicketCount))
      : fallback.liveTicketCount;

  return {
    passesEnabled:
      typeof item.passesEnabled === "boolean" ? item.passesEnabled : fallback.passesEnabled,
    passLimit,
    liveTicketCount,
  };
};

const getOrCreateTrackingSessionId = () => {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    const existing = localStorage.getItem(EVENT_TRACK_SESSION_KEY);
    if (existing && existing.trim().length > 0) {
      return existing;
    }

    const nextId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(EVENT_TRACK_SESSION_KEY, nextId);
    return nextId;
  } catch {
    return "";
  }
};

export function EventDetailClient({
  event,
  tickets,
  venusFreePassLimit,
}: EventDetailClientProps) {
  const fallbackControl = useMemo(() => {
    if (event.name === "VENUS") {
      return {
        ...EVENT_CONTROL_DEFAULTS.VENUS,
        passLimit: venusFreePassLimit,
      };
    }

    return EVENT_CONTROL_DEFAULTS[event.name];
  }, [event.name, venusFreePassLimit]);

  const [eventControl, setEventControl] = useState<EventControl>(fallbackControl);
  const [passesUsed, setPassesUsed] = useState(0);
  const [actionError, setActionError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [reserveName, setReserveName] = useState("");
  const [reservePhone, setReservePhone] = useState("");
  const [reserveNotes, setReserveNotes] = useState("");
  const [isSubmittingReservation, setIsSubmittingReservation] = useState(false);
  const [fanCamMoments, setFanCamMoments] = useState<FanCamMoment[]>([]);
  const [activeMomentIndex, setActiveMomentIndex] = useState(0);
  const [fanCamError, setFanCamError] = useState("");

  const trackFeature = useCallback(
    (feature: EventFeatureKey) => {
      const sessionId = getOrCreateTrackingSessionId();
      if (!sessionId) {
        return;
      }

      void fetch("/api/events/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        keepalive: true,
        body: JSON.stringify({
          sessionId,
          event: event.name,
          feature,
        }),
      });
    },
    [event.name]
  );

  const loadEventSnapshot = useCallback(async () => {
    const response = await fetch("/api/events/public", {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("failed to load event controls");
    }

    const payload = (await response.json()) as Partial<EventPublicSnapshot>;
    const controls = payload.controls ?? {};
    const nextControl = toSafeControl(
      (controls as Record<string, unknown>)[event.name],
      fallbackControl
    );
    const passesByEvent = payload.passesUsedByEvent ?? {};
    const nextPassesUsedRaw = (passesByEvent as Record<string, unknown>)[event.name];
    const nextPassesUsed =
      typeof nextPassesUsedRaw === "number" && Number.isFinite(nextPassesUsedRaw)
        ? Math.max(0, Math.floor(nextPassesUsedRaw))
        : 0;

    setEventControl(nextControl);
    setPassesUsed(nextPassesUsed);
    setActionError("");
  }, [event.name, fallbackControl]);

  const loadFanCamMoments = useCallback(async () => {
    const response = await fetch("/api/fancam/items", {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("failed to load fan cam moments");
    }

    const payload = (await response.json()) as { items?: unknown };
    const nextMoments = Array.isArray(payload.items)
      ? payload.items
          .map((entry) => normalizeFanCamMoment(entry))
          .filter((item): item is FanCamMoment => item !== null)
      : [];

    setFanCamMoments(nextMoments);
    setFanCamError("");
  }, []);

  useEffect(() => {
    setEventControl(fallbackControl);
  }, [fallbackControl]);

  useEffect(() => {
    void Promise.allSettled([loadEventSnapshot(), Promise.resolve(trackFeature("event_detail_view"))]);
  }, [loadEventSnapshot, trackFeature]);

  useEffect(() => {
    let isMounted = true;

    const syncFanCam = async () => {
      if (!isDocumentVisible()) {
        return;
      }

      try {
        await loadFanCamMoments();
      } catch {
        if (isMounted) {
          setFanCamError("unable to load fan cam uploads right now.");
        }
      }
    };

    void syncFanCam();
    const intervalId = window.setInterval(() => {
      void syncFanCam();
    }, FAN_CAM_REFRESH_MS);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [loadFanCamMoments]);

  useEffect(() => {
    if (activeMomentIndex < fanCamMoments.length) {
      return;
    }

    setActiveMomentIndex(0);
  }, [activeMomentIndex, fanCamMoments.length]);

  const passesLeft = eventControl.passesEnabled
    ? Math.max(0, eventControl.passLimit - passesUsed)
    : 0;
  const activeMoment = fanCamMoments[activeMomentIndex];
  const displayTickets = useMemo(
    () =>
      eventControl.passesEnabled && passesLeft > 0
        ? tickets.map((ticket) => ({ ...ticket, name: `${ticket.name} (entry after pass window)` }))
        : tickets,
    [eventControl.passesEnabled, passesLeft, tickets]
  );
  const ticketsAreLive = eventControl.liveTicketCount > 0;
  const egoticketsPassUrl = useMemo(() => {
    if (!event.egoticketsEventUrl) {
      return "";
    }

    try {
      const url = new URL(event.egoticketsEventUrl);
      url.searchParams.set("utm_source", "zyragh");
      url.searchParams.set("utm_medium", "pass_flow");
      url.searchParams.set("utm_campaign", event.slug);
      return url.toString();
    } catch {
      return event.egoticketsEventUrl;
    }
  }, [event.egoticketsEventUrl, event.slug]);
  const hasLivePassWindow = eventControl.passesEnabled && passesLeft > 0;
  const hasEgoticketsPassLink = Boolean(egoticketsPassUrl);
  const showVenusPassGuide = event.name === "VENUS" && eventControl.passesEnabled;

  const reserveTable = async () => {
    if (!reserveName || !reservePhone) {
      setActionError("enter your name and phone for reservation.");
      return;
    }

    setActionError("");
    setActionMessage("");
    setIsSubmittingReservation(true);

    try {
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kind: "reservation",
          event: event.name,
          name: reserveName,
          phone: reservePhone,
          notes: reserveNotes,
          sessionId: getOrCreateTrackingSessionId(),
        }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setActionError(payload.error ?? "unable to send reservation right now.");
        return;
      }

      setReserveName("");
      setReservePhone("");
      setReserveNotes("");
      setActionMessage("reservation sent. team will follow up with you.");
    } catch {
      setActionError("unable to send reservation right now.");
    } finally {
      setIsSubmittingReservation(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-white/8 dark:bg-slate-950/30" />
        <div
          className="absolute inset-0 bg-center bg-no-repeat opacity-[0.1] dark:opacity-[0.16]"
          style={{
            backgroundImage: `url(${event.logo})`,
            backgroundSize: "min(52vw, 420px)",
          }}
        />
      </div>

      <ZyraSiteNav
        active="events"
        navbarClassName={`border-b bg-gradient-to-r backdrop-blur-lg ${
          event.name === "VENUS"
            ? "from-indigo-900/82 via-violet-800/70 to-slate-950/85 border-violet-300/25"
            : "from-emerald-900/82 via-cyan-900/70 to-slate-950/85 border-cyan-300/25"
        }`}
        brand={<ZyraBrandMark />}
      />

      <main className="relative z-10 mx-auto max-w-5xl px-4 pb-20 pt-10 sm:px-6">
        <div className="mb-4 flex justify-start">
          <Button
            as={Link}
            href="/events"
            className="border border-cyan-300/70 bg-gradient-to-r from-cyan-500 to-blue-500 px-5 text-white shadow-[0_10px_26px_rgba(14,165,233,0.35)]"
          >
            events
          </Button>
        </div>
        <section className="space-y-4">
          <div className={`rounded-3xl bg-gradient-to-br ${event.bannerTone} p-5 text-white shadow-[0_22px_48px_rgba(15,23,42,0.2)] sm:p-6`}>
            <div className="flex items-center gap-2">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/85">featured now</p>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="rounded-2xl bg-white/15 p-2.5 backdrop-blur-md">
                <Image removeWrapper alt={`${event.name} logo`} src={event.logo} className="h-10 w-auto" />
              </div>
              <div>
                <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold">{event.name}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <div className="rounded-xl border border-white/30 bg-white/15 px-3 py-2 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.13em] text-white/75">date</p>
                <p className="text-sm font-semibold text-white">{event.dateLabel}</p>
              </div>
              <div className="rounded-xl border border-white/30 bg-white/15 px-3 py-2 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.13em] text-white/75">venue</p>
                <p className="text-sm font-semibold text-white">{event.venue}</p>
              </div>
              <div className="rounded-xl border border-white/30 bg-white/15 px-3 py-2 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.13em] text-white/75">time</p>
                <p className="text-sm font-semibold text-white">{event.timeLabel}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-violet-200/75 bg-violet-100/75 px-4 py-3 backdrop-blur-lg dark:border-violet-700/60 dark:bg-violet-900/35">
            <p className="text-sm font-semibold text-violet-900 dark:text-violet-100">
              this event is produced by +233events under zyra gh
            </p>
          </div>

          {eventControl.passesEnabled ? (
            <div className="rounded-2xl bg-white/62 p-4 backdrop-blur-lg dark:bg-slate-900/60">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">free pass window</p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">free pass up to {eventControl.passLimit}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{passesLeft} passes still available.</p>
            </div>
          ) : null}

          {showVenusPassGuide ? (
            <div className="rounded-2xl border border-emerald-200/80 bg-emerald-100/70 p-4 backdrop-blur-lg dark:border-emerald-700/55 dark:bg-emerald-900/30">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                  how to get your VENUS pass
                </p>
                <Chip className="bg-emerald-700 text-white dark:bg-emerald-600">
                  3 quick steps
                </Chip>
              </div>
              <div className="mt-3 grid gap-2 text-sm text-emerald-900 dark:text-emerald-100">
                <p>1. tap <span className="font-semibold">get free pass now</span>.</p>
                <p>2. on egotickets, select the VENUS free-pass option.</p>
                <p>3. submit details and keep the confirmation screen.</p>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {hasLivePassWindow && hasEgoticketsPassLink ? (
                  <Button
                    as={Link}
                    href={egoticketsPassUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-emerald-300/80 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                    onPress={() => {
                      trackFeature("ticket_click");
                    }}
                  >
                    get free pass now
                  </Button>
                ) : (
                  <Button
                    as={Link}
                    href="#ticket-options"
                    className="border border-cyan-300/80 bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                    onPress={() => {
                      trackFeature("ticket_click");
                    }}
                  >
                    pass window closed, buy ticket
                  </Button>
                )}
                <Button
                  as={Link}
                  href="#pass-flow"
                  variant="bordered"
                  className="border-emerald-500/50 bg-white/75 text-emerald-900 dark:border-emerald-400/50 dark:bg-slate-900/70 dark:text-emerald-100"
                >
                  see pass section
                </Button>
              </div>
            </div>
          ) : null}
        </section>

        <section className="mt-8">
          <Card className="border border-white/45 bg-white/45 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/58">
            <CardBody className="gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                  legendary moments
                </h2>
              </div>

              {activeMoment ? (
                <div className="relative mx-auto w-full max-w-[340px]">
                  <div className="pointer-events-none absolute -inset-2 rounded-[1.9rem] bg-gradient-to-br from-fuchsia-400/35 via-cyan-300/30 to-blue-500/35 blur-xl" />
                  <div className="relative overflow-hidden rounded-[1.7rem] border border-white/55 bg-white/65 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.7)] dark:border-slate-600/70 dark:bg-slate-900/70">
                    <div
                      className={`relative ${
                        activeMoment.kind === "video" ? "aspect-[9/16]" : "aspect-[3/4]"
                      } w-full bg-gradient-to-br from-white/45 via-white/20 to-slate-200/25 dark:from-slate-900/60 dark:via-slate-900/35 dark:to-slate-950/70`}
                    >
                      {activeMoment.kind === "video" ? (
                        activeMoment.playbackId ? (
                          <MuxPlayer
                            playbackId={activeMoment.playbackId}
                            streamType="on-demand"
                            metadataVideoTitle={activeMoment.name}
                            className="h-full w-full object-cover"
                          />
                        ) : activeMoment.src ? (
                          <video
                            src={activeMoment.src}
                            controls
                            playsInline
                            preload="metadata"
                            className="h-full w-full object-cover"
                          />
                        ) : null
                      ) : activeMoment.src ? (
                        <img
                          src={activeMoment.src}
                          alt={activeMoment.name}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-transparent p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white">fan cam</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative mx-auto w-full max-w-[340px] rounded-[1.7rem] border border-dashed border-slate-300 bg-slate-100/70 p-0 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300">
                  <div className="flex aspect-[3/4] w-full items-end rounded-[1.7rem] bg-gradient-to-b from-white/55 to-slate-200/35 p-4 dark:from-slate-900/50 dark:to-slate-950/80">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em]">fan cam</p>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </section>

        <section id="ticket-options" className="mt-8">
          <Card className="border border-white/45 bg-white/45 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/58">
            <CardBody className="gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                  tickets
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  {hasLivePassWindow ? (
                    <Chip className="bg-emerald-700 text-white dark:bg-emerald-600">
                      free pass available
                    </Chip>
                  ) : null}
                  <Chip className="bg-slate-900 text-white dark:bg-slate-700">
                    {eventControl.liveTicketCount} tickets live
                  </Chip>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {displayTickets.map((ticket) => (
                  <Card key={ticket.id} className="border border-white/45 bg-white/58 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/72">
                    <CardBody className="flex flex-row items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{ticket.name}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{ticket.price}</p>
                      </div>
                      {!ticketsAreLive ? (
                        <Button className="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" isDisabled>
                          sold out
                        </Button>
                      ) : ticket.link ? (
                        <Button
                          as={Link}
                          href={ticket.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-cyan-300/70 bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                          onPress={() => {
                            trackFeature("ticket_click");
                          }}
                        >
                          {hasLivePassWindow ? "buy paid ticket" : "buy now"}
                        </Button>
                      ) : (
                        <Button className="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" isDisabled>
                          link coming soon
                        </Button>
                      )}
                    </CardBody>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
        </section>

        <section className={`mt-8 grid gap-6 ${eventControl.passesEnabled ? "lg:grid-cols-2" : ""}`}>
          {eventControl.passesEnabled ? (
            <Card id="pass-flow" className="relative overflow-hidden border border-white/45 bg-white/45 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/58">
              <CardBody className="relative gap-4 [&>*]:relative [&>*]:z-10">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/58 via-white/34 to-white/12 dark:from-slate-900/62 dark:via-slate-900/40 dark:to-slate-900/22" />
                </div>

                <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                  free pass flow
                </h2>
                <Chip className="w-fit bg-slate-900 text-white dark:bg-slate-700">{passesLeft} passes left</Chip>
                <div className="grid gap-3">
                  <p className="text-sm text-slate-600 dark:text-slate-300">follow these steps:</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">1. tap the pass button below.</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">2. select the VENUS free-pass option on egotickets.</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">3. complete details and save your confirmation.</p>
                  <Chip className="w-fit bg-slate-900 text-white dark:bg-slate-700">
                    event: {event.name.toLowerCase()}
                  </Chip>
                  {hasLivePassWindow && hasEgoticketsPassLink ? (
                    <Button
                      as={Link}
                      href={egoticketsPassUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-fit border border-emerald-300/80 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                      onPress={() => {
                        trackFeature("ticket_click");
                      }}
                    >
                      get free pass on egotickets
                    </Button>
                  ) : (
                    <Button
                      as={Link}
                      href="#ticket-options"
                      className="w-fit border border-cyan-300/80 bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                      onPress={() => {
                        trackFeature("ticket_click");
                      }}
                    >
                      pass window closed, buy ticket
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          ) : null}

          <Card className="relative overflow-hidden border border-white/45 bg-white/45 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/58">
            <CardBody className="relative gap-4 [&>*]:relative [&>*]:z-10">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/58 via-white/34 to-white/12 dark:from-slate-900/62 dark:via-slate-900/40 dark:to-slate-900/22" />
              </div>

              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">table reservation</h2>
              <div className="grid gap-3">
                <Input label="your name" value={reserveName} onValueChange={setReserveName} />
                <Input label="phone" value={reservePhone} onValueChange={setReservePhone} />
                <Chip className="w-fit bg-slate-900 text-white dark:bg-slate-700">
                  event: {event.name.toLowerCase()}
                </Chip>
                <Textarea label="notes" value={reserveNotes} onValueChange={setReserveNotes} />
                <Button
                  className="w-fit bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                  isDisabled={isSubmittingReservation}
                  onPress={reserveTable}
                >
                  {isSubmittingReservation ? "sending..." : "send reservation"}
                </Button>
              </div>
            </CardBody>
          </Card>
        </section>

        {actionMessage ? (
          <p className="mt-4 text-sm font-medium text-emerald-700 dark:text-emerald-300">{actionMessage}</p>
        ) : null}
        {actionError ? (
          <p className="mt-2 text-sm font-medium text-rose-700 dark:text-rose-300">{actionError}</p>
        ) : null}
      </main>
    </div>
  );
}
