export type EventName = "We Outside" | "VENUS";
export type EventSlug = "we-outside" | "venus";

export type EventLineupMember = {
  role: string;
  name: string;
  image?: string;
  socialUrl?: string;
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
  summary: string;
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
    day: "11",
    month: "SEP",
    dateLabel: "11 September 2026",
    timeLabel: "9pm sharp",
    startDateIso: "2026-09-11T21:00:00+00:00",
    venue: "Jet BBL Ack Lounge",
    city: "Ashaley Botwe, 3rd Gate, Accra",
    logo: "/VENUS_logo.PNG",
    bannerTone: "from-[#f5fa78] to-[#58d2db]",
    auraA: "rgba(245,250,120,0.58)",
    auraB: "rgba(245,0,150,0.32)",
    fallbackPrice: "Get tickets on Egotickets",
    egoticketsEventUrl:
      "https://egotickets.com/events/venus-the-beginning/register",
    description:
      "VENUS is tonight at Jet BBL Ack Lounge in Ashaley Botwe, Accra, from 9pm.",
    vibeCard: {
      title: "follow venus updates",
      badgeLabel: "stay connected",
      summary: "passes, lineup updates, and event-night energy in one place.",
      poster: "/events/venus/venus-tonight.jpg",
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
        name: "Peace",
        image: "/lineup/peace-host.jpeg",
        socialUrl:
          "https://www.snapchat.com/@itzz_peaceee26",
      },
      {
        role: "mc",
        name: "Viperlino",
        image: "/lineup/viperlino.jpg",
        socialUrl: "https://www.tiktok.com/@viperlinogh",
      },
      {
        role: "mc",
        name: "Hollywoode",
        image: "/lineup/mr-hollywoode.jpg",
      },
      {
        role: "dj",
        name: "Debowy",
      },
      {
        role: "dj",
        name: "Tormhe",
        image: "/lineup/tormhe.jpg",
        socialUrl: "https://www.tiktok.com/@iamdjtormhe",
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
      name: "VENUS tickets",
      price: "Egotickets",
      link: "https://egotickets.com/events/venus-the-beginning/register",
    },
  ],
};

export const VENUS_FREE_PASS_LIMIT = 200;
export const VENUS_POST_PASS_PRICE = "Egotickets";

export function getEventBySlug(slug: string): EventMeta | undefined {
  return EVENTS.find((event) => event.slug === slug);
}





