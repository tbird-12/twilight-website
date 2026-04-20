/**
 * Shared TypeScript types and interfaces for React components
 */

import type { ReactNode } from 'react';

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
