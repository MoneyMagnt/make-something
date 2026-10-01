"use client";

import { Button, Card, CardBody, Link } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { EventCountdownChip } from "@/components/EventCountdownChip";
import { EventLineupSection } from "@/components/EventLineupSection";
import { EventsBrandMark } from "@/components/EventsBrandMark";
import { VenusTablePackages } from "@/components/VenusTablePackages";
import { EVENTS } from "@/lib/eventsData";
import { VENUS_EVENT as VENUS_DETAILS } from "@/lib/venusEvent";
import { VENUS_TABLE_ENQUIRY_URL, VENUS_TABLE_SECTION_ID } from "@/lib/venusTables";
import styles from "./VenusCampaignSection.module.css";

const VENUS_REGISTRATION_URL = VENUS_DETAILS.registrationUrl;
const VENUS_INTRO_STORAGE_KEY = "venus_ticket_intro_seen_oct2026";
const VENUS_MAPS_URL = VENUS_DETAILS.mapsUrl;
const VENUS_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=VENUS%20starts%20at%209pm&dates=20261023T210000Z%2F20261023T213000Z&details=9pm%20start.%20Event%20end%20time%20has%20not%20been%20announced.&location=Jet%20BBlack%20Lounge%2C%20Ashaley%20Botwe%2C%20Accra";

const VENUS_EVENT = EVENTS.find((event) => event.name === "VENUS");

