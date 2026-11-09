/**
 * NavigationDropdown — Apple-style frosted-glass mega menu.
 *
 * Contrast & ARIA design:
 * - Panel uses `--nav-dropdown-rgb` (surface-2 in dark, white in light) at 97%
 *   opacity so it clearly stands above the page in both themes.
 * - Trigger buttons are `text-site-sub` at rest → `text-site-text` + pill
 *   background on hover/open — large lightness jump in both themes.
 * - Menu items are `text-site-sub` at rest → `text-site-text` on hover.
 * - Hover pill: `bg-site-text/[0.08]` adapts to theme automatically.
 * - Active page item: `bg-cta/[0.12] text-cta` ring, aria-current="page".
 * - All interactive items carry role="menuitem"; wrapper divs use role="none".
 * - Focus trap activates only on keyboard-initiated opens to avoid stealing
 *   focus on mouse hover.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusTrap } from "./hooks/useFocusTrap";
import {
  getNavigationItemHref,
  isNavigationNestedItem,
} from "../../data/navigationData";
import type {
  NavigationMenuItem,
  NavigationNestedItem,
} from "../../data/navigationData";

interface NavigationDropdownProps {
  headerHeight: number;
  title: string;
  items: NavigationMenuItem[];
  baseHref: string;
  sectionLabel?: string;
  moreLink?: { href: string; label: string };
  isOpen: boolean;
  onOpen: () => void;
  onScheduleClose: () => void;
  onCancelClose: () => void;
  currentPath?: string;
}

function normalizePath(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

// ─── NestedChildren ────────────────────────────────────────────────────────

function NestedChildren({
  items,
  baseHref,
  currentPath,
}: {
  items: NavigationMenuItem[];
  baseHref: string;
  currentPath?: string;
}) {
  return items.map((item, idx) =>
    isNavigationNestedItem(item) ? (
      <div key={`${item.slug}-${idx}`} role="none" className="px-3 py-2">
        <p
          className="text-xs font-black uppercase tracking-widest text-site-sub/60"
          aria-hidden="true"
        >
          {item.childLabel}
        </p>
        <div className="mt-2 space-y-0.5">
          <NestedChildren
            items={item.children}
            baseHref={item.childHrefBase}
            currentPath={currentPath}
          />
        </div>
      </div>
    ) : (() => {
      const href = getNavigationItemHref(item, baseHref);
      const isCurrent = Boolean(
        currentPath && normalizePath(href) === normalizePath(currentPath),
      );
      return (
        <a
          key={`${item.slug}-${idx}`}
          href={href}
          role="menuitem"
          aria-current={isCurrent ? "page" : undefined}
          className={`block rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta ${
            isCurrent
              ? "text-cta"
              : "text-site-sub hover:bg-site-text/[0.08] hover:text-site-text"
          }`}
        >
          {item.name}
        </a>
      );
    })(),
  );
}

// ─── NestedItem ────────────────────────────────────────────────────────────

function NestedItem({
  item,
  currentPath,
}: {
  item: NavigationNestedItem;
  currentPath?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuId = `nested-menu-${item.slug}`;

  const handleMouseEnter = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => setIsExpanded(false), 100);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape" && isExpanded) {
      event.stopPropagation();
      setIsExpanded(false);
      buttonRef.current?.focus();
    }
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <div
      className="relative group/nested"
      role="none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={buttonRef}
        type="button"
        role="menuitem"
        onClick={() => setIsExpanded((p) => !p)}
        className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-site-sub transition-all duration-150 hover:bg-site-text/[0.08] hover:text-site-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta"
        aria-haspopup="menu"
        aria-expanded={isExpanded}
        aria-controls={menuId}
      >
        <div className="text-left">
          <span className="block text-sm font-semibold">
            {item.name}
          </span>
          {item.desc && (
            <span className="mt-0.5 block text-xs font-medium opacity-70">
              {item.desc}
            </span>
          )}
        </div>
        <svg
          className={`ml-auto h-3 w-3 shrink-0 transition-transform duration-150 ${isExpanded ? "translate-x-0.5" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M9 5l7 7-7 7" strokeWidth={3} />
        </svg>
      </button>

      {/* Sub-panel — slides in from left via nav-sub-transition */}
      <div
        id={menuId}
        role="menu"
        aria-label={`${item.name} submenu`}
        className="nav-sub-transition absolute left-full top-0 ml-2 w-56 rounded-2xl border border-border p-3 shadow-2xl"
        data-open={isExpanded ? "true" : "false"}
        style={{
          zIndex: 62,
          background: `rgba(var(--nav-dropdown-rgb), 0.98)`,
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
        }}
      >
        {item.childLabel && (
          <p
            className="px-3 py-2 text-xs font-black uppercase tracking-widest text-site-sub/60"
            aria-hidden="true"
          >
            {item.childLabel}
          </p>
        )}
        <NestedChildren
          items={item.children}
          baseHref={item.childHrefBase}
          currentPath={currentPath}
        />
      </div>
    </div>
  );
}

// ─── NavigationDropdown ────────────────────────────────────────────────────

