import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const title = "xeno the rev hosts venus | free passes live";
const description =
  "free pass access is live before standard entry starts. tap for lineup, venue, and access.";
const url = `${SITE_URL}/events`;
const image = `${SITE_URL}/events/opengraph-image?v=20260312e`;

export const metadata: Metadata = {
  title,
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
        width: 1200,
        height: 630,
        alt: "xeno the rev hosts venus with free passes live",
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
