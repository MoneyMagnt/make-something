"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";

type EventWildcardRevealProps = {
  logoSrc: string;
  teaserImageSrc: string;
  revealImageSrc: string;
  revealVideoSrc?: string;
  revealName: string;
  revealRole?: string;
  compact?: boolean;
  forceRevealed?: boolean;
};

type RevealStage = "sealed" | "revealed" | "experience";

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M8 6.5v11l9-5.5-9-5.5Z" />
    </svg>
  );
}

export function EventWildcardReveal({
  logoSrc,
  teaserImageSrc,
  revealImageSrc,
  revealVideoSrc,
  revealName,
  compact = false,
  forceRevealed = false,
}: EventWildcardRevealProps) {
  const [stage, setStage] = useState<RevealStage>(forceRevealed ? "revealed" : "sealed");
  const [hasStartedExperience, setHasStartedExperience] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const panelLabel = useMemo(() => {
    if (stage === "sealed") return "reveal wildcard mc";
    if (stage === "revealed") return "open wildcard experience";
    return "reset wildcard card";
  }, [stage]);

  useEffect(() => {
    if (forceRevealed && stage === "sealed") {
      setStage("revealed");
    }
  }, [forceRevealed, stage]);

  const handleAdvance = () => {
    if (stage === "sealed") {
      setStage("revealed");
      return;
    }

    if (stage === "revealed") {
      flushSync(() => {
        setHasStartedExperience(false);
        setStage("experience");
      });

      const player = videoRef.current;
      if (player) {
        player.muted = false;
        player.currentTime = 0;
        const playPromise = player.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise
            .then(() => {
              setHasStartedExperience(true);
            })
            .catch(() => {
              setHasStartedExperience(false);
            });
        } else {
          setHasStartedExperience(true);
        }
      }
      return;
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setHasStartedExperience(false);
    setStage(forceRevealed ? "revealed" : "sealed");
  };

  const handleStartExperience = async () => {
    const player = videoRef.current;
    if (!player) {
      return;
    }

    player.muted = false;
    player.currentTime = 0;

    try {
      await player.play();
      setHasStartedExperience(true);
    } catch {
      setHasStartedExperience(false);
    }
  };

  const chipLabel =
    stage === "revealed"
      ? "tap for the experience"
      : "tap to reset";

  return (
    <div
      className={`relative w-full overflow-hidden rounded-[1.45rem] border border-slate-200/85 bg-white/94 shadow-[0_16px_34px_rgba(15,23,42,0.08)] ${
        compact ? "min-h-[14rem]" : "min-h-[22rem]"
      }`}
    >
      <div className={`relative overflow-hidden bg-slate-950 ${compact ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
        {stage === "experience" ? (
          <>
            <img
              alt={revealName}
              src={revealImageSrc}
              className="absolute inset-0 h-full w-full scale-110 object-cover blur-[20px]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(2,6,23,0.88),rgba(15,23,42,0.45),rgba(2,6,23,0.92))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(217,70,239,0.18),transparent_28%)]" />

            <div className="absolute inset-0 flex items-center justify-center px-3 py-4 sm:px-4">
              <div className="w-full max-w-[9.2rem] overflow-hidden rounded-[1.1rem] border border-white/24 bg-slate-950/95 shadow-[0_24px_48px_rgba(2,6,23,0.5)] sm:max-w-[10.2rem]">
                <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">
                    live experience
                  </span>
                  <span className="inline-flex h-2 w-2 rounded-full bg-rose-400" />
                </div>
                {revealVideoSrc ? (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      src={revealVideoSrc}
                      className="aspect-[360/682] w-full bg-slate-950 object-cover"
                      autoPlay
                      controls
                      loop
                      playsInline
                      preload="metadata"
                      poster={revealImageSrc}
                    />
                    {!hasStartedExperience ? (
                      <button
                        type="button"
                        onClick={handleStartExperience}
                        className="absolute inset-0 flex items-center justify-center bg-slate-950/38"
                      >
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-950 shadow-[0_10px_22px_rgba(15,23,42,0.18)]">
                          <PlayGlyph />
                          play with sound
                        </span>
                      </button>
                    ) : null}
                  </div>
                ) : (
                  <img
                    alt={revealName}
                    src={revealImageSrc}
                    className="aspect-[360/682] w-full object-cover"
                  />
                )}
              </div>
            </div>

            <button
              type="button"
              aria-label={panelLabel}
              onClick={handleAdvance}
              className="absolute inset-x-0 bottom-0 flex items-center justify-start p-3 text-left sm:p-4"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/24 bg-white/16 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                <PlayGlyph />
                {chipLabel}
              </span>
            </button>
          </>
        ) : (
          <button
            type="button"
            aria-label={panelLabel}
            onClick={handleAdvance}
            className="absolute inset-0 h-full w-full text-left"
          >
            <img
              alt={stage === "sealed" ? "Wildcard teaser art" : revealName}
              src={stage === "sealed" ? teaserImageSrc : revealImageSrc}
              className="h-full w-full object-cover"
            />
            <div
              className={`absolute inset-0 ${
                stage === "sealed"
                  ? "bg-[linear-gradient(180deg,rgba(2,6,23,0.08),rgba(2,6,23,0.16)_44%,rgba(2,6,23,0.82)_100%)]"
                  : "bg-[linear-gradient(180deg,rgba(2,6,23,0.08),rgba(2,6,23,0.18)_42%,rgba(2,6,23,0.86)_100%)]"
              }`}
            />
          </button>
        )}

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(217,70,239,0.16),transparent_28%)]" />

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3 sm:p-4">
          <span className="inline-flex rounded-full border border-white/24 bg-white/18 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
            wild card
          </span>
          <div className="inline-flex rounded-full border border-white/24 bg-white/18 px-3 py-1 backdrop-blur-md">
            <img alt="Venus logo" src={logoSrc} className="h-4 w-auto object-contain opacity-95" />
          </div>
        </div>

        {stage !== "experience" ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 sm:p-4">
            {stage === "sealed" ? (
              <p className="mt-3 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white sm:text-2xl">
                Tap to reveal
              </p>
            ) : (
              <>
                <p className="mt-3 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white sm:text-2xl">
                  {revealName}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-100/90 sm:text-[11px]">
                  tap for the experience
                </p>
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
