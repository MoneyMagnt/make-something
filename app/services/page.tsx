"use client";

import { Button, Card, CardBody, Chip, Link } from "@heroui/react";
import { motion, useReducedMotion } from "framer-motion";
import { startTransition, useDeferredValue, useState } from "react";
import { ZyraBrandMark } from "@/components/ZyraBrandMark";
import { ZyraSiteFooter } from "@/components/ZyraSiteFooter";
import { ZyraSiteNav } from "@/components/ZyraSiteNav";
import { HOME_PHOTOS, getServiceVisual } from "@/lib/brandVisuals";
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
] as const;

const SERVICE_HERO_PANELS = [
  {
    label: "brand review",
    title: "offer framing",
    image: HOME_PHOTOS.strategyMeeting,
  },
  {
    label: "site presence",
    title: "conversion surface",
    image: HOME_PHOTOS.workspaceBlueWall,
  },
  {
    label: "campaign prep",
    title: "content planning",
    image: HOME_PHOTOS.creativeMeetingOffice,
  },
] as const;

const SERVICE_PAGE_VISUALS: Record<string, string> = {
  "seo growth system": `linear-gradient(155deg,rgba(6,18,40,0.18),rgba(2,6,23,0.76)), url(${HOME_PHOTOS.workspaceBlueWall})`,
  "content studio": `linear-gradient(155deg,rgba(7,22,30,0.18),rgba(2,6,23,0.72)), url(${HOME_PHOTOS.creativeMeetingOffice})`,
  "influencer strategy": `linear-gradient(155deg,rgba(18,22,44,0.16),rgba(2,6,23,0.74)), url(${HOME_PHOTOS.studioTeam})`,
  "founder website sprint": `linear-gradient(155deg,rgba(32,20,7,0.16),rgba(2,6,23,0.74)), url(${HOME_PHOTOS.strategyMeeting})`,
};

const PERFORMANCE_LAYER = [
  "ai-assisted content with human quality control",
  "sms activation for direct response",
  "data cleaning and segmentation for tighter targeting",
  "weekly analytics with the next move already defined",
] as const;

const RESULTS_FOCUS = [
  {
    title: "faster launch cycles",
    detail: "strategy, visuals, and rollout stay inside one operating rhythm, so momentum shows up sooner.",
  },
  {
    title: "clearer targeting",
    detail: "search intent, audience fit, and offer packaging work together instead of fighting each other.",
  },
  {
    title: "stronger founder presence",
    detail: "the brand feels more considered before the first call, not only after someone reads every section.",
  },
  {
    title: "easier weekly decisions",
    detail: "reporting is built for action, so scaling and course-correction happen faster.",
  },
] as const;

const SERVICES_PROOF = [
  { label: "contacts in database", value: "7300+" },
  { label: "avg kickoff window", value: "7 days" },
  { label: "reporting rhythm", value: "weekly" },
] as const;

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

const defaultReveal = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.42, ease: "easeOut" as const },
};

