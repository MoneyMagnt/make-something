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
  NavbarContent,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
} from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const STORAGE_KEY = "zyra_admin_state_v1";
const VISITOR_COUNT_KEY = "zyra_visitor_count_v1";

type VideoItem = { id: string; title: string; url: string };
type PhotoItem = { id: string; caption: string; url: string };
type AttendeeItem = {
  id: string;
  name: string;
  email: string;
  event: string;
  ticket: string;
};
type TicketItem = { id: string; name: string; price: string; link: string };
type PassItem = {
  id: string;
  name: string;
  email: string;
  phone: string;
  event: string;
};

type AdminState = {
  brandName: string;
  headline: string;
  subhead: string;
  primary: string;
  secondary: string;
  passLimit: number;
  videos: VideoItem[];
  photos: PhotoItem[];
  attendees: AttendeeItem[];
  tickets: TicketItem[];
  passes: PassItem[];
};

const defaultState: AdminState = {
  brandName: "zyra",
  headline: "Welcome to the house of legendary parties",
  subhead: "We Outside · VENUS",
  primary: "#2563eb",
  secondary: "#7c3aed",
  passLimit: 200,
  videos: [],
  photos: [],
  attendees: [],
  tickets: [],
  passes: [],
};

const makeId = () => Math.random().toString(36).slice(2, 10);

