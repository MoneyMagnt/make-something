import type { Metadata } from "next";
import SeoServicePageClient from "@/components/service-pages/SeoServicePageClient";
import { SITE_URL } from "@/lib/site";

const title = "SEO Growth System | Zyra Growth Studio";
const description =
  "technical seo, intent mapping, and conversion-focused pages from zyra growth studio to turn search traffic into qualified pipeline.";
const url = `${SITE_URL}/services/seo`;

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

export default function SeoServicePage() {
  return <SeoServicePageClient />;
}
