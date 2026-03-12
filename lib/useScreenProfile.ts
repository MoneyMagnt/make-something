"use client";

import { useEffect, useState } from "react";

export type ScreenProfile = "mobile" | "tablet" | "desktop";

const MOBILE_QUERY = "(max-width: 767px)";
const TABLET_QUERY = "(min-width: 768px) and (max-width: 1199px)";

function getScreenProfile(): ScreenProfile {
  if (typeof window === "undefined") {
    return "desktop";
  }

  if (window.matchMedia(MOBILE_QUERY).matches) {
    return "mobile";
  }

  if (window.matchMedia(TABLET_QUERY).matches) {
    return "tablet";
  }

  return "desktop";
}

export function useScreenProfile() {
  const [screenProfile, setScreenProfile] = useState<ScreenProfile | null>(null);

  useEffect(() => {
    const updateProfile = () => {
      setScreenProfile(getScreenProfile());
    };

    updateProfile();

    const mobileQuery = window.matchMedia(MOBILE_QUERY);
    const tabletQuery = window.matchMedia(TABLET_QUERY);

    mobileQuery.addEventListener("change", updateProfile);
    tabletQuery.addEventListener("change", updateProfile);
    window.addEventListener("resize", updateProfile);

    return () => {
      mobileQuery.removeEventListener("change", updateProfile);
      tabletQuery.removeEventListener("change", updateProfile);
      window.removeEventListener("resize", updateProfile);
    };
  }, []);

  return screenProfile;
}