/**
 * Shared TypeScript types and interfaces for React components
 */

// Theme types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  /** @deprecated Use setTheme instead. Kept for backward compatibility. */
  toggleTheme: () => void;
}

// Toast/Notification types
export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}
