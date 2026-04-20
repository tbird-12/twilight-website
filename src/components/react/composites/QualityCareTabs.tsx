import { useState, useEffect } from 'react';
import Accordion from '../primitives/Accordion';

interface CareItem {
  title: string;
  description: string;
  link?: string;
  iconSvg?: string;
}

interface QualityCareTabsProps {
  items: CareItem[];
  className?: string;
}

export default function QualityCareTabs({ items, className = '' }: QualityCareTabsProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const accordionItems = items.map((item, idx) => ({
    id: String(idx),
    trigger: (
      <span className="flex items-center gap-3">
        {item.iconSvg && (
          <span
            className="w-6 h-6 shrink-0"
            style={{ color: 'var(--color-icon)' }}
            dangerouslySetInnerHTML={{ __html: item.iconSvg }}
          />
        )}
        <span className="font-sans font-semibold text-[0.95rem] leading-snug">{item.title}</span>
      </span>
    ),
    content: (
      <div>
        <p className="text-site-sub text-sm leading-relaxed font-medium">{item.description}</p>
        {item.link && (
          <a
            href={item.link}
            className="inline-flex items-center text-cta text-sm font-semibold hover:underline mt-3"
          >
            Details about {item.title.toLowerCase()}
            <svg className="w-3 h-3 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        )}
      </div>
    ),
  }));

  // Mobile: accordion
  if (!isDesktop) {
    return (
      <div className={className}>
        <Accordion items={accordionItems} defaultOpen="0" allowMultiple />
      </div>
    );
  }

  // Desktop: two-panel tab layout
  return (
    <div className={`grid gap-10 items-start ${className}`} style={{ gridTemplateColumns: 'minmax(240px, 5fr) 7fr' }}>
      {/* Left: Tab list */}
      <nav className="flex flex-col gap-2" role="tablist" aria-label="Quality care highlights">
        <p className="px-1 pb-3 text-[0.6rem] font-extrabold tracking-[0.28em] uppercase" style={{ color: 'var(--theme-section-label)', opacity: 0.4 }}>
          Select a topic for details
        </p>
        {items.map((item, idx) => {
          const isActive = idx === activeTab;
          return (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(idx)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setActiveTab((idx + 1) % items.length);
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  setActiveTab((idx - 1 + items.length) % items.length);
                }
              }}
              className={`flex items-center gap-3 w-full px-5 py-3.5 text-left rounded-2xl border transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'border-l-[3px] border-l-cta'
                  : 'border-transparent hover:translate-x-0.5'
              }`}
              style={{
                background: isActive
                  ? 'rgba(var(--rgb-accent), 0.09)'
                  : 'rgba(var(--rgb-accent), 0.04)',
                borderColor: isActive ? undefined : 'rgba(var(--rgb-accent), 0.1)',
              }}
            >
              {item.iconSvg && (
                <span
                  className="w-5 h-5 shrink-0"
                  style={{ color: 'var(--color-icon)', opacity: isActive ? 1 : 0.4 }}
                  dangerouslySetInnerHTML={{ __html: item.iconSvg }}
                />
              )}
              <span
                className="font-sans font-semibold text-[0.95rem] leading-snug tracking-[0.01em] transition-colors"
                style={{ color: isActive ? 'var(--color-site-text)' : 'var(--color-site-sub)' }}
              >
                {item.title}
              </span>
              <svg
                className="ml-auto w-4 h-4 shrink-0 transition-all duration-200"
                style={{
                  color: 'var(--color-cta)',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateX(0)' : 'translateX(-6px)',
                }}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          );
        })}
      </nav>

      {/* Right: Content panel */}
      <div
        className="min-h-[22rem] rounded-3xl p-10 flex flex-col justify-center border"
        style={{
          background: 'rgba(var(--rgb-accent), 0.12)',
          borderColor: 'rgba(var(--rgb-accent), 0.12)',
          boxShadow: 'inset 0 1px 0 rgba(var(--rgb-accent), 0.06)',
        }}
      >
        {items.map((item, idx) => {
          if (idx !== activeTab) return null;
          return (
            <div key={idx} style={{ animation: 'blurIn 300ms ease-out' }}>
              <p className="text-[0.6rem] font-extrabold tracking-[0.28em] uppercase mb-5" style={{ color: 'var(--theme-section-label)', opacity: 0.4 }}>
                {String(idx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </p>
              <div className="flex items-start gap-4 mb-4">
                {item.iconSvg && (
                  <span
                    className="w-12 h-12 shrink-0"
                    style={{ color: 'var(--color-icon)' }}
                    dangerouslySetInnerHTML={{ __html: item.iconSvg }}
                  />
                )}
                <div>
                  <h3 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-site-text mb-0 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-site-sub text-base sm:text-[1.05rem] leading-relaxed max-w-md font-medium mt-3">
                    {item.description}
                    {item.link && (
                      <span className="block mt-3">
                        <a href={item.link} className="inline-flex items-center text-cta font-semibold hover:underline">
                          Details about {item.title.toLowerCase()}
                          <svg className="w-3 h-3 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
