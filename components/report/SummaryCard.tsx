"use client";

import { FileText, HelpCircle, Layers, Sparkles } from "lucide-react";
import { SectionCard } from "@/components/ui/SectionCard";
import { Stagger } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";

export interface SummaryCardProps {
  shortSummary?: string;
  whyThisHappened?: string;
  mainIssues?: string[];
  executiveSummary?: string;
  background?: { why: string; issues: string[] };
  className?: string;
}

export function SummaryCard({
  shortSummary,
  whyThisHappened,
  mainIssues = [],
  executiveSummary,
  background,
  className,
}: SummaryCardProps) {
  const summary = executiveSummary || shortSummary || "";
  const why = background?.why || whyThisHappened || "";
  const issues = background?.issues || mainIssues;

  return (
    <SectionCard
      icon={<FileText className="h-6 w-6 text-[var(--accent-ink)]" />}
      title="Summary & Background"
      subtitle="Plain language overview of the case and core dispute"
      className={cn("overflow-hidden", className)}
    >
      <div className="space-y-6">
        {/* Executive Summary with soft glow that settles and spinning star */}
        <div className="summary-tint-box relative overflow-hidden animate-in fade-in duration-600">
          <div className="flex items-center gap-2 mb-2.5">
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-ink)] text-xs font-bold transition-transform duration-700 ease-[var(--ease-spring)] hover:rotate-180"
              style={{
                animation: "spin-once 800ms var(--ease-spring) 200ms both",
              }}
            >
              ★
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-ink)]">
              Executive Summary
            </h3>
          </div>
          <p className="text-base sm:text-lg leading-relaxed text-[#1E2923] font-medium">
            {summary}
          </p>
        </div>

        {/* Why This Happened */}
        {why && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-[var(--accent-ink)]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5B6661]">
                Why This Happened (Background Context)
              </h3>
            </div>
            <p className="inner-tile text-sm sm:text-base leading-relaxed text-[#1E2923]">
              {why}
            </p>
          </div>
        )}

        {/* Main Issues Framed */}
        {issues.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-[var(--accent-ink)]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5B6661]">
                Core Legal Questions Before the Court
              </h3>
            </div>
            <Stagger delayStep={60} maxItems={8} className="grid grid-cols-1 gap-2.5">
              {issues.map((issue, idx) => (
                <div
                  key={idx}
                  className="inner-tile flex items-start gap-3 p-3.5"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent-ink)]">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5 text-sm font-semibold text-[#1E2923] leading-snug">
                    {issue}
                  </span>
                </div>
              ))}
            </Stagger>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
