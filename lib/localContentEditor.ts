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
    heroChipLabel: "for growing brands",
    heroChipSubLabel: "that need more visibility and action",
    heroEyebrow: "zyra growth studio",
    heroTitle: "need more people to notice your brand and take action?",
    heroBody:
      "zyra helps growing brands in ghana get seen, look credible online, and turn attention into real inquiries, ticket sales, and customers.",
    primaryCtaLabel: "see how we help",
    secondaryCtaLabel: "book a quick growth call",
  },
  services: {
    heroChip: "clear support for growing brands",
    heroEyebrow: "zyra service studio",
    heroTitle: "pick the support that fixes the real bottleneck.",
    heroBody:
      "from search to content to websites and creator campaigns, we help you choose the next move that actually matters.",
    primaryCtaLabel: "book a quick growth call",
    secondaryCtaLabel: "see the options",
  },
  events: {
    heroEyebrow: "nightlife experience by zyra",
    heroTitle: "",
    heroHighlight: "free passes sold out in under 24 hours",
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
