import AnimatedSection from '../primitives/AnimatedSection';

interface SidebarCtaProps {
  title: string;
  description?: string;
  buttonLabel: string;
  buttonHref: string;
  variant?: 'default' | 'highlight';
  items?: Array<{ text: string }>;
  className?: string;
  target?: string;
  rel?: string;
}

export default function SidebarCta({
  title,
  description,
  buttonLabel,
  buttonHref,
  variant = 'default',
  items,
  className = '',
  target,
  rel,
}: SidebarCtaProps) {
  const isHighlight = variant === 'highlight';

  return (
    <AnimatedSection animation="slideInRight" delay={200}>
      <div
        className={`sticky top-28 rounded-3xl p-6 sm:p-8 border ${className}`}
        style={{
          backgroundColor: isHighlight ? 'var(--color-cta)' : 'var(--color-surface-soft)',
          borderColor: isHighlight ? 'var(--color-cta)' : 'var(--color-border)',
        }}
      >
        <h3
          className="font-serif text-xl font-black mb-3"
          style={{ color: isHighlight ? 'var(--color-cta-fg)' : 'var(--color-site-text)' }}
        >
          {title}
        </h3>

        {description && (
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: isHighlight ? 'var(--color-cta-fg)' : 'var(--color-site-sub)' }}
          >
            {description}
          </p>
        )}

        {items && items.length > 0 && (
          <ul className="space-y-3 mb-6">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm" style={{ color: isHighlight ? 'var(--color-cta-fg)' : 'var(--color-site-text)' }}>
                <svg className="w-4 h-4 shrink-0" style={{ color: isHighlight ? 'var(--color-cta-fg)' : 'var(--color-icon)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item.text}
              </li>
            ))}
          </ul>
        )}

        <a
          href={buttonHref}
          target={target}
          rel={rel}
          className={`inline-flex items-center rounded-xl px-6 py-3 text-sm font-black transition-all duration-200 hover:scale-[1.02] ${
            isHighlight
              ? 'bg-site-bg text-cta hover:bg-site-bg/90'
              : 'bg-cta text-cta-fg hover:bg-cta/80'
          }`}
        >
          {buttonLabel}
        </a>
      </div>
    </AnimatedSection>
  );
}
