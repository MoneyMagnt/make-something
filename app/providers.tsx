"use client";

import { HeroUIProvider } from "@heroui/react";
import FloatingProgressOverlay from "@/components/FloatingProgressOverlay";
import ThemeToggle from "@/components/ThemeToggle";
import { ThemeModeProvider } from "@/components/ThemeModeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ThemeModeProvider>
        {children}
        <ThemeToggle />
        <FloatingProgressOverlay />
      </ThemeModeProvider>
    </HeroUIProvider>
  );
}
