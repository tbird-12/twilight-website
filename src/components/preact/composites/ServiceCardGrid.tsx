import AnimatedCard from '../primitives/AnimatedCard';
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
        const delay = reduced ? 0 : createStaggerDelay(idx, 80);
        const style = reduced
          ? {}
          : isInView
            ? {
                animation: `${keyframes.fadeInUp} ${dur.slow}ms ${easing.smooth} both`,
                animationDelay: `${delay}ms`,
              }
            : { opacity: '0' };

        return (
          <a
            key={item.slug}
            href={`${basePath}/${item.slug}`}
            className="group bg-surface-soft border rounded-2xl p-6 hover:border-cta/50 hover:shadow-lg hover:shadow-cta/10 transition-all duration-200"
            style={{ borderColor: 'var(--color-border)', ...style }}
          >
            <h3 className="font-serif text-lg font-bold text-site-text mb-2 group-hover:text-cta transition-colors">
              {item.name}
            </h3>
            {item.description && (
              <p className="text-sm text-site-sub leading-relaxed mb-4">{item.description}</p>
            )}
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cta/70 group-hover:text-cta transition-colors">
              Learn more
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        );
      })}
    </div>
  );
}
