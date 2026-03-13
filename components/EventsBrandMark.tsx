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
    <span className={`inline-flex min-w-0 items-center gap-2 ${isCompact ? "min-[430px]:gap-2.5" : "min-[430px]:gap-3"} ${className ?? ""}`}>
      <span className={`inline-flex min-w-0 items-center ${isCompact ? "gap-1.5" : "gap-2"}`}>
        <span className={`truncate font-[family-name:var(--font-space-grotesk)] font-bold tracking-tight text-slate-900 dark:text-slate-100 ${isCompact ? "text-[0.82rem] min-[430px]:text-[0.88rem]" : "text-[1rem] min-[430px]:text-[1.08rem] sm:text-xl"}`}>
          zyra
        </span>
        <span className={`inline-flex items-center rounded-full border border-slate-300/80 bg-white/88 font-semibold uppercase tracking-[0.14em] text-slate-700 dark:border-slate-600/80 dark:bg-slate-800/85 dark:text-slate-100 ${isCompact ? "px-1.5 py-0.5 text-[8px]" : "px-1.5 py-0.5 text-[9px] min-[430px]:px-2 min-[430px]:text-[10px]"}`}>
          gh
        </span>
      </span>
      <span className={`w-px bg-slate-300/80 dark:bg-slate-600/80 ${isCompact ? "h-4.5 min-[430px]:h-5" : "h-5 min-[430px]:h-6"}`} />
      <span className={`inline-flex items-center rounded-full border border-slate-200/90 bg-white/96 shadow-[0_10px_22px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/96 ${isCompact ? "px-1.5 py-1" : "px-2 py-1.5"}`}>
        <Image
          removeWrapper
          alt="+233events logo"
          src="/233-events-logo.png"
          className={`${isCompact ? "h-3.5 min-[430px]:h-4" : "h-4.5 min-[430px]:h-5 sm:h-5.5"} w-auto`}
        />
      </span>
    </span>
  );
}
