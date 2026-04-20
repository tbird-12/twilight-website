/**
 * DesktopNav component - main desktop navigation with mega menus
 * Only visible on medium screens and up
 */

import NavigationDropdown from './NavigationDropdown';
import ThemeToggle from './ThemeToggle';
import {
  aboutMenuItems,
  servicesMenuItems,
  specialtiesMenuItems,
  clientResourcesMenuItems,
} from '../../data/navigationData';

export default function DesktopNav() {
  return (
    <nav
      className="hidden md:flex items-center gap-6 lg:gap-10"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* About Menu */}
      <NavigationDropdown
        title="About"
        items={aboutMenuItems}
        baseHref="/about"
        sectionLabel="Practice Information"
        moreLink={{ href: '/about/clinicians/clinicians-lex-ky', label: 'View All Clinicians' }}
      />

      {/* Services Menu */}
      <NavigationDropdown
        title="Services"
        items={servicesMenuItems}
        baseHref="/services"
        sectionLabel="Our Services"
        moreLink={{ href: '/services', label: 'View All Services' }}
      />

      {/* Specialties Menu */}
      <NavigationDropdown
        title="Specialties"
        items={specialtiesMenuItems}
        baseHref="/specialities"
        sectionLabel="Specialties"
        moreLink={{ href: '/specialities', label: 'View All Specialties' }}
      />

      {/* Resources Menu */}
      <NavigationDropdown
        title="Resources"
        items={clientResourcesMenuItems}
        baseHref="/resources"
        sectionLabel="Client Resources"
      />

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Contact Button */}
      <a
        href="/contact"
        className="hidden md:inline-block bg-cta text-cta-fg px-4 lg:px-8 py-2 lg:py-3 rounded-full font-black text-xs lg:text-sm text-center hover:bg-cta/80 hover:ring-4 hover:ring-cta/30 transition-all duration-200 shadow-lg shadow-cta/20 active:scale-95"
      >
        <span className="inline-block lg:inline-block text-center leading-tight">
          Contact Us
        </span>
      </a>
    </nav>
  );
}
