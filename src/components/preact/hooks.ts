/**
 * Reusable Preact hooks for common patterns
 */

import { useEffect, useCallback } from 'preact/hooks';

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
 * Reference-counted scroll lock shared across all consumers.
 * Prevents one component from unlocking scroll while another still needs it locked.
 */
let scrollLockCount = 0;

export function useScrollLock() {
  const lock = useCallback(() => {
    scrollLockCount++;
    document.body.style.overflow = 'hidden';
  }, []);

  const unlock = useCallback(() => {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0) {
      document.body.style.overflow = '';
    }
  }, []);

  return { lock, unlock };
}
