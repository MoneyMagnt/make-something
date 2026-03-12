import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetailClient } from "./EventDetailClient";
import {
  DEFAULT_EVENT_TICKETS,
  EVENTS,
  VENUS_FREE_PASS_LIMIT,
  getEventBySlug,
} from "@/lib/eventsData";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type EventPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: `event not found | ${SITE_NAME}`,
      description: "the event page you requested does not exist.",
    };
  }

  const title = `${event.name} | ${SITE_NAME} events`;
  const description = `${event.description} venue: ${event.venue}, ${event.city}.`;
  const url = `${SITE_URL}/events/${event.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: SITE_NAME,
      images: [{ url: `${SITE_URL}${event.logo}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}${event.logo}`],
    },
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const eventSchema =
    event.startDateIso
      ? {
          "@context": "https://schema.org",
          "@type": "Event",
          name: event.name,
          description: event.description,
          startDate: event.startDateIso,
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: event.venue,
            address: {
              "@type": "PostalAddress",
              addressLocality: event.city,
              addressCountry: "GH",
            },
          },
          image: [`${SITE_URL}${event.logo}`],
          organizer: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
          offers: DEFAULT_EVENT_TICKETS[event.name].map((ticket) => ({
            "@type": "Offer",
            priceCurrency: "GHS",
            price: ticket.price.replace("GHS ", ""),
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/events/${event.slug}`,
            name: ticket.name,
          })),
        }
      : null;

  return (
    <>
      {eventSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      ) : null}
      <EventDetailClient
        event={event}
        tickets={DEFAULT_EVENT_TICKETS[event.name]}
        venusFreePassLimit={VENUS_FREE_PASS_LIMIT}
      />
    </>
  );
}


