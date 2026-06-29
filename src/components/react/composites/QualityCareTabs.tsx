import { useState } from 'react';

interface CareItem {
  title: string;
  description: string;
  link?: string;
}

interface QualityCareTabsProps {
  items: CareItem[];
  className?: string;
}

export default function QualityCareTabs({ items, className = '' }: QualityCareTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const activeItem = items[activeTab] ?? items[0];
  const itemCountLabel = String(items.length).padStart(2, '0');

  return (
    <div className={`space-y-5 ${className}`}>
      <div className="grid gap-4 lg:hidden">
       <div className="grid gap-3 sm:grid-cols-2">
         {items.map((item, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={idx}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveTab(idx)}
                className="group cursor-pointer rounded-[1.4rem] border p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-cta/20 hover:shadow-lg hover:shadow-cta/10"
                style={{
                  borderColor: isActive ? 'rgba(var(--rgb-accent), 0.18)' : 'rgba(var(--rgb-accent), 0.1)',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(var(--rgb-accent), 0.08), rgba(var(--rgb-accent-alt), 0.04))'
                    : 'var(--color-surface)',
                  boxShadow: isActive ? 'inset 0 1px 0 rgba(var(--rgb-accent), 0.08)' : 'none',
                }}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-site-sub">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: isActive ? 'var(--color-cta)' : 'rgba(var(--rgb-accent), 0.24)' }} />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold leading-tight text-site-text">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-site-sub">
                    {isActive ? 'Currently selected' : 'Tap to view this strength'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <article
          className="glass-card-premium rounded-4xl border border-border/70 p-5 sm:p-6"
          style={{
            borderColor: 'rgba(var(--rgb-accent), 0.12)',
            background:
              'linear-gradient(135deg, rgba(var(--rgb-accent), 0.06), rgba(var(--rgb-accent-alt), 0.04))',
            boxShadow: 'inset 0 1px 0 rgba(var(--rgb-accent), 0.08)',
          }}
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <span
              className="inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.28em]"
              style={{
                borderColor: 'rgba(var(--rgb-accent), 0.16)',
                background: 'rgba(var(--rgb-accent), 0.05)',
                color: 'var(--theme-section-label)',
              }}
            >
              Featured strength
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-site-sub">
              {String(activeTab + 1).padStart(2, '0')} / {itemCountLabel}
            </span>
          </div>
          <h3 className="max-w-xl font-serif text-2xl font-bold leading-tight tracking-[-0.025em] text-site-text sm:text-[1.7rem]">
            {activeItem.title}
          </h3>
          <p className="mt-3 text-sm font-medium leading-relaxed text-site-sub sm:text-[0.95rem]">
            {activeItem.description}
          </p>
          {activeItem.link && (
            <a
              href={activeItem.link}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cta hover:underline"
            >
              View this offering
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          )}
        </article>
      </div>

      <div className="hidden gap-5 lg:grid" style={{ gridTemplateColumns: 'minmax(300px, 0.9fr) minmax(0, 1.1fr)' }}>
        <div className="grid gap-3">
          {items.map((item, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={idx}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveTab(idx)}
                className="group flex cursor-pointer items-start justify-between gap-4 rounded-[1.4rem] border p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-cta/20 hover:shadow-lg hover:shadow-cta/10"
                style={{
                  borderColor: isActive ? 'rgba(var(--rgb-accent), 0.16)' : 'rgba(var(--rgb-accent), 0.1)',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(var(--rgb-accent), 0.08), rgba(var(--rgb-accent-alt), 0.04))'
                    : 'var(--color-surface)',
                  boxShadow: isActive ? 'inset 0 1px 0 rgba(var(--rgb-accent), 0.08)' : 'none',
                }}
              >
                <div className="min-w-0">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-site-sub">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: isActive ? 'var(--color-cta)' : 'rgba(var(--rgb-accent), 0.24)' }} />
                  </div>
                  <h4 className="font-serif text-lg font-semibold leading-tight text-site-text">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-site-sub">
                    {isActive ? 'Currently selected' : 'Tap to view this strength'}
                  </p>
                </div>
                <svg className="mt-1 h-4 w-4 shrink-0 text-cta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            );
          })}
        </div>

        <article
          className="glass-card-premium rounded-4xl border border-border/70 p-8 xl:p-10"
          style={{
            borderColor: 'rgba(var(--rgb-accent), 0.12)',
            background:
              'linear-gradient(135deg, rgba(var(--rgb-accent), 0.06), rgba(var(--rgb-accent-alt), 0.04))',
            boxShadow: 'inset 0 1px 0 rgba(var(--rgb-accent), 0.08)',
          }}
        >
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.28em]"
              style={{
                borderColor: 'rgba(var(--rgb-accent), 0.16)',
                background: 'rgba(var(--rgb-accent), 0.05)',
                color: 'var(--theme-section-label)',
              }}
            >
              Featured strength
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-site-sub">
              {String(activeTab + 1).padStart(2, '0')} / {itemCountLabel}
            </span>
          </div>
          <h3 className="max-w-2xl font-serif text-3xl font-bold leading-tight tracking-[-0.025em] text-site-text xl:text-[2.15rem]">
            {activeItem.title}
          </h3>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-site-sub xl:text-[1.02rem]">
            {activeItem.description}
          </p>
          {activeItem.link && (
            <a
              href={activeItem.link}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cta hover:underline"
            >
              Explore this offering
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          )}
        </article>

      </div>
    </div>
  );
}
