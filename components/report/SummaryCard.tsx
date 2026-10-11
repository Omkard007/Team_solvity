"use client";

import { FileText, HelpCircle, Layers } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface SummaryCardProps {
  shortSummary: string;
  whyThisHappened: string;
  mainIssues?: string[];
  className?: string;
}

export function SummaryCard({
  shortSummary,
  whyThisHappened,
  mainIssues = [],
  className,
}: SummaryCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="flex items-center gap-3 border-b border-[#E6E8E7] bg-[#FAFAFA] px-6 py-4">
        <Badge variant="icon">
          <FileText className="h-4 w-4" />
        </Badge>
        <div>
          <h2 className="text-base font-bold text-[#1E2923]">Summary & Background</h2>
          <p className="text-xs text-[#4B5651]">Plain language overview of the case and core dispute</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Executive Summary */}
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-200 text-emerald-800 text-xs font-bold">
              ★
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
              Executive Summary
            </h3>
          </div>
          <p className="text-base sm:text-lg leading-relaxed text-[#1E2923]">
            {shortSummary}
          </p>
        </div>

        {/* Why This Happened */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-[var(--accent)]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#4B5651]">
              Why This Happened (Background Context)
            </h3>
          </div>
          <p className="rounded-xl border border-[#E6E8E7] bg-white p-4 text-sm sm:text-base leading-relaxed text-[#1E2923]">
            {whyThisHappened}
          </p>
        </div>

        {/* Main Issues Framed */}
        {mainIssues.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-[var(--accent)]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4B5651]">
                Core Legal Questions Before the Court
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {mainIssues.map((issue, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-[#E6E8E7] bg-[#FAFAFA] p-3 text-sm text-[#1E2923]"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent-ink)]">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5 leading-snug">{issue}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
