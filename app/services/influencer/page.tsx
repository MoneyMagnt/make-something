"use client";

import {
  Button,
  Card,
  CardBody,
  Chip,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@heroui/react";
import { motion } from "framer-motion";

const DELIVERABLES = [
  "creator shortlist based on audience fit and brand tone",
  "campaign narrative, offer, and call-to-action design",
  "execution calendar with launch management",
  "performance review with scale recommendations",
];

const CHECKPOINTS = [
  {
    title: "fit check",
    body: "identify creators with real audience-brand alignment.",
  },
  {
    title: "offer design",
    body: "build hooks and offers that move action, not empty impressions.",
  },
  {
    title: "scale loop",
    body: "double down on winning creators and formats.",
  },
];

const reveal = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

export default function InfluencerServicePage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_620px_at_10%_-12%,rgba(99,102,241,0.2),transparent),radial-gradient(900px_520px_at_92%_10%,rgba(139,92,246,0.16),transparent)] dark:bg-[radial-gradient(1000px_620px_at_10%_-12%,rgba(99,102,241,0.22),transparent),radial-gradient(900px_520px_at_92%_10%,rgba(139,92,246,0.24),transparent)]" />

      <Navbar className="bg-transparent">
        <NavbarBrand className="flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
          zyra
          <Chip className="bg-violet-600 text-white">influencer</Chip>
        </NavbarBrand>
        <NavbarContent justify="end">
          <Button
            as={Link}
            href="/services"
            variant="flat"
            className="border border-slate-200/80 bg-white/70 text-slate-800 dark:border-slate-700/80 dark:bg-slate-900/75 dark:text-slate-100"
          >
            all services
          </Button>
        </NavbarContent>
      </Navbar>

      <main className="relative mx-auto max-w-5xl px-5 pb-24 pt-10 sm:px-6">
        <motion.section {...reveal} className="mb-10">
          <h1 className="font-[family-name:var(--font-bricolage)] text-4xl font-extrabold tracking-tight text-slate-950 sm:text-6xl dark:text-slate-100">
            influencer strategy
          </h1>
          <p className="mt-3 max-w-3xl text-base text-slate-700 sm:text-lg dark:text-slate-300">
            we design creator campaigns that deliver reach, relevance, and measurable business outcomes.
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
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="border border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75">
            <CardBody className="gap-3">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                campaign checkpoints
              </h2>
              {CHECKPOINTS.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-3 dark:border-slate-700/70 dark:bg-slate-950/70">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.body}</p>
                </div>
              ))}
            </CardBody>
          </Card>
        </motion.section>

        <motion.section {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="mt-9">
          <Card className="border border-violet-200/80 bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-[0_16px_42px_rgba(99,102,241,0.32)] dark:border-violet-300/40">
            <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-base sm:text-lg">ready to launch creator campaigns that convert?</p>
              <Button
                as={Link}
                href="https://wa.me/233556877954"
                className="w-fit border border-white/55 bg-white text-slate-900 font-semibold"
              >
                start influencer sprint
              </Button>
            </CardBody>
          </Card>
        </motion.section>
      </main>
    </div>
  );
}


