/**
 * HeaderWithProvider - wraps Header with its required context
 */

import Header from "./Header";

interface HeaderWithProviderProps {
  logoSrc?: string;
  currentPath: string;
}

export default function HeaderWithProvider({ logoSrc, currentPath }: HeaderWithProviderProps) {
  return (
    <Header logoSrc={logoSrc} currentPath={currentPath} />
  );
}
