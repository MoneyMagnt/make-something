import type { Metadata } from "next";
import ZyraHomeDesktop from "@/components/ZyraHomeDesktop";
import ZyraHomeMobile from "@/components/ZyraHomeMobile";
import { ZyraBrandMark } from "@/components/ZyraBrandMark";
import { ZyraSiteFooter } from "@/components/ZyraSiteFooter";
import { ZyraSiteNav } from "@/components/ZyraSiteNav";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "seo, content, influencer, and founder websites in ghana",
  description:
    "zyra builds seo, content, influencer, and founder website systems in ghana for brands that need visible momentum.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "seo, content, influencer, and founder websites in ghana",
    description:
      "zyra builds seo, content, influencer, and founder website systems in ghana for brands that need visible momentum.",
    images: [`${SITE_URL}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "seo, content, influencer, and founder websites in ghana",
    description:
      "zyra builds seo, content, influencer, and founder website systems in ghana for brands that need visible momentum.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

const WHATSAPP_BASE_URL = "https://wa.me/233556877954";
const GROWTH_AUDIT_URL = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(
  "hi zyra, i want to book a growth audit."
)}`;

const SERVICES = [
  {
    title: "seo growth system",
    body: "capture high-intent demand and convert it into pipeline.",
    points: ["technical cleanup", "keyword intent mapping", "conversion pages"],
    tone: "from-cyan-500 to-blue-500",
    href: "/services/seo",
  },
  {
    title: "content studio",
    body: "build trust-led content that shortens buying decisions.",
    points: ["campaign hooks", "short + long-form assets", "performance loop"],
    tone: "from-emerald-500 to-teal-500",
    href: "/services/content",
  },
  {
    title: "influencer strategy",
    body: "run creator campaigns tied to action, not vanity reach.",
    points: ["creator matching", "offer narrative", "launch operations"],
    tone: "from-indigo-500 to-violet-500",
    href: "/services/influencer",
  },
  {
    title: "founder website sprint",
    body: "launch a conversion-ready website for founders scaling offers.",
    points: ["offer positioning", "conversion page structure", "analytics setup"],
    tone: "from-amber-500 to-orange-500",
    href: "/services/founder-websites",
  },
];

const FAQS = [
  {
    q: "do you only work with event brands?",
    a: "no. events were our first proving ground, but we also work with founders and growth-focused teams.",
  },
  {
    q: "how soon can we start?",
    a: "most projects start within 7 days after a discovery call and clear scope.",
  },
  {
    q: "can we begin with one service only?",
    a: "yes. we can start with one channel and expand after we validate wins.",
  },
];

const STATS = [
  { label: "events produced", value: "25+" },
  { label: "attendees reached", value: "7000+" },
  { label: "contacts in database (growing)", value: "7300+" },
  { label: "avg kickoff window", value: "7 days" },
  { label: "reporting rhythm", value: "weekly" },
];

const ABOVE_FOLD_PROOF = [
  { label: "contacts in database", value: "7300+" },
  { label: "avg kickoff window", value: "7 days" },
  { label: "reporting rhythm", value: "weekly" },
];

const WHY_ZYRA = [
  "clear revenue goals every sprint.",
  "one team for strategy, execution, and reporting.",
  "ai-assisted content with human quality control.",
  "founder website sprints plus sms and analytics for scale.",
];

const SYSTEM_STEPS = [
  {
    title: "acquire",
    body: "seo, ai-assisted content, and influencer campaigns bring in high-intent attention.",
  },
  {
    title: "activate",
    body: "sms campaigns convert interest into direct response and buyer action.",
  },
  {
    title: "optimize",
    body: "data cleaning and weekly analytics reduce waste and improve results.",
  },
];

const RESULT_SNAPSHOTS = [
  {
    title: "event demand sprint",
    challenge: "ticket demand was flat before launch week.",
    action: "we aligned creator rollout, landing page updates, and sms reminder cadence.",
    outcome: "campaign momentum recovered and conversions stabilized week over week.",
  },
  {
    title: "service funnel rebuild",
    challenge: "traffic existed but qualified leads were inconsistent.",
    action: "we rebuilt offer pages, tightened messaging, and mapped intent-based content.",
    outcome: "lead quality improved and pipeline became easier to forecast.",
  },
  {
    title: "creator campaign optimization",
    challenge: "reach was high but direct response stayed low.",
    action: "we reworked hooks, offers, and audience segmentation for each creator cluster.",
    outcome: "response rate improved and winning formats became repeatable.",
  },
];

const OPERATING_NOTES = [
  {
    step: "01",
    title: "diagnose",
    body: "we audit channels, identify leaks, and set one clear scorecard.",
  },
  {
    step: "02",
    title: "build",
    body: "we ship the strategy, content, and conversion assets quickly.",
  },
  {
    step: "03",
    title: "scale",
    body: "we keep what works, cut what does not, and compound weekly.",
  },
];

const homeJsonLd = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg?v=20260303a`,
    description:
      "zyra builds seo, content, and influencer demand systems that turn attention into revenue.",
    sameAs: [SITE_URL],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${SITE_NAME} Growth Studio`,
    serviceType: [
      "SEO",
      "Content Marketing",
      "Influencer Marketing",
      "Website Strategy",
    ],
    areaServed: "Global",
    url: `${SITE_URL}/services`,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  },
]);

export default function Home() {

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#f6f8fb] text-slate-900 dark:bg-[#050913] dark:text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: homeJsonLd }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(980px_560px_at_10%_-12%,rgba(125,211,252,0.28),transparent_58%),radial-gradient(860px_520px_at_100%_6%,rgba(59,130,246,0.12),transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.55),rgba(246,248,251,0.96))] dark:bg-[radial-gradient(1120px_700px_at_10%_-14%,rgba(6,182,212,0.18),transparent_60%),radial-gradient(980px_620px_at_92%_10%,rgba(59,130,246,0.18),transparent_62%),linear-gradient(180deg,rgba(2,6,23,0.98)_0%,rgba(4,12,24,0.96)_48%,rgba(7,16,31,1)_100%)]" />

      <ZyraSiteNav active="home" brand={<ZyraBrandMark />} />

      <main id="main-content" className="relative mx-auto max-w-[1360px] px-5 pb-28 pt-12 sm:px-6 lg:px-8">
        <div className="lg:hidden">
          <ZyraHomeMobile
            growthAuditUrl={GROWTH_AUDIT_URL}
            stats={STATS}
            aboveFoldProof={ABOVE_FOLD_PROOF}
            whyZyra={WHY_ZYRA}
            systemSteps={SYSTEM_STEPS}
            resultSnapshots={RESULT_SNAPSHOTS}
            operatingNotes={OPERATING_NOTES}
            services={SERVICES}
            faqs={FAQS}
          />
        </div>

        <div className="hidden lg:block">
          <ZyraHomeDesktop
            growthAuditUrl={GROWTH_AUDIT_URL}
            stats={STATS}
            aboveFoldProof={ABOVE_FOLD_PROOF}
            whyZyra={WHY_ZYRA}
            systemSteps={SYSTEM_STEPS}
            resultSnapshots={RESULT_SNAPSHOTS}
            operatingNotes={OPERATING_NOTES}
            services={SERVICES}
            faqs={FAQS}
          />
        </div>
      </main>

      <ZyraSiteFooter />
    </div>
  );
}