export default function ServicesPage() {
  const shouldReduceMotion = useReducedMotion();
  const reveal = shouldReduceMotion
    ? {
        initial: { opacity: 1, y: 0 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "0px" },
        transition: { duration: 0 },
      }
    : defaultReveal;
  const withDelay = (delay: number) =>
    shouldReduceMotion ? { duration: 0 } : { ...defaultReveal.transition, delay };
  const [activeServiceTitle, setActiveServiceTitle] = useState<string>(SERVICES[0]?.title ?? "");
  const deferredServiceTitle = useDeferredValue(activeServiceTitle);
  const activeService =
    SERVICES.find((service) => service.title === deferredServiceTitle) ?? SERVICES[0];
  const activeVisual = getServiceVisual(activeService.title);

  const activateService = (title: string) => {
    startTransition(() => {
      setActiveServiceTitle(title);
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#f6f8fb] text-slate-900 dark:bg-[#050913] dark:text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: servicesJsonLd }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1080px_620px_at_10%_-12%,rgba(125,211,252,0.22),transparent_58%),radial-gradient(980px_560px_at_94%_4%,rgba(59,130,246,0.12),transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.52),rgba(246,248,251,0.96))] dark:bg-[radial-gradient(1120px_720px_at_12%_-12%,rgba(6,182,212,0.18),transparent_60%),radial-gradient(980px_620px_at_94%_8%,rgba(37,99,235,0.18),transparent_60%),linear-gradient(180deg,rgba(2,6,23,0.98),rgba(4,12,24,0.96)_44%,rgba(7,16,31,1))]" />

      <ZyraSiteNav active="services" brand={<ZyraBrandMark />} />

      <main id="main-content" className="relative mx-auto max-w-[1360px] px-5 pb-24 pt-10 sm:px-6 lg:px-8">
        <motion.section
          {...reveal}
          className="grid gap-8 xl:min-h-[calc(100vh-7rem)] xl:grid-cols-[0.78fr_1.22fr] xl:items-end"
        >
          <div className="space-y-6 xl:pb-6">
            <Chip className="w-fit border border-cyan-200/80 bg-cyan-100/80 px-3 text-cyan-900 dark:border-cyan-700/60 dark:bg-cyan-900/30 dark:text-cyan-200">
              service architecture for visible growth
            </Chip>

            <div className="space-y-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                zyra service studio
              </p>
              <h1 className="max-w-[10ch] font-[family-name:var(--font-instrument-serif)] text-[clamp(4rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.05em] text-slate-950 dark:text-slate-100">
                choose the system that matches the bottleneck.
              </h1>
              <p className="max-w-2xl text-[1.02rem] leading-8 text-slate-600 dark:text-slate-300">
                search, content, creators, and founder websites packaged as clear operating systems instead of one long list of marketing tasks.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                as={Link}
                href={GROWTH_AUDIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 rounded-full bg-slate-950 px-6 font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)] dark:bg-slate-100 dark:text-slate-950"
              >
                book growth audit
              </Button>
              <Button
                as={Link}
                href="#service-lanes"
                variant="bordered"
                className="h-12 rounded-full border-slate-300/90 bg-white/80 px-6 font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-100"
              >
                review systems
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {SERVICES_PROOF.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.5rem] border border-slate-200/70 bg-white/80 px-4 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70"
                >
                  <p className="font-[family-name:var(--font-manrope)] text-2xl font-semibold tracking-[-0.05em] text-slate-950 dark:text-slate-100">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-slate-900 shadow-[0_38px_94px_rgba(15,23,42,0.12)]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${HOME_PHOTOS.creativeMeetingOffice})` }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,22,0.08),rgba(4,10,22,0.18)_30%,rgba(4,10,22,0.72)_70%,rgba(2,6,23,0.9)_100%)]" />

              <div className="relative z-10 flex min-h-[36rem] flex-col justify-between p-6 lg:p-8">
                <div className="grid gap-3 md:grid-cols-3">
                  {SERVICE_HERO_PANELS.map((panel, index) => (
                    <div
                      key={panel.label}
                      className={`relative overflow-hidden rounded-[1.45rem] border border-white/12 bg-slate-950/28 backdrop-blur-md ${
                        index === 0 ? "md:col-span-2" : ""
                      }`}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-80"
                        style={{ backgroundImage: `url(${panel.image})` }}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,22,0.08),rgba(2,6,23,0.78))]" />
                      <div className="relative z-10 p-4 text-white">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-white/62">{panel.label}</p>
                        <p className="mt-2 font-[family-name:var(--font-manrope)] text-lg font-semibold tracking-[-0.04em] text-white">
                          {panel.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-5 rounded-[2rem] border border-white/12 bg-slate-950/56 p-6 text-white shadow-[0_20px_52px_rgba(2,6,23,0.28)] backdrop-blur-xl lg:grid-cols-[0.7fr_0.3fr] lg:items-end">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/62">featured system</p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-white/58">{activeVisual.eyebrow}</p>
                    <h2 className="mt-5 max-w-[9ch] font-[family-name:var(--font-instrument-serif)] text-[3.3rem] leading-[0.92] tracking-[-0.05em]">
                      {activeService.title}
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-8 text-white/78">{activeVisual.caption}</p>
                  </div>
                  <div className="space-y-3">
                    <Link href={activeService.href} className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
                      open system details
                    </Link>
                    <span className={`block h-2.5 w-16 rounded-full bg-gradient-to-r ${activeService.tone}`} />
                    <div className="grid gap-2">
                      {activeService.outcomes.slice(0, 2).map((item) => (
                        <div
                          key={item}
                          className="rounded-[1.2rem] border border-white/10 bg-white/8 px-4 py-3 text-sm text-white/76"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="service-lanes"
          {...reveal}
          transition={withDelay(0.08)}
          className="mt-16 grid gap-8 xl:grid-cols-[0.34fr_0.66fr]"
        >
          <div className="space-y-5 xl:sticky xl:top-28 xl:self-start">
            <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">systems</p>
            <h2 className="max-w-[9ch] font-[family-name:var(--font-instrument-serif)] text-6xl leading-[0.92] tracking-[-0.05em] text-slate-950 dark:text-slate-100">
              compare the operating systems.
            </h2>
            <p className="max-w-sm text-base leading-8 text-slate-600 dark:text-slate-300">
              this page is now about the offers themselves, not the same brand-entry language from the homepage.
            </p>
            <div className="grid gap-3">
              {PERFORMANCE_LAYER.slice(0, 2).map((item, index) => (
                <div
                  key={item}
                  className="rounded-[1.6rem] border border-slate-200/70 bg-white/76 px-4 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70"
                >
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">0{index + 1}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {SERVICES.map((service, index) => {
              const visual = getServiceVisual(service.title);
              const isActive = service.title === activeService.title;
              const surfaceBackground = SERVICE_PAGE_VISUALS[service.title] ?? visual.surfaceBackground;

              return (
                <Card
                  key={service.title}
                  isPressable
                  onPress={() => activateService(service.title)}
                  onMouseEnter={() => activateService(service.title)}
                  className={`overflow-hidden rounded-[1.95rem] border transition-transform duration-300 hover:-translate-y-0.5 ${
                    isActive
                      ? "border-slate-950 bg-slate-950 text-white shadow-[0_30px_72px_rgba(15,23,42,0.14)] dark:border-white dark:bg-white dark:text-slate-950"
                      : "border-slate-200/70 bg-white/84 shadow-[0_24px_56px_rgba(15,23,42,0.06)] dark:border-slate-800/80 dark:bg-slate-950/72"
                  }`}
                >
                  <CardBody className="grid gap-0 p-0">
                    <div className="min-h-[15.5rem] bg-cover bg-center" style={{ backgroundImage: surfaceBackground }} />
                    <div className="flex flex-col justify-between gap-5 p-6 text-left">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className={`text-[11px] uppercase tracking-[0.18em] ${isActive ? "opacity-60" : "text-slate-500 dark:text-slate-400"}`}>
                            0{index + 1} / {visual.eyebrow}
                          </p>
                          <span className={`h-2.5 w-16 rounded-full bg-gradient-to-r ${service.tone}`} />
                        </div>
                        <div>
                          <h3 className={`font-[family-name:var(--font-manrope)] text-3xl font-semibold tracking-[-0.05em] ${isActive ? "text-inherit" : "text-slate-950 dark:text-slate-100"}`}>
                            {service.title}
                          </h3>
                          <p className={`mt-3 text-sm leading-7 ${isActive ? "text-white/78 dark:text-slate-700" : "text-slate-600 dark:text-slate-300"}`}>
                            {service.summary}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {service.outcomes.map((item) => (
                            <span
                              key={item}
                              className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.12em] ${
                                isActive
                                  ? "bg-white/10 text-white/74 dark:bg-slate-950/10 dark:text-slate-700"
                                  : "bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300"
                              }`}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Link
                        href={service.href}
                        className={`text-sm font-semibold uppercase tracking-[0.14em] ${isActive ? "text-cyan-300 dark:text-cyan-700" : "text-cyan-700 dark:text-cyan-300"}`}
                      >
                        inspect system
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          {...reveal}
          transition={withDelay(0.14)}
          className="mt-16 grid gap-6 xl:grid-cols-[0.96fr_1.04fr]"
        >
          <Card className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/84 shadow-[0_28px_72px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/72">
            <CardBody className="grid gap-0 p-0 lg:grid-cols-[0.52fr_0.48fr]">
              <div
                className="min-h-[26rem] bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(180deg,rgba(8,15,38,0.08),rgba(2,6,23,0.6)), url(${HOME_PHOTOS.studioTeam})`,
                }}
              />
              <div className="flex flex-col justify-between gap-5 p-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">shared layer</p>
                  <h2 className="mt-3 max-w-[10ch] font-[family-name:var(--font-instrument-serif)] text-5xl leading-[0.94] tracking-[-0.05em] text-slate-950 dark:text-slate-100">
                    what every system still needs.
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    even when the offer changes, these support layers keep the system usable and measurable.
                  </p>
                </div>
                <div className="grid gap-3">
                  {PERFORMANCE_LAYER.map((item) => (
                    <div key={item} className="rounded-[1.4rem] bg-slate-100 px-4 py-4 text-sm leading-7 text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {RESULTS_FOCUS.map((item) => (
              <Card
                key={item.title}
                className="rounded-[1.8rem] border border-slate-200/70 bg-white/84 shadow-[0_24px_56px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/72"
              >
                <CardBody className="gap-3 p-5">
                  <p className="font-[family-name:var(--font-manrope)] text-2xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-slate-100">
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
          transition={withDelay(0.2)}
          className="mt-16"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">local search routes</p>
              <h2 className="mt-2 font-[family-name:var(--font-manrope)] text-3xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-slate-100">
                city pages, kept secondary.
              </h2>
            </div>
            <Chip className="bg-slate-950 text-white dark:bg-slate-700">city pages</Chip>
          </div>
          <div className="flex flex-wrap gap-3">
            {LOCATION_SERVICE_PAGES.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="rounded-full border border-slate-200/70 bg-white/82 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700/70 dark:bg-slate-950/72 dark:text-slate-200 dark:hover:border-cyan-500/50 dark:hover:text-cyan-300"
              >
                {item.pageTitle}
              </Link>
            ))}
          </div>
        </motion.section>

        <motion.section
          {...reveal}
          transition={withDelay(0.26)}
          className="mt-16"
        >
          <div className="relative overflow-hidden rounded-[2.1rem] border border-slate-200/70 bg-slate-900 shadow-[0_34px_90px_rgba(15,23,42,0.12)]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${HOME_PHOTOS.blueGlassyShapes})` }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.92),rgba(8,47,73,0.78),rgba(34,197,244,0.42))]" />
            <div className="relative z-10 flex flex-col gap-4 p-6 text-white md:p-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-100/76">next move</p>
                <p className="mt-3 max-w-2xl font-[family-name:var(--font-instrument-serif)] text-4xl text-white md:text-5xl">
                  not sure which system lands first? we map the first move with you.
                </p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/82">
                  one call, one clear first move, and a service path that actually matches the bottleneck instead of guessing at everything at once.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
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
                  compare systems again
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <ZyraSiteFooter />
    </div>
  );
}
