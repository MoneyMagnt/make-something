"use client";

import { Button, Card, CardBody, Image, Link } from "@heroui/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useThemeMode } from "@/components/ThemeModeProvider";
import { EventLineupSection } from "@/components/EventLineupSection";
import { ZyraSiteNav } from "@/components/ZyraSiteNav";
import { EventsBrandMark } from "@/components/EventsBrandMark";
import { EventCountdownChip } from "@/components/EventCountdownChip";
import { DEFAULT_EVENT_TICKETS, EVENTS } from "@/lib/eventsData";
import type { EventMeta, EventName } from "@/lib/eventsData";
import {
  EVENT_CONTROL_DEFAULTS,
  EVENT_TRACK_SESSION_KEY,
  type EventFeatureKey,
} from "@/lib/eventOps";
import { SITE_URL } from "@/lib/site";

const ACTIVE_EVENT_STORAGE_KEY = "zyra_events_active_event_v1";
const WHATSAPP_BASE_URL = "https://wa.me/233556877954";
const TRACK_DEBUG_STORAGE_KEY = "zyra_event_track_debug_v1";

function EventBrandName({ event, selected = false }: { event: EventMeta; selected?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image removeWrapper alt={`${event.name} logo`} src={event.logo} className={`h-8 w-auto ${selected ? "drop-shadow-[0_8px_18px_rgba(255,255,255,0.16)]" : ""}`} />
      <span className={`font-[family-name:var(--font-space-grotesk)] text-base font-bold sm:text-lg ${selected ? "text-slate-950 dark:text-white" : "text-slate-900 dark:text-slate-100"}`}>
        {event.name}
      </span>
    </span>
  );
}

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

