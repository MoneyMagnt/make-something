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
  caption: "clearer messaging, stronger visuals, and a better next step in one pass.",
  proof: "built to turn attention into action",
  accentLabel: "brand signal",
  gradient: "from-cyan-300 via-sky-400 to-blue-700",
  glowClass: "bg-cyan-400/28",
  chipClass: "border-cyan-200/70 bg-cyan-100/85 text-cyan-900",
  surfaceBackground: `linear-gradient(155deg,rgba(4,12,27,0.14),rgba(2,6,23,0.78)), url(${HOME_PHOTOS.laptopWorkflow})`,
};

export const SERVICE_VISUALS: Record<string, ServiceVisual> = {
  "show up in search": {
    eyebrow: "discoverable demand",
    caption: "show up for the searches that matter and send people to pages with a clear next step.",
    proof: "search pages built to bring inquiries, not empty traffic",
    accentLabel: "search signal",
    gradient: "from-cyan-300 via-sky-400 to-blue-700",
    glowClass: "bg-cyan-400/30",
    chipClass: "border-cyan-200/70 bg-cyan-100/85 text-cyan-900",
    surfaceBackground: `linear-gradient(155deg,rgba(6,18,40,0.18),rgba(2,6,23,0.76)), url(${HOME_PHOTOS.lagosBusinesswomen})`,
  },
  "build trust with content": {
    eyebrow: "editorial engine",
    caption: "content that explains the offer better, looks sharper, and gives people a reason to keep paying attention.",
    proof: "clearer brand stories and stronger buying confidence",
    accentLabel: "content signal",
    gradient: "from-emerald-300 via-teal-300 to-cyan-700",
    glowClass: "bg-emerald-400/30",
    chipClass: "border-emerald-200/70 bg-emerald-100/85 text-emerald-900",
    surfaceBackground: `linear-gradient(155deg,rgba(7,22,30,0.18),rgba(2,6,23,0.72)), url(${HOME_PHOTOS.lagosCollabStanding})`,
  },
  "run creator campaigns": {
    eyebrow: "culture-led reach",
    caption: "creator campaigns built around the right fit, the right hook, and a real action at the end.",
    proof: "creator fit, rollout timing, and a cleaner response path",
    accentLabel: "creator signal",
    gradient: "from-indigo-300 via-violet-300 to-fuchsia-700",
    glowClass: "bg-violet-400/28",
    chipClass: "border-violet-200/70 bg-violet-100/85 text-violet-900",
    surfaceBackground: `linear-gradient(155deg,rgba(18,22,44,0.16),rgba(2,6,23,0.74)), url(${HOME_PHOTOS.lagosTeamMeeting})`,
  },
  "launch a website that converts": {
    eyebrow: "conversion surface",
    caption: "founder pages that explain the offer fast and move people toward whatsapp, forms, or checkout.",
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

