"use client";

import {
  Button,
  Card,
  CardBody,
  Chip,
  Image,
  Input,
  Link,
  Navbar,
  NavbarBrand,
  Textarea,
} from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { useThemeMode } from "@/components/ThemeModeProvider";

const STORAGE_KEY = "zyra_admin_state_v1";
const VISITOR_COUNT_KEY = "zyra_visitor_count_v1";
const VISITOR_SESSION_KEY = "zyra_visitor_counted_v1";

type TicketItem = { id: string; name: string; price: string; link: string };
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

type EventName = "We Outside" | "VENUS";

type EventMeta = {
  name: EventName;
  day: string;
  month: string;
  venue: string;
  city: string;
  logo: string;
  bannerTone: string;
  auraA: string;
  auraB: string;
  fallbackPrice: string;
};

const EVENTS: EventMeta[] = [
  {
    name: "We Outside",
    day: "22",
    month: "MAR",
    venue: "The Garden Arena",
    city: "Accra",
    logo: "/Weoutside.logo.org2.png",
    bannerTone: "from-cyan-500 to-emerald-500",
    auraA: "rgba(6,182,212,0.34)",
    auraB: "rgba(34,197,94,0.28)",
    fallbackPrice: "GHS 80",
  },
  {
    name: "VENUS",
    day: "04",
    month: "APR",
    venue: "Skyline Rooftop",
    city: "Accra",
    logo: "/VENUS_logo.PNG",
    bannerTone: "from-indigo-500 to-fuchsia-500",
    auraA: "rgba(99,102,241,0.36)",
    auraB: "rgba(217,70,239,0.28)",
    fallbackPrice: "GHS 120",
  },
];

