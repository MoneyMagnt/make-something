"use client";

import {
  Card,
  CardBody,
} from "@heroui/react";
import { motion } from "framer-motion";
import { ZyraSiteNav } from "@/components/ZyraSiteNav";
import { ZyraBrandMark } from "@/components/ZyraBrandMark";

const DELIVERABLES = [
  "monthly campaign concepts with clear messaging hooks",
  "short-form and long-form content planning",
  "creative direction and publishing rhythm",
  "weekly performance feedback loop",
];

const OUTCOMES = [
  {
    title: "higher save and share rates",
    body: "content becomes useful enough to revisit and pass along.",
  },
  {
    title: "stronger brand recall",
    body: "a consistent voice and visual language people remember.",
  },
  {
    title: "faster buyer confidence",
    body: "objections are handled through content before sales calls.",
  },
];

const reveal = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

export default function ContentServicePage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_620px_at_10%_-12%,rgba(16,185,129,0.2),transparent),radial-gradient(900px_520px_at_92%_10%,rgba(20,184,166,0.16),transparent)] dark:bg-[radial-gradient(1140px_700px_at_8%_-12%,rgba(16,185,129,0.24),transparent_60%),radial-gradient(980px_560px_at_92%_8%,rgba(13,148,136,0.26),transparent_62%),linear-gradient(180deg,rgba(2,6,23,0.96)_0%,rgba(3,23,33,0.9)_45%,rgba(7,30,40,0.95)_100%)]" />

      <ZyraSiteNav
        active="services"
        brand={<ZyraBrandMark />}
      />

      <main className="relative mx-auto max-w-5xl px-5 pb-24 pt-10 sm:px-6">
        <motion.section {...reveal} className="mb-10">
          <h1 className="font-[family-name:var(--font-bricolage)] text-4xl font-extrabold tracking-tight text-slate-950 sm:text-6xl dark:text-slate-100">
            content studio
          </h1>
          <p className="mt-3 max-w-3xl text-base text-slate-700 sm:text-lg dark:text-slate-300">
            we build story-led content systems that make your brand easier to trust and harder to ignore.
          </p>
        </motion.section>

        <motion.section {...reveal} transition={{ ...reveal.transition, delay: 0.06 }} className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75">
            <CardBody className="gap-4">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                what you get
              </h2>
              <div className="grid gap-3 text-sm text-slate-700 dark:text-slate-300">
                {DELIVERABLES.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="border border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75">
            <CardBody className="gap-3">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                outcomes we target
              </h2>
              {OUTCOMES.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-3 dark:border-slate-700/70 dark:bg-slate-950/70">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.body}</p>
                </div>
              ))}
            </CardBody>
          </Card>
        </motion.section>

        <motion.section {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="mt-9">
          <Card className="border border-emerald-200/80 bg-gradient-to-r from-emerald-500 via-teal-500 to-teal-600 text-white shadow-[0_16px_42px_rgba(16,185,129,0.32)] dark:border-emerald-200/25 dark:bg-[linear-gradient(118deg,rgba(2,44,34,0.98)_0%,rgba(6,95,70,0.96)_56%,rgba(15,118,110,0.98)_100%)] dark:shadow-[0_22px_62px_rgba(20,184,166,0.33)]">
            <CardBody className="gap-2">
              <p className="text-base sm:text-lg">want content that compounds every single week?</p>
              <p className="text-sm text-emerald-50/95 sm:hidden">tap the whatsapp icon to chat</p>
              <p className="hidden text-sm text-emerald-50/95 sm:block">click chat on whatsapp</p>
            </CardBody>
          </Card>
        </motion.section>
      </main>
    </div>
  );
}


