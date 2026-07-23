"use client";

import { Button, Chip, Link } from "@heroui/react";
import { motion } from "framer-motion";
import NextImage from "next/image";

const CREATIVE_ROLES = [
  {
    label: "influencers",
    tone: "bg-orange-500/90 border-orange-300/80",
    message:
      "Hi We Outside team, I'm interested in joining the We Outside creative team as an influencer. I'd love to help promote the event and build audience excitement. Please share the requirements and next steps.",
  },
  {
    label: "DJs",
    tone: "bg-pink-600/90 border-pink-300/80",
    message:
      "Hi We Outside team, I'm a DJ interested in performing at We Outside. I'd love to share my mixes and profile and discuss how I can contribute to the experience. Please send the requirements and next steps.",
  },
  {
    label: "MCs",
    tone: "bg-amber-500/90 border-amber-200/80",
    message:
      "Hi We Outside team, I'm an MC interested in joining We Outside. I'd love to share my hosting portfolio and discuss how I can bring energy to the experience. Please send the requirements and next steps.",
  },
  {
    label: "videographers",
    tone: "bg-teal-500/90 border-teal-200/80",
    message:
      "Hi We Outside team, I'm a videographer interested in working with We Outside. I'd love to help capture the event and share my portfolio. Please send the requirements and next steps.",
  },
  {
    label: "content creators",
    tone: "bg-violet-600/90 border-violet-300/80",
    message:
      "Hi We Outside team, I'm a content creator interested in joining the We Outside creative team. I'd love to help tell the event story before, during, and after the experience. Please share the requirements and next steps.",
  },
  {
    label: "designers",
    tone: "bg-rose-600/90 border-rose-300/80",
    message:
      "Hi We Outside team, I'm a designer interested in contributing to We Outside. I'd love to share my portfolio and help shape the visual identity of the experience. Please send the requirements and next steps.",
  },
  {
    label: "models",
    tone: "bg-red-600/90 border-red-300/80",
    message:
      "Hi We Outside team, I'm a model interested in joining the We Outside campaign. I'd love to share my portfolio and learn about the available opportunities. Please send the requirements and next steps.",
  },
  {
    label: "volunteers",
    tone: "bg-fuchsia-700/90 border-fuchsia-300/80",
    message:
      "Hi We Outside team, I'd like to volunteer for the next We Outside experience. I'm ready to support the team wherever needed. Please share the available roles, requirements, and next steps.",
  },
];

