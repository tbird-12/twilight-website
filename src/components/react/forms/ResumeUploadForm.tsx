import { useState } from "react";

interface ResumeUploadFormProps {
  position: string;
  scriptURL?: string;
}

export default function ResumeUploadForm({
  position,
  scriptURL = "",
}: ResumeUploadFormProps) {
  const [status, setStatus] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [statusType, setStatusType] = useState<"idle" | "error" | "success">(
    "idle"
  );

  const MAX_FILE_SIZE_MB = 1;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const validateFile = (file: File): { valid: boolean; message: string } => {
    if (file.type !== "application/pdf") {
      return {
        valid: false,
        message: "Please upload a valid PDF file.",
      };
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return {
        valid: false,
        message: `File size exceeds ${MAX_FILE_SIZE_MB}MB. Please compress or choose a smaller file.`,
      };
    }

    return { valid: true, message: "" };
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = form.elements.namedItem("resumeFile") as HTMLInputElement;

    if (!fileInput.files || fileInput.files.length === 0) {
      setStatus("Please select a file to upload.");
      setStatusType("error");
      return;
    }

    const file = fileInput.files[0];
    const validation = validateFile(file);

    if (!validation.valid) {
      setStatus(validation.message);
      setStatusType("error");
      return;
    }

    setUploading(true);
    setStatus("Uploading resume...");
    setStatusType("idle");

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      try {
        const base64Data = (reader.result as string).split(",")[1];
        const payload = {
          fileName: file.name,
          mimeType: file.type,
          fileData: base64Data,
          position: position,
        };

        if (!scriptURL) {
          setStatus(
            "Resume upload not yet configured. Please contact us directly at info@twilightpsychology.com"
          );
          setStatusType("error");
          setUploading(false);
          return;
        }

        const response = await fetch(scriptURL, {
          method: "POST",
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (data.status === "success") {
          setStatus("Resume uploaded successfully! We will review it shortly.");
          setStatusType("success");
          form.reset();
        } else {
          setStatus(
            `Upload failed: ${data.message || "Unknown error"}. Please try again or email us directly.`
          );
          setStatusType("error");
        }
      } catch (error) {
        setStatus(
          "An error occurred while uploading. Please try again or email us directly at info@twilightpsychology.com"
        );
        setStatusType("error");
      } finally {
        setUploading(false);
      }
    };

    reader.onerror = () => {
      setStatus(
        "Failed to read the file. Please try again or email us directly."
      );
      setStatusType("error");
      setUploading(false);
    };
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="resumeFile"
            className="block text-sm font-bold text-site-text mb-2"
          >
            Upload Your Resume (PDF, max 1MB)
          </label>
          <input
            type="file"
            id="resumeFile"
            name="resumeFile"
            accept="application/pdf"
            required
            disabled={uploading}
            className="block w-full text-sm text-site-sub file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-cta file:text-cta-fg hover:file:bg-cta/80 disabled:opacity-50"
          />
          <p className="text-xs text-site-sub mt-1">
            PDF files only • Maximum size: 1MB
          </p>
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="w-full py-3 px-4 rounded-full font-bold text-sm text-cta-fg bg-cta hover:bg-cta/80 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        >
          {uploading ? "Uploading..." : "Submit Resume"}
        </button>
      </form>

      {status && (
        <div
          className={`mt-4 p-4 rounded-lg text-sm font-medium ${
            statusType === "success"
              ? "bg-green-50 text-green-900 border border-green-200"
              : statusType === "error"
                ? "bg-red-50 text-red-900 border border-red-200"
                : "bg-blue-50 text-blue-900 border border-blue-200"
          }`}
        >
          {status}
        </div>
      )}
    </div>
  );
}
