/**
 * DesktopNav component - main desktop navigation with mega menus
 * Only visible on medium screens and up
 */

import NavigationDropdown from "./NavigationDropdown";
import {
  aboutMenuItems,
  servicesMenuItems,
  specialtiesMenuItems,
  clientResourcesMenuItems,
} from "../../data/navigationData";

interface DesktopNavProps {
  headerHeight: number;
}

export default function DesktopNav({ headerHeight }: DesktopNavProps) {
  return (
    <nav
      className="hidden md:flex items-center gap-6 lg:gap-10"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* About Menu */}
      <NavigationDropdown
        headerHeight={headerHeight}
        title="About"
        items={aboutMenuItems}
        baseHref="/about"
        sectionLabel="Practice Information"
        moreLink={{ href: '/about/clinicians/clinicians-lex-ky', label: 'View All Clinicians' }}
      />

      {/* Services Menu */}
      <NavigationDropdown
        headerHeight={headerHeight}
        title="Services"
        items={servicesMenuItems}
        baseHref="/services"
        sectionLabel="Our Services"
        moreLink={{ href: '/services', label: 'View All Services' }}
      />

      {/* Specialties Menu */}
      <NavigationDropdown
        headerHeight={headerHeight}
        title="Specialties"
        items={specialtiesMenuItems}
        baseHref="/specialties"
        sectionLabel="Specialties"
        moreLink={{ href: '/specialties', label: 'View All Specialties' }}
      />

      {/* Resources Menu */}
      <NavigationDropdown
        headerHeight={headerHeight}
        title="Resources"
        items={clientResourcesMenuItems}
        baseHref="/resources"
        sectionLabel="Client Resources"
      />
    </nav>
  );
}
