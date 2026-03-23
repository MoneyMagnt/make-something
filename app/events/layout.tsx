import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const title = "venus | countdown on, late-entry live";
const description =
  "450+ tickets are already gone. the countdown to 27 march is on, and late-entry tickets are still live at glass lounge, accra. tap for lineup and entry.";
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
        alt: "zyra growth studio event preview",
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

export default function EventsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
