import type { ComponentChildren } from 'preact';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { keyframes, duration as dur, easing } from '../animations';
import type { AnimationName } from '../animations';

interface AnimatedCardProps {
  href?: string;
  animation?: AnimationName;
  delay?: number;
  className?: string;
  hoverEffect?: 'lift' | 'glow' | 'border' | 'none';
  children: ComponentChildren;
}

const hoverClasses: Record<string, string> = {
  lift: 'hover:-translate-y-1 hover:shadow-lg transition-all duration-200',
  glow: 'hover:shadow-lg hover:shadow-cta/10 transition-all duration-200',
  border: 'hover:border-cta/50 transition-all duration-200',
  none: '',
};

export default function AnimatedCard({
  href,
  animation = 'fadeInUp',
  delay = 0,
  className = '',
  hoverEffect = 'lift',
  children,
}: AnimatedCardProps) {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const reduced = useReducedMotion();

  const style = reduced
    ? {}
    : isInView
      ? {
          animation: `${keyframes[animation]} ${dur.slow}ms ${easing.smooth} both`,
          animationDelay: `${delay}ms`,
        }
      : { opacity: '0' };

  const cls = `group ${hoverClasses[hoverEffect] || ''} ${className}`;

  if (href) {
    return (
      <a ref={ref as any} href={href} className={cls} style={style}>
        {children}
      </a>
    );
  }

  return (
    <div ref={ref as any} className={cls} style={style}>
      {children}
    </div>
  );
}
