"use client";

import {
  Card,
  CardBody,
  Chip,
} from "@heroui/react";
import { motion } from "framer-motion";
import { ZyraSiteNav } from "@/components/ZyraSiteNav";

const SERVICES = [
  {
    title: "seo growth system",
    summary: "rank for high-intent searches and convert that traffic into pipeline.",
    outcomes: ["technical cleanup", "intent mapping", "high-conversion pages"],
    tone: "from-cyan-500 to-blue-500",
  },
  {
    title: "content studio",
    summary: "create a publishing rhythm that compounds trust and demand every week.",
    outcomes: ["campaign concepts", "asset production", "performance loop"],
    tone: "from-emerald-500 to-teal-500",
  },
  {
    title: "influencer strategy",
    summary: "activate creators who move both culture and buying action.",
    outcomes: ["creator fit checks", "offer design", "launch operations"],
    tone: "from-indigo-500 to-violet-500",
  },
];

const reveal = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_650px_at_12%_-12%,rgba(14,165,233,0.22),transparent),radial-gradient(980px_560px_at_92%_8%,rgba(59,130,246,0.16),transparent)] dark:bg-[radial-gradient(1240px_740px_at_8%_-14%,rgba(6,182,212,0.24),transparent_58%),radial-gradient(1120px_680px_at_92%_10%,rgba(59,130,246,0.27),transparent_60%),radial-gradient(940px_560px_at_50%_115%,rgba(8,145,178,0.22),transparent_64%),linear-gradient(180deg,rgba(2,6,23,0.96)_0%,rgba(3,15,34,0.9)_45%,rgba(8,20,45,0.95)_100%)]" />

      <ZyraSiteNav
        active="services"
        brand={
          <>
            <span>zyra</span>
            <Chip className="bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-100">services</Chip>
          </>
        }
      />

      <main className="relative mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-6">
        <motion.section {...reveal} className="mb-10">
          <h1 className="font-[family-name:var(--font-bricolage)] text-4xl font-extrabold tracking-tight text-slate-950 sm:text-6xl dark:text-slate-100">
            pick your growth lane
          </h1>
          <p className="mt-3 max-w-3xl text-base text-slate-700 sm:text-lg dark:text-slate-300">
            start with one focused channel, prove the outcome, then expand. every service is built to move clear commercial metrics.
          </p>
        </motion.section>

        <motion.section {...reveal} transition={{ ...reveal.transition, delay: 0.06 }} className="grid gap-5 md:grid-cols-3">
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
              </CardBody>
            </Card>
          ))}
        </motion.section>

        <motion.section {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="mt-10">
          <Card className="border border-cyan-200/80 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white shadow-[0_16px_42px_rgba(14,165,233,0.32)] dark:border-cyan-200/25 dark:bg-[linear-gradient(118deg,rgba(8,47,73,0.98)_0%,rgba(30,64,175,0.96)_56%,rgba(12,74,110,0.98)_100%)] dark:shadow-[0_22px_62px_rgba(8,145,178,0.34)]">
            <CardBody className="gap-2">
              <div>
                <p className="text-sm text-cyan-100 dark:text-cyan-50">not sure which one fits first?</p>
                <p className="text-lg font-semibold">we’ll map the right starting lane for your brand.</p>
              </div>
              <p className="text-sm text-cyan-50/95">tap chat on whatsapp</p>
            </CardBody>
          </Card>
        </motion.section>
      </main>
    </div>
  );
}


