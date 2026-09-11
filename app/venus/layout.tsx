import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const VENUS_URL = `${SITE_URL}/venus`;
const VENUS_IMAGE = `${SITE_URL}/events/venus/venus-tonight.jpg`;
const VENUS_TITLE = "VENUS Tonight | Jet BBlack Lounge, Accra";
const VENUS_DESCRIPTION =
  "VENUS is tonight at Jet BBlack Lounge, Ashaley Botwe. Free entry from 9pm. Reserve your pass and join +233Events for the official re-opening party.";

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
        width: 1600,
        height: 2844,
        alt: "VENUS is tonight at Jet BBlack Lounge",
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
