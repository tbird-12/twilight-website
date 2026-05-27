/**
 * ThemeToggleWithProvider - standalone ThemeToggle with its own ThemeProvider
 * Allows the toggle to be hydrated independently of the Header island.
 */

import { ThemeProvider } from "./ThemeContext";
import ThemeToggle from "./ThemeToggle";

interface ThemeToggleWithProviderProps {
  className?: string;
}

export default function ThemeToggleWithProvider({ className }: ThemeToggleWithProviderProps) {
  return (
    <ThemeProvider>
      <ThemeToggle className={className} />
    </ThemeProvider>
  );
}
