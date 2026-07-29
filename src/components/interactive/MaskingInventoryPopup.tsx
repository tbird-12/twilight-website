import { useState, useEffect, useRef, useCallback } from "react";
import { useScrollLock } from "../react/hooks";
import { useFocusTrap } from "../react/hooks/useFocusTrap";
import { useReducedMotion } from "../react/hooks/useReducedMotion";
import MaskingInventory from "./MaskingInventory";

// ---------------------------------------------------------------------------
// Session/storage constants
// ---------------------------------------------------------------------------
const STORAGE_KEY = "tp-masking-popup-v1";
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const SCROLL_THRESHOLD = 0.55; // 55% page depth
const DELAY_MS = 40_000; // 40 seconds after load

type Phase = "closed" | "intro" | "inventory";

function readCooldown(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const ts = parseInt(raw, 10);
    return !isNaN(ts) && Date.now() - ts < COOLDOWN_MS;
  } catch {
    return false;
  }
}

function writeCooldown() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch { /* noop — storage unavailable */ }
}

// ---------------------------------------------------------------------------
// Close icon
// ---------------------------------------------------------------------------
function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Arrow icon (used in CTA)
// ---------------------------------------------------------------------------
function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Intro screen
// ---------------------------------------------------------------------------
interface IntroProps {
  onStart: () => void;
  onClose: () => void;
  reducedMotion: boolean;
}

function PopupIntro({ onStart, onClose, reducedMotion }: IntroProps) {
  return (
    <div
      className="p-6 sm:p-8"
      style={reducedMotion ? {} : { animation: "fadeInUp 350ms cubic-bezier(0, 0, 0.2, 1) both" }}
    >
      {/* Eyebrow */}
      <p className="text-xs font-black uppercase tracking-widest text-cta mb-3">
        Free · Private · 5 minutes
      </p>

      {/* Headline */}
      <h2
        id="masking-popup-title"
        className="font-heading text-2xl sm:text-3xl font-bold text-site-text mb-3 leading-tight"
        style={{ letterSpacing: "-0.02em" }}
      >
        Do you mask your autistic traits?
      </h2>

      {/* Body */}
      <p className="text-site-sub text-sm sm:text-base leading-relaxed mb-5">
        Many adults — especially women and late-diagnosed individuals — spend enormous
        energy performing "normal." The CAT-Q masking inventory helps you see that
        pattern clearly, in about 5 minutes.
      </p>

      {/* Privacy note */}
      <div className="flex items-start gap-3 bg-surface-2 border border-border rounded-2xl p-4 mb-6 text-xs text-site-sub">
        <span className="text-base mt-0.5 shrink-0" aria-hidden="true">🔒</span>
        <p>
          <strong className="text-site-text font-semibold">Zero tracking.</strong>{" "}
          Your answers never leave your device — no email, no account, no server
          storage. Nothing is transmitted or logged.
        </p>
      </div>

      {/* Single CTA */}
      <button
        type="button"
        onClick={onStart}
        className="
          w-full sm:w-auto inline-flex items-center justify-center gap-2
          bg-cta text-cta-fg
          px-8 py-4 rounded-2xl
          font-bold text-base
          hover:bg-cta/85 active:scale-[0.98]
          transition-all duration-150
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2
        "
      >
        Take the 5-min inventory
        <ArrowIcon />
      </button>

      {/* Footer note */}
      <p className="mt-4 text-xs text-site-sub">
        Based on the validated CAT-Q (Hull et al., 2019). Not a diagnostic instrument.
      </p>

      {/* Dismiss link */}
      <button
        type="button"
        onClick={onClose}
        className="mt-3 block text-xs text-site-sub hover:text-site-text underline underline-offset-2 transition-colors duration-150"
      >
        No thanks
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inventory screen (thin wrapper above MaskingInventory)
// ---------------------------------------------------------------------------
interface InventoryScreenProps {
  reducedMotion: boolean;
}

function InventoryScreen({ reducedMotion }: InventoryScreenProps) {
  return (
    <div
      className="p-5 sm:p-8"
      style={reducedMotion ? {} : { animation: "fadeIn 250ms ease both" }}
    >
      <div className="mb-5 pr-8">
        <p className="text-xs font-black uppercase tracking-widest text-cta mb-1.5">
          CAT-Q Masking Inventory
        </p>
        <p className="text-xs text-site-sub flex items-center gap-1.5">
          <span aria-hidden="true">🔒</span>
          Answers stay on your device — not transmitted or stored.
        </p>
      </div>
      <MaskingInventory />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main popup
// ---------------------------------------------------------------------------
export default function MaskingInventoryPopup() {
  const [phase, setPhase] = useState<Phase>("closed");
  const hasTriggeredRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const { lock, unlock } = useScrollLock();
  const reducedMotion = useReducedMotion();

  const isOpen = phase !== "closed";

  const handleClose = useCallback(() => {
    setPhase("closed");
    writeCooldown();
  }, []);

  const handleStart = useCallback(() => {
    setPhase("inventory");
  }, []);

  useFocusTrap({
    containerRef: dialogRef,
    isActive: isOpen,
    onEscape: handleClose,
  });

  const triggerPopup = useCallback(() => {
    if (hasTriggeredRef.current) return;
    if (readCooldown()) return;
    hasTriggeredRef.current = true;
    setPhase("intro");
  }, []);

  // Scroll-depth trigger
  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= SCROLL_THRESHOLD) triggerPopup();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [triggerPopup]);

  // Time-delay trigger
  useEffect(() => {
    const id = window.setTimeout(triggerPopup, DELAY_MS);
    return () => window.clearTimeout(id);
  }, [triggerPopup]);

  // Scroll lock while open
  useEffect(() => {
    if (isOpen) {
      lock();
      return unlock;
    }
    return undefined;
  }, [isOpen, lock, unlock]);

  if (!isOpen) return null;

  const panelAnim: React.CSSProperties = reducedMotion
    ? {}
    : { animation: "floatUp 400ms cubic-bezier(0, 0, 0.2, 1) both" };

  const backdropAnim: React.CSSProperties = reducedMotion
    ? {}
    : { animation: "fadeIn 250ms ease both" };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="masking-popup-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
    >
      {/* Backdrop — click closes popup (intro phase) or ignores (inventory) */}
      <div
        className="absolute inset-0 bg-site-bg/75 backdrop-blur-sm"
        style={backdropAnim}
        onClick={phase === "intro" ? handleClose : undefined}
        aria-hidden="true"
      />

      {/* Dialog panel */}
      <div
        ref={dialogRef}
        style={panelAnim}
        className="
          relative z-10 w-full sm:max-w-xl
          max-h-[92dvh] overflow-y-auto
          bg-surface border border-border
          rounded-t-4xl sm:rounded-4xl
          shadow-2xl
          sm:mx-4
        "
      >
        {/* Drag handle (mobile only) */}
        <div className="sm:hidden flex justify-center pt-3 pb-1" aria-hidden="true">
          <div className="w-10 h-1 rounded-full bg-border-strong" />
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close masking inventory"
          className="
            absolute top-4 right-4 z-10
            p-2 rounded-xl
            text-site-sub hover:text-site-text hover:bg-surface-2
            transition-colors duration-150
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta
          "
        >
          <CloseIcon />
        </button>

        {phase === "intro" ? (
          <PopupIntro
            onStart={handleStart}
            onClose={handleClose}
            reducedMotion={reducedMotion}
          />
        ) : (
          <InventoryScreen reducedMotion={reducedMotion} />
        )}
      </div>
    </div>
  );
}
