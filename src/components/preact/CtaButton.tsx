/**
 * CtaButton component - Call-to-action button with smooth hover effects
 * Features: Scale effect, glow on hover, smooth transitions
 */

import type { ComponentChildren } from 'preact';
import { duration, easing } from './animations';

interface CtaButtonProps {
  href: string;
  children: ComponentChildren;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  target?: string;
  rel?: string;
}

export default function CtaButton({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  target,
  rel,
}: CtaButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-10 py-3 sm:px-12 sm:py-4 text-base',
    lg: 'px-12 py-4 sm:px-16 sm:py-6 text-lg',
  };

  const variantClasses = {
    primary:
      'bg-cta text-cta-fg font-black rounded-full shadow-lg shadow-cta/20 hover:bg-cta/80 hover:ring-4 hover:ring-cta/30 active:scale-95',
    secondary:
      'bg-surface text-site-text font-semibold border border-button-border rounded-lg hover:bg-surface-hover active:scale-95',
  };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`
        inline-block text-center
        transition-all duration-200
        hover:scale-102
        hover:shadow-xl hover:shadow-cta/30
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      style={{
        transitionDuration: `${duration.fast}ms`,
      }}
    >
      {children}
    </a>
  );
}
