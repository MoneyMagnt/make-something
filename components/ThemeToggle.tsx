"use client";

import { Switch, Tooltip } from "@heroui/react";
import { useThemeMode } from "@/components/ThemeModeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeMode();
  const nextTheme = theme === "dark" ? "light" : "dark";
  const isDark = theme === "dark";

  return (
    <div className="fixed right-4 top-4 z-[9997]">
      <Tooltip content={`switch to ${nextTheme} mode`} placement="left">
        <div className="rounded-full border border-white/65 bg-white/65 px-2.5 py-1.5 backdrop-blur-2xl shadow-[0_14px_42px_rgba(15,23,42,0.22)] dark:border-slate-700/75 dark:bg-slate-900/65">
          <Switch
            size="sm"
            isSelected={isDark}
            onValueChange={(selected) => setTheme(selected ? "dark" : "light")}
            aria-label={`switch to ${nextTheme} mode`}
          />
        </div>
      </Tooltip>
    </div>
  );
}
