"use client";

import {
  Button,
  Card,
  CardBody,
  Chip,
  Image,
  Input,
  Link,
  Textarea,
} from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import Script from "next/script";
import { useThemeMode } from "@/components/ThemeModeProvider";
import { ZyraSiteNav } from "@/components/ZyraSiteNav";
import {
  DEFAULT_EVENT_TICKETS,
  EVENTS,
  VENUS_FREE_PASS_LIMIT,
  VENUS_POST_PASS_PRICE,
} from "@/lib/eventsData";
import type { EventMeta, EventName, TicketItem } from "@/lib/eventsData";
import { SITE_URL } from "@/lib/site";

const STORAGE_KEY = "zyra_admin_state_v1";
const VISITOR_COUNT_KEY = "zyra_visitor_count_v1";
const VISITOR_SESSION_KEY = "zyra_visitor_counted_v1";

type PassItem = {
  id: string;
  name: string;
  email: string;
  phone: string;
  event: string;
};
type VideoItem = { id: string; title: string; url: string };
type PhotoItem = { id: string; caption: string; url: string };
type ReservationItem = {
  id: string;
  name: string;
  phone: string;
  event: string;
  notes: string;
};

type AdminState = {
  brandName: string;
  headline: string;
  subhead: string;
  primary: string;
  secondary: string;
  passLimit: number;
  tickets: TicketItem[];
  passes: PassItem[];
  videos: VideoItem[];
  photos: PhotoItem[];
  reservations: ReservationItem[];
};

const defaultState: AdminState = {
  brandName: "zyra",
  headline: "legendary moments",
  subhead: "book tickets, reserve tables, and pull up with your people",
  primary: "#2563eb",
  secondary: "#7c3aed",
  passLimit: 200,
  tickets: [],
  passes: [],
  videos: [],
  photos: [],
  reservations: [],
};

const makeId = () => Math.random().toString(36).slice(2, 10);

