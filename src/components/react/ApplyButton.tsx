import { useState } from "react";
import ResumeUploadForm from "./forms/ResumeUploadForm";

interface ApplyButtonProps {
  position: string;
  ctaLabel: string;
  ctaVariant: "solid" | "outline";
  scriptURL?: string;
}

export default function ApplyButton({
  position,
  ctaLabel,
  ctaVariant,
  scriptURL = "",
}: ApplyButtonProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="w-full">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className={`block w-full py-4 text-center font-black rounded-full transition-all text-sm ${
            ctaVariant === "solid"
              ? "bg-cta text-cta-fg hover:bg-cta/80 active:scale-95"
              : "border border-border-strong text-site-sub hover:bg-surface-2 italic"
          }`}
        >
          {ctaLabel}
        </button>
      ) : (
        <div className="space-y-3">
          <ResumeUploadForm position={position} scriptURL={scriptURL} />
          <button
            onClick={() => setShowForm(false)}
            className="w-full py-2 px-4 text-sm font-semibold text-site-sub hover:text-site-text transition-colors text-center"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
