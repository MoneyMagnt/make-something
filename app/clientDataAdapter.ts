"use client";

export const ADMIN_STORAGE_KEY = "zyra_admin_state_v1";
export const VISITOR_COUNT_KEY = "zyra_visitor_count_v1";

export const loadAdminState = <T extends Record<string, unknown>>(fallback: T): T => {
  if (typeof window === "undefined") return fallback;

  const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
  if (!saved) return fallback;

  try {
    const parsed = JSON.parse(saved) as Partial<T>;
    return { ...fallback, ...parsed };
  } catch {
    return fallback;
  }
};

export const saveAdminState = (state: unknown) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(state));
};

export const loadVisitorCount = () => {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem(VISITOR_COUNT_KEY) ?? "0");
};

export const setVisitorCount = (count: number) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(VISITOR_COUNT_KEY, String(count));
};

export const incrementVisitorOncePerSession = (sessionKey: string) => {
  if (typeof window === "undefined") return 0;

  if (sessionStorage.getItem(sessionKey)) {
    return loadVisitorCount();
  }

  const nextCount = loadVisitorCount() + 1;
  setVisitorCount(nextCount);
  sessionStorage.setItem(sessionKey, "1");
  return nextCount;
};

export const onStorageSync = (listener: () => void) => {
  if (typeof window === "undefined") return () => undefined;

  window.addEventListener("storage", listener);
  return () => window.removeEventListener("storage", listener);
};
