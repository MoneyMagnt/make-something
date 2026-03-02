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

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[radial-gradient(1100px_600px_at_10%_-10%,rgba(15,23,42,0.35),transparent),radial-gradient(900px_500px_at_90%_10%,rgba(59,130,246,0.28),transparent)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-55 mix-blend-multiply"
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
        <span className="relative font-[family-name:var(--font-space-grotesk)] text-[22vw] leading-none font-extrabold text-slate-900/40">
          <span className="absolute inset-0 blur-[16px] text-slate-900/30">ZYRA</span>
          <span className="bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-transparent bg-clip-text text-transparent">
            ZYRA
          </span>
        </span>
      </motion.div>
      <Navbar className="bg-transparent">
        <NavbarBrand className="flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-900">
          zyra
          <Chip className="bg-slate-900 text-white">gh</Chip>
        </NavbarBrand>
        <NavbarContent justify="end" />
      </Navbar>

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-12">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr]"
        >
          <div className="flex flex-col gap-6">
            <h1 className="font-[family-name:var(--font-bricolage)] text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900">
              we build demand, not noise.
            </h1>
            <p className="text-lg text-slate-700">
              zyra is ghana’s ai‑powered marketing studio — data analytics, seo, content,
              and influencer strategy built to turn attention into revenue.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                as={Link}
                href="https://wa.me/233556877954"
                className="bg-white/25 text-slate-900 border border-white/50 backdrop-blur-2xl shadow-[0_18px_50px_rgba(15,23,42,0.18)]"
              >
                book a strategy call
              </Button>
              <Button
                as={Link}
                href="/visitor"
                variant="flat"
                className="bg-white/25 text-slate-900 border border-white/50 backdrop-blur-2xl shadow-[0_18px_50px_rgba(15,23,42,0.18)]"
              >
                view our events
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-slate-700">
              <Chip className="bg-black/10 text-slate-900">ai‑first growth systems</Chip>
              <Chip className="bg-black/10 text-slate-900">luxury‑grade creative</Chip>
              <Chip className="bg-black/10 text-slate-900">ghana‑rooted, global taste</Chip>
            </div>
          </div>

          <Card className="bg-white/80 backdrop-blur border border-slate-200/70">
            <CardBody className="gap-5">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-900">
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
                    className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                      {item.icon}
                    </div>
                    <span className="text-slate-700">{item.title}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {[
            {
              title: "strategy that converts",
              body: "we audit your funnel, identify leaks, and build a plan that compounds every month.",
            },
            {
              title: "content with a pulse",
              body: "from social to long‑form, we build campaigns people actually share.",
            },
            {
              title: "influencers with real pull",
              body: "we activate talent that moves culture — not just numbers.",
            },
          ].map((item) => (
            <Card key={item.title} className="bg-white/80 backdrop-blur border border-slate-200/70">
              <CardBody className="gap-3">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm">{item.body}</p>
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
          <Card className="bg-white/80 backdrop-blur border border-slate-200/70">
            <CardBody className="gap-4">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-900">
                how our ai stack works
              </h2>
              <div className="grid gap-3 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span>insight engine</span>
                  <Chip className="bg-slate-900 text-white">audience + market</Chip>
                </div>
                <div className="flex items-center justify-between">
                  <span>growth model</span>
                  <Chip className="bg-slate-900 text-white">seo + content</Chip>
                </div>
                <div className="flex items-center justify-between">
                  <span>activation layer</span>
                  <Chip className="bg-slate-900 text-white">influencers + ads</Chip>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-white/80 backdrop-blur border border-slate-200/70">
            <CardBody className="gap-4">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-900">
                impact snapshot
              </h2>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">organic reach</span>
                  <span className="text-slate-900 font-semibold">+42% in 60 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">lead quality</span>
                  <span className="text-slate-900 font-semibold">2.3x higher</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">content saves</span>
                  <span className="text-slate-900 font-semibold">3x avg</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          <Card className="bg-white/80 backdrop-blur border border-slate-200/70">
            <CardBody className="gap-3">
              <p className="text-slate-600 text-sm">client note</p>
              <p className="text-lg text-slate-900 font-semibold">
                “zyra made our brand feel premium and measurable. we saw real traction in weeks.”
              </p>
              <p className="text-sm text-slate-500">— founder, accra</p>
            </CardBody>
          </Card>
          <Card className="bg-white/80 backdrop-blur border border-slate-200/70">
            <CardBody className="gap-3">
              <p className="text-slate-600 text-sm">influencer partner</p>
              <p className="text-lg text-slate-900 font-semibold">
                “they don’t just run campaigns — they build movements.”
              </p>
              <p className="text-sm text-slate-500">— creator network lead</p>
            </CardBody>
          </Card>
        </motion.section>

        <div className="fixed bottom-4 left-4 right-4 z-50 flex justify-center md:hidden">
          <Button
            as={Link}
            href="https://wa.me/233556877954"
            className="w-full max-w-md bg-white/20 text-slate-900 border border-white/40 backdrop-blur-xl shadow-[0_12px_40px_rgba(15,23,42,0.18)]"
          >
            chat on WhatsApp
          </Button>
        </div>
      </main>
    </div>
  );
}
