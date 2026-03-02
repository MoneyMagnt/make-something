"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { Key, ReactNode, useEffect, useMemo, useState } from "react";
import { ADMIN_ACCESS_KEY, ADMIN_PRIVATE_PATH } from "@/lib/adminAccess";

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
  const [isAdminSession, setIsAdminSession] = useState(false);

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

  const handleMobileAction = (key: Key) => {
    const selected = navItems.find((item) => item.key === String(key));
    if (selected) {
      router.push(selected.href);
    }
  };

  return (
    <Navbar
      className={joinClasses(
        "relative z-20 border-b border-white/30 bg-white/20 backdrop-blur-2xl dark:border-slate-700/55 dark:bg-slate-900/30",
        navbarClassName
      )}
    >
      <NavbarBrand className="px-1 py-1">
        <Link
          href="/"
          className={joinClasses(
            "inline-flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 no-underline dark:text-slate-100",
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
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button className="h-9 border border-cyan-300/80 bg-gradient-to-r from-cyan-500 to-blue-500 px-3 text-xs font-semibold tracking-[0.04em] text-white">
              {`menu: ${activeItem.label}`}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="mobile navigation"
            onAction={handleMobileAction}
            selectedKeys={[active]}
            selectionMode="single"
            disallowEmptySelection
          >
            {navItems.map((item) => (
              <DropdownItem key={item.key} className="text-sm font-semibold">
                {item.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
