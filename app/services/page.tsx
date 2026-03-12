"use client";

import { Button, Card, CardBody, Chip, Link } from "@heroui/react";
import { motion } from "framer-motion";
import { startTransition, useDeferredValue, useState } from "react";
import { ZyraSiteNav } from "@/components/ZyraSiteNav";
import { ZyraBrandMark } from "@/components/ZyraBrandMark";
import { ZyraSiteFooter } from "@/components/ZyraSiteFooter";
import {
  BRAND_ART,
  BRAND_SIGNAL_STRIPS,
  getServiceVisual,
} from "@/lib/brandVisuals";
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
  const [activeServiceTitle, setActiveServiceTitle] = useState(SERVICES[0]?.title ?? "");
  const deferredServiceTitle = useDeferredValue(activeServiceTitle);
  const activeService = SERVICES.find((service) => service.title === deferredServiceTitle) ?? SERVICES[0];
  const activeVisual = getServiceVisual(activeService.title);

  const activateService = (title: string) => {
    startTransition(() => {
      setActiveServiceTitle(title);
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: servicesJsonLd }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_700px_at_12%_-12%,rgba(14,165,233,0.24),transparent),radial-gradient(980px_560px_at_92%_8%,rgba(59,130,246,0.16),transparent)] dark:bg-[radial-gradient(1240px_740px_at_8%_-14%,rgba(6,182,212,0.24),transparent_58%),radial-gradient(1120px_680px_at_92%_10%,rgba(59,130,246,0.27),transparent_60%),radial-gradient(940px_560px_at_50%_115%,rgba(8,145,178,0.22),transparent_64%),linear-gradient(180deg,rgba(2,6,23,0.96)_0%,rgba(3,15,34,0.9)_45%,rgba(8,20,45,0.95)_100%)]" />

      <ZyraSiteNav active="services" brand={<ZyraBrandMark />} />

      <main className="relative mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-6">
        <motion.section {...reveal} className="grid gap-8 xl:grid-cols-[0.86fr_1.14fr]">
          <div className="space-y-6">
            <Chip className="border border-cyan-200 bg-cyan-100/85 text-cyan-900 dark:border-cyan-700/60 dark:bg-cyan-900/35 dark:text-cyan-200">
              editorial growth lanes
            </Chip>
            <div className="space-y-4">
              <h1 className="font-[family-name:var(--font-bricolage)] text-4xl font-extrabold leading-[0.94] tracking-tight text-slate-950 sm:text-6xl dark:text-slate-100">
                pick the lane, shape the signal, ship the next step.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-700 sm:text-lg dark:text-slate-300">
                each service lane keeps the same zyra energy: cleaner visuals, tighter messaging, and a more obvious route into the offer.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                as={Link}
                href={GROWTH_AUDIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-950 px-6 font-semibold text-white dark:bg-slate-100 dark:text-slate-950"
              >
                book growth audit
              </Button>
              <Button
                as={Link}
                href="#service-lanes"
                variant="bordered"
                className="border-slate-300 bg-white/80 px-6 font-semibold text-slate-900 dark:border-slate-600 dark:bg-slate-900/60 dark:text-slate-100"
              >
                browse lanes
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {SERVICES_PROOF.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/45 bg-white/80 px-4 py-3 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/68"
                >
                  <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-slate-950 dark:text-slate-100">{item.value}</p>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-3">
              {BRAND_SIGNAL_STRIPS.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-2xl border border-white/45 bg-white/80 p-4 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/68"
                >
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-500" />
                  <div>
                    <p className="font-semibold text-slate-950 dark:text-slate-100">{item.title}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="overflow-hidden border border-white/45 bg-white/82 shadow-[0_28px_82px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
            <CardBody className="relative min-h-[560px] gap-6 overflow-hidden p-6">
              <div className="absolute inset-0 opacity-95">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${BRAND_ART.gradientHub})` }}
                />
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-28 mix-blend-screen"
                  style={{ backgroundImage: `url(${BRAND_ART.gradientMesh})` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(2,6,23,0.52))]" />
              </div>

              <div className="relative z-10 flex items-start justify-between gap-3 text-white">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">selected lane</p>
                  <p className="mt-2 font-[family-name:var(--font-instrument-serif)] text-4xl leading-none">
                    {activeVisual.eyebrow}
                  </p>
                </div>
                <Chip className="border border-white/20 bg-white/10 text-white">{activeVisual.accentLabel}</Chip>
              </div>

              <div className="relative z-10 mt-auto grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
                <Card className="border border-white/45 bg-white/82 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/78">
                  <CardBody className="gap-4 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">focus lane</p>
                      <div className={`h-2.5 w-24 rounded-full bg-gradient-to-r ${activeService.tone}`} />
                    </div>
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-slate-950 dark:text-slate-100">
                      {activeService.title}
                    </h2>
                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{activeVisual.caption}</p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {activeService.outcomes.map((item) => (
                        <div key={item} className="rounded-2xl border border-slate-200/75 bg-white/82 px-3 py-3 text-sm text-slate-700 dark:border-slate-700/70 dark:bg-slate-900/82 dark:text-slate-200">
                          {item}
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>

                <Card className="border border-white/45 bg-slate-950/78 text-white backdrop-blur-xl dark:border-slate-700/70">
                  <CardBody className="gap-4 p-5">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/60">what it changes</p>
                    {RESULTS_FOCUS.slice(0, 2).map((item) => (
                      <div key={item.title} className="rounded-2xl border border-white/12 bg-white/6 px-4 py-3">
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-sm text-white/74">{item.detail}</p>
                      </div>
                    ))}
                  </CardBody>
                </Card>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <motion.section
          id="service-lanes"
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.08 }}
          className="mt-14 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]"
        >
          <Card className="overflow-hidden border border-white/45 bg-white/82 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
            <CardBody className="relative gap-5 overflow-hidden p-6">
              <div className="absolute inset-0 opacity-85">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${BRAND_ART.abstractBlue})` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(2,6,23,0.78))]" />
              </div>
              <div className="relative z-10 text-white">
                <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">lane preview</p>
                <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold">{activeService.title}</h2>
                <p className="mt-3 max-w-md text-sm leading-7 text-white/82">{activeService.summary}</p>
              </div>
              <div className="relative z-10 grid gap-3">
                {activeService.outcomes.map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/16 bg-white/8 px-4 py-3 text-white backdrop-blur-md">
                    <span className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-cyan-300">0{index + 1}</span>
                    <span className="text-sm text-white/84">{item}</span>
                  </div>
                ))}
              </div>
              <div className="relative z-10">
                <Link href={activeService.href} className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-200">
                  view lane details
                </Link>
              </div>
            </CardBody>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {SERVICES.map((service) => {
              const visual = getServiceVisual(service.title);
              const isActive = service.title === activeService.title;

              return (
                <Card
                  key={service.title}
                  isPressable
                  onPress={() => activateService(service.title)}
                  onMouseEnter={() => activateService(service.title)}
                  className={`border transition-transform duration-300 hover:-translate-y-0.5 ${
                    isActive
                      ? "border-cyan-300/70 bg-slate-950 text-white shadow-[0_24px_56px_rgba(14,165,233,0.18)]"
                      : "border-white/45 bg-white/82 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72"
                  }`}
                >
                  <CardBody className="gap-4 p-5 text-left">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className={`text-[11px] uppercase tracking-[0.16em] ${isActive ? "text-white/60" : "text-slate-500 dark:text-slate-400"}`}>
                          {visual.eyebrow}
                        </p>
                        <h2 className={`mt-2 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold ${isActive ? "text-white" : "text-slate-950 dark:text-slate-100"}`}>
                          {service.title}
                        </h2>
                      </div>
                      <div className={`h-2.5 w-18 rounded-full bg-gradient-to-r ${service.tone}`} />
                    </div>
                    <p className={`${isActive ? "text-white/78" : "text-slate-600 dark:text-slate-300"}`}>
                      {service.summary}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.outcomes.map((item) => (
                        <span
                          key={item}
                          className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.12em] ${
                            isActive
                              ? "bg-white/8 text-white/78"
                              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                          }`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <Link href={service.href} className={`text-sm font-semibold uppercase tracking-[0.14em] ${isActive ? "text-cyan-300" : "text-cyan-700 dark:text-cyan-300"}`}>
                      view details
                    </Link>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.14 }}
          className="mt-14 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]"
        >
          <Card className="border border-white/45 bg-white/82 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
            <CardBody className="gap-5 p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">performance layer</p>
                  <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-slate-950 dark:text-slate-100">
                    the extra system behind the lane.
                  </h2>
                </div>
                <Chip className="bg-slate-950 text-white dark:bg-slate-700">always on</Chip>
              </div>

              <div className="grid gap-3">
                {PERFORMANCE_LAYER.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200/75 bg-white/82 px-4 py-4 dark:border-slate-700/70 dark:bg-slate-900/78">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
                    <span className="text-sm text-slate-700 dark:text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {RESULTS_FOCUS.map((item) => (
              <Card key={item.title} className="border border-white/45 bg-white/82 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
                <CardBody className="gap-2 p-5">
                  <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-950 dark:text-slate-100">
                    {item.title}
                  </p>
                  <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{item.detail}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.section>

        <motion.section
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.2 }}
          className="mt-14"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">search pathways</p>
              <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-slate-950 dark:text-slate-100">
                popular searches, lighter layout.
              </h2>
            </div>
            <Chip className="bg-slate-950 text-white dark:bg-slate-700">city pages</Chip>
          </div>
          <div className="flex flex-wrap gap-3">
            {LOCATION_SERVICE_PAGES.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="rounded-full border border-white/45 bg-white/82 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700/70 dark:bg-slate-950/72 dark:text-slate-200 dark:hover:border-cyan-500/50 dark:hover:text-cyan-300"
              >
                {item.pageTitle}
              </Link>
            ))}
          </div>
        </motion.section>

        <motion.section {...reveal} transition={{ ...reveal.transition, delay: 0.26 }} className="mt-14">
          <Card className="overflow-hidden border border-cyan-200/70 bg-[linear-gradient(135deg,#0f172a_0%,#0f3f73_48%,#21b5f5_100%)] text-white shadow-[0_28px_72px_rgba(14,165,233,0.24)] dark:border-cyan-200/20">
            <CardBody className="relative gap-4 overflow-hidden p-6">
              <div className="absolute inset-0 opacity-30">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${BRAND_ART.gradientHub})` }}
                />
              </div>
              <div className="relative z-10">
                <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-100/76">next step</p>
                <p className="mt-3 max-w-2xl font-[family-name:var(--font-instrument-serif)] text-4xl text-white">
                  not sure which lane lands first? we map that with you.
                </p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/82">
                  one call, one clear first move, and a better visual direction for the brand pages you actually want people to remember.
                </p>
              </div>
              <div className="relative z-10 flex flex-wrap gap-3">
                <Button
                  as={Link}
                  href={GROWTH_AUDIT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white px-6 font-semibold text-slate-950"
                >
                  book growth audit
                </Button>
                <Button
                  as={Link}
                  href="#service-lanes"
                  variant="bordered"
                  className="border-white/45 bg-white/10 px-6 font-semibold text-white"
                >
                  compare lanes again
                </Button>
              </div>
            </CardBody>
          </Card>
        </motion.section>
      </main>
      <ZyraSiteFooter />
    </div>
  );
}

