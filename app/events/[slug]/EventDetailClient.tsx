"use client";

import { Button, Card, CardBody, Chip, Image, Link } from "@heroui/react";
import { useCallback, useMemo } from "react";
import { ZyraSiteNav } from "@/components/ZyraSiteNav";
import { EventsBrandMark } from "@/components/EventsBrandMark";
import {
  EVENT_CONTROL_DEFAULTS,
  EVENT_TRACK_SESSION_KEY,
  type EventFeatureKey,
} from "@/lib/eventOps";
import type { EventMeta, TicketItem } from "@/lib/eventsData";

type EventDetailClientProps = {
  event: EventMeta;
  tickets: TicketItem[];
  venusFreePassLimit: number;
};

const TRACK_DEBUG_STORAGE_KEY = "zyra_event_track_debug_v1";

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

  const eventControl = fallbackControl;

  const trackFeature = useCallback(
    (feature: EventFeatureKey) => {
      if (typeof window === "undefined") {
        return;
      }

      const sessionId = getOrCreateTrackingSessionId();
      if (!sessionId) {
        return;
      }

      try {
        const existing = JSON.parse(
          localStorage.getItem(TRACK_DEBUG_STORAGE_KEY) ?? "[]"
        ) as Array<{
          sessionId: string;
          event: EventMeta["name"];
          feature: EventFeatureKey;
          at: string;
        }>;
        const nextEntry = {
          sessionId,
          event: event.name,
          feature,
          at: new Date().toISOString(),
        };

        localStorage.setItem(
          TRACK_DEBUG_STORAGE_KEY,
          JSON.stringify([...(Array.isArray(existing) ? existing : []), nextEntry].slice(-40))
        );
      } catch {
        // local-only tracking should never interrupt the page
      }
    },
    [event.name]
  );
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
  const isVenusSoldOutMoment = event.name === "VENUS" && !eventControl.passesEnabled;
  const communityAction =
    event.vibeCard?.actions.find((action) => action.platform === "whatsapp") ??
    event.vibeCard?.actions[0];
  const primaryAction = hasLivePassWindow && hasEgoticketsPassLink
    ? {
        href: egoticketsPassUrl,
        label: "claim free pass",
        detail: "free access is live now",
        external: true,
      }
    : isVenusSoldOutMoment && primaryTicketLink
      ? {
          href: primaryTicketLink,
          label: "get late-entry ticket",
          detail: `${event.fallbackPrice} late-entry ticket is live now`,
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

      <main id="main-content" className="relative z-10 mx-auto max-w-5xl px-4 pb-20 pt-10 sm:px-6">
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
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/85">event page</p>
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
                presented by zyra gh and +233events
              </p>
            </div>
          </div>

          {eventControl.passesEnabled && !showVenusPassGuide ? (
            <div className="rounded-2xl bg-white/62 p-4 backdrop-blur-lg dark:bg-slate-900/60">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">passes</p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">free access open</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">claim yours while this round is open.</p>
            </div>
          ) : null}

          {isVenusSoldOutMoment ? (
            <div className="rounded-2xl border border-cyan-200/80 bg-cyan-100/75 p-4 backdrop-blur-lg dark:border-cyan-700/55 dark:bg-cyan-950/35">
              <div className="flex flex-wrap items-center gap-2">
                <Chip className="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">450+ gone</Chip>
                <Chip className="bg-cyan-500 text-white">late-entry live</Chip>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">late-entry tickets live</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                450+ tickets are already gone. join the community for event-day updates.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
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
                  {primaryAction.label}
                </Button>
                {communityAction ? (
                  <Button
                    as={Link}
                    href={communityAction.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-emerald-300/90 bg-[linear-gradient(135deg,rgba(220,252,231,0.96),rgba(187,247,208,0.96))] text-emerald-950 shadow-[0_12px_28px_rgba(34,197,94,0.14)] transition-all hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-[linear-gradient(135deg,rgba(209,250,229,1),rgba(167,243,208,1))] hover:text-emerald-950 dark:border-emerald-500/45 dark:bg-[linear-gradient(135deg,rgba(6,78,59,0.9),rgba(5,46,22,0.88))] dark:text-emerald-100 dark:hover:border-emerald-400/60 dark:hover:bg-[linear-gradient(135deg,rgba(6,95,70,0.92),rgba(6,78,59,0.9))]"
                  >
                    join whatsapp community
                  </Button>
                ) : null}
              </div>
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
                  <Chip className="bg-slate-900 text-white dark:bg-slate-700">passes open</Chip>
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
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">main page</p>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                need lineup and directions?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                open the main page for lineup, route, calendar, and entry.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  as={Link}
                  href="/events#event-actions"
                  className="border border-cyan-300/70 bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                >
                  open main page
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