const FALLBACK_TICKETS: TicketItem[] = [
  { id: "general", name: "general admission", price: "GHS 80", link: "" },
  { id: "vip", name: "vip pass", price: "GHS 200", link: "" },
];

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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const activeMeta = useMemo(() => EVENTS.find((item) => item.name === activeEvent) ?? EVENTS[0], [activeEvent]);
  const navToneClass =
    theme === "dark"
      ? activeEvent === "VENUS"
        ? "from-indigo-600/50 via-fuchsia-600/30 to-slate-900/25 border-indigo-300/20"
        : "from-emerald-500/45 via-cyan-500/30 to-slate-900/25 border-cyan-300/20"
      : activeEvent === "VENUS"
        ? "from-violet-400/70 via-fuchsia-400/62 to-rose-200/55 border-fuchsia-400/55"
        : "from-emerald-400/70 via-cyan-400/62 to-blue-200/55 border-cyan-400/55";

  const themeStyle = useMemo(
    () => ({
      background:
        theme === "dark"
          ? activeEvent === "VENUS"
            ? `radial-gradient(1180px 720px at 8% -12%, ${activeMeta.auraA}, transparent 64%), radial-gradient(1020px 620px at 90% -8%, ${activeMeta.auraB}, transparent 62%), radial-gradient(1000px 640px at 50% 112%, rgba(59,130,246,0.3), transparent 70%), linear-gradient(180deg, #2f0f74 0%, #1b1f63 44%, #0b1237 100%)`
            : `radial-gradient(1180px 720px at 8% -12%, ${activeMeta.auraA}, transparent 64%), radial-gradient(1020px 620px at 90% -8%, ${activeMeta.auraB}, transparent 62%), radial-gradient(1000px 640px at 50% 112%, rgba(56,189,248,0.3), transparent 70%), linear-gradient(180deg, #1f5c4b 0%, #123f63 44%, #0a1538 100%)`
          : activeEvent === "VENUS"
            ? `radial-gradient(1120px 680px at 10% -14%, rgba(139,92,246,0.54), transparent 64%), radial-gradient(980px 580px at 90% -8%, rgba(236,72,153,0.46), transparent 62%), radial-gradient(980px 600px at 50% 112%, rgba(99,102,241,0.32), transparent 70%), linear-gradient(180deg, #f6f0ff 0%, #eceeff 52%, #d8e3ff 100%)`
            : `radial-gradient(1120px 680px at 10% -14%, rgba(16,185,129,0.52), transparent 64%), radial-gradient(980px 580px at 90% -8%, rgba(6,182,212,0.46), transparent 62%), radial-gradient(980px 600px at 50% 112%, rgba(59,130,246,0.3), transparent 70%), linear-gradient(180deg, #ecfffb 0%, #ebf8ff 52%, #d3e7ff 100%)`,
    }),
    [activeEvent, activeMeta.auraA, activeMeta.auraB, theme]
  );

  const tickets = state.tickets.length > 0 ? state.tickets : FALLBACK_TICKETS;
  const passesLeft = Math.max(0, state.passLimit - state.passes.length);

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
    <div className="relative min-h-screen overflow-x-clip text-slate-900 transition-[background] duration-500 ease-out dark:text-slate-100" style={themeStyle}>
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-white/8 backdrop-blur-[2px] dark:bg-slate-900/10" />
        <div
          className="absolute inset-0 bg-center bg-no-repeat opacity-[0.13] mix-blend-multiply transition-opacity duration-500 dark:opacity-[0.2] dark:mix-blend-screen"
          style={{
            backgroundImage: `url(${activeMeta.logo})`,
            backgroundSize: "min(62vw, 500px)",
          }}
        />
      </div>

      <Navbar className={`relative z-10 border-b bg-gradient-to-r backdrop-blur-2xl ${navToneClass}`}>
        <NavbarBrand className="px-1 py-1">
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
        </NavbarBrand>
      </Navbar>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
        <section className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border border-white/45 bg-white/45 backdrop-blur-2xl dark:border-slate-700/55 dark:bg-slate-900/45">
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

              <div className="grid gap-2 sm:grid-cols-2">
                {EVENTS.map((event) => (
                  <Button
                    key={event.name}
                    variant="flat"
                    className={`h-auto justify-start border p-3 ${
                      activeEvent === event.name
                        ? "border-cyan-300/80 bg-cyan-50 text-slate-900 dark:border-cyan-400/50 dark:bg-cyan-900/30 dark:text-slate-100"
                        : "border-white/45 bg-white/55 text-slate-800 dark:border-slate-700/55 dark:bg-slate-900/50 dark:text-slate-200"
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

          <Card className="relative overflow-hidden border border-white/45 bg-white/45 backdrop-blur-2xl dark:border-slate-700/55 dark:bg-slate-900/45">
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
              </div>

              <div className="relative z-10 rounded-2xl border border-white/45 bg-white/58 p-4 backdrop-blur-2xl dark:border-slate-700/55 dark:bg-slate-950/52">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">free pass tracker</p>
                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">{passesLeft} left</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">out of {state.passLimit} total passes</p>
              </div>

              <div className="relative z-10 rounded-2xl border border-white/45 bg-white/58 p-4 backdrop-blur-2xl dark:border-slate-700/55 dark:bg-slate-950/52">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">starting price</p>
                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {tickets[0]?.price || activeMeta.fallbackPrice}
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
                <Card key={activeMeta.name} className="relative overflow-hidden border border-white/45 bg-white/45 backdrop-blur-2xl dark:border-slate-700/55 dark:bg-slate-900/45 md:col-span-2">
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

                    <div className="relative z-10 rounded-xl border border-white/45 bg-white/58 px-3 py-2 backdrop-blur-2xl dark:border-slate-700/55 dark:bg-slate-950/52">
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">from</p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{tickets[0]?.price || activeMeta.fallbackPrice}</p>
                    </div>

                    <div className="relative z-10 flex flex-wrap items-center gap-2">
                      <Button
                        className="border border-cyan-300/70 bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                        onPress={() => setActiveEvent(activeMeta.name)}
                      >
                        view tickets
                      </Button>
                      <Button
                        variant="flat"
                        className="border border-white/45 bg-white/58 text-slate-800 dark:border-slate-700/55 dark:bg-slate-900/55 dark:text-slate-100"
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
          <Card className="relative overflow-hidden border border-white/45 bg-white/45 backdrop-blur-2xl dark:border-slate-700/55 dark:bg-slate-900/45">
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
                {tickets.map((ticket) => (
                  <Card key={ticket.id} className="border border-white/45 bg-white/58 backdrop-blur-2xl dark:border-slate-700/55 dark:bg-slate-950/52">
                    <CardBody className="flex flex-row items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{ticket.name}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{ticket.price || activeMeta.fallbackPrice}</p>
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

          <Card className="border border-white/45 bg-white/45 backdrop-blur-2xl dark:border-slate-700/55 dark:bg-slate-900/45">
            <CardBody className="gap-4">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                latest drops for {activeMeta.name.toLowerCase()}
              </h2>
              {mediaFeed.length === 0 ? (
                <p className="text-sm text-slate-600 dark:text-slate-400">media updates will show here when added from admin.</p>
              ) : (
                <div className="grid gap-2">
                  {mediaFeed.map((item) => (
                    <Card key={item.id} className="border border-white/45 bg-white/55 backdrop-blur-xl dark:border-slate-700/55 dark:bg-slate-950/52">
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
          <Card className="relative overflow-hidden border border-white/45 bg-white/45 backdrop-blur-2xl dark:border-slate-700/55 dark:bg-slate-900/45">
            <CardBody className="relative gap-4 [&>*]:relative [&>*]:z-10">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/58 via-white/34 to-white/12 dark:from-slate-900/62 dark:via-slate-900/40 dark:to-slate-900/22" />
              </div>

              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">reserve a free pass</h2>
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
            </CardBody>
          </Card>

          <Card className="relative overflow-hidden border border-white/45 bg-white/45 backdrop-blur-2xl dark:border-slate-700/55 dark:bg-slate-900/45">
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

