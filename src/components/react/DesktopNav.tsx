/**
 * DesktopNav component - main desktop navigation with mega menus.
 * Accepts a `menus` array for split-logo layouts (left group / right group).
 */

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
}

export default function DesktopNav({
  headerHeight,
  menus = [...leftNavMenus, ...rightNavMenus],
  className = "",
}: DesktopNavProps) {
  return (
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
        />
      ))}
    </nav>
  );
}
