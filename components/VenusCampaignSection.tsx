"use client";

import { Button, Card, CardBody, Link } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import NextImage from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { EventCountdownChip } from "@/components/EventCountdownChip";
import { EventLineupSection } from "@/components/EventLineupSection";
import { EventsBrandMark } from "@/components/EventsBrandMark";
import { VenusTablePackages } from "@/components/VenusTablePackages";
import { EVENTS } from "@/lib/eventsData";
import { VENUS_TABLE_ENQUIRY_URL, VENUS_TABLE_SECTION_ID } from "@/lib/venusTables";

const VENUS_REGISTRATION_URL =
  "https://egotickets.com/events/venus-the-beginning/register";
const VENUS_INTRO_STORAGE_KEY = "venus_ticket_intro_seen_v2";
const VENUS_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Jet%20BBL%20Ack%20Lounge%2C%20Ashaley%20Botwe%203rd%20Gate%2C%20Accra";
const VENUS_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=VENUS%20Accra&dates=20260911T210000Z%2F20260912T030000Z&details=Get%20your%20tickets%20on%20Egotickets.&location=Jet%20BBL%20Ack%20Lounge%2C%20Ashaley%20Botwe%2C%20Accra";

const VENUS_EVENT = EVENTS.find((event) => event.name === "VENUS");

type ButterflyTone = "cyan" | "pink" | "gold" | "violet";
type ButterflyFlight = "hover" | "wander" | "glide" | "rise";

const BUTTERFLY_SPRITE = "/events/venus/venus-butterflies.webp";

const BUTTERFLY_STYLES = {
  cyan: {
    backgroundPosition: "left center",
    filter: "saturate(1.08) contrast(1.04) drop-shadow(0 8px 7px rgba(18,59,85,.2))",
  },
  pink: {
    backgroundPosition: "right center",
    filter: "saturate(1.08) contrast(1.04) drop-shadow(0 8px 7px rgba(100,19,72,.2))",
  },
  gold: {
    backgroundPosition: "left center",
    filter: "hue-rotate(205deg) saturate(1.28) contrast(1.06) drop-shadow(0 8px 7px rgba(115,77,16,.22))",
  },
  violet: {
    backgroundPosition: "right center",
    filter: "hue-rotate(305deg) saturate(1.18) contrast(1.05) drop-shadow(0 8px 7px rgba(62,26,111,.22))",
  },
} satisfies Record<ButterflyTone, { backgroundPosition: string; filter: string }>;

function Butterfly({
  className,
  delay = 0,
  duration = 8.4,
  flight = "hover",
  mirror = false,
  tone = "pink",
}: {
  className: string;
  delay?: number;
  duration?: number;
  flight?: ButterflyFlight;
  mirror?: boolean;
  tone?: ButterflyTone;
}) {
  const butterflyStyle = BUTTERFLY_STYLES[tone];
  const animationVariables = {
    "--venus-flight-delay": `${delay}s`,
    "--venus-flight-duration": `${duration}s`,
    "--venus-wing-delay": `${delay + 0.15}s`,
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      className={`venus-butterfly venus-butterfly--${flight} pointer-events-none absolute z-10 h-[4.5rem] w-[5.5rem] [perspective:360px] sm:h-[5.5rem] sm:w-[6.75rem] ${className}`}
      style={animationVariables}
    >
      <span className="venus-butterfly-shadow absolute bottom-1 left-1/2 h-2.5 w-12 -translate-x-1/2 rounded-full bg-[#123b55]/24 blur-[6px]" />

      <div className={`absolute inset-0 ${mirror ? "[transform:scaleX(-1)]" : ""}`}>
        <div
          className="venus-butterfly-wings absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: "url(" + BUTTERFLY_SPRITE + ")",
            backgroundPosition: butterflyStyle.backgroundPosition,
            backgroundSize: "200% 100%",
            filter: butterflyStyle.filter,
            transformStyle: "preserve-3d",
          }}
        />
      </div>
    </div>
  );
}
function Venus3DCanvas() {
  return (
    <div className="absolute inset-0 overflow-hidden [perspective:1100px]">
      <div className="venus-mark-float absolute inset-x-[8%] top-[7rem] z-20 sm:inset-x-[20%] sm:top-[5rem]">
        <NextImage
          src="/events/venus/venus-mark.png"
          alt=""
          width={780}
          height={560}
          sizes="(max-width: 640px) 92vw, 720px"
          className="mx-auto h-auto w-full max-w-[45rem] opacity-75 drop-shadow-[0_28px_20px_rgba(18,59,85,0.34)]"
        />
      </div>

      <Butterfly className="left-[18%] top-[9rem] scale-75 sm:scale-100" tone="cyan" flight="wander" duration={8.2} />
      <Butterfly className="right-[16%] top-[12rem] scale-75 sm:scale-100" flight="hover" mirror delay={0.65} duration={7.1} />
      <Butterfly className="left-[5%] top-[27rem] scale-[0.58] sm:left-[11%] sm:scale-[0.7]" tone="pink" flight="rise" delay={1.7} duration={8.5} />
      <Butterfly className="right-[4%] top-[24rem] scale-[0.56] sm:right-[10%] sm:scale-[0.68]" tone="cyan" flight="glide" mirror delay={1.15} duration={9.1} />
      <Butterfly className="left-[7%] top-[39rem] scale-[0.62] sm:left-[13%] sm:scale-75" tone="gold" flight="glide" delay={1.35} duration={9.6} />
      <Butterfly className="left-[24%] top-[53rem] scale-[0.68] opacity-90" flight="rise" mirror delay={1.1} duration={8.8} />
      <Butterfly className="right-[7%] top-[69rem] scale-[0.64] sm:right-[15%] sm:scale-75" tone="violet" flight="wander" mirror delay={0.45} duration={9.2} />
      <Butterfly className="right-[16%] top-[88rem] hidden opacity-80 sm:block" tone="cyan" flight="glide" delay={0.35} duration={9.4} />
      <Butterfly className="left-[47%] top-[112rem] hidden opacity-75 sm:block" flight="wander" mirror delay={1.45} duration={8.6} />

      <div className="venus-shine-diagonal absolute -left-1/3 top-0 z-30 h-[32rem] w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/60 to-transparent blur-xl" />
    </div>
  );
}

function FlyerBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="venus-wave-drift absolute -inset-x-[5%] -inset-y-[2%]"
        style={{
          backgroundImage: "url(/events/venus/venus-waves.webp)",
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
        }}
      />
      <div className="venus-shine-horizontal absolute -left-1/3 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/25 to-transparent blur-2xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,255,255,0.3),transparent_28rem),linear-gradient(to_bottom,rgba(255,255,255,0.06),rgba(39,134,156,0.07))]" />
      <Butterfly className="left-[3%] top-[18rem] scale-90" tone="cyan" flight="glide" delay={0.25} duration={8.9} />
      <Butterfly className="right-[5%] top-[8rem] scale-90" flight="rise" mirror delay={0.9} duration={7.8} />
      <Butterfly className="right-[9%] top-[76rem] hidden scale-75 opacity-70 sm:block" tone="cyan" flight="hover" delay={1.7} duration={9.1} />
      <Butterfly className="left-[9%] top-[101rem] hidden scale-[0.72] sm:block" tone="gold" flight="rise" mirror delay={0.8} duration={10.1} />
      <Butterfly className="right-[5%] top-[126rem] hidden scale-[0.78] sm:block" tone="violet" flight="glide" delay={1.9} duration={9.8} />
      <Venus3DCanvas />
    </div>
  );
}