const CREATIVE_TEAM_WHATSAPP_NUMBER = "233540903201";
const buildRoleWhatsAppUrl = (message: string) =>
  `https://wa.me/${CREATIVE_TEAM_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

type WeOutsideCampaignSectionProps = {
  firstAccessUrl: string;
  onFirstAccess: () => void;
};

export function WeOutsideCampaignSection({
  firstAccessUrl,
  onFirstAccess,
}: WeOutsideCampaignSectionProps) {
  return (
    <section id="event-actions" className="mb-8 scroll-mt-24">
      <div className="relative isolate overflow-hidden rounded-[2rem] border border-orange-300/70 bg-[#2d0871] text-white shadow-[0_34px_90px_rgba(72,20,126,0.38)] sm:rounded-[2.5rem]">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[48rem] opacity-95"
          style={{
            background:
              "radial-gradient(circle at 72% 4%, rgba(255,238,108,0.98) 0 5%, rgba(255,175,29,0.92) 6% 12%, transparent 13%), repeating-conic-gradient(from -12deg at 72% 4%, rgba(255,214,48,0.36) 0deg 7deg, rgba(255,105,23,0.08) 7deg 15deg), linear-gradient(145deg, #ef1f4e 0%, #ff7a18 47%, #ffb30f 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 top-[31rem] bg-[radial-gradient(circle_at_12%_12%,rgba(205,45,255,0.52),transparent_28%),radial-gradient(circle_at_92%_86%,rgba(0,211,255,0.28),transparent_34%),linear-gradient(180deg,rgba(58,5,128,0.92),#21054f_68%,#150333)]"
        />
        <div aria-hidden="true" className="absolute -left-20 top-[27rem] h-56 w-56 rounded-full border-[2.2rem] border-white/16 bg-red-500/40 shadow-[inset_0_0_0_1.2rem_rgba(255,255,255,0.12)]" />
        <div aria-hidden="true" className="absolute -right-28 top-[43rem] h-72 w-72 rounded-full border-[2.7rem] border-white/15 bg-cyan-400/35 shadow-[inset_0_0_0_1.5rem_rgba(255,255,255,0.1)]" />

        <div className="relative z-10 p-5 sm:p-8 lg:p-12">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
            <Chip className="border border-yellow-200/80 bg-yellow-300 px-2 font-bold uppercase tracking-[0.18em] text-violet-950 shadow-[0_10px_24px_rgba(72,20,126,0.2)]">
              beyond the shore
            </Chip>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/82">
              a +233events experience
            </p>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="max-w-xl"
            >
              <NextImage
                src="/Weoutside.logo.org2.png"
                alt="We Outside Beyond The Shore"
                width={524}
                height={744}
                priority
                sizes="(max-width: 1024px) 180px, 210px"
                className="mb-2 h-auto w-36 drop-shadow-[0_18px_22px_rgba(48,6,102,0.48)] sm:w-44 lg:w-52"
              />
              <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-cyan-200">
                expect more. be outside.
              </p>
              <h1 className="font-[family-name:var(--font-bricolage)] text-[clamp(3.4rem,10vw,7rem)] font-black leading-[0.82] tracking-[-0.075em] text-white drop-shadow-[0_9px_0_rgba(46,3,105,0.5)]">
                <span className="block">WE</span>
                <span className="block">OUTSIDE</span>
                <span className="mt-3 block font-[family-name:var(--font-instrument-serif)] italic tracking-[-0.04em] text-yellow-300">
                  is back.
                </span>
              </h1>
              <p className="mt-6 max-w-[38rem] text-base font-medium leading-7 text-white/88 sm:text-lg">
                We Outside returns this year, bigger, bolder, and more immersive.
                We&apos;re building a beachfront festival where people, culture,
                music, and community meet.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  as={Link}
                  href={firstAccessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-12 w-full border border-yellow-200 bg-yellow-300 px-7 text-base font-black text-violet-950 shadow-[0_14px_0_rgba(83,16,146,0.7)] transition-transform hover:-translate-y-1 sm:w-fit"
                  onPress={onFirstAccess}
                >
                  get first access
                </Button>
                <Button
                  as={Link}
                  href="https://www.instagram.com/weoutside.233/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-12 w-full border border-white/55 bg-white/14 px-7 text-base font-bold text-white backdrop-blur-md transition-colors hover:bg-white/24 sm:w-fit"
                >
                  follow @weoutside.233
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 28, rotate: 1.5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 1.5 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ duration: 0.62, delay: 0.08, ease: "easeOut" }}
              className="mx-auto w-full max-w-[35rem] lg:mr-1"
            >
              <div className="mb-3">
                <p className="font-[family-name:var(--font-bricolage)] text-lg font-black uppercase tracking-[0.08em] text-violet-950">
                  the return announcement
                </p>
              </div>
              <Link
                href="/events/we-outside/return-announcement.png"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open the We Outside return announcement poster at full size"
                className="block overflow-hidden rounded-[1.6rem] border-[0.4rem] border-white bg-violet-950 shadow-[0_28px_60px_rgba(45,8,113,0.5)] transition-transform hover:-translate-y-1"
              >
                <NextImage
                  src="/events/we-outside/return-announcement.png"
                  alt="We Outside returns this year announcement poster"
                  width={1080}
                  height={1536}
                  sizes="(max-width: 1024px) 92vw, 560px"
                  className="h-auto w-full"
                />
              </Link>
              <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-violet-950/75">
                tap the poster to view it full size
              </p>
            </motion.div>
          </div>

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-yellow-300/80 to-transparent sm:my-16" />

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-300">
                calling creative minds
              </p>
              <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-bricolage)] text-4xl font-black leading-[0.95] tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
                Help us build what happens beyond the shore.
              </h2>
              <p className="mt-5 max-w-[40rem] text-base leading-7 text-white/78 sm:text-lg">
                We&apos;re opening the team to people who can shape the sound,
                story, look, and energy of the next We Outside experience.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {CREATIVE_ROLES.map((role) => (
                  <Button
                    key={role.label}
                    as={Link}
                    href={buildRoleWhatsAppUrl(role.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Connect with We Outside on WhatsApp as ${role.label}`}
                    className={`h-auto min-h-12 w-full max-w-full justify-center overflow-hidden whitespace-normal border px-1 py-2 text-center text-[11px] font-black uppercase leading-tight tracking-[0.02em] text-white shadow-[0_9px_20px_rgba(10,2,38,0.2)] transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-violet-950 [&>span]:whitespace-normal [&>span]:text-center sm:px-2 sm:text-sm sm:tracking-[0.04em] ${role.tone}`}
                  >
                    {role.label}
                  </Button>
                ))}
              </div>

              <Button
                as={Link}
                href="mailto:pluss233events@gmail.com?subject=We%20Outside%20Creative%20Team"
                className="mt-7 min-h-12 w-full border border-cyan-200 bg-cyan-300 px-7 text-base font-black text-violet-950 shadow-[0_14px_0_rgba(13,18,98,0.56)] transition-transform hover:-translate-y-1 sm:w-fit"
              >
                join the creative team
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -28, rotate: -1.5 }}
              whileInView={{ opacity: 1, x: 0, rotate: -1.5 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ duration: 0.62, delay: 0.08, ease: "easeOut" }}
              className="order-1 mx-auto w-full max-w-[32rem] lg:order-2 lg:ml-auto"
            >
              <div className="mb-3">
                <p className="font-[family-name:var(--font-bricolage)] text-lg font-black uppercase tracking-[0.08em] text-yellow-300">
                  join the movement
                </p>
              </div>
              <Link
                href="/events/we-outside/volunteer-call.png"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open the We Outside volunteer call poster at full size"
                className="block overflow-hidden rounded-[1.6rem] border-[0.4rem] border-yellow-300 bg-violet-950 shadow-[0_28px_60px_rgba(10,2,38,0.58)] transition-transform hover:-translate-y-1"
              >
                <NextImage
                  src="/events/we-outside/volunteer-call.png"
                  alt="We Outside call for volunteers and creative team members"
                  width={1080}
                  height={1536}
                  sizes="(max-width: 1024px) 92vw, 512px"
                  className="h-auto w-full"
                />
              </Link>
              <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-white/58">
                tap the poster to view it full size
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
