import type { Metadata } from "next";
import { EventsPageClient } from "@/components/EventsPageClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE_URL}/events`,
  },
};

export default function EventsPage() {
  return <EventsPageClient />;
}
