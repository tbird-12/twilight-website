import type { ComponentChildren } from 'preact';
import { useState, useCallback } from 'preact/hooks';

interface AccordionItem {
  id: string;
  trigger: string | ComponentChildren;
  content: string | ComponentChildren;
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
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div
            key={item.id}
            className="border border-border rounded-2xl overflow-hidden transition-all duration-200"
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-${item.id}`}
              className={`w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left transition-all duration-200 ${
                isOpen
                  ? 'bg-surface-soft text-site-text'
                  : 'bg-surface hover:bg-surface-soft text-site-text'
              }`}
            >
              <span className="font-semibold leading-snug pr-2">
                {item.trigger}
              </span>
              <svg
                className={`w-5 h-5 shrink-0 transition-transform duration-200 text-site-sub ${
                  isOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              id={`accordion-${item.id}`}
              role="region"
              className="grid transition-all duration-300"
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
