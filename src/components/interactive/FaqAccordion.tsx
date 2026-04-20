import { useState, useCallback } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
}

export default function FaqAccordion({ items, title }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = useCallback((index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  }, []);

  return (
    <div className="space-y-3">
      {title && (
        <h3 className="text-sm font-semibold uppercase tracking-widest text-site-sub mb-4">
          {title}
        </h3>
      )}
      
      <div className="space-y-2">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                isOpen ? 'border-cta/20 shadow-sm' : 'border-border'
              }`}
              style={{
                animation: `blurIn 400ms ease-out both`,
                animationDelay: `${idx * 40}ms`,
              }}
            >
              <button
                onClick={() => toggleItem(idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${idx}`}
                className={`w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left transition-all duration-300 ${
                  isOpen
                    ? "bg-surface-soft text-site-text"
                    : "bg-surface hover:bg-surface-soft text-site-text"
                }`}
              >
                <span className="font-semibold leading-snug pr-2">
                  {item.question}
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>

              <div
                id={`faq-panel-${idx}`}
                role="region"
                className="grid transition-all duration-300 ease-in-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-border bg-site-bg px-4 sm:px-5 py-4">
                    <p className="text-sm text-site-sub leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
