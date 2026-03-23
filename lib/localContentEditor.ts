"use client";

import { useEffect, useState } from "react";

export const LOCAL_CONTENT_STORAGE_KEY = "zyra_local_content_editor_v1";
const LOCAL_CONTENT_EVENT = "zyra-local-content-updated";

export type LocalHomeContent = {
  heroChipLabel: string;
  heroChipSubLabel: string;
  heroEyebrow: string;
  heroTitle: string;
  heroBody: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
};

export type LocalServicesContent = {
  heroChip: string;
  heroEyebrow: string;
  heroTitle: string;
  heroBody: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
};

export type LocalEventsContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroHighlight: string;
  statusPill: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
};

export type LocalContentState = {
  home: LocalHomeContent;
  services: LocalServicesContent;
  events: LocalEventsContent;
};

export const DEFAULT_LOCAL_CONTENT: LocalContentState = {
  home: {
    heroChipLabel: "premium growth systems",
    heroChipSubLabel: "for brands that need visible momentum",
    heroEyebrow: "zyra growth studio",
    heroTitle: "visibility, search, and campaigns that make momentum visible.",
    heroBody:
      "built in ghana for brands that need clearer demand, sharper presentation, and a next step people can see fast.",
    primaryCtaLabel: "book growth audit",
    secondaryCtaLabel: "explore services",
  },
  services: {
    heroChip: "service architecture for visible growth",
    heroEyebrow: "zyra service studio",
    heroTitle: "choose the system that matches the bottleneck.",
    heroBody:
      "search, content, creators, and founder websites packaged as clear operating systems instead of one long list of marketing tasks.",
    primaryCtaLabel: "book growth audit",
    secondaryCtaLabel: "review systems",
  },
  events: {
    heroEyebrow: "nightlife experience by zyra",
    heroTitle: "",
    heroHighlight: "450+ tickets already gone",
    statusPill: "late entry - ghs 50",
    primaryCtaLabel: "get late-entry ticket",
    secondaryCtaLabel: "join whatsapp community",
  },
};

function mergeLocalContent(input: Partial<LocalContentState> | null | undefined): LocalContentState {
  return {
    home: {
      ...DEFAULT_LOCAL_CONTENT.home,
      ...(input?.home ?? {}),
    },
    services: {
      ...DEFAULT_LOCAL_CONTENT.services,
      ...(input?.services ?? {}),
    },
    events: {
      ...DEFAULT_LOCAL_CONTENT.events,
      ...(input?.events ?? {}),
    },
  };
}

export function readLocalContent(): LocalContentState {
  if (typeof window === "undefined") {
    return DEFAULT_LOCAL_CONTENT;
  }

  const raw = window.localStorage.getItem(LOCAL_CONTENT_STORAGE_KEY);
  if (!raw) {
    return DEFAULT_LOCAL_CONTENT;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<LocalContentState>;
    return mergeLocalContent(parsed);
  } catch {
    return DEFAULT_LOCAL_CONTENT;
  }
}

export function writeLocalContent(next: LocalContentState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LOCAL_CONTENT_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(LOCAL_CONTENT_EVENT));
}

export function resetLocalContent() {
  writeLocalContent(DEFAULT_LOCAL_CONTENT);
}

export function useLocalContent() {
  const [content, setContent] = useState<LocalContentState>(DEFAULT_LOCAL_CONTENT);

  useEffect(() => {
    const sync = () => setContent(readLocalContent());
    sync();

    window.addEventListener("storage", sync);
    window.addEventListener(LOCAL_CONTENT_EVENT, sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(LOCAL_CONTENT_EVENT, sync);
    };
  }, []);

  return content;
}