const loadInitialState = (): AdminState => {
  if (typeof window === "undefined") {
    return defaultState;
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return defaultState;
  }

  try {
    const parsed = JSON.parse(saved) as Partial<AdminState>;
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
};

function EventBrandName({
  event,
  size = "md",
}: {
  event: EventMeta;
  size?: "sm" | "md" | "lg";
}) {
  const imageSize =
    size === "sm" ? "h-6" : size === "lg" ? "h-10" : "h-8";
  const textSize =
    size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-base";

  return (
    <span className="inline-flex items-center gap-2">
      <Image removeWrapper alt={`${event.name} logo`} src={event.logo} className={`${imageSize} w-auto`} />
      <span className={`font-[family-name:var(--font-space-grotesk)] font-bold ${textSize}`}>{event.name}</span>
    </span>
  );
}

export default function EventsPage() {
  const { theme } = useThemeMode();
  const [state, setState] = useState<AdminState>(loadInitialState);
  const [activeEvent, setActiveEvent] = useState<EventName>("We Outside");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reserveName, setReserveName] = useState("");
  const [reservePhone, setReservePhone] = useState("");
  const [reserveNotes, setReserveNotes] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem(VISITOR_SESSION_KEY)) {
      return;
    }

    const next = Number(localStorage.getItem(VISITOR_COUNT_KEY) ?? "0") + 1;
    localStorage.setItem(VISITOR_COUNT_KEY, String(next));
    sessionStorage.setItem(VISITOR_SESSION_KEY, "1");
  }, []);

  useEffect(() => {
    const write = () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    };

    const timeoutId = window.setTimeout(write, 180);
    return () => window.clearTimeout(timeoutId);
  }, [state]);

  const activeMeta = useMemo(() => EVENTS.find((item) => item.name === activeEvent) ?? EVENTS[0], [activeEvent]);
  const navToneClass =
    theme === "dark"
      ? activeEvent === "VENUS"
        ? "from-indigo-900/82 via-violet-800/70 to-slate-950/85 border-violet-300/25"
        : "from-emerald-900/82 via-cyan-900/70 to-slate-950/85 border-cyan-300/25"
      : activeEvent === "VENUS"
        ? "from-violet-400/70 via-fuchsia-400/62 to-rose-200/55 border-fuchsia-400/55"
        : "from-emerald-400/70 via-cyan-400/62 to-blue-200/55 border-cyan-400/55";
  const themeStyle = useMemo(
    () => ({
      background:
        theme === "dark"
          ? activeEvent === "VENUS"
            ? `radial-gradient(1220px 760px at 8% -14%, ${activeMeta.auraA}, transparent 62%), radial-gradient(1080px 660px at 92% -10%, ${activeMeta.auraB}, transparent 60%), radial-gradient(1060px 680px at 50% 112%, rgba(129,140,248,0.34), transparent 68%), linear-gradient(180deg, #18093f 0%, #12143f 46%, #060d2a 100%)`
            : `radial-gradient(1220px 760px at 8% -14%, ${activeMeta.auraA}, transparent 62%), radial-gradient(1080px 660px at 92% -10%, ${activeMeta.auraB}, transparent 60%), radial-gradient(1060px 680px at 50% 112%, rgba(14,165,233,0.34), transparent 68%), linear-gradient(180deg, #0f3e33 0%, #0c2f49 46%, #060d2a 100%)`
          : activeEvent === "VENUS"
            ? `radial-gradient(1120px 680px at 10% -14%, rgba(139,92,246,0.54), transparent 64%), radial-gradient(980px 580px at 90% -8%, rgba(236,72,153,0.46), transparent 62%), radial-gradient(980px 600px at 50% 112%, rgba(99,102,241,0.32), transparent 70%), linear-gradient(180deg, #f6f0ff 0%, #eceeff 52%, #d8e3ff 100%)`
            : `radial-gradient(1120px 680px at 10% -14%, rgba(16,185,129,0.52), transparent 64%), radial-gradient(980px 580px at 90% -8%, rgba(6,182,212,0.46), transparent 62%), radial-gradient(980px 600px at 50% 112%, rgba(59,130,246,0.3), transparent 70%), linear-gradient(180deg, #ecfffb 0%, #ebf8ff 52%, #d3e7ff 100%)`,
    }),
    [activeEvent, activeMeta.auraA, activeMeta.auraB, theme]
  );

  const isVenusEvent = activeMeta.name === "VENUS";
  const tickets = DEFAULT_EVENT_TICKETS[activeMeta.name];
  const venusPassesUsed = state.passes.filter((pass) => pass.event === "VENUS").length;
  const passesLeft = isVenusEvent ? Math.max(0, VENUS_FREE_PASS_LIMIT - venusPassesUsed) : 0;
  const isVenusPostPass = isVenusEvent && passesLeft === 0;
  const primaryDisplayPrice = isVenusEvent
    ? isVenusPostPass
      ? VENUS_POST_PASS_PRICE
      : "Free pass"
    : tickets[0]?.price || activeMeta.fallbackPrice;
  const displayTickets = isVenusEvent && !isVenusPostPass
    ? tickets.map((ticket) => ({ ...ticket, name: `${ticket.name} (after free passes)` }))
    : tickets;
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
            image: [`${SITE_URL}${venus.logo}`],
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

  const mediaFeed = useMemo(() => {
    const videos = state.videos.map((item) => ({
      id: `video-${item.id}`,
      title: item.title,
      url: item.url,
      type: "video",
    }));

    const photos = state.photos.map((item) => ({
      id: `photo-${item.id}`,
      title: item.caption,
      url: item.url,
      type: "photo",
    }));

    return [...videos, ...photos].slice(0, 6);
  }, [state.photos, state.videos]);

  return (
    <div className="relative min-h-screen overflow-x-clip text-slate-900 transition-colors duration-300 ease-out dark:text-slate-100" style={themeStyle}>
      <Script id="events-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: eventsJsonLd }} />
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-white/6 dark:bg-slate-950/24" />
        <div
          className="absolute inset-0 bg-center bg-no-repeat opacity-[0.1] transition-opacity duration-300 dark:opacity-[0.16]"
          style={{
            backgroundImage: `url(${activeMeta.logo})`,
            backgroundSize: "min(52vw, 420px)",
          }}
        />
      </div>

      <ZyraSiteNav
        active="events"
        navbarClassName={`border-b bg-gradient-to-r backdrop-blur-lg ${navToneClass}`}
        brand={
          <div className="flex items-center gap-2.5 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
            <span>{state.brandName}</span>
            <span className="rounded-full border border-transparent bg-transparent px-0 py-0 shadow-none">
              <Image
                removeWrapper
                alt="233 events logo"
                src="/233-events-logo.png"
                className="h-8 w-auto drop-shadow-[0_4px_10px_rgba(15,23,42,0.35)]"
              />
            </span>
          </div>
        }
      />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
        <section className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border border-white/45 bg-white/45 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/58">
            <CardBody className="gap-5">
              <Chip className="w-fit border border-cyan-200 bg-cyan-100 text-cyan-900 dark:border-cyan-700/60 dark:bg-cyan-900/35 dark:text-cyan-200">
                house of legendary parties
              </Chip>
              <h1 className="font-[family-name:var(--font-bricolage)] text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl dark:text-slate-100">
                legendary moments
              </h1>
              <p className="text-sm text-slate-600 sm:text-base dark:text-slate-300">
                {state.subhead || "we outside and venus only. direct tickets, direct reservations, no marketplace clutter."}
              </p>

              <div className="flex flex-wrap gap-2 text-sm text-slate-700 dark:text-slate-300">
                <Chip className="bg-black/10 text-slate-800 dark:bg-slate-700/60 dark:text-slate-100">we outside</Chip>
                <Chip className="bg-black/10 text-slate-800 dark:bg-slate-700/60 dark:text-slate-100">venus</Chip>
                <Chip className="bg-black/10 text-slate-800 dark:bg-slate-700/60 dark:text-slate-100">accra nights</Chip>
              </div>
              <div className="flex flex-wrap gap-2 text-sm">
                {EVENTS.map((event) => (
                  <Link
                    key={event.slug}
                    href={`/events/${event.slug}`}
                    className="rounded-full border border-white/45 bg-white/55 px-3 py-1 text-slate-700 no-underline dark:border-slate-700/55 dark:bg-slate-950/62 dark:text-slate-200"
                  >
                    {event.name} details
                  </Link>
                ))}
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {EVENTS.map((event) => (
                  <Button
                    key={event.name}
                    variant="flat"
                    className={`h-auto justify-start border p-3 ${
                      activeEvent === event.name
                        ? "border-cyan-300/80 bg-cyan-50 text-slate-900 dark:border-cyan-400/50 dark:bg-cyan-900/30 dark:text-slate-100"
                        : "border-white/45 bg-white/55 text-slate-800 dark:border-slate-700/55 dark:bg-slate-950/62 dark:text-slate-200"
                    }`}
                    onPress={() => setActiveEvent(event.name)}
                  >
                    <div className="flex flex-col items-start gap-1">
                      <EventBrandName event={event} size="sm" />
                      <span className="text-xs text-slate-600 dark:text-slate-400">{event.venue}, {event.city}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="relative overflow-hidden border border-white/45 bg-white/45 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/58">
            <CardBody className="relative gap-4 [&>*]:relative [&>*]:z-10">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/58 via-white/34 to-white/12 dark:from-slate-900/62 dark:via-slate-900/40 dark:to-slate-900/22" />
              </div>

              <div className={`relative z-10 rounded-2xl bg-gradient-to-r ${activeMeta.bannerTone} p-4 text-white`}>
                <p className="text-xs uppercase tracking-[0.14em] text-white/85">featured now</p>
                <div className="mt-1">
                  <EventBrandName event={activeMeta} size="lg" />
                </div>
                <p className="text-sm text-white/85">{activeMeta.venue}, {activeMeta.city}</p>
                {!isVenusEvent ? (
                  <div className="mt-3 rounded-xl border border-white/30 bg-white/10 p-3 backdrop-blur-sm">
                    <div className="relative h-12 overflow-hidden rounded-lg bg-gradient-to-b from-sky-300/80 via-cyan-200/70 to-amber-200/70">
                      <div className="absolute right-3 top-2 h-4 w-4 rounded-full bg-amber-200/90 shadow-[0_0_20px_rgba(253,224,71,0.65)]" />
                      <div className="absolute inset-x-0 bottom-5 h-2 bg-cyan-200/80" />
                      <div className="absolute inset-x-0 bottom-0 h-5 bg-gradient-to-r from-amber-200/85 via-orange-200/80 to-yellow-200/85" />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <Chip className="border border-white/30 bg-white/15 text-white">beach stage</Chip>
                      <Chip className="border border-white/30 bg-white/15 text-white">oceanfront vibe</Chip>
                      <Chip className="border border-white/30 bg-white/15 text-white">sunset energy</Chip>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="relative z-10 rounded-2xl border border-white/45 bg-white/58 p-4 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/72">
                {isVenusEvent ? (
                  <>
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">venus free pass tracker</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">{passesLeft} left</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">out of {VENUS_FREE_PASS_LIMIT} total passes</p>
                  </>
                ) : (
                  <>
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">entry model</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">fully paid</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">early bird GHS 50, regular GHS 100</p>
                  </>
                )}
              </div>

              <div className="relative z-10 rounded-2xl border border-white/45 bg-white/58 p-4 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/72">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">starting price</p>
                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {primaryDisplayPrice}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">secure your slot early before rates move up</p>
              </div>
            </CardBody>
          </Card>
        </section>

        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-slate-900 dark:text-slate-100">upcoming event</h2>
            <Chip className="bg-slate-900 text-white dark:bg-slate-700">1 active</Chip>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
                <Card key={activeMeta.name} className="relative overflow-hidden border border-white/45 bg-white/45 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/58 md:col-span-2">
                  <CardBody className="relative gap-4 [&>*]:relative [&>*]:z-10">
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/58 via-white/34 to-white/12 dark:from-slate-900/62 dark:via-slate-900/40 dark:to-slate-900/22" />
                    </div>

                    <div className="relative z-10 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                          <span className="text-[10px] uppercase tracking-[0.14em]">{activeMeta.month}</span>
                          <span className="text-lg font-bold leading-none">{activeMeta.day}</span>
                        </div>
                        <div>
                          <p className="text-slate-900 dark:text-slate-100">
                            <EventBrandName event={activeMeta} />
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{activeMeta.venue}, {activeMeta.city}</p>
                        </div>
                      </div>
                      <Chip className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">active vibe</Chip>
                    </div>

                    <div className="relative z-10 rounded-xl border border-white/45 bg-white/58 px-3 py-2 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/72">
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">from</p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{primaryDisplayPrice}</p>
                    </div>

                    <div className="relative z-10 flex flex-wrap items-center gap-2">
                      <Button
                        as={Link}
                        href={`/events/${activeMeta.slug}`}
                        className="border border-cyan-300/70 bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                      >
                        view details
                      </Button>
                      <Button
                        variant="flat"
                        className="border border-white/45 bg-white/58 text-slate-800 dark:border-slate-700/55 dark:bg-slate-950/66 dark:text-slate-100"
                        onPress={() => {
                          setActiveEvent(activeMeta.name);
                        }}
                      >
                        reserve table
                      </Button>
                    </div>
                  </CardBody>
                </Card>
          </div>
        </section>

        <section className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="relative overflow-hidden border border-white/45 bg-white/45 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/58">
            <CardBody className="relative gap-4 [&>*]:relative [&>*]:z-10">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/58 via-white/34 to-white/12 dark:from-slate-900/62 dark:via-slate-900/40 dark:to-slate-900/22" />
              </div>

              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">tickets for</h2>
                  <p className="mt-1 text-slate-900 dark:text-slate-100">
                    <EventBrandName event={activeMeta} />
                  </p>
                </div>
              </div>

              <div className="grid gap-3">
                {displayTickets.map((ticket) => (
                  <Card key={ticket.id} className="border border-white/45 bg-white/58 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/72">
                    <CardBody className="flex flex-row items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{ticket.name}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{ticket.price || primaryDisplayPrice}</p>
                      </div>
                      {ticket.link ? (
                        <Button
                          as={Link}
                          href={ticket.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-cyan-300/70 bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                        >
                          buy now
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

          <Card className="border border-white/45 bg-white/45 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/58">
            <CardBody className="gap-4">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                latest drops for {activeMeta.name.toLowerCase()}
              </h2>
              {mediaFeed.length === 0 ? (
                <p className="text-sm text-slate-600 dark:text-slate-400">media updates will show here when added from admin.</p>
              ) : (
                <div className="grid gap-2">
                  {mediaFeed.map((item) => (
                    <Card key={item.id} className="border border-white/45 bg-white/55 backdrop-blur-md dark:border-slate-700/55 dark:bg-slate-950/72">
                      <CardBody className="gap-1">
                        <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{item.type}</p>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                        <p className="truncate text-sm text-slate-600 dark:text-slate-400">{item.url}</p>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="relative overflow-hidden border border-white/45 bg-white/45 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/58">
            <CardBody className="relative gap-4 [&>*]:relative [&>*]:z-10">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/58 via-white/34 to-white/12 dark:from-slate-900/62 dark:via-slate-900/40 dark:to-slate-900/22" />
              </div>

              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                {isVenusEvent ? "reserve a free pass" : "paid entry only"}
              </h2>
              {isVenusEvent ? (
                <>
                  <Chip className="w-fit bg-slate-900 text-white dark:bg-slate-700">{passesLeft} passes left</Chip>
                  <div className="grid gap-3">
                    <Input label="your name" value={name} onValueChange={setName} />
                    <Input label="email" value={email} onValueChange={setEmail} type="email" />
                    <Input label="phone" value={phone} onValueChange={setPhone} />
                    <Chip className="w-fit bg-slate-900 text-white dark:bg-slate-700">
                      event: {activeMeta.name.toLowerCase()}
                    </Chip>
                    <Button
                      className="w-fit border border-cyan-300/70 bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                      isDisabled={passesLeft === 0}
                      onPress={() => {
                        if (!name || !email || !phone || passesLeft === 0) {
                          return;
                        }

                        const next = {
                          id: makeId(),
                          name,
                          email,
                          phone,
                          event: activeMeta.name,
                        };

                        setState((prev) => ({ ...prev, passes: [next, ...prev.passes] }));
                        setName("");
                        setEmail("");
                        setPhone("");
                      }}
                    >
                      reserve pass
                    </Button>
                  </div>
                </>
              ) : (
                <div className="grid gap-3">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    We Outside is fully paid. Grab early bird or regular tickets.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Chip className="border border-cyan-300/70 bg-cyan-100 text-cyan-900 dark:bg-cyan-900/35 dark:text-cyan-100">
                      early bird: GHS 50
                    </Chip>
                    <Chip className="border border-emerald-300/70 bg-emerald-100 text-emerald-900 dark:bg-emerald-900/35 dark:text-emerald-100">
                      regular: GHS 100
                    </Chip>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>

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
                  event: {activeMeta.name.toLowerCase()}
                </Chip>
                <Textarea label="notes" value={reserveNotes} onValueChange={setReserveNotes} />
                <Button
                  className="w-fit bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                  onPress={() => {
                    if (!reserveName || !reservePhone) {
                      return;
                    }

                    const next = {
                      id: makeId(),
                      name: reserveName,
                      phone: reservePhone,
                      event: activeMeta.name,
                      notes: reserveNotes,
                    };

                    setState((prev) => ({ ...prev, reservations: [next, ...prev.reservations] }));
                    setReserveName("");
                    setReservePhone("");
                    setReserveNotes("");
                  }}
                >
                  send reservation
                </Button>
              </div>
            </CardBody>
          </Card>
        </section>
      </main>
    </div>
  );
}


