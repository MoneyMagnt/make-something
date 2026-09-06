"use client";

import { Button, Link } from "@heroui/react";
import { motion } from "framer-motion";
import { SITE_URL } from "@/lib/site";
import { VENUS_TABLE_PACKAGES_HREF } from "@/lib/venusTables";

const VENUS_TICKET_URL =
  "https://egotickets.com/events/venus-the-beginning/register";
const VENUS_INTRO_STORAGE_KEY = "venus_ticket_intro_seen_v2";

const VENUS_EVENT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "VENUS",
  description:
    "+233Events officially opens Jet BBlack Lounge with VENUS for an unforgettable celebration of a major milestone in Accra.",
  url: `${SITE_URL}/venus`,
  image: [`${SITE_URL}/events/venus/venus-flyer.jpg`],
  startDate: "2026-09-11T21:00:00+00:00",
  endDate: "2026-09-12T03:00:00+00:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Jet BBlack Lounge",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ashaley Botwe, 3rd Gate",
      addressLocality: "Accra",
      addressCountry: "GH",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "+233Events",
    url: SITE_URL,
  },
  offers: {
    "@type": "Offer",
    url: VENUS_TICKET_URL,
    price: "0",
    priceCurrency: "GHS",
    availability: "https://schema.org/InStock",
    validFrom: "2026-08-24T00:00:00+00:00",
  },
};

export default function VenusTicketLandingPage() {
  const rememberIntro = () => {
    try {
      sessionStorage.setItem(VENUS_INTRO_STORAGE_KEY, "true");
    } catch {
      // Navigation should still work if browser storage is unavailable.
    }
  };

  const closeToVenusPage = () => {
    rememberIntro();
    window.location.assign("/events/venus");
  };

  return (
    <main
      id="main-content"
      className="fixed inset-0 z-[2147483000] isolate overflow-hidden bg-[#b8edc9] text-[#123b55]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(VENUS_EVENT_SCHEMA) }}
      />

      <div className="sr-only">
        <h1>+233Events opens Jet BBlack Lounge with VENUS</h1>
        <p>
          You are invited. +233Events opens Jet BBlack Lounge with VENUS on
          11 September 2026 at 9pm. Free entry. Reserve your free pass now and
          be part of the beginning.
        </p>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 [background:radial-gradient(circle_at_12%_18%,rgba(245,250,120,0.9),transparent_24rem),radial-gradient(circle_at_88%_18%,rgba(245,0,150,0.48),transparent_28rem),linear-gradient(150deg,#f5fa78_0%,#92e5d5_50%,#2fc1cf_100%)]"
      />

      <motion.video
        poster="/events/venus/venus-flyer-poster.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
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

      <Button
        isIconOnly
        onPress={closeToVenusPage}
        aria-label="Close the VENUS intro and open the full VENUS event page"
        className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-40 h-12 min-h-12 w-12 min-w-12 rounded-full border-2 border-white/85 bg-[#123b55]/82 text-3xl font-light leading-none text-white shadow-[0_12px_32px_rgba(18,59,85,0.3)] backdrop-blur-md transition-transform hover:scale-105 sm:right-6 sm:top-[max(1.5rem,env(safe-area-inset-top))]"
      >
        <span aria-hidden="true">&times;</span>
      </Button>

      <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-center bg-[linear-gradient(180deg,rgba(245,0,150,0),rgba(153,0,91,0.94)_30%,#82004e_100%)] px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-12">
        <div className="w-full max-w-md">
          <div className="mb-5 text-center text-white [text-shadow:0_3px_16px_rgba(18,59,85,0.7)]">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-[#f5faaf]">
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
            href={VENUS_TICKET_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Reserve your free VENUS pass now on Egotickets"
            className="relative isolate min-h-14 w-full overflow-hidden border-2 border-white/90 bg-[linear-gradient(135deg,#ffffff_0%,#a8f2ee_28%,#f5fa78_50%,#ff83c5_72%,#ffffff_100%)] px-4 text-sm font-black tracking-[0.08em] text-[#123b55] shadow-[0_10px_0_#123b55,0_20px_40px_rgba(18,59,85,0.25)] transition-transform hover:-translate-y-1 sm:px-10 sm:text-lg"
          >
            <span className="absolute inset-0 opacity-45 [background:linear-gradient(120deg,transparent_0_38%,white_44%_54%,transparent_60%_100%)]" />
            <span className="relative z-10 whitespace-normal text-center leading-tight">RESERVE YOUR FREE PASS NOW</span>
          </Button>
          <Link
            href={VENUS_TABLE_PACKAGES_HREF}
            onPress={rememberIntro}
            className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 text-sm font-bold tracking-[0.06em] !text-white underline underline-offset-4"
          >
            EXPLORE TABLE PACKAGES <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
