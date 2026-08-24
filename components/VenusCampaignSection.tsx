"use client";

import { Button, Card, CardBody, Link } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { EventCountdownChip } from "@/components/EventCountdownChip";
import { EventLineupSection } from "@/components/EventLineupSection";
import { EventsBrandMark } from "@/components/EventsBrandMark";
import { EVENTS } from "@/lib/eventsData";

const VENUS_REGISTRATION_URL =
  "https://egotickets.com/events/venus-the-beginning/register";
const VENUS_INTRO_STORAGE_KEY = "venus_ticket_intro_seen_v2";
const VENUS_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Jet%20BBL%20Ack%20Lounge%2C%20Ashaley%20Botwe%203rd%20Gate%2C%20Accra";
const VENUS_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=VENUS%20Accra&dates=20260911T210000Z%2F20260912T030000Z&details=Get%20your%20tickets%20on%20Egotickets.&location=Jet%20BBL%20Ack%20Lounge%2C%20Ashaley%20Botwe%2C%20Accra";
const VENUS_TABLE_URL = `https://wa.me/233556877954?text=${encodeURIComponent(
  "hi zyra, i want to reserve a table for VENUS at Jet BBL Ack Lounge on 11 September 2026."
)}`;

const VENUS_EVENT = EVENTS.find((event) => event.name === "VENUS");

