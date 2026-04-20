/**
 * Reusable React hooks for common patterns
 */

import { useEffect, useCallback } from 'react';

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
 * Uses position:fixed approach for iOS Safari compatibility.
 */
let scrollLockCount = 0;
let savedScrollY = 0;

export function useScrollLock() {
  const lock = useCallback(() => {
    if (scrollLockCount === 0) {
      savedScrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedScrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    }
    scrollLockCount++;
  }, []);

  const unlock = useCallback(() => {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0) {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo(0, savedScrollY);
    }
  }, []);

  return { lock, unlock };
}
