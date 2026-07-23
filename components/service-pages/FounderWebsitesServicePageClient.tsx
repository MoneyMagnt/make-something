"use client";

import { Button, Card, CardBody, Link } from "@heroui/react";
import { useState } from "react";
import { ZyraSiteNav } from "@/components/ZyraSiteNav";
import { ZyraBrandMark } from "@/components/ZyraBrandMark";
import { ZyraSiteFooter } from "@/components/ZyraSiteFooter";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const BOOK_SPRINT_URL =
  "https://wa.me/233556877954?text=hi%20zyra%2C%20i%20want%20to%20book%20a%20founder%20website%20sprint.";
const TALK_WORK_URL =
  "https://wa.me/233556877954?text=hi%20zyra%2C%20i%20want%20to%20see%20more%20of%20your%20work.";

const problems = [
  ["warning", "No clear offer", "Visitors land and still can't tell what you do, who it's for, or what to do next."],
  ["shield", "No trust signals", "No proof, no case studies, no faces. Just copy that sounds like everyone else's."],
  ["arrow", "No conversion flow", "There's no path from landing to inquiry. People leave without taking any action."],
] as const;

const included = [
  ["clipboard", "Offer positioning", "We define your core message, audience, and value proof before a single page is built."],
  ["layout", "Conversion structure", "Pages built around the decision journey - not just visual aesthetics."],
  ["lightning", "7-day launch", "From brief to live site in 7 days average. No long agency timelines."],
  ["chart", "Analytics baseline", "Tracking set up from day one so you know what's working the moment you go live."],
] as const;

const processSteps = [
  ["01", "Clarity sprint", "Day 1-2. We define your offer, audience, and conversion goal. One clear direction before anything is built."],
  ["02", "Build sprint", "Day 3-6. We structure and build the site around trust, speed, and the action you want visitors to take."],
  ["03", "Launch + optimise", "Day 7+. We go live, set up tracking, and tighten weak sections based on real visitor behaviour."],
] as const;

const fitYes = [
  "You have an offer but no site that explains it clearly",
  "Your current site gets traffic but converts nothing",
  "You want to launch fast without a 6-week agency process",
  "You're based in Ghana or targeting African markets",
  "You want strategy, copy, and build in one place",
];

const fitNo = [
  "You want a site just to 'have a presence' with no conversion goal",
  "You need complex e-commerce or app functionality",
  "You're not ready to move within 7 days of briefing",
];

const faqs = [
  ["How long does the sprint take?", "From signed brief to live site, the average is 7 days. Projects with more pages may take up to 14 days."],
  ["What do I need to provide?", "Your offer details, target audience, and any existing brand assets - logo, colors, photos. We handle positioning, copy, structure, and build."],
  ["Do you only build for Ghana-based founders?", "No. We build for founders anywhere. But we have deep knowledge of the Ghana and West Africa market which is a real advantage if that's your audience."],
  ["What's the investment?", "Pricing is scoped after the growth audit so we match the cost to the actual build requirements. Book the audit to get a clear number - no commitment required."],
  ["Can you redesign an existing site?", "Yes. If your current site isn't converting, we can rebuild it with a conversion-first structure in the same timeline."],
  ["What platforms do you build on?", "We build on whatever best fits the project - static HTML for speed and simplicity, Next.js for more complex needs. We recommend based on your actual requirements, not trends."],
] as const;

