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
import {
  WE_OUTSIDE_FAQS,
  WE_OUTSIDE_SEO_DESCRIPTION,
  WE_OUTSIDE_SEO_TITLE,
  WE_OUTSIDE_SOCIAL_IMAGE_PATH,
} from "@/lib/weOutsideSeo";

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
  const isWeOutside = event.slug === "we-outside";
  const title = isWeOutside
    ? WE_OUTSIDE_SEO_TITLE
    : isVenus
      ? "Venus at Glass Lounge, Accra | 27 March 2026 | Late-entry live"
      : `${event.name} tickets | ${event.dateLabel} at ${event.venue}`;
  const description = isWeOutside
    ? WE_OUTSIDE_SEO_DESCRIPTION
    : isVenus
      ? "Accra nightlife event by Zyra at Glass Lounge on 27 March 2026. Free passes sold out in under 24 hours after the host push, with late-entry carrying the final run."
      : `${event.description} venue: ${event.venue}, ${event.city}.`;
  const url = `${SITE_URL}/events/${event.slug}`;
  const socialTitle = isVenus
    ? "VENUS | tap to reveal the wildcard mc"
    : title;
  const socialDescription = isVenus
    ? "the wildcard mc is in. reveal the face, catch the live experience, and lock late-entry for venus at glass lounge."
    : description;
  const imagePath = isWeOutside
    ? WE_OUTSIDE_SOCIAL_IMAGE_PATH
    : isVenus
      ? "/wildcard.jpg?v=20260325a"
      : "/og.jpg?v=20260323a";

  return {
    title: {
      absolute: title,
    },
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title: socialTitle,
      description: socialDescription,
      siteName: SITE_NAME,
      locale: "en_GH",
      images: [
        {
          url: `${SITE_URL}${imagePath}`,
          width: isWeOutside ? 1080 : 1200,
          height: isWeOutside ? 1536 : 630,
          alt: isWeOutside
            ? "We Outside Ghana returns this year"
            : `${event.name} by Zyra`,
        },
      ],
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

  const pageUrl = `${SITE_URL}/events/${event.slug}`;
  const isWeOutside = event.slug === "we-outside";
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
  const weOutsideSchema = isWeOutside
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${pageUrl}#webpage`,
            url: pageUrl,
            name: WE_OUTSIDE_SEO_TITLE,
            description: WE_OUTSIDE_SEO_DESCRIPTION,
            inLanguage: "en-GH",
            primaryImageOfPage: {
              "@type": "ImageObject",
              url: `${SITE_URL}${WE_OUTSIDE_SOCIAL_IMAGE_PATH}`,
              width: 1080,
              height: 1536,
            },
            about: {
              "@type": "Thing",
              name: "We Outside Ghana",
              description:
                "An upcoming Accra beachfront festival experience built around music, culture, creativity, and community.",
            },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Events",
                item: `${SITE_URL}/events`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "We Outside",
                item: pageUrl,
              },
            ],
          },
          {
            "@type": "FAQPage",
            mainEntity: WE_OUTSIDE_FAQS.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
        ],
      }
    : null;

  return (
    <>
      {!isWeOutside ? (
        <div className="sr-only">
          <h1>{`${event.name} at ${event.venue}, ${event.city} on ${event.dateLabel}`}</h1>
          <p>
            {`Explore lineup, venue details, and ticket information for ${event.name} by Zyra.`}
          </p>
        </div>
      ) : null}
      {eventSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      ) : null}
      {weOutsideSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(weOutsideSchema) }}
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
