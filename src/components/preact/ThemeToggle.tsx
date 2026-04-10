/**
 * ThemeToggle component - switches between light and dark mode
 * Uses smooth fade animation for theme transition
 */

import { useState, useEffect } from 'preact/hooks';
import { useTheme } from './ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render after hydration to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface hover:bg-surface-hover p-0 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
      style={{ color: 'var(--color-icon)' }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <svg
        className="h-6 w-6 transition-transform duration-300"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {isDark ? (
          // Sun icon
          <path d="M8.5 14.5c-.9-.98-1.5-2.33-1.5-3.84A5 5 0 0 1 12 5.66a5 5 0 0 1 5 5c0 1.51-.6 2.86-1.5 3.84-.69.75-1.5 1.66-1.5 2.84h-4c0-1.18-.81-2.09-1.5-2.84Z" />
        ) : (
          // Moon icon
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </svg>
      <span className="sr-only">
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </button>
  );
}
