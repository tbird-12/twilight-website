import type { ComponentChildren } from 'preact';
import { createElement } from 'preact';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { keyframes, duration, easing } from '../animations';
import type { AnimationName } from '../animations';

interface AnimatedSectionProps {
  animation?: AnimationName;
  delay?: number;
  duration?: number;
  className?: string;
  as?: string;
  children: ComponentChildren;
}

export default function AnimatedSection({
  animation = 'fadeInUp',
  delay = 0,
  duration: dur = duration.slow,
  className = '',
  as = 'div',
  children,
}: AnimatedSectionProps) {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const reduced = useReducedMotion();

  const style = reduced
    ? {}
    : isInView
      ? {
          animation: `${keyframes[animation]} ${dur}ms ${easing.smooth} both`,
          animationDelay: `${delay}ms`,
        }
      : { opacity: '0' };

  return createElement(
    as,
    { ref, className, style },
    children
  );
}
