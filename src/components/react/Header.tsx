/**
 * Header component - Main navigation header with logo, nav, and mobile menu
 * Sticky at top with smooth animations
 */

import { useState, useEffect } from 'react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { useScrollLock } from './hooks';

interface HeaderProps {
  logoHref?: string;
  logoSrc?: string;
}

export default function Header({ logoHref = '/', logoSrc }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lock: lockScroll, unlock: unlockScroll } = useScrollLock();

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

  return (
    <>
      <header className="sticky top-0 z-100 w-full bg-site-bg/80 backdrop-blur-md border-b theme-border font-sans">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-20 lg:h-24 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-site-text p-3 -ml-2 focus:outline-none focus:ring-2 focus:ring-cta/50 rounded-lg transition-colors active:bg-surface-soft"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open main menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              // Close icon
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Logo */}
          <a
            href={logoHref}
            className="items-center font-sans tracking-tighter text-site-text flex gap-2 hover:opacity-80 transition-opacity"
            aria-label="Home"
          >
            {logoSrc ? (
              <img
                src={logoSrc}
                alt="Twilight Psychology Logo"
                className="h-10 lg:h-14 w-auto mb-1"
                width={240}
                height={180}
              />
            ) : (
              <div className="h-10 lg:h-14 w-auto flex items-center justify-center bg-surface rounded-lg px-2">
                <span className="font-bold text-lg">TP</span>
              </div>
            )}
            <span className="font-serif font-black text-sm lg:text-lg text-site-text hover:text-cta transition-colors">
              Twilight<br className="md:hidden" />{' '}Psychology
            </span>
          </a>

          {/* Mobile contact button */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="/contact"
              className="bg-cta text-cta-fg px-4 py-2 rounded-full font-black text-xs hover:bg-cta/80 transition-all shadow-lg flex items-center gap-1"
            >
              Contact
            </a>
          </div>

          {/* Desktop and Mobile Navigation */}
          <DesktopNav />
        </div>
      </header>

      {/* Mobile Navigation - rendered outside header to avoid sticky context issues */}
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

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
