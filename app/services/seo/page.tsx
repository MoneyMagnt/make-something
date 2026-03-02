"use client";

import { Button, Card, CardBody, Chip, Link, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { motion } from "framer-motion";

const DELIVERABLES = [
  "full seo and technical audit",
  "keyword intent map for high-value pages",
  "on-page optimization and content briefs",
  "conversion-focused landing page structure",
];

export default function SeoServicePage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden transition-colors bg-[radial-gradient(1100px_600px_at_10%_-10%,rgba(15,23,42,0.35),transparent),radial-gradient(900px_500px_at_90%_10%,rgba(56,189,248,0.3),transparent)] dark:bg-[radial-gradient(1100px_600px_at_10%_-10%,rgba(30,41,59,0.85),transparent),radial-gradient(900px_500px_at_90%_10%,rgba(8,145,178,0.3),transparent)]">
      <Navbar className="bg-transparent">
        <NavbarBrand className="flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-900 dark:text-slate-100">
          zyra
          <Chip className="bg-cyan-600 text-white">seo</Chip>
        </NavbarBrand>
        <NavbarContent justify="end">
          <Button
            as={Link}
            href="/services"
            variant="flat"
            className="bg-white/20 text-slate-900 border border-white/40 dark:bg-slate-900/70 dark:text-slate-100 dark:border-slate-700/80"
          >
            all services
          </Button>
        </NavbarContent>
      </Navbar>

      <main className="mx-auto max-w-5xl px-6 pb-20 pt-10">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          <h1 className="font-[family-name:var(--font-bricolage)] text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            seo growth system
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-700 dark:text-slate-300">
            we turn search intent into qualified leads with a strategy built for both rankings and revenue.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <Card className="bg-white/80 backdrop-blur border border-slate-200/70 dark:bg-slate-900/70 dark:border-slate-700/80">
            <CardBody className="gap-4">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-900 dark:text-slate-100">
                what you get
              </h2>
              <div className="grid gap-3">
                {DELIVERABLES.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="bg-white/80 backdrop-blur border border-slate-200/70 dark:bg-slate-900/70 dark:border-slate-700/80">
            <CardBody className="gap-4">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-900 dark:text-slate-100">
                timeline
              </h2>
              <div className="grid gap-3 text-sm">
                <div className="rounded-xl border border-slate-200/70 bg-white/70 p-3 dark:bg-slate-950/70 dark:border-slate-700/70">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">week 1</p>
                  <p className="text-slate-600 dark:text-slate-400">audit + opportunity map</p>
                </div>
                <div className="rounded-xl border border-slate-200/70 bg-white/70 p-3 dark:bg-slate-950/70 dark:border-slate-700/70">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">weeks 2-4</p>
                  <p className="text-slate-600 dark:text-slate-400">implementation and page upgrades</p>
                </div>
                <div className="rounded-xl border border-slate-200/70 bg-white/70 p-3 dark:bg-slate-950/70 dark:border-slate-700/70">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">weeks 5-8</p>
                  <p className="text-slate-600 dark:text-slate-400">measure, iterate, and scale</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
          className="mt-8"
        >
          <Card className="bg-white/80 backdrop-blur border border-slate-200/70 dark:bg-slate-900/70 dark:border-slate-700/80">
            <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-slate-700 dark:text-slate-300">
                ready to make search a revenue channel?
              </p>
              <Button as={Link} href="https://wa.me/233556877954" className="w-fit bg-cyan-600 text-white">
                book seo audit
              </Button>
            </CardBody>
          </Card>
        </motion.section>
      </main>
    </div>
  );
}
