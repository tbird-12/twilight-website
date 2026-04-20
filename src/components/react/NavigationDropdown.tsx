/**
 * NavigationDropdown component for desktop mega menu
 * Full-width dropdown with horizontal item layout and backdrop blur
 * Matches the Astro NavigationDropdown behavior
 */

import { useState, useRef, useEffect } from 'react';

interface NavigationDropdownProps {
  title: string;
  items: any[];
  baseHref: string;
  sectionLabel?: string;
  moreLink?: { href: string; label: string };
}

function getItemHref(item: any, baseHref: string): string {
  if (item.slug.startsWith('/')) return item.slug;
  return `${baseHref}/${item.slug}`;
}

function NestedItem({ item }: { item: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsExpanded(false), 100);
  };

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return (
    <div
      className="relative group/nested"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-cta/10 hover:ring-1 hover:ring-cta/20 transition-all cursor-pointer"
        aria-haspopup="true"
        aria-expanded={isExpanded}
      >
        <div className="text-left">
          <div className="text-sm font-semibold text-site-text group-hover/nested:text-cta transition-colors">
            {item.name}
          </div>
          {item.desc && (
            <div className="text-xs font-medium text-site-sub">{item.desc}</div>
          )}
        </div>
        <svg
          className={`w-3 h-3 text-cta transition-transform ${isExpanded ? 'translate-x-0.5' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9 5l7 7-7 7" strokeWidth={3} />
        </svg>
      </button>

      {isExpanded && item.children && (
        <div
          className="absolute top-full left-0 mt-1 w-56 bg-surface-2 border-l-4 border-l-cta shadow-2xl rounded-b-xl p-3 z-60 nav-nested-enter"
        >
          {item.childLabel && (
            <div className="text-[10px] uppercase tracking-widest text-site-sub/80 font-black px-3 py-2">
              {item.childLabel}
            </div>
          )}
          {item.children.map((child: any, idx: number) => (
            <a
              key={`${child.slug}-${idx}`}
              href={`${item.childHrefBase}/${child.slug}`}
              className="block px-3 py-2 rounded-lg hover:bg-cta/10 text-sm font-semibold text-site-text hover:text-cta transition-all"
            >
              {child.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function NavigationDropdown({
  title,
  items,
  baseHref,
  sectionLabel,
  moreLink,
}: NavigationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState('5rem');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // Measure actual header height for accurate dropdown positioning
    const header = document.querySelector('header');
    if (header) {
      setHeaderHeight(`${header.offsetHeight}px`);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative py-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        type="button"
        className="flex items-center gap-1 text-[15px] font-semibold text-site-text hover:text-cta transition-colors"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {title}
        <svg className="w-4 h-4 text-cta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Full-width mega dropdown */}
      {isOpen && (
        <>
          {/* Backdrop blur overlay — blurs content below header and dropdown */}
          <div
            className="fixed left-0 right-0 bottom-0 z-40 bg-site-text/30 backdrop-blur-lg nav-backdrop-enter"
            style={{ top: headerHeight }}
            onClick={() => setIsOpen(false)}
          />

          {/* Mega menu panel */}
          <div
            className="fixed left-0 right-0 z-50 theme-surface border-t-4 border-t-cta shadow-2xl nav-mega-enter"
            style={{ top: headerHeight }}
            role="menu"
            aria-label={`${title} menu`}
          >
            <div className="max-w-5xl mx-auto px-8 py-5">
              {sectionLabel && (
                <div className="text-[10px] uppercase tracking-widest text-site-sub/80 font-black mb-3">
                  {sectionLabel}
                </div>
              )}

              {/* Horizontal item layout */}
              <div className="flex flex-wrap gap-x-8 gap-y-4 items-start">
                {items.map((item: any, idx: number) =>
                  item.hasNested ? (
                    <NestedItem key={`${item.slug}-${idx}`} item={item} />
                  ) : (
                    <a
                      key={`${item.slug}-${idx}`}
                      href={getItemHref(item, baseHref)}
                      className="group/item block px-4 py-3 rounded-xl hover:bg-cta/10 hover:ring-1 hover:ring-cta/20 transition-all"
                    >
                      <div className="text-sm font-semibold text-site-text group-hover/item:text-cta transition-colors">
                        {item.name}
                      </div>
                      {item.desc && (
                        <div className="text-xs font-medium text-site-sub">
                          {item.desc}
                        </div>
                      )}
                    </a>
                  )
                )}
              </div>

              {moreLink && (
                <div className="border-t theme-border mt-4 pt-3">
                  <a
                    href={moreLink.href}
                    className="flex items-center gap-2 py-2 text-sm font-bold text-cta hover:text-cta/80 transition-colors"
                  >
                    {moreLink.label}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes navMegaEnter {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes navBackdropEnter {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes navNestedEnter {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-mega-enter    { animation: navMegaEnter 250ms cubic-bezier(.4,0,.2,1) forwards; }
        .nav-backdrop-enter { animation: navBackdropEnter 200ms ease forwards; }
        .nav-nested-enter   { animation: navNestedEnter 200ms cubic-bezier(.4,0,.2,1) forwards; }
      `}</style>
    </div>
  );
}
