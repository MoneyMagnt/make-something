"use client";

import { Button, Card, CardBody, Chip, Link } from "@heroui/react";
import { motion } from "framer-motion";
import { startTransition, useDeferredValue, useState } from "react";
import {
  BRAND_ART,
  BRAND_SIGNAL_STRIPS,
  getServiceVisual,
} from "@/lib/brandVisuals";
import type { ScreenProfile } from "@/lib/useScreenProfile";

type StatItem = {
  label: string;
  value: string;
};

type SystemStep = {
  title: string;
  body: string;
};

type ResultSnapshot = {
  title: string;
  challenge: string;
  action: string;
  outcome: string;
};

type OperatingNote = {
  step: string;
  title: string;
  body: string;
};

type ServiceCard = {
  title: string;
  body: string;
  points: string[];
  tone: string;
  href: string;
};

type FaqItem = {
  q: string;
  a: string;
};

type ZyraHomeMobileProps = {
  growthAuditUrl: string;
  screenProfile: ScreenProfile | null;
  stats: StatItem[];
  aboveFoldProof: StatItem[];
  whyZyra: string[];
  systemSteps: SystemStep[];
  resultSnapshots: ResultSnapshot[];
  operatingNotes: OperatingNote[];
  services: ServiceCard[];
  faqs: FaqItem[];
};

const reveal = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

function getCtaHint(screenProfile: ScreenProfile | null) {
  if (screenProfile === "tablet") {
    return "click chat on whatsapp to book your growth audit";
  }

  return "tap chat on whatsapp to book your growth audit";
}

