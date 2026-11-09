/**
 * DesktopNav — manages active mega-menu state and renders a single shared
 * frosted-glass scrim overlay. Passes open/close callbacks down to each
 * NavigationDropdown so only one menu is ever open at a time.
 */

import { useState, useCallback, useEffect, useRef } from "react";
import NavigationDropdown from "./NavigationDropdown";
import {
  aboutMenuItems,
  servicesMenuItems,
  specialtiesMenuItems,
  clientResourcesMenuItems,
} from "../../data/navigationData";
import type { NavigationMenuItem } from "../../data/navigationData";

export interface NavMenuConfig {
  title: string;
  items: NavigationMenuItem[];
  baseHref: string;
  sectionLabel?: string;
  moreLink?: { href: string; label: string };
}

export const leftNavMenus: NavMenuConfig[] = [
  {
    title: "Services",
    items: servicesMenuItems,
    baseHref: "/services",
    sectionLabel: "Our Services",
    moreLink: { href: "/services", label: "View All Services" },
  },
  {
    title: "Specialties",
    items: specialtiesMenuItems,
    baseHref: "/specialties",
    sectionLabel: "Specialties",
    moreLink: { href: "/specialties", label: "View All Specialties" },
  },
];

export const rightNavMenus: NavMenuConfig[] = [
  {
    title: "Clients",
    items: clientResourcesMenuItems,
    baseHref: "/resources",
    sectionLabel: "Patient Resources",
  },
  {
    title: "About",
    items: aboutMenuItems,
    baseHref: "/about",
    sectionLabel: "Practice Information",
    moreLink: { href: "/about/clinicians/clinicians-lex-ky", label: "View All Clinicians" },
  },
];

interface DesktopNavProps {
  headerHeight: number;
  menus?: NavMenuConfig[];
  className?: string;
  currentPath?: string;
}

export default function DesktopNav({
  headerHeight,
  menus = [...leftNavMenus, ...rightNavMenus],
  className = "",
  currentPath,
}: DesktopNavProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const isAnyOpen = activeMenu !== null;
  const scrimTop = `${Math.max(headerHeight, 56)}px`;

  const openMenu = useCallback((title: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveMenu(title);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setActiveMenu(null), 150);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const closeAll = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveMenu(null);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <>
      <nav
        className={`flex items-center gap-6 lg:gap-8 ${className}`.trim()}
        role="navigation"
        aria-label="Main navigation"
      >
        {menus.map((menu) => (
          <NavigationDropdown
            key={menu.title}
            headerHeight={headerHeight}
            title={menu.title}
            items={menu.items}
            baseHref={menu.baseHref}
            sectionLabel={menu.sectionLabel}
            moreLink={menu.moreLink}
            isOpen={activeMenu === menu.title}
            onOpen={() => openMenu(menu.title)}
            onScheduleClose={scheduleClose}
            onCancelClose={cancelClose}
            currentPath={currentPath}
          />
        ))}
      </nav>

      {/* Shared scrim — dims & blurs page content behind any open dropdown.
          Rendered inside header's stacking context but visually covers the
          page below via fixed positioning + top: headerHeight. */}
      <div
        className="nav-scrim-transition fixed left-0 right-0 bottom-0 z-40"
        data-open={isAnyOpen ? "true" : "false"}
        style={{
          top: scrimTop,
          backgroundColor: "rgba(0,0,0,0.28)",
          backdropFilter: "blur(4px) saturate(80%)",
          WebkitBackdropFilter: "blur(4px) saturate(80%)",
        }}
        onClick={closeAll}
        aria-hidden="true"
      />
    </>
  );
}
