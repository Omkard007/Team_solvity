"use client";

import { useEffect, useRef } from "react";
import { FileText, Copy, Download, Check } from "lucide-react";
import { SectionCard } from "@/components/ui/SectionCard";
import { OutlinePillButton } from "@/components/ui/OutlinePillButton";
import { countWords } from "@/lib/utils";
import { cn } from "@/lib/utils";

export interface OriginalTextCardProps {
  originalText?: string;
  highlightSpan?: string;
  className?: string;
}

export function OriginalTextCard({
  originalText,
  highlightSpan,
  className,
}: OriginalTextCardProps) {
  const text = originalText || "Original court document text is not available.";
  const wordCount = countWords(text);
  const highlightRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (highlightSpan && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightSpan]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "original-court-document.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Render paragraphs with highlight if highlightSpan is found
  const renderContent = () => {
    if (!highlightSpan) {
      return text;
    }

    const regex = new RegExp(`(${highlightSpan.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) => {
      if (regex.test(part)) {
        return (
          <span
            key={i}
            ref={highlightRef}
            className="rounded-sm bg-emerald-200/70 text-emerald-950 font-bold px-1 ring-2 ring-emerald-500 animate-pulse"
            style={{ animationDuration: "1.2s" }}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <SectionCard
      icon={<FileText className="h-6 w-6 text-[var(--accent-ink)]" />}
      title="Original Document Text"
      subtitle="Raw text extracted directly from the court PDF or order"
      action={
        <div className="flex items-center gap-2">
          <OutlinePillButton
            icon={<Copy className="h-3.5 w-3.5" />}
            onClick={handleCopy}
            title="Copy original text"
          >
            Copy
          </OutlinePillButton>
          <OutlinePillButton
            icon={<Download className="h-3.5 w-3.5" />}
            onClick={handleDownload}
            title="Download original text file"
          >
            Download .txt
          </OutlinePillButton>
        </div>
      }
      className={cn("overflow-hidden", className)}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#5B6661]">
          <span>{wordCount} words extracted</span>
          {highlightSpan && (
            <span className="text-[var(--accent-ink)] font-semibold">
              Highlighting: &quot;{highlightSpan}&quot;
            </span>
          )}
        </div>

        <div className="max-h-[600px] overflow-y-auto rounded-xl border border-[#ECEEED] bg-[#FAFAFA]/70 p-5 font-mono text-xs sm:text-sm leading-relaxed text-[#1E2923] whitespace-pre-wrap select-text">
          {renderContent()}
        </div>
      </div>
    </SectionCard>
  );
}
