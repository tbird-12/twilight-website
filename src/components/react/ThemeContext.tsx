/**
 * Theme Context for managing light/dark mode across React components
 * Syncs with document.documentElement classList (light/dark) and localStorage
 */

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import type { ThemeContextType } from './types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
}

function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return true;
  // Read from the document class which is set by the inline script before hydration
  return document.documentElement.classList.contains('dark');
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState<boolean>(getInitialTheme);
  const hasMountedRef = useRef(false);
  const transitionTimeoutRef = useRef<number | undefined>(undefined);

  const applyTheme = useCallback((dark: boolean) => {
    const root = document.documentElement;
    const theme = dark ? 'dark' : 'light';
    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
    }
    // Add transition class for smooth theme change
    root.classList.add('theme-transition');
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
    // Remove transition class after animation completes
    transitionTimeoutRef.current = window.setTimeout(() => root.classList.remove('theme-transition'), 400);
  }, []);

  // Apply theme when isDark changes
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const root = document.documentElement;
    const theme = isDark ? 'dark' : 'light';

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      if (!root.classList.contains(theme)) {
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        root.style.colorScheme = theme;
      }
      return;
    }

    applyTheme(isDark);
  }, [isDark, applyTheme]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  const value: ThemeContextType = {
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to use theme context in components
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
