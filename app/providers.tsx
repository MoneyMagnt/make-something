"use client";

import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import FloatingProgressOverlay from "@/components/FloatingProgressOverlay";
import ThemeToggle from "@/components/ThemeToggle";
import { ThemeModeProvider } from "@/components/ThemeModeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <ThemeModeProvider>
        {children}
        <ThemeToggle />
        <FloatingWhatsAppButton />
        <FloatingProgressOverlay />
      </ThemeModeProvider>
    </HeroUIProvider>
  );
}
