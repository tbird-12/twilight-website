/**
 * HeaderWithProvider - wraps Header with ThemeProvider for context
 */

import { ThemeProvider } from './ThemeContext';
import Header from './Header';

interface Props {
  logoSrc?: string;
}

export default function HeaderWithProvider({ logoSrc }: Props) {
  return (
    <ThemeProvider>
      <Header logoSrc={logoSrc} />
    </ThemeProvider>
  );
}
