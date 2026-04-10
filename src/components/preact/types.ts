/**
 * Shared TypeScript types and interfaces for Preact components
 */

import type { ComponentChildren } from 'preact';

// Theme types
export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

// Toast/Notification types
export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}
