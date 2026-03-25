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

  const isVenus = event.slug === "venus";
  const title = isVenus
    ? "Venus at Glass Lounge, Accra | 27 March 2026 | Late-entry live"
    : `${event.name} tickets | ${event.dateLabel} at ${event.venue}`;
  const description = isVenus
    ? "Accra nightlife event by Zyra at Glass Lounge on 27 March 2026. 450+ tickets are already gone and late-entry tickets are still live."
    : `${event.description} venue: ${event.venue}, ${event.city}.`;
  const url = `${SITE_URL}/events/${event.slug}`;
  const socialTitle = isVenus
    ? "VENUS | tap to reveal the wildcard mc"
    : title;
  const socialDescription = isVenus
    ? "the wildcard mc is in. reveal the face, catch the live experience, and lock late-entry for venus at glass lounge."
    : description;
  const imagePath = isVenus ? "/wildcard.jpg?v=20260325a" : "/og.jpg?v=20260323a";

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title: socialTitle,
      description: socialDescription,
      siteName: SITE_NAME,
      images: [{ url: `${SITE_URL}${imagePath}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [`${SITE_URL}${imagePath}`],
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
          image: [`${SITE_URL}${event.vibeCard?.poster ?? event.logo}`],
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
      <div className="sr-only">
        <h1>{`${event.name} at ${event.venue}, ${event.city} on ${event.dateLabel}`}</h1>
        <p>
          {`Explore lineup, venue details, and ticket information for ${event.name} by Zyra.`}
        </p>
      </div>
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
