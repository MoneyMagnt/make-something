export const BRAND_ART = {
  abstractBlue: "/zyra-abstract-blue.jpg",
  gradientHub: "/zyra-gradient-hub.webp",
  gradientMesh: "/zyra-gradient-mesh.png",
} as const;

export const HOME_PHOTOS = {
  workspaceBlueWall: "/home/workspace-blue-wall.jpg",
  studioTeam: "/home/studio-team.jpg",
  minimalDesk: "/home/minimal-desk.jpg",
  blueGlassyShapes: "/home/blue-glassy-shapes.jpg",
  laptopWorkflow: "/home/laptop-workflow.jpg",
  teamCollabStudio: "/home/team-collab-studio.jpg",
  analyticsLaptop: "/home/analytics-laptop.jpg",
  creativeMeetingOffice: "/home/creative-meeting-office.jpg",
  strategyMeeting: "/home/strategy-meeting.jpg",
  lagosTeamMeeting: "/home/lagos-team-meeting.jpg",
  lagosCollabStanding: "/home/lagos-collab-standing.jpg",
  lagosBusinesswomen: "/home/lagos-businesswomen.jpg",
} as const;

export const HERO_PREVIEW_PANELS = [
  {
    label: "campaign planning",
    title: "offer strategy",
    image: HOME_PHOTOS.lagosTeamMeeting,
  },
  {
    label: "content direction",
    title: "editorial output",
    image: HOME_PHOTOS.lagosCollabStanding,
  },
  {
    label: "search systems",
    title: "demand clarity",
    image: HOME_PHOTOS.lagosBusinesswomen,
  },
] as const;

export type ServiceVisual = {
  eyebrow: string;
  caption: string;
  proof: string;
  accentLabel: string;
  gradient: string;
  glowClass: string;
  chipClass: string;
  surfaceBackground: string;
};

const DEFAULT_VISUAL: ServiceVisual = {
  eyebrow: "signal build",
  caption: "visual systems, cleaner messaging, and a stronger next move in one pass.",
  proof: "designed to turn attention into action",
  accentLabel: "brand signal",
  gradient: "from-cyan-300 via-sky-400 to-blue-700",
  glowClass: "bg-cyan-400/28",
  chipClass: "border-cyan-200/70 bg-cyan-100/85 text-cyan-900",
  surfaceBackground: `linear-gradient(155deg,rgba(4,12,27,0.14),rgba(2,6,23,0.78)), url(${HOME_PHOTOS.laptopWorkflow})`,
};

export const SERVICE_VISUALS: Record<string, ServiceVisual> = {
  "seo growth system": {
    eyebrow: "discoverable demand",
    caption: "intent-led pages and search surfaces that look premium before the first call.",
    proof: "search journeys shaped for revenue, not traffic alone",
    accentLabel: "search signal",
    gradient: "from-cyan-300 via-sky-400 to-blue-700",
    glowClass: "bg-cyan-400/30",
    chipClass: "border-cyan-200/70 bg-cyan-100/85 text-cyan-900",
    surfaceBackground: `linear-gradient(155deg,rgba(6,18,40,0.18),rgba(2,6,23,0.76)), url(${HOME_PHOTOS.lagosBusinesswomen})`,
  },
  "content studio": {
    eyebrow: "editorial engine",
    caption: "campaign rhythm, content packaging, and visual sequencing that keep the brand feeling alive.",
    proof: "story-first assets with sharper creative direction",
    accentLabel: "content signal",
    gradient: "from-emerald-300 via-teal-300 to-cyan-700",
    glowClass: "bg-emerald-400/30",
    chipClass: "border-emerald-200/70 bg-emerald-100/85 text-emerald-900",
    surfaceBackground: `linear-gradient(155deg,rgba(7,22,30,0.18),rgba(2,6,23,0.72)), url(${HOME_PHOTOS.lagosCollabStanding})`,
  },
  "influencer strategy": {
    eyebrow: "culture-led reach",
    caption: "creator programs that feel curated, visible, and tied to action instead of noise.",
    proof: "creator fit, rollout timing, and clearer offer lift",
    accentLabel: "creator signal",
    gradient: "from-indigo-300 via-violet-300 to-fuchsia-700",
    glowClass: "bg-violet-400/28",
    chipClass: "border-violet-200/70 bg-violet-100/85 text-violet-900",
    surfaceBackground: `linear-gradient(155deg,rgba(18,22,44,0.16),rgba(2,6,23,0.74)), url(${HOME_PHOTOS.lagosTeamMeeting})`,
  },
  "founder website sprint": {
    eyebrow: "conversion surface",
    caption: "founder pages that frame the offer fast and make the brand feel more expensive.",
    proof: "positioning, page flow, and conversion clarity in one sprint",
    accentLabel: "site signal",
    gradient: "from-amber-300 via-orange-300 to-rose-500",
    glowClass: "bg-amber-300/28",
    chipClass: "border-amber-200/70 bg-amber-100/85 text-amber-900",
    surfaceBackground: `linear-gradient(155deg,rgba(32,20,7,0.16),rgba(2,6,23,0.74)), url(${HOME_PHOTOS.workspaceBlueWall})`,
  },
};

export function getServiceVisual(title: string) {
  return SERVICE_VISUALS[title] ?? DEFAULT_VISUAL;
}

export const BRAND_SIGNAL_STRIPS = [
  {
    title: "visual-first entry",
    body: "the first screen lands with motion, contrast, and direction before the reading starts.",
  },
  {
    title: "interactive guidance",
    body: "hover on desktop, tap on mobile, same signal system both ways.",
  },
  {
    title: "marketing atmosphere",
    body: "editorial gradients, layered proof, and sharper conversion surfaces across the page.",
  },
] as const;

