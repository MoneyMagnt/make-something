"use client";

import Script from "next/script";
import { HOME_PHOTOS, getServiceVisual } from "@/lib/brandVisuals";

const SERVICES = [
  {
    title: "seo growth system",
    summary: "capture high-intent demand and convert it into pipeline.",
    outcomes: ["technical cleanup", "intent mapping", "high-conversion pages"],
    tone: "from-cyan-500 to-blue-500",
  },
  {
    title: "content studio",
    summary: "build trust-led content that shortens buying decisions.",
    outcomes: ["campaign concepts", "asset production", "performance loop"],
    tone: "from-emerald-500 to-teal-500",
  },
  {
    title: "influencer strategy",
    summary: "run creator campaigns tied to action, not vanity reach.",
    outcomes: ["creator fit checks", "offer design", "launch operations"],
    tone: "from-indigo-500 to-violet-500",
  },
  {
    title: "founder website sprint",
    summary: "launch a conversion-ready website that supports scaling.",
    outcomes: ["offer positioning", "conversion page flow", "tracking + handoff"],
    tone: "from-amber-500 to-orange-500",
  },
] as const;

const HERO_PANELS = [
  { label: "brand review", title: "offer framing", image: HOME_PHOTOS.strategyMeeting },
  { label: "site presence", title: "conversion surface", image: HOME_PHOTOS.workspaceBlueWall },
  { label: "campaign prep", title: "content planning", image: HOME_PHOTOS.creativeMeetingOffice },
] as const;

const SYSTEM_NOTES = [
  "ai-assisted content with human quality control",
  "sms activation for direct response",
  "data cleaning and segmentation for tighter targeting",
  "weekly analytics with the next move already defined",
] as const;

const RESULTS = [
  {
    title: "faster launch cycles",
    detail: "strategy, visuals, and rollout stay inside one operating rhythm, so momentum shows up sooner.",
  },
  {
    title: "clearer targeting",
    detail: "search intent, audience fit, and offer packaging work together instead of fighting each other.",
  },
  {
    title: "stronger founder presence",
    detail: "the brand feels more considered before the first call, not only after someone reads every section.",
  },
  {
    title: "easier weekly decisions",
    detail: "reporting is built for action, so scaling and course-correction happen faster.",
  },
] as const;

const SERVICE_PAGE_VISUALS: Record<string, string> = {
  "seo growth system": `linear-gradient(155deg,rgba(6,18,40,0.18),rgba(2,6,23,0.76)), url(${HOME_PHOTOS.workspaceBlueWall})`,
  "content studio": `linear-gradient(155deg,rgba(7,22,30,0.18),rgba(2,6,23,0.72)), url(${HOME_PHOTOS.creativeMeetingOffice})`,
  "influencer strategy": `linear-gradient(155deg,rgba(18,22,44,0.16),rgba(2,6,23,0.74)), url(${HOME_PHOTOS.studioTeam})`,
  "founder website sprint": `linear-gradient(155deg,rgba(32,20,7,0.16),rgba(2,6,23,0.74)), url(${HOME_PHOTOS.strategyMeeting})`,
};

