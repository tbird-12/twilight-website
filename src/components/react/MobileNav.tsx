/**
 * MobileNav component - sheet-style mobile navigation with drill-in submenus.
 * Supports grouped navigation items so the menu can grow without becoming a long accordion.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
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
import type { NavigationMenuItem, NavigationNestedItem } from "../../data/navigationData";

interface MobileNavSection {
  id: string;
  title: string;
  description: string;
  items: NavigationMenuItem[];
  baseHref: string;
  overviewHref?: string;
  overviewLabel?: string;
}

interface MobileMenuView {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  items: NavigationMenuItem[];
  baseHref: string;
  overviewHref?: string;
  overviewLabel?: string;
}

interface MobileQuickAction {
  label: string;
  href: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  headerHeight: number;
}

const mobileQuickActions: MobileQuickAction[] = [
  { label: "Insurances", href: "/resources/insurances-accepted" },
  { label: "New Client", href: "/resources/new-client" },
  { label: "Fees", href: "/resources/fees" },
];

const sections: MobileNavSection[] = [
  {
    id: "about",
    title: "About",
    description: "Meet the team, learn the practice story, and find locations.",
    items: aboutMenuItems,
    baseHref: "/about",
  },
  {
    id: "services",
    title: "Services",
    description: "Explore evaluations, therapy, medication support, and profiles.",
    items: allServicesMenuItems,
    baseHref: "/services",
    overviewHref: "/services",
    overviewLabel: "Browse all Services",
  },
  {
    id: "specialties",
    title: "Specialties",
    description: "Find focused evaluations and care pathways for specific needs.",
    items: allSpecialtiesMenuItems,
    baseHref: "/specialities",
    overviewHref: "/specialities",
    overviewLabel: "Browse all Specialties",
  },
  {
    id: "resources",
    title: "Resources",
    description: "See practical information for getting started and staying informed.",
    items: clientResourcesMenuItems,
    baseHref: "/resources",
  },
];

function normalizePath(path: string): string {
  if (!path || path === "/") {
    return "/";
  }

  return path.endsWith("/") ? path.slice(0, -1) : path;
}

function matchesPath(currentPath: string, targetPath: string): boolean {
  const normalizedCurrentPath = normalizePath(currentPath);
  const normalizedTargetPath = normalizePath(targetPath);

  if (normalizedTargetPath === "/") {
    return normalizedCurrentPath === "/";
  }

  return (
    normalizedCurrentPath === normalizedTargetPath ||
    normalizedCurrentPath.startsWith(`${normalizedTargetPath}/`)
  );
}

function hasActiveNavigationItems(
  items: NavigationMenuItem[],
  baseHref: string,
  currentPath: string,
): boolean {
  return items.some((item) => {
    if (isNavigationNestedItem(item)) {
      return hasActiveNavigationItems(item.children, item.childHrefBase, currentPath);
    }

    return matchesPath(currentPath, getNavigationItemHref(item, baseHref));
  });
}

interface MobileSectionCardProps {
  section: MobileNavSection;
  currentPath: string;
  onOpen: (section: MobileNavSection) => void;
}

function MobileSectionCard({ section, currentPath, onOpen }: MobileSectionCardProps) {
  const isActive = matchesPath(currentPath, section.baseHref);

  return (
    <button
      type="button"
      onClick={() => onOpen(section)}
      className={`w-full rounded-[1.75rem] border p-5 text-left transition-all duration-200 ${
        isActive
          ? "border-border-strong bg-surface shadow-lg shadow-site-text/5"
          : "border-border bg-surface/90 hover:border-border-strong hover:bg-surface hover:shadow-md"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-serif text-xl font-semibold text-site-text">{section.title}</h3>
            <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-site-sub">
              {section.items.length} links
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-site-sub">{section.description}</p>
        </div>
        <span
          className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-site-text transition-transform ${
            isActive ? "border-border-strong bg-surface-2" : "border-border bg-site-bg"
          }`}
          aria-hidden="true"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              d="M9 5l7 7-7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.25}
            />
          </svg>
        </span>
      </div>
    </button>
  );
}

interface MobileMenuLinkCardProps {
  item: NavigationMenuItem;
  baseHref: string;
  currentPath: string;
  onNavigate: () => void;
}

function MobileMenuLinkCard({
  item,
  baseHref,
  currentPath,
  onNavigate,
}: MobileMenuLinkCardProps) {
  if (isNavigationNestedItem(item)) {
    return null;
  }

  const href = getNavigationItemHref(item, baseHref);
  const isActive = matchesPath(currentPath, href);

  return (
    <a
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={`block rounded-3xl border px-4 py-4 transition-all duration-200 ${
        isActive
          ? "border-cta bg-cta text-cta-fg shadow-lg shadow-cta/15"
          : "border-border bg-surface hover:border-border-strong hover:bg-surface-2"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className={`text-base font-semibold ${isActive ? "text-cta-fg" : "text-site-text"}`}>
            {item.name}
          </div>
          {item.desc && (
            <p className={`mt-1 text-sm leading-6 ${isActive ? "text-cta-fg/80" : "text-site-sub"}`}>
              {item.desc}
            </p>
          )}
        </div>
        <svg
          className={`mt-1 h-4 w-4 shrink-0 ${isActive ? "text-cta-fg/80" : "text-site-sub"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M9 5l7 7-7 7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.25}
          />
        </svg>
      </div>
    </a>
  );
}

interface MobileMenuGroupCardProps {
  item: NavigationNestedItem;
  currentPath: string;
  onOpen: (item: NavigationNestedItem) => void;
}

function MobileMenuGroupCard({ item, currentPath, onOpen }: MobileMenuGroupCardProps) {
  const isActive = hasActiveNavigationItems(item.children, item.childHrefBase, currentPath);

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={`w-full rounded-3xl border px-4 py-4 text-left transition-all duration-200 ${
        isActive
          ? "border-border-strong bg-surface shadow-md shadow-site-text/5"
          : "border-border bg-surface hover:border-border-strong hover:bg-surface-2"
      }`}
      aria-haspopup="true"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-base font-semibold text-site-text">{item.name}</div>
            <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-site-sub">
              {item.childLabel}
            </span>
          </div>
          <p className="mt-1 text-sm leading-6 text-site-sub">{item.desc}</p>
          <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-site-sub/80">
            {item.children.length} options
          </p>
        </div>
        <span
          className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
            isActive ? "border-border-strong bg-surface-2" : "border-border bg-site-bg"
          }`}
          aria-hidden="true"
        >
          <svg className="h-4 w-4 text-site-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              d="M9 5l7 7-7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.25}
            />
          </svg>
        </span>
      </div>
    </button>
  );
}

export default function MobileNav({
  isOpen,
  onClose,
  currentPath,
  headerHeight,
}: MobileNavProps) {
  const [viewStack, setViewStack] = useState<MobileMenuView[]>([]);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useFocusTrap({
    containerRef: panelRef,
    isActive: isOpen,
    onEscape: onClose,
  });

  useEffect(() => {
    if (!isOpen) {
      setViewStack([]);
    }
  }, [isOpen]);

  const currentView = viewStack[viewStack.length - 1] ?? null;

  const panelStyle = useMemo(
    () => ({
      top: `${Math.max(headerHeight, 0)}px`,
      paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.5rem)",
    }),
    [headerHeight],
  );

  const openSection = (section: MobileNavSection) => {
    setViewStack([
      {
        id: section.id,
        title: section.title,
        eyebrow: "Explore",
        description: section.description,
        items: section.items,
        baseHref: section.baseHref,
        overviewHref: section.overviewHref,
        overviewLabel: section.overviewLabel,
      },
    ]);
  };

  const openNestedGroup = (item: NavigationNestedItem) => {
    setViewStack((currentStack) => [
      ...currentStack,
      {
        id: `${currentStack[currentStack.length - 1]?.id ?? "root"}:${item.slug}`,
        title: item.name,
        eyebrow: item.childLabel,
        description: item.desc,
        items: item.children,
        baseHref: item.childHrefBase,
      },
    ]);
  };

  const handleBack = () => {
    setViewStack((currentStack) => currentStack.slice(0, -1));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-85 bg-site-text/28 md:hidden ${
          prefersReducedMotion ? "" : "mobile-nav-overlay-enter"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-x-0 bottom-0 z-90 px-2 md:hidden" style={panelStyle}>
        <div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-nav-title"
          tabIndex={-1}
          className={`flex h-full max-h-[calc(100dvh-4rem)] flex-col overflow-hidden rounded-t-4xl border border-border bg-site-bg/96 shadow-2xl shadow-site-text/15 backdrop-blur-xl ${
            prefersReducedMotion ? "" : "mobile-nav-panel-enter"
          }`}
        >
          <div className="border-b theme-border px-4 pb-4 pt-3">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border" aria-hidden="true" />
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                {currentView ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-site-text transition-colors hover:border-border-strong hover:bg-surface-2"
                    aria-label="Go back"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M15 19l-7-7 7-7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.25}
                      />
                    </svg>
                  </button>
                ) : null}

                <div className="min-w-0">
                {currentView ? (
                  <>
                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-site-sub">
                      {currentView.eyebrow}
                    </p>
                    <h2 id="mobile-nav-title" className="mt-1 font-serif text-2xl font-semibold text-site-text">
                      {currentView.title}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-site-sub">{currentView.description}</p>
                  </>
                ) : (
                  <>
                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-site-sub">
                      Navigation
                    </p>
                    <h2 id="mobile-nav-title" className="mt-1 font-serif text-2xl font-semibold text-site-text">
                      Find care faster
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-site-sub">
                      Browse services, specialties, and practical resources without losing your place.
                    </p>
                  </>
                )}
              </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-site-text transition-colors hover:border-border-strong hover:bg-surface-2"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.25}
                  />
                </svg>
              </button>
            </div>
          </div>

          <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6 pt-4" aria-label="Mobile navigation">
            {currentView ? (
              <div className="space-y-3">
                {currentView.overviewHref && currentView.overviewLabel ? (
                  <a
                    href={currentView.overviewHref}
                    onClick={onClose}
                    className={`block rounded-3xl border px-4 py-4 transition-all duration-200 ${
                      matchesPath(currentPath, currentView.overviewHref)
                        ? "border-cta bg-cta text-cta-fg shadow-lg shadow-cta/15"
                        : "border-border bg-surface hover:border-border-strong hover:bg-surface-2"
                    }`}
                  >
                    <div className="text-base font-semibold"> {currentView.overviewLabel}</div>
                    <p
                      className={`mt-1 text-sm leading-6 ${
                        matchesPath(currentPath, currentView.overviewHref)
                          ? "text-cta-fg/80"
                          : "text-site-sub"
                      }`}
                    >
                      Start with the full overview page before choosing a specific destination.
                    </p>
                  </a>
                ) : null}

                {currentView.items.map((item) =>
                  isNavigationNestedItem(item) ? (
                    <MobileMenuGroupCard
                      key={`${currentView.id}-${item.slug}`}
                      item={item}
                      currentPath={currentPath}
                      onOpen={openNestedGroup}
                    />
                  ) : (
                    <MobileMenuLinkCard
                      key={`${currentView.id}-${item.slug}`}
                      item={item}
                      baseHref={currentView.baseHref}
                      currentPath={currentPath}
                      onNavigate={onClose}
                    />
                  ),
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="rounded-[1.75rem] border border-border bg-surface px-5 py-5 shadow-sm">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-site-sub">
                    Quick actions
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {mobileQuickActions.map((action) => {
                      const isActive = matchesPath(currentPath, action.href);

                      return (
                        <a
                          key={action.href}
                          href={action.href}
                          onClick={onClose}
                          aria-current={isActive ? "page" : undefined}
                          className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                            isActive
                              ? "border-cta bg-cta text-cta-fg"
                              : "border-border bg-site-bg text-site-text hover:border-border-strong hover:bg-surface-2"
                          }`}
                        >
                          {action.label}
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  {sections.map((section) => (
                    <MobileSectionCard
                      key={section.id}
                      section={section}
                      currentPath={currentPath}
                      onOpen={openSection}
                    />
                  ))}
                </div>
              </div>
            )}
          </nav>

          <div className="border-t theme-border bg-site-bg/90 px-4 py-4">
            <div className="flex items-center justify-between rounded-3xl border border-border bg-surface px-4 py-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-site-sub">
                  Appearance
                </p>
                <p className="mt-1 text-sm text-site-sub">
                  Switch themes without leaving the menu.
                </p>
              </div>
              <ThemeToggle />
            </div>
          </div>

          <style>{`
            @keyframes mobileNavPanelEnter {
              from {
                opacity: 0;
                transform: translateY(24px) scale(0.985);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }

            @keyframes mobileNavOverlayEnter {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            .mobile-nav-panel-enter {
              animation: mobileNavPanelEnter 260ms cubic-bezier(.22, 1, .36, 1) forwards;
            }

            .mobile-nav-overlay-enter {
              animation: mobileNavOverlayEnter 220ms ease forwards;
            }
          `}</style>
        </div>
      </div>
    </>
  );
}
