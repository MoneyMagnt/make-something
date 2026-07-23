import type { Metadata } from "next";
import FounderWebsitesServicePageClient from "@/components/service-pages/FounderWebsitesServicePageClient";
import { SITE_URL } from "@/lib/site";

const title = "Founder Website Sprint | Zyra Growth Studio Ghana";
const description =
  "Zyra builds conversion-ready founder websites in Ghana and West Africa. From brief to live in 7 days. Offer positioning, conversion structure, and WhatsApp integration included.";
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
