/**
 * Smooth animation presets for Preact components
 * All animations follow: 150-300ms duration, ease-in-out easing
 * Subtle distances: 2-5px transforms, opacity shifts
 */

/**
 * Animation timing functions following design system
 */
export const easing = {
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)', // ease-in-out
  linear: 'linear',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
};

/**
 * Duration constants (in milliseconds)
 */
export const duration = {
  fast: 150,
  normal: 250,
  slow: 300,
  slower: 500,
};

/**
 * Utility function to create staggered animations for multiple elements
 * Usage: createStaggerDelay(2, 50) returns 100 (for 3rd item with 50ms delay per item)
 */
export function createStaggerDelay(index: number, baseDelay: number = 50): number {
  return index * baseDelay;
}
