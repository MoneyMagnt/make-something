"use client";

type ZyraBrandMarkProps = {
  tag?: string;
  className?: string;
};

export function ZyraBrandMark({ tag = "gh", className }: ZyraBrandMarkProps) {
  return (
    <span className={`inline-flex min-w-0 items-center gap-2 ${className ?? ""}`}>
      <span className="truncate font-[family-name:var(--font-space-grotesk)] text-[1rem] font-bold tracking-tight min-[430px]:text-[1.08rem] sm:text-xl">
        zyra
      </span>
      <span className="inline-flex items-center rounded-full border border-slate-300/80 bg-white/88 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-700 min-[430px]:px-2 min-[430px]:text-[10px] dark:border-slate-600/80 dark:bg-slate-800/85 dark:text-slate-100">
        {tag}
      </span>
    </span>
  );
}
