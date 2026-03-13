"use client";

import { Image } from "@heroui/react";

type EventsBrandMarkProps = {
  className?: string;
  size?: "default" | "compact";
};

export function EventsBrandMark({
  className,
  size = "default",
}: EventsBrandMarkProps) {
  const isCompact = size === "compact";

  return (
    <span
      className={`inline-flex min-w-0 items-center ${
        isCompact ? "gap-1.5 min-[430px]:gap-2" : "gap-2 min-[430px]:gap-2.5"
      } ${className ?? ""}`}
    >
      <span className={`inline-flex min-w-0 items-center ${isCompact ? "gap-1.5" : "gap-2"}`}>
        <span
          className={`truncate font-[family-name:var(--font-space-grotesk)] font-bold tracking-tight text-slate-900 dark:text-slate-100 ${
            isCompact
              ? "text-[0.75rem] min-[430px]:text-[0.82rem]"
              : "text-[0.88rem] min-[430px]:text-[0.96rem] sm:text-[1rem]"
          }`}
        >
          zyra
        </span>
        <span
          className={`inline-flex items-center rounded-full border border-slate-300/80 bg-white/92 font-semibold uppercase tracking-[0.14em] text-slate-700 dark:border-slate-500/70 dark:bg-slate-900/80 dark:text-slate-100 ${
            isCompact
              ? "px-1 py-0.5 text-[7px]"
              : "px-1.5 py-0.5 text-[8px] min-[430px]:px-2 min-[430px]:text-[9px]"
          }`}
        >
          gh
        </span>
      </span>
      <span
        className={`w-px bg-slate-300/80 dark:bg-slate-500/80 ${
          isCompact ? "h-4.5" : "h-5 min-[430px]:h-5.5"
        }`}
      />
      <span
        className={`inline-flex items-center rounded-[0.8rem] border border-slate-900/70 bg-[linear-gradient(135deg,#07111d,#12345a)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_26px_rgba(15,23,42,0.18)] ring-1 ring-cyan-300/15 dark:border-slate-700/70 dark:bg-[linear-gradient(135deg,#050b14,#0f2a49)] dark:ring-cyan-200/10 ${
          isCompact ? "h-6 min-[430px]:h-6.5 px-1.5" : "h-6.5 min-[430px]:h-7 px-1.5 min-[430px]:px-2"
        }`}
      >
        <Image
          removeWrapper
          alt="+233events logo"
          src="/233-events-logo.png"
          className={`${
            isCompact ? "h-4 min-[430px]:h-[18px]" : "h-[17px] min-[430px]:h-[19px] sm:h-5"
          } w-auto object-contain brightness-[1.08] contrast-[1.24] saturate-[1.24] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]`}
        />
      </span>
    </span>
  );
}
