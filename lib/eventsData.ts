export type EventName = "We Outside" | "VENUS";
export type EventSlug = "we-outside" | "venus";
import { VENUS_EVENT } from "@/lib/venusEvent";

export type EventLineupMember = {
  role: string;
  name: string;
  image?: string;
  socialUrl?: string;
  socialLinks?: { label: string; url: string }[];
};

export type EventVibeClip = {
  src: string;
  poster?: string;
  label: string;
};

export type EventVibeAction = {
  platform: "instagram" | "whatsapp";
  url: string;
  label: string;
};

export type EventVibeCard = {
  title: string;
  badgeLabel: string;
  summary?: string;
  poster: string;
  actions: EventVibeAction[];
  clips?: EventVibeClip[];
};

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
  lineup: EventLineupMember[];
  vibeCard?: EventVibeCard;
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
    timeLabel: "Next drop. Details when it's time.",
    venue: "Laboma Beach Front",
    city: "Labadi Beach, Accra",
    logo: "/Weoutside.logo.org2.png",
    bannerTone: "from-cyan-500 to-emerald-500",
    auraA: "rgba(6,182,212,0.34)",
    auraB: "rgba(34,197,94,0.28)",
    fallbackPrice: "GHS 50",
    description:
      "Beachfront party energy by zyra with oceanfront staging and sunset atmosphere.",
    lineup: [],
  },
  {
    name: "VENUS",
    slug: "venus",
    day: "23",
    month: "OCT",
    dateLabel: VENUS_EVENT.date,
    timeLabel: "9pm sharp",
    startDateIso: VENUS_EVENT.startDate,
    venue: VENUS_EVENT.venue,
    city: VENUS_EVENT.address,
    logo: VENUS_EVENT.webFlyer,
    bannerTone: "from-[#4c0c10] to-[#130708]",
    auraA: "rgba(157,23,29,0.48)",
    auraB: "rgba(231,199,130,0.22)",
    fallbackPrice: "Free pass",
    egoticketsEventUrl: VENUS_EVENT.registrationUrl,
    description: VENUS_EVENT.description,
    vibeCard: {
      title: "follow venus updates",
      badgeLabel: "stay connected",
      poster: VENUS_EVENT.flyer,
      actions: [
        {
          platform: "instagram",
          url: "https://www.instagram.com/venuss.233?igsh=MW5oYTRoM294dHh6ZQ%3D%3D&utm_source=qr",
          label: "open instagram",
        },
        {
          platform: "whatsapp",
          url: "https://chat.whatsapp.com/C4lD0dZquAaKiHlQpWPb7G?mode=hqctcli",
          label: "open whatsapp community",
        },
      ],
      clips: [],
    },
    lineup: [
      {
        role: "host",
        name: VENUS_EVENT.host,
        image: VENUS_EVENT.hostImage,
        socialLinks: [...VENUS_EVENT.hostSocials],
      },
    ],
  },
];

export const DEFAULT_EVENT_TICKETS: Record<EventName, TicketItem[]> = {
  "We Outside": [
    { id: "wo-early", name: "early bird", price: "GHS 50", link: "" },
    { id: "wo-standard", name: "standard ticket", price: "GHS 100", link: "" },
  ],
  VENUS: [
    {
      id: "venus-pass",
      name: "VENUS free pass",
      price: "GHS 0",
      link: VENUS_EVENT.registrationUrl,
    },
  ],
};

export const VENUS_FREE_PASS_LIMIT = 200;
export const VENUS_POST_PASS_PRICE = "Egotickets";

export function getEventBySlug(slug: string): EventMeta | undefined {
  return EVENTS.find((event) => event.slug === slug);
}





