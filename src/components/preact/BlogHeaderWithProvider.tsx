/**
 * BlogHeaderWithProvider - wraps BlogHeaderToggle with ThemeProvider for context
 */

import { ThemeProvider } from './ThemeContext';
import ThemeToggle from './ThemeToggle';

export default function BlogHeaderWithProvider() {
  return (
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}
