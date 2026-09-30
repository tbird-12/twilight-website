import { useState, useCallback } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface QualityCareItem {
  issue: string;
  title: string;
  desc: string;
  link: string;
}

interface QualityCareCardsProps {
  items: QualityCareItem[];
}

export default function QualityCareCards({ items }: QualityCareCardsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="qc-grid">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`qc-card${isOpen ? ' qc-card--open' : ''}`}
            style={
              reduced
                ? undefined
                : {
                    animationName: 'blurIn',
                    animationDuration: '480ms',
                    animationFillMode: 'both',
                    animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    animationDelay: `${i * 65}ms`,
                  }
            }
          >
            <button
              id={`qc-trigger-${i}`}
              type="button"
              className="qc-card-trigger"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              aria-controls={`qc-panel-${i}`}
            >
              <div className="qc-card-header">
                <span className="qc-card-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="qc-card-header-body">
                  <p className="qc-card-issue">&ldquo;{item.issue}&rdquo;</p>
                  <h3 className="qc-card-title">{item.title}</h3>
                </div>
              </div>
              <div className="qc-card-explore-row">
                <span className="qc-card-explore">Explore more</span>
                <span
                  className={`qc-card-chevron${isOpen ? ' qc-card-chevron--open' : ''}`}
                  aria-hidden="true"
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 6l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </button>

            <div
              id={`qc-panel-${i}`}
              role="region"
              aria-labelledby={`qc-trigger-${i}`}
              className="qc-card-panel"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="qc-card-panel-inner">
                <p className="qc-card-desc">{item.desc}</p>
                <a href={item.link} className="qc-card-link">
                  Learn more
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
