"use client";

import { Button, Card, CardBody, Link } from "@heroui/react";
import { motion } from "framer-motion";
import { startTransition, useDeferredValue, useState } from "react";
import { HERO_PREVIEW_PANELS, HOME_PHOTOS, getServiceVisual } from "@/lib/brandVisuals";

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
  transition: { duration: 0.44, ease: "easeOut" as const },
};

export default function ZyraHomeMobile({
  growthAuditUrl,
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
  const activeService =
    services.find((service) => service.title === deferredServiceTitle) ?? services[0];
  const activeVisual = getServiceVisual(activeService.title);
  const leadSnapshot = resultSnapshots[0];
  const supportSnapshots = resultSnapshots.slice(1, 3);
  const quickStats = aboveFoldProof.slice(0, 3);
  const secondaryStats = stats.slice(3, 5);

  const activateService = (title: string) => {
    startTransition(() => {
      setActiveServiceTitle(title);
    });
  };

  return (
    <>
      <motion.section {...reveal} className="space-y-6 pt-3">
        <div className="mx-auto w-full max-w-[16.5rem] rounded-[1rem] border border-cyan-200/80 bg-cyan-100/80 px-3 py-2 text-center text-cyan-900 shadow-[0_10px_24px_rgba(34,211,238,0.08)] dark:border-cyan-700/60 dark:bg-cyan-900/30 dark:text-cyan-200">
          <p className="text-[0.62rem] uppercase tracking-[0.16em] text-cyan-800/80 dark:text-cyan-200/80">
            premium growth systems
          </p>
          <p className="mt-1 text-[0.84rem] font-semibold leading-[1.15rem] tracking-[-0.02em]">
            for brands that need visible momentum
          </p>
        </div>

        <div className="overflow-hidden rounded-[1.8rem] border border-slate-200/70 bg-white/80 p-2.5 shadow-[0_20px_46px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70">
          <div className="grid gap-2 sm:grid-cols-2">
            {HERO_PREVIEW_PANELS.map((panel, index) => (
              <div
                key={panel.label}
                className={`relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-900 ${
                  index === 0 ? "min-h-[10.5rem] sm:col-span-2" : "min-h-[8.5rem]"
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${panel.image})` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,22,0.1),rgba(4,10,22,0.28)_36%,rgba(2,6,23,0.84)_100%)]" />
                <div className="relative z-10 flex h-full items-end p-4 text-white">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/62">{panel.label}</p>
                    <p className="mt-2 font-[family-name:var(--font-manrope)] text-lg font-semibold tracking-[-0.04em] text-white">
                      {panel.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
            zyra growth studio
          </p>
          <h1 className="max-w-[10ch] font-[family-name:var(--font-instrument-serif)] text-[clamp(3.9rem,16vw,5.6rem)] leading-[0.9] tracking-[-0.05em] text-slate-950 dark:text-slate-100">
            visibility, search, and campaigns that make momentum visible.
          </h1>
          <p className="max-w-md text-base leading-8 text-slate-600 dark:text-slate-300">
            built in ghana for brands that need clearer demand, sharper presentation, and a next step people can see fast.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            as={Link}
            href={growthAuditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 rounded-full bg-slate-950 font-semibold text-white dark:bg-slate-100 dark:text-slate-950"
          >
            book growth audit
          </Button>
          <Button
            as={Link}
            href="#mobile-services"
            variant="bordered"
            className="h-12 rounded-full border-slate-300/90 bg-white/80 font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-100"
          >
            explore services
          </Button>
        </div>

        <div className="grid gap-4 border-y border-slate-200/80 py-5 dark:border-slate-800/80">
          {quickStats.map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="font-[family-name:var(--font-manrope)] text-3xl font-semibold tracking-[-0.06em] text-slate-950 dark:text-slate-100">
                {item.value}
              </p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-slate-900 shadow-[0_28px_70px_rgba(15,23,42,0.12)]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HOME_PHOTOS.lagosCollabStanding})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,22,0.12),rgba(4,10,22,0.28)_34%,rgba(4,10,22,0.78)_72%,rgba(2,6,23,0.9)_100%)]" />

          <div className="relative z-10 flex min-h-[29rem] flex-col justify-end p-4">
            <div className="rounded-[1.8rem] border border-white/12 bg-slate-950/54 p-5 text-white shadow-[0_18px_48px_rgba(2,6,23,0.26)] backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/62">selected lane</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/58">{activeVisual.eyebrow}</p>
                </div>
                <span className={`h-2.5 w-14 rounded-full bg-gradient-to-r ${activeService.tone}`} />
              </div>
              <div className="mt-4 space-y-3">
                <h2 className="max-w-[8ch] font-[family-name:var(--font-instrument-serif)] text-[2.8rem] leading-[0.94] tracking-[-0.05em]">
                  {activeService.title}
                </h2>
                <p className="max-w-xs text-sm leading-7 text-white/80">{activeVisual.caption}</p>
                <Link href={activeService.href} className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">
                  view service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.08 }}
        className="mt-12 grid gap-4"
      >
        <div className="relative overflow-hidden rounded-[1.8rem] border border-slate-200/70 bg-slate-900 shadow-[0_24px_56px_rgba(15,23,42,0.1)]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HOME_PHOTOS.lagosTeamMeeting})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,22,0.14),rgba(2,6,23,0.78))]" />
          <div className="relative z-10 flex min-h-[18rem] flex-col justify-end gap-4 p-5 text-white">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/62">first five seconds</p>
              <h2 className="mt-3 max-w-[10ch] font-[family-name:var(--font-instrument-serif)] text-4xl leading-[0.96] tracking-[-0.05em]">
                look credible before the first conversation starts.
              </h2>
            </div>
            <div className="grid gap-3">
              {whyZyra.slice(0, 2).map((item, index) => (
                <div key={item} className="rounded-[1.3rem] border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-md">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/54">0{index + 1}</p>
                  <p className="mt-2 text-sm leading-7 text-white/78">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {secondaryStats.map((item) => (
            <Card key={item.label} className="rounded-[1.7rem] border border-slate-200/70 bg-white/82 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/72">
              <CardBody className="gap-1 p-4">
                <p className="font-[family-name:var(--font-manrope)] text-2xl font-semibold tracking-[-0.05em] text-slate-950 dark:text-slate-100">
                  {item.value}
                </p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="mobile-services"
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.12 }}
        className="mt-14 space-y-4"
      >
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">services</p>
          <h2 className="max-w-[10ch] font-[family-name:var(--font-instrument-serif)] text-5xl leading-[0.94] tracking-[-0.05em] text-slate-950 dark:text-slate-100">
            pick the lane you need.
          </h2>
        </div>

        <div className="grid gap-3">
          {services.map((service, index) => {
            const visual = getServiceVisual(service.title);
            const isActive = service.title === activeService.title;

            return (
              <Card
                key={service.title}
                isPressable
                onPress={() => activateService(service.title)}
                className={`overflow-hidden rounded-[1.8rem] border ${
                  isActive
                    ? "border-slate-950 bg-slate-950 text-white shadow-[0_24px_60px_rgba(15,23,42,0.16)] dark:border-white dark:bg-white dark:text-slate-950"
                    : "border-slate-200/70 bg-white/82 shadow-[0_20px_48px_rgba(15,23,42,0.06)] dark:border-slate-800/80 dark:bg-slate-950/72"
                }`}
              >
                <CardBody className="gap-0 p-0 text-left">
                  <div className="min-h-[13.5rem] bg-cover bg-center" style={{ backgroundImage: visual.surfaceBackground }} />
                  <div className="space-y-4 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className={`text-[11px] uppercase tracking-[0.18em] ${isActive ? "opacity-60" : "text-slate-500 dark:text-slate-400"}`}>
                        0{index + 1} / {visual.eyebrow}
                      </p>
                      <span className={`h-2.5 w-14 rounded-full bg-gradient-to-r ${service.tone}`} />
                    </div>
                    <div>
                      <h3 className={`font-[family-name:var(--font-manrope)] text-2xl font-semibold tracking-[-0.04em] ${isActive ? "text-inherit" : "text-slate-950 dark:text-slate-100"}`}>
                        {service.title}
                      </h3>
                      <p className={`mt-3 text-sm leading-7 ${isActive ? "text-white/80 dark:text-slate-700" : "text-slate-600 dark:text-slate-300"}`}>
                        {service.body}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {service.points.slice(0, 2).map((point) => (
                        <span
                          key={point}
                          className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.12em] ${
                            isActive
                              ? "bg-white/10 text-white/74 dark:bg-slate-950/8 dark:text-slate-700"
                              : "bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300"
                          }`}
                        >
                          {point}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={service.href}
                      className={`text-sm font-semibold uppercase tracking-[0.14em] ${isActive ? "text-cyan-300 dark:text-cyan-700" : "text-cyan-700 dark:text-cyan-300"}`}
                    >
                      view service
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
        transition={{ ...reveal.transition, delay: 0.18 }}
        className="mt-14 space-y-4"
      >
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">proof</p>
          <h2 className="max-w-[11ch] font-[family-name:var(--font-instrument-serif)] text-5xl leading-[0.94] tracking-[-0.05em] text-slate-950 dark:text-slate-100">
            proof that makes the offer easier to trust.
          </h2>
        </div>

        <Card className="overflow-hidden rounded-[1.9rem] border border-slate-200/70 bg-white/82 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/72">
          <CardBody className="gap-0 p-0">
            <div
              className="min-h-[16rem] bg-cover bg-center"
              style={{ backgroundImage: `linear-gradient(180deg,rgba(8,15,38,0.08),rgba(2,6,23,0.58)), url(${HOME_PHOTOS.lagosBusinesswomen})` }}
            />
            <div className="space-y-4 p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">selected proof</p>
              <h3 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-slate-100">
                {leadSnapshot?.title ?? "event demand sprint"}
              </h3>
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                {leadSnapshot?.outcome ?? "cleaner positioning and stronger conversion flow."}
              </p>
              <div className="grid gap-2">
                <div className="rounded-[1.3rem] bg-slate-100 px-4 py-3 text-sm leading-7 text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  {leadSnapshot?.challenge}
                </div>
                <div className="rounded-[1.3rem] bg-slate-100 px-4 py-3 text-sm leading-7 text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  {leadSnapshot?.action}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {supportSnapshots.map((item, index) => (
          <Card key={item.title} className="overflow-hidden rounded-[1.8rem] border border-slate-200/70 bg-white/82 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/72">
            <CardBody className="gap-0 p-0">
              <div
                className="min-h-[12rem] bg-cover bg-center"
                style={{
                  backgroundImage:
                    index === 0
                      ? `linear-gradient(180deg,rgba(8,15,38,0.08),rgba(2,6,23,0.62)), url(${HOME_PHOTOS.analyticsLaptop})`
                      : `linear-gradient(180deg,rgba(8,15,38,0.08),rgba(2,6,23,0.62)), url(${HOME_PHOTOS.laptopWorkflow})`,
                }}
              />
              <div className="space-y-3 p-4">
                <p className="font-[family-name:var(--font-manrope)] text-xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-slate-100">
                  {item.title}
                </p>
                <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{item.outcome}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </motion.section>

      <motion.section
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.24 }}
        className="mt-14 space-y-4"
      >
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">operating rhythm</p>
          <h2 className="max-w-[11ch] font-[family-name:var(--font-instrument-serif)] text-5xl leading-[0.94] tracking-[-0.05em] text-slate-950 dark:text-slate-100">
            one clear path from audit to rollout.
          </h2>
        </div>

        <div className="grid gap-3">
          {systemSteps.map((item, index) => (
            <Card key={item.title} className="rounded-[1.7rem] border border-slate-200/70 bg-white/82 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/72">
              <CardBody className="gap-4 p-4">
                <div className={`h-2 w-14 rounded-full bg-gradient-to-r ${services[index]?.tone ?? "from-cyan-500 to-blue-500"}`} />
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

          <Card className="rounded-[1.7rem] border border-slate-200/70 bg-white/82 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/72">
            <CardBody className="gap-2 p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">step {operatingNotes[0]?.step}</p>
              <p className="font-[family-name:var(--font-manrope)] text-xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-slate-100">
                {operatingNotes[0]?.title}
              </p>
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{operatingNotes[0]?.body}</p>
            </CardBody>
          </Card>
        </div>
      </motion.section>

      <motion.section {...reveal} transition={{ ...reveal.transition, delay: 0.3 }} className="mt-14">
        <div className="relative overflow-hidden rounded-[1.9rem] border border-slate-200/70 bg-slate-900 shadow-[0_28px_70px_rgba(15,23,42,0.12)]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HOME_PHOTOS.minimalDesk})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,14,30,0.78),rgba(10,45,80,0.56)_48%,rgba(18,181,234,0.34)_100%)]" />
          <div className="relative z-10 gap-4 p-5 text-white">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-100/76">next move</p>
              <p className="mt-3 max-w-[11ch] font-[family-name:var(--font-instrument-serif)] text-4xl leading-[0.94] text-white">
                book the audit and we shape the first lane worth shipping.
              </p>
              <p className="mt-3 text-sm leading-7 text-white/80">
                structure, positioning, and the clearest conversion surface in one focused pass.
              </p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Button
                as={Link}
                href={growthAuditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 rounded-full bg-white font-semibold text-slate-950"
              >
                book growth audit
              </Button>
              <Button
                as={Link}
                href="#proof"
                variant="bordered"
                className="h-12 rounded-full border-white/45 bg-white/10 font-semibold text-white"
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


