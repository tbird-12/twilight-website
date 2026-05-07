/**
 * Header component - Main navigation header with logo, nav, and mobile menu
 * Sticky at top with smooth animations
 */

import { useEffect, useRef, useState } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useScrollLock } from "./hooks";

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

  // Handle scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      lockScroll();
    } else {
      unlockScroll();
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
      setHeaderHeight(headerElement.getBoundingClientRect().height);
    };

    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    resizeObserver.observe(headerElement);
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-100 w-full border-b theme-border bg-site-bg/88 font-sans backdrop-blur-xl"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 lg:h-24 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 sm:gap-3 min-w-0">
            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`group md:hidden -ml-1 inline-flex min-w-[5.75rem] shrink-0 items-center justify-between gap-3 rounded-full border px-4 py-2.5 text-site-text shadow-sm transition-all duration-200 ${
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
              <span className="text-xs font-black uppercase tracking-[0.18em]">
                Menu
              </span>
              <span className="relative flex h-4 w-5 items-center justify-center" aria-hidden="true">
                <span
                  className={`absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-250 ${
                    isMobileMenuOpen ? "rotate-45" : "-translate-y-[6px]"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-250 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-250 ${
                    isMobileMenuOpen ? "-rotate-45" : "translate-y-[6px]"
                  }`}
                />
              </span>
            </button>

            {/* Logo */}
            <a
              href={logoHref}
              className="flex min-w-0 items-center gap-2 font-sans tracking-tighter text-site-text transition-opacity hover:opacity-80"
              aria-label="Home"
            >
              {logoSrc ? (
                <img
                  src={logoSrc}
                  alt="Twilight Psychology Logo"
                  className="h-10 lg:h-14 w-auto mb-1 shrink-0"
                  width={240}
                  height={180}
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
          <div className="md:hidden flex shrink-0 items-center gap-2">
            <a
              href="/contact"
              className="flex items-center gap-1 rounded-full bg-cta px-4 py-2 text-xs font-black text-cta-fg shadow-lg shadow-cta/20 transition-all hover:bg-cta/80 hover:ring-4 hover:ring-cta/20"
            >
              Contact Us
            </a>
          </div>

          {/* Desktop and Mobile Navigation */}
          <DesktopNav />
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