export default function AdminPage() {
  const [state, setState] = useState<AdminState>(defaultState);
  const [visitorCount, setVisitorCount] = useState(0);
  const [passcode, setPasscode] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState("design");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [photoCaption, setPhotoCaption] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [attendeeName, setAttendeeName] = useState("");
  const [attendeeEmail, setAttendeeEmail] = useState("");
  const [attendeeEvent, setAttendeeEvent] = useState("We Outside");
  const [attendeeTicket, setAttendeeTicket] = useState("General");
  const [ticketName, setTicketName] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [ticketLink, setTicketLink] = useState("");
  const [passLimitInput, setPassLimitInput] = useState("200");

  const tryAuth = () => {
    setIsAuthed(passcode === "233");
  };

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as AdminState;
        setState({ ...defaultState, ...parsed });
        setPassLimitInput(String(parsed.passLimit ?? 200));
      } catch {
        setState(defaultState);
        setPassLimitInput(String(defaultState.passLimit));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const current = Number(localStorage.getItem(VISITOR_COUNT_KEY) ?? "0");
    setVisitorCount(current);
  }, []);

  const themeStyle = useMemo(
    () => ({
      background: `radial-gradient(1200px 600px at 10% -10%, ${state.primary}33, transparent), radial-gradient(900px 500px at 90% 10%, ${state.secondary}33, transparent)`,
    }),
    [state.primary, state.secondary]
  );

  const passUsage = `${state.passes.length}/${state.passLimit}`;
  const passPercent =
    state.passLimit > 0 ? Math.round((state.passes.length / state.passLimit) * 100) : 0;

  const eventCounts = useMemo(() => {
    const counts = new Map<string, number>();
    state.passes.forEach((pass) => {
      counts.set(pass.event, (counts.get(pass.event) ?? 0) + 1);
    });
    state.attendees.forEach((attendee) => {
      counts.set(attendee.event, (counts.get(attendee.event) ?? 0) + 1);
    });
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [state.passes, state.attendees]);

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={themeStyle}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: "url(/233-events-logo.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "min(65vw, 520px)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-multiply opacity-70"
          style={{
            background:
              "radial-gradient(700px 360px at 20% 20%, rgba(59,130,246,0.55), transparent), radial-gradient(600px 320px at 80% 25%, rgba(139,92,246,0.55), transparent), linear-gradient(120deg, rgba(59,130,246,0.25), rgba(139,92,246,0.25))",
          }}
        />
        <div className="absolute inset-0 bg-white/10" />
      </div>

      {!isAuthed ? (
        <main className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-6 px-6">
          <Card className="w-full bg-white/80 backdrop-blur border border-blue-100/60">
            <CardBody className="gap-4">
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-slate-900">
                Admin access
              </h1>
              <Input
                label="Passcode"
                type="password"
                value={passcode}
                onValueChange={setPasscode}
                onKeyDown={(event) => {
                  if (event.key === "Enter") tryAuth();
                }}
              />
              <Button className="bg-slate-900 text-white w-fit" onPress={tryAuth} isDisabled={!passcode}>
                enter
              </Button>
              {passcode && passcode !== "233" ? (
                <p className="text-sm text-rose-600">wrong passcode</p>
              ) : null}
            </CardBody>
          </Card>
        </main>
      ) : (
        <>
          <Navbar className="bg-transparent relative z-10">
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
              <span className="text-sm font-medium text-slate-500">admin</span>
            </NavbarBrand>
            <NavbarContent justify="end">
              <Button
                as={Link}
                href="/visitor"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 text-white"
              >
                preview visitor site
              </Button>
              <Button className="bg-white text-slate-900" onPress={() => setIsAuthed(false)}>
                log out
              </Button>
              <Chip className="bg-slate-900 text-white">event control</Chip>
            </NavbarContent>
          </Navbar>

          <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pb-16 pt-8">
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8"
            >
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-4xl font-bold text-slate-900">
                {state.headline}
              </h1>
              <p className="text-slate-600 mt-2">{state.subhead}</p>
            </motion.section>

            <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex items-center gap-2 w-max">
                {[
                  { key: "design", label: "Design" },
                  { key: "media", label: "Media" },
                  { key: "attendees", label: "Attendees" },
                  { key: "tickets", label: "Tickets & passes" },
                  { key: "analytics", label: "Analytics" },
                ].map((item) => (
                  <Button
                    key={item.key}
                    size="sm"
                    className={
                      activeTab === item.key
                        ? "bg-slate-900 text-white"
                        : "bg-white/90 text-slate-700"
                    }
                    onPress={() => setActiveTab(item.key)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            {activeTab === "design" && (
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <Card className="bg-white/80 backdrop-blur border border-blue-100/60">
                  <CardBody className="gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        label="Brand name"
                        value={state.brandName}
                        onValueChange={(value) =>
                          setState((prev) => ({ ...prev, brandName: value }))
                        }
                      />
                      <Input
                        label="Headline"
                        value={state.headline}
                        onValueChange={(value) =>
                          setState((prev) => ({ ...prev, headline: value }))
                        }
                      />
                    </div>
                    <Textarea
                      label="Subhead"
                      value={state.subhead}
                      onValueChange={(value) =>
                        setState((prev) => ({ ...prev, subhead: value }))
                      }
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        label="Primary color"
                        value={state.primary}
                        onValueChange={(value) =>
                          setState((prev) => ({ ...prev, primary: value }))
                        }
                      />
                      <Input
                        label="Secondary color"
                        value={state.secondary}
                        onValueChange={(value) =>
                          setState((prev) => ({ ...prev, secondary: value }))
                        }
                      />
                    </div>
                  </CardBody>
                </Card>

                <Card className="bg-white/80 backdrop-blur border border-violet-100/60">
                  <CardBody className="gap-3">
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-900">
                      Live preview
                    </h2>
                    <div
                      className="rounded-xl p-5 text-white"
                      style={{
                        background: `linear-gradient(120deg, ${state.primary}, ${state.secondary})`,
                      }}
                    >
                      <p className="uppercase tracking-[0.2em] text-xs">{state.brandName}</p>
                      <p className="text-2xl font-semibold mt-2">{state.headline}</p>
                      <p className="text-sm mt-2">{state.subhead}</p>
                      <div className="mt-4 flex gap-2">
                        <Button className="bg-white text-slate-900">we outside</Button>
                        <Button className="bg-black/30 text-white" variant="flat">
                          venus
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}

            {activeTab === "media" && (
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="bg-white/80 backdrop-blur border border-blue-100/60">
                  <CardBody className="gap-4">
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-900">
                      Event videos
                    </h2>
                    <div className="grid gap-3">
                      <Input label="Video title" value={videoTitle} onValueChange={setVideoTitle} />
                      <Input label="Video URL" value={videoUrl} onValueChange={setVideoUrl} />
                      <Button
                        className="bg-blue-600 text-white w-fit"
                        onPress={() => {
                          if (!videoTitle || !videoUrl) return;
                          setState((prev) => ({
                            ...prev,
                            videos: [
                              { id: makeId(), title: videoTitle, url: videoUrl },
                              ...prev.videos,
                            ],
                          }));
                          setVideoTitle("");
                          setVideoUrl("");
                        }}
                        isDisabled={!videoTitle || !videoUrl}
                      >
                        add video
                      </Button>
                    </div>
                    <div className="grid gap-3">
                      {state.videos.map((video) => (
                        <Card key={video.id} className="bg-white/90">
                          <CardBody className="gap-2">
                            <p className="font-semibold text-slate-900">{video.title}</p>
                            <p className="text-sm text-slate-600">{video.url}</p>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  </CardBody>
                </Card>

                <Card className="bg-white/80 backdrop-blur border border-violet-100/60">
                  <CardBody className="gap-4">
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-900">
                      Event photos
                    </h2>
                    <div className="grid gap-3">
                      <Input label="Photo caption" value={photoCaption} onValueChange={setPhotoCaption} />
                      <Input label="Photo URL" value={photoUrl} onValueChange={setPhotoUrl} />
                      <Button
                        className="bg-violet-600 text-white w-fit"
                        onPress={() => {
                          if (!photoCaption || !photoUrl) return;
                          setState((prev) => ({
                            ...prev,
                            photos: [
                              { id: makeId(), caption: photoCaption, url: photoUrl },
                              ...prev.photos,
                            ],
                          }));
                          setPhotoCaption("");
                          setPhotoUrl("");
                        }}
                        isDisabled={!photoCaption || !photoUrl}
                      >
                        add photo
                      </Button>
                    </div>
                    <div className="grid gap-3">
                      {state.photos.map((photo) => (
                        <Card key={photo.id} className="bg-white/90">
                          <CardBody className="gap-2">
                            <p className="font-semibold text-slate-900">{photo.caption}</p>
                            <p className="text-sm text-slate-600">{photo.url}</p>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}

            {activeTab === "attendees" && (
              <Card className="bg-white/80 backdrop-blur border border-blue-100/60">
                <CardBody className="gap-4">
                  <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-900">
                    Attendee data
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input label="Name" value={attendeeName} onValueChange={setAttendeeName} />
                    <Input label="Email" value={attendeeEmail} onValueChange={setAttendeeEmail} />
                    <Input label="Event" value={attendeeEvent} onValueChange={setAttendeeEvent} />
                    <Input label="Ticket type" value={attendeeTicket} onValueChange={setAttendeeTicket} />
                  </div>
                  <Button
                    className="bg-blue-600 text-white w-fit"
                    onPress={() => {
                      if (!attendeeName || !attendeeEmail) return;
                      setState((prev) => ({
                        ...prev,
                        attendees: [
                          {
                            id: makeId(),
                            name: attendeeName,
                            email: attendeeEmail,
                            event: attendeeEvent,
                            ticket: attendeeTicket,
                          },
                          ...prev.attendees,
                        ],
                      }));
                      setAttendeeName("");
                      setAttendeeEmail("");
                    }}
                    isDisabled={!attendeeName || !attendeeEmail}
                  >
                    add attendee
                  </Button>

                  <div className="overflow-x-auto">
                    <Table aria-label="Attendee list" className="bg-white/90 min-w-[520px]">
                      <TableHeader>
                        <TableColumn>Name</TableColumn>
                        <TableColumn>Email</TableColumn>
                        <TableColumn>Event</TableColumn>
                        <TableColumn>Ticket</TableColumn>
                      </TableHeader>
                      <TableBody emptyContent="no attendees yet">
                        {state.attendees.map((attendee) => (
                          <TableRow key={attendee.id}>
                            <TableCell>{attendee.name}</TableCell>
                            <TableCell>{attendee.email}</TableCell>
                            <TableCell>{attendee.event}</TableCell>
                            <TableCell>{attendee.ticket}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            )}

            {activeTab === "tickets" && (
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="bg-white/80 backdrop-blur border border-blue-100/60">
                  <CardBody className="gap-4">
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-900">
                      Ticket setup
                    </h2>
                    <div className="grid gap-3">
                      <Input label="Ticket name" value={ticketName} onValueChange={setTicketName} />
                      <Input label="Price" value={ticketPrice} onValueChange={setTicketPrice} />
                      <Input label="Purchase link" value={ticketLink} onValueChange={setTicketLink} />
                      <Button
                        className="bg-blue-600 text-white w-fit"
                        onPress={() => {
                          if (!ticketName || !ticketPrice) return;
                          setState((prev) => ({
                            ...prev,
                            tickets: [
                              { id: makeId(), name: ticketName, price: ticketPrice, link: ticketLink },
                              ...prev.tickets,
                            ],
                          }));
                          setTicketName("");
                          setTicketPrice("");
                          setTicketLink("");
                        }}
                        isDisabled={!ticketName || !ticketPrice}
                      >
                        add ticket
                      </Button>
                    </div>
                    <div className="grid gap-3">
                      {state.tickets.map((ticket) => (
                        <Card key={ticket.id} className="bg-white/90">
                          <CardBody className="gap-2">
                            <p className="font-semibold text-slate-900">{ticket.name}</p>
                            <p className="text-sm text-slate-600">{ticket.price}</p>
                            {ticket.link ? (
                              <p className="text-xs text-slate-500">{ticket.link}</p>
                            ) : null}
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  </CardBody>
                </Card>

                <Card className="bg-white/80 backdrop-blur border border-violet-100/60">
                  <CardBody className="gap-4">
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-900">
                      Free pass control
                    </h2>
                    <div className="grid gap-3">
                      <Input label="Pass limit" value={passLimitInput} onValueChange={setPassLimitInput} />
                      <Button
                        className="bg-violet-600 text-white w-fit"
                        onPress={() => {
                          const next = Number(passLimitInput || 0);
                          if (!Number.isFinite(next) || next <= 0) return;
                          setState((prev) => ({ ...prev, passLimit: next }));
                        }}
                        isDisabled={!passLimitInput}
                      >
                        set limit
                      </Button>
                      <Chip className="bg-slate-900 text-white w-fit">{passUsage} used</Chip>
                    </div>

                    <div className="overflow-x-auto">
                      <Table aria-label="Pass reservations" className="bg-white/90 min-w-[520px]">
                        <TableHeader>
                          <TableColumn>Name</TableColumn>
                          <TableColumn>Email</TableColumn>
                          <TableColumn>Phone</TableColumn>
                          <TableColumn>Event</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent="no passes yet">
                          {state.passes.map((pass) => (
                            <TableRow key={pass.id}>
                              <TableCell>{pass.name}</TableCell>
                              <TableCell>{pass.email}</TableCell>
                              <TableCell>{pass.phone}</TableCell>
                              <TableCell>{pass.event}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}

            {activeTab === "analytics" && (
              <>
                <div className="grid gap-6 lg:grid-cols-4">
                  <Card className="bg-white/80 backdrop-blur border border-blue-100/60">
                    <CardBody className="gap-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Passes</p>
                      <p className="text-3xl font-semibold text-slate-900">{passUsage}</p>
                      <p className="text-sm text-slate-600">{passPercent}% used</p>
                    </CardBody>
                  </Card>
                  <Card className="bg-white/80 backdrop-blur border border-violet-100/60">
                    <CardBody className="gap-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Attendees</p>
                      <p className="text-3xl font-semibold text-slate-900">{state.attendees.length}</p>
                      <p className="text-sm text-slate-600">total recorded</p>
                    </CardBody>
                  </Card>
                  <Card className="bg-white/80 backdrop-blur border border-blue-100/60">
                    <CardBody className="gap-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Tickets</p>
                      <p className="text-3xl font-semibold text-slate-900">{state.tickets.length}</p>
                      <p className="text-sm text-slate-600">active ticket types</p>
                    </CardBody>
                  </Card>
                  <Card className="bg-white/80 backdrop-blur border border-violet-100/60">
                    <CardBody className="gap-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Visitors</p>
                      <p className="text-3xl font-semibold text-slate-900">{visitorCount}</p>
                      <p className="text-sm text-slate-600">site views</p>
                    </CardBody>
                  </Card>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <Card className="bg-white/80 backdrop-blur border border-violet-100/60">
                    <CardBody className="gap-3">
                      <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-slate-900">
                        Media library
                      </h3>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between text-sm text-slate-700">
                          <span>videos</span>
                          <span className="font-semibold">{state.videos.length}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-700">
                          <span>photos</span>
                          <span className="font-semibold">{state.photos.length}</span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur border border-blue-100/60">
                    <CardBody className="gap-3">
                      <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-slate-900">
                        Most active events
                      </h3>
                      {eventCounts.length === 0 ? (
                        <p className="text-sm text-slate-600">no activity yet</p>
                      ) : (
                        <div className="grid gap-2">
                          {eventCounts.slice(0, 4).map(([event, count]) => (
                            <div key={event} className="flex items-center justify-between text-sm text-slate-700">
                              <span>{event}</span>
                              <span className="font-semibold">{count}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardBody>
                  </Card>
                </div>
              </>
            )}
          </main>
        </>
      )}
    </div>
  );
}