export default function ServicesFigmaPreviewPage() {
  const activeService = SERVICES[0];
  const activeVisual = getServiceVisual(activeService.title);

  return (
    <>
      <Script src="https://mcp.figma.com/mcp/html-to-design/capture.js" strategy="afterInteractive" />

      <main className="min-h-screen bg-[#eef3f8] px-8 py-8 text-slate-950">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8">
          <section className="grid gap-8 xl:grid-cols-[0.74fr_1.26fr] xl:items-end">
            <div className="space-y-6">
              <div className="inline-flex rounded-full border border-cyan-200/80 bg-cyan-100/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-900">
                service architecture for visible growth
              </div>

              <div className="space-y-4">
                <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">zyra service studio</p>
                <h1 className="max-w-[10ch] font-[family-name:var(--font-instrument-serif)] text-[5.5rem] leading-[0.9] tracking-[-0.05em]">
                  choose the system that matches the bottleneck.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                  search, content, creators, and founder websites packaged as clear operating systems instead of one long list of marketing tasks.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/88 px-5 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
                  <p className="font-[family-name:var(--font-manrope)] text-2xl font-semibold tracking-[-0.05em]">7300+</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-slate-500">contacts in database</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/88 px-5 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
                  <p className="font-[family-name:var(--font-manrope)] text-2xl font-semibold tracking-[-0.05em]">7 days</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-slate-500">avg kickoff window</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/88 px-5 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
                  <p className="font-[family-name:var(--font-manrope)] text-2xl font-semibold tracking-[-0.05em]">weekly</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-slate-500">reporting rhythm</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2.6rem] border border-slate-200/70 bg-slate-900 shadow-[0_40px_96px_rgba(15,23,42,0.12)]">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HOME_PHOTOS.creativeMeetingOffice})` }} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,22,0.08),rgba(4,10,22,0.18)_30%,rgba(4,10,22,0.72)_70%,rgba(2,6,23,0.9)_100%)]" />

              <div className="relative z-10 flex min-h-[42rem] flex-col justify-between p-7">
                <div className="grid gap-3 md:grid-cols-3">
                  {HERO_PANELS.map((panel, index) => (
                    <div
                      key={panel.label}
                      className={`relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-slate-950/28 backdrop-blur-md ${index === 0 ? "md:col-span-2" : ""}`}
                    >
                      <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: `url(${panel.image})` }} />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,22,0.08),rgba(2,6,23,0.78))]" />
                      <div className="relative z-10 p-4 text-white">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-white/62">{panel.label}</p>
                        <p className="mt-2 font-[family-name:var(--font-manrope)] text-lg font-semibold tracking-[-0.04em]">{panel.title}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-5 rounded-[2rem] border border-white/12 bg-slate-950/58 p-6 text-white shadow-[0_20px_52px_rgba(2,6,23,0.28)] backdrop-blur-xl lg:grid-cols-[0.7fr_0.3fr] lg:items-end">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/62">featured system</p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-white/58">{activeVisual.eyebrow}</p>
                    <h2 className="mt-5 max-w-[9ch] font-[family-name:var(--font-instrument-serif)] text-[3.6rem] leading-[0.92] tracking-[-0.05em]">
                      {activeService.title}
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-8 text-white/78">{activeVisual.caption}</p>
                  </div>
                  <div className="space-y-3">
                    <span className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">open system details</span>
                    <span className={`block h-2.5 w-16 rounded-full bg-gradient-to-r ${activeService.tone}`} />
                    <div className="grid gap-2">
                      {activeService.outcomes.slice(0, 2).map((item) => (
                        <div key={item} className="rounded-[1.2rem] border border-white/10 bg-white/8 px-4 py-3 text-sm text-white/76">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-8 xl:grid-cols-[0.34fr_0.66fr]">
            <div className="space-y-5">
              <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">systems</p>
              <h2 className="max-w-[9ch] font-[family-name:var(--font-instrument-serif)] text-6xl leading-[0.92] tracking-[-0.05em]">
                compare the operating systems.
              </h2>
              <p className="max-w-sm text-base leading-8 text-slate-600">
                this page is about the offers themselves, so every system gets its own surface, promise, and next action.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {SERVICES.map((service, index) => {
                const visual = getServiceVisual(service.title);
                const surfaceBackground = SERVICE_PAGE_VISUALS[service.title] ?? visual.surfaceBackground;

                return (
                  <article
                    key={service.title}
                    className={`overflow-hidden rounded-[1.95rem] border ${index === 0 ? "border-slate-950 bg-slate-950 text-white shadow-[0_30px_72px_rgba(15,23,42,0.14)]" : "border-slate-200/70 bg-white/84 shadow-[0_24px_56px_rgba(15,23,42,0.06)]"}`}
                  >
                    <div className="min-h-[16rem] bg-cover bg-center" style={{ backgroundImage: surfaceBackground }} />
                    <div className="flex flex-col justify-between gap-5 p-6 text-left">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className={`text-[11px] uppercase tracking-[0.18em] ${index === 0 ? "opacity-60" : "text-slate-500"}`}>
                            0{index + 1} / {visual.eyebrow}
                          </p>
                          <span className={`h-2.5 w-16 rounded-full bg-gradient-to-r ${service.tone}`} />
                        </div>
                        <div>
                          <h3 className={`font-[family-name:var(--font-manrope)] text-3xl font-semibold tracking-[-0.05em] ${index === 0 ? "text-inherit" : "text-slate-950"}`}>
                            {service.title}
                          </h3>
                          <p className={`mt-3 text-sm leading-7 ${index === 0 ? "text-white/78" : "text-slate-600"}`}>
                            {service.summary}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {service.outcomes.map((item) => (
                            <span key={item} className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.12em] ${index === 0 ? "bg-white/10 text-white/74" : "bg-slate-100 text-slate-600"}`}>
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className={`text-sm font-semibold uppercase tracking-[0.14em] ${index === 0 ? "text-cyan-300" : "text-cyan-700"}`}>
                        inspect system
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[0.96fr_1.04fr]">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/84 shadow-[0_28px_72px_rgba(15,23,42,0.06)]">
              <div className="grid gap-0 lg:grid-cols-[0.52fr_0.48fr]">
                <div className="min-h-[26rem] bg-cover bg-center" style={{ backgroundImage: `linear-gradient(180deg,rgba(8,15,38,0.08),rgba(2,6,23,0.6)), url(${HOME_PHOTOS.studioTeam})` }} />
                <div className="flex flex-col justify-between gap-5 p-6">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">shared layer</p>
                    <h2 className="mt-3 max-w-[10ch] font-[family-name:var(--font-instrument-serif)] text-5xl leading-[0.94] tracking-[-0.05em]">
                      what every system still needs.
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      even when the offer changes, these support layers keep the system usable and measurable.
                    </p>
                  </div>
                  <div className="grid gap-3">
                    {SYSTEM_NOTES.map((item) => (
                      <div key={item} className="rounded-[1.4rem] bg-slate-100 px-4 py-4 text-sm leading-7 text-slate-700">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {RESULTS.map((item) => (
                <article key={item.title} className="rounded-[1.8rem] border border-slate-200/70 bg-white/84 p-5 shadow-[0_24px_56px_rgba(15,23,42,0.06)]">
                  <p className="font-[family-name:var(--font-manrope)] text-2xl font-semibold tracking-[-0.04em] text-slate-950">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.detail}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
