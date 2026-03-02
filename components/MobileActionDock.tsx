"use client";

import { Button, Link } from "@heroui/react";

type MobileActionDockProps = {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export default function MobileActionDock({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: MobileActionDockProps) {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2 rounded-2xl border border-white/40 bg-white/20 p-2 backdrop-blur-xl shadow-[0_12px_40px_rgba(15,23,42,0.18)] dark:border-slate-700/80 dark:bg-slate-900/70">
        <Button
          as={Link}
          href={secondaryHref}
          variant="flat"
          className="bg-white/65 text-slate-900 border border-white/70 dark:bg-slate-950/70 dark:text-slate-100 dark:border-slate-700/70"
        >
          {secondaryLabel}
        </Button>
        <Button
          as={Link}
          href={primaryHref}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border border-cyan-300/50"
        >
          {primaryLabel}
        </Button>
      </div>
    </div>
  );
}
