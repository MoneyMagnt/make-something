"use client";

import { useEffect, useMemo, useState } from "react";

type EventCountdownChipProps = {
  targetIso?: string;
  elapsedLabel?: string;
};

const getCountdownParts = (targetIso: string | undefined, now: number) => {
  if (!targetIso) {
    return null;
  }

  const target = new Date(targetIso).getTime();
  if (Number.isNaN(target)) {
    return null;
  }

  const remaining = Math.max(target - now, 0);
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  return [
    { label: "days", value: days, short: "d" },
    { label: "hours", value: hours, short: "h" },
    { label: "mins", value: minutes, short: "m" },
    { label: "secs", value: seconds, short: "s" },
  ];
};

export function EventCountdownChip({
  targetIso,
  elapsedLabel = "doors open now",
}: EventCountdownChipProps) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!targetIso) {
      return;
    }

    const sync = () => setNow(Date.now());
    sync();

    const timer = window.setInterval(sync, 1000);
    return () => window.clearInterval(timer);
  }, [targetIso]);

  const units = useMemo(() => getCountdownParts(targetIso, now), [targetIso, now]);
  const isTickVisible = Math.floor(now / 1000) % 2 === 0;

  if (!units) {
    return <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">tickets live</span>;
  }

  const isElapsed = units.every((unit) => unit.value === 0);

  if (isElapsed) {
    return (
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
        {elapsedLabel}
      </span>
    );
  }

  return (
    <div
      aria-label={units.map((unit) => `${unit.value} ${unit.label}`).join(", ")}
      className="flex min-w-0 items-center gap-1.5 overflow-hidden font-mono text-[10px] font-semibold uppercase tracking-[0.18em] tabular-nums"
    >
      {units.map((unit, index) => (
        <span key={unit.label} className="inline-flex min-w-0 items-center gap-0.5 whitespace-nowrap">
          <span>{String(unit.value).padStart(2, "0")}</span>
          <span className="text-[9px] opacity-75">{unit.short}</span>
          {index < units.length - 1 ? (
            <span
              aria-hidden="true"
              className={`ml-0.5 text-[8px] transition-opacity duration-300 ${isTickVisible ? "opacity-40" : "opacity-15"}`}
            >
              :
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}
