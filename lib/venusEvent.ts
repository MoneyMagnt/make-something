import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const VENUS_EVENT = {
  date: "23 October 2026",
  startDate: "2026-10-23T21:00:00+00:00",
  host: "Manlikegreg",
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
  hostImage: "/events/venus/manlikegreg.webp",
  url: `${SITE_URL}/events/venus`,
  title: "VENUS with Manlikegreg | Accra Party, 23 Oct 2026",
  description:
    "VENUS is a free-entry Accra nightlife party hosted by Manlikegreg (Mhan Like Greg) on 23 October 2026 at 9pm. Jet BBlack Lounge, Ashaley Botwe. Reserve a pass.",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Jet%20BBlack%20Lounge%2C%20Ashaley%20Botwe%2C%203rd%20Gate%2C%20Accra",
} as const;

export const VENUS_METADATA: Metadata = {
  title: { absolute: VENUS_EVENT.title },
  description: VENUS_EVENT.description,
  alternates: { canonical: VENUS_EVENT.url },
  keywords: [
    "VENUS Accra",
    "Manlikegreg",
    "Mhan Like Greg",
    "Accra party",
    "Accra events October 2026",
    "Jet BBlack Lounge",
    "Ashaley Botwe events",
    "VENUS free pass",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    url: VENUS_EVENT.url,
    title: VENUS_EVENT.title,
    description: VENUS_EVENT.description,
    siteName: "+233Events",
    locale: "en_GH",
    images: [
      {
        url: `${SITE_URL}${VENUS_EVENT.flyer}`,
        width: 1440,
        height: 2560,
        alt: "VENUS, 23 October 2026, hosted by Manlikegreg at Jet BBlack Lounge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: VENUS_EVENT.title,
    description: VENUS_EVENT.description,
    images: [`${SITE_URL}${VENUS_EVENT.flyer}`],
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
  name: "VENUS with Manlikegreg",
  description: VENUS_EVENT.description,
  url: VENUS_EVENT.url,
  image: [`${SITE_URL}${VENUS_EVENT.flyer}`],
  startDate: VENUS_EVENT.startDate,
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
    name: VENUS_EVENT.host,
    alternateName: "Mhan Like Greg",
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
