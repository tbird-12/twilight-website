import type { ReactNode } from 'react';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { keyframes, duration as dur, easing } from '../animations';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  accentWord?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: ReactNode;
}

function WordReveal({ text, accentWord, baseDelay = 0 }: { text: string; accentWord?: string; baseDelay?: number }) {
  const words = text.split(/(\s+)/);
  let wordIndex = 0;

  return (
    <>
      {words.map((word, idx) => {
        if (/^\s+$/.test(word)) return <span key={idx}>{' '}</span>;
        const delay = baseDelay + wordIndex * 40;
        wordIndex++;
        const isAccent = accentWord && word.replace(/[^a-zA-Z]/g, '') === accentWord.replace(/[^a-zA-Z]/g, '');
        return (
          <span
            key={idx}
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'baseline' }}
          >
            <span
              className={isAccent ? 'text-cta' : ''}
              style={{
                display: 'inline-block',
                animation: `wordRevealSlideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both`,
                animationDelay: `${delay}ms`,
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </>
  );
}

const sizeClasses = {
  sm: 'text-3xl md:text-4xl',
  md: 'text-4xl md:text-5xl lg:text-6xl',
  lg: 'text-5xl md:text-7xl',
};

export default function PageHero({
  title,
  subtitle,
  badge,
  accentWord,
  size = 'md',
  className = '',
  children,
}: PageHeroProps) {
  const [ref, isInView] = useInView({ threshold: 0.15 });
  const reduced = useReducedMotion();

  const animStyle = (delay: number) =>
    reduced
      ? {}
      : isInView
        ? {
            animation: `blurIn 500ms ${easing.smooth} both`,
            animationDelay: `${delay}ms`,
          }
        : { opacity: '0', filter: 'blur(8px)' };

  return (
    <section
      ref={ref as any}
      className={`relative py-20 md:py-28 px-4 text-center border-b overflow-hidden ${className}`}
      style={{ borderColor: 'var(--color-border)' }}
    >
      {/* Decorative accent line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px z-10"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(var(--rgb-accent-alt), 0.4), transparent)`,
          animation: isInView && !reduced ? 'drawLine 1s ease-out 0.3s both' : 'none',
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Badge */}
        {badge && (
          <div
            className="inline-block px-3 md:px-4 py-1.5 mb-5 md:mb-6 rounded-full bg-surface-2 border text-cta text-xs md:text-xs font-black uppercase tracking-widest"
            style={{ borderColor: 'var(--color-border-strong)', ...animStyle(50) }}
          >
            {badge}
          </div>
        )}

        {/* Title */}
        <h1
          className={`font-serif ${sizeClasses[size]} font-black text-site-text mb-4 md:mb-6 tracking-tight leading-tight`}
          style={animStyle(100)}
        >
          {isInView && !reduced ? (
            <WordReveal text={title} accentWord={accentWord} baseDelay={150} />
          ) : accentWord ? (
            <>
              {title.split(accentWord).map((part, i) => (
                <span key={i}>
                  {part}
                  {i < title.split(accentWord).length - 1 && (
                    <span className="text-cta">{accentWord}</span>
                  )}
                </span>
              ))}
            </>
          ) : (
            title
          )}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            className="text-lg md:text-xl text-site-sub font-medium max-w-2xl mx-auto leading-relaxed"
            style={animStyle(250)}
          >
            {subtitle}
          </p>
        )}

        {/* Extra content slot */}
        {children && (
          <div style={animStyle(350)}>
            {children}
          </div>
        )}
      </div>

      {/* Background radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at center top, rgba(var(--rgb-accent-alt), 0.06), transparent 70%)' }}
        aria-hidden="true"
      />
    </section>
  );
}
