"use client";

import { Button, Card, CardBody, Chip, Link } from "@heroui/react";
import { motion, useReducedMotion } from "framer-motion";
import { startTransition, useDeferredValue, useState } from "react";
import { HERO_PREVIEW_PANELS, HOME_PHOTOS, getServiceVisual } from "@/lib/brandVisuals";
import { useLocalContent } from "@/lib/localContentEditor";

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

type ZyraHomeDesktopProps = {
  growthAuditUrl: string;
  stats: StatItem[];
  aboveFoldProof: StatItem[];
  whyZyra: string[];
  systemSteps: SystemStep[];
  resultSnapshots: ResultSnapshot[];
  operatingNotes: OperatingNote[];
  services: ServiceCard[];
  faqs: FaqItem[];
};

const defaultReveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-90px" },
  transition: { duration: 0.46, ease: "easeOut" as const },
};

function Metric({ item }: { item: StatItem }) {
  return (
    <div className="space-y-1 border-l border-slate-200/80 pl-4 dark:border-slate-800/80">
      <p className="font-[family-name:var(--font-manrope)] text-3xl font-semibold tracking-[-0.06em] text-slate-950 dark:text-slate-100">
        {item.value}
      </p>
      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
        {item.label}
      </p>
    </div>
  );
}

export default function ZyraHomeDesktop({
  growthAuditUrl,
  stats,
  aboveFoldProof,
  whyZyra,
  systemSteps,
  resultSnapshots,
  services,
  faqs,
}: ZyraHomeDesktopProps) {
  const editorContent = useLocalContent();
  const homeContent = editorContent.home;
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

  const [activeServiceTitle, setActiveServiceTitle] = useState(services[0]?.title ?? "");
  const deferredServiceTitle = useDeferredValue(activeServiceTitle);
  const activeService =
    services.find((service) => service.title === deferredServiceTitle) ?? services[0];
  const activeVisual = getServiceVisual(activeService.title);
  const leadSnapshot = resultSnapshots[0];
  const supportSnapshots = resultSnapshots.slice(1, 3);
  const secondaryStats = stats.slice(3, 5);

  const activateService = (title: string) => {
    startTransition(() => {
      setActiveServiceTitle(title);
    });
  };

  return (
    <>
      <motion.section
        {...reveal}
        className="flex min-h-[calc(100vh-6.5rem)] flex-col justify-between gap-12 pt-5"
      >
        <div className="max-w-6xl space-y-8">
          <Chip className="w-fit border border-cyan-200/80 bg-cyan-100/80 px-3 text-cyan-900 dark:border-cyan-700/60 dark:bg-cyan-900/30 dark:text-cyan-200">
            {homeContent.heroChipLabel} {homeContent.heroChipSubLabel}
          </Chip>

          <div className="max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/80 p-3 shadow-[0_24px_54px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70">
            <div className="grid gap-3 lg:grid-cols-[1.2fr_0.9fr_0.9fr]">
              {HERO_PREVIEW_PANELS.map((panel, index) => (
                <div
                  key={panel.label}
                  className={`relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900 ${
                    index === 0 ? "min-h-[12.5rem] lg:min-h-[13.5rem]" : "min-h-[12.5rem]"
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${panel.image})` }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,22,0.12),rgba(4,10,22,0.28)_36%,rgba(2,6,23,0.82)_100%)]" />
                  <div className="relative z-10 flex h-full items-end p-5 text-white">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/62">{panel.label}</p>
                      <p className="mt-2 font-[family-name:var(--font-manrope)] text-xl font-semibold tracking-[-0.04em] text-white">
                        {panel.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              {homeContent.heroEyebrow}
            </p>
            <p className="max-w-[11ch] font-[family-name:var(--font-instrument-serif)] text-[clamp(4.8rem,7vw,6.9rem)] leading-[0.9] tracking-[-0.05em] text-slate-950 dark:text-slate-100">
              {homeContent.heroTitle}
            </p>
            <p className="max-w-3xl text-[1.04rem] leading-8 text-slate-600 dark:text-slate-300">
              {homeContent.heroBody}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              as={Link}
              href={growthAuditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 rounded-full bg-slate-950 px-6 font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)] dark:bg-slate-100 dark:text-slate-950"
            >
              {homeContent.primaryCtaLabel}
            </Button>
            <Button
              as={Link}
              href="#service-preview"
              variant="bordered"
              className="h-12 rounded-full border-slate-300/90 bg-white/80 px-6 font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-100"
            >
              {homeContent.secondaryCtaLabel}
            </Button>
          </div>
        </div>

        <div className="relative min-h-[54rem] overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-slate-900 shadow-[0_38px_94px_rgba(15,23,42,0.12)]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HOME_PHOTOS.lagosCollabStanding})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,22,0.08),rgba(4,10,22,0.18)_30%,rgba(4,10,22,0.72)_70%,rgba(2,6,23,0.9)_100%)]" />

          <div className="absolute inset-x-0 bottom-0 z-10 p-7 xl:p-8">
            <div className="grid gap-6 rounded-[2rem] border border-white/12 bg-slate-950/56 p-6 text-white shadow-[0_20px_52px_rgba(2,6,23,0.28)] backdrop-blur-xl xl:grid-cols-[0.7fr_0.3fr] xl:items-end">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/62">selected lane</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-white/58">{activeVisual.eyebrow}</p>
                <h2 className="mt-5 max-w-[9ch] font-[family-name:var(--font-instrument-serif)] text-[3.9rem] leading-[0.92] tracking-[-0.05em]">
                  {activeService.title}
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-8 text-white/78">{activeVisual.caption}</p>
              </div>
              <div className="space-y-3">
                <Link href={activeService.href} className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  {`see ${activeService.title}`}
                </Link>
                <span className={`block h-2.5 w-16 rounded-full bg-gradient-to-r ${activeService.tone}`} />
                <div className="grid gap-2">
                  {activeService.points.slice(0, 2).map((point) => (
                    <div
                      key={point}
                      className="rounded-[1.2rem] border border-white/10 bg-white/8 px-4 py-3 text-sm text-white/76"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 border-y border-slate-200/80 py-6 sm:grid-cols-3 dark:border-slate-800/80">
          {aboveFoldProof.map((item) => (
            <Metric key={item.label} item={item} />
          ))}
        </div>
      </motion.section>

      <motion.section
        {...reveal}
        transition={withDelay(0.08)}
        className="mt-16 grid gap-5 xl:grid-cols-[0.64fr_0.36fr]"
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-slate-900 shadow-[0_28px_72px_rgba(15,23,42,0.1)]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HOME_PHOTOS.lagosTeamMeeting})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,22,0.16),rgba(4,10,22,0.36)_42%,rgba(2,6,23,0.84)_100%)]" />
          <div className="relative z-10 flex min-h-[24rem] flex-col justify-end gap-5 p-7 text-white">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/62">first five seconds</p>
              <h2 className="mt-3 max-w-[11ch] font-[family-name:var(--font-instrument-serif)] text-5xl leading-[0.94] tracking-[-0.05em]">
                look credible before the first conversation starts.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {whyZyra.slice(0, 2).map((item, index) => (
                <div key={item} className="rounded-[1.4rem] border border-white/10 bg-white/8 px-4 py-4 backdrop-blur-md">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">0{index + 1}</p>
                  <p className="mt-2 text-sm leading-7 text-white/78">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {secondaryStats.map((item) => (
            <Card
              key={item.label}
              className="rounded-[1.8rem] border border-slate-200/70 bg-white/82 shadow-[0_22px_52px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/72"
            >
              <CardBody className="gap-1 p-5">
                <p className="font-[family-name:var(--font-manrope)] text-3xl font-semibold tracking-[-0.05em] text-slate-950 dark:text-slate-100">
                  {item.value}
                </p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
              </CardBody>
            </Card>
          ))}

          <Card className="rounded-[1.8rem] border border-slate-200/70 bg-white/82 shadow-[0_22px_52px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/72">
            <CardBody className="gap-3 p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">quick answer</p>
              <p className="font-[family-name:var(--font-manrope)] text-xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-slate-100">
                {faqs[0]?.q}
              </p>
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{faqs[0]?.a}</p>
            </CardBody>
          </Card>
        </div>
      </motion.section>

      <motion.section
        id="service-preview"
        {...reveal}
        transition={withDelay(0.12)}
        className="mt-24 grid gap-8 xl:grid-cols-[0.36fr_0.64fr]"
      >
        <div className="space-y-5 xl:sticky xl:top-28 xl:self-start">
          <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            services
          </p>
          <h2 className="max-w-[10ch] font-[family-name:var(--font-instrument-serif)] text-6xl leading-[0.92] tracking-[-0.05em] text-slate-950 dark:text-slate-100">
            pick the lane you need.
          </h2>
          <p className="max-w-sm text-base leading-8 text-slate-600 dark:text-slate-300">
            every offer gets one clear promise, one real visual, and one obvious next step.
          </p>
          <div className="grid gap-3">
            {whyZyra.slice(2).map((item, index) => (
              <div
                key={item}
                className="rounded-[1.6rem] border border-slate-200/70 bg-white/74 px-4 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/70"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">0{index + 3}</p>
                <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {services.map((service, index) => {
            const visual = getServiceVisual(service.title);
            const isActive = service.title === activeService.title;

            return (
              <Card
                key={service.title}
                isPressable
                onPress={() => activateService(service.title)}
                className={`overflow-hidden rounded-[1.95rem] border transition-transform duration-300 ${
                  isActive
                    ? "border-slate-950 bg-slate-950 text-white shadow-[0_30px_72px_rgba(15,23,42,0.14)] dark:border-white dark:bg-white dark:text-slate-950"
                    : "border-slate-200/70 bg-white/84 shadow-[0_24px_56px_rgba(15,23,42,0.06)] dark:border-slate-800/80 dark:bg-slate-950/72"
                }`}
              >
                <CardBody className="grid gap-0 p-0 lg:grid-cols-[0.48fr_0.52fr]">
                  <div className="min-h-[18rem] bg-cover bg-center" style={{ backgroundImage: visual.surfaceBackground }} />
                  <div className="flex flex-col justify-between gap-6 p-6">
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
                          {service.body}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {service.points.slice(0, 2).map((point) => (
                          <span
                            key={point}
                            className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.12em] ${
                              isActive
                                ? "bg-white/10 text-white/74 dark:bg-slate-950/10 dark:text-slate-700"
                                : "bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300"
                            }`}
                          >
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link
                      href={service.href}
                      className={`text-sm font-semibold uppercase tracking-[0.14em] ${isActive ? "text-cyan-300 dark:text-cyan-700" : "text-cyan-700 dark:text-cyan-300"}`}
                    >
                      {`see ${service.title}`}
                    </Link>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        id="proof"
        {...reveal}
        transition={withDelay(0.18)}
        className="mt-24 grid gap-6 xl:grid-cols-[1.04fr_0.96fr]"
      >
        <Card className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/84 shadow-[0_28px_72px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/72">
          <CardBody className="grid gap-0 p-0 lg:grid-cols-[0.58fr_0.42fr]">
            <div
              className="min-h-[32rem] bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(180deg,rgba(8,15,38,0.08),rgba(2,6,23,0.58)), url(${HOME_PHOTOS.lagosBusinesswomen})`,
              }}
            />
            <div className="flex flex-col justify-between gap-5 p-7">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  selected proof
                </p>
                <h2 className="mt-3 max-w-[11ch] font-[family-name:var(--font-instrument-serif)] text-5xl leading-[0.94] tracking-[-0.05em] text-slate-950 dark:text-slate-100">
                  {leadSnapshot?.title ?? "event demand sprint"}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {leadSnapshot?.outcome ?? "cleaner positioning and stronger conversion flow."}
                </p>
              </div>

              <div className="grid gap-3">
                <div className="rounded-[1.5rem] bg-slate-100 px-4 py-4 text-sm leading-7 text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  {leadSnapshot?.challenge}
                </div>
                <div className="rounded-[1.5rem] bg-slate-100 px-4 py-4 text-sm leading-7 text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  {leadSnapshot?.action}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="grid gap-4">
          {supportSnapshots.map((item, index) => (
            <Card
              key={item.title}
              className="overflow-hidden rounded-[1.8rem] border border-slate-200/70 bg-white/84 shadow-[0_24px_56px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/72"
            >
              <CardBody className="grid gap-0 p-0 lg:grid-cols-[0.42fr_0.58fr]">
                <div
                  className="min-h-[15rem] bg-cover bg-center"
                  style={{
                    backgroundImage:
                      index === 0
                        ? `linear-gradient(180deg,rgba(8,15,38,0.08),rgba(2,6,23,0.62)), url(${HOME_PHOTOS.analyticsLaptop})`
                        : `linear-gradient(180deg,rgba(8,15,38,0.08),rgba(2,6,23,0.62)), url(${HOME_PHOTOS.laptopWorkflow})`,
                  }}
                />
                <div className="p-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">snapshot</p>
                  <h3 className="mt-2 font-[family-name:var(--font-manrope)] text-2xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-slate-100">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.outcome}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </motion.section>

      <motion.section
        {...reveal}
        transition={withDelay(0.24)}
        className="mt-24 grid gap-8 xl:grid-cols-[0.38fr_0.62fr]"
      >
        <div className="space-y-5">
          <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            operating rhythm
          </p>
          <h2 className="max-w-[10ch] font-[family-name:var(--font-instrument-serif)] text-6xl leading-[0.92] tracking-[-0.05em] text-slate-950 dark:text-slate-100">
            one clear path from audit to rollout.
          </h2>
          <p className="max-w-sm text-base leading-8 text-slate-600 dark:text-slate-300">
            the process stays short so the site feels considered, not crowded.
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {systemSteps.map((item, index) => (
            <Card
              key={item.title}
              className="rounded-[1.7rem] border border-slate-200/70 bg-white/84 shadow-[0_22px_52px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/72"
            >
              <CardBody className="gap-4 p-5">
                <div className={`h-2 w-16 rounded-full bg-gradient-to-r ${services[index]?.tone ?? "from-cyan-500 to-blue-500"}`} />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">0{index + 1}</p>
                  <p className="mt-2 font-[family-name:var(--font-manrope)] text-2xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-slate-100">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.body}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </motion.section>

      <motion.section
        {...reveal}
        transition={withDelay(0.3)}
        className="mt-24"
      >
        <div className="relative overflow-hidden rounded-[2.1rem] border border-slate-200/70 bg-slate-900 shadow-[0_34px_90px_rgba(15,23,42,0.12)]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HOME_PHOTOS.minimalDesk})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,14,30,0.78),rgba(10,45,80,0.56)_48%,rgba(18,181,234,0.34)_100%)]" />
          <div className="relative z-10 grid gap-8 p-8 text-white xl:grid-cols-[0.72fr_0.28fr] xl:items-end">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-100/76">next move</p>
              <h2 className="mt-3 max-w-[11ch] font-[family-name:var(--font-instrument-serif)] text-6xl leading-[0.92] tracking-[-0.05em]">
                book the audit and we shape the first lane worth shipping.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-white/80">
                structure, positioning, and the clearest conversion surface get mapped in one focused pass.
              </p>
            </div>
            <div className="flex flex-col gap-3 xl:items-end">
              <Button
                as={Link}
                href={growthAuditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 rounded-full bg-white px-6 font-semibold text-slate-950"
              >
                {homeContent.primaryCtaLabel}
              </Button>
              <Button
                as={Link}
                href="#proof"
                variant="bordered"
                className="h-12 rounded-full border-white/40 bg-white/10 px-6 font-semibold text-white"
              >
                see proof
              </Button>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}



