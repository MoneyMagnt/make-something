import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const VENUS_URL = `${SITE_URL}/venus`;
const VENUS_IMAGE = `${SITE_URL}/venus/opengraph-image`;
const VENUS_TITLE = "VENUS | +233Events Opens Jet BBlack Lounge";
const VENUS_DESCRIPTION =
  "Accra, meet VENUS. +233Events officially opens Jet BBlack Lounge with an unforgettable celebration of a major milestone. Get your tickets now and be part of the beginning.";

export const metadata: Metadata = {
  title: {
    absolute: VENUS_TITLE,
  },
  description: VENUS_DESCRIPTION,
  keywords: [
    "VENUS Accra",
    "VENUS tickets",
    "Accra events September 2026",
    "Jet BBlack Lounge",
    "Ashaley Botwe events",
    "Accra nightlife",
    "Zyra events Ghana",
  ],
  alternates: {
    canonical: VENUS_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: VENUS_URL,
    title: VENUS_TITLE,
    description: VENUS_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_GH",
    images: [
      {
        url: VENUS_IMAGE,
        width: 1200,
        height: 630,
        alt: "+233Events opens Jet BBlack Lounge with VENUS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: VENUS_TITLE,
    description: VENUS_DESCRIPTION,
    images: [VENUS_IMAGE],
  },
  category: "events",
};

export default function VenusLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
