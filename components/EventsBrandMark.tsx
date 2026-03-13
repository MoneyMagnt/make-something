"use client";

import { Image } from "@heroui/react";
import { ZyraBrandMark } from "@/components/ZyraBrandMark";

type EventsBrandMarkProps = {
  className?: string;
};

export function EventsBrandMark({ className }: EventsBrandMarkProps) {
  return (
    <span className={`inline-flex min-w-0 items-center gap-2 min-[430px]:gap-3 ${className ?? ""}`}>
      <ZyraBrandMark tag="gh" className="shrink-0" />
      <span className="h-5 w-px bg-slate-300/80 dark:bg-slate-600/80 min-[430px]:h-6" />
      <Image
        removeWrapper
        alt="+233events logo"
        src="/233-events-logo.png"
        className="h-6 w-auto min-[430px]:h-7 sm:h-8"
      />
    </span>
  );
}
