import type { ReactNode, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useState, useCallback, useRef, useEffect, Children } from 'react';

export interface Tab {
  id: string;
  label: string;
  badge?: string | number;
  sublabel?: string;
  isLink?: boolean;
  href?: string;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  children: ReactNode;
  variant?: 'pill' | 'underline' | 'card';
  className?: string;
  scrollOnChange?: boolean;
}

interface TabPanelProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function TabPanel({ id, children, className = '' }: TabPanelProps) {
  return (
    <div data-tab-panel-id={id} className={className}>
      {children}
    </div>
  );
}

const activeClasses = 'bg-cta text-cta-fg border-cta shadow-lg shadow-cta/20 scale-[1.02]';
const inactiveClasses = 'bg-surface-soft text-site-text border-border opacity-80 hover:border-cta/50 hover:text-cta hover:opacity-100 hover:scale-[1.01]';

export default function Tabs({
  tabs,
  defaultTab,
  children,
  className = '',
  scrollOnChange = false,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleTabClick = useCallback((tab: Tab) => {
    if (tab.isLink && tab.href) {
      window.location.href = tab.href;
      return;
    }
    setActiveTab(tab.id);
  }, []);

  useEffect(() => {
    if (scrollOnChange && tabListRef.current) {
      const activeButton = tabListRef.current.querySelector(`[data-tab-id="${activeTab}"]`);
      activeButton?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTab, scrollOnChange]);

  const handleKeyDown = useCallback((e: ReactKeyboardEvent) => {
    const nonLinkTabs = tabs.filter(t => !t.isLink);
    const currentIndex = nonLinkTabs.findIndex(t => t.id === activeTab);
    let nextIndex = currentIndex;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % nonLinkTabs.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + nonLinkTabs.length) % nonLinkTabs.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = nonLinkTabs.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    const next = nonLinkTabs[nextIndex];
    if (next) {
      setActiveTab(next.id);
      const btn = tabListRef.current?.querySelector(`[data-tab-id="${next.id}"]`) as HTMLElement;
      btn?.focus();
    }
  }, [tabs, activeTab]);

  const childArray = Children.toArray(children);

  return (
    <div className={className}>
      {/* Tab header hint */}
      <div className="mb-3 flex items-center justify-between px-1 text-xs text-site-sub">
        <p className="font-semibold uppercase tracking-wider">Choose a category</p>
      </div>

      {/* Tab triggers */}
      <div className="relative mb-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-linear-to-r from-site-bg to-transparent hidden lg:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-site-bg to-transparent hidden lg:block" />
        <div
          ref={tabListRef}
          className="flex flex-col lg:flex-row gap-3 pb-2 lg:overflow-x-auto lg:snap-x lg:snap-mandatory"
          role="tablist"
        >
          {tabs.map((tab, idx) => {
            const isActive = tab.id === activeTab;

            if (tab.isLink && tab.href) {
              return (
                <a
                  key={tab.id}
                  href={tab.href}
                  className={`w-full lg:w-auto snap-start px-5 py-4 rounded-2xl border transition-all duration-200 font-serif font-black text-sm tracking-wide ${inactiveClasses}`}
                >
                  <span className="flex items-center gap-3 text-left">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-current/20 text-xs font-black">
                      {idx + 1}
                    </span>
                    <span className="leading-tight">
                      <span className="block">{tab.label}</span>
                      {tab.sublabel && (
                        <span className="block text-xs uppercase tracking-wider opacity-70">
                          {tab.sublabel}
                        </span>
                      )}
                    </span>
                  </span>
                </a>
              );
            }

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                data-tab-id={tab.id}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onKeyDown={handleKeyDown}
                onClick={() => handleTabClick(tab)}
                className={`w-full lg:w-auto snap-start px-5 py-4 rounded-2xl border transition-all duration-200 font-serif font-black text-sm tracking-wide active:scale-95 ${
                  isActive ? activeClasses : inactiveClasses
                }`}
              >
                <span className="flex items-center gap-3 text-left">
                  <span
                    className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                      isActive
                        ? 'bg-site-bg/20 text-current'
                        : 'bg-surface text-site-text'
                    }`}
                  >
                    {tab.badge ?? idx + 1}
                  </span>
                  <span className="leading-tight">
                    <span className="block">{tab.label}</span>
                    {tab.sublabel && (
                      <span className="block text-xs uppercase tracking-wider opacity-70">
                        {tab.sublabel}
                      </span>
                    )}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab panels */}
      <div className="relative">
        {childArray.map((child) => {
          if (child && typeof child === 'object' && 'props' in child) {
            const props = (child as any).props;
            const panelId = props['id'] || props['data-tab-panel-id'];
            const isActive = panelId === activeTab;
            return (
              <div
                key={panelId}
                id={`panel-${panelId}`}
                role="tabpanel"
                aria-labelledby={`tab-${panelId}`}
                className={isActive ? '' : 'hidden'}
                style={isActive ? { animation: 'blurIn 250ms ease-out' } : undefined}
              >
                {child}
              </div>
            );
          }
          return child;
        })}
      </div>
    </div>
  );
}
