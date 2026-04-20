import type { ReactNode } from 'react';
import { useState, useCallback } from 'react';

interface AccordionItem {
  id: string;
  trigger: string | ReactNode;
  content: string | ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
  defaultOpen?: string;
}

export default function Accordion({
  items,
  allowMultiple = false,
  className = '',
  defaultOpen,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(
    defaultOpen ? new Set([defaultOpen]) : new Set()
  );

  const toggle = useCallback((id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  }, [allowMultiple]);

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openIds.has(item.id);
        return (
          <div
            key={item.id}
            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
              isOpen ? 'border-cta/20 shadow-sm' : 'border-border'
            }`}
            style={{
              animation: `blurIn 400ms ease-out both`,
              animationDelay: `${idx * 40}ms`,
            }}
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-${item.id}`}
              className={`w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left transition-all duration-300 ${
                isOpen
                  ? 'bg-surface-soft text-site-text'
                  : 'bg-surface hover:bg-surface-soft text-site-text'
              }`}
            >
              <span className="font-semibold leading-snug pr-2">
                {item.trigger}
              </span>
              <span className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${
                isOpen ? 'bg-cta/10 rotate-180' : 'bg-surface-soft'
              }`}>
                <svg
                  className="w-4 h-4 text-cta"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>

            <div
              id={`accordion-${item.id}`}
              role="region"
              className="grid transition-all duration-300 ease-in-out"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
              }}
            >
              <div className="overflow-hidden">
                <div className="border-t border-border bg-site-bg px-4 sm:px-5 py-4">
                  {typeof item.content === 'string' ? (
                    <p className="text-sm text-site-sub leading-relaxed">{item.content}</p>
                  ) : (
                    item.content
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
