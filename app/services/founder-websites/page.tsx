"use client";

import {
  Card,
  CardBody,
} from "@heroui/react";
import { motion } from "framer-motion";
import { ZyraSiteNav } from "@/components/ZyraSiteNav";
import { ZyraBrandMark } from "@/components/ZyraBrandMark";
import { ZyraSiteFooter } from "@/components/ZyraSiteFooter";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const DELIVERABLES = [
  "offer messaging and founder positioning framework",
  "conversion-focused website structure and copy",
  "cta, lead flow, and whatsapp handoff setup",
  "analytics baseline for weekly optimization",
];

const CHECKPOINTS = [
  {
    title: "clarity sprint",
    body: "we define your core offer, audience, and value proof in plain language.",
  },
  {
    title: "website build sprint",
    body: "we structure pages for trust, speed, and conversion action.",
  },
  {
    title: "launch + optimize",
    body: "we track behavior, tighten weak sections, and improve conversion rate.",
  },
];

const SUCCESS_METRICS = [
  "qualified inquiries from website visitors",
  "conversion rate on founder offer pages",
  "time-to-launch from brief to live site",
];

const reveal = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

const founderWebsiteJsonLd = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "founder website sprint",
    serviceType: "Website Strategy",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: "Global",
    url: `${SITE_URL}/services/founder-websites`,
    description:
      "website strategy and launch support for founders who want a conversion-ready web presence.",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "services",
        item: `${SITE_URL}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "founder website sprint",
        item: `${SITE_URL}/services/founder-websites`,
      },
    ],
  },
]);

export default function FounderWebsitesServicePage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: founderWebsiteJsonLd }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_620px_at_10%_-12%,rgba(245,158,11,0.2),transparent),radial-gradient(900px_520px_at_92%_10%,rgba(249,115,22,0.16),transparent)] dark:bg-[radial-gradient(1140px_700px_at_8%_-12%,rgba(251,191,36,0.25),transparent_60%),radial-gradient(980px_560px_at_92%_8%,rgba(249,115,22,0.28),transparent_62%),linear-gradient(180deg,rgba(2,6,23,0.96)_0%,rgba(38,20,2,0.9)_45%,rgba(52,30,9,0.95)_100%)]" />

      <ZyraSiteNav
        active="services"
        brand={<ZyraBrandMark />}
      />

      <main className="relative mx-auto max-w-5xl px-5 pb-24 pt-10 sm:px-6">
        <motion.section {...reveal} className="mb-10">
          <h1 className="font-[family-name:var(--font-bricolage)] text-4xl font-extrabold tracking-tight text-slate-950 sm:text-6xl dark:text-slate-100">
            founder website sprint
          </h1>
          <p className="mt-3 max-w-3xl text-base text-slate-700 sm:text-lg dark:text-slate-300">
            for founders who want to scale, we build a website that explains value fast and converts attention into real demand.
          </p>
        </motion.section>

        <motion.section {...reveal} transition={{ ...reveal.transition, delay: 0.06 }} className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75">
            <CardBody className="gap-4">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                what you get
              </h2>
              <div className="grid gap-3 text-sm text-slate-700 dark:text-slate-300">
                {DELIVERABLES.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="border border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75">
            <CardBody className="gap-3">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                sprint checkpoints
              </h2>
              {CHECKPOINTS.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-3 dark:border-slate-700/70 dark:bg-slate-950/70">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.body}</p>
                </div>
              ))}
            </CardBody>
          </Card>
        </motion.section>

        <motion.section {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="mt-6">
          <Card className="border border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75">
            <CardBody className="gap-3">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                success metrics we track
              </h2>
              <div className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
                {SUCCESS_METRICS.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <motion.section {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="mt-9">
          <Card className="border border-amber-200/80 bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 text-white shadow-[0_16px_42px_rgba(245,158,11,0.32)] dark:border-amber-200/25 dark:bg-[linear-gradient(118deg,rgba(67,20,7,0.98)_0%,rgba(154,52,18,0.96)_56%,rgba(194,65,12,0.98)_100%)] dark:shadow-[0_22px_62px_rgba(249,115,22,0.34)]">
            <CardBody className="gap-2">
              <p className="text-base sm:text-lg">need a website that can support real growth decisions?</p>
              <p className="text-sm text-amber-50/95 sm:hidden">tap the whatsapp icon to chat</p>
              <p className="hidden text-sm text-amber-50/95 sm:block">click chat on whatsapp to book your growth audit</p>
            </CardBody>
          </Card>
        </motion.section>
      </main>
      <ZyraSiteFooter />
    </div>
  );
}
