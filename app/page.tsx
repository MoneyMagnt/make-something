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
import SignalMeshGraphic from "@/components/SignalMeshGraphic";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-x-hidden transition-colors bg-[radial-gradient(1100px_600px_at_10%_-10%,rgba(15,23,42,0.35),transparent),radial-gradient(900px_500px_at_90%_10%,rgba(59,130,246,0.28),transparent)] dark:bg-[radial-gradient(1100px_600px_at_10%_-10%,rgba(30,41,59,0.85),transparent),radial-gradient(900px_500px_at_90%_10%,rgba(37,99,235,0.34),transparent)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-55 mix-blend-multiply dark:opacity-35 dark:mix-blend-screen"
        style={{
          backgroundImage: "url(/zyra-gradient-hub.webp)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0.16, y: 12 }}
        animate={{ opacity: 0.24, y: -12 }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <span className="relative font-[family-name:var(--font-space-grotesk)] text-[22vw] leading-none font-extrabold text-slate-900/40 dark:text-slate-100/28">
          <span className="absolute inset-0 blur-[16px] text-slate-900/30 dark:text-slate-100/20">ZYRA</span>
          <span className="bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-transparent bg-clip-text text-transparent dark:from-slate-100/35 dark:via-slate-100/20">
            ZYRA
          </span>
        </span>
      </motion.div>
      <Navbar className="bg-transparent">
        <NavbarBrand className="flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-900 dark:text-slate-100">
          zyra
          <Chip className="bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-100">gh</Chip>
        </NavbarBrand>
        <NavbarContent justify="end" className="hidden sm:flex">
          <Button
            as={Link}
            href="/services"
            variant="flat"
            className="bg-white/20 text-slate-900 border border-white/40 dark:bg-slate-900/70 dark:text-slate-100 dark:border-slate-700/80"
          >
            services
          </Button>
        </NavbarContent>
      </Navbar>

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-12">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr]"
        >
          <div className="flex flex-col gap-6">
            <h1 className="font-[family-name:var(--font-bricolage)] text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              we help ghana brands turn attention into revenue in 90 days.
            </h1>
            <p className="text-lg text-slate-700 dark:text-slate-300">
              zyra builds ai-powered seo, content, and influencer systems for founders who want predictable growth,
              not random posting.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                as={Link}
                href="https://wa.me/233556877954"
                className="bg-white/25 text-slate-900 border border-white/50 backdrop-blur-2xl shadow-[0_18px_50px_rgba(15,23,42,0.18)] dark:bg-slate-900/70 dark:text-slate-100 dark:border-slate-700/80"
              >
                book a free growth audit
              </Button>
              <Button
                as={Link}
                href="/visitor"
                variant="flat"
                className="bg-white/25 text-slate-900 border border-white/50 backdrop-blur-2xl shadow-[0_18px_50px_rgba(15,23,42,0.18)] dark:bg-slate-900/70 dark:text-slate-100 dark:border-slate-700/80"
              >
                view our events
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-slate-700 dark:text-slate-300">
              <Chip className="bg-black/10 text-slate-900 dark:bg-slate-700/60 dark:text-slate-100">ai‑first growth systems</Chip>
              <Chip className="bg-black/10 text-slate-900 dark:bg-slate-700/60 dark:text-slate-100">luxury‑grade creative</Chip>
              <Chip className="bg-black/10 text-slate-900 dark:bg-slate-700/60 dark:text-slate-100">ghana‑rooted, global taste</Chip>
              <Chip className="bg-black/10 text-slate-900 dark:bg-slate-700/60 dark:text-slate-100">90-day sprint model</Chip>
            </div>
          </div>

          <div className="grid gap-6">
            <SignalMeshGraphic />
            <Card className="bg-white/80 backdrop-blur border border-slate-200/70 dark:bg-slate-900/70 dark:border-slate-700/80">
              <CardBody className="gap-5">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-900 dark:text-slate-100">
                  what we do
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { title: "data analytics", icon: "Δ" },
                    { title: "seo strategy", icon: "◎" },
                    { title: "content creation", icon: "✶" },
                    { title: "influencer partnerships", icon: "◆" },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 dark:bg-slate-950/70 dark:border-slate-700/70"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white dark:bg-slate-700">
                        {item.icon}
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">{item.title}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {[
            {
              title: "seo growth system",
              body: "intent mapping, technical cleanup, and conversion pages that pull qualified demand.",
              href: "/services/seo",
              chip: "demand engine",
            },
            {
              title: "content studio",
              body: "campaign concepts, hooks, and weekly assets designed for saves, shares, and trust.",
              href: "/services/content",
              chip: "content engine",
            },
            {
              title: "influencer strategy",
              body: "creator matching, offer design, and launch coordination tied to business outcomes.",
              href: "/services/influencer",
              chip: "distribution engine",
            },
          ].map((item) => (
            <Card key={item.title} className="bg-white/80 backdrop-blur border border-slate-200/70 dark:bg-slate-900/70 dark:border-slate-700/80">
              <CardBody className="gap-4">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm dark:text-slate-400">{item.body}</p>
                <div className="flex items-center justify-between gap-2 pt-1">
                  <Chip className="bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-100">{item.chip}</Chip>
                  <Button
                    as={Link}
                    href={item.href}
                    size="sm"
                    variant="flat"
                    className="bg-white/60 text-slate-900 border border-slate-200/70 dark:bg-slate-950/70 dark:text-slate-100 dark:border-slate-700/70"
                  >
                    open service
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <Card className="bg-white/80 backdrop-blur border border-slate-200/70 dark:bg-slate-900/70 dark:border-slate-700/80">
            <CardBody className="gap-4">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-900 dark:text-slate-100">
                how we work
              </h2>
              <div className="grid gap-3 text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-center justify-between">
                  <span>week 1: growth diagnosis</span>
                  <Chip className="bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-100">audit + goals</Chip>
                </div>
                <div className="flex items-center justify-between">
                  <span>weeks 2-4: strategy build</span>
                  <Chip className="bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-100">plan + assets</Chip>
                </div>
                <div className="flex items-center justify-between">
                  <span>weeks 5-8: launch + iterate</span>
                  <Chip className="bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-100">deployment</Chip>
                </div>
                <div className="flex items-center justify-between">
                  <span>weeks 9-12: scale winners</span>
                  <Chip className="bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-100">optimization</Chip>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-white/80 backdrop-blur border border-slate-200/70 dark:bg-slate-900/70 dark:border-slate-700/80">
            <CardBody className="gap-4">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-900 dark:text-slate-100">
                engagement options
              </h2>
              <div className="grid gap-3 text-sm">
                {[
                  {
                    name: "starter sprint",
                    detail: "one channel, 30-day reset, clear next steps",
                  },
                  {
                    name: "growth partner",
                    detail: "multi-channel execution for 90-day growth cycles",
                  },
                  {
                    name: "custom scale",
                    detail: "full-stack strategy for teams ready to push hard",
                  },
                ].map((tier) => (
                  <div
                    key={tier.name}
                    className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 dark:bg-slate-950/70 dark:border-slate-700/70"
                  >
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{tier.name}</p>
                    <p className="text-slate-600 dark:text-slate-400">{tier.detail}</p>
                  </div>
                ))}
              </div>
              <Button
                as={Link}
                href="https://wa.me/233556877954"
                className="w-fit bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-100"
              >
                choose your growth path
              </Button>
            </CardBody>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {[
            {
              title: "local insight, global quality",
              body: "ghana-rooted strategy built with world-class creative standards.",
            },
            {
              title: "hands-on team",
              body: "you work directly with strategists and creators, not endless layers.",
            },
            {
              title: "measurable progress",
              body: "weekly reporting tied to reach, qualified leads, and conversion quality.",
            },
          ].map((item) => (
            <Card key={item.title} className="bg-white/80 backdrop-blur border border-slate-200/70 dark:bg-slate-900/70 dark:border-slate-700/80">
              <CardBody className="gap-3">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.body}</p>
              </CardBody>
            </Card>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          className="mt-12"
        >
          <Card className="bg-white/80 backdrop-blur border border-slate-200/70 dark:bg-slate-900/70 dark:border-slate-700/80">
            <CardBody className="gap-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-900 dark:text-slate-100">
                  recent growth wins
                </h2>
                <Chip className="bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-100">proof over promises</Chip>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Card className="bg-white/85 border border-slate-200/70 dark:bg-slate-950/70 dark:border-slate-700/70">
                  <CardBody className="gap-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">campaign sprint</p>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">organic demand boost</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      content + creator rollout designed to increase top-of-funnel reach and qualified traffic.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <Chip className="bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200">+42% organic reach</Chip>
                      <Chip className="bg-cyan-100 text-cyan-900 dark:bg-cyan-900/40 dark:text-cyan-200">3x content saves</Chip>
                    </div>
                  </CardBody>
                </Card>

                <Card className="bg-white/85 border border-slate-200/70 dark:bg-slate-950/70 dark:border-slate-700/70">
                  <CardBody className="gap-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">funnel upgrade</p>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">higher quality leads</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      messaging, seo intent mapping, and conversion cleanup built around buyer behavior.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <Chip className="bg-violet-100 text-violet-900 dark:bg-violet-900/40 dark:text-violet-200">2.3x lead quality</Chip>
                      <Chip className="bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200">60-day delivery window</Chip>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <div className="fixed bottom-4 left-4 right-4 z-50 flex justify-center md:hidden">
          <Button
            as={Link}
            href="https://wa.me/233556877954"
            className="w-full max-w-md bg-white/20 text-slate-900 border border-white/40 backdrop-blur-xl shadow-[0_12px_40px_rgba(15,23,42,0.18)] dark:bg-slate-900/70 dark:text-slate-100 dark:border-slate-700/80"
          >
            chat on WhatsApp
          </Button>
        </div>
      </main>
    </div>
  );
}
