export type EventName = "We Outside" | "VENUS";
export type EventSlug = "we-outside" | "venus";

export type EventMeta = {
  name: EventName;
  slug: EventSlug;
  day: string;
  month: string;
  dateLabel: string;
  timeLabel: string;
  startDateIso?: string;
  venue: string;
  city: string;
  logo: string;
  bannerTone: string;
  auraA: string;
  auraB: string;
  fallbackPrice: string;
  description: string;
  egoticketsEventUrl?: string;
};

export type TicketItem = {
  id: string;
  name: string;
  price: string;
  link: string;
};

export const EVENTS: EventMeta[] = [
  {
    name: "We Outside",
    slug: "we-outside",
    day: "SOON",
    month: "COMING",
    dateLabel: "Coming soon",
    timeLabel: "timing drops soon",
    venue: "Laboma Beach Front",
    city: "Labadi Beach, Accra",
    logo: "/Weoutside.logo.org2.png",
    bannerTone: "from-cyan-500 to-emerald-500",
    auraA: "rgba(6,182,212,0.34)",
    auraB: "rgba(34,197,94,0.28)",
    fallbackPrice: "GHS 50",
    description:
      "Beachfront party energy by zyra with oceanfront staging and sunset atmosphere.",
  },
  {
    name: "VENUS",
    slug: "venus",
    day: "27",
    month: "MAR",
    dateLabel: "27 March 2026",
    timeLabel: "8pm till late",
    startDateIso: "2026-03-27T20:00:00+00:00",
    venue: "Glass Lounge",
    city: "Accra",
    logo: "/VENUS_logo.PNG",
    bannerTone: "from-indigo-500 to-fuchsia-500",
    auraA: "rgba(99,102,241,0.36)",
    auraB: "rgba(217,70,239,0.28)",
    fallbackPrice: "GHS 50",
    description:
      "Signature venus nightlife experience by zyra with free pass access before paid entry starts.",
  },
];

export const DEFAULT_EVENT_TICKETS: Record<EventName, TicketItem[]> = {
  "We Outside": [
    { id: "wo-early", name: "early bird", price: "GHS 50", link: "" },
    { id: "wo-standard", name: "standard ticket", price: "GHS 100", link: "" },
  ],
  VENUS: [{ id: "venus-standard", name: "entry ticket", price: "GHS 50", link: "" }],
};

export const VENUS_FREE_PASS_LIMIT = 200;
export const VENUS_POST_PASS_PRICE = "GHS 50";

export function getEventBySlug(slug: string): EventMeta | undefined {
  return EVENTS.find((event) => event.slug === slug);
}