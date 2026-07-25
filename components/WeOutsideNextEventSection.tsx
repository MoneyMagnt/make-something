"use client";

import { Button, Card, CardBody, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import { EventsBrandMark } from "@/components/EventsBrandMark";

type WeOutsideNextEventSectionProps = {
  onOpenVenus: () => void;
};

export function WeOutsideNextEventSection({
  onOpenVenus,
}: WeOutsideNextEventSectionProps) {
  return (
    <section
      aria-labelledby="we-outside-next-event"
      className="relative left-1/2 w-[100dvw] -translate-x-1/2 overflow-hidden bg-[#150333] text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_10%_35%,rgba(236,72,153,0.32),transparent_28%),radial-gradient(circle_at_88%_24%,rgba(34,211,238,0.25),transparent_30%),linear-gradient(145deg,#150333_0%,#2e0869_48%,#07356f_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-24 top-16 h-72 w-72 rounded-full border-[2.5rem] border-orange-400/20 bg-pink-500/10 shadow-[inset_0_0_0_1.3rem_rgba(255,235,59,0.08)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 bottom-8 h-80 w-80 rounded-full border-[2.8rem] border-cyan-300/16 bg-blue-500/12 shadow-[inset_0_0_0_1.5rem_rgba(255,255,255,0.06)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-300/70 to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-[96rem] px-5 pb-10 pt-14 sm:px-8 sm:pb-12 sm:pt-20 lg:px-16 xl:px-20">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <Chip className="border border-cyan-200/70 bg-cyan-300 px-2 font-black uppercase tracking-[0.18em] text-violet-950">
              the night continues
            </Chip>
            <h2
              id="we-outside-next-event"
              className="mt-6 max-w-2xl font-[family-name:var(--font-bricolage)] text-[clamp(3.4rem,8vw,7rem)] font-black leading-[0.82] tracking-[-0.075em]"
            >
              <span className="block text-white">more nights.</span>
              <span className="mt-3 block font-[family-name:var(--font-instrument-serif)] italic tracking-[-0.04em] text-yellow-300">
                same pulse.
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-base font-medium leading-7 text-white/76 sm:text-lg">
              We Outside owns the shore. VENUS takes the Zyra energy after dark
              with a different sound, mood, and crowd.
            </p>
            <Button
              className="mt-7 min-h-12 w-full border border-pink-200 bg-pink-500 px-8 text-base font-black text-white shadow-[0_14px_0_rgba(10,2,38,0.55)] transition-transform hover:-translate-y-1 sm:w-fit"
              onPress={onOpenVenus}
            >
              step into VENUS
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28, rotate: 1.5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 1.5 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.62, delay: 0.08, ease: "easeOut" }}
          >
            <Card className="overflow-hidden border border-fuchsia-300/40 bg-[linear-gradient(145deg,rgba(76,29,149,0.92),rgba(17,24,76,0.96))] shadow-[0_34px_80px_rgba(5,2,31,0.5)]">
              <CardBody className="relative gap-0 overflow-hidden p-0">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(244,114,182,0.42),transparent_30%),radial-gradient(circle_at_15%_86%,rgba(34,211,238,0.24),transparent_32%)]"
                />
                <div className="relative grid min-h-[31rem] items-end p-6 sm:min-h-[28rem] sm:p-9">
                  <div className="absolute right-4 top-4 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white/82 backdrop-blur-md sm:right-7 sm:top-7">
                    zyra after dark
                  </div>
                  <div
                    aria-hidden="true"
                    className="absolute -right-20 top-14 h-64 w-64 rounded-full border-[2rem] border-white/10 bg-fuchsia-500/20"
                  />
                  <div className="absolute left-1/2 top-[38%] w-full -translate-x-1/2 -translate-y-1/2 px-4 text-center sm:top-1/2 sm:-translate-y-[62%]">
                    <p className="bg-gradient-to-r from-cyan-300 via-white to-pink-300 bg-clip-text font-[family-name:var(--font-bricolage)] text-[clamp(4.7rem,11vw,9rem)] font-black leading-none tracking-[-0.09em] text-transparent drop-shadow-[0_20px_30px_rgba(3,2,28,0.5)]">
                      VENUS
                    </p>
                    <p className="mt-2 text-xs font-black uppercase tracking-[0.42em] text-white/58 sm:text-sm">
                      accra after dark
                    </p>
                  </div>
                  <div className="relative flex flex-wrap items-end justify-between gap-5 border-t border-white/18 pt-5">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
                        another zyra experience
                      </p>
                      <p className="mt-2 font-[family-name:var(--font-bricolage)] text-2xl font-black text-white sm:text-3xl">
                        the energy moves after dark.
                      </p>
                    </div>
                    <Button
                      className="min-h-11 border border-white/35 bg-white/12 px-5 font-bold text-white backdrop-blur-md"
                      onPress={onOpenVenus}
                    >
                      view experience
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/14 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-fit rounded-full border border-white/15 bg-white/8 px-3 py-2 backdrop-blur-md">
            <EventsBrandMark size="compact" />
          </div>
          <p className="max-w-md text-sm font-semibold leading-6 text-white/55 sm:text-right">
            music, culture, community, and nights built to be remembered.
          </p>
        </div>
      </div>
    </section>
  );
}
