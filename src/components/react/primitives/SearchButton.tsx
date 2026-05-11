import { useCallback } from "react";

interface SearchButtonProps {
  ariaLabel?: string;
  className?: string;
  compact?: boolean;
  label?: string;
  title?: string;
}

export default function SearchButton({
  ariaLabel = "Search the site",
  className = "",
  compact = false,
  label = "Search",
  title = "Search the site",
}: SearchButtonProps) {
  const handleClick = useCallback(() => {
    window.requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent("twilight:open-search"));
    });
  }, []);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      title={title}
      className={className}
    >
      <svg
        className="h-4 w-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      {!compact ? <span>{label}</span> : null}
    </button>
  );
}