export default function NavigationDropdown({
  headerHeight,
  title,
  items,
  baseHref,
  sectionLabel,
  moreLink,
  isOpen,
  onOpen,
  onScheduleClose,
  onCancelClose,
  currentPath,
}: NavigationDropdownProps) {
  const menuContainerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const wasKeyboardOpenedRef = useRef(false);
  const menuId = `nav-menu-${title.toLowerCase().replace(/\s+/g, "-")}`;
  const panelTop = `${Math.max(headerHeight, 56)}px`;

  const onEscapeMenu = useCallback(() => {
    wasKeyboardOpenedRef.current = false;
    onScheduleClose();
  }, [onScheduleClose]);

  useFocusTrap({
    containerRef: menuContainerRef,
    isActive: isOpen && wasKeyboardOpenedRef.current,
    onEscape: onEscapeMenu,
  });

  const handleMouseEnter = () => {
    wasKeyboardOpenedRef.current = false;
    onCancelClose();
    onOpen();
  };

  const handleButtonClick = () => {
    if (isOpen) {
      wasKeyboardOpenedRef.current = false;
      onScheduleClose();
    } else {
      wasKeyboardOpenedRef.current = true;
      onOpen();
    }
  };

  return (
    <div
      className="relative py-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onScheduleClose}
    >
      {/* ── Trigger button ──
          text-site-sub (muted) at rest → text-site-text + pill on hover/open.
          This gives a strong lightness jump visible in both dark and light themes. */}
      <button
        ref={buttonRef}
        type="button"
        onClick={handleButtonClick}
        className={`group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[15px] font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:ring-offset-site-bg ${
          isOpen
            ? "bg-site-text/[0.13] text-site-text"
            : "text-site-sub hover:bg-site-text/[0.08] hover:text-site-text"
        }`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
      >
        {title}
        <svg
          className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* ── Mega-menu panel ──
          Always in DOM; CSS `nav-panel-transition` animates opacity + transform.
          Visibility is delayed on exit so hidden items can't be tabbed into. */}
      <div
        ref={menuContainerRef}
        id={menuId}
        role="menu"
        aria-label={`${title} navigation menu`}
        className="nav-panel-transition fixed left-0 right-0 z-50"
        data-open={isOpen ? "true" : "false"}
        style={{ top: panelTop }}
        onMouseEnter={() => {
          onCancelClose();
        }}
        onMouseLeave={onScheduleClose}
      >
        {/* Frosted glass surface.
            --nav-dropdown-rgb: surface-2 in dark (30,30,34) / surface in light (255,255,254).
            At 97% opacity this strongly contrasts the page background in both themes. */}
        <div
          className="border-b border-border shadow-[0_16px_48px_rgba(0,0,0,0.24)]"
          style={{
            background: `rgba(var(--nav-dropdown-rgb), 0.97)`,
            backdropFilter: "blur(28px) saturate(180%)",
            WebkitBackdropFilter: "blur(28px) saturate(180%)",
          }}
        >
          <div className="mx-auto max-w-5xl px-8 py-6">
            {/* Decorative section label — aria-hidden so screen readers skip it */}
            {sectionLabel && (
              <p
                className="mb-4 text-[10px] font-black uppercase tracking-[0.18em] text-site-sub/60"
                aria-hidden="true"
              >
                {sectionLabel}
              </p>
            )}

            {/* Menu items — role="none" wrapper so the flex div doesn't confuse
                ARIA: the menu items are direct owned children semantically. */}
            <div role="none" className="flex flex-wrap items-start gap-x-1 gap-y-1">
              {items.map((item, idx) => {
                if (isNavigationNestedItem(item)) {
                  return (
                    <NestedItem
                      key={`${item.slug}-${idx}`}
                      item={item}
                      currentPath={currentPath}
                    />
                  );
                }
                const href = getNavigationItemHref(item, baseHref);
                const isCurrent = Boolean(
                  currentPath && normalizePath(href) === normalizePath(currentPath),
                );
                return (
                  <a
                    key={`${item.slug}-${idx}`}
                    href={href}
                    role="menuitem"
                    aria-current={isCurrent ? "page" : undefined}
                    className={`group/item block rounded-xl px-4 py-3 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta ${
                      isCurrent
                        ? "bg-cta/[0.1] ring-1 ring-cta/25"
                        : "hover:bg-site-text/[0.08]"
                    }`}
                  >
                    <span
                      className={`block text-sm font-semibold transition-colors duration-150 ${
                        isCurrent
                          ? "text-cta"
                          : "text-site-sub group-hover/item:text-site-text"
                      }`}
                    >
                      {item.name}
                    </span>
                    {item.desc && (
                      <span className="mt-0.5 block text-xs font-medium text-site-sub/60">
                        {item.desc}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>

            {/* "View all …" footer link */}
            {moreLink && (
              <div role="none" className="mt-4 border-t border-border pt-3">
                <a
                  href={moreLink.href}
                  role="menuitem"
                  aria-label={moreLink.label}
                  className="inline-flex items-center gap-1.5 py-1 text-sm font-bold text-site-sub transition-all duration-150 hover:gap-3 hover:text-site-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta"
                >
                  {moreLink.label}
                  <svg
                    className="h-3.5 w-3.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
