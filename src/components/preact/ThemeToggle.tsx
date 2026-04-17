/**
 * ThemeToggle component - switches between light and dark mode
 * Uses smooth fade animation for theme transition
 */

import { useTheme } from "./ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface hover:bg-surface-hover p-0 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
      style={{ color: isDark ? "#fcd34d" : "var(--color-icon)" }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <svg
        className="h-6 w-6 transition-transform duration-300"
        fill={ "currentColor"} // Sun needs "none" for stroke, Moon needs "fill"
        stroke={isDark ? "currentColor" : "none"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {isDark ? (
          /* Sun Icon (scaled for 24x24) */
          <g>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </g>
        ) : (
          /* Moon Icon (standard 24x24) */
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </svg>
      <span className="sr-only">
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </span>
    </button>
  );
}
