"use client";

import { useState } from "react";
import { FileText, Sparkles, Scale, BookOpen, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { Tabs } from "@/components/ui/Tabs";
import { Disclaimer } from "@/components/layout/Disclaimer";
import { CopyButton } from "./CopyButton";
import { DownloadButton } from "./DownloadButton";
import { LegalReportDashboard } from "@/components/report";
import type { Level, SimplifyResult } from "@/lib/types";
import { LEVELS } from "@/lib/constants";
import { countWords } from "@/lib/utils";

export type ResultCardProps = {
  result: SimplifyResult | null;
  isLoading?: boolean;
  level: Level;
  onReset?: () => void;
  className?: string;
};

const RESULT_TABS = [
  { id: "simplified", label: "Simple English" },
  { id: "original", label: "Original Text" },
] as const;

export function ResultCard({
  result,
  isLoading = false,
  level,
  onReset,
  className,
}: ResultCardProps) {
  const [activeTab, setActiveTab] = useState<string>("simplified");

  // If we have full structured NyayaAIOutput data, render the comprehensive LegalReportDashboard!
  if (result?.data) {
    return (
      <LegalReportDashboard
        data={result.data}
        originalText={result.originalText}
        onReset={onReset}
        className={className}
      />
    );
  }

  // Loading state with intelligent progress indicators
  if (isLoading) {
    return (
      <Card className={className}>
        <div className="flex items-center gap-3.5 border-b border-[#E6E8E7] bg-[#FAFAFA] px-6 py-4.5">
          <Badge variant="icon" aria-hidden="true">
            <Sparkles className="h-4 w-4 animate-spin text-[var(--accent)]" />
          </Badge>
          <div>
            <h2 className="text-base font-bold text-[#1E2923]">
              Analyzing Court Document…
            </h2>
            <p className="text-xs text-[#4B5651]">
              Extracting legal rulings, statutory sections, timeline, and plain English translation
            </p>
          </div>
        </div>

        <div className="p-6 space-y-6" aria-busy="true" aria-live="polite">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-[#E6E8E7] bg-[#FAFAFA] p-3 text-xs text-[#4B5651]">
              <Scale className="h-4 w-4 text-[var(--accent)] animate-pulse" />
              <span>Deciphering legal rulings…</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-[#E6E8E7] bg-[#FAFAFA] p-3 text-xs text-[#4B5651]">
              <Clock className="h-4 w-4 text-[var(--accent)] animate-pulse" />
              <span>Sequencing case timeline…</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-[#E6E8E7] bg-[#FAFAFA] p-3 text-xs text-[#4B5651]">
              <BookOpen className="h-4 w-4 text-[var(--accent)] animate-pulse" />
              <span>Decoding legal statutes…</span>
            </div>
          </div>

          <div className="space-y-4 py-2">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-5 w-2/3" />
            <div className="pt-2">
              <Skeleton className="h-28 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (!result) return null;

  // Fallback view for simple string results without structured NyayaAIOutput
  const levelLabel = LEVELS.find((l) => l.id === level)?.label ?? level;
  const currentText =
    activeTab === "simplified"
      ? result?.simplifiedText ?? ""
      : result?.originalText ?? "Original text unavailable.";
  const wordCount = result?.wordCount ?? countWords(currentText);

  return (
    <Card className={className}>
      <div className="flex items-center gap-3.5 border-b border-[#E6E8E7] bg-[#FAFAFA] px-5 py-4">
        <Badge variant="icon" aria-hidden="true">
          <FileText className="h-4 w-4" />
        </Badge>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-[#1E2923]">
            Simple English Version
          </h2>
          <p className="truncate text-xs sm:text-sm text-[#4B5651]">
            Plain language conversion of the court document
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div>
          <div className="flex flex-col gap-4 border-b border-[#E6E8E7] pb-3 sm:flex-row sm:items-center sm:justify-between">
            <Tabs tabs={RESULT_TABS} activeTab={activeTab} onChange={setActiveTab} />
            <div className="flex items-center gap-2">
              <CopyButton text={currentText} />
              <DownloadButton
                text={currentText}
                filename={
                  activeTab === "simplified"
                    ? "simplified-court-order.txt"
                    : "original-court-order.txt"
                }
              />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-[#4B5651]">
            <span>Simplicity: {levelLabel}</span>
            <span>•</span>
            <span>{wordCount} words</span>
          </div>

          <div
            id={`tab-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-btn-${activeTab}`}
            className="mt-6 max-w-[65ch] space-y-4 text-base sm:text-lg leading-relaxed text-[#1E2923]"
          >
            {currentText.split("\n\n").map((para, idx) => (
              <p key={idx} className="whitespace-pre-line">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-8 border-t border-[#E6E8E7] pt-4">
            <Disclaimer showIcon />
          </div>
        </div>
      </div>
    </Card>
  );
}
