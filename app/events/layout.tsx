import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { WE_OUTSIDE_SOCIAL_IMAGE_PATH } from "@/lib/weOutsideSeo";

const title = "Accra Events | Zyra Growth Studio";
const description =
  "Explore upcoming Zyra experiences in Accra, including We Outside Ghana, event announcements, access updates, and creative team opportunities.";
const url = `${SITE_URL}/events`;
const socialTitle = "We Outside Ghana is back";
const socialDescription =
  "An Accra beach festival bringing music, culture, creators, and community together. Get first access to the next drop.";
const image = `${SITE_URL}${WE_OUTSIDE_SOCIAL_IMAGE_PATH}`;

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
