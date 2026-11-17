/**
 * ThemeToggle — sun-icon trigger that opens a Light / Dark / Device dropdown menu.
 * The trigger always shows the sun icon. Clicking it toggles the dropdown.
 */

import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import { useTheme } from "./ThemeContext";
import type { Theme } from "./types";
import { useReducedMotion } from "./hooks/useReducedMotion";

interface ThemeToggleProps {
  className?: string;
}

function SunIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="ml-auto h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

const OPTIONS: Array<{ value: Theme; label: string; Icon: ComponentType }> = [
  { value: "light", label: "Light",  Icon: SunIcon },
  { value: "dark",  label: "Dark",   Icon: MoonIcon },
  { value: "system", label: "Device", Icon: MonitorIcon },
];

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface p-0 text-icon shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-hover hover:shadow-md ${className}`.trim()}
        aria-label="Open theme menu"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="theme-dropdown-menu"
        title="Change theme"
      >
        <SunIcon />
      </button>

      {isOpen && (
        <div
          id="theme-dropdown-menu"
          role="menu"
          aria-label="Theme options"
          className={`absolute right-0 top-full z-50 mt-2 w-36 rounded-xl border border-border bg-surface p-1 shadow-xl ${
            prefersReducedMotion ? "" : "theme-dropdown-enter"
          }`}
        >
          {OPTIONS.map(({ value, label, Icon }) => (
            <button
              key={value}
              type="button"
              role="menuitemradio"
              aria-checked={theme === value}
              onClick={() => {
                setTheme(value);
                setIsOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                theme === value
                  ? "bg-cta/10 text-cta"
                  : "text-site-text hover:bg-surface-2"
              }`}
            >
              <Icon />
              {label}
              {theme === value && <CheckIcon />}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes themeDropdownEnter {
          from { opacity: 0; transform: translateY(-6px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .theme-dropdown-enter {
          animation: themeDropdownEnter 150ms cubic-bezier(.22, 1, .36, 1) forwards;
          transform-origin: top right;
        }
      `}</style>
    </div>
  );
}
