"use client";

import { Button, Link } from "@heroui/react";
import { motion } from "framer-motion";
import { SITE_URL } from "@/lib/site";

const VENUS_TICKET_URL =
  "https://egotickets.com/events/venus-the-beginning/register";

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
    availability: "https://schema.org/InStock",
    validFrom: "2026-08-24T00:00:00+00:00",
  },
};

export default function VenusTicketLandingPage() {
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
          Accra, meet VENUS. +233Events officially opens Jet BBlack Lounge with an unforgettable celebration of a major milestone. Get your tickets now and be part of the beginning.
        </p>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 [background:radial-gradient(circle_at_12%_18%,rgba(245,250,120,0.9),transparent_24rem),radial-gradient(circle_at_88%_18%,rgba(245,0,150,0.48),transparent_28rem),linear-gradient(150deg,#f5fa78_0%,#92e5d5_50%,#2fc1cf_100%)]"
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
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-x-0 bottom-0 z-20 flex min-h-36 items-center justify-center bg-[linear-gradient(180deg,rgba(245,0,150,0),#f50096_30%,#d9007f_100%)] px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-12 sm:min-h-40">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.55, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          <Button
            as={Link}
            href={VENUS_TICKET_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get VENUS tickets now on Egotickets"
            className="relative isolate min-h-14 w-full overflow-hidden border-2 border-white/90 bg-[linear-gradient(135deg,#ffffff_0%,#a8f2ee_28%,#f5fa78_50%,#ff83c5_72%,#ffffff_100%)] px-10 text-lg font-black tracking-[0.08em] text-[#123b55] shadow-[0_12px_0_#123b55,0_22px_44px_rgba(18,59,85,0.25)] transition-transform hover:-translate-y-1"
          >
            <span className="absolute inset-0 opacity-45 [background:linear-gradient(120deg,transparent_0_38%,white_44%_54%,transparent_60%_100%)]" />
            <span className="relative z-10">GET TICKETS NOW!</span>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
