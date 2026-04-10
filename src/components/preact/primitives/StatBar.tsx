import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useRef, useEffect, useState } from 'preact/hooks';
import { keyframes, duration as dur, easing, createStaggerDelay } from '../animations';

interface Stat {
  value: string;
  label: string;
}

interface StatBarProps {
  stats: Stat[];
  className?: string;
  variant?: 'inline' | 'grid';
}

function AnimatedValue({ value, isInView, reduced }: { value: string; isInView: boolean; reduced: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current || reduced) return;
    hasAnimated.current = true;

    const el = ref.current;
    if (!el) return;

    const numericPart = value.replace(/[^\d]/g, '');
    const target = parseInt(numericPart, 10);
    const suffix = value.replace(/[\d,]/g, '');

    if (!target || target <= 0) {
      el.textContent = value;
      return;
    }

    const durationMs = 1300;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);
      el.textContent = `${current}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value, reduced]);

  return (
    <span ref={ref} className="text-xl sm:text-2xl font-serif font-black text-icon">
      {value}
    </span>
  );
}

export default function StatBar({ stats, className = '', variant = 'inline' }: StatBarProps) {
  const [ref, isInView] = useInView({ threshold: 0.3 });
  const reduced = useReducedMotion();

  if (variant === 'grid') {
    return (
      <div ref={ref as any} className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}>
        {stats.map((stat, idx) => {
          const delay = reduced ? 0 : createStaggerDelay(idx, 100);
          const style = reduced
            ? {}
            : isInView
              ? {
                  animation: `${keyframes.fadeInUp} ${dur.slow}ms ${easing.smooth} both`,
                  animationDelay: `${delay}ms`,
                }
              : { opacity: '0' };

          return (
            <div key={idx} className="text-center" style={style}>
              <AnimatedValue value={stat.value} isInView={isInView} reduced={reduced} />
              <p className="text-xs sm:text-sm font-semibold text-cta mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={ref as any} className={`flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-10 gap-y-4 ${className}`}>
      {stats.map((stat, idx) => {
        const delay = reduced ? 0 : createStaggerDelay(idx, 100);
        const style = reduced
          ? {}
          : isInView
            ? {
                animation: `${keyframes.fadeInUp} ${dur.slow}ms ${easing.smooth} both`,
                animationDelay: `${delay}ms`,
              }
            : { opacity: '0' };

        return (
          <span key={idx} className="flex items-center gap-2" style={style}>
            <AnimatedValue value={stat.value} isInView={isInView} reduced={reduced} />
            <span className="text-xs sm:text-sm font-semibold text-cta">{stat.label}</span>
          </span>
        );
      })}
    </div>
  );
}
