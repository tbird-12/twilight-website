/**
 * Theme Context — manages light/dark/system mode across React components.
 * Syncs with document.documentElement classList (light/dark) and localStorage.
 * When theme is 'system', the resolved class tracks the OS preference in real time.
 */

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import type { Theme, ThemeContextType } from './types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
}

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  return 'dark';
}

function getOsPrefersDark(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme);
  const [osPrefersDark, setOsPrefersDark] = useState<boolean>(getOsPrefersDark);
  const hasMountedRef = useRef(false);
  const transitionTimeoutRef = useRef<number | undefined>(undefined);

  // isDark is fully derived — never stored separately
  const isDark = theme === 'system' ? osPrefersDark : theme === 'dark';

  // Keep OS preference in sync at all times (cheap — no-op when theme !== 'system')
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setOsPrefersDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const applyTheme = useCallback((dark: boolean, storedTheme: Theme) => {
    const root = document.documentElement;
    const resolvedClass = dark ? 'dark' : 'light';
    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
    }
    root.classList.add('theme-transition');
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedClass);
    root.style.colorScheme = resolvedClass;
    localStorage.setItem('theme', storedTheme);
    transitionTimeoutRef.current = window.setTimeout(
      () => root.classList.remove('theme-transition'),
      400
    );
  }, []);

  // Apply theme whenever isDark or theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    const resolvedClass = isDark ? 'dark' : 'light';

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      // On first mount, reconcile with the class already set by the FOUC script
      if (!root.classList.contains(resolvedClass)) {
        root.classList.remove('light', 'dark');
        root.classList.add(resolvedClass);
        root.style.colorScheme = resolvedClass;
      }
      // Always persist the stored theme key (e.g. 'system') on first mount
      localStorage.setItem('theme', theme);
      return;
    }

    applyTheme(isDark, theme);
  }, [isDark, theme, applyTheme]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  // toggleTheme: kept for backward compat — skips 'system', cycles light ↔ dark
  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' || (prev === 'system' && isDark) ? 'light' : 'dark'));
  }, [isDark]);

  const value: ThemeContextType = { theme, isDark, setTheme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
