/**
 * Smooth animation presets for React components
 * All animations follow: 150-500ms duration, ease-in-out easing
 * Subtle distances: 2-20px transforms, opacity shifts
 */

/**
 * Animation timing functions following design system
 */
export const easing = {
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)', // ease-in-out
  linear: 'linear',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // overshoot spring
  gentle: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // gentle ease
};

/**
 * Duration constants (in milliseconds)
 */
export const duration = {
  fast: 150,
  normal: 250,
  slow: 300,
  slower: 500,
  reveal: 700,
};

/**
 * Utility function to create staggered animations for multiple elements
 * Usage: createStaggerDelay(2, 50) returns 100 (for 3rd item with 50ms delay per item)
 */
export function createStaggerDelay(index: number, baseDelay: number = 50): number {
  return index * baseDelay;
}

/**
 * Animation keyframe names (defined in global.css)
 */
export const keyframes = {
  fadeInUp: 'fadeInUp',
  fadeIn: 'fadeIn',
  slideInRight: 'slideInRight',
  scaleIn: 'scaleIn',
  wordReveal: 'wordRevealSlideUp',
  glowPulse: 'glowPulse',
  shimmer: 'shimmer',
  floatUp: 'floatUp',
  blurIn: 'blurIn',
  slideInLeft: 'slideInLeft',
} as const;

export type AnimationName = keyof typeof keyframes;

/**
 * Composable style generator for CSS animations
 */
export function animationStyle(
  keyframe: string,
  delay: number = 0,
  durationMs: number = duration.slow,
  easingFn: string = easing.smooth,
  active: boolean = true
): Record<string, string> {
  if (!active) return { opacity: '0' };
  return {
    animation: `${keyframe} ${durationMs}ms ${easingFn} both`,
    animationDelay: `${delay}ms`,
  };
}
