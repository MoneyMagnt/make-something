"use client";

import { Button, Card, CardBody, Chip, Link } from "@heroui/react";
import { motion } from "framer-motion";
import { startTransition, useDeferredValue, useState } from "react";
import {
  BRAND_ART,
  BRAND_SIGNAL_STRIPS,
  getServiceVisual,
} from "@/lib/brandVisuals";

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

const reveal = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

function StatTile({ item }: { item: StatItem }) {
  return (
    <Card className="border border-white/45 bg-white/78 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/68">
      <CardBody className="gap-1 p-4">
        <p className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-slate-950 dark:text-slate-100">
          {item.value}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">{item.label}</p>
      </CardBody>
    </Card>
  );
}

export default function ZyraHomeDesktop({
  growthAuditUrl,
  stats,
  aboveFoldProof,
  whyZyra,
  systemSteps,
  resultSnapshots,
  operatingNotes,
  services,
  faqs,
}: ZyraHomeDesktopProps) {
  const [activeServiceTitle, setActiveServiceTitle] = useState(services[0]?.title ?? "");
  const deferredServiceTitle = useDeferredValue(activeServiceTitle);
  const activeService = services.find((service) => service.title === deferredServiceTitle) ?? services[0];
  const activeVisual = getServiceVisual(activeService.title);
  const leadSnapshot = resultSnapshots[0];
  const secondarySnapshots = resultSnapshots.slice(1);

  const activateService = (title: string) => {
    startTransition(() => {
      setActiveServiceTitle(title);
    });
  };

  return (
    <>
      <motion.section
        {...reveal}
        className="grid items-start gap-8 xl:grid-cols-[0.86fr_1.14fr]"
      >
        <div className="space-y-7">
          <Chip className="border border-cyan-200 bg-cyan-100/85 text-cyan-900 dark:border-cyan-700/60 dark:bg-cyan-900/35 dark:text-cyan-200">
            signal studio for growth brands
          </Chip>

          <div className="space-y-4">
            <h1 className="font-[family-name:var(--font-bricolage)] text-5xl font-extrabold leading-[0.92] tracking-tight text-slate-950 dark:text-slate-100">
              make the brand feel premium before the sales call starts.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-700 dark:text-slate-300">
              zyra blends editorial design, growth systems, and conversion thinking so your pages look alive,
              move faster, and sell the next step without a wall of copy.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              as={Link}
              href={growthAuditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-950 px-6 font-semibold text-white shadow-[0_18px_42px_rgba(15,23,42,0.22)] dark:bg-slate-100 dark:text-slate-950"
            >
              book growth audit
            </Button>
            <Button
              as={Link}
              href="#service-preview"
              variant="bordered"
              className="border-slate-300 bg-white/80 px-6 font-semibold text-slate-900 dark:border-slate-600 dark:bg-slate-900/60 dark:text-slate-100"
            >
              explore the system
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {aboveFoldProof.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/45 bg-white/76 px-4 py-3 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/66"
              >
                <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-slate-950 dark:text-slate-100">
                  {item.value}
                </p>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-3">
            {BRAND_SIGNAL_STRIPS.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-2xl border border-white/45 bg-white/78 p-4 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/66"
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

        <div className="relative min-h-[620px] overflow-hidden rounded-[2rem] border border-white/45 bg-[linear-gradient(140deg,rgba(255,255,255,0.7),rgba(255,255,255,0.18))] p-6 shadow-[0_28px_82px_rgba(15,23,42,0.16)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-[linear-gradient(140deg,rgba(15,23,42,0.8),rgba(15,23,42,0.38))]">
          <div className="absolute inset-0 opacity-95">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-80"
              style={{ backgroundImage: `url(${BRAND_ART.gradientHub})` }}
            />
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen"
              style={{ backgroundImage: `url(${BRAND_ART.gradientMesh})` }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.38),transparent_30%),radial-gradient(circle_at_82%_16%,rgba(34,211,238,0.24),transparent_26%),linear-gradient(180deg,rgba(8,47,73,0.08),rgba(2,6,23,0.44))]" />
          </div>

          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className={`absolute -right-8 top-14 h-40 w-40 rounded-full blur-3xl ${activeVisual.glowClass}`}
          />
          <motion.div
            animate={{ x: [0, 18, 0], y: [0, -10, 0] }}
            transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute -left-12 bottom-20 h-44 w-44 rounded-full bg-white/25 blur-3xl dark:bg-cyan-300/18"
          />

          <div className="relative z-10 flex h-full flex-col justify-between gap-6">
            <div className="flex items-start justify-between gap-4">
              <div className="max-w-sm rounded-[1.6rem] border border-white/45 bg-white/28 px-4 py-3 backdrop-blur-xl dark:border-slate-600/60 dark:bg-slate-950/28">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/72">zyra interface</p>
                <p className="mt-2 font-[family-name:var(--font-instrument-serif)] text-3xl text-white">
                  editorial motion with revenue intent.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/45 bg-slate-950/70 px-4 py-3 text-white shadow-[0_18px_44px_rgba(2,6,23,0.28)] backdrop-blur-xl dark:border-slate-600/60">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/60">current focus</p>
                <p className="mt-2 font-[family-name:var(--font-space-grotesk)] text-lg font-bold">{activeVisual.eyebrow}</p>
                <p className="text-sm text-white/72">{activeVisual.proof}</p>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
              <Card className="overflow-hidden border border-white/45 bg-white/78 backdrop-blur-2xl dark:border-slate-700/70 dark:bg-slate-950/72">
                <CardBody className="gap-5 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <Chip className={`border ${activeVisual.chipClass} dark:border-transparent`}>
                      {activeVisual.accentLabel}
                    </Chip>
                    <div className={`h-2.5 w-20 rounded-full bg-gradient-to-r ${activeVisual.gradient}`} />
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                      selected lane
                    </p>
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-slate-950 dark:text-slate-100">
                      {activeService.title}
                    </h2>
                    <p className="max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {activeVisual.caption}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {activeService.points.map((point) => (
                      <div
                        key={point}
                        className="rounded-2xl border border-slate-200/75 bg-white/80 px-3 py-3 text-sm text-slate-700 dark:border-slate-700/70 dark:bg-slate-900/80 dark:text-slate-200"
                      >
                        {point}
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              <div className="grid gap-4">
                <Card className="border border-white/45 bg-white/78 backdrop-blur-2xl dark:border-slate-700/70 dark:bg-slate-950/72">
                  <CardBody className="gap-3 p-5">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                      proof scene
                    </p>
                    <div
                      className="rounded-[1.5rem] border border-white/45 bg-cover bg-center p-5 text-white shadow-[inset_0_-80px_120px_rgba(2,6,23,0.58)]"
                      style={{ backgroundImage: `url(${BRAND_ART.abstractBlue})` }}
                    >
                      <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold">
                        {leadSnapshot?.title ?? "growth snapshot"}
                      </p>
                      <p className="mt-2 text-sm text-white/82">
                        {leadSnapshot?.outcome ?? "clearer positioning and cleaner conversion flow."}
                      </p>
                    </div>
                  </CardBody>
                </Card>

                <Card className="border border-white/45 bg-slate-950/76 text-white backdrop-blur-2xl dark:border-slate-700/70">
                  <CardBody className="gap-4 p-5">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/62">why teams stay</p>
                    <div className="grid gap-2">
                      {whyZyra.slice(0, 3).map((item) => (
                        <div key={item} className="rounded-2xl border border-white/12 bg-white/6 px-3 py-3 text-sm text-white/82">
                          {item}
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="proof"
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.08 }}
        className="mt-16 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]"
      >
        <Card className="overflow-hidden border border-white/45 bg-white/80 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/70">
          <CardBody className="gap-5 p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">proof board</p>
                <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-slate-950 dark:text-slate-100">
                  less text, faster trust.
                </h2>
              </div>
              <Chip className="bg-slate-950 text-white dark:bg-slate-700">signal-led</Chip>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div
                className="min-h-[320px] rounded-[1.8rem] border border-white/45 bg-cover bg-center p-6 shadow-[inset_0_-110px_140px_rgba(2,6,23,0.62)]"
                style={{ backgroundImage: `linear-gradient(180deg,rgba(8,15,38,0.06),rgba(2,6,23,0.72)),url(${BRAND_ART.gradientHub})` }}
              >
                <p className="text-[11px] uppercase tracking-[0.16em] text-white/64">featured snapshot</p>
                <p className="mt-3 max-w-sm font-[family-name:var(--font-instrument-serif)] text-4xl text-white">
                  {leadSnapshot?.title ?? "event demand sprint"}
                </p>
                <p className="mt-3 max-w-sm text-sm leading-7 text-white/82">
                  {leadSnapshot?.challenge ?? "ticket demand was flat before launch week."}
                </p>
              </div>

              <div className="grid gap-3">
                {secondarySnapshots.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200/70 bg-white/82 p-4 dark:border-slate-700/70 dark:bg-slate-900/78"
                  >
                    <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-slate-950 dark:text-slate-100">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((item) => (
            <StatTile key={item.label} item={item} />
          ))}
        </div>
      </motion.section>

      <motion.section
        id="service-preview"
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.12 }}
        className="mt-16 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]"
      >
        <Card className="overflow-hidden border border-white/45 bg-white/82 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
          <CardBody className="relative gap-5 overflow-hidden p-6">
            <div className="absolute inset-0 opacity-80">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${BRAND_ART.gradientMesh})` }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.82),rgba(255,255,255,0.2))] dark:bg-[linear-gradient(145deg,rgba(2,6,23,0.8),rgba(2,6,23,0.32))]" />
            </div>

            <div className="relative z-10 flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">interactive lanes</p>
                <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-slate-950 dark:text-slate-100">
                  move across the system.
                </h2>
              </div>
              <Chip className={`border ${activeVisual.chipClass} dark:border-transparent`}>
                {activeVisual.accentLabel}
              </Chip>
            </div>

            <div className="relative z-10 rounded-[1.8rem] border border-white/45 bg-slate-950/84 p-5 text-white shadow-[0_24px_54px_rgba(15,23,42,0.24)] dark:border-slate-600/55">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/56">active preview</p>
                  <h3 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">{activeService.title}</h3>
                </div>
                <div className={`h-2.5 w-24 rounded-full bg-gradient-to-r ${activeVisual.gradient}`} />
              </div>
              <p className="mt-3 max-w-md text-sm leading-7 text-white/78">{activeService.body}</p>
              <div className="mt-5 grid gap-3">
                {activeService.points.map((point, index) => (
                  <div key={point} className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/6 px-4 py-3">
                    <span className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-cyan-300">
                      0{index + 1}
                    </span>
                    <span className="text-sm text-white/84">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="grid gap-4">
          {services.map((item) => {
            const visual = getServiceVisual(item.title);
            const isActive = item.title === activeService.title;

            return (
              <Card
                key={item.title}
                isPressable
                onPress={() => activateService(item.title)}
                onMouseEnter={() => activateService(item.title)}
                className={`border transition-transform duration-300 hover:-translate-y-0.5 ${
                  isActive
                    ? "border-cyan-300/70 bg-slate-950 text-white shadow-[0_24px_56px_rgba(14,165,233,0.2)]"
                    : "border-white/45 bg-white/82 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72"
                }`}
              >
                <CardBody className="gap-4 p-5 text-left">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className={`text-[11px] uppercase tracking-[0.16em] ${isActive ? "text-white/56" : "text-slate-500 dark:text-slate-400"}`}>
                        {visual.eyebrow}
                      </p>
                      <h3 className={`mt-2 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold ${isActive ? "text-white" : "text-slate-950 dark:text-slate-100"}`}>
                        {item.title}
                      </h3>
                    </div>
                    <div className={`h-2.5 w-18 rounded-full bg-gradient-to-r ${item.tone}`} />
                  </div>
                  <p className={`${isActive ? "text-white/76" : "text-slate-600 dark:text-slate-300"}`}>
                    {item.body}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.points.map((point) => (
                      <span
                        key={point}
                        className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.12em] ${
                          isActive
                            ? "bg-white/8 text-white/76"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={item.href}
                    className={`text-sm font-semibold uppercase tracking-[0.12em] ${
                      isActive
                        ? "text-cyan-300"
                        : "text-cyan-700 dark:text-cyan-300"
                    }`}
                  >
                    view service
                  </Link>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.18 }}
        className="mt-16 grid gap-6 xl:grid-cols-[0.98fr_1.02fr]"
      >
        <Card className="overflow-hidden border border-white/45 bg-white/82 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
          <CardBody className="gap-5 p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">system choreography</p>
                <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-slate-950 dark:text-slate-100">
                  three moves, one flow.
                </h2>
              </div>
              <Chip className="bg-slate-950 text-white dark:bg-slate-700">strategy in motion</Chip>
            </div>
            <div className="grid gap-4">
              {systemSteps.map((item, index) => (
                <div
                  key={item.title}
                  className="grid items-start gap-4 rounded-[1.7rem] border border-white/45 bg-white/82 p-4 dark:border-slate-700/70 dark:bg-slate-900/78 xl:grid-cols-[80px_1fr]"
                >
                  <div className={`rounded-2xl bg-gradient-to-br ${services[index]?.tone ?? "from-cyan-500 to-blue-500"} px-4 py-5 text-center text-white`}>
                    <span className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">0{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-950 dark:text-slate-100">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="border border-white/45 bg-white/82 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
          <CardBody className="gap-5 p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-slate-950 dark:text-slate-100">
                what clients notice fast
              </h2>
              <Chip className="bg-slate-950 text-white dark:bg-slate-700">cleaner decisions</Chip>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {operatingNotes.map((item) => (
                <div
                  key={item.step}
                  className="rounded-[1.7rem] border border-white/45 bg-white/82 p-4 dark:border-slate-700/70 dark:bg-slate-900/78"
                >
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    step {item.step}
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-950 dark:text-slate-100">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.body}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </motion.section>

      <motion.section
        id="how-we-work"
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.24 }}
        className="mt-16 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]"
      >
        <Card className="border border-white/45 bg-white/82 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
          <CardBody className="gap-5 p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-slate-950 dark:text-slate-100">
                quick faq
              </h2>
              <Chip className="bg-slate-950 text-white dark:bg-slate-700">fast answers</Chip>
            </div>
            <div className="grid gap-3">
              {faqs.map((item) => (
                <div
                  key={item.q}
                  className="rounded-[1.5rem] border border-white/45 bg-white/82 p-4 dark:border-slate-700/70 dark:bg-slate-900/78"
                >
                  <p className="font-semibold text-slate-950 dark:text-slate-100">{item.q}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.a}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="overflow-hidden border border-cyan-200/70 bg-[linear-gradient(135deg,#0f172a_0%,#0f3f73_48%,#21b5f5_100%)] text-white shadow-[0_28px_72px_rgba(14,165,233,0.24)] dark:border-cyan-200/20">
          <CardBody className="relative gap-5 overflow-hidden p-6">
            <div className="absolute inset-0 opacity-35">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${BRAND_ART.gradientHub})` }}
              />
            </div>
            <div className="relative z-10">
              <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-100/76">next step</p>
              <p className="mt-3 max-w-xl font-[family-name:var(--font-instrument-serif)] text-4xl text-white">
                book the audit and we map the first lane worth shipping.
              </p>
              <p className="mt-3 max-w-lg text-sm leading-7 text-white/80">
                you do not need the whole machine on day one. we pick the first lane, shape the visuals, and build the next conversion step with you.
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap gap-3">
              <Button
                as={Link}
                href={growthAuditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white px-6 font-semibold text-slate-950"
              >
                book growth audit
              </Button>
              <Button
                as={Link}
                href="#proof"
                variant="bordered"
                className="border-white/45 bg-white/10 px-6 font-semibold text-white"
              >
                see proof again
              </Button>
            </div>
          </CardBody>
        </Card>
      </motion.section>
    </>
  );
}
