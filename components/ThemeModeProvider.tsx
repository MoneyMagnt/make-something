"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

export type ThemeMode = "light" | "dark";

type ThemeModeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "make_something_theme_mode";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const THEME_CHANGE_EVENT = "zyra-theme-change";

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

function getThemeSnapshot(): ThemeMode {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function subscribeToTheme(onStoreChange: () => void) {
  const handleThemeChange = () => onStoreChange();
  const handleStorage = (event: StorageEvent) => {
    if (
      event.key === STORAGE_KEY &&
      (event.newValue === "light" || event.newValue === "dark")
    ) {
      applyTheme(event.newValue);
      onStoreChange();
    }
  };

  window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    window.removeEventListener("storage", handleStorage);
  };
}

export function ThemeModeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: ThemeMode;
}) {
  const getServerSnapshot = useCallback(() => initialTheme, [initialTheme]);
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerSnapshot
  );
  const setTheme = useCallback((nextTheme: ThemeMode) => {
    applyTheme(nextTheme);
    persistTheme(nextTheme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  const value = useMemo<ThemeModeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
    }),
    [setTheme, theme]
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