function VenusTicketIntro({ onTicketClick }: { onTicketClick?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let shouldOpen = true;
    try {
      shouldOpen = sessionStorage.getItem(VENUS_INTRO_STORAGE_KEY) !== "true";
    } catch {
      shouldOpen = true;
    }

    // Direct package links should not be interrupted by the intro, even without storage.
    if (window.location.hash === `#${VENUS_TABLE_SECTION_ID}`) {
      shouldOpen = false;
    }

    const timer = window.setTimeout(() => {
      setIsOpen(shouldOpen);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const dismiss = () => {
    try {
      sessionStorage.setItem(VENUS_INTRO_STORAGE_KEY, "true");
    } catch {
      // The intro can still close when browser storage is unavailable.
    }
    setIsOpen(false);
  };

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Reserve your free VENUS pass"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[2147483000] isolate overflow-hidden bg-[#100607]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 [background:radial-gradient(circle_at_50%_45%,rgba(174,16,22,0.48),transparent_50rem),#100607]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <NextImage
              src={VENUS_DETAILS.webFlyer}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-contain object-center"
            />
          </motion.div>

          <button
            type="button"
            aria-label="Close VENUS intro"
            onClick={dismiss}
            className="absolute right-4 top-4 z-30 grid h-11 w-11 place-items-center rounded-full border border-[#e7c782]/60 bg-[#200b0d]/85 text-2xl leading-none text-[#f8f0df] shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition-transform hover:scale-105 sm:right-6 sm:top-6"
          >
            <span aria-hidden="true">&times;</span>
          </button>

          <div className="absolute inset-x-0 bottom-0 z-20 flex min-h-52 items-end justify-center bg-[linear-gradient(180deg,transparent,rgba(40,7,9,0.94)_35%,#140708_100%)] px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-16 sm:min-h-56">
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-md"
            >
              <div className="mb-5 text-center text-[#f8f0df] [text-shadow:0_3px_16px_rgba(0,0,0,0.72)]">
                <p className="text-xl font-black tracking-[0.08em] sm:text-2xl">
                  JET BBLACK LOUNGE
                </p>
                <p className="mt-1 text-sm font-bold tracking-[0.14em] sm:text-base">
                  ASHALEY BOTWE, 3RD GATE
                </p>
              </div>
              <Button
                as={Link}
                href={VENUS_REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Reserve your free VENUS pass now on Egotickets"
                className={`${styles.goldButton} relative isolate min-h-14 w-full overflow-hidden px-4 text-sm font-black tracking-[0.08em] transition-transform hover:-translate-y-1 sm:px-10 sm:text-lg`}
                onPress={() => {
                  dismiss();
                  onTicketClick?.();
                }}
              >
                <span className="absolute inset-0 opacity-45 [background:linear-gradient(120deg,transparent_0_38%,white_44%_54%,transparent_60%_100%)]" />
                <span className="relative z-10 whitespace-normal text-center leading-tight">RESERVE YOUR FREE PASS NOW</span>
              </Button>
              <Link
                href={`#${VENUS_TABLE_SECTION_ID}`}
                onPress={dismiss}
                className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 text-sm font-bold tracking-[0.06em] !text-[#f8f0df] underline underline-offset-4"
              >
                EXPLORE TABLE PACKAGES <span aria-hidden="true">&rarr;</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}

type VenusCampaignSectionProps = {
  fullBleed?: boolean;
  onPassClick?: () => void;
};

export function VenusCampaignSection({
  fullBleed = false,
  onPassClick,
}: VenusCampaignSectionProps) {
  return (
    <>
      <VenusTicketIntro onTicketClick={onPassClick} />
      <section
        id="event-actions"
        className={
          fullBleed
            ? `${styles.campaign} relative left-1/2 w-[100dvw] -translate-x-1/2 scroll-mt-24`
            : `${styles.campaign} relative scroll-mt-24`
        }
      >
        <div className="relative isolate min-h-screen overflow-hidden">
          <div aria-hidden="true" className={styles.backdrop}>
            <div className={styles.waves} />
            <div className={styles.lightSweep} />
            <div className={styles.mark}>
              <NextImage
                src="/events/venus/venus-mark-gold.png"
                alt=""
                width={1480}
                height={1062}
                sizes="(max-width: 640px) 92vw, 720px"
                className={styles.markImage}
              />
            </div>
          </div>

        <div className="relative z-20 mx-auto w-full max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
          <section className="mb-8">
            <Card className={`${styles.hero} overflow-hidden !backdrop-blur-none`}>
              <CardBody className="relative z-10 gap-6 p-5 sm:p-7">
                <div className="relative h-9">
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 sm:gap-3">
                    <div suppressHydrationWarning className="inline-flex h-9 max-w-[calc(100%-8.5rem)] items-center rounded-full border border-[#e7c782]/45 bg-[#e7c782]/12 px-3 text-[#f5db9b]">
                      <EventCountdownChip targetIso={VENUS_DETAILS.startDate} elapsedLabel="VENUS has started" />
                    </div>
                    <div className="inline-flex h-9 items-center rounded-full border border-[#e7c782]/40 bg-[#f1e4c9] px-3 text-[#25100d] shadow-[0_10px_22px_rgba(0,0,0,0.2)]">
                      <EventsBrandMark size="compact" className="min-w-0" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
                  <div className="space-y-4">
                    <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#e7c782]/35 bg-[#230b0c]/80 px-3 py-2 shadow-[0_16px_38px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:px-4">
                      <span className="h-2 w-2 rounded-full bg-[#e7c782] shadow-[0_0_0_4px_rgba(231,199,130,0.14)]" />
                      <span className="truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f5db9b] sm:text-[11px]">
                        nightlife experience by zyra
                      </span>
                    </div>

                    <h1 className="sr-only">VENUS hosted by Manlikegreg</h1>

                    <div className="space-y-3 border-t border-[#e7c782]/25 pt-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <Button
                          as={Link}
                          href={VENUS_REGISTRATION_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Reserve your free VENUS pass now on Egotickets"
                          className={`${styles.goldButton} relative isolate h-12 w-full overflow-hidden px-4 text-sm font-black tracking-[0.04em] transition-transform hover:-translate-y-1 sm:w-fit sm:px-8 sm:text-base`}
                          onPress={onPassClick}
                        >
                          <span className="absolute inset-0 opacity-55 [background:linear-gradient(115deg,transparent_0_36%,white_43%_54%,transparent_62%_100%)]" />
                          <span className="relative z-10 whitespace-normal text-center leading-tight">RESERVE YOUR FREE PASS NOW</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                    {[
                      ["date", VENUS_DETAILS.date],
                      ["venue", VENUS_DETAILS.venue],
                      ["time", "9pm sharp"],
                    ].map(([label, value]) => (
                      <div key={label} className={`${styles.detail} relative overflow-hidden rounded-2xl p-4 backdrop-blur-lg`}>
                        <span className="absolute -right-6 -top-8 h-24 w-24 rotate-45 border border-[#e7c782]/15 bg-[#e7c782]/5" />
                        <p className="text-[11px] uppercase tracking-[0.14em] text-[#e7c782]">{label}</p>
                        <p className="relative mt-2 text-sm font-semibold text-[#f8f0df]">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          </section>

          <EventLineupSection
            members={VENUS_EVENT?.lineup ?? []}
            vibeCard={VENUS_EVENT?.vibeCard}
            sectionClassName="mb-8"
            cardClassName={styles.surface}
            theme="venus"
          />

          <VenusTablePackages />

          <section id="event-guide" className="mb-8 scroll-mt-24 [contain-intrinsic-size:auto_520px] [content-visibility:auto]">
            <Card className={styles.surface}>
              <CardBody className="gap-4 p-5 sm:p-7">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#e7c782]">arrival details</p>
                  <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#f8f0df]">
                    plan your arrival
                  </h2>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {[
                    ["arrival", "get directions", VENUS_MAPS_URL],
                    ["reminder", "add to calendar", VENUS_CALENDAR_URL],
                    ["tables", "reserve a table", VENUS_TABLE_ENQUIRY_URL],
                  ].map(([label, title, href]) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.action} relative overflow-hidden rounded-2xl p-4 no-underline backdrop-blur-md transition-all hover:-translate-y-1 hover:scale-[1.01]`}
                    >
                      <span className="absolute -right-8 -top-8 h-24 w-24 rotate-45 border border-[#e7c782]/12 bg-[#e7c782]/5" />
                      <p className="text-[11px] uppercase tracking-[0.14em] text-[#e7c782]">{label}</p>
                      <p className="mt-2 font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-[#f8f0df]">
                        {title}
                      </p>
                    </Link>
                  ))}
                </div>
              </CardBody>
            </Card>
          </section>

          <section className="mb-10 [contain-intrinsic-size:auto_360px] [content-visibility:auto]">
            <Card className={styles.surface}>
              <CardBody className="gap-4 p-5 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[#e7c782]">more from zyra</p>
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#f8f0df]">
                      other events
                    </h2>
                  </div>
                  <div className="rounded-full border border-[#e7c782]/40 bg-[#f1e4c9] px-3 py-1.5">
                    <EventsBrandMark size="compact" />
                  </div>
                </div>

                <div className="grid gap-3 lg:grid-cols-2">
                  <div className={`${styles.selectedEvent} relative flex min-h-16 items-center justify-between overflow-hidden rounded-2xl px-4 py-3`}>
                    <div>
                      <p className="font-[family-name:var(--font-space-grotesk)] font-bold text-[#f5db9b]">VENUS</p>
                      <p className="text-xs text-[#f8f0df]/75">{VENUS_DETAILS.date} - 9pm</p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.14em] text-[#e7c782]">selected</span>
                  </div>
                  <Link
                    href="/events/we-outside"
                    className={`${styles.otherEvent} flex min-h-16 items-center justify-between rounded-2xl px-4 py-3 no-underline transition-transform hover:-translate-y-1`}
                  >
                    <div>
                      <p className="font-[family-name:var(--font-space-grotesk)] font-bold text-[#f8f0df]">We Outside</p>
                      <p className="text-xs text-[#f8f0df]/65">next drop. details when it&apos;s time.</p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.14em] text-[#e7c782]">view</span>
                  </Link>
                </div>
              </CardBody>
            </Card>
          </section>
        </div>
        </div>
      </section>
    </>
  );
}
