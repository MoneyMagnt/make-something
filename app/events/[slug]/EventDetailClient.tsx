"use client";

import { Button, Card, CardBody, Chip, Image, Link } from "@heroui/react";
import { ZyraSiteNav } from "@/components/ZyraSiteNav";
import type { EventMeta, TicketItem } from "@/lib/eventsData";

type EventDetailClientProps = {
  event: EventMeta;
  tickets: TicketItem[];
  venusFreePassLimit: number;
};

export function EventDetailClient({
  event,
  tickets,
  venusFreePassLimit,
}: EventDetailClientProps) {
  const isVenus = event.name === "VENUS";

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
          isVenus
            ? "from-indigo-900/82 via-violet-800/70 to-slate-950/85 border-violet-300/25"
            : "from-emerald-900/82 via-cyan-900/70 to-slate-950/85 border-cyan-300/25"
        }`}
        brand={
          <div className="flex items-center gap-2.5 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
            <span>zyra</span>
            <Image
              removeWrapper
              alt="233 events logo"
              src="/233-events-logo.png"
              className="h-8 w-auto drop-shadow-[0_4px_10px_rgba(15,23,42,0.35)]"
            />
          </div>
        }
      />

      <main className="relative z-10 mx-auto max-w-5xl px-4 pb-20 pt-10 sm:px-6">
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border border-white/45 bg-white/45 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/58">
            <CardBody className="gap-5">
              <Chip className="w-fit border border-cyan-200 bg-cyan-100 text-cyan-900 dark:border-cyan-700/60 dark:bg-cyan-900/35 dark:text-cyan-200">
                event details
              </Chip>
              <h1 className="font-[family-name:var(--font-bricolage)] text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl dark:text-slate-100">
                {event.name}
              </h1>
              <p className="text-sm text-slate-600 sm:text-base dark:text-slate-300">{event.description}</p>
              <div className="flex flex-wrap gap-2">
                <Chip className="bg-black/10 text-slate-800 dark:bg-slate-700/60 dark:text-slate-100">
                  date: {event.dateLabel}
                </Chip>
                <Chip className="bg-black/10 text-slate-800 dark:bg-slate-700/60 dark:text-slate-100">
                  venue: {event.venue}
                </Chip>
                <Chip className="bg-black/10 text-slate-800 dark:bg-slate-700/60 dark:text-slate-100">
                  location: {event.city}
                </Chip>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button as={Link} href="/events" className="border border-cyan-300/70 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                  back to events
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card className="relative overflow-hidden border border-white/45 bg-white/45 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/58">
            <CardBody className="relative gap-4 [&>*]:relative [&>*]:z-10">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/58 via-white/34 to-white/12 dark:from-slate-900/62 dark:via-slate-900/40 dark:to-slate-900/22" />
              </div>

              <div className={`rounded-2xl bg-gradient-to-r ${event.bannerTone} p-4 text-white`}>
                <p className="text-xs uppercase tracking-[0.14em] text-white/85">featured now</p>
                <div className="mt-1 flex items-center gap-2.5">
                  <Image removeWrapper alt={`${event.name} logo`} src={event.logo} className="h-9 w-auto" />
                  <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold">{event.name}</p>
                </div>
                <p className="text-sm text-white/85">{event.venue}, {event.city}</p>
              </div>

              {isVenus ? (
                <div className="rounded-2xl border border-white/45 bg-white/58 p-4 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/72">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">venus pass policy</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">free pass up to {venusFreePassLimit}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">after free passes finish, entry is GHS 50.</p>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/45 bg-white/58 p-4 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/72">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">entry model</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">fully paid</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">early bird GHS 50, regular GHS 100.</p>
                </div>
              )}
            </CardBody>
          </Card>
        </section>

        <section className="mt-8">
          <Card className="border border-white/45 bg-white/45 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/58">
            <CardBody className="gap-4">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                tickets
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {tickets.map((ticket) => (
                  <Card key={ticket.id} className="border border-white/45 bg-white/58 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/72">
                    <CardBody className="flex flex-row items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{ticket.name}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{ticket.price}</p>
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
        </section>
      </main>
    </div>
  );
}

