import type { CSSProperties, ReactNode } from 'react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  accentWord?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: ReactNode;
}

function buildAnimationStyle(name: string, delay: number, durationMs: number): CSSProperties {
  return {
    animation: `${name} ${durationMs}ms cubic-bezier(0.4, 0, 0.2, 1) both`,
    animationDelay: `${delay}ms`,
  };
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
              className={`${isAccent ? 'text-cta' : ''} motion-reduce:[animation:none!important]`}
              style={{
                display: 'inline-block',
                animation: 'wordRevealSlideUp 800ms cubic-bezier(0.34, 1.56, 0.64, 1) both',
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
  sm: 'fluid-display-sm',
  md: 'fluid-display-md',
  lg: 'fluid-display-xl',
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
  return (
    <section
      className={`relative py-20 md:py-28 px-4 text-center border-b overflow-hidden ${className}`}
      style={{ borderColor: 'var(--color-border)' }}
    >
      {/* Decorative accent line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px z-10 motion-reduce:hidden"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(var(--rgb-accent-alt), 0.4), transparent)`,
          animation: 'drawLine 1s ease-out 0.3s both',
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Badge */}
        {badge && (
          <div
            className="inline-block px-3 md:px-4 py-1.5 mb-5 md:mb-6 rounded-full bg-surface-2 border text-cta text-xs md:text-xs font-black uppercase tracking-widest motion-reduce:[animation:none!important]"
            style={{ borderColor: 'var(--color-border-strong)', ...buildAnimationStyle('blurIn', 50, 500) }}
          >
            {badge}
          </div>
        )}

        {/* Title */}
        <h1
          className={`font-serif ${sizeClasses[size]} font-black text-site-text mb-4 md:mb-6 motion-reduce:[animation:none!important]`}
          style={buildAnimationStyle('blurIn', 100, 500)}
        >
          {accentWord ? (
            <WordReveal text={title} accentWord={accentWord} baseDelay={150} />
          ) : (
            title
          )}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            className="fluid-lead text-site-sub font-medium max-w-2xl mx-auto motion-reduce:[animation:none!important]"
            style={buildAnimationStyle('blurIn', 250, 500)}
          >
            {subtitle}
          </p>
        )}

        {/* Extra content slot */}
        {children && (
          <div className="motion-reduce:[animation:none!important]" style={buildAnimationStyle('blurIn', 350, 500)}>
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
