"use client";

import {
  Card,
  CardBody,
  Chip,
  Link,
} from "@heroui/react";
import { motion } from "framer-motion";
import { ZyraSiteNav } from "@/components/ZyraSiteNav";
import { ZyraBrandMark } from "@/components/ZyraBrandMark";
import { ZyraSiteFooter } from "@/components/ZyraSiteFooter";
import { SITE_NAME, SITE_URL } from "@/lib/site";

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

const reveal = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: homeJsonLd }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_650px_at_12%_-12%,rgba(14,165,233,0.23),transparent),radial-gradient(980px_560px_at_92%_8%,rgba(59,130,246,0.17),transparent)] dark:bg-[radial-gradient(1240px_740px_at_8%_-14%,rgba(6,182,212,0.27),transparent_58%),radial-gradient(1120px_680px_at_92%_10%,rgba(59,130,246,0.3),transparent_60%),radial-gradient(940px_560px_at_50%_115%,rgba(14,116,144,0.26),transparent_64%),linear-gradient(180deg,rgba(2,6,23,0.96)_0%,rgba(3,15,34,0.9)_45%,rgba(8,20,45,0.95)_100%)]" />

      <ZyraSiteNav
        active="home"
        brand={<ZyraBrandMark />}
      />

      <main className="relative mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-6">
        <motion.section {...reveal} className="grid items-start gap-8 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="space-y-6">
            <Chip className="border border-cyan-200 bg-cyan-100/80 text-cyan-900 dark:border-cyan-700/60 dark:bg-cyan-900/35 dark:text-cyan-200">
              growth systems for ambitious brands
            </Chip>

            <h1 className="font-[family-name:var(--font-bricolage)] text-4xl font-extrabold leading-[0.95] tracking-tight text-slate-950 sm:text-6xl dark:text-slate-100">
              we turn attention into pipeline and sales.
            </h1>

            <p className="max-w-2xl text-base text-slate-700 sm:text-lg dark:text-slate-300">
              zyra combines seo, ai-assisted content creation, influencer campaigns, founder website sprints, sms activation, and weekly analytics so growth is faster, cleaner, and measurable.
            </p>

          </div>

          <Card className="border border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75">
            <CardBody className="gap-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-slate-900 dark:text-slate-100">
                  why teams pick zyra
                </h2>
                <Chip className="bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-100">proof-first</Chip>
              </div>

              <div className="grid gap-3 text-sm text-slate-700 dark:text-slate-300">
                <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 dark:border-slate-700/70 dark:bg-slate-950/70">
                  clear revenue goals every sprint.
                </div>
                <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 dark:border-slate-700/70 dark:bg-slate-950/70">
                  one team for strategy, execution, and reporting.
                </div>
                <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 dark:border-slate-700/70 dark:bg-slate-950/70">
                  ai-assisted content with human quality control.
                </div>
                <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 dark:border-slate-700/70 dark:bg-slate-950/70">
                  founder website sprints plus sms and analytics for scale.
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <motion.section id="proof" {...reveal} transition={{ ...reveal.transition, delay: 0.08 }} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {STATS.map((item) => (
            <Card key={item.label} className="border border-slate-200/70 bg-white/80 dark:border-slate-700/80 dark:bg-slate-900/70">
              <CardBody className="gap-1">
                <p className="font-[family-name:var(--font-space-grotesk)] text-2xl font-extrabold text-slate-900 dark:text-slate-100">{item.value}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.label}</p>
              </CardBody>
            </Card>
          ))}
        </motion.section>

        <motion.section {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="mt-10">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-slate-900 dark:text-slate-100">
              how we create revenue
            </h2>
            <Chip className="bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-100">acquire → activate → optimize</Chip>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {SYSTEM_STEPS.map((item) => (
              <Card key={item.title} className="border border-slate-200/70 bg-white/80 dark:border-slate-700/80 dark:bg-slate-900/70">
                <CardBody className="gap-2">
                  <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.body}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.section>

        <motion.section {...reveal} transition={{ ...reveal.transition, delay: 0.15 }} className="mt-14">
          <div id="results" className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-slate-900 dark:text-slate-100">
              results snapshots
            </h2>
            <Chip className="bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-100">problem → action → outcome</Chip>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {RESULT_SNAPSHOTS.map((item) => (
              <Card key={item.title} className="border border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75">
                <CardBody className="gap-2">
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">challenge:</span> {item.challenge}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">action:</span> {item.action}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">outcome:</span> {item.outcome}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.section>

        <motion.section {...reveal} transition={{ ...reveal.transition, delay: 0.18 }} className="mt-14">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-slate-900 dark:text-slate-100">
              what we execute
            </h2>
            <Chip className="bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-100">4 focused lanes</Chip>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {SERVICES.map((item) => (
              <Card key={item.title} className="border border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75">
                <CardBody className="gap-4">
                  <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${item.tone}`} />
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.body}</p>
                  <div className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
                    {item.points.map((point) => (
                      <div key={point} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-900 dark:bg-slate-300" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={item.href}
                    className="text-sm font-semibold uppercase tracking-[0.12em] text-cyan-700 hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
                  >
                    view service
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.section>

        <motion.section id="how-we-work" {...reveal} transition={{ ...reveal.transition, delay: 0.24 }} className="mt-14 grid gap-6 lg:grid-cols-[1.06fr_0.94fr]">
          <Card className="border border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75">
            <CardBody className="gap-4">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                how we run growth
              </h2>

              <div className="grid gap-3">
                {[
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
                    body: "we keep what works, cut what doesn’t, and compound weekly.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-3.5 dark:border-slate-700/70 dark:bg-slate-950/70">
                    <span className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-cyan-600 dark:text-cyan-300">
                      {item.step}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card id="faq" className="border border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75">
            <CardBody className="gap-4">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                quick faq
              </h2>
              <div className="grid gap-3">
                {FAQS.map((item) => (
                  <div key={item.q} className="rounded-2xl border border-slate-200/70 bg-white/80 p-3.5 dark:border-slate-700/70 dark:bg-slate-950/70">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.q}</p>
                    <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">{item.a}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <motion.section {...reveal} transition={{ ...reveal.transition, delay: 0.32 }} className="mt-14">
          <Card className="border border-cyan-200/80 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white shadow-[0_18px_48px_rgba(14,165,233,0.33)] dark:border-cyan-200/25 dark:bg-[linear-gradient(118deg,rgba(8,47,73,0.98)_0%,rgba(30,64,175,0.96)_56%,rgba(12,74,110,0.98)_100%)] dark:shadow-[0_22px_62px_rgba(8,145,178,0.34)]">
            <CardBody className="gap-2">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-cyan-100 dark:text-cyan-50">next step</p>
                <p className="mt-1 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">
                  book your growth audit and get a 90-day execution map.
                </p>
              </div>
              <p className="text-sm text-cyan-50/95 sm:hidden">tap the whatsapp icon to chat</p>
              <p className="hidden text-sm text-cyan-50/95 sm:block">click chat on whatsapp to book your growth audit</p>
            </CardBody>
          </Card>
        </motion.section>
      </main>
      <ZyraSiteFooter />
    </div>
  );
}



