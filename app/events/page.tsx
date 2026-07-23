import type { Metadata } from "next";
import { EventsPageClient } from "@/components/EventsPageClient";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  WE_OUTSIDE_SEO_DESCRIPTION,
  WE_OUTSIDE_SOCIAL_IMAGE_PATH,
} from "@/lib/weOutsideSeo";

const title = "Accra Events | We Outside Ghana and Zyra Experiences";
const description = `${WE_OUTSIDE_SEO_DESCRIPTION} Explore more Zyra events in Accra.`;
const url = `${SITE_URL}/events`;
const image = `${SITE_URL}${WE_OUTSIDE_SOCIAL_IMAGE_PATH}`;

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url,
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title,
    description,
    url,
    locale: "en_GH",
    images: [
      {
        url: image,
        width: 1080,
        height: 1536,
        alt: "We Outside Ghana returns this year",
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
