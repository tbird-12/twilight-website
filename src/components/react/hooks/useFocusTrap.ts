import { useEffect } from "react";
import type { RefObject } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

interface UseFocusTrapOptions {
  containerRef: RefObject<HTMLElement | null>;
  isActive: boolean;
  onEscape?: () => void;
}

export function useFocusTrap({ containerRef, isActive, onEscape }: UseFocusTrapOptions) {
  useEffect(() => {
    if (!isActive) {
      return undefined;
    }

    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const previousActiveElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusableElements = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter((element) => !element.hasAttribute("disabled") && element.tabIndex !== -1);

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    (firstFocusableElement ?? container).focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscape?.();
        return;
      }

      if (event.key !== "Tab" || !firstFocusableElement || !lastFocusableElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [containerRef, isActive, onEscape]);
}
