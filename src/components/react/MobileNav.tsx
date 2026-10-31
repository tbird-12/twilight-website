/**
 * MobileNav — Full-screen navigation sheet with tab-based browsing.
 *
 * Pattern: 4 pill tabs at the top (Services / Specialties / Clients / About)
 * each reveal a clean flat list. Nested menu groups (e.g. Clinical Staff,
 * Therapy sub-pages) become direct links to their section overview — no
 * drill-in depth, no accordion clutter. Book + Call live above the tabs;
 * Client Portal is anchored in the footer.
 */

import { useEffect, useRef, useState } from "react";
import { useFocusTrap } from "./hooks/useFocusTrap";
import { useReducedMotion } from "./hooks/useReducedMotion";
import {
  aboutMenuItems,
  allServicesMenuItems,
  allSpecialtiesMenuItems,
  clientResourcesMenuItems,
  getNavigationItemHref,
  isNavigationNestedItem,
} from "../../data/navigationData";
import type { NavigationMenuItem } from "../../data/navigationData";
import {
  PHONE_NUMBER,
  PHONE_NUMBER_FORMATTED,
  SIGN_IN_LINK,
  WIDGET_LINK,
} from "../../data/resource";

interface NavTab {
  id: string;
  label: string;
  items: NavigationMenuItem[];
  baseHref: string;
  overviewHref?: string;
  overviewLabel?: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  headerHeight: number;
}

const tabs: NavTab[] = [
  {
    id: "services",
    label: "Services",
    items: allServicesMenuItems,
    baseHref: "/services",
    overviewHref: "/services",
    overviewLabel: "All Services",
  },
  {
    id: "specialties",
    label: "Specialties",
    items: allSpecialtiesMenuItems,
    baseHref: "/specialties",
    overviewHref: "/specialties",
    overviewLabel: "All Specialties",
  },
  {
    id: "clients",
    label: "Clients",
    items: clientResourcesMenuItems,
    baseHref: "/resources",
  },
  {
    id: "about",
    label: "About",
    items: aboutMenuItems,
    baseHref: "/about",
  },
];

function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

function matchesPath(current: string, target: string): boolean {
  const a = normalizePath(current);
  const b = normalizePath(target);
  if (b === "/") return a === "/";
  return a === b || a.startsWith(`${b}/`);
}

