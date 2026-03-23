import type { Metadata } from "next";
import InfluencerServicePageClient from "@/components/service-pages/InfluencerServicePageClient";
import { SITE_URL } from "@/lib/site";

const title = "Influencer Strategy | Zyra Growth Studio";
const description =
  "creator strategy, campaign narrative, and launch operations from zyra growth studio focused on measurable business outcomes.";
const url = `${SITE_URL}/services/influencer`;

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

export default function InfluencerServicePage() {
  return <InfluencerServicePageClient />;
}
