import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const title = "Events | Zyra Growth Studio";
const description =
  "Explore upcoming nightlife events in Accra from Zyra, including lineup, venue details, and ticket updates for current and upcoming drops.";
const url = `${SITE_URL}/events`;
const socialTitle = "VENUS | tap to reveal the wildcard mc";
const socialDescription =
  "the wildcard mc is in. open the venus page to reveal the face, catch the live experience, and lock late-entry for 27 march.";
const image = `${SITE_URL}/wildcard.jpg?v=20260325a`;

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
    title: socialTitle,
    description: socialDescription,
    url,
    images: [
      {
        url: image,
        alt: "venus wildcard mc teaser",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
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
