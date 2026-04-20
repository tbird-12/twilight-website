import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { createStaggerDelay, keyframes, duration as dur, easing } from '../animations';

interface ServiceItem {
  name: string;
  slug: string;
  description?: string;
}

interface ServiceCardGridProps {
  items: ServiceItem[];
  basePath: string;
  className?: string;
}

export default function ServiceCardGrid({ items, basePath, className = '' }: ServiceCardGridProps) {
  const [ref, isInView] = useInView({ threshold: 0.05 });
  const reduced = useReducedMotion();

  return (
    <div ref={ref as any} className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {items.map((item, idx) => {
        const delay = reduced ? 0 : createStaggerDelay(idx, 100);
        const style = reduced
          ? {}
          : isInView
            ? {
                animation: `floatUp ${dur.slower}ms ${easing.smooth} both`,
                animationDelay: `${delay}ms`,
              }
            : { opacity: '0', transform: 'translateY(24px)' };

        return (
          <a
            key={item.slug}
            href={`${basePath}/${item.slug}`}
            className="group relative bg-surface-soft border rounded-2xl p-6 hover:border-cta/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cta/8 transition-all duration-300 overflow-hidden"
            style={{ borderColor: 'var(--color-border)', ...style }}
          >
            {/* Subtle top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cta/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
            <h3 className="font-serif text-lg font-bold text-site-text mb-2 group-hover:text-cta transition-colors duration-200">
              {item.name}
            </h3>
            {item.description && (
              <p className="text-sm text-site-sub leading-relaxed mb-4">{item.description}</p>
            )}
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cta/70 group-hover:text-cta transition-colors">
              Learn more
              <svg className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        );
      })}
    </div>
  );
}