const buildMapsUrl = (event: EventMeta) => {
  const query = `${event.venue}, ${event.city}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};

const buildCalendarUrl = (event: EventMeta) => {
  if (!event.startDateIso) {
    return "";
  }

  const start = new Date(event.startDateIso);
  if (Number.isNaN(start.getTime())) {
    return "";
  }

  const end = new Date(start.getTime() + 6 * 60 * 60 * 1000);
  const toCalendarStamp = (value: Date) =>
    value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

  const title = `${event.name} by zyra`;
  const details = `${event.description}\n\nVenue: ${event.venue}, ${event.city}`;
  const location = `${event.venue}, ${event.city}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${toCalendarStamp(start)}/${toCalendarStamp(end)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
};

const buildTableReservationUrl = (event: EventMeta) => {
  const text = `hi zyra, i want to reserve table for ${event.name} on ${event.dateLabel} at ${event.venue}.`;
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(text)}`;
};

export function EventsPageClient() {
  const { theme } = useThemeMode();
  const [activeEvent, setActiveEvent] = useState<EventName>("VENUS");
  const [hasLoadedPersistedEvent, setHasLoadedPersistedEvent] = useState(false);
  const hasTrackedInitialPageView = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setHasLoadedPersistedEvent(true);
      return;
    }

    try {
      const savedEvent = localStorage.getItem(ACTIVE_EVENT_STORAGE_KEY);
      if (savedEvent === "VENUS" || savedEvent === "We Outside") {
        setActiveEvent(savedEvent);
      }
    } finally {
      setHasLoadedPersistedEvent(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedPersistedEvent || typeof window === "undefined") {
      return;
    }

    try {
      localStorage.setItem(ACTIVE_EVENT_STORAGE_KEY, activeEvent);
    } catch {
      // Ignore storage write failures and keep the session working.
    }
  }, [activeEvent, hasLoadedPersistedEvent]);


  const activeMeta = useMemo(
    () => EVENTS.find((item) => item.name === activeEvent) ?? EVENTS[0],
    [activeEvent]
  );
  const isVenusEvent = activeMeta.name === "VENUS";
  const activeTickets = DEFAULT_EVENT_TICKETS[activeMeta.name];
  const activeControl = EVENT_CONTROL_DEFAULTS[activeMeta.name];
  const primaryTicketLink = useMemo(
    () => activeTickets.find((ticket) => ticket.link)?.link ?? "",
    [activeTickets]
  );
  const activeLineup = activeMeta.lineup ?? [];
  const mapsUrl = useMemo(() => buildMapsUrl(activeMeta), [activeMeta]);
  const calendarUrl = useMemo(() => buildCalendarUrl(activeMeta), [activeMeta]);
  const tableReservationUrl = useMemo(() => buildTableReservationUrl(activeMeta), [activeMeta]);
  const detailPageUrl = `/events/${activeMeta.slug}`;
  const communityAction =
    activeMeta.vibeCard?.actions.find((action) => action.platform === "whatsapp") ??
    activeMeta.vibeCard?.actions[0];
  const isVenusSoldOutMoment = isVenusEvent && !activeControl.passesEnabled;
  const heroSummary =
    activeMeta.name === "VENUS"
      ? isVenusSoldOutMoment
        ? "Venus by zyra at Glass Lounge, Accra. Late entry is open for 27 March 2026."
        : "Venus by zyra with free pass access before standard entry."
      : activeMeta.description;
  const egoticketsPassUrl = useMemo(() => {
    if (!activeMeta.egoticketsEventUrl) {
      return "";
    }

    try {
      const url = new URL(activeMeta.egoticketsEventUrl);
      url.searchParams.set("utm_source", "zyragh");
      url.searchParams.set("utm_medium", "events_page_pass");
      url.searchParams.set("utm_campaign", activeMeta.slug);
      return url.toString();
    } catch {
      return activeMeta.egoticketsEventUrl;
    }
  }, [activeMeta.egoticketsEventUrl, activeMeta.slug]);
  const primaryAction =
    activeControl.passesEnabled && egoticketsPassUrl
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
            detail: `${activeMeta.fallbackPrice} late-entry ticket is live now`,
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
              href: tableReservationUrl,
              label: "reserve table",
              detail: "jump to whatsapp and lock in your crew",
              external: true,
            };


  const trackFeature = useCallback(
    (feature: EventFeatureKey, eventName: EventName = activeEvent) => {
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
          event: EventName;
          feature: EventFeatureKey;
          at: string;
        }>;
        const nextEntry = {
          sessionId,
          event: eventName,
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
    [activeEvent]
  );
  useEffect(() => {
    if (!hasLoadedPersistedEvent || hasTrackedInitialPageView.current) {
      return;
    }

    hasTrackedInitialPageView.current = true;
    trackFeature("events_page_view", activeEvent);
  }, [activeEvent, hasLoadedPersistedEvent, trackFeature]);

  const navToneClass =
    theme === "dark"
      ? isVenusEvent
        ? "from-indigo-900/82 via-violet-800/70 to-slate-950/85 border-violet-300/25"
        : "from-emerald-900/82 via-cyan-900/70 to-slate-950/85 border-cyan-300/25"
      : isVenusEvent
        ? "from-violet-300/80 via-fuchsia-300/68 to-rose-200/55 border-fuchsia-400/55"
        : "from-emerald-300/82 via-cyan-300/70 to-sky-200/60 border-cyan-400/55";

  const pageStyle = useMemo(
    () => ({
      background:
        theme === "dark"
          ? isVenusEvent
            ? "radial-gradient(1260px 780px at 8% -12%, rgba(129,140,248,0.34), transparent 60%), radial-gradient(1080px 650px at 92% -8%, rgba(217,70,239,0.28), transparent 62%), radial-gradient(980px 640px at 50% 112%, rgba(168,85,247,0.24), transparent 68%), linear-gradient(180deg, #140830 0%, #11183d 46%, #060d28 100%)"
            : "radial-gradient(1260px 780px at 8% -12%, rgba(20,184,166,0.34), transparent 60%), radial-gradient(1080px 650px at 92% -8%, rgba(14,165,233,0.28), transparent 62%), radial-gradient(980px 640px at 50% 112%, rgba(45,212,191,0.24), transparent 68%), linear-gradient(180deg, #0b332b 0%, #0b2e44 46%, #060d28 100%)"
          : isVenusEvent
            ? "radial-gradient(1180px 700px at 10% -14%, rgba(167,139,250,0.52), transparent 64%), radial-gradient(980px 590px at 90% -8%, rgba(244,114,182,0.42), transparent 62%), radial-gradient(1040px 620px at 50% 112%, rgba(129,140,248,0.28), transparent 70%), linear-gradient(180deg, #fcf8ff 0%, #f6eeff 54%, #e7dcff 100%)"
            : "radial-gradient(1180px 700px at 10% -14%, rgba(16,185,129,0.48), transparent 64%), radial-gradient(980px 590px at 90% -8%, rgba(6,182,212,0.44), transparent 62%), radial-gradient(1040px 620px at 50% 112%, rgba(59,130,246,0.28), transparent 70%), linear-gradient(180deg, #f0fffb 0%, #ecfbff 54%, #dbeeff 100%)",
    }),
    [isVenusEvent, theme]
  );

  const eventsJsonLd = useMemo(() => {
    const itemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "zyra events",
      itemListElement: EVENTS.map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: event.name,
        url: `${SITE_URL}/events/${event.slug}`,
      })),
    };

    const venus = EVENTS.find((event) => event.name === "VENUS");
    const venusSchema =
      venus?.startDateIso
        ? {
            "@context": "https://schema.org",
            "@type": "Event",
            name: venus.name,
            description: venus.description,
            startDate: venus.startDateIso,
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: {
              "@type": "Place",
              name: venus.venue,
              address: {
                "@type": "PostalAddress",
                addressLocality: venus.city,
                addressCountry: "GH",
              },
            },
            image: [`${SITE_URL}${venus.vibeCard?.poster ?? venus.logo}`],
            organizer: {
              "@type": "Organization",
              name: "zyra",
              url: SITE_URL,
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "GHS",
              price: "50",
              availability: "https://schema.org/InStock",
              url: `${SITE_URL}/events/${venus.slug}`,
            },
          }
        : null;

    return JSON.stringify(venusSchema ? [itemList, venusSchema] : [itemList]);
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-x-clip text-slate-900 dark:text-slate-100"
      style={pageStyle}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: eventsJsonLd }} />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-white/10 dark:bg-slate-950/28" />
        <div
          className="absolute inset-0 bg-center bg-no-repeat opacity-[0.11] transition-opacity duration-300 dark:opacity-[0.17]"
          style={{
            backgroundImage: `url(${activeMeta.logo})`,
            backgroundSize: "min(52vw, 420px)",
          }}
        />
      </div>

      <ZyraSiteNav
        active="events"
        navbarClassName={`border-b bg-gradient-to-r backdrop-blur-lg ${navToneClass}`}
        brand={<EventsBrandMark />}
      />

      <main id="main-content" className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
        <section className="mb-8">
          <Card className="border border-slate-200/80 bg-white/82 shadow-[0_20px_52px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-700/55 dark:bg-slate-950/58">
            <CardBody className="gap-6">
              <div className="relative flex min-h-[9.5rem] flex-col items-center justify-center pt-5 text-center sm:min-h-[11rem] sm:pt-6 lg:min-h-[13rem] lg:pt-7">
                <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 sm:gap-3">
                  <div suppressHydrationWarning className="inline-flex h-9 max-w-[calc(100%-8.5rem)] items-center rounded-full border border-cyan-200 bg-cyan-100 px-3 text-cyan-900 shadow-[0_12px_28px_rgba(15,23,42,0.08)] dark:border-cyan-700/60 dark:bg-cyan-900/35 dark:text-cyan-200">
                    <EventCountdownChip targetIso={activeMeta.startDateIso} />
                  </div>
                  <div className="inline-flex h-9 items-center rounded-full border border-cyan-200/80 bg-cyan-100/88 px-3 text-cyan-900 shadow-[0_10px_22px_rgba(15,23,42,0.06)] dark:border-cyan-700/45 dark:bg-cyan-900/22 dark:text-cyan-200/90">
                    <EventsBrandMark size="compact" className="min-w-0" />
                  </div>
                </div>
                <h1 className="sr-only">{activeMeta.name}</h1>
                <Image
                  removeWrapper
                  alt={`${activeMeta.name} logo`}
                  src={activeMeta.logo}
                  className="mx-auto mt-3 h-28 w-full max-w-[430px] object-contain sm:mt-4 sm:h-36 sm:max-w-[540px] lg:mt-5 lg:h-44 lg:max-w-[660px] xl:h-48 xl:max-w-[720px]"
                />
              </div>

              <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
                <div className="space-y-4">
                  {isVenusEvent ? (
                    <div className="max-w-2xl rounded-[1.75rem] border border-fuchsia-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(249,245,255,0.98))] px-5 py-5 shadow-[0_22px_52px_rgba(168,85,247,0.12)] backdrop-blur-xl dark:border-fuchsia-400/20 dark:bg-[linear-gradient(135deg,rgba(30,27,75,0.7),rgba(12,10,30,0.82))] dark:shadow-[0_24px_60px_rgba(99,102,241,0.18)] sm:px-6 sm:py-6">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fuchsia-700 dark:text-fuchsia-200/90">
                        nightlife experience by zyra
                      </p>
                      <p className="mt-3 font-[family-name:var(--font-space-grotesk)] text-[clamp(1.5rem,3vw,2.55rem)] font-bold leading-[1.05] tracking-tight text-slate-950 dark:text-white">
                        {isVenusSoldOutMoment ? (
                          <span className="block pb-[0.08em] bg-[linear-gradient(90deg,#7c3aed_0%,#ec4899_48%,#06b6d4_100%)] bg-clip-text text-transparent dark:bg-[linear-gradient(90deg,#c084fc_0%,#f9a8d4_48%,#67e8f9_100%)]">
                            450+ tickets already gone
                          </span>
                        ) : (
                          <>
                            <span className="block">with free pass access</span>
                            <span className="mt-1 block pb-[0.08em] bg-[linear-gradient(90deg,#7c3aed_0%,#ec4899_48%,#06b6d4_100%)] bg-clip-text text-transparent dark:bg-[linear-gradient(90deg,#c084fc_0%,#f9a8d4_48%,#67e8f9_100%)]">
                              before standard entry starts
                            </span>
                          </>
                        )}
                      </p>
                      {isVenusSoldOutMoment ? (
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-cyan-200/80 bg-cyan-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-900 dark:border-cyan-400/30 dark:bg-cyan-500/12 dark:text-cyan-100">
                            {`late entry - ${activeMeta.fallbackPrice}`}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
                      {heroSummary}
                    </p>
                  )}
                  <div className="space-y-3 border-t border-white/35 pt-4 dark:border-slate-700/45">
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        as={Link}
                        href={primaryAction.href}
                        target={primaryAction.external ? "_blank" : undefined}
                        rel={primaryAction.external ? "noopener noreferrer" : undefined}
                        className={`h-12 w-full border text-base font-semibold text-white shadow-[0_18px_40px_rgba(14,165,233,0.22)] transition-transform hover:-translate-y-0.5 sm:w-fit sm:px-8 ${
                          activeControl.passesEnabled && egoticketsPassUrl
                            ? "border-emerald-300/80 bg-gradient-to-r from-emerald-500 to-cyan-500"
                            : "border-cyan-300/70 bg-gradient-to-r from-cyan-500 to-blue-500"
                        }`}
                        onPress={() => {
                          trackFeature("ticket_click", activeMeta.name)
                        }}
                      >
                        {primaryAction.label}
                      </Button>
                      {isVenusSoldOutMoment && communityAction ? (
                        <Button
                          as={Link}
                          href={communityAction.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-12 w-full border border-emerald-300/90 bg-[linear-gradient(135deg,rgba(220,252,231,0.96),rgba(187,247,208,0.96))] text-emerald-950 shadow-[0_12px_28px_rgba(34,197,94,0.14)] transition-all hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-[linear-gradient(135deg,rgba(209,250,229,1),rgba(167,243,208,1))] hover:text-emerald-950 dark:border-emerald-500/45 dark:bg-[linear-gradient(135deg,rgba(6,78,59,0.9),rgba(5,46,22,0.88))] dark:text-emerald-100 dark:hover:border-emerald-400/60 dark:hover:bg-[linear-gradient(135deg,rgba(6,95,70,0.92),rgba(6,78,59,0.9))] sm:w-fit sm:px-6"
                        >
                          join whatsapp community
                        </Button>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                      <Link href="#lineup-reel" className="text-slate-700 no-underline transition-colors hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300">
                        view lineup
                      </Link>
                      <Link href="#event-actions" className="text-slate-700 no-underline transition-colors hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300">
                        event guide
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-2xl border border-slate-200/85 bg-white/92 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.07)] backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/70">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">date</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">{activeMeta.dateLabel}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200/85 bg-white/92 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.07)] backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/70">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">venue</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">{activeMeta.venue}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200/85 bg-white/92 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.07)] backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/70">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">time</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">{activeMeta.timeLabel}</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </section>

        <EventLineupSection members={activeLineup} vibeCard={activeMeta.vibeCard} sectionClassName="mb-8" />

        <section id="event-actions" className="mb-8">
          <Card className="border border-slate-200/80 bg-white/82 shadow-[0_20px_52px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-700/55 dark:bg-slate-950/58">
            <CardBody className="gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  arrival details
                </p>
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-slate-900 dark:text-slate-100">
                  plan your arrival
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <Link
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-300/85 bg-white/92 p-4 no-underline shadow-[0_14px_32px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-0.5 hover:border-cyan-300/90 hover:bg-cyan-50/70 dark:border-slate-700/55 dark:bg-slate-950/70 dark:hover:border-cyan-500/35 dark:hover:bg-slate-900/78"
                >
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">arrival</p>
                  <p className="mt-2 font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-slate-900 dark:text-slate-100">
                    get directions
                  </p>
                </Link>

                <Link
                  href={calendarUrl || detailPageUrl}
                  target={calendarUrl ? "_blank" : undefined}
                  rel={calendarUrl ? "noopener noreferrer" : undefined}
                  className="rounded-2xl border border-slate-300/85 bg-white/92 p-4 no-underline shadow-[0_14px_32px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-0.5 hover:border-cyan-300/90 hover:bg-cyan-50/70 dark:border-slate-700/55 dark:bg-slate-950/70 dark:hover:border-cyan-500/35 dark:hover:bg-slate-900/78"
                >
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">reminder</p>
                  <p className="mt-2 font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-slate-900 dark:text-slate-100">
                    {calendarUrl ? "add to calendar" : "event page"}
                  </p>
                </Link>

                <Link
                  href={tableReservationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-300/85 bg-white/92 p-4 no-underline shadow-[0_14px_32px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-0.5 hover:border-cyan-300/90 hover:bg-cyan-50/70 dark:border-slate-700/55 dark:bg-slate-950/70 dark:hover:border-cyan-500/35 dark:hover:bg-slate-900/78"
                >
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">tables</p>
                  <p className="mt-2 font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-slate-900 dark:text-slate-100">
                    reserve a table
                  </p>
                </Link>
              </div>
            </CardBody>
          </Card>
        </section>

        <section className="mb-10">
          <Card className="border border-slate-200/80 bg-white/78 shadow-[0_18px_44px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-700/55 dark:bg-slate-950/52">
            <CardBody className="gap-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    more from zyra
                  </p>
                  <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-slate-900 dark:text-slate-100">
                    other events
                  </h2>
                </div>
                <div className="rounded-full border border-slate-200/90 bg-white/90 px-3 py-1.5 shadow-[0_12px_28px_rgba(15,23,42,0.08)] dark:border-slate-700/55 dark:bg-slate-900/70">
                  <EventsBrandMark size="compact" />
                </div>
              </div>

              <div className="grid gap-3 lg:grid-cols-2">
                {EVENTS.map((event) => {
                  const selected = event.name === activeEvent

                  return (
                    <Button
                      key={event.slug}
                      className={`h-auto justify-between border px-4 py-4 ${
                        selected
                          ? "border-cyan-300/90 bg-[linear-gradient(135deg,rgba(236,254,255,0.98),rgba(224,242,254,0.98))] text-slate-950 shadow-[0_16px_34px_rgba(8,145,178,0.14)] dark:border-cyan-400/60 dark:bg-[linear-gradient(135deg,rgba(8,47,73,0.98),rgba(49,46,129,0.96))] dark:text-white dark:shadow-[0_18px_42px_rgba(8,145,178,0.26)]"
                          : "border-slate-300/85 bg-white/92 text-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.07)] hover:border-cyan-300/70 hover:bg-white dark:border-slate-700/55 dark:bg-slate-950/66 dark:text-slate-200"
                      }`}
                      onPress={() => {
                        if (event.name !== activeEvent) {
                          trackFeature("event_switch", event.name)
                        }
                        setActiveEvent(event.name)
                      }}
                    >
                      <div className="flex flex-col items-start gap-1 text-left">
                        <EventBrandName event={event} selected={selected} />
                        <p className={`text-xs ${selected ? "text-slate-600 dark:text-slate-200/88" : "text-slate-600 dark:text-slate-400"}`}>
                          {event.name === "We Outside"
                            ? "Next drop. Details when it's time."
                            : `${event.dateLabel} - ${event.timeLabel}`}
                        </p>
                      </div>
                      <span className={`text-xs uppercase tracking-[0.14em] ${selected ? "text-cyan-700 dark:text-cyan-200" : "text-slate-500 dark:text-slate-400"}`}>
                        {selected ? "selected" : "view"}
                      </span>
                    </Button>
                  )
                })}
              </div>
            </CardBody>
          </Card>
        </section>
      </main>
    </div>
  );
}

