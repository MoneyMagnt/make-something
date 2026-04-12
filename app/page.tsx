import type { Metadata } from "next";
import ZyraHomeDesktop from "@/components/ZyraHomeDesktop";
import ZyraHomeMobile from "@/components/ZyraHomeMobile";
import { ZyraBrandMark } from "@/components/ZyraBrandMark";
import { ZyraSiteFooter } from "@/components/ZyraSiteFooter";
import { ZyraSiteNav } from "@/components/ZyraSiteNav";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "marketing and website support for growing brands in ghana",
  description:
    "zyra helps growing brands in ghana get noticed, look credible online, and turn attention into inquiries, ticket sales, and customers.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "marketing and website support for growing brands in ghana",
    description:
      "zyra helps growing brands in ghana get noticed, look credible online, and turn attention into inquiries, ticket sales, and customers.",
    images: [`${SITE_URL}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "marketing and website support for growing brands in ghana",
    description:
      "zyra helps growing brands in ghana get noticed, look credible online, and turn attention into inquiries, ticket sales, and customers.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

const WHATSAPP_BASE_URL = "https://wa.me/233556877954";
const GROWTH_AUDIT_URL = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(
  "hi zyra, i want to talk through the best next move for my brand."
)}`;

const SERVICES = [
  {
    title: "show up in search",
    body: "help people find your brand when they search for the problem you solve.",
    points: ["technical cleanup", "search intent mapping", "pages built to convert"],
    tone: "from-cyan-500 to-blue-500",
    href: "/services/seo",
  },
  {
    title: "build trust with content",
    body: "make your brand easier to trust with sharper content and clearer storytelling.",
    points: ["content angles", "brand-led assets", "performance feedback loop"],
    tone: "from-emerald-500 to-teal-500",
    href: "/services/content",
  },
  {
    title: "run creator campaigns",
    body: "run creator campaigns with a clear hook, the right fit, and a real next step.",
    points: ["creator matching", "offer framing", "rollout support"],
    tone: "from-indigo-500 to-violet-500",
    href: "/services/influencer",
  },
  {
    title: "launch a website that converts",
    body: "build a website that explains the offer fast and moves people to act.",
    points: ["offer positioning", "conversion structure", "tracking setup"],
    tone: "from-amber-500 to-orange-500",
    href: "/services/founder-websites",
  },
];

const FAQS = [
  {
    q: "who is zyra best for?",
    a: "growing brands, founders, and event teams that need more visibility, clearer trust, and a stronger next step online.",
  },
  {
    q: "how soon can we start?",
    a: "most projects start within 7 days after a discovery call and clear scope.",
  },
  {
    q: "do we have to start with everything?",
    a: "no. we usually start with the one area slowing growth down most, then build from there.",
  },
];

const STATS = [
  { label: "events produced", value: "25+" },
  { label: "audiences reached", value: "7000+" },
  { label: "contacts in active reach list", value: "7300+" },
  { label: "website sprint launch window", value: "7 days" },
  { label: "reporting cadence", value: "weekly" },
];

const ABOVE_FOLD_PROOF = [
  { label: "venus free passes", value: "sold out <24 hrs" },
  { label: "people in reach list", value: "7300+" },
  { label: "founder site launch avg", value: "7 days" },
];

const WHY_ZYRA = [
  "your offer should make sense in one screen.",
  "people should know the next step without hunting for it.",
  "strategy, copy, visuals, and rollout stay in one team.",
  "we start with the clearest bottleneck, not a bloated retainer.",
];

const SYSTEM_STEPS = [
  {
    title: "clarify",
    body: "we find the real bottleneck first: visibility, trust, response, or conversion.",
  },
  {
    title: "build",
    body: "we tighten the message, assets, and pages around one clear next step.",
  },
  {
    title: "move",
    body: "we launch, watch the response, and improve what people actually react to.",
  },
];

const RESULT_SNAPSHOTS = [
  {
    title: "free passes sold out in under 24 hours",
    challenge: "venus needed fast attention once the host shared the link.",
    action: "we paired the landing page with the host push and made the next step obvious.",
    outcome: "free passes sold out in under 24 hours and the page kept moving people toward the event.",
  },
  {
    title: "an offer people could understand faster",
    challenge: "the message was spending too much time on the method and not enough on the result.",
    action: "we simplified the promise, tightened the structure, and made the next move easier to see.",
    outcome: "visitors could understand the offer faster and act without reading every section.",
  },
  {
    title: "creator campaigns with a clearer call to action",
    challenge: "attention was there, but the response path was weak.",
    action: "we matched creators to the right hook and tied every drop to a clearer action.",
    outcome: "the campaign felt easier to follow and stronger responses became easier to repeat.",
  },
];

const OPERATING_NOTES = [
  {
    step: "01",
    title: "start small",
    body: "we would rather fix the clearest leak first than sell you everything at once.",
  },
  {
    step: "02",
    title: "build",
    body: "we ship the clearest message, assets, and conversion path quickly.",
  },
  {
    step: "03",
    title: "scale",
    body: "we keep what works, cut what does not, and grow from real response.",
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
      "zyra helps growing brands in ghana get noticed, look credible online, and turn attention into inquiries, ticket sales, and customers.",
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
        <h1 className="sr-only">
          need more people to notice your brand and take action?
        </h1>
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



