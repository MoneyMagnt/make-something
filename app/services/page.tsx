"use client";

import {
  Button,
  Card,
  CardBody,
  Chip,
  Link,
} from "@heroui/react";
import { motion } from "framer-motion";
import { ZyraSiteNav } from "@/components/ZyraSiteNav";

const SERVICES = [
  {
    title: "seo growth system",
    summary: "rank for high-intent searches and convert that traffic into pipeline.",
    outcomes: ["technical cleanup", "intent mapping", "high-conversion pages"],
    href: "/services/seo",
    tone: "from-cyan-500 to-blue-500",
  },
  {
    title: "content studio",
    summary: "create a publishing rhythm that compounds trust and demand every week.",
    outcomes: ["campaign concepts", "asset production", "performance loop"],
    href: "/services/content",
    tone: "from-emerald-500 to-teal-500",
  },
  {
    title: "influencer strategy",
    summary: "activate creators who move both culture and buying action.",
    outcomes: ["creator fit checks", "offer design", "launch operations"],
    href: "/services/influencer",
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_650px_at_12%_-12%,rgba(14,165,233,0.22),transparent),radial-gradient(980px_560px_at_92%_8%,rgba(59,130,246,0.16),transparent)] dark:bg-[radial-gradient(1100px_650px_at_12%_-12%,rgba(14,165,233,0.2),transparent),radial-gradient(980px_560px_at_92%_8%,rgba(37,99,235,0.22),transparent)]" />

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
                <Button
                  as={Link}
                  href={service.href}
                  className="mt-1 w-fit border border-cyan-300/60 bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                >
                  open playbook
                </Button>
              </CardBody>
            </Card>
          ))}
        </motion.section>

        <motion.section {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="mt-10">
          <Card className="border border-cyan-200/80 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_16px_42px_rgba(14,165,233,0.32)] dark:border-cyan-300/40">
            <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-cyan-100">not sure which one fits first?</p>
                <p className="text-lg font-semibold">book a free growth audit and we’ll map the right starting lane.</p>
              </div>
              <Button
                as={Link}
                href="https://wa.me/233556877954"
                className="w-fit border border-white/55 bg-white text-slate-900 font-semibold"
              >
                chat on whatsapp
              </Button>
            </CardBody>
          </Card>
        </motion.section>
      </main>
    </div>
  );
}


