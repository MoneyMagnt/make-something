"use client";

import {
  Card,
  CardBody,
} from "@heroui/react";

import { ZyraSiteNav } from "@/components/ZyraSiteNav";
import { ZyraBrandMark } from "@/components/ZyraBrandMark";
import { ZyraSiteFooter } from "@/components/ZyraSiteFooter";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const DELIVERABLES = [
  "full seo and technical audit",
  "keyword intent map for high-value pages",
  "on-page optimization and content briefs",
  "conversion-first landing page structure",
];

const CHECKPOINTS = [
  { label: "week 1", detail: "audit + opportunity map" },
  { label: "weeks 2-4", detail: "implementation and page upgrades" },
  { label: "weeks 5-8", detail: "measure, iterate, and scale" },
];

const SUCCESS_METRICS = [
  "qualified leads from organic search",
  "conversion rate on priority landing pages",
  "cost per qualified lead vs paid channels",
];

const seoServiceJsonLd = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "seo growth system",
    serviceType: "SEO",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: "Global",
    url: `${SITE_URL}/services/seo`,
    description:
      "technical seo, intent mapping, and conversion-focused pages to turn search traffic into qualified pipeline.",
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
        name: "seo growth system",
        item: `${SITE_URL}/services/seo`,
      },
    ],
  },
]);

export default function SeoServicePage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: seoServiceJsonLd }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_620px_at_10%_-12%,rgba(14,165,233,0.2),transparent),radial-gradient(900px_520px_at_92%_10%,rgba(59,130,246,0.15),transparent)] dark:bg-[radial-gradient(1140px_700px_at_8%_-12%,rgba(6,182,212,0.25),transparent_60%),radial-gradient(980px_560px_at_92%_8%,rgba(37,99,235,0.28),transparent_62%),linear-gradient(180deg,rgba(2,6,23,0.96)_0%,rgba(4,18,39,0.9)_45%,rgba(9,24,52,0.95)_100%)]" />

      <ZyraSiteNav
        active="services"
        brand={<ZyraBrandMark />}
      />

      <main className="relative mx-auto max-w-5xl px-5 pb-24 pt-10 sm:px-6">
        <section className="mb-10">
          <h1 className="font-[family-name:var(--font-bricolage)] text-4xl font-extrabold tracking-tight text-slate-950 sm:text-6xl dark:text-slate-100">
            seo growth system
          </h1>
          <p className="mt-3 max-w-3xl text-base text-slate-700 sm:text-lg dark:text-slate-300">
            we turn search intent into qualified pipeline with technical fixes, content strategy, and conversion-ready pages.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75">
            <CardBody className="gap-4">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                what you get
              </h2>
              <div className="grid gap-3 text-sm text-slate-700 dark:text-slate-300">
                {DELIVERABLES.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="border border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75">
            <CardBody className="gap-3">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                timeline
              </h2>
              {CHECKPOINTS.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200/70 bg-white/80 p-3 dark:border-slate-700/70 dark:bg-slate-950/70">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{item.label}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.detail}</p>
                </div>
              ))}
            </CardBody>
          </Card>
        </section>

        <section className="mt-6">
          <Card className="border border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75">
            <CardBody className="gap-3">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                success metrics we track
              </h2>
              <div className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
                {SUCCESS_METRICS.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </section>

        <section className="mt-9">
          <Card className="border border-cyan-200/80 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white shadow-[0_16px_42px_rgba(14,165,233,0.32)] dark:border-cyan-200/25 dark:bg-[linear-gradient(118deg,rgba(8,47,73,0.98)_0%,rgba(30,64,175,0.96)_56%,rgba(12,74,110,0.98)_100%)] dark:shadow-[0_22px_62px_rgba(8,145,178,0.34)]">
            <CardBody className="gap-2">
              <p className="text-base sm:text-lg">ready to make search your strongest revenue channel?</p>
              <p className="text-sm text-cyan-50/95 sm:hidden">tap the whatsapp icon to chat</p>
              <p className="hidden text-sm text-cyan-50/95 sm:block">click chat on whatsapp to book your growth audit</p>
            </CardBody>
          </Card>
        </section>
      </main>
      <ZyraSiteFooter />
    </div>
  );
}



