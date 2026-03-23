import type { Metadata } from "next";
import ContentServicePageClient from "@/components/service-pages/ContentServicePageClient";
import { SITE_URL } from "@/lib/site";

const title = "Content Studio | Zyra Growth Studio";
const description =
  "story-led and ai-assisted content systems from zyra growth studio built to increase trust, visibility, and demand.";
const url = `${SITE_URL}/services/content`;

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
    siteName: "Zyra Growth Studio",
    title,
    description,
    url,
    images: [`${SITE_URL}/og.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${SITE_URL}/og.jpg`],
  },
};

export default function ContentServicePage() {
  return <ContentServicePageClient />;
}
