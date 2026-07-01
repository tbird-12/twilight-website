/**
 * MobileNav — Bottom-sheet navigation with drill-in submenus.
 * 2026 redesign: compact 2×2 root tile grid, list-row submenus with left accent
 * bars, directional slide transitions, and a persistent quick-action footer.
 */

import { useEffect, useMemo, useRef, useState } from "react";
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

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  headerHeight: number;
}

const sections: MobileNavSection[] = [
  {
    id: "about",
    title: "About",
    description: "Meet the team, locations, and our story.",
    items: aboutMenuItems,
    baseHref: "/about",
  },
  {
    id: "services",
    title: "Services",
    description: "Evaluations, therapy, and medication support.",
    items: allServicesMenuItems,
    baseHref: "/services",
    overviewHref: "/services",
    overviewLabel: "Browse all Services",
  },
  {
    id: "specialties",
    title: "Specialties",
    description: "Focused care pathways for specific needs.",
    items: allSpecialtiesMenuItems,
    baseHref: "/specialties",
    overviewHref: "/specialties",
    overviewLabel: "Browse all Specialties",
  },
  {
    id: "resources",
    title: "Resources",
    description: "Fees, insurance, FAQ, and getting started.",
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

// ─── Section Tile (2×2 root grid) ────────────────────────────────────────────

interface MobileSectionTileProps {
  section: MobileNavSection;
  currentPath: string;
  onOpen: (section: MobileNavSection) => void;
}

function MobileSectionTile({ section, currentPath, onOpen }: MobileSectionTileProps) {
  const isActive = matchesPath(currentPath, section.baseHref);

  return (
    <button
      type="button"
      onClick={() => onOpen(section)}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 active:scale-[0.97] ${
        isActive
          ? "border-border-strong bg-surface shadow-sm shadow-site-text/5"
          : "border-border bg-surface/80 hover:border-border-strong hover:bg-surface"
      }`}
    >
      <div className="mb-2.5 flex items-start justify-between gap-1">
        <h3 className="font-serif text-base font-semibold leading-tight text-site-text">
          {section.title}
        </h3>
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
            isActive
              ? "border-border-strong bg-surface-2 text-site-text"
              : "border-border bg-site-bg text-site-sub group-hover:border-border-strong group-hover:text-site-text"
          }`}
          aria-hidden="true"
        >
          <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              d="M9 5l7 7-7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
            />
          </svg>
        </span>
      </div>

      <p className="text-xs leading-relaxed text-site-sub">{section.description}</p>

      {isActive && (
        <span
          className="absolute bottom-0 left-0 h-0.5 w-full bg-cta/40"
          aria-hidden="true"
        />
      )}
    </button>
  );
}

// ─── List row for direct link items in submenus ───────────────────────────────

interface MobileMenuListItemProps {
  item: NavigationMenuItem;
  baseHref: string;
  currentPath: string;
  onNavigate: () => void;
}

function MobileMenuListItem({
  item,
  baseHref,
  currentPath,
  onNavigate,
}: MobileMenuListItemProps) {
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
      className={`group relative flex min-h-13 items-center gap-3 px-5 py-3.5 transition-colors duration-150 ${
        isActive ? "bg-cta/10" : "hover:bg-surface-2"
      }`}
    >
      {/* Left accent bar */}
      <span
        className={`absolute bottom-2 left-0 top-2 w-0.5 rounded-r-full transition-opacity duration-150 ${
          isActive
            ? "bg-cta opacity-100"
            : "bg-site-text/20 opacity-0 group-hover:opacity-100"
        }`}
        aria-hidden="true"
      />

      <div className="min-w-0 flex-1">
        <div
          className={`text-sm font-semibold leading-tight ${
            isActive ? "text-cta" : "text-site-text"
          }`}
        >
          {item.name}
        </div>
        {item.desc && (
          <p className="mt-0.5 line-clamp-1 text-xs leading-5 text-site-sub">{item.desc}</p>
        )}
      </div>

      <svg
        className={`h-3.5 w-3.5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 ${
          isActive ? "text-cta" : "text-site-sub"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      </svg>
    </a>
  );
}

// ─── List row for group items (drill-in) in submenus ─────────────────────────

interface MobileMenuGroupListItemProps {
  item: NavigationNestedItem;
  currentPath: string;
  onOpen: (item: NavigationNestedItem) => void;
}

function MobileMenuGroupListItem({
  item,
  currentPath,
  onOpen,
}: MobileMenuGroupListItemProps) {
  const isActive = hasActiveNavigationItems(item.children, item.childHrefBase, currentPath);

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={`group relative flex w-full min-h-13 items-center gap-3 px-5 py-3.5 text-left transition-colors duration-150 ${
        isActive ? "bg-cta/10" : "hover:bg-surface-2"
      }`}
      aria-haspopup="true"
    >
      {/* Left accent bar */}
      <span
        className={`absolute bottom-2 left-0 top-2 w-0.5 rounded-r-full transition-opacity duration-150 ${
          isActive
            ? "bg-cta opacity-100"
            : "bg-site-text/20 opacity-0 group-hover:opacity-100"
        }`}
        aria-hidden="true"
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-sm font-semibold leading-tight text-site-text">{item.name}</span>
          <span className="rounded-full bg-surface-2 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-[0.15em] text-site-sub">
            {item.childLabel}
          </span>
        </div>
        {item.desc && (
          <p className="mt-0.5 line-clamp-1 text-xs leading-5 text-site-sub">{item.desc}</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <span className="text-xs font-bold text-site-sub">{item.children.length}</span>
        <svg
          className="h-3.5 w-3.5 text-site-sub transition-transform duration-150 group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
        </svg>
      </div>
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function MobileNav({
  isOpen,
  onClose,
  currentPath,
  headerHeight,
}: MobileNavProps) {
  const [viewStack, setViewStack] = useState<MobileMenuView[]>([]);
  const [navDirection, setNavDirection] = useState<"in" | "out">("in");
  const [contentKey, setContentKey] = useState(0);
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
    setNavDirection("in");
    setContentKey((k) => k + 1);
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
    setNavDirection("in");
    setContentKey((k) => k + 1);
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
    setNavDirection("out");
    setContentKey((k) => k + 1);
    setViewStack((currentStack) => currentStack.slice(0, -1));
  };

  // Only animate content transitions after the first render (contentKey > 0).
  const contentAnimClass =
    prefersReducedMotion || contentKey === 0
      ? ""
      : navDirection === "in"
        ? "nav-content-enter"
        : "nav-content-back";

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-85 bg-site-text/20 md:hidden ${
          prefersReducedMotion ? "" : "mobile-nav-overlay-enter"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-up panel */}
      <div className="fixed inset-x-0 bottom-0 z-90 px-2 md:hidden" style={panelStyle}>
        <div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-nav-title"
          tabIndex={-1}
          className={`flex h-full max-h-[calc(100dvh-4rem)] flex-col overflow-hidden rounded-t-4xl border border-border bg-site-bg/96 shadow-2xl shadow-site-text/20 backdrop-blur-2xl ${
            prefersReducedMotion ? "" : "mobile-nav-panel-enter"
          }`}
        >
          {/* Drag handle */}
          <div className="px-5 pt-3 pb-0.5" aria-hidden="true">
            <div className="mx-auto h-1 w-9 rounded-full bg-border-strong/60" />
          </div>

          {/* Compact header */}
          <div className="flex items-center gap-2 px-3 py-2.5">
            {currentView ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-site-text transition-all duration-150 hover:bg-surface-2 active:scale-95"
                aria-label="Go back"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M15 19l-7-7 7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.25}
                  />
                </svg>
              </button>
            ) : (
              // Spacer keeps the layout stable when there's no back button
              <div className="h-9 w-9 shrink-0" aria-hidden="true" />
            )}

            <div className="min-w-0 flex-1 px-1">
              <h2
                id="mobile-nav-title"
                className="font-serif text-xl font-semibold leading-tight text-site-text"
              >
                {currentView ? currentView.title : "Navigation"}
              </h2>
              {!currentView && (
                <p className="text-[11px] text-site-sub">Find care faster</p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-site-text transition-all duration-150 hover:bg-surface-2 active:scale-95"
              aria-label="Close menu"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.25}
                />
              </svg>
            </button>
          </div>

          <div className="mx-4 h-px bg-border" />

          {/* Scrollable nav content */}
          <nav
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
            aria-label="Mobile navigation"
          >
            <div key={contentKey} className={contentAnimClass}>
              {currentView ? (
                /* ── Submenu view: compact list rows ── */
                <div className="py-1.5">
                  {currentView.overviewHref && currentView.overviewLabel ? (
                    <>
                      <a
                        href={currentView.overviewHref}
                        onClick={onClose}
                        className={`group relative flex min-h-13 items-center gap-3 px-5 py-3.5 transition-colors duration-150 ${
                          matchesPath(currentPath, currentView.overviewHref)
                            ? "bg-cta/10"
                            : "hover:bg-surface-2"
                        }`}
                      >
                        <span
                          className={`absolute bottom-2 left-0 top-2 w-0.5 rounded-r-full transition-opacity duration-150 ${
                            matchesPath(currentPath, currentView.overviewHref)
                              ? "bg-cta opacity-100"
                              : "bg-site-text/20 opacity-0 group-hover:opacity-100"
                          }`}
                          aria-hidden="true"
                        />
                        <div className="min-w-0 flex-1">
                          <div
                            className={`text-sm font-semibold leading-tight ${
                              matchesPath(currentPath, currentView.overviewHref)
                                ? "text-cta"
                                : "text-site-text"
                            }`}
                          >
                            {currentView.overviewLabel}
                          </div>
                          <p className="mt-0.5 text-xs text-site-sub">View the full overview</p>
                        </div>
                        <svg
                          className="h-3.5 w-3.5 shrink-0 text-site-sub transition-transform duration-150 group-hover:translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            d="M9 5l7 7-7 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                      </a>
                      <div className="mx-5 h-px bg-border" />
                    </>
                  ) : null}

                  <div className="divide-y divide-border">
                    {currentView.items.map((item) =>
                      isNavigationNestedItem(item) ? (
                        <MobileMenuGroupListItem
                          key={`${currentView.id}-${item.slug}`}
                          item={item}
                          currentPath={currentPath}
                          onOpen={openNestedGroup}
                        />
                      ) : (
                        <MobileMenuListItem
                          key={`${currentView.id}-${item.slug}`}
                          item={item}
                          baseHref={currentView.baseHref}
                          currentPath={currentPath}
                          onNavigate={onClose}
                        />
                      ),
                    )}
                  </div>
                </div>
              ) : (
                /* ── Root view: 2×2 section tile grid ── */
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-2.5">
                    {sections.map((section) => (
                      <MobileSectionTile
                        key={section.id}
                        section={section}
                        currentPath={currentPath}
                        onOpen={openSection}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Persistent quick-action footer */}
          <div className="border-t border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <a
                href="/resources/blog"
                onClick={onClose}
                className="flex flex-1 items-center justify-center rounded-full bg-cta px-4 py-2.5 text-xs font-black text-cta-fg shadow-sm shadow-cta/20 transition-all duration-150 hover:bg-cta/90 active:scale-[0.97]"
              >
                Blog
              </a>
              <a
                href="/resources/new-client"
                onClick={onClose}
                className="flex flex-1 items-center justify-center rounded-full border border-border bg-surface px-4 py-2.5 text-xs font-semibold text-site-text transition-all duration-150 hover:bg-surface-2 active:scale-[0.97]"
              >
                New Client Guide
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes mobileNavPanelEnter {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes mobileNavOverlayEnter {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes navContentEnter {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes navContentBack {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .mobile-nav-panel-enter {
          animation: mobileNavPanelEnter 280ms cubic-bezier(.22, 1, .36, 1) forwards;
        }

        .mobile-nav-overlay-enter {
          animation: mobileNavOverlayEnter 220ms ease forwards;
        }

        .nav-content-enter {
          animation: navContentEnter 200ms ease-out forwards;
        }

        .nav-content-back {
          animation: navContentBack 200ms ease-out forwards;
        }
      `}</style>
    </>
  );
}
