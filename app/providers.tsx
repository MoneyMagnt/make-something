"use client";

import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import FloatingProgressOverlay from "@/components/FloatingProgressOverlay";
import ThemeToggle from "@/components/ThemeToggle";
import { ThemeModeProvider, type ThemeMode } from "@/components/ThemeModeProvider";

export function Providers({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: ThemeMode;
}) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <ThemeModeProvider initialTheme={initialTheme}>
        {children}
        <ThemeToggle />
        <FloatingWhatsAppButton />
        <FloatingProgressOverlay />
      </ThemeModeProvider>
    </HeroUIProvider>
  );
}