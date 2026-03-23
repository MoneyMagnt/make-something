import type { Metadata } from "next";
import { ServicesPageClient } from "@/components/ServicesPageClient";
import { SITE_URL } from "@/lib/site";

const title = "Services | Zyra Growth Studio";
const description =
  "seo, content, influencer, and founder website systems from zyra growth studio for brands that need visible momentum.";
const url = `${SITE_URL}/services`;

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

export default function ServicesPage() {
  return <ServicesPageClient />;
}
