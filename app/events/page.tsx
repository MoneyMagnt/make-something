import type { Metadata } from "next";
import { EventsPageClient } from "@/components/EventsPageClient";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const title = "Events in Accra | Venus at Glass Lounge and upcoming Zyra nights";
const description =
  "Find upcoming Accra nightlife events from Zyra, including Venus at Glass Lounge on 27 March 2026. See lineup, venue details, and late-entry tickets.";
const url = `${SITE_URL}/events`;
const image = `${SITE_URL}/og.jpg?v=20260323a`;

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title,
    description,
    url,
    images: [
      {
        url: image,
        alt: "zyra growth studio events preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
};

export default function EventsPage() {
  return <EventsPageClient />;
}
