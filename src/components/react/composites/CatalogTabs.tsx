import { useState, useCallback } from 'react';
import Tabs, { TabPanel } from '../primitives/Tabs';

interface CatalogConcern {
  name: string;
}

interface CatalogCategory {
  id: string;
  title: string;
  concerns: CatalogConcern[];
}

interface CatalogTabsProps {
  categories: CatalogCategory[];
  className?: string;
}

export default function CatalogTabs({ categories, className = '' }: CatalogTabsProps) {
  const tabs = categories.map((cat, idx) => ({
    id: cat.id,
    label: cat.title,
    badge: String(idx + 1),
    sublabel: `${cat.concerns.length} focus areas`,
  }));

  return (
    <Tabs tabs={tabs} defaultTab={categories[0]?.id} className={className}>
      {categories.map((cat) => (
        <div key={cat.id} id={cat.id}>
          <article className="bg-surface-soft border rounded-3xl p-8 md:p-10" style={{ borderColor: 'var(--color-border)' }}>
            <h2 className="font-serif text-2xl md:text-3xl font-black text-site-text mb-6">
              {cat.title}
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {cat.concerns.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm text-site-sub leading-relaxed rounded-2xl p-4 border hover:border-cta/30 hover:shadow-sm transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    animation: `floatUp 400ms ease-out both`,
                    animationDelay: `${idx * 60}ms`,
                  }}
                >
                  <span className="text-cta mt-0.5 text-xs">✦</span>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      ))}
    </Tabs>
  );
}