export default function MobileNav({
  isOpen,
  onClose,
  currentPath,
  headerHeight,
}: MobileNavProps) {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useFocusTrap({ containerRef: panelRef, isActive: isOpen, onEscape: onClose });

  // Auto-select the tab whose section matches the current URL
  useEffect(() => {
    if (!isOpen) return;
    const match = tabs.find((t) => matchesPath(currentPath, t.baseHref));
    if (match) setActiveTabId(match.id);
  }, [isOpen, currentPath]);

  const panelTop = `${Math.max(headerHeight, 0)}px`;
  const activeTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0];

  if (!isOpen) {
    return (
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        Navigation menu closed
      </div>
    );
  }

  return (
    <>
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        Navigation menu opened
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-85 bg-site-text/35 md:hidden ${
          prefersReducedMotion ? "" : "mobile-nav-overlay-enter"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-110 md:hidden" style={{ top: panelTop }}>
        <div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          tabIndex={-1}
          className={`flex h-full flex-col bg-site-bg font-sans ${
            prefersReducedMotion ? "" : "mobile-nav-panel-enter"
          }`}
        >
          {/* ── Quick actions ── */}
          <div className="flex gap-2.5 border-b border-border px-4 py-3">
            <a
              href={WIDGET_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex flex-1 items-center justify-center rounded-full bg-cta py-2.5 text-xs font-black text-cta-fg shadow-sm shadow-cta/20 transition-all hover:bg-cta/80"
              aria-label="Book an appointment with Twilight Psychology"
            >
              Book Appointment
            </a>
            <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={onClose}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border bg-surface py-2.5 text-xs font-semibold text-site-text transition-colors hover:border-border-strong"
              aria-label={`Call Twilight Psychology at ${PHONE_NUMBER_FORMATTED}`}
            >
              <svg
                className="h-3.5 w-3.5 shrink-0 text-icon"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {PHONE_NUMBER_FORMATTED}
            </a>
          </div>

          {/* ── Tab strip ── */}
          <div
            className="flex gap-1 border-b border-border px-3 py-2"
            role="tablist"
            aria-label="Navigation categories"
          >
            {tabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`mobile-tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`mobile-tabpanel-${tab.id}`}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-cta/10 text-cta"
                      : "text-site-sub hover:bg-surface-2 hover:text-site-text"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* ── Tab panel: flat item list ── */}
          <nav
            id={`mobile-tabpanel-${activeTab.id}`}
            role="tabpanel"
            aria-labelledby={`mobile-tab-${activeTab.id}`}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-2"
            aria-label={`${activeTab.label} navigation links`}
          >
            {/* Section overview link */}
            {activeTab.overviewHref && activeTab.overviewLabel ? (
              <>
                <a
                  href={activeTab.overviewHref}
                  onClick={onClose}
                  aria-current={
                    matchesPath(currentPath, activeTab.overviewHref) ? "page" : undefined
                  }
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    matchesPath(currentPath, activeTab.overviewHref)
                      ? "bg-cta/10 text-cta"
                      : "text-site-text hover:bg-surface-2"
                  }`}
                >
                  {activeTab.overviewLabel}
                  <svg
                    className="h-3.5 w-3.5 text-site-sub"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <div className="mx-3 my-1.5 h-px bg-border" />
              </>
            ) : null}

            {/* Items — nested groups become direct section links, no drill-in */}
            {activeTab.items.map((item) => {
              if (isNavigationNestedItem(item)) {
                const isActive = matchesPath(currentPath, item.childHrefBase);
                return (
                  <a
                    key={item.slug}
                    href={item.childHrefBase}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 transition-colors ${
                      isActive ? "bg-cta/10" : "hover:bg-surface-2"
                    }`}
                  >
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-semibold leading-tight ${
                          isActive ? "text-cta" : "text-site-text"
                        }`}
                      >
                        {item.name}
                      </p>
                      {item.desc ? (
                        <p className="mt-0.5 line-clamp-1 text-xs text-site-sub">{item.desc}</p>
                      ) : null}
                    </div>
                    <span className="ml-3 shrink-0 rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-bold text-site-sub">
                      {item.children.length}
                    </span>
                  </a>
                );
              }

              const href = getNavigationItemHref(item, activeTab.baseHref);
              const isActive = matchesPath(currentPath, href);

              return (
                <a
                  key={item.slug}
                  href={href}
                  onClick={onClose}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 transition-colors ${
                    isActive ? "bg-cta/10" : "hover:bg-surface-2"
                  }`}
                >
                  <div className="min-w-0">
                    <p
                      className={`text-sm leading-tight ${
                        isActive ? "font-semibold text-cta" : "font-medium text-site-text"
                      }`}
                    >
                      {item.name}
                    </p>
                    {item.desc ? (
                      <p className="mt-0.5 line-clamp-1 text-xs text-site-sub">{item.desc}</p>
                    ) : null}
                  </div>
                  {isActive ? (
                    <span
                      className="ml-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cta"
                      aria-hidden="true"
                    />
                  ) : null}
                </a>
              );
            })}
          </nav>

          {/* ── Footer: portal login ── */}
          <div className="border-t border-border px-4 py-3">
            <a
              href={SIGN_IN_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-semibold text-site-text transition-colors hover:bg-surface-2"
              aria-label="Open Twilight Psychology client portal and telehealth login"
            >
              Client Portal & Telehealth Login
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes mobileNavPanelEnter {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mobileNavOverlayEnter {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .mobile-nav-panel-enter {
          animation: mobileNavPanelEnter 240ms cubic-bezier(.22, 1, .36, 1) forwards;
        }
        .mobile-nav-overlay-enter {
          animation: mobileNavOverlayEnter 200ms ease forwards;
        }
      `}</style>
    </>
  );
}
