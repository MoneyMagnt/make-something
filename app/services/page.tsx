"use client";

import {
  Button,
  Card,
  CardBody,
  Link,
} from "@heroui/react";
import { motion } from "framer-motion";
import { ZyraSiteNav } from "@/components/ZyraSiteNav";
import { ZyraBrandMark } from "@/components/ZyraBrandMark";
import { ZyraSiteFooter } from "@/components/ZyraSiteFooter";
import { LOCATION_SERVICE_PAGES } from "@/lib/locationServicePages";
import { SITE_URL } from "@/lib/site";

const WHATSAPP_BASE_URL = "https://wa.me/233556877954";
const GROWTH_AUDIT_URL = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(
  "hi zyra, i want to book a growth audit."
)}`;

const SERVICES = [
  {
    title: "seo growth system",
    summary: "capture high-intent demand and convert it into pipeline.",
    outcomes: ["technical cleanup", "intent mapping", "high-conversion pages"],
    tone: "from-cyan-500 to-blue-500",
    href: "/services/seo",
  },
  {
    title: "content studio",
    summary: "build trust-led content that shortens buying decisions.",
    outcomes: ["campaign concepts", "asset production", "performance loop"],
    tone: "from-emerald-500 to-teal-500",
    href: "/services/content",
  },
  {
    title: "influencer strategy",
    summary: "run creator campaigns tied to action, not vanity reach.",
    outcomes: ["creator fit checks", "offer design", "launch operations"],
    tone: "from-indigo-500 to-violet-500",
    href: "/services/influencer",
  },
  {
    title: "founder website sprint",
    summary: "launch a conversion-ready website that supports scaling.",
    outcomes: ["offer positioning", "conversion page flow", "tracking + handoff"],
    tone: "from-amber-500 to-orange-500",
    href: "/services/founder-websites",
  },
];

const PERFORMANCE_LAYER = [
  "ai-assisted content creation with human quality control",
  "sms activation for direct response",
  "data cleaning + segmentation for better targeting",
  "weekly analytics with next-step decisions",
];

const RESULTS_FOCUS = [
  {
    title: "faster launch cycles",
    detail: "strategy and execution live in one operating system, so campaigns ship faster.",
  },
  {
    title: "cleaner targeting",
    detail: "data cleanup and segmentation reduce wasted spend and improve response quality.",
  },
  {
    title: "clearer decision-making",
    detail: "weekly analysis shows what to scale, cut, or rework before momentum drops.",
  },
  {
    title: "stronger founder positioning",
    detail: "website messaging and page flow make the offer easier to trust and buy.",
  },
];

const SERVICES_PROOF = [
  { label: "contacts in database", value: "7300+" },
  { label: "avg kickoff window", value: "7 days" },
  { label: "reporting rhythm", value: "weekly" },
];

const servicesJsonLd = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "zyra services",
    url: `${SITE_URL}/services`,
    description:
      "explore zyra growth services: seo, ai-assisted content, influencer campaigns, and founder website sprints.",
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "growth services",
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: `${SITE_URL}${service.href}`,
    })),
  },
]);

const reveal = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: servicesJsonLd }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_650px_at_12%_-12%,rgba(14,165,233,0.22),transparent),radial-gradient(980px_560px_at_92%_8%,rgba(59,130,246,0.16),transparent)] dark:bg-[radial-gradient(1240px_740px_at_8%_-14%,rgba(6,182,212,0.24),transparent_58%),radial-gradient(1120px_680px_at_92%_10%,rgba(59,130,246,0.27),transparent_60%),radial-gradient(940px_560px_at_50%_115%,rgba(8,145,178,0.22),transparent_64%),linear-gradient(180deg,rgba(2,6,23,0.96)_0%,rgba(3,15,34,0.9)_45%,rgba(8,20,45,0.95)_100%)]" />

      <ZyraSiteNav
        active="services"
        brand={<ZyraBrandMark />}
      />

      <main className="relative mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-6">
        <motion.section {...reveal} className="mb-10">
          <h1 className="font-[family-name:var(--font-bricolage)] text-4xl font-extrabold tracking-tight text-slate-950 sm:text-6xl dark:text-slate-100">
            pick your revenue lane
          </h1>
          <p className="mt-3 max-w-3xl text-base text-slate-700 sm:text-lg dark:text-slate-300">
            start with one lane, then plug into our ai content, activation, and analytics system to scale what works.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              as={Link}
              href={GROWTH_AUDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 px-6 font-semibold text-white dark:bg-slate-100 dark:text-slate-900"
            >
              book growth audit
            </Button>
            <Button
              as={Link}
              href="#service-lanes"
              variant="bordered"
              className="border-slate-300 bg-white/70 px-6 font-semibold text-slate-900 dark:border-slate-600 dark:bg-slate-900/60 dark:text-slate-100"
            >
              view lanes
            </Button>
          </div>
          <div className="mt-4 grid max-w-3xl gap-2 sm:grid-cols-3">
            {SERVICES_PROOF.map((item) => (
              <div key={item.label} className="rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2 dark:border-slate-700/70 dark:bg-slate-950/70">
                <p className="font-[family-name:var(--font-space-grotesk)] text-base font-bold text-slate-900 dark:text-slate-100">{item.value}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section id="service-lanes" {...reveal} transition={{ ...reveal.transition, delay: 0.06 }} className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {SERVICES.map((service) => (
            <Card
              key={service.title}
              className="border border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75"
            >
              <CardBody className="gap-4">
                <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${service.tone}`} />
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                  {service.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">{service.summary}</p>
                <div className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
                  {service.outcomes.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-900 dark:bg-slate-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={service.href}
                  className="text-sm font-semibold uppercase tracking-[0.12em] text-cyan-700 hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
                >
                  view details
                </Link>
              </CardBody>
            </Card>
          ))}
        </motion.section>

        <motion.section {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="mt-10">
          <Card className="mb-5 border border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75">
            <CardBody className="gap-4">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                the performance layer
              </h2>
              <div className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
                {PERFORMANCE_LAYER.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
          <Card className="border border-cyan-200/80 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white shadow-[0_16px_42px_rgba(14,165,233,0.32)] dark:border-cyan-200/25 dark:bg-[linear-gradient(118deg,rgba(8,47,73,0.98)_0%,rgba(30,64,175,0.96)_56%,rgba(12,74,110,0.98)_100%)] dark:shadow-[0_22px_62px_rgba(8,145,178,0.34)]">
            <CardBody className="gap-2">
              <div>
                <p className="text-sm text-cyan-100 dark:text-cyan-50">not sure which one fits first?</p>
                <p className="text-lg font-semibold">we’ll map your best first lane and execution plan.</p>
              </div>
              <p className="text-sm text-cyan-50/95 sm:hidden">tap the whatsapp icon to chat</p>
              <p className="hidden text-sm text-cyan-50/95 sm:block">click chat on whatsapp to book your growth audit</p>
            </CardBody>
          </Card>
        </motion.section>

        <motion.section {...reveal} transition={{ ...reveal.transition, delay: 0.16 }} className="mt-10">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-slate-900 dark:text-slate-100">
              what clients feel first
            </h2>
          </div>
          <div className="mb-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {RESULTS_FOCUS.map((item) => (
              <Card key={item.title} className="border border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75">
                <CardBody className="gap-2">
                  <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.detail}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.section>

        <motion.section {...reveal} transition={{ ...reveal.transition, delay: 0.2 }} className="mt-10">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-slate-900 dark:text-slate-100">
              popular searches
            </h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {LOCATION_SERVICE_PAGES.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="rounded-2xl border border-slate-200/70 bg-white/85 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700/80 dark:bg-slate-900/75 dark:text-slate-200 dark:hover:border-cyan-500/50 dark:hover:text-cyan-300"
              >
                {item.pageTitle}
              </Link>
            ))}
          </div>
        </motion.section>
      </main>
      <ZyraSiteFooter />
    </div>
  );
}


