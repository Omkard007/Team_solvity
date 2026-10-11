"use client";

import { useRef, type ChangeEvent } from "react";
import { Upload, FileText, X } from "lucide-react";
import type { SelectedSource } from "@/lib/types";
import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB, SAMPLE_LABEL } from "@/lib/constants";
import { formatBytes } from "@/lib/utils";

export type FileFieldProps = {
  selectedSource: SelectedSource;
  onSelectFile: (file: File) => void;
  onSelectSample: () => void;
  onClear: () => void;
  error?: string | null;
  onErrorChange?: (err: string | null) => void;
};

export function FileField({
  selectedSource,
  onSelectFile,
  onSelectSample,
  onClear,
  error,
  onErrorChange,
}: FileFieldProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      onErrorChange?.("Invalid file format. Please upload a PDF document.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      onErrorChange?.(`File size exceeds maximum limit of ${MAX_FILE_SIZE_MB} MB.`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    onErrorChange?.(null);
    onSelectFile(file);
  };

  const handleClear = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    onErrorChange?.(null);
    onClear();
  };

  return (
    <div className="w-full">
      <label htmlFor="pdf-upload" className="sr-only">
        Upload court document PDF
      </label>

      {!selectedSource ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            id="pdf-upload"
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            aria-describedby={error ? "file-error" : undefined}
            className="block w-full text-sm text-[#4B5651] rounded-xl border border-[#E6E8E7] p-1.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] file:mr-4 file:rounded-lg file:border-0 file:bg-[#F6F5FB] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#1E2923] hover:file:bg-[#ECEAFB] cursor-pointer"
          />
          <button
            type="button"
            onClick={onSelectSample}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--accent)] bg-[var(--accent-soft)]/20 px-4 py-2.5 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-soft)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] transition-colors"
          >
            <Upload className="h-4 w-4" aria-hidden="true" />
            <span>Load Sample</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-[#E6E8E7] bg-[#FAFAFA] p-3.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <FileText className="h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-[#1E2923]">
                {selectedSource.type === "file" ? selectedSource.file.name : SAMPLE_LABEL}
              </p>
              {selectedSource.type === "file" && (
                <p className="text-xs text-[#4B5651]">
                  {formatBytes(selectedSource.file.size)}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={handleClear}
            aria-label="Remove selected document"
            className="rounded-lg p-1.5 text-[#4B5651] hover:bg-[#E6E8E7] hover:text-[#1E2923] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] transition-colors"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {error && (
        <p id="file-error" role="alert" className="mt-2 text-xs sm:text-sm text-red-600 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
