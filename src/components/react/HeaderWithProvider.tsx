/**
 * HeaderWithProvider - wraps Header with ThemeProvider context
 * Ensures ThemeToggle has access to theme context when hydrated
 */

import { ThemeProvider } from "./ThemeContext";
import Header from "./Header";

interface HeaderWithProviderProps {
  logoSrc?: string;
  currentPath: string;
}

export default function HeaderWithProvider({ logoSrc, currentPath }: HeaderWithProviderProps) {
  return (
    <ThemeProvider>
      <Header logoSrc={logoSrc} currentPath={currentPath} />
    </ThemeProvider>
  );
}
