"use client";

import {
  Button,
  Card,
  CardBody,
  Chip,
  Image,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  Textarea,
} from "@heroui/react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

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

const defaultState: AdminState = {
  brandName: "zyra",
  headline: "Welcome to the house of legendary parties",
  subhead: "We Outside · VENUS",
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

export default function VisitorPage() {
  const [state, setState] = useState<AdminState>(defaultState);
  const [visitorCount, setVisitorCount] = useState(0);
  const [activeEvent, setActiveEvent] = useState<"We Outside" | "VENUS">("We Outside");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventName, setEventName] = useState("We Outside");
  const [reserveName, setReserveName] = useState("");
  const [reservePhone, setReservePhone] = useState("");
  const [reserveEvent, setReserveEvent] = useState("We Outside");
  const [reserveNotes, setReserveNotes] = useState("");
  const [revealOpen, setRevealOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as AdminState;
        setState({ ...defaultState, ...parsed });
      } catch {
        setState(defaultState);
      }
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(VISITOR_SESSION_KEY)) {
      const current = Number(localStorage.getItem(VISITOR_COUNT_KEY) ?? "0");
      setVisitorCount(current);
      return;
    }

    const next = Number(localStorage.getItem(VISITOR_COUNT_KEY) ?? "0") + 1;
    localStorage.setItem(VISITOR_COUNT_KEY, String(next));
    sessionStorage.setItem(VISITOR_SESSION_KEY, "1");
    setVisitorCount(next);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    setEventName(activeEvent);
    setReserveEvent(activeEvent);
  }, [activeEvent]);

  const themeStyle = useMemo(
    () => ({
      background: `radial-gradient(1200px 600px at 10% -10%, ${state.primary}33, transparent), radial-gradient(900px 500px at 90% 10%, ${state.secondary}33, transparent)`,
    }),
    [state.primary, state.secondary]
  );

  const passesLeft = Math.max(0, state.passLimit - state.passes.length);
  const isVenus = activeEvent === "VENUS";
  const eventLogo = isVenus ? "/VENUS_logo.PNG" : "/Weoutside.logo.org2.png";
  const headlineColor = isVenus ? "#f5f3ff" : "#fff7ed";
  const subheadColor = isVenus ? "#e9d5ff" : "#fef3c7";

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={themeStyle}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(${eventLogo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "min(85vw, 420px)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-multiply opacity-80"
          style={{
            background: isVenus
              ? "radial-gradient(700px 360px at 20% 20%, rgba(168,85,247,0.85), transparent), radial-gradient(600px 320px at 80% 25%, rgba(59,130,246,0.8), transparent), linear-gradient(120deg, rgba(88,28,135,0.35), rgba(30,58,138,0.35))"
              : "radial-gradient(700px 360px at 20% 20%, rgba(253,186,116,0.8), transparent), radial-gradient(600px 320px at 80% 25%, rgba(34,197,94,0.7), transparent), linear-gradient(120deg, rgba(245,158,11,0.35), rgba(14,165,233,0.35))",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        {isVenus ? (
          <>
            <motion.div
              className="absolute -top-24 -left-16 h-64 w-64 rounded-full blur-3xl"
              style={{ background: `radial-gradient(circle, ${state.secondary}aa, transparent 70%)` }}
              animate={{ y: [0, 30, 0], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-10 right-10 h-72 w-72 rounded-full blur-3xl"
              style={{ background: `radial-gradient(circle, ${state.primary}99, transparent 70%)` }}
              animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(15,23,42,0.35), transparent 70%)" }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        ) : (
          <>
            <motion.div
              className="absolute -top-16 right-20 h-52 w-52 rounded-full blur-2xl"
              style={{ background: "radial-gradient(circle, rgba(14,165,233,0.45), transparent 70%)" }}
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-32 left-10 h-72 w-72 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(34,197,94,0.35), transparent 70%)" }}
              animate={{ x: [0, 25, 0], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(59,130,246,0.35), transparent 70%)" }}
              animate={{ y: [0, -30, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
      </div>
      <Navbar className="bg-transparent">
        <NavbarBrand className="flex items-center gap-3 font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-900">
          <span className="flex items-center gap-2">
            {state.brandName}
            <Image
              removeWrapper
              alt="233 events logo"
              src="/233-events-logo.png"
              className="h-7 w-auto"
            />
          </span>
        </NavbarBrand>
        <NavbarContent justify="end">
          <Chip className="bg-slate-900 text-white">legendary nights</Chip>
        </NavbarContent>
      </Navbar>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 pt-8 sm:pt-10">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <h1
            className="font-[family-name:var(--font-bricolage)] text-3xl sm:text-6xl font-extrabold tracking-tight drop-shadow-[0_10px_30px_rgba(15,23,42,0.6)]"
            style={{ color: headlineColor }}
          >
            {state.headline}
          </h1>
          <p
            className="mt-2 font-[family-name:var(--font-space-grotesk)] font-semibold drop-shadow-[0_4px_12px_rgba(15,23,42,0.35)]"
            style={{ color: subheadColor }}
          />
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-white/90">
            <Chip className="bg-black/70 text-white">25+ legendary events since 2021</Chip>
            <Chip className="bg-black/70 text-white">7k+ people already pulled up</Chip>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              className={
                activeEvent === "We Outside"
                  ? "bg-blue-600 text-white shadow-lg px-3 sm:px-4"
                  : "bg-white/95 text-slate-700 shadow-lg px-3 sm:px-4"
              }
              onPress={() => setActiveEvent("We Outside")}
            >
              <span className="rounded-xl bg-white px-3 py-2 shadow-md">
                <Image
                  removeWrapper
                  alt="We Outside logo"
                  src="/Weoutside.logo.org2.png"
                  className="h-12 sm:h-16 w-auto drop-shadow-[0_10px_24px_rgba(15,23,42,0.55)]"
                />
              </span>
            </Button>
            <Button
              className={
                activeEvent === "VENUS"
                  ? "bg-violet-600 text-white shadow-lg px-3 sm:px-4"
                  : "bg-white/95 text-slate-700 shadow-lg px-3 sm:px-4"
              }
              onPress={() => setActiveEvent("VENUS")}
            >
              <span className="rounded-xl bg-white px-3 py-2 shadow-md flex items-center justify-center self-center">
                <Image
                  removeWrapper
                  alt="VENUS logo"
                  src="/VENUS_logo.PNG"
                  className="h-16 sm:h-20 w-auto drop-shadow-[0_12px_28px_rgba(15,23,42,0.6)]"
                />
              </span>
            </Button>
          </div>
        </motion.section>

        <section className="grid gap-6">
          <Card className="relative overflow-hidden bg-white/50 backdrop-blur-2xl border border-violet-100/60">
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(120deg, rgba(255,255,255,0.02), rgba(255,255,255,0.18), rgba(255,255,255,0.02))",
              }}
              animate={{ x: ["12%", "-12%", "12%"] }}
              transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
            />
            <CardBody className="gap-4">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-slate-900">
                Legendary moments
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {state.videos.length === 0 ? (
                  <p className="text-sm text-slate-600">videos coming soon</p>
                ) : (
                  state.videos.map((video) => (
                    <Card key={video.id} className="bg-white/90">
                      <CardBody className="gap-2">
                        <p className="font-semibold text-slate-900">{video.title}</p>
                        <p className="text-sm text-slate-600">{video.url}</p>
                      </CardBody>
                    </Card>
                  ))
                )}
                {state.photos.length === 0 ? (
                  <p className="text-sm text-slate-600">photos coming soon</p>
                ) : (
                  state.photos.map((photo) => (
                    <Card key={photo.id} className="bg-white/90">
                      <CardBody className="gap-2">
                        <p className="font-semibold text-slate-900">{photo.caption}</p>
                        <p className="text-sm text-slate-600">{photo.url}</p>
                      </CardBody>
                    </Card>
                  ))
                )}
              </div>
            </CardBody>
          </Card>
        </section>

        <div className="mt-6">
          <motion.div
            className="inline-block"
            animate={{ y: [0, -6, 0], rotate: [0, -1.5, 1.5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Button
              className="bg-white text-slate-900 font-semibold shadow-lg"
              onPress={() => setRevealOpen((prev) => !prev)}
            >
              join the experience
            </Button>
          </motion.div>
        </div>

        {revealOpen && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="relative overflow-hidden bg-white/50 backdrop-blur-2xl border border-blue-100/60">
              <motion.div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(255,255,255,0.02), rgba(255,255,255,0.18), rgba(255,255,255,0.02))",
                }}
                animate={{ x: ["-15%", "15%", "-15%"] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              />
              <CardBody className="gap-4">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-slate-900">
                  Reserve a free pass
                </h2>
                <Chip className="bg-violet-600 text-white w-fit">
                  {passesLeft} passes left
                </Chip>
                <div className="grid gap-3">
                  <Input label="Your name" value={name} onValueChange={setName} />
                  <Input label="Email" value={email} onValueChange={setEmail} />
                  <Input label="Phone" value={phone} onValueChange={setPhone} />
                  <Input
                    label="Event"
                    value={eventName}
                    onValueChange={setEventName}
                  />
                  <Button
                    className="bg-blue-600 text-white w-fit"
                    isDisabled={passesLeft === 0}
                    onPress={() => {
                      if (!name || !email || !phone || passesLeft === 0) return;
                      const next = {
                        id: makeId(),
                        name,
                        email,
                        phone,
                        event: eventName,
                      };
                      setState((prev) => ({
                        ...prev,
                        passes: [next, ...prev.passes],
                      }));
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

            <Card className="relative overflow-hidden bg-white/50 backdrop-blur-2xl border border-violet-100/60">
              <motion.div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(255,255,255,0.02), rgba(255,255,255,0.18), rgba(255,255,255,0.02))",
                }}
                animate={{ x: ["15%", "-15%", "15%"] }}
                transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
              />
              <CardBody className="gap-4">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-slate-900">
                  Tickets
                </h2>
                <div className="grid gap-3">
                  {state.tickets.length === 0 ? (
                    <p className="text-sm text-slate-600">tickets coming soon</p>
                  ) : (
                    state.tickets.map((ticket) => (
                      <Card key={ticket.id} className="bg-white/90">
                        <CardBody className="gap-2">
                          <p className="font-semibold text-slate-900">{ticket.name}</p>
                          <p className="text-sm text-slate-600">{ticket.price}</p>
                          {ticket.link ? (
                            <Button className="bg-violet-600 text-white w-fit">
                              buy now
                            </Button>
                          ) : null}
                        </CardBody>
                      </Card>
                    ))
                  )}
                </div>
              </CardBody>
            </Card>
          </section>
        )}

        {revealOpen && (
          <section className="mt-8 grid gap-6">
            <Card className="relative overflow-hidden bg-white/50 backdrop-blur-2xl border border-blue-100/60">
              <motion.div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(255,255,255,0.02), rgba(255,255,255,0.18), rgba(255,255,255,0.02))",
                }}
                animate={{ x: ["-12%", "12%", "-12%"] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              />
              <CardBody className="gap-4">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-slate-900">
                  Make a reservation
                </h2>
                <div className="grid gap-3">
                  <Input label="Your name" value={reserveName} onValueChange={setReserveName} />
                  <Input label="Phone" value={reservePhone} onValueChange={setReservePhone} />
                  <Input label="Event" value={reserveEvent} onValueChange={setReserveEvent} />
                  <Textarea label="Notes" value={reserveNotes} onValueChange={setReserveNotes} />
                  <Button
                    className="bg-slate-900 text-white w-fit"
                    onPress={() => {
                      if (!reserveName || !reservePhone) return;
                      const next = {
                        id: makeId(),
                        name: reserveName,
                        phone: reservePhone,
                        event: reserveEvent,
                        notes: reserveNotes,
                      };
                      setState((prev) => ({
                        ...prev,
                        reservations: [next, ...prev.reservations],
                      }));
                      setReserveName("");
                      setReservePhone("");
                      setReserveNotes("");
                    }}
                  >
                    send request
                  </Button>
                </div>
              </CardBody>
            </Card>
          </section>
        )}
      </main>
    </div>
  );
}
