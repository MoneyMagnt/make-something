export const BRAND_ART = {
  abstractBlue: "/zyra-abstract-blue.jpg",
  gradientHub: "/zyra-gradient-hub.webp",
  gradientMesh: "/zyra-gradient-mesh.png",
} as const;

export type ServiceVisual = {
  eyebrow: string;
  caption: string;
  proof: string;
  accentLabel: string;
  gradient: string;
  glowClass: string;
  chipClass: string;
};

const DEFAULT_VISUAL: ServiceVisual = {
  eyebrow: "signal build",
  caption: "visual systems, clean messaging, and momentum you can feel in one scroll.",
  proof: "built to turn attention into action",
  accentLabel: "brand signal",
  gradient: "from-cyan-400 via-sky-400 to-blue-700",
  glowClass: "bg-cyan-400/28",
  chipClass: "border-cyan-200/70 bg-cyan-100/80 text-cyan-900",
};

export const SERVICE_VISUALS: Record<string, ServiceVisual> = {
  "seo growth system": {
    eyebrow: "discoverable demand",
    caption: "sharp information architecture, cleaner offer pages, and search journeys that feel premium instead of crowded.",
    proof: "intent mapped, pages tuned, demand captured",
    accentLabel: "search signal",
    gradient: "from-cyan-400 via-sky-300 to-blue-700",
    glowClass: "bg-cyan-400/30",
    chipClass: "border-cyan-200/70 bg-cyan-100/80 text-cyan-900",
  },
  "content studio": {
    eyebrow: "editorial engine",
    caption: "campaign concepts, visual rhythm, and content packaging that keeps the brand feeling alive across touchpoints.",
    proof: "hooks, assets, and repeatable publishing flow",
    accentLabel: "content signal",
    gradient: "from-emerald-400 via-teal-300 to-cyan-700",
    glowClass: "bg-emerald-400/30",
    chipClass: "border-emerald-200/70 bg-emerald-100/80 text-emerald-900",
  },
  "influencer strategy": {
    eyebrow: "culture-led distribution",
    caption: "creator plans that feel curated, on-brand, and ready to move real people instead of chasing empty reach.",
    proof: "creator fit, rollout timing, offer lift",
    accentLabel: "creator signal",
    gradient: "from-indigo-400 via-violet-300 to-fuchsia-700",
    glowClass: "bg-violet-400/28",
    chipClass: "border-violet-200/70 bg-violet-100/80 text-violet-900",
  },
  "founder website sprint": {
    eyebrow: "conversion surface",
    caption: "structured landing pages and founder positioning that make the offer feel higher value before the call even starts.",
    proof: "positioning, page flow, and tracking handoff",
    accentLabel: "site signal",
    gradient: "from-amber-300 via-orange-300 to-rose-500",
    glowClass: "bg-amber-300/28",
    chipClass: "border-amber-200/70 bg-amber-100/80 text-amber-900",
  },
};

export function getServiceVisual(title: string) {
  return SERVICE_VISUALS[title] ?? DEFAULT_VISUAL;
}

export const BRAND_SIGNAL_STRIPS = [
  {
    title: "editorial layouts",
    body: "big visuals, short copy blocks, and proof that lands fast.",
  },
  {
    title: "interactive service lanes",
    body: "hover on desktop, tap on mobile, same brand story both ways.",
  },
  {
    title: "blue-electric atmosphere",
    body: "abstract signal art instead of generic agency stock photos.",
  },
] as const;
