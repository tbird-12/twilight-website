/**
 * Reusable Preact hooks for common patterns
 */

import { useEffect } from 'preact/hooks';

/**
 * Hook for handling keyboard events (ESC, Enter, etc.)
 */
export function useKeyPress(targetKey: string, callback: () => void) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        callback();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [targetKey, callback]);
}

/**
 * Hook for scroll lock (prevents scroll on body)
 */
export function useScrollLock() {
  const lock = () => {
    document.body.style.overflow = 'hidden';
  };

  const unlock = () => {
    document.body.style.overflow = '';
  };

  return { lock, unlock };
}
