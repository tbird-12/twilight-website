import type { ComponentChildren } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import { useKeyPress } from '../hooks';

interface ChatbotToggleProps {
  children: ComponentChildren;
}

export default function ChatbotToggle({ children }: ChatbotToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen((p) => !p), []);
  const close = useCallback(() => setIsOpen(false), []);

  useKeyPress('Escape', close);

  return (
    <div className="fixed bottom-3 right-3 md:bottom-5 md:right-5 z-60">
      {/* FAB Button */}
      <button
        type="button"
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={isOpen}
        aria-controls="chatbot-panel"
        onClick={toggle}
        className="w-11 h-11 md:w-14 md:h-14 rounded-full border bg-site-bg hover:bg-site-bg/80 flex items-center justify-center transition-all shadow-md touch-manipulation"
        style={{ borderColor: 'var(--color-border)' }}
      >
        {isOpen ? (
          <svg className="w-5 h-5 md:w-6 md:h-6" style={{ color: 'var(--color-icon)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5 md:w-6 md:h-6" style={{ color: 'var(--color-icon)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          id="chatbot-panel"
          className="fixed bottom-16 left-3 right-3 md:bottom-24 md:left-auto md:right-5 md:w-fit w-auto max-h-[60vh] md:max-h-[75vh] h-auto max-w-[92vw] md:max-w-96 rounded-2xl border bg-site-bg shadow-lg flex flex-col overflow-hidden z-60"
          style={{
            borderColor: 'var(--color-border)',
            animation: 'scaleIn 200ms ease-out',
          }}
        >
          <div
            className="flex items-center justify-between border-b px-4 py-3 md:p-4 text-site-text text-sm md:text-base font-bold"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-soft)' }}
          >
            <span>Hi, I'm Liv</span>
            <button
              type="button"
              onClick={close}
              className="text-xl md:text-2xl leading-none hover:text-site-sub transition-colors"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          {children}
        </div>
      )}
    </div>
  );
}