function VenusTicketIntro({
  onOpenChange,
  onTicketClick,
}: {
  onOpenChange?: (isOpen: boolean) => void;
  onTicketClick?: () => void;
}) {
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
      onOpenChange?.(shouldOpen);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [onOpenChange]);

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
    onOpenChange?.(false);
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
          className="fixed inset-0 z-[2147483000] isolate overflow-hidden bg-[#f5fa78]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 [background:radial-gradient(circle_at_15%_18%,rgba(0,169,214,0.5),transparent_26rem),radial-gradient(circle_at_86%_14%,rgba(245,0,150,0.42),transparent_28rem),linear-gradient(160deg,#f5fa78_0%,#a7e7ce_54%,#35c4cf_100%)]"
          />
          <motion.video
            poster="/events/venus/venus-tonight.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          >
            <source
              src="/events/venus/venus-intro-mobile.mp4"
              media="(max-width: 640px)"
              type="video/mp4"
            />
            <source
              src="/events/venus/venus-intro-optimized.mp4"
              type="video/mp4"
            />
          </motion.video>

          <button
            type="button"
            aria-label="Close VENUS intro"
            onClick={dismiss}
            className="absolute right-4 top-4 z-30 grid h-11 w-11 place-items-center rounded-full border border-white/55 bg-[#123b55]/72 text-2xl leading-none text-white shadow-[0_12px_30px_rgba(18,59,85,0.22)] backdrop-blur-md transition-transform hover:scale-105 sm:right-6 sm:top-6"
          >
            <span aria-hidden="true">&times;</span>
          </button>

          <div className="absolute inset-x-0 bottom-0 z-20 flex min-h-52 items-end justify-center bg-[linear-gradient(180deg,rgba(245,0,150,0),rgba(245,0,150,0.92)_38%,#dc007f_100%)] px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-16 sm:min-h-56">
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-md"
            >
              <div className="mb-5 text-center text-white [text-shadow:0_3px_16px_rgba(18,59,85,0.72)]">
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
                className="relative isolate min-h-14 w-full overflow-hidden border-2 border-white/90 bg-[linear-gradient(135deg,#ffffff_0%,#a8f2ee_28%,#f5fa78_50%,#ff83c5_72%,#ffffff_100%)] px-4 text-sm font-black tracking-[0.08em] text-[#123b55] shadow-[0_10px_0_#123b55,0_20px_40px_rgba(18,59,85,0.25)] transition-transform hover:-translate-y-1 sm:px-10 sm:text-lg"
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
                className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 text-sm font-bold tracking-[0.06em] !text-white underline underline-offset-4"
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
  const [isIntroOpen, setIsIntroOpen] = useState(true);

  return (
    <>
      <VenusTicketIntro
        onOpenChange={setIsIntroOpen}
        onTicketClick={onPassClick}
      />
      <section
        id="event-actions"
        className={
          fullBleed
            ? "relative left-1/2 w-[100dvw] -translate-x-1/2 scroll-mt-24"
            : "relative scroll-mt-24"
        }
      >
        <div className="relative isolate min-h-screen overflow-hidden text-slate-900">
          {!isIntroOpen ? <FlyerBackdrop /> : null}

        <div className="relative z-20 mx-auto w-full max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
          <section className="mb-8">
            <Card className="overflow-hidden border border-white/80 !bg-[rgba(255,255,255,0.18)] shadow-[0_28px_80px_rgba(18,59,85,0.2)] !backdrop-blur-none">
              <CardBody className="gap-6 p-5 sm:p-7">
                <div className="relative h-9">
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 sm:gap-3">
                    <div suppressHydrationWarning className="inline-flex h-9 max-w-[calc(100%-8.5rem)] items-center rounded-full border border-[#006eac]/20 bg-[#f5fa78]/92 px-3 text-[#123b55] shadow-[0_12px_28px_rgba(18,59,85,0.08)]">
                      <EventCountdownChip targetIso="2026-09-11T21:00:00+00:00" elapsedLabel="doors open now" />
                    </div>
                    <div className="inline-flex h-9 items-center rounded-full border border-[#006eac]/18 bg-white/82 px-3 text-[#123b55] shadow-[0_10px_22px_rgba(18,59,85,0.07)]">
                      <EventsBrandMark size="compact" className="min-w-0" />
                    </div>
                  </div>

                </div>

                <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
                  <div className="space-y-4">
                    <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#f50096]/18 bg-white/80 px-3 py-2 shadow-[0_16px_38px_rgba(245,0,150,0.08)] backdrop-blur-xl sm:px-4">
                      <span className="h-2 w-2 rounded-full bg-[linear-gradient(135deg,#f50096,#00a9d6)] shadow-[0_0_0_4px_rgba(245,0,150,0.12)]" />
                      <span className="truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9f0062] sm:text-[11px]">
                        nightlife experience by zyra
                      </span>
                    </div>

                    <div className="space-y-3 border-t border-[#123b55]/12 pt-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <Button
                          as={Link}
                          href={VENUS_REGISTRATION_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Reserve your free VENUS pass now on Egotickets"
                          className="relative isolate h-12 w-full overflow-hidden border border-white/90 bg-[linear-gradient(135deg,#ffffff_0%,#8be9e7_25%,#f5fa78_48%,#ff70b7_72%,#ffffff_100%)] px-4 text-sm font-black tracking-[0.04em] text-[#123b55] shadow-[0_10px_0_#123b55,0_20px_42px_rgba(18,59,85,0.2)] transition-transform hover:-translate-y-1 sm:w-fit sm:px-8 sm:text-base"
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
                      ["date", "11 September 2026"],
                      ["venue", "Jet BBL Ack Lounge"],
                      ["time", "9pm sharp"],
                    ].map(([label, value]) => (
                      <div key={label} className="relative overflow-hidden rounded-2xl border border-white/85 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(154,235,233,0.42)_40%,rgba(255,183,219,0.42)_72%,rgba(245,250,120,0.55))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_14px_32px_rgba(18,59,85,0.13)] backdrop-blur-lg">
                        <span className="absolute -right-6 -top-8 h-24 w-24 rotate-45 border border-white/55 bg-white/20" />
                        <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">{label}</p>
                        <p className="relative mt-2 text-sm font-semibold text-[#123b55]">{value}</p>
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
            cardClassName="!border-white/80 !bg-[linear-gradient(145deg,rgba(255,255,255,0.52),rgba(148,234,232,0.28),rgba(255,177,216,0.26))] !backdrop-blur-[2px]"
            showButterflies
          />

          <VenusTablePackages />

          <section id="event-guide" className="mb-8 scroll-mt-24 [contain-intrinsic-size:auto_520px] [content-visibility:auto]">
            <Card className="border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.48),rgba(144,231,229,0.28)_45%,rgba(255,185,221,0.24))] shadow-[0_24px_64px_rgba(18,59,85,0.17)] backdrop-blur-[2px]">
              <CardBody className="gap-4 p-5 sm:p-7">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">arrival details</p>
                  <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#123b55]">
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
                      className="relative overflow-hidden rounded-2xl border border-white/90 bg-[linear-gradient(135deg,rgba(255,255,255,0.76),rgba(146,234,232,0.44)_44%,rgba(245,250,120,0.5)_70%,rgba(255,145,201,0.44))] p-4 no-underline shadow-[inset_0_1px_0_white,0_14px_32px_rgba(18,59,85,0.13)] backdrop-blur-md transition-all hover:-translate-y-1 hover:scale-[1.01]"
                    >
                      <span className="absolute -right-8 -top-8 h-24 w-24 rotate-45 border border-white/60 bg-white/25" />
                      <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">{label}</p>
                      <p className="mt-2 font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-[#123b55]">
                        {title}
                      </p>
                    </Link>
                  ))}
                </div>
              </CardBody>
            </Card>
          </section>

          <section className="mb-10 [contain-intrinsic-size:auto_360px] [content-visibility:auto]">
            <Card className="border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.46),rgba(173,244,239,0.26),rgba(255,171,213,0.22))] shadow-[0_22px_58px_rgba(18,59,85,0.15)] backdrop-blur-[2px]">
              <CardBody className="gap-4 p-5 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">more from zyra</p>
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#123b55]">
                      other events
                    </h2>
                  </div>
                  <div className="rounded-full border border-white/80 bg-white/82 px-3 py-1.5 shadow-[0_12px_28px_rgba(18,59,85,0.08)]">
                    <EventsBrandMark size="compact" />
                  </div>
                </div>

                <div className="grid gap-3 lg:grid-cols-2">
                  <div className="relative flex min-h-16 items-center justify-between overflow-hidden rounded-2xl border border-white/85 bg-[linear-gradient(135deg,#ffffff,#a2eeea_34%,#f5fa78_62%,#ff9dce)] px-4 py-3 shadow-[inset_0_1px_0_white,0_14px_32px_rgba(18,59,85,0.13)]">
                    <div>
                      <p className="font-[family-name:var(--font-space-grotesk)] font-bold text-[#123b55]">VENUS</p>
                      <p className="text-xs text-[#123b55]/70">11 September 2026 - 9pm</p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.14em] text-[#006eac]">selected</span>
                  </div>
                  <Link
                    href="/events/we-outside"
                    className="flex min-h-16 items-center justify-between rounded-2xl border border-white/90 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(132,227,229,0.64),rgba(255,157,207,0.62))] px-4 py-3 no-underline shadow-[inset_0_1px_0_white,0_14px_32px_rgba(18,59,85,0.13)] transition-transform hover:-translate-y-1"
                  >
                    <div>
                      <p className="font-[family-name:var(--font-space-grotesk)] font-bold text-[#123b55]">We Outside</p>
                      <p className="text-xs text-[#123b55]/70">next drop. details when it&apos;s time.</p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.14em] text-slate-500">view</span>
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
