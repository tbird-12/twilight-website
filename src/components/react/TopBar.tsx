/**
 * TopBar - Banner above header with contact info, quick links, and search.
 * Desktop (md+): right-aligned utility row with directions, phone, search,
 * and client portal access.
 * Mobile (<md): compact strip with directions and phone number.
 */

import { useEffect, useState } from "react";
import {
  PHONE_NUMBER,
  PHONE_NUMBER_FORMATTED,
  MAIN_OFFICE_MAP_LINK,
  SIGN_IN_LINK,
} from "../../data/resource";
import SearchButton from "./primitives/SearchButton";

interface TopBarProps {
  className?: string;
}

export default function TopBar({ className = "" }: TopBarProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const syncMobileNavState = () => {
      setIsMobileNavOpen(
        document.documentElement.getAttribute("data-mobile-nav-open") ===
          "true",
      );
    };

    syncMobileNavState();

    const observer = new MutationObserver(syncMobileNavState);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-mobile-nav-open"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`relative z-10 w-full border-b border-cta/20 bg-site-bg/95 font-sans backdrop-blur-lg ${className}`.trim()}
      style={
        isMobileNavOpen
          ? {
              zIndex: 10,
              opacity: 0,
              visibility: "hidden",
              pointerEvents: "none",
            }
          : undefined
      }
    >
      {/* ── Mobile strip: directions + phone only ── */}
      <div className="md:hidden flex items-center justify-between gap-2 px-4 py-2">
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="flex items-center gap-1.5 text-xs font-medium text-site-text transition-colors hover:text-cta"
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
          <span>{PHONE_NUMBER_FORMATTED}</span>
        </a>

        <a
          href={MAIN_OFFICE_MAP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full bg-cta/10 border border-cta/25 px-3 py-1 text-xs font-semibold text-cta transition-all hover:bg-cta/15 hover:border-cta/40 active:scale-95"
          aria-label="Directions to Twilight Psychology"
        >
          <svg
            className="h-3 w-3 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="m3 11 19-9-9 19-2-8-8-2Z" />
          </svg>
          <span>Directions to Practice</span>
        </a>
      </div>

      {/* ── Desktop row: full layout ── */}
      <div className="hidden md:flex max-w-7xl mx-auto w-full items-center justify-end px-4 sm:px-6 py-2.5 lg:py-3">
        <div className="flex items-center gap-3 lg:gap-4 xl:gap-5">
          <SearchButton
            compact={false}
            label="Search"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-site-bg px-4 py-1.5 text-sm font-medium text-site-text shadow-sm transition-all hover:border-border-strong hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:ring-offset-site-bg"
            ariaLabel="Search the site"
          />

          <span className="select-none text-site-sub/30" aria-hidden="true">|</span>

          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-2 text-sm font-medium text-site-text transition-colors hover:text-cta"
            aria-label={`Call Twilight Psychology at ${PHONE_NUMBER_FORMATTED}`}
          >
            <svg
              className="h-4 w-4 shrink-0 text-icon"
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
            <span>{PHONE_NUMBER_FORMATTED}</span>
          </a>

          <span className="select-none text-site-sub/30" aria-hidden="true">|</span>

          <a
            href={MAIN_OFFICE_MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-button-border bg-surface/70 px-4 py-1.5 text-sm font-semibold text-site-text shadow-sm transition-all hover:border-cta/40 hover:bg-surface hover:text-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:ring-offset-site-bg"
            aria-label="Directions to Practice"
          >
            <svg
              className="h-3.5 w-3.5 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="m3 11 19-9-9 19-2-8-8-2Z" />
            </svg>
            <span>Directions to Practice</span>
          </a>

          <span className="select-none text-site-sub/30" aria-hidden="true">|</span>

          <a
            href={SIGN_IN_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-cta/25 bg-cta/10 px-4 py-1.5 text-sm font-semibold text-cta transition-all hover:border-cta/40 hover:bg-cta/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:ring-offset-site-bg"
            aria-label="Open the Twilight Psychology client portal"
          >
            <svg
              className="h-3.5 w-3.5 text-icon"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <path d="m10 17 5-5-5-5M15 12H3" />
            </svg>
            Client Portal
          </a>
        </div>
      </div>
    </div>
  );
}
