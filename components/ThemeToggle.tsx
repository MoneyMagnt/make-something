"use client";

import { Button, Tooltip } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useThemeMode } from "@/components/ThemeModeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeMode();
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <div className="fixed right-4 top-4 z-[9997]">
      <Tooltip content={`switch to ${nextTheme} mode`} placement="left">
        <Button
          onPress={toggleTheme}
          aria-label={`switch to ${nextTheme} mode`}
          radius="full"
          className="min-w-20 bg-white/80 text-slate-900 border border-white/70 backdrop-blur-xl shadow-[0_14px_42px_rgba(15,23,42,0.2)] dark:bg-slate-900/80 dark:text-slate-100 dark:border-slate-700/80"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="font-[family-name:var(--font-space-grotesk)] text-xs tracking-[0.14em] font-semibold uppercase"
            >
              {theme}
            </motion.span>
          </AnimatePresence>
        </Button>
      </Tooltip>
    </div>
  );
}
