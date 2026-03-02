"use client";

import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  Switch,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ADMIN_ACCESS_KEY, ADMIN_PRIVATE_PATH } from "@/lib/adminAccess";
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
  const [isAdminSession, setIsAdminSession] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setIsAdminSession(localStorage.getItem(ADMIN_ACCESS_KEY) === "1");
  }, []);

  const navItems = useMemo(() => {
    if (isAdminSession || active === "admin") {
      return [...BASE_NAV_ITEMS, ADMIN_NAV_ITEM];
    }
    return BASE_NAV_ITEMS;
  }, [active, isAdminSession]);

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
    setIsMobileMenuOpen(false);
  }, [active]);

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
          "!fixed left-0 right-0 !top-0 w-full z-30 border-b border-white/30 bg-white/20 backdrop-blur-2xl max-sm:border-white/10 max-sm:bg-slate-950/92 dark:border-slate-700/55 dark:bg-slate-900/30",
          navbarClassName
        )}
      >
        <NavbarBrand className="px-1 py-1">
          <Link
            href="/"
            className={joinClasses(
              "inline-flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 no-underline max-sm:text-slate-100 dark:text-slate-100",
              brandClassName
            )}
          >
            {brand}
          </Link>
        </NavbarBrand>

        <NavbarContent
          justify="start"
          className={joinClasses("hidden flex-1 items-center gap-6 pl-4 md:gap-8 lg:gap-10 sm:flex", quickLinksClassName)}
        >
          {navItems.map((item) => (
            <Link
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
            </Link>
          ))}
        </NavbarContent>

        <NavbarContent justify="end" className="sm:hidden">
          <div className="flex items-center gap-2.5">
            <div className="rounded-full border border-white/20 bg-white/12 px-2.5 py-1.5 backdrop-blur-xl">
              <Switch
                size="sm"
                isSelected={theme === "dark"}
                onValueChange={(selected) => setTheme(selected ? "dark" : "light")}
                aria-label={theme === "dark" ? "switch to light mode" : "switch to dark mode"}
              />
            </div>
            <Button
              type="button"
              className="h-11 min-w-11 border border-white/20 bg-white/12 px-0 text-white backdrop-blur-xl"
              aria-label="open navigation menu"
              aria-haspopup="menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="zyra-mobile-menu"
              onPress={() => setIsMobileMenuOpen((open) => !open)}
            >
              <span className="inline-flex flex-col gap-1">
                <span className="block h-[2.5px] w-5 rounded-full bg-current" />
                <span className="block h-[2.5px] w-5 rounded-full bg-current" />
                <span className="block h-[2.5px] w-5 rounded-full bg-current" />
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
                className="fixed inset-x-3 top-[4.8rem] z-[11001] mx-auto w-[min(92vw,21.5rem)] overflow-hidden rounded-3xl border border-white/65 bg-white/96 shadow-[0_24px_60px_rgba(2,6,23,0.28)] backdrop-blur-xl dark:border-slate-700/75 dark:bg-slate-900/96"
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

      <div aria-hidden className="h-[4.8rem]" />
    </>
  );
}
