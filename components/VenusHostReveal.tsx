"use client";

import { Button, Link } from "@heroui/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const HOST_PROFILE_URL = "https://www.snapchat.com/@itzz_peaceee";

function SnapchatGlyph() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="h-4 w-4 fill-current"
    >
      <path d="M16 3.2c-4.3 0-7.6 3.4-7.6 7.8 0 1.2.1 2.2.2 3.1-.7.4-1.6.8-2.3.9-.8.1-1.3.7-1.2 1.4.1.8.9 1.2 2.6 1.8.5.2.8.8.9 1.6.1.8.7 1.1 1.5 1.2 1.2.2 2.3.3 3.1.9.9.7 1.8 1 3.3 1s2.4-.3 3.3-1c.8-.6 1.9-.7 3.1-.9.8-.1 1.4-.4 1.5-1.2.1-.8.4-1.4.9-1.6 1.7-.6 2.5-1 2.6-1.8.1-.7-.4-1.3-1.2-1.4-.7-.1-1.6-.5-2.3-.9.1-.9.2-1.9.2-3.1 0-4.4-3.3-7.8-7.6-7.8Z" />
    </svg>
  );
}

export function VenusHostReveal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const closeReveal = useCallback(() => {
    setIsOpen(false);
    window.setTimeout(() => setIsRevealed(false), prefersReducedMotion ? 0 : 300);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeReveal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeReveal, isOpen]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 18, scale: 0.92 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 0.85, duration: prefersReducedMotion ? 0 : 0.45 }}
        className="absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-30 sm:right-6 sm:top-[max(1.5rem,env(safe-area-inset-top))]"
      >
        <Button
          onPress={() => setIsOpen(true)}
          aria-label="Open the VENUS host reveal"
          className="group relative isolate min-h-12 overflow-hidden border-2 border-white/90 bg-[linear-gradient(135deg,#f5fa78_0%,#ffffff_28%,#7de8e7_51%,#ff65ad_76%,#ffffff_100%)] px-4 text-[#123b55] shadow-[0_7px_0_#123b55,0_16px_30px_rgba(18,59,85,0.25)] sm:min-h-14 sm:px-5"
        >
          <motion.span
            aria-hidden="true"
            className="absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-18deg] bg-white/75 blur-sm"
            animate={{ x: ["0%", "450%"] }}
            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }}
          />
          <span className="relative z-10 flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full border border-[#123b55]/15 bg-[#fffc00] shadow-inner">
              <SnapchatGlyph />
            </span>
            <span className="text-left leading-none">
              <span className="block text-[10px] font-black uppercase tracking-[0.22em] sm:text-[11px]">
                host reveal
              </span>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.14em] text-[#123b55]/70">
                tap to open
              </span>
            </span>
          </span>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="VENUS host reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.28 }}
            className="absolute inset-0 z-50 grid place-items-center overflow-hidden bg-[#123b55]/84 px-4 py-[max(4.5rem,env(safe-area-inset-top))] backdrop-blur-xl sm:px-6"
          >
            <motion.div
              aria-hidden="true"
              className="absolute -inset-[28%] [background:conic-gradient(from_40deg_at_50%_50%,#f5fa78,#65dcdf,#ffffff,#ff5daf,#f5fa78)] opacity-50 blur-3xl"
              animate={{ rotate: [0, 360], scale: [1, 1.12, 1] }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.32)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.32)_1px,transparent_1px)] [background-size:42px_42px]"
            />

            <Button
              isIconOnly
              onPress={closeReveal}
              aria-label="Close host reveal"
              className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-30 h-11 min-h-11 w-11 min-w-11 rounded-full border border-white/50 bg-[#123b55]/75 text-2xl text-white shadow-lg backdrop-blur-md sm:right-6"
            >
              <span aria-hidden="true">&times;</span>
            </Button>

            <motion.div
              initial={{ y: 34, scale: 0.78, rotate: -4 }}
              animate={{ y: 0, scale: 1, rotate: 0 }}
              exit={{ y: 28, scale: 0.84, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="relative z-10 w-full max-w-[20rem] sm:max-w-[23rem]"
            >
              <motion.div
                animate={{ rotateY: isRevealed ? 180 : 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.72, ease: [0.2, 0.75, 0.2, 1] }}
                className="relative aspect-[4/5] w-full [transform-style:preserve-3d]"
              >
                <Button
                  onPress={() => setIsRevealed(true)}
                  aria-label="Reveal the VENUS host"
                  className={`absolute inset-0 h-full w-full overflow-hidden rounded-[1.75rem] border-2 border-white/85 bg-transparent p-0 shadow-[0_32px_80px_rgba(0,0,0,0.42),0_0_0_7px_rgba(245,250,120,0.16)] [backface-visibility:hidden] ${
                    isRevealed ? "pointer-events-none" : "pointer-events-auto"
                  }`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_16%,rgba(245,250,120,0.98),transparent_28%),radial-gradient(circle_at_82%_84%,rgba(245,0,150,0.86),transparent_34%),linear-gradient(145deg,#58d2db_0%,#ffffff_45%,#f5fa78_100%)]" />
                  <motion.div
                    aria-hidden="true"
                    className="absolute -left-1/3 top-0 h-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/80 to-transparent blur-md"
                    animate={{ x: ["0%", "320%"] }}
                    transition={{ duration: 2.1, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
                  />
                  <div className="absolute inset-5 rounded-[1.25rem] border border-white/75 [background:repeating-conic-gradient(from_45deg,rgba(255,255,255,0.4)_0_12.5%,rgba(0,169,214,0.12)_0_25%)] [background-size:58px_58px]" />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4">
                    <span className="rounded-full border border-white/80 bg-white/55 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#123b55] backdrop-blur-md">
                      host reveal
                    </span>
                    <span className="rounded-full border border-white/80 bg-white/55 px-3 py-1.5 backdrop-blur-md">
                      <Image
                        src="/VENUS_logo.PNG"
                        alt=""
                        width={88}
                        height={32}
                        className="h-4 w-auto object-contain"
                      />
                    </span>
                  </div>
                  <div className="absolute inset-0 grid place-items-center p-8 text-center">
                    <motion.div
                      animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                      className="grid h-28 w-28 place-items-center rounded-full border-4 border-white/80 bg-[#fffc00] text-[#123b55] shadow-[0_18px_40px_rgba(18,59,85,0.24)] sm:h-32 sm:w-32"
                    >
                      <SnapchatGlyph />
                    </motion.div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-left text-[#123b55]">
                    <p className="font-[family-name:var(--font-space-grotesk)] text-2xl font-black uppercase tracking-[-0.02em] sm:text-3xl">
                      tap to reveal
                    </p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#123b55]/70">
                      meet the face of venus
                    </p>
                  </div>
                </Button>

                <Button
                  as={Link}
                  href={HOST_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Peace's Snapchat profile"
                  className={`absolute inset-0 h-full w-full overflow-hidden rounded-[1.75rem] border-2 border-white/90 bg-[#123b55] p-0 text-left shadow-[0_32px_80px_rgba(0,0,0,0.42),0_0_0_7px_rgba(255,252,0,0.18)] [backface-visibility:hidden] [transform:rotateY(180deg)] ${
                    isRevealed ? "pointer-events-auto" : "pointer-events-none"
                  }`}
                >
                  <Image
                    src="/events/venus/host-peace.jpg"
                    alt="Peace, the VENUS host"
                    fill
                    priority
                    sizes="(max-width: 640px) 320px, 368px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,59,85,0.03),rgba(18,59,85,0.05)_45%,rgba(18,59,85,0.92)_100%)]" />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4">
                    <span className="rounded-full border border-white/70 bg-[#fffc00] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#123b55] shadow-lg">
                      your host
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/70 bg-[#fffc00] text-[#123b55] shadow-lg">
                      <SnapchatGlyph />
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="font-[family-name:var(--font-space-grotesk)] text-3xl font-black sm:text-4xl">
                      Peace
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-[#f5fa78]">
                      @itzz_peaceee
                    </p>
                    <span className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/65 bg-[#fffc00] px-4 py-2 text-[11px] font-black uppercase tracking-[0.15em] text-[#123b55] shadow-lg">
                      <SnapchatGlyph />
                      tap to meet the host
                    </span>
                  </div>
                </Button>
              </motion.div>

              <p aria-live="polite" className="mt-5 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white/85">
                {isRevealed ? "tap peace to open snapchat" : "one tap reveals the host"}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
