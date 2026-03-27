"use client";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  Switch,
} from "@heroui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { ADMIN_PRIVATE_PATH } from "@/lib/adminAccess";
import { useThemeMode } from "@/components/ThemeModeProvider";

type NavKey = "home" | "events" | "services" | "admin";

const BASE_NAV_ITEMS: Array<{ key: Exclude<NavKey, "admin">; label: string; href: string }> = [
  { key: "home", label: "Home", href: "/" },
  { key: "events", label: "Events", href: "/events" },
  { key: "services", label: "Services", href: "/services" },
];
const ADMIN_NAV_ITEM = { key: "admin" as const, label: "Admin", href: ADMIN_PRIVATE_PATH };

const joinClasses = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

type ZyraSiteNavProps = {
  brand: ReactNode;
  active: NavKey;
  navbarClassName?: string;
  brandClassName?: string;
  quickLinksClassName?: string;
  linkClassName?: string;
  activeLinkClassName?: string;
};

export function ZyraSiteNav({
  brand,
  active,
  navbarClassName,
  brandClassName,
  quickLinksClassName,
  linkClassName,
  activeLinkClassName,
}: ZyraSiteNavProps) {
  const router = useRouter();
  const { theme, setTheme } = useThemeMode();
  const isThemeReady = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = useMemo(() => {
    if (active === "admin") {
      return [...BASE_NAV_ITEMS, ADMIN_NAV_ITEM];
    }
    return BASE_NAV_ITEMS;
  }, [active]);

  const activeItem = navItems.find((item) => item.key === active) ?? navItems[0];

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);


  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <Navbar
        className={joinClasses(
          navbarClassName,
          "!fixed left-0 right-0 !top-0 z-30 h-[4.6rem] w-full border-b border-white/30 bg-white/20 px-2.5 backdrop-blur-2xl max-sm:border-slate-200/75 max-sm:bg-white/92 min-[430px]:h-[4.85rem] min-[430px]:px-3.5 sm:h-[4.8rem] sm:px-4 dark:border-slate-700/55 dark:bg-slate-900/30 dark:max-sm:border-slate-700/75 dark:max-sm:bg-slate-950/94"
        )}
      >
        <NavbarBrand className="min-w-0 flex-1 px-0.5 py-1 pr-1 min-[430px]:px-1 sm:flex-none">
          <NextLink
            href="/"
            className={joinClasses(
              "inline-flex max-w-[calc(100vw-10.6rem)] items-center gap-1.5 overflow-hidden font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 no-underline min-[430px]:max-w-[calc(100vw-11.4rem)] min-[430px]:gap-2 max-sm:text-slate-900 sm:max-w-none dark:text-slate-100 dark:max-sm:text-slate-100",
              brandClassName
            )}
          >
            {brand}
          </NextLink>
        </NavbarBrand>

        <NavbarContent
          justify="start"
          className={joinClasses("hidden flex-1 items-center gap-6 pl-4 md:gap-8 lg:gap-10 sm:flex", quickLinksClassName)}
        >
          {navItems.map((item) => (
            <NextLink
              key={item.key}
              href={item.href}
              className={joinClasses(
                "relative shrink-0 text-[1.03rem] font-semibold tracking-tight no-underline transition-colors duration-200",
                active === item.key
                  ? joinClasses(
                      "text-slate-900 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-cyan-500/80 dark:text-slate-100 dark:after:bg-cyan-300/80",
                      activeLinkClassName
                    )
                  : joinClasses(
                      "text-slate-800/90 hover:text-slate-900 dark:text-slate-100/90 dark:hover:text-slate-100",
                      linkClassName
                    )
              )}
            >
              {item.label}
            </NextLink>
          ))}
        </NavbarContent>

        <NavbarContent justify="end" className="shrink-0 sm:hidden">
          <div className="flex items-center gap-1.5 min-[430px]:gap-2">
            <div className="flex h-10 items-center rounded-full border border-slate-300/70 bg-white/78 px-2 py-1.5 backdrop-blur-xl min-[430px]:h-10 min-[430px]:px-2.5 dark:border-white/20 dark:bg-white/12">
              {isThemeReady ? (
                <Switch
                  size="sm"
                  isSelected={theme === "dark"}
                  onValueChange={(selected) => setTheme(selected ? "dark" : "light")}
                  aria-label={theme === "dark" ? "switch to light mode" : "switch to dark mode"}
                />
              ) : (
                <div aria-hidden className="h-6 w-11 rounded-full bg-slate-300/70 dark:bg-slate-700/70" />
              )}
            </div>
            <Button
              type="button"
              className="h-10 min-w-10 border border-slate-300/70 bg-white/78 px-0 text-slate-800 backdrop-blur-xl min-[430px]:h-10 min-[430px]:min-w-10 dark:border-white/20 dark:bg-white/12 dark:text-white"
              aria-label="open navigation menu"
              aria-haspopup="menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="zyra-mobile-menu"
              onPress={() => setIsMobileMenuOpen((open) => !open)}
            >
              <span className="inline-flex flex-col gap-[4px]">
                <span className="block h-[2.25px] w-[1.125rem] rounded-full bg-current min-[430px]:w-5" />
                <span className="block h-[2.25px] w-[1.125rem] rounded-full bg-current min-[430px]:w-5" />
                <span className="block h-[2.25px] w-[1.125rem] rounded-full bg-current min-[430px]:w-5" />
              </span>
            </Button>
          </div>
        </NavbarContent>
      </Navbar>

      {typeof window !== "undefined" && isMobileMenuOpen
        ? createPortal(
            <div className="sm:hidden">
              <button
                type="button"
                aria-label="close navigation menu"
                className="fixed inset-0 z-[11000] bg-slate-900/40 backdrop-blur-[2px]"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              <div
                id="zyra-mobile-menu"
                role="menu"
                aria-label="mobile navigation"
                className="fixed inset-x-3 top-[4.6rem] z-[11001] mx-auto w-[min(92vw,21.5rem)] overflow-hidden rounded-3xl border border-white/65 bg-white/96 shadow-[0_24px_60px_rgba(2,6,23,0.28)] backdrop-blur-xl min-[430px]:top-[4.85rem] dark:border-slate-700/75 dark:bg-slate-900/96"
              >
                <div className="flex items-center justify-between border-b border-slate-200/70 bg-gradient-to-r from-cyan-50/90 to-blue-50/80 px-4 py-3 dark:border-slate-700/70 dark:from-cyan-900/20 dark:to-blue-900/10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    quick navigation
                  </p>
                  <p className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-700 dark:bg-slate-800/80 dark:text-cyan-300">
                    {activeItem.label}
                  </p>
                </div>

                <div className="p-2.5">
                  {navItems.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        router.push(item.href);
                        setIsMobileMenuOpen(false);
                      }}
                      className={joinClasses(
                        "group flex min-h-12 w-full items-center justify-between rounded-2xl px-4 text-left text-[15px] font-semibold transition-colors",
                        active === item.key
                          ? "bg-cyan-50 text-cyan-800 ring-1 ring-cyan-200/80 dark:bg-cyan-900/30 dark:text-cyan-100 dark:ring-cyan-700/60"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/75"
                      )}
                    >
                      <span>{item.label}</span>
                      <span
                        className={joinClasses(
                          "h-2 w-2 rounded-full transition-colors",
                          active === item.key
                            ? "bg-cyan-500 dark:bg-cyan-300"
                            : "bg-slate-300 group-hover:bg-slate-400 dark:bg-slate-600 dark:group-hover:bg-slate-500"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>,
            document.body
          )
        : null}

      <div aria-hidden className="h-[4.6rem] min-[430px]:h-[4.85rem] sm:h-[4.8rem]" />
    </>
  );
}
