"use client";

import { Button, Card, CardBody, Chip, Image, Link } from "@heroui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ZyraSiteNav } from "@/components/ZyraSiteNav";
import { EventsBrandMark } from "@/components/EventsBrandMark";
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
  }, [event.name, fallbackControl]);


  const passesLeft = eventControl.passesEnabled
    ? Math.max(0, eventControl.passLimit - passesUsed)
    : 0;
  const primaryTicketLink = useMemo(() => tickets.find((ticket) => ticket.link)?.link ?? '', [tickets]);
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
  const hasLivePassWindow = eventControl.passesEnabled;
  const hasEgoticketsPassLink = Boolean(egoticketsPassUrl);
  const showVenusPassGuide = event.name === "VENUS" && eventControl.passesEnabled;
  const primaryAction = hasLivePassWindow && hasEgoticketsPassLink
    ? {
        href: egoticketsPassUrl,
        label: "claim free pass",
        detail: "free access is live now",
        external: true,
      }
    : primaryTicketLink
      ? {
          href: primaryTicketLink,
          label: "secure your spot",
          detail: "entry is live now",
          external: true,
        }
      : {
          href: "/events#table-reservation",
          label: "reserve a table",
          detail: "ticket link is still cooking, but reservations are open",
          external: false,
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
        brand={<EventsBrandMark />}
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
            <div className="flex flex-wrap items-center gap-3">
              <EventsBrandMark />
              <p className="text-sm font-semibold text-violet-900 dark:text-violet-100">
                this event is produced by +233events under zyra gh
              </p>
            </div>
          </div>

          {eventControl.passesEnabled && !showVenusPassGuide ? (
            <div className="rounded-2xl bg-white/62 p-4 backdrop-blur-lg dark:bg-slate-900/60">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">free pass window</p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">free passes are active</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">claim yours while this round stays open.</p>
            </div>
          ) : null}

          {showVenusPassGuide ? (
            <div className="rounded-2xl border border-emerald-200/80 bg-emerald-100/70 p-4 backdrop-blur-lg dark:border-emerald-700/55 dark:bg-emerald-900/30">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                  how to get your VENUS pass
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Chip className="bg-emerald-700 text-white dark:bg-emerald-600">3 quick steps</Chip>
                  <Chip className="bg-slate-900 text-white dark:bg-slate-700">free pass active</Chip>
                </div>
              </div>
              <div className="mt-3 grid gap-2 text-sm text-emerald-900 dark:text-emerald-100">
                <p>1. tap <span className="font-semibold">claim free pass</span>.</p>
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
                    claim free pass
                  </Button>
                ) : (
                  <Button
                    as={Link}
                    href={primaryAction.href}
                    target={primaryAction.external ? "_blank" : undefined}
                    rel={primaryAction.external ? "noopener noreferrer" : undefined}
                    className="border border-cyan-300/80 bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                    onPress={() => {
                      trackFeature("ticket_click");
                    }}
                  >
                    {primaryTicketLink ? "pass closed, secure your spot" : "pass window closed, reserve a table"}
                  </Button>
                )}
              </div>
            </div>
          ) : null}
        </section>

        <section className="mt-8">
          <Card className="border border-white/45 bg-white/45 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/58">
            <CardBody className="gap-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">shareable spotlight</p>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                this page stays light on purpose
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                use the main events hub for the full lineup, directions, calendar add, and table flow. this detail page is now the clean share link.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  as={Link}
                  href="/events#event-actions"
                  className="border border-cyan-300/70 bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                >
                  open full event hub
                </Button>
                <Button
                  as={Link}
                  href={primaryAction.href}
                  target={primaryAction.external ? "_blank" : undefined}
                  rel={primaryAction.external ? "noopener noreferrer" : undefined}
                  className="border border-white/60 bg-white/70 text-slate-900 dark:border-slate-600/70 dark:bg-slate-900/72 dark:text-slate-100"
                  onPress={() => {
                    trackFeature("ticket_click");
                  }}
                >
                  {primaryAction.label}
                </Button>
              </div>
            </CardBody>
          </Card>
        </section>
        <section className="mt-8">
          <Card className="border border-white/45 bg-white/45 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/58">
            <CardBody className="gap-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">next move</p>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                need the full event stack?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                jump into the main events hub for the full conversion flow, then come back here when you want the direct event link.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  as={Link}
                  href="/events#event-actions"
                  className="border border-cyan-300/70 bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                >
                  go to the event hub
                </Button>
                <Button
                  as={Link}
                  href={primaryAction.href}
                  target={primaryAction.external ? "_blank" : undefined}
                  rel={primaryAction.external ? "noopener noreferrer" : undefined}
                  className="border border-white/60 bg-white/70 text-slate-900 dark:border-slate-600/70 dark:bg-slate-900/72 dark:text-slate-100"
                  onPress={() => {
                    trackFeature("ticket_click");
                  }}
                >
                  {primaryAction.label}
                </Button>
              </div>
            </CardBody>
          </Card>
        </section>
      </main>
    </div>
  );
}




