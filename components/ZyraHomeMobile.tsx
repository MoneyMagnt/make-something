"use client";

import { Button, Card, CardBody, Chip, Link } from "@heroui/react";
import { motion } from "framer-motion";
import { startTransition, useDeferredValue, useState } from "react";
import { BRAND_ART, BRAND_SIGNAL_STRIPS, getServiceVisual } from "@/lib/brandVisuals";

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
  transition: { duration: 0.45, ease: "easeOut" as const },
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

  const activateService = (title: string) => {
    startTransition(() => {
      setActiveServiceTitle(title);
    });
  };

  return (
    <>
      <motion.section {...reveal} className="space-y-5 pt-2">
        <Chip className="border border-cyan-200 bg-cyan-100/85 text-cyan-900 dark:border-cyan-700/60 dark:bg-cyan-900/35 dark:text-cyan-200">
          editorial growth systems for brands that need visible momentum
        </Chip>

        <div className="space-y-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            zyra growth studio
          </p>
          <h1 className="max-w-sm font-[family-name:var(--font-bricolage)] text-[clamp(3.2rem,13vw,5rem)] font-extrabold leading-[0.88] tracking-tight text-slate-950 dark:text-slate-100">
            marketing people can feel before they read.
          </h1>
          <p className="text-base leading-7 text-slate-700 dark:text-slate-300">
            the first scroll should sell atmosphere, proof, and a clean next move without asking for too much reading.
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
            className="min-h-12 border-slate-300 bg-white/84 font-semibold text-slate-900 dark:border-slate-600 dark:bg-slate-900/60 dark:text-slate-100"
          >
            preview the lanes
          </Button>
        </div>

        <Card className="overflow-hidden border border-white/45 bg-white/84 shadow-[0_26px_64px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
          <CardBody className="relative gap-5 overflow-hidden p-4 min-[430px]:p-5">
            <div className="absolute inset-0 opacity-95">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${BRAND_ART.gradientHub})` }}
              />
              <div
                className="absolute inset-0 bg-cover bg-center opacity-55 mix-blend-screen"
                style={{ backgroundImage: `url(${BRAND_ART.gradientMesh})` }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.24),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.1),rgba(2,6,23,0.74))]" />
            </div>

            <div className="relative z-10 flex items-start justify-between gap-3 text-white">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-white/72">signal room</p>
                <p className="mt-2 max-w-[15rem] font-[family-name:var(--font-instrument-serif)] text-4xl leading-none">
                  less text. more pull.
                </p>
              </div>
              <Chip className="border border-white/20 bg-white/10 text-white">live preview</Chip>
            </div>

            <div
              className="relative z-10 rounded-[1.7rem] border border-white/18 p-4 text-white backdrop-blur-md"
              style={{ backgroundImage: activeVisual.surfaceBackground }}
            >
              <div className="absolute inset-0 rounded-[1.7rem] bg-[linear-gradient(180deg,rgba(8,15,38,0.08),rgba(2,6,23,0.7))]" />
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/68">active lane</p>
                  <Chip className="border border-white/20 bg-white/10 text-white">{activeVisual.accentLabel}</Chip>
                </div>
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold">
                  {activeService.title}
                </h2>
                <p className="text-sm leading-7 text-white/84">{activeVisual.caption}</p>
              </div>
            </div>

            <div className="relative z-10 grid gap-3 sm:grid-cols-3">
              {aboveFoldProof.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/18 bg-white/10 px-3 py-3 text-white backdrop-blur-md"
                >
                  <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold">{item.value}</p>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-white/72">{item.label}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="grid gap-3">
          {BRAND_SIGNAL_STRIPS.map((item, index) => (
            <div
              key={item.title}
              className="flex items-start gap-3 rounded-[1.45rem] border border-white/45 bg-white/82 px-4 py-4 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/68"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${index === 0 ? "bg-cyan-500/14 text-cyan-700 dark:text-cyan-300" : index === 1 ? "bg-emerald-500/14 text-emerald-700 dark:text-emerald-300" : "bg-violet-500/14 text-violet-700 dark:text-violet-300"} font-[family-name:var(--font-space-grotesk)] text-sm font-bold`}>
                0{index + 1}
              </div>
              <div>
                <p className="font-semibold text-slate-950 dark:text-slate-100">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="mobile-services"
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.08 }}
        className="mt-12 space-y-4"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">interactive lanes</p>
            <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-slate-950 dark:text-slate-100">
              tap through the system.
            </h2>
          </div>
          <Chip className={`border ${activeVisual.chipClass} dark:border-transparent`}>
            {activeVisual.accentLabel}
          </Chip>
        </div>

        <Card className="overflow-hidden border border-white/45 bg-white/84 shadow-[0_24px_64px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
          <CardBody className="relative min-h-[360px] justify-between overflow-hidden p-4 text-white min-[430px]:p-5">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: activeVisual.surfaceBackground }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_14%,rgba(255,255,255,0.18),transparent_24%),linear-gradient(180deg,rgba(8,15,38,0.08),rgba(2,6,23,0.74))]" />
            <div className="relative z-10">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">selected lane</p>
              <h3 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold">{activeService.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/82">{activeVisual.caption}</p>
            </div>
            <div className="relative z-10 grid gap-3">
              {activeService.points.slice(0, 3).map((point, index) => (
                <div key={point} className="flex items-center gap-3 rounded-2xl border border-white/16 bg-white/8 px-4 py-3 text-white backdrop-blur-md">
                  <span className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-cyan-300">0{index + 1}</span>
                  <span className="text-sm text-white/84">{point}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="grid gap-3">
          {services.map((service) => {
            const visual = getServiceVisual(service.title);
            const isActive = service.title === activeService.title;

            return (
              <Card
                key={service.title}
                isPressable
                onPress={() => activateService(service.title)}
                className={`overflow-hidden border ${
                  isActive
                    ? "border-cyan-300/70 bg-slate-950 text-white shadow-[0_22px_50px_rgba(14,165,233,0.18)]"
                    : "border-white/45 bg-white/82 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72"
                }`}
              >
                <CardBody className="gap-4 p-0 text-left">
                  <div className="min-h-[140px] bg-cover bg-center" style={{ backgroundImage: visual.surfaceBackground }} />
                  <div className="space-y-3 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className={`text-[11px] uppercase tracking-[0.16em] ${isActive ? "text-white/62" : "text-slate-500 dark:text-slate-400"}`}>
                          {visual.eyebrow}
                        </p>
                        <h3 className={`mt-2 font-[family-name:var(--font-space-grotesk)] text-xl font-bold ${isActive ? "text-white" : "text-slate-950 dark:text-slate-100"}`}>
                          {service.title}
                        </h3>
                      </div>
                      <div className={`h-2.5 w-16 rounded-full bg-gradient-to-r ${service.tone}`} />
                    </div>
                    <p className={`${isActive ? "text-white/78" : "text-slate-600 dark:text-slate-300"}`}>
                      {service.body}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.points.slice(0, 2).map((point) => (
                        <span
                          key={point}
                          className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.12em] ${
                            isActive
                              ? "bg-white/8 text-white/76"
                              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                          }`}
                        >
                          {point}
                        </span>
                      ))}
                    </div>
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
        transition={{ ...reveal.transition, delay: 0.16 }}
        className="mt-12 grid gap-4"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-slate-950 dark:text-slate-100">
            proof wall
          </h2>
          <Chip className="bg-slate-950 text-white dark:bg-slate-700">quality signal</Chip>
        </div>

        {resultSnapshots.map((item, index) => (
          <Card key={item.title} className="overflow-hidden border border-white/45 bg-white/84 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
            <CardBody className="gap-0 p-0">
              <div
                className="min-h-[190px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    index === 0
                      ? `linear-gradient(180deg,rgba(9,19,44,0.12),rgba(2,6,23,0.72)), url(${BRAND_ART.gradientHub})`
                      : index === 1
                        ? `linear-gradient(180deg,rgba(9,19,44,0.12),rgba(2,6,23,0.72)), url(${BRAND_ART.abstractBlue})`
                        : `linear-gradient(180deg,rgba(9,19,44,0.12),rgba(2,6,23,0.72)), url(${BRAND_ART.gradientMesh})`,
                }}
              />
              <div className="space-y-3 p-4">
                <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-950 dark:text-slate-100">
                  {item.title}
                </p>
                <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{item.outcome}</p>
                <div className="grid gap-2">
                  <div className="rounded-[1.3rem] bg-slate-100 px-4 py-3 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                    {item.challenge}
                  </div>
                  <div className="rounded-[1.3rem] bg-slate-100 px-4 py-3 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                    {item.action}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}

        <div className="grid gap-3 sm:grid-cols-2">
          {stats.slice(0, 4).map((item) => (
            <Card key={item.label} className="border border-white/45 bg-white/84 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
              <CardBody className="gap-1 p-4">
                <p className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-slate-950 dark:text-slate-100">
                  {item.value}
                </p>
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </motion.section>

      <motion.section
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.22 }}
        className="mt-12 grid gap-4"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-slate-950 dark:text-slate-100">
            the rhythm
          </h2>
          <Chip className="bg-slate-950 text-white dark:bg-slate-700">3 moves</Chip>
        </div>

        {operatingNotes.map((item, index) => (
          <Card key={item.title} className="border border-white/45 bg-white/84 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
            <CardBody className="gap-3 p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${services[index]?.tone ?? "from-cyan-500 to-blue-500"} font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-white`}>
                  0{index + 1}
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

        {faqs.map((item) => (
          <Card key={item.q} className="border border-white/45 bg-white/84 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
            <CardBody className="gap-2 p-4">
              <p className="font-semibold text-slate-950 dark:text-slate-100">{item.q}</p>
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{item.a}</p>
            </CardBody>
          </Card>
        ))}
      </motion.section>

      <motion.section {...reveal} transition={{ ...reveal.transition, delay: 0.28 }} className="mt-12">
        <Card className="overflow-hidden border border-cyan-200/70 bg-[linear-gradient(135deg,#07111d_0%,#0f3f73_48%,#18b7ef_100%)] text-white shadow-[0_24px_60px_rgba(14,165,233,0.22)] dark:border-cyan-200/20">
          <CardBody className="relative gap-4 overflow-hidden p-5">
            <div className="absolute inset-0 opacity-30">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${BRAND_ART.gradientMesh})` }}
              />
            </div>
            <div className="relative z-10">
              <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-100/76">next move</p>
              <p className="mt-3 font-[family-name:var(--font-instrument-serif)] text-3xl text-white">
                book the audit and we map the first lane worth shipping.
              </p>
              <p className="mt-3 text-sm leading-7 text-white/80">visual direction, first service lane, and the next conversion surface in one move.</p>
            </div>
            <div className="relative z-10 grid gap-3 sm:grid-cols-2">
              <Button
                as={Link}
                href={growthAuditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-12 bg-white font-semibold text-slate-950"
              >
                book growth audit
              </Button>
              <Button
                as={Link}
                href="#proof"
                variant="bordered"
                className="min-h-12 border-white/45 bg-white/10 font-semibold text-white"
              >
                see proof
              </Button>
            </div>
          </CardBody>
        </Card>
      </motion.section>
    </>
  );
}