function Butterfly({
  className,
  color = "#f50096",
}: {
  className: string;
  color?: string;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 h-9 w-11 ${className}`}
      animate={{ y: [0, -10, 0], rotate: [-7, 7, -7] }}
      transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.span
        className="absolute left-0 top-1 h-7 w-6 -rotate-[28deg] rounded-[80%_25%_70%_30%] shadow-[0_7px_12px_rgba(20,38,55,0.22)]"
        style={{ backgroundColor: color }}
        animate={{ rotateY: [0, 58, 0] }}
        transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute right-0 top-1 h-7 w-6 rotate-[28deg] rounded-[25%_80%_30%_70%] shadow-[0_7px_12px_rgba(20,38,55,0.22)]"
        style={{ backgroundColor: color }}
        animate={{ rotateY: [0, -58, 0] }}
        transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="absolute left-1/2 top-2 h-7 w-1 -translate-x-1/2 rounded-full bg-[#123b55]" />
    </motion.div>
  );
}

function Venus3DCanvas() {
  return (
    <div className="absolute inset-0 overflow-hidden [perspective:1100px]">
      <motion.div
        className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(18,59,85,0.32)_1px,transparent_1px)] [background-size:58px_58px]"
        animate={{ backgroundPosition: ["0px 0px", "116px 116px"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute -left-12 top-[8rem] h-32 w-32 rounded-[34%] border border-white/80 bg-[conic-gradient(from_210deg,#ffffff,#7de8e7,#f5fa78,#ff65ad,#ffffff)] opacity-80 shadow-[inset_0_0_28px_white,0_20px_45px_rgba(18,59,85,0.18)] sm:h-52 sm:w-52"
        animate={{ rotate: [10, 190, 370], y: [0, 18, 0] }}
        transition={{ rotate: { duration: 18, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
      />
      <motion.div
        className="absolute -right-16 top-[34rem] h-36 w-36 rounded-full border-8 border-white/75 bg-[conic-gradient(#f50096,#ffffff,#00a9d6,#f5fa78,#f50096)] shadow-[inset_0_0_24px_rgba(255,255,255,0.9),0_22px_44px_rgba(18,59,85,0.2)] sm:h-56 sm:w-56"
        animate={{ rotate: [0, -360], scale: [1, 1.08, 1] }}
        transition={{ rotate: { duration: 13, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
      />
      <motion.div
        className="absolute -left-20 top-[78rem] h-44 w-44 rounded-full border-[12px] border-white/60 bg-[conic-gradient(#00a9d6,#ffffff,#f50096,#f5fa78,#00a9d6)] opacity-70 shadow-[inset_0_0_32px_white,0_24px_52px_rgba(18,59,85,0.2)] sm:h-64 sm:w-64"
        animate={{ rotate: [0, 360], x: [0, 28, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute left-1/2 top-[7rem] h-[15rem] w-[22rem] -translate-x-1/2 rounded-[50%] border-2 border-white/70 sm:h-[24rem] sm:w-[42rem]"
        animate={{ rotateX: [66, 72, 66], rotateZ: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      />

      <motion.div
        className="absolute inset-x-[8%] top-[7rem] z-20 will-change-transform sm:inset-x-[20%] sm:top-[5rem]"
        animate={{ rotateY: [-12, 11, -12], rotateX: [5, -5, 5], y: [0, -10, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <NextImage
          src="/events/venus/venus-mark.png"
          alt=""
          width={780}
          height={560}
          sizes="(max-width: 640px) 92vw, 720px"
          className="mx-auto h-auto w-full max-w-[45rem] opacity-75 drop-shadow-[0_28px_20px_rgba(18,59,85,0.34)]"
        />
      </motion.div>

      <Butterfly className="left-[20%] top-[9rem] scale-75 sm:scale-100" color="#00a9d6" />
      <Butterfly className="right-[18%] top-[12rem] scale-75 sm:scale-100" />
      <Butterfly className="left-[26%] top-[53rem] scale-75" color="#f50096" />
      <Butterfly className="right-[17%] top-[88rem] hidden sm:block" color="#00a9d6" />
      <Butterfly className="left-[48%] top-[112rem] hidden sm:block" />

      <motion.div
        className="absolute -left-1/3 top-0 z-30 h-[32rem] w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/60 to-transparent blur-xl"
        animate={{ x: ["0vw", "180vw"], y: ["-20rem", "145rem"] }}
        transition={{ duration: 12, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
      />
    </div>
  );
}

function FlyerBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute -inset-[20%] will-change-transform [background:radial-gradient(circle_at_8%_12%,rgba(255,255,255,0.92),transparent_16rem),radial-gradient(circle_at_86%_10%,rgba(245,0,150,0.44),transparent_24rem),radial-gradient(circle_at_16%_72%,rgba(0,169,214,0.52),transparent_22rem),linear-gradient(145deg,#fbff7c_0%,#b7f3c7_34%,#55d4df_64%,#ff71b9_100%)]"
        animate={{ scale: [1, 1.08, 1], rotate: [0, 1.5, 0], x: [0, 24, 0], y: [0, -18, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -inset-24 opacity-65 mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,.88) 0 12%, rgba(255,255,255,.08) 12% 48%, rgba(0,105,172,.28) 48% 52%, rgba(245,0,150,.18) 52% 76%, rgba(255,255,255,.66) 76% 100%)",
          backgroundSize: "180px 180px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "360px 180px"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -left-1/3 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/45 to-transparent blur-2xl"
        animate={{ x: ["0vw", "190vw"] }}
        transition={{ duration: 9, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-0 top-[30rem] h-[90rem] opacity-50 [background:repeating-radial-gradient(ellipse_at_50%_0%,transparent_0_4rem,rgba(255,255,255,0.68)_4.15rem_7.35rem)] sm:top-[24rem]" />
      <div className="absolute -left-24 top-10 h-56 w-56 rounded-[38%_62%_57%_43%] border-[0.4rem] border-[#123b55]/70" />
      <div className="absolute -right-28 top-[34rem] h-72 w-72 rounded-[61%_39%_28%_72%] border-[0.45rem] border-[#123b55]/62" />
      <div className="absolute left-[5%] top-[64rem] h-64 w-64 rounded-full bg-[#f50096]/15 sm:h-96 sm:w-96" />
      <svg
        viewBox="0 0 1600 390"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-[39rem] h-72 w-full opacity-50 sm:top-[33rem] lg:h-96"
      >
        <path d="M-90 112C214-58 386 278 710 102S1200-10 1690 135" fill="none" stroke="#fff" strokeOpacity=".76" strokeWidth="58" />
        <path d="M-90 226C184 42 438 390 785 194S1350 82 1700 254" fill="none" stroke="#00a9c9" strokeOpacity=".32" strokeWidth="42" />
      </svg>
      <Butterfly className="left-[4%] top-[18rem]" color="#00a9d6" />
      <Butterfly className="right-[6%] top-[8rem]" />
      <Butterfly className="right-[10%] top-[76rem] hidden sm:block" color="#00a9d6" />
      <Venus3DCanvas />
    </div>
  );
}

function VenusTicketIntro({ onTicketClick }: { onTicketClick?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let shouldOpen = true;
    try {
      shouldOpen = sessionStorage.getItem(VENUS_INTRO_STORAGE_KEY) !== "true";
    } catch {
      shouldOpen = true;
    }

    const timer = window.setTimeout(() => setIsOpen(shouldOpen), 0);
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
          aria-label="VENUS tickets"
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
            src="/events/venus/venus-intro.mp4"
            poster="/events/venus/venus-flyer.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <button
            type="button"
            aria-label="Close VENUS intro"
            onClick={dismiss}
            className="absolute right-4 top-4 z-30 grid h-11 w-11 place-items-center rounded-full border border-white/55 bg-[#123b55]/72 text-2xl leading-none text-white shadow-[0_12px_30px_rgba(18,59,85,0.22)] backdrop-blur-md transition-transform hover:scale-105 sm:right-6 sm:top-6"
          >
            <span aria-hidden="true">&times;</span>
          </button>

          <div className="absolute inset-x-0 bottom-0 z-20 flex min-h-32 items-center justify-center bg-[linear-gradient(180deg,rgba(245,0,150,0),#f50096_28%,#dc007f_100%)] px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-10 sm:min-h-36">
            <Button
              as={Link}
              href={VENUS_REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative isolate min-h-14 w-full max-w-sm overflow-hidden border-2 border-white/90 bg-[linear-gradient(135deg,#ffffff_0%,#a8f2ee_28%,#f5fa78_50%,#ff83c5_72%,#ffffff_100%)] px-10 text-lg font-black tracking-[0.08em] text-[#123b55] shadow-[0_12px_0_#123b55,0_22px_44px_rgba(18,59,85,0.25)] transition-transform hover:-translate-y-1"
              onPress={() => {
                dismiss();
                onTicketClick?.();
              }}
            >
              <span className="absolute inset-0 opacity-45 [background:linear-gradient(120deg,transparent_0_38%,white_44%_54%,transparent_60%_100%)]" />
              <span className="relative z-10">GET TICKETS NOW!</span>
            </Button>
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
            ? "relative left-1/2 w-[100dvw] -translate-x-1/2 scroll-mt-24"
            : "relative scroll-mt-24"
        }
      >
        <div className="relative isolate min-h-screen overflow-hidden text-slate-900">
          <FlyerBackdrop />

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
                          className="relative isolate h-12 w-full overflow-hidden border border-white/90 bg-[linear-gradient(135deg,#ffffff_0%,#8be9e7_25%,#f5fa78_48%,#ff70b7_72%,#ffffff_100%)] px-8 text-base font-black tracking-[0.04em] text-[#123b55] shadow-[0_10px_0_#123b55,0_20px_42px_rgba(18,59,85,0.2)] transition-transform hover:-translate-y-1 sm:w-fit"
                          onPress={onPassClick}
                        >
                          <span className="absolute inset-0 opacity-55 [background:linear-gradient(115deg,transparent_0_36%,white_43%_54%,transparent_62%_100%)]" />
                          <span className="relative z-10">GET TICKETS NOW!</span>
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
          />

          <section id="event-guide" className="mb-8 scroll-mt-24">
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
                    ["tables", "reserve a table", VENUS_TABLE_URL],
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

          <section className="mb-10">
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
