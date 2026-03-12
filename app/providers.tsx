"use client";

import { HeroUIProvider } from "@heroui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import ThemeToggle from "@/components/ThemeToggle";
import { ThemeModeProvider, type ThemeMode } from "@/components/ThemeModeProvider";

const DevProgressOverlay =
  process.env.NODE_ENV === "production"
    ? (() => null)
    : dynamic(() => import("@/components/FloatingProgressOverlay"), { ssr: false });

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
        <DevProgressOverlay />
      </ThemeModeProvider>
    </HeroUIProvider>
  );
}
