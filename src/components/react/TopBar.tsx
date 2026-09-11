/**
 * TopBar - Premium banner above header with contact info, quick links, and search
 * Visible only on desktop (md and up), hidden on mobile
 */

import {
  PHONE_NUMBER,
  PHONE_NUMBER_FORMATTED,
  WIDGET_LINK,
} from "../../data/resource";
import SearchButton from "./primitives/SearchButton";

interface TopBarProps {
  // Optional className for additional styling
  className?: string;
}

export default function TopBar({ className = "" }: TopBarProps) {
  return (
    <div
      className={`hidden md:flex sticky top-0 z-50 w-full border-b theme-border bg-site-bg/95 font-sans backdrop-blur-lg ${className}`.trim()}
    >
      <div className="max-w-6xl mx-auto flex w-full items-center justify-between gap-4 px-4 sm:px-6 py-3">
        {/* Left: Phone Number */}
        <div className="flex items-center gap-3">
          <a
            href={WIDGET_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-site-text transition-colors hover:text-cta"
            aria-label="Request Appointment"
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
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <span>Request appointment</span>
          </a>

          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-2 text-sm font-medium text-site-text transition-colors hover:text-cta"
            aria-label="Call Twilight Psychology"
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
        </div>

        {/* Right: Search, Blog, and Book an Appointment */}
        <div className="flex items-center gap-4 lg:gap-6">
          <SearchButton
            compact={false}
            label="Search"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-site-bg px-4 py-2 text-sm font-medium text-site-text shadow-sm transition-all hover:border-border-strong hover:bg-surface"
            ariaLabel="Search the site"
          />

          <a
            href="/blog"
            className="text-sm font-medium text-site-text transition-colors hover:text-cta"
          >
            Blog
          </a>
        </div>
      </div>
    </div>
  );
}
