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
    lineup: [],
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
      "Signature venus nightlife experience by zyra at Glass Lounge, Accra, on 27 March 2026.",
    egoticketsEventUrl: "https://egotickets.com/events/venus-the-beginning/register",
    vibeCard: {
      title: "follow venus updates",
      badgeLabel: "stay connected",
      summary: "recaps, crowd energy, and updates in one place.",
      poster: "/lineup/venus%20flyer.jpeg",
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
        name: "Xeno The Rev",
        image: "/lineup/xeno-the-rev-20260312.jpeg",
        socialUrl: "https://snapchat.com/t/yocjSfV6",
      },
      {
        role: "mc",
        name: "Tim Jeezy",
        image: "/lineup/tim-jeezy.jpg",
        socialUrl: "https://snapchat.com/t/Wgi9sqZs",
      },
      {
        role: "mc",
        name: "Mr Hollywoode",
        image: "/lineup/mr-hollywoode.jpg",
        socialUrl:
          "https://www.tiktok.com/@mc_mrhollywoode/video/7614935145937816853?is_from_webapp=1&sender_device=pc&web_id=7601476827635271186",
      },
      {
        role: "dj",
        name: "King Switch",
        image: "/lineup/king-switch.jpg",
        socialUrl: "https://www.tiktok.com/@kingswitchofficial?_r=1&_t=ZS-94bpnMYHG9F",
      },
      {
        role: "dj",
        name: "Tormhe",
        image: "/lineup/tormhe.jpg",
        socialUrl: "https://www.tiktok.com/@iamdjtormhe",
      },
      {
        role: "dj",
        name: "Hero",
        image: "/lineup/hero.jpg",
        socialUrl:
          "https://www.tiktok.com/@dj_hero_gh/video/7616004376083090710?is_from_webapp=1&sender_device=pc&web_id=7601476827635271186",
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
      id: "venus-standard",
      name: "late-entry ticket",
      price: "GHS 50",
      link: "https://egotickets.com/events/venus-the-beginning/register",
    },
  ],
};

export const VENUS_FREE_PASS_LIMIT = 200;
export const VENUS_POST_PASS_PRICE = "GHS 50";

export function getEventBySlug(slug: string): EventMeta | undefined {
  return EVENTS.find((event) => event.slug === slug);
}





