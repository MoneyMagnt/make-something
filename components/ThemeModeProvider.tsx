"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";

export type ThemeMode = "light" | "dark";

type ThemeModeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "make_something_theme_mode";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;

  if (!root.classList.contains(theme)) {
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }

  root.style.colorScheme = theme;
  root.dataset.themeReady = "true";
}

function persistTheme(theme: ThemeMode) {
  localStorage.setItem(STORAGE_KEY, theme);
  document.cookie = `${STORAGE_KEY}=${theme}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
}

export function ThemeModeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: ThemeMode;
}) {
  const [theme, setThemeState] = useState<ThemeMode>(initialTheme);

  const setTheme = (nextTheme: ThemeMode) => {
    applyTheme(nextTheme);
    persistTheme(nextTheme);
    setThemeState(nextTheme);
  };

  useLayoutEffect(() => {
    applyTheme(theme);
    persistTheme(theme);
  }, [theme]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      if (event.newValue === "light" || event.newValue === "dark") {
        setThemeState(event.newValue);
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo<ThemeModeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
    }),
    [theme]
  );

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within ThemeModeProvider");
  }
  return context;
}
