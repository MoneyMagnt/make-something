"use client";

import { Button, Card, CardBody, Chip, Link, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { motion } from "framer-motion";

const SERVICES = [
  {
    title: "seo growth system",
    summary: "rank for intent-heavy keywords and convert that traffic into revenue.",
    outcomes: ["technical cleanup", "intent mapping", "high-conversion pages"],
    href: "/services/seo",
  },
  {
    title: "content studio",
    summary: "build a content engine that drives demand every week.",
    outcomes: ["campaign concepts", "social + long-form assets", "content performance loop"],
    href: "/services/content",
  },
  {
    title: "influencer strategy",
    summary: "activate creators who move both culture and business metrics.",
    outcomes: ["creator selection", "offer and narrative design", "launch operations"],
    href: "/services/influencer",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden transition-colors bg-[radial-gradient(1100px_600px_at_10%_-10%,rgba(15,23,42,0.35),transparent),radial-gradient(900px_500px_at_90%_10%,rgba(59,130,246,0.28),transparent)] dark:bg-[radial-gradient(1100px_600px_at_10%_-10%,rgba(30,41,59,0.85),transparent),radial-gradient(900px_500px_at_90%_10%,rgba(37,99,235,0.34),transparent)]">
      <Navbar className="bg-transparent">
        <NavbarBrand className="flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-900 dark:text-slate-100">
          zyra
          <Chip className="bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-100">services</Chip>
        </NavbarBrand>
        <NavbarContent justify="end">
          <Button
            as={Link}
            href="/"
            variant="flat"
            className="bg-white/20 text-slate-900 border border-white/40 dark:bg-slate-900/70 dark:text-slate-100 dark:border-slate-700/80"
          >
            back home
          </Button>
        </NavbarContent>
      </Navbar>

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-10"
        >
          <h1 className="font-[family-name:var(--font-bricolage)] text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            choose your growth engine
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-700 dark:text-slate-300">
            each path is built to drive clear outcomes. pick the lane you want to accelerate first, then we stack from there.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <Card
              key={service.title}
              className="bg-white/80 backdrop-blur border border-slate-200/70 dark:bg-slate-900/70 dark:border-slate-700/80"
            >
              <CardBody className="gap-4">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {service.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">{service.summary}</p>
                <div className="grid gap-2">
                  {service.outcomes.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Button
                  as={Link}
                  href={service.href}
                  className="w-fit bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-100"
                >
                  open playbook
                </Button>
              </CardBody>
            </Card>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
          className="mt-10"
        >
          <Card className="bg-white/80 backdrop-blur border border-slate-200/70 dark:bg-slate-900/70 dark:border-slate-700/80">
            <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">not sure which path fits best?</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">book a free growth audit and we’ll map it together.</p>
              </div>
              <Button
                as={Link}
                href="https://wa.me/233556877954"
                className="w-fit bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
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
