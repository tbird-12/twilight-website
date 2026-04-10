import { useState, useCallback } from "preact/hooks";

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
    setOpenIndex(openIndex === index ? null : index);
  }, [openIndex]);

  return (
    <div class="space-y-3">
      {title && (
        <h3 class="text-sm font-semibold uppercase tracking-widest text-site-sub mb-4">
          {title}
        </h3>
      )}
      
      <div class="space-y-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            class="border border-border rounded-lg overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => toggleItem(idx)}
              class={`w-full flex items-center justify-between gap-4 p-4 text-left transition-all duration-200 ${
                openIndex === idx
                  ? "bg-surface-soft text-icon"
                  : "bg-surface hover:bg-surface-soft text-site-text"
              }`}
            >
              <span class="font-semibold leading-snug pr-2">
                {item.question}
              </span>
              <svg
                class={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>

            {openIndex === idx && (
              <div
                class="border-t border-border bg-site-bg px-4 py-4 animate-in fade-in duration-200"
                style={{
                  animation: "fadeIn 200ms ease-out",
                }}
              >
                <p class="text-sm text-site-sub leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }
      `}</style>
    </div>
  );
}