const founderWebsiteJsonLd = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Founder Website Sprint",
    serviceType: "Website Design and Conversion Strategy",
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    areaServed: ["Ghana", "West Africa", "Global"],
    url: `${SITE_URL}/services/founder-websites`,
    description:
      "Zyra builds conversion-ready founder websites in Ghana and West Africa. From brief to live in 7 days.",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "services",
        item: `${SITE_URL}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "founder website sprint",
        item: `${SITE_URL}/services/founder-websites`,
      },
    ],
  },
]);

function SectionIntro({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-6 space-y-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">{eyebrow}</p>
      <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-slate-100">
        {title}
      </h2>
    </div>
  );
}

function Icon({ kind }: { kind: string }) {
  if (kind === "shield") return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none"><path d="M12 3.75c2.2 1.82 4.98 2.8 7.85 2.76v4.49c0 4.57-3.08 8.73-7.85 10.25-4.77-1.52-7.85-5.68-7.85-10.25V6.51c2.87.04 5.65-.94 7.85-2.76Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (kind === "arrow") return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none"><path d="M5 7.5h10.5m0 0L12.5 4.5m3 3-3 3M19 16.5H8.5m0 0 3 3m-3-3 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (kind === "clipboard") return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none"><path d="M9 4.75h6m-5.25 0A1.75 1.75 0 0 1 11.5 3h1A1.75 1.75 0 0 1 14.25 4.75m-4.5 0H8.5A2.5 2.5 0 0 0 6 7.25v10.25A2.5 2.5 0 0 0 8.5 20h7A2.5 2.5 0 0 0 18 17.5V7.25a2.5 2.5 0 0 0-2.5-2.5h-1.25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (kind === "layout") return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none"><rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M9 5v14M10.5 10.5H18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
  if (kind === "lightning") return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none"><path d="M13.25 3.75 7.5 12h3.75l-1 8.25L16.5 12h-3.75l.5-8.25Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (kind === "chart") return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none"><path d="M5 19V8m7 11V5m7 14v-7M3.75 19.25h16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none"><path d="M12 3.75 20 18H4l8-14.25Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 9v4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><circle cx="12" cy="16.5" r="1" className="fill-current" /></svg>;
}

export default function FounderWebsitesServicePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: founderWebsiteJsonLd }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(980px_620px_at_12%_-8%,rgba(47,181,205,0.2),transparent),radial-gradient(900px_560px_at_88%_8%,rgba(232,178,74,0.18),transparent),linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(248,250,252,0.98)_45%,rgba(241,245,249,1)_100%)] dark:bg-[radial-gradient(1180px_700px_at_10%_-10%,rgba(47,181,205,0.2),transparent_60%),radial-gradient(980px_560px_at_90%_8%,rgba(232,178,74,0.18),transparent_62%),linear-gradient(180deg,rgba(2,6,23,0.97)_0%,rgba(5,15,32,0.96)_42%,rgba(9,18,34,0.98)_100%)]" />

      <ZyraSiteNav
        active="services"
        brand={<ZyraBrandMark />}
      />

      <main className="relative mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 sm:pb-28 sm:pt-10">
        <section className="mb-10">
          <Card className="overflow-hidden border border-slate-200/80 bg-white/84 shadow-[0_20px_54px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-700/55 dark:bg-slate-950/58">
            <CardBody className="gap-8 p-5 sm:p-7 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-10">
              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">Conversion surface</p>
                  <h1 className="max-w-3xl font-[family-name:var(--font-bricolage)] text-[clamp(2.4rem,7vw,4.85rem)] font-extrabold leading-[0.94] tracking-[-0.04em] text-slate-950 dark:text-white">Your website should be closing deals while you sleep.</h1>
                  <p className="max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-slate-300">Most founder websites explain what you do. Zyra builds websites that make the right people take action - before they ever speak to you.</p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {["7 days avg launch", "Conversion-first structure", "Ghana-built. Globally positioned."].map((item) => (
                    <span key={item} className="rounded-full border border-slate-200/90 bg-white/92 px-3.5 py-2 text-xs font-semibold tracking-[0.08em] text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.06)] dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-slate-200">{item}</span>
                  ))}
                </div>
                <div className="pt-2">
                  <Button as={Link} href={BOOK_SPRINT_URL} target="_blank" rel="noreferrer" className="h-12 border border-cyan-300/80 bg-[linear-gradient(135deg,#2fb5cd,#0f7ea2)] px-6 text-base font-semibold text-white shadow-[0_18px_40px_rgba(47,181,205,0.24)] transition-transform hover:-translate-y-0.5">Book the sprint →</Button>
                  <div className="mt-4">
                    <Link href="#featured-work" className="text-sm font-medium text-slate-700 no-underline transition-colors hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300">See live work ↓</Link>
                  </div>
                </div>
              </div>
              <div className="rounded-[2rem] border border-slate-200/90 bg-[linear-gradient(160deg,rgba(15,23,42,0.98),rgba(8,47,73,0.94))] p-5 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] dark:border-slate-700/55">
                <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-200/80">Sprint signal</p>
                <div className="mt-6 space-y-4">
                  {["Offer clarity before design", "Trust architecture in every section", "WhatsApp action flow from day one"].map((item, index) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
                      <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-[11px] font-semibold text-cyan-100">0{index + 1}</span>
                      <p className="text-sm leading-6 text-slate-200">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-[1.4rem] border border-amber-300/15 bg-[linear-gradient(135deg,rgba(47,181,205,0.12),rgba(232,178,74,0.12))] px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-amber-100/80">Outcome</p>
                  <p className="mt-2 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">A founder site that sells the next step without needing you online.</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </section>

        <section className="mb-12">
          <SectionIntro eyebrow="The gap" title="Most founder websites look busy but convert nothing." />
          <div className="grid gap-4 md:grid-cols-3">
            {problems.map(([kind, title, body]) => (
              <Card key={title} className="border border-slate-200/80 bg-white/88 shadow-[0_16px_36px_rgba(15,23,42,0.06)] backdrop-blur dark:border-slate-700/55 dark:bg-slate-950/58">
                <CardBody className="gap-4 p-5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/85 bg-slate-50 text-slate-900 dark:border-slate-700/60 dark:bg-slate-900 dark:text-slate-100"><Icon kind={kind} /></span>
                  <div className="space-y-2">
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-950 dark:text-slate-100">{title}</h3>
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{body}</p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-center text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">Zyra fixes all three. In one sprint.</p>
        </section>

        <section id="featured-work" className="mb-12 scroll-mt-28">
          <SectionIntro eyebrow="Built by Zyra" title="A founder website. Live and converting." />
          <Card className="group mx-auto max-w-[680px] overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/92 shadow-[0_24px_58px_rgba(15,23,42,0.09)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/90 hover:shadow-[0_28px_70px_rgba(47,181,205,0.16)] dark:border-slate-700/55 dark:bg-slate-950/60 dark:hover:border-cyan-400/45">
            <CardBody className="gap-0 p-0">
              <div className="border-b border-slate-200/80 dark:border-slate-700/55">
                <div className="flex items-center gap-3 border-b border-slate-200/80 bg-slate-100/90 px-4 py-3 dark:border-slate-700/55 dark:bg-slate-900/85">
                  <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-rose-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /></div>
                  <div className="flex-1 rounded-full border border-slate-200/90 bg-white/92 px-3 py-1.5 text-center text-xs font-medium text-slate-500 dark:border-slate-700/60 dark:bg-slate-950/72 dark:text-slate-400">adventuresoflifegh.com</div>
                </div>
                <div className="relative min-h-[220px] overflow-hidden bg-[linear-gradient(160deg,rgba(15,23,42,0.98),rgba(8,47,73,0.94))] p-3 sm:p-4">
                  <img
                    src="/founder-work/adventuresoflifegh-home.webp"
                    alt="Adventures of Life GH homepage screenshot"
                    className="h-full w-full rounded-[1.35rem] border border-white/10 object-cover shadow-[0_20px_48px_rgba(2,6,23,0.22)]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-x-3 bottom-3 rounded-[1.1rem] bg-[linear-gradient(180deg,transparent,rgba(2,6,23,0.88))] p-4 sm:inset-x-4 sm:bottom-4">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200/85">live homepage capture</p>
                        <p className="mt-1 font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white">adventuresoflifegh.com</p>
                      </div>
                      <span className="rounded-full border border-white/18 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                        founder site
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-5 p-5 sm:p-6">
                <span className="inline-flex rounded-full border border-cyan-200/90 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-800 dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-200">Travel &amp; Events · Static HTML · Ghana</span>
                <div className="space-y-3">
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-slate-950 dark:text-slate-100">Adventures of Life GH</h3>
                  <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">A Ghana-rooted visual travel collective built to tell the founder&apos;s origin story, showcase real trip photography, and convert visitors into WhatsApp inquiries. Built on static HTML for fast load times on any connection across Ghana.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Story-driven", "Mobile-first", "WhatsApp integrated"].map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200/90 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700/60 dark:bg-slate-900 dark:text-slate-300">{tag}</span>
                  ))}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Link href="https://adventuresoflifegh.com" target="_blank" rel="noreferrer" className="text-sm font-semibold text-cyan-700 no-underline transition-colors hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200">Visit live site →</Link>
                  <Link href={BOOK_SPRINT_URL} target="_blank" rel="noreferrer" className="text-sm font-semibold text-slate-700 no-underline transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">Book your sprint →</Link>
                </div>
              </div>
            </CardBody>
          </Card>
          <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">More featured work coming soon. <Link href={TALK_WORK_URL} target="_blank" rel="noreferrer" className="font-medium text-cyan-700 no-underline hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200">Talk to us about your project →</Link></p>
        </section>

        <section className="mb-12">
          <SectionIntro eyebrow="What's included" title="Everything needed to go from brief to live in one sprint." />
          <div className="grid gap-4 md:grid-cols-2">
            {included.map(([kind, title, body]) => (
              <Card key={title} className="border border-slate-200/80 bg-white/88 shadow-[0_16px_36px_rgba(15,23,42,0.06)] backdrop-blur dark:border-slate-700/55 dark:bg-slate-950/58">
                <CardBody className="gap-4 p-5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/85 bg-slate-50 text-slate-900 dark:border-slate-700/60 dark:bg-slate-900 dark:text-slate-100"><Icon kind={kind} /></span>
                  <div className="space-y-2">
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-950 dark:text-slate-100">{title}</h3>
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{body}</p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <SectionIntro eyebrow="How it works" title="Three checkpoints. One clear outcome." />
          <div className="grid gap-4 lg:grid-cols-3">
            {processSteps.map(([number, title, body], index) => (
              <div key={number} className="relative">
                {index < processSteps.length - 1 ? <div className="absolute left-7 right-[-1rem] top-7 hidden h-px bg-gradient-to-r from-cyan-300/80 to-transparent lg:block" /> : null}
                <Card className="relative border border-slate-200/80 bg-white/88 shadow-[0_16px_36px_rgba(15,23,42,0.06)] backdrop-blur dark:border-slate-700/55 dark:bg-slate-950/58">
                  <CardBody className="gap-4 p-5">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-200/90 bg-cyan-50 font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-cyan-800 dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-200">{number}</span>
                    <div className="space-y-2">
                      <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-950 dark:text-slate-100">{title}</h3>
                      <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{body}</p>
                    </div>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <SectionIntro eyebrow="Right fit" title="Built for founders who are serious about conversion." />
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="border border-slate-200/80 bg-white/88 shadow-[0_16px_36px_rgba(15,23,42,0.06)] backdrop-blur dark:border-slate-700/55 dark:bg-slate-950/58">
              <CardBody className="gap-4 p-5">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-950 dark:text-slate-100">This is for you if:</h3>
                <div className="space-y-3">
                  {fitYes.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-200/90 bg-emerald-50 text-[12px] font-bold text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-300">✓</span>
                      <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{item}</p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
            <Card className="border border-slate-200/80 bg-white/88 shadow-[0_16px_36px_rgba(15,23,42,0.06)] backdrop-blur dark:border-slate-700/55 dark:bg-slate-950/58">
              <CardBody className="gap-4 p-5">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-950 dark:text-slate-100">This is not for you if:</h3>
                <div className="space-y-3">
                  {fitNo.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-rose-200/90 bg-rose-50 text-[12px] font-bold text-rose-700 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-300">✕</span>
                      <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{item}</p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <SectionIntro eyebrow="Quick answers" title="Before you reach out." />
          <div className="space-y-3">
            {faqs.map(([question, answer], index) => {
              const open = openFaq === index;
              return (
                <Card key={question} className="border border-slate-200/80 bg-white/88 shadow-[0_14px_34px_rgba(15,23,42,0.05)] backdrop-blur dark:border-slate-700/55 dark:bg-slate-950/58">
                  <CardBody className="p-0">
                    <button type="button" className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left" aria-expanded={open} onClick={() => setOpenFaq((current) => (current === index ? null : index))}>
                      <span className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-slate-950 dark:text-slate-100">{question}</span>
                      <span className={`text-slate-500 transition-transform dark:text-slate-400 ${open ? "rotate-180" : ""}`}>⌄</span>
                    </button>
                    {open ? <div className="border-t border-slate-200/80 px-5 py-4 text-sm leading-7 text-slate-600 dark:border-slate-700/55 dark:text-slate-400">{answer}</div> : null}
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mb-4">
          <Card className="overflow-hidden border border-slate-800/90 bg-[linear-gradient(145deg,rgba(2,6,23,0.98),rgba(8,47,73,0.96),rgba(17,24,39,0.98))] text-white shadow-[0_26px_72px_rgba(15,23,42,0.26)]">
            <CardBody className="items-center gap-4 px-5 py-10 text-center sm:px-8 sm:py-12">
              <h2 className="max-w-3xl font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight sm:text-4xl">Ready to build a website that actually converts?</h2>
              <p className="max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">Book the growth audit. We scope the sprint, align on the offer, and move in 7 days.</p>
              <div className="pt-2">
                <Button as={Link} href={BOOK_SPRINT_URL} target="_blank" rel="noreferrer" className="h-12 border border-cyan-300/80 bg-[linear-gradient(135deg,#2fb5cd,#0f7ea2)] px-6 text-base font-semibold text-white shadow-[0_18px_40px_rgba(47,181,205,0.26)] transition-transform hover:-translate-y-0.5">Book the sprint now →</Button>
              </div>
              <p className="text-sm text-slate-300">No commitment. One clear conversation.</p>
            </CardBody>
          </Card>
        </section>
      </main>
      <ZyraSiteFooter />
    </div>
  );
}

