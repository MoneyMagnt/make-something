import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const VENUS_EVENT = {
  date: "23 October 2026",
  startDate: "2026-10-23T21:00:00+00:00",
  host: "Mhan Like Greg",
  hostSocials: [
    { label: "TikTok", url: "https://www.tiktok.com/@mhan_like_g.r.e.g1" },
    { label: "Snapchat", url: "https://www.snapchat.com/@mhanlikegreg" },
  ],
  venue: "Jet BBlack Lounge",
  address: "Ashaley Botwe, 3rd Gate, Accra",
  passCode: "*713*33*82#",
  passDialUrl: "tel:*713*33*82%23",
  registrationUrl: "https://egotickets.com/events/venus-x-astro-sys/register",
  flyer: "/events/venus/venus-october-2026.jpg",
  webFlyer: "/events/venus/venus-october-2026.webp",
  previewFlyer: "/events/venus/mhan-like-greg-preview.jpg",
  hostImage: "/events/venus/manlikegreg-flyer.webp",
  url: `${SITE_URL}/events/venus`,
  title: "VENUS × Mhan Like Greg | Free Entry Party — Accra, 23 October 2026",
  description:
    "Mhan Like Greg (Manlikegreg) is hosting VENUS at Jet BBlack Lounge, Ashaley Botwe, Accra on Friday 23 October 2026 at 9pm. Free entry. Reserve your pass now.",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Jet%20BBlack%20Lounge%2C%20Ashaley%20Botwe%2C%203rd%20Gate%2C%20Accra",
} as const;

export const VENUS_METADATA: Metadata = {
  title: { absolute: VENUS_EVENT.title },
  description: VENUS_EVENT.description,
  alternates: { canonical: VENUS_EVENT.url },
  keywords: [
    "Mhan Like Greg",
    "Manlikegreg",
    "mhan like greg events",
    "manlikegreg party",
    "mhan like greg accra",
    "VENUS Accra",
    "VENUS party 2026",
    "VENUS Jet BBlack",
    "where to party in Accra October 2026",
    "Accra nightlife October 2026",
    "Accra parties this weekend",
    "free entry party Accra",
    "Jet BBlack Lounge events",
    "Ashaley Botwe nightlife",
    "Accra Gen Z parties",
    "things to do in Accra October",
    "best parties in Accra 2026",
    "+233Events",
    "zyra events accra",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    url: VENUS_EVENT.url,
    title: "VENUS × Mhan Like Greg — Free Entry. 23 Oct. Jet BBlack Lounge, Accra.",
    description:
      "He's hosting. Entry is free. Tables available from GHS 2,000. Jet BBlack Lounge, Ashaley Botwe — 9pm sharp. Don't say you weren't told.",
    siteName: "+233Events",
    locale: "en_GH",
    images: [
      {
        url: `${SITE_URL}/events/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "VENUS, 23 October 2026, hosted by Mhan Like Greg at Jet BBlack Lounge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VENUS × Mhan Like Greg — Free Entry. Oct 23. Accra.",
    description:
      "Mhan Like Greg runs VENUS on 23 Oct at Jet BBlack Lounge, Accra. Free entry. Tables from GHS 2K. Reserve your pass — link in bio but make it IRL.",
    images: [`${SITE_URL}/events/opengraph-image`],
  },
  category: "events",
};

export const VENUS_LANDING_METADATA: Metadata = {
  ...VENUS_METADATA,
  robots: { index: false, follow: true },
  openGraph: { ...VENUS_METADATA.openGraph, url: `${SITE_URL}/venus` },
};

export const VENUS_EVENT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Event",
  "@id": `${VENUS_EVENT.url}#event-2026-10-23`,
  name: "VENUS with Mhan Like Greg",
  description: VENUS_EVENT.description,
  url: VENUS_EVENT.url,
  image: [`${SITE_URL}${VENUS_EVENT.previewFlyer}`],
  startDate: VENUS_EVENT.startDate,
  endDate: "2026-10-24T04:00:00+00:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  isAccessibleForFree: true,
  location: {
    "@type": "Place",
    name: VENUS_EVENT.venue,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ashaley Botwe, 3rd Gate",
      addressLocality: "Accra",
      addressCountry: "GH",
    },
  },
  performer: {
    "@type": "Person",
    "@id": `${VENUS_EVENT.url}#host`,
    name: VENUS_EVENT.host,
    alternateName: "Manlikegreg",
    image: `${SITE_URL}${VENUS_EVENT.hostImage}`,
    url: VENUS_EVENT.hostSocials[0].url,
    sameAs: VENUS_EVENT.hostSocials.map((social) => social.url),
  },
  organizer: { "@type": "Organization", name: "+233Events", url: SITE_URL },
  offers: {
    "@type": "Offer",
    url: VENUS_EVENT.registrationUrl,
    price: "0",
    priceCurrency: "GHS",
    availability: "https://schema.org/InStock",
  },
};
