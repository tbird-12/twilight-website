import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { duration, easing } from './animations';
import CtaButton from './CtaButton';

interface HeroSectionProps {
  title: ReactNode;
  subtitle?: ReactNode;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string; target?: string; rel?: string };
  stats?: Array<{ label: string; value: string }>;
  className?: string;
}

export default function HeroSection({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  stats,
  className = '',
}: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    // Animate on component mount
    setHasAnimated(true);
  }, []);

  const titleDelay = 0;
  const subtitleDelay = titleDelay + 100;
  const ctaDelay = subtitleDelay + 100;
  const statsDelay = ctaDelay + 100;

  return (
    <div
      ref={heroRef}
      className={`hero-section text-center ${className}`}
    >
      {title && (
        <h1
          className="font-serif text-[2.0rem] sm:text-4xl md:text-6xl xl:text-7xl font-black text-site-text mb-2 sm:mb-6 tracking-tighter leading-[1.02]"
          style={{
            animation: hasAnimated && !prefersReducedMotion ? `focusBlur ${duration.slow}ms ${easing.smooth} both` : 'none',
            animationDelay: `${titleDelay}ms`,
          }}
        >
          {title}
        </h1>
      )}

      {/* Subtitle with staggered animation */}
      {subtitle && (
        <p
          className="max-w-xl mx-auto text-base sm:text-lg md:text-xl text-site-sub mb-6 sm:mb-10 leading-relaxed font-medium"
          style={{
            animation: hasAnimated && !prefersReducedMotion
              ? `fadeInUp ${duration.slow}ms ${easing.smooth} both`
              : 'none',
            animationDelay: `${subtitleDelay}ms`,
          }}
        >
          {subtitle}
        </p>
      )}

      {/* CTA Buttons with staggered animation */}
      {(primaryCta || secondaryCta) && (
        <div
          className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center"
          style={{
            animation: hasAnimated && !prefersReducedMotion
              ? `fadeInUp ${duration.slow}ms ${easing.smooth} both`
              : 'none',
            animationDelay: `${ctaDelay}ms`,
          }}
        >
          {primaryCta && (
            <CtaButton href={primaryCta.href} size="md">
              {primaryCta.label}
            </CtaButton>
          )}
          {secondaryCta && (
            <a
              href={secondaryCta.href}
              target={secondaryCta.target}
              rel={secondaryCta.rel}
              className="text-sm font-bold text-site-sub hover:text-icon transition-colors underline underline-offset-4 decoration-site-sub/30 hover:decoration-cta/50"
            >
              {secondaryCta.label} →
            </a>
          )}
        </div>
      )}

      {/* Stats with staggered animation */}
      {stats && stats.length > 0 && (
        <div
          className="mt-6 sm:mt-12 flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-10 gap-y-4"
          style={{
            animation: hasAnimated && !prefersReducedMotion
              ? `fadeInUp ${duration.slow}ms ${easing.smooth} both`
              : 'none',
            animationDelay: `${statsDelay}ms`,
          }}
        >
          {stats.map((stat, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-serif font-black text-icon">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-cta">
                {stat.label}
              </span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
