"use client";

import { useSyncExternalStore, type ComponentProps } from "react";
import ZyraHomeDesktop from "@/components/ZyraHomeDesktop";
import ZyraHomeMobile from "@/components/ZyraHomeMobile";

type ZyraResponsiveHomeProps = ComponentProps<typeof ZyraHomeMobile>;

const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribeToDesktopLayout(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(DESKTOP_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getDesktopSnapshot() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

export default function ZyraResponsiveHome(props: ZyraResponsiveHomeProps) {
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopLayout,
    getDesktopSnapshot,
    () => false
  );

  return isDesktop ? (
    <div className="hidden lg:block">
      <ZyraHomeDesktop {...props} />
    </div>
  ) : (
    <div className="lg:hidden">
      <ZyraHomeMobile {...props} />
    </div>
  );
}
