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
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-90px" },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

function MetricPanel({ item }: { item: StatItem }) {
  return (
    <div className="rounded-[1.45rem] border border-white/55 bg-white/84 px-4 py-4 shadow-[0_18px_36px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
      <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-950 dark:text-slate-100">
        {item.value}
      </p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
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
  operatingNotes,
  services,
  faqs,
}: ZyraHomeDesktopProps) {
  const [activeServiceTitle, setActiveServiceTitle] = useState(services[0]?.title ?? "");
  const deferredServiceTitle = useDeferredValue(activeServiceTitle);
  const activeService =
    services.find((service) => service.title === deferredServiceTitle) ?? services[0];
  const activeVisual = getServiceVisual(activeService.title);
  const leadSnapshot = resultSnapshots[0];
  const supportSnapshots = resultSnapshots.slice(1);

  const activateService = (title: string) => {
    startTransition(() => {
      setActiveServiceTitle(title);
    });
  };

  return (
    <>
      <motion.section
        {...reveal}
        className="grid items-start gap-8 xl:grid-cols-[0.88fr_1.12fr]"
      >
        <div className="space-y-7 pt-4">
          <Chip className="border border-cyan-200 bg-cyan-100/85 text-cyan-900 dark:border-cyan-700/60 dark:bg-cyan-900/35 dark:text-cyan-200">
            editorial growth systems for brands that need visible momentum
          </Chip>

          <div className="space-y-5">
            <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              zyra growth studio
            </p>
            <h1 className="max-w-xl font-[family-name:var(--font-bricolage)] text-[clamp(3.9rem,7vw,6.2rem)] font-extrabold leading-[0.88] tracking-tight text-slate-950 dark:text-slate-100">
              marketing people can feel before they read.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-700 dark:text-slate-300">
              we turn the first scroll into atmosphere, proof, and a clearer next move so the brand feels high-value immediately.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              as={Link}
              href={growthAuditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-950 px-6 font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.2)] dark:bg-slate-100 dark:text-slate-950"
            >
              book growth audit
            </Button>
            <Button
              as={Link}
              href="#service-preview"
              variant="bordered"
              className="border-slate-300 bg-white/84 px-6 font-semibold text-slate-900 dark:border-slate-600 dark:bg-slate-900/60 dark:text-slate-100"
            >
              preview the lanes
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {aboveFoldProof.map((item) => (
              <MetricPanel key={item.label} item={item} />
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {BRAND_SIGNAL_STRIPS.map((item, index) => (
              <div
                key={item.title}
                className="rounded-[1.5rem] border border-white/50 bg-white/80 px-4 py-4 shadow-[0_14px_28px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/68"
              >
                <div className={`mb-4 h-10 w-10 rounded-2xl ${index === 0 ? "bg-cyan-500/14 text-cyan-700 dark:text-cyan-300" : index === 1 ? "bg-emerald-500/14 text-emerald-700 dark:text-emerald-300" : "bg-violet-500/14 text-violet-700 dark:text-violet-300"} flex items-center justify-center font-[family-name:var(--font-space-grotesk)] text-sm font-bold`}>
                  0{index + 1}
                </div>
                <p className="font-semibold text-slate-950 dark:text-slate-100">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[740px] overflow-hidden rounded-[2.4rem] border border-white/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.78),rgba(255,255,255,0.24))] p-6 shadow-[0_34px_92px_rgba(15,23,42,0.16)] backdrop-blur-2xl dark:border-slate-700/70 dark:bg-[linear-gradient(145deg,rgba(8,14,31,0.92),rgba(8,18,42,0.64))]">
          <div className="absolute inset-0 opacity-95">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-80"
              style={{ backgroundImage: `url(${BRAND_ART.gradientHub})` }}
            />
            <div
              className="absolute inset-0 bg-cover bg-center opacity-55 mix-blend-screen"
              style={{ backgroundImage: `url(${BRAND_ART.gradientMesh})` }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.34),transparent_24%),radial-gradient(circle_at_82%_12%,rgba(34,211,238,0.2),transparent_22%),linear-gradient(180deg,rgba(9,19,44,0.12),rgba(2,6,23,0.66))]" />
          </div>

          <motion.div
            animate={{ x: [0, 22, 0], y: [0, -14, 0] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute -right-8 top-16 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 8.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute -left-14 bottom-20 h-56 w-56 rounded-full bg-indigo-300/16 blur-3xl"
          />

          <div className="relative z-10 grid h-full gap-5 xl:grid-rows-[auto_1fr_auto]">
            <div className="flex items-center justify-between gap-4">
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white backdrop-blur-md">
                signal room
              </div>
              <div className="rounded-full border border-white/20 bg-slate-950/50 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-white/80 backdrop-blur-md">
                live lane preview
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
              <Card className="overflow-hidden border border-white/20 bg-white/10 shadow-[0_20px_48px_rgba(2,6,23,0.18)] backdrop-blur-xl">
                <CardBody className="relative min-h-[420px] justify-between overflow-hidden p-6 text-white">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: activeVisual.surfaceBackground }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_14%,rgba(255,255,255,0.16),transparent_20%),linear-gradient(180deg,rgba(8,15,38,0.1),rgba(2,6,23,0.74))]" />

                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/68">active lane</p>
                      <h2 className="mt-2 max-w-sm font-[family-name:var(--font-instrument-serif)] text-5xl leading-[0.94]">
                        {activeService.title}
                      </h2>
                    </div>
                    <Chip className="border border-white/18 bg-white/10 text-white">
                      {activeVisual.accentLabel}
                    </Chip>
                  </div>

                  <div className="relative z-10 max-w-md space-y-4">
                    <p className="text-sm leading-7 text-white/82">{activeVisual.caption}</p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {activeService.points.slice(0, 3).map((point, index) => (
                        <div
                          key={point}
                          className="rounded-[1.3rem] border border-white/18 bg-white/10 px-3 py-3 backdrop-blur-md"
                        >
                          <p className="text-[11px] uppercase tracking-[0.14em] text-white/64">0{index + 1}</p>
                          <p className="mt-2 text-sm text-white/88">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 grid gap-3 sm:grid-cols-[1.05fr_0.95fr]">
                    <div className="rounded-[1.45rem] border border-white/18 bg-slate-950/40 px-4 py-4 backdrop-blur-md">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-white/64">featured proof</p>
                      <p className="mt-2 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">
                        {leadSnapshot?.title ?? "event demand sprint"}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-white/78">
                        {leadSnapshot?.outcome ?? "cleaner positioning and stronger conversion flow."}
                      </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {stats.slice(0, 4).map((item) => (
                        <div
                          key={item.label}
                          className="rounded-[1.3rem] border border-white/18 bg-white/10 px-4 py-3 backdrop-blur-md"
                        >
                          <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white">
                            {item.value}
                          </p>
                          <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/66">
                            {item.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardBody>
              </Card>

              <div className="grid gap-4">
                <Card className="border border-white/20 bg-white/10 shadow-[0_18px_44px_rgba(2,6,23,0.14)] backdrop-blur-xl">
                  <CardBody className="gap-4 p-5 text-white">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/66">what changes first</p>
                      <div className={`h-2.5 w-24 rounded-full bg-gradient-to-r ${activeVisual.gradient}`} />
                    </div>
                    <div className="grid gap-3">
                      {whyZyra.slice(0, 3).map((item) => (
                        <div key={item} className="rounded-[1.35rem] border border-white/14 bg-white/8 px-4 py-4 text-sm leading-7 text-white/82">
                          {item}
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>

                {supportSnapshots.map((item, index) => (
                  <Card
                    key={item.title}
                    className="overflow-hidden border border-white/18 bg-white/10 shadow-[0_18px_40px_rgba(2,6,23,0.12)] backdrop-blur-xl"
                  >
                    <CardBody className="relative min-h-[160px] justify-end overflow-hidden p-5 text-white">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            index === 0
                              ? `linear-gradient(180deg,rgba(9,19,44,0.08),rgba(2,6,23,0.78)), url(${BRAND_ART.abstractBlue})`
                              : `linear-gradient(180deg,rgba(9,19,44,0.08),rgba(2,6,23,0.78)), url(${BRAND_ART.gradientMesh})`,
                        }}
                      />
                      <div className="relative z-10">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-white/64">snapshot 0{index + 2}</p>
                        <p className="mt-2 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">{item.title}</p>
                        <p className="mt-2 text-sm leading-7 text-white/78">{item.outcome}</p>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {services.map((service) => {
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
                        ? "border-cyan-300/70 bg-white/16 text-white shadow-[0_18px_44px_rgba(14,165,233,0.18)]"
                        : "border-white/16 bg-white/8 text-white/84"
                    }`}
                  >
                    <CardBody className="gap-3 p-4 text-left">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-white/64">{visual.eyebrow}</p>
                        <div className={`h-2.5 w-14 rounded-full bg-gradient-to-r ${service.tone}`} />
                      </div>
                      <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white">{service.title}</p>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="service-preview"
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.08 }}
        className="mt-16 grid gap-6 xl:grid-cols-[0.88fr_1.12fr]"
      >
        <Card className="overflow-hidden border border-white/45 bg-white/84 shadow-[0_24px_60px_rgba(15,23,42,0.1)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
          <CardBody className="relative gap-6 overflow-hidden p-6">
            <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.16),transparent_45%),radial-gradient(circle_at_82%_20%,rgba(99,102,241,0.16),transparent_40%)]" />
            <div className="relative z-10 space-y-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">guided system</p>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-slate-950 dark:text-slate-100">
                one page. one path. four strong lanes.
              </h2>
              <p className="max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">
                the page should feel like a guided room: show the offer, surface proof, and move the right person to the next action fast.
              </p>
            </div>

            <div className="relative z-10 grid gap-4">
              {operatingNotes.map((item, index) => (
                <div
                  key={item.step}
                  className="grid items-start gap-4 rounded-[1.6rem] border border-white/55 bg-white/82 p-4 dark:border-slate-700/70 dark:bg-slate-900/72 xl:grid-cols-[86px_1fr]"
                >
                  <div className={`rounded-[1.35rem] bg-gradient-to-br ${services[index]?.tone ?? "from-cyan-500 to-blue-500"} px-4 py-5 text-center text-white`}>
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

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => {
            const visual = getServiceVisual(service.title);
            const isActive = service.title === activeService.title;

            return (
              <Card
                key={service.title}
                isPressable
                onPress={() => activateService(service.title)}
                onMouseEnter={() => activateService(service.title)}
                className={`overflow-hidden border transition-transform duration-300 hover:-translate-y-1 ${
                  isActive
                    ? "border-cyan-300/70 bg-slate-950 text-white shadow-[0_24px_56px_rgba(14,165,233,0.16)]"
                    : "border-white/45 bg-white/82 shadow-[0_20px_44px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72"
                }`}
              >
                <CardBody className="gap-0 p-0 text-left">
                  <div
                    className="min-h-[210px] bg-cover bg-center"
                    style={{ backgroundImage: visual.surfaceBackground }}
                  />
                  <div className="space-y-4 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className={`text-[11px] uppercase tracking-[0.16em] ${isActive ? "text-white/58" : "text-slate-500 dark:text-slate-400"}`}>
                          {visual.eyebrow}
                        </p>
                        <h3 className={`mt-2 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold ${isActive ? "text-white" : "text-slate-950 dark:text-slate-100"}`}>
                          {service.title}
                        </h3>
                      </div>
                      <div className={`mt-2 h-2.5 w-16 rounded-full bg-gradient-to-r ${service.tone}`} />
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
                              ? "bg-white/8 text-white/74"
                              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                          }`}
                        >
                          {point}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={service.href}
                      className={`text-sm font-semibold uppercase tracking-[0.12em] ${
                        isActive ? "text-cyan-300" : "text-cyan-700 dark:text-cyan-300"
                      }`}
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
        transition={{ ...reveal.transition, delay: 0.16 }}
        className="mt-16 grid gap-6 xl:grid-cols-[1.02fr_0.98fr]"
      >
        <div className="grid gap-4">
          {resultSnapshots.map((item, index) => (
            <Card
              key={item.title}
              className="overflow-hidden border border-white/45 bg-white/84 shadow-[0_20px_48px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72"
            >
              <CardBody className={`grid gap-4 p-0 ${index === 0 ? "xl:grid-cols-[1.04fr_0.96fr]" : "xl:grid-cols-[0.96fr_1.04fr]"}`}>
                <div
                  className="min-h-[220px] bg-cover bg-center"
                  style={{
                    backgroundImage:
                      index === 0
                        ? `linear-gradient(180deg,rgba(9,19,44,0.12),rgba(2,6,23,0.72)), url(${BRAND_ART.gradientHub})`
                        : index === 1
                          ? `linear-gradient(180deg,rgba(9,19,44,0.12),rgba(2,6,23,0.74)), url(${BRAND_ART.abstractBlue})`
                          : `linear-gradient(180deg,rgba(9,19,44,0.12),rgba(2,6,23,0.74)), url(${BRAND_ART.gradientMesh})`,
                  }}
                />
                <div className="flex flex-col justify-between gap-4 p-5">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">proof wall</p>
                    <h3 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-slate-950 dark:text-slate-100">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.outcome}</p>
                  </div>
                  <div className="grid gap-2">
                    <div className="rounded-[1.35rem] bg-slate-100 px-4 py-3 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                      {item.challenge}
                    </div>
                    <div className="rounded-[1.35rem] bg-slate-100 px-4 py-3 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                      {item.action}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="grid gap-6">
          <Card className="border border-white/45 bg-white/84 shadow-[0_22px_52px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
            <CardBody className="gap-4 p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-slate-950 dark:text-slate-100">
                  the page should guide fast
                </h2>
                <Chip className="bg-slate-950 text-white dark:bg-slate-700">quality signal</Chip>
              </div>
              <div className="grid gap-3">
                {systemSteps.map((item, index) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-white/55 bg-white/82 px-4 py-4 dark:border-slate-700/70 dark:bg-slate-900/72"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${services[index]?.tone ?? "from-cyan-500 to-blue-500"} font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-white`}>
                        0{index + 1}
                      </div>
                      <p className="font-semibold text-slate-950 dark:text-slate-100">{item.title}</p>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.body}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="border border-white/45 bg-white/84 shadow-[0_22px_52px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/72">
            <CardBody className="gap-4 p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-slate-950 dark:text-slate-100">
                  quick answers
                </h2>
                <Chip className="bg-slate-950 text-white dark:bg-slate-700">no friction</Chip>
              </div>
              <div className="grid gap-3">
                {faqs.map((item) => (
                  <div
                    key={item.q}
                    className="rounded-[1.45rem] border border-white/55 bg-white/82 px-4 py-4 dark:border-slate-700/70 dark:bg-slate-900/72"
                  >
                    <p className="font-semibold text-slate-950 dark:text-slate-100">{item.q}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.a}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </motion.section>

      <motion.section
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.24 }}
        className="mt-16"
      >
        <Card className="overflow-hidden border border-cyan-200/70 bg-[linear-gradient(135deg,#07111d_0%,#0f3f73_48%,#18b7ef_100%)] text-white shadow-[0_28px_72px_rgba(14,165,233,0.22)] dark:border-cyan-200/20">
          <CardBody className="relative grid gap-6 overflow-hidden p-6 xl:grid-cols-[1fr_auto] xl:items-end">
            <div className="absolute inset-0 opacity-30">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${BRAND_ART.gradientMesh})` }}
              />
            </div>
            <div className="relative z-10 max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-100/76">next move</p>
              <p className="mt-3 font-[family-name:var(--font-instrument-serif)] text-5xl leading-[0.95] text-white">
                book the audit and we map the first lane worth shipping.
              </p>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/80">
                visual direction, service priority, and the clearest next conversion surface all get shaped in one move.
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap gap-3 xl:justify-end">
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
                className="border-white/40 bg-white/10 px-6 font-semibold text-white"
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