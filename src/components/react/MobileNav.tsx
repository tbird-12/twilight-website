/**
 * MobileNav component - full-viewport mobile navigation dropdown
 * Shows 4 main headers with collapsible sections, one open at a time
 */

import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { useKeyPress } from './hooks';
import {
  aboutMenuItems,
  allServicesMenuItems,
  allSpecialtiesMenuItems,
  clientResourcesMenuItems,
} from '../../data/navigationData';

interface Section {
  id: string;
  title: string;
  items: any[];
  baseHref: string;
}

function getItemHref(item: any, baseHref: string): string {
  if (item.slug.startsWith('/')) return item.slug;
  return `${baseHref}/${item.slug}`;
}

interface MobileDropdownItemProps {
  item: any;
  baseHref: string;
  onItemClick?: () => void;
}

function MobileDropdownItem({ item, baseHref, onItemClick }: MobileDropdownItemProps) {
  if (item.hasNested && item.children && item.children.length > 0) {
    // Nested items always expanded, show children
    return (
      <div>
        <div className="px-8 py-2 text-sm font-semibold text-site-text">
          {item.name}
        </div>
        {item.childLabel && (
          <div className="px-10 pb-1 text-xs uppercase tracking-widest text-site-sub/70 font-black">
            {item.childLabel}
          </div>
        )}
        <div className="px-8">
          {item.children.map((child: any, idx: number) => (
            <a
              key={`${child.slug || child.id}-${idx}`}
              href={`${item.childHrefBase}/${child.slug}`}
              onClick={onItemClick}
              className="block py-2.5 text-sm text-site-sub active:text-cta transition-colors"
            >
              {child.name || child.title}
            </a>
          ))}
        </div>
      </div>
    );
  }

  // Simple non-nested links
  return (
    <a
      href={getItemHref(item, baseHref)}
      onClick={onItemClick}
      className="block px-8 py-3 text-[15px] font-medium text-site-text active:bg-surface-soft transition-colors"
    >
      {item.name || item.title}
    </a>
  );
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const sections: Section[] = [
    { id: 'about', title: 'About', items: aboutMenuItems, baseHref: '/about' },
    { id: 'services', title: 'Services', items: allServicesMenuItems, baseHref: '/services' },
    { id: 'specialties', title: 'Specialties', items: allSpecialtiesMenuItems, baseHref: '/specialities' },
    { id: 'resources', title: 'Resources', items: clientResourcesMenuItems, baseHref: '/resources' },
  ];

  useKeyPress('Escape', () => {
    if (isOpen) onClose();
  });

  if (!isOpen) {
    return null;
  }

  return (
    <>
    {/* Backdrop overlay — closes menu on tap, sits above chatbot (z-60) but below menu content */}
    <div
      className="md:hidden fixed inset-0 z-[85] bg-site-text/20 backdrop-blur-sm"
      onClick={onClose}
      aria-hidden="true"
    />
    <div
      id="mobile-menu"
      className="md:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 z-[90] bg-site-bg overflow-y-auto overscroll-contain mobile-menu-enter"
      role="navigation"
      aria-label="Mobile navigation"
    >
      {/* Section Headers */}
      <div className="theme-border">
        {sections.map((section) => (
          <div key={section.id}>
            {/* Header Button */}
            <button
              type="button"
              onClick={() =>
                setExpandedSection(expandedSection === section.id ? null : section.id)
              }
              className="w-full text-left px-6 py-4 font-bold text-[17px] flex items-center justify-between text-site-text active:bg-surface-soft transition-colors"
              aria-expanded={expandedSection === section.id}
            >
              {section.title}
              <svg
                className={`h-5 w-5 text-cta transition-transform duration-250 ${
                  expandedSection === section.id ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Section Content - Expanded */}
            {expandedSection === section.id && (
              <div className="bg-surface-soft border-t theme-border section-expand-enter">
                {section.items.map((item: any, idx: number) => (
                  <MobileDropdownItem
                    key={`${item.slug || item.id}-${idx}`}
                    item={item}
                    baseHref={section.baseHref}
                    onItemClick={onClose}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Appearance Toggle - Sticky at Bottom */}
      <div className="sticky bottom-0 border-t theme-border px-6 py-4 bg-site-bg flex items-center justify-between">
        <span className="text-sm font-semibold text-site-sub">Appearance</span>
        <ThemeToggle />
      </div>

      <style>{`
        @keyframes mobileMenuEnter {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sectionExpandEnter {
          from { opacity: 0; max-height: 0; }
          to   { opacity: 1; max-height: 9999px; }
        }
        .mobile-menu-enter {
          animation: mobileMenuEnter 250ms cubic-bezier(.4,0,.2,1) forwards;
        }
        .section-expand-enter {
          animation: sectionExpandEnter 250ms cubic-bezier(.4,0,.2,1) forwards;
        }
      `}</style>
    </div>
    </>
  );
}
