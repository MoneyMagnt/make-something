import type { Metadata } from "next";
import FounderWebsitesServicePageClient from "@/components/service-pages/FounderWebsitesServicePageClient";
import { SITE_URL } from "@/lib/site";

const title = "Founder Website Sprint | Zyra Growth Studio";
const description =
  "conversion-ready website strategy and launch support from zyra growth studio for founders who want to scale demand with clear positioning.";
const url = `${SITE_URL}/services/founder-websites`;

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

export default function FounderWebsitesServicePage() {
  return <FounderWebsitesServicePageClient />;
}
