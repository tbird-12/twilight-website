/**
 * Header component - Main navigation header with logo, nav, and mobile menu
 * Sticky at top with smooth animations
 */

import { useEffect, useRef, useState } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useScrollLock } from "./hooks";
import { useReducedMotion } from "./hooks/useReducedMotion";
import SearchButton from "./primitives/SearchButton";

interface HeaderProps {
  logoHref?: string;
  logoSrc?: string;
  currentPath: string;
}

export default function Header({ logoHref = "/", logoSrc, currentPath }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const { lock: lockScroll, unlock: unlockScroll } = useScrollLock();
  const headerRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const menuButtonTransitionClass = prefersReducedMotion ? "" : "transition-all duration-200";
  const menuIconTransformClass = prefersReducedMotion ? "" : "transition-transform duration-250";
  const menuIconOpacityClass = prefersReducedMotion ? "" : "transition-all duration-250";

  // Handle scroll lock and document attribute for mobile nav state
  useEffect(() => {
    if (isMobileMenuOpen) {
      lockScroll();
      document.documentElement.setAttribute("data-mobile-nav-open", "true");
    } else {
      unlockScroll();
      document.documentElement.removeAttribute("data-mobile-nav-open");
    }
  }, [isMobileMenuOpen, lockScroll, unlockScroll]);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const headerElement = headerRef.current;

    if (!headerElement) {
      return undefined;
    }

    const updateHeaderHeight = () => {
      const nextHeaderHeight = Math.round(headerElement.getBoundingClientRect().height);
      setHeaderHeight((currentHeaderHeight) => (
        currentHeaderHeight === nextHeaderHeight ? currentHeaderHeight : nextHeaderHeight
      ));
    };

    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    resizeObserver.observe(headerElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-100 w-full border-b theme-border bg-site-bg/88 font-sans backdrop-blur-xl"
      >
        <div className="max-w-6xl mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:h-24">
          <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`group md:hidden inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-site-text shadow-sm ${menuButtonTransitionClass} ${
                isMobileMenuOpen
                  ? "pointer-events-none opacity-0"
                  : "border-border bg-site-bg/90 hover:border-border-strong hover:bg-surface"
              }`}
              aria-label="Open main menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-haspopup="dialog"
              aria-hidden={isMobileMenuOpen}
              tabIndex={isMobileMenuOpen ? -1 : 0}
            >
              <span className="relative flex h-4 w-5 items-center justify-center" aria-hidden="true">
                <span
                  className={`absolute h-0.5 w-5 rounded-full bg-current ${menuIconTransformClass} ${
                    isMobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-5 rounded-full bg-current ${menuIconOpacityClass} ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-5 rounded-full bg-current ${menuIconTransformClass} ${
                    isMobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
                  }`}
                />
              </span>
            </button>

            {/* Logo */}
            <a
              href={logoHref}
              className="flex min-w-0 items-center gap-2.5 font-sans tracking-tighter text-site-text transition-opacity hover:opacity-80"
              aria-label="Home"
            >
              {logoSrc ? (
                <img
                  src={logoSrc}
                  alt="Twilight Psychology Logo"
                  width={96}
                  height={96}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="h-10 lg:h-14 w-auto mb-1 shrink-0"
                />
              ) : (
                <div className="h-10 lg:h-14 w-auto flex shrink-0 items-center justify-center bg-surface rounded-lg px-2">
                  <span className="font-bold text-lg">TP</span>
                </div>
              )}
              <span className="font-serif font-black text-sm lg:text-lg text-site-text hover:text-cta transition-colors leading-tight">
                Twilight{' '}Psychology
              </span>
            </a>
          </div>

          {/* Mobile shortcut button */}
          <div className="md:hidden flex shrink-0 items-center gap-3">
            <SearchButton
              compact
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-site-bg text-site-text shadow-sm transition-all hover:border-border-strong hover:bg-surface"
            />
            <a
              href="/contact"
              className="flex items-center gap-1 rounded-full bg-cta px-4.5 py-2 text-xs font-black text-cta-fg shadow-lg shadow-cta/20 transition-all hover:bg-cta/80 hover:ring-4 hover:ring-cta/20"
            >
              Contact Us
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4 lg:gap-5">
            <DesktopNav headerHeight={headerHeight} />

            <div className="flex items-center gap-3">
              <SearchButton
                compact
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-site-bg text-site-text shadow-sm transition-all duration-200 hover:border-border-strong hover:bg-surface"
              />

              <a
                href="/contact"
                className="inline-flex items-center rounded-full bg-cta px-4 lg:px-8 py-2 lg:py-3 text-center text-xs font-black text-cta-fg shadow-lg shadow-cta/20 transition-all duration-200 hover:bg-cta/80 hover:ring-4 hover:ring-cta/30 active:scale-95"
              >
                <span className="inline-block text-center leading-tight">
                  Contact Us
                </span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation - rendered outside header to avoid sticky context issues */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentPath={currentPath}
        headerHeight={headerHeight}
      />

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