export default function ZyraHomeMobile({
  growthAuditUrl,
  screenProfile,
  stats,
  aboveFoldProof,
  whyZyra,
  systemSteps,
  resultSnapshots,
  operatingNotes,
  services,
  faqs,
}: ZyraHomeMobileProps) {
  const [activeServiceTitle, setActiveServiceTitle] = useState(services[0]?.title ?? "");
  const deferredServiceTitle = useDeferredValue(activeServiceTitle);
  const activeService = services.find((service) => service.title === deferredServiceTitle) ?? services[0];
  const activeVisual = getServiceVisual(activeService.title);

  const activateService = (title: string) => {
    startTransition(() => {
      setActiveServiceTitle(title);
    });
  };

  return (
    <>
      <motion.section {...reveal} className="space-y-5">
        <Chip className="border border-cyan-200 bg-cyan-100/85 text-cyan-900 dark:border-cyan-700/60 dark:bg-cyan-900/35 dark:text-cyan-200">
          signal studio for growth brands
        </Chip>

        <div className="space-y-4">
          <h1 className="font-[family-name:var(--font-bricolage)] text-[clamp(2.9rem,12vw,4.8rem)] font-extrabold leading-[0.92] tracking-tight text-slate-950 dark:text-slate-100">
            make the brand feel premium before the sales call starts.
          </h1>
          <p className="text-base leading-7 text-slate-700 dark:text-slate-300">
            zyra gives the brand pages more atmosphere, stronger proof, and a cleaner next step so people feel momentum before they start reading hard.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            as={Link}
            href={growthAuditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-12 bg-slate-950 font-semibold text-white dark:bg-slate-100 dark:text-slate-950"
          >
            book growth audit
          </Button>
          <Button
            as={Link}
            href="#mobile-services"
            variant="bordered"
            className="min-h-12 border-slate-300 bg-white/80 font-semibold text-slate-900 dark:border-slate-600 dark:bg-slate-900/60 dark:text-slate-100"
          >
            explore the system
          </Button>
        </div>

        <Card className="overflow-hidden border border-white/45 bg-white/82 shadow-[0_24px_64px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
          <CardBody className="relative gap-5 overflow-hidden p-4 min-[430px]:p-5">
            <div className="absolute inset-0 opacity-95">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${BRAND_ART.gradientHub})` }}
              />
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen"
                style={{ backgroundImage: `url(${BRAND_ART.gradientMesh})` }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(2,6,23,0.54))]" />
            </div>

            <div className="relative z-10 flex items-start justify-between gap-3 text-white">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">zyra mobile preview</p>
                <p className="mt-2 max-w-[15rem] font-[family-name:var(--font-instrument-serif)] text-3xl leading-none">
                  less text. more atmosphere.
                </p>
              </div>
              <Chip className="border border-white/20 bg-white/10 text-white">brand signal</Chip>
            </div>

            <div className="relative z-10 grid gap-3 sm:grid-cols-3">
              {aboveFoldProof.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/20 bg-white/10 px-3 py-3 text-white backdrop-blur-md"
                >
                  <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold">{item.value}</p>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-white/72">{item.label}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="grid gap-3">
          {BRAND_SIGNAL_STRIPS.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 rounded-2xl border border-white/45 bg-white/80 px-4 py-3 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/68"
            >
              <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-500" />
              <div>
                <p className="font-semibold text-slate-950 dark:text-slate-100">{item.title}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="proof"
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.08 }}
        className="mt-10 grid gap-3 sm:grid-cols-2"
      >
        {stats.map((item) => (
          <Card key={item.label} className="border border-white/45 bg-white/80 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
            <CardBody className="gap-1 p-4">
              <p className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-slate-950 dark:text-slate-100">
                {item.value}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{item.label}</p>
            </CardBody>
          </Card>
        ))}
      </motion.section>

      <motion.section
        id="mobile-services"
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.12 }}
        className="mt-12 space-y-4"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">interactive lanes</p>
            <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-slate-950 dark:text-slate-100">
              tap into the system.
            </h2>
          </div>
          <Chip className={`border ${activeVisual.chipClass} dark:border-transparent`}>
            {activeVisual.accentLabel}
          </Chip>
        </div>

        <Card className="overflow-hidden border border-white/45 bg-white/82 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
          <CardBody className="relative gap-5 overflow-hidden p-4 min-[430px]:p-5">
            <div className="absolute inset-0 opacity-90">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${BRAND_ART.abstractBlue})` }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(2,6,23,0.78))]" />
            </div>

            <div className="relative z-10 text-white">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">selected lane</p>
              <h3 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">{activeService.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/82">{activeVisual.caption}</p>
            </div>

            <div className="relative z-10 grid gap-3">
              {activeService.points.map((point, index) => (
                <div key={point} className="flex items-center gap-3 rounded-2xl border border-white/16 bg-white/8 px-4 py-3 text-white backdrop-blur-md">
                  <span className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-cyan-300">0{index + 1}</span>
                  <span className="text-sm text-white/84">{point}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="grid gap-3">
          {services.map((item) => {
            const isActive = item.title === activeService.title;
            const visual = getServiceVisual(item.title);

            return (
              <Card
                key={item.title}
                isPressable
                onPress={() => activateService(item.title)}
                className={`border ${
                  isActive
                    ? "border-cyan-300/70 bg-slate-950 text-white"
                    : "border-white/45 bg-white/80 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72"
                }`}
              >
                <CardBody className="gap-3 p-4 text-left">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className={`text-[11px] uppercase tracking-[0.16em] ${isActive ? "text-white/62" : "text-slate-500 dark:text-slate-400"}`}>
                        {visual.eyebrow}
                      </p>
                      <h3 className={`mt-2 font-[family-name:var(--font-space-grotesk)] text-xl font-bold ${isActive ? "text-white" : "text-slate-950 dark:text-slate-100"}`}>
                        {item.title}
                      </h3>
                    </div>
                    <div className={`h-2.5 w-18 rounded-full bg-gradient-to-r ${item.tone}`} />
                  </div>
                  <p className={`${isActive ? "text-white/78" : "text-slate-600 dark:text-slate-300"}`}>
                    {item.body}
                  </p>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.16 }}
        className="mt-12 grid gap-4"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-slate-950 dark:text-slate-100">
            the flow
          </h2>
          <Chip className="bg-slate-950 text-white dark:bg-slate-700">3 moves</Chip>
        </div>

        {systemSteps.map((item, index) => (
          <Card key={item.title} className="border border-white/45 bg-white/82 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
            <CardBody className="gap-3 p-4">
              <div className="flex items-center gap-3">
                <div className={`rounded-2xl bg-gradient-to-br ${services[index]?.tone ?? "from-cyan-500 to-blue-500"} px-4 py-3 text-white`}>
                  <span className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold">0{index + 1}</span>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-950 dark:text-slate-100">
                    {item.title}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.body}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </motion.section>

      <motion.section
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.2 }}
        className="mt-12 grid gap-4"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-slate-950 dark:text-slate-100">
            proof and rhythm
          </h2>
          <Chip className="bg-slate-950 text-white dark:bg-slate-700">why it works</Chip>
        </div>

        {resultSnapshots.map((item) => (
          <Card key={item.title} className="border border-white/45 bg-white/82 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
            <CardBody className="gap-2 p-4">
              <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-slate-950 dark:text-slate-100">
                {item.title}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{item.outcome}</p>
            </CardBody>
          </Card>
        ))}

        <Card className="border border-white/45 bg-white/82 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
          <CardBody className="gap-3 p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">operator notes</p>
            {operatingNotes.map((item) => (
              <div key={item.step} className="rounded-2xl border border-slate-200/75 bg-white/80 p-4 dark:border-slate-700/70 dark:bg-slate-900/78">
                <p className="font-semibold text-slate-950 dark:text-slate-100">{item.step}. {item.title}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.body}</p>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card id="faq" className="border border-white/45 bg-white/82 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
          <CardBody className="gap-3 p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">quick faq</p>
            {faqs.map((item) => (
              <div key={item.q} className="rounded-2xl border border-slate-200/75 bg-white/80 p-4 dark:border-slate-700/70 dark:bg-slate-900/78">
                <p className="font-semibold text-slate-950 dark:text-slate-100">{item.q}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.a}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      </motion.section>

      <motion.section {...reveal} transition={{ ...reveal.transition, delay: 0.28 }} className="mt-12">
        <Card className="overflow-hidden border border-cyan-200/70 bg-[linear-gradient(135deg,#0f172a_0%,#0f3f73_48%,#21b5f5_100%)] text-white shadow-[0_24px_60px_rgba(14,165,233,0.22)] dark:border-cyan-200/20">
          <CardBody className="relative gap-4 overflow-hidden p-5">
            <div className="absolute inset-0 opacity-30">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${BRAND_ART.gradientHub})` }}
              />
            </div>
            <div className="relative z-10">
              <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-100/76">next step</p>
              <p className="mt-3 font-[family-name:var(--font-instrument-serif)] text-3xl text-white">
                book the audit and we map the first lane worth shipping.
              </p>
              <p className="mt-3 text-sm leading-7 text-white/80">{getCtaHint(screenProfile)}</p>
            </div>
            <div className="relative z-10">
              <Button
                as={Link}
                href={growthAuditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-12 bg-white font-semibold text-slate-950"
              >
                book growth audit
              </Button>
            </div>
          </CardBody>
        </Card>
      </motion.section>
    </>
  );
}
