"use client";

import { Card, CardBody } from "@heroui/react";
import { ZyraSiteNav } from "@/components/ZyraSiteNav";
import { ZyraBrandMark } from "@/components/ZyraBrandMark";
import { ZyraSiteFooter } from "@/components/ZyraSiteFooter";

const SECTIONS = [
  {
    title: "what we collect",
    body: "we collect only the information needed to run campaigns, communicate with you, and improve delivery quality.",
  },
  {
    title: "how we use data",
    body: "data is used for campaign execution, analytics, reporting, and service improvement. we do not sell personal data.",
  },
  {
    title: "how we protect data",
    body: "we use access controls, provider-level security tooling, and operational checks to protect campaign and contact data.",
  },
  {
    title: "your choices",
    body: "you can request updates, corrections, or deletion of data we control, subject to legal and operational requirements.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <ZyraSiteNav active="services" brand={<ZyraBrandMark />} />

      <main className="relative mx-auto max-w-4xl px-5 pb-16 pt-10 sm:px-6">
        <Card className="border border-slate-200/70 bg-white/90 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75">
          <CardBody className="gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700 dark:text-cyan-300">
              legal
            </p>
            <h1 className="font-[family-name:var(--font-bricolage)] text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl dark:text-slate-100">
              privacy policy
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              last updated: march 5, 2026
            </p>
          </CardBody>
        </Card>

        <section className="mt-6 grid gap-4">
          {SECTIONS.map((item) => (
            <Card key={item.title} className="border border-slate-200/70 bg-white/90 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75">
              <CardBody className="gap-2">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
                  {item.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.body}</p>
              </CardBody>
            </Card>
          ))}
        </section>
      </main>

      <ZyraSiteFooter />
    </div>
  );
}
