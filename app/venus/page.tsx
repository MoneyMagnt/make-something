"use client";

import { Button, Link } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { VENUS_EVENT } from "@/lib/venusEvent";
import { VENUS_TABLE_PACKAGES_HREF } from "@/lib/venusTables";

const VENUS_INTRO_STORAGE_KEY = "venus_ticket_intro_seen_oct2026";

export default function VenusTicketLandingPage() {
  const rememberIntro = () => {
    try {
      sessionStorage.setItem(VENUS_INTRO_STORAGE_KEY, "true");
    } catch {
      // Navigation should still work if browser storage is unavailable.
    }
  };

  return (
    <main
      id="main-content"
      className="fixed inset-0 z-[2147483000] isolate overflow-hidden bg-[#100607] text-[#f8f0df]"
    >
      <div className="sr-only">
        <h1>VENUS with Manlikegreg at Jet BBlack Lounge</h1>
        <p>
          Join +233Events for VENUS on {VENUS_EVENT.date} at 9pm. Free entry at
          Jet BBlack Lounge, Ashaley Botwe, 3rd Gate.
        </p>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 [background:radial-gradient(circle_at_50%_45%,rgba(174,16,22,0.46),transparent_50rem),#100607]"
      />

      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={VENUS_EVENT.webFlyer}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-contain object-center"
        />
      </motion.div>

      <Button
        as={Link}
        href="/events/venus"
        isIconOnly
        onPress={rememberIntro}
        aria-label="Close the VENUS intro and open the full VENUS event page"
        className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-40 h-12 min-h-12 w-12 min-w-12 rounded-full border border-[#e7c782]/65 bg-[#200b0d]/85 text-3xl font-light leading-none text-[#f8f0df] shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-md transition-transform hover:scale-105 sm:right-6 sm:top-[max(1.5rem,env(safe-area-inset-top))]"
      >
        <span aria-hidden="true">&times;</span>
      </Button>

      <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-center bg-[linear-gradient(180deg,transparent,rgba(40,7,9,0.94)_30%,#140708_100%)] px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-12">
        <div className="w-full max-w-md">
          <div className="mb-5 text-center text-[#f8f0df] [text-shadow:0_3px_16px_rgba(0,0,0,0.7)]">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-[#f5db9b]">
              You&apos;re invited <span aria-hidden="true">&middot;</span> Free entry
            </p>
            <p className="text-xl font-black tracking-[0.08em] sm:text-2xl">
              JET BBLACK LOUNGE
            </p>
            <p className="mt-1 text-sm font-bold tracking-[0.08em]">
              ASHALEY BOTWE, 3RD GATE
            </p>
          </div>
          <Button
            as={Link}
            href={VENUS_EVENT.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Reserve your free VENUS pass now on Egotickets"
            className="relative isolate min-h-14 w-full overflow-hidden border border-[#f7e7b5] bg-[linear-gradient(115deg,#c49a53_0%,#f8e8af_45%,#d6ad62_100%)] px-4 text-sm font-black tracking-[0.08em] text-[#25100d] shadow-[0_7px_0_#705225,0_18px_34px_rgba(0,0,0,0.28)] transition-transform hover:-translate-y-1 sm:px-10 sm:text-lg"
          >
            <span className="absolute inset-0 opacity-45 [background:linear-gradient(120deg,transparent_0_38%,white_44%_54%,transparent_60%_100%)]" />
            <span className="relative z-10 whitespace-normal text-center leading-tight">RESERVE YOUR FREE PASS NOW</span>
          </Button>
          <Link
            href={VENUS_TABLE_PACKAGES_HREF}
            onPress={rememberIntro}
            className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 text-sm font-bold tracking-[0.06em] !text-[#f8f0df] underline underline-offset-4"
          >
            EXPLORE TABLE PACKAGES <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
