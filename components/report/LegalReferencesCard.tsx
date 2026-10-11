"use client";

import { useState } from "react";
import { BookOpen, HelpCircle, FileText, ChevronDown } from "lucide-react";
import type { LegalReference } from "@/types/type";
import type { LegalReport } from "@/lib/types";
import { SectionCard } from "@/components/ui/SectionCard";
import { Chip } from "@/components/ui/Chip";
import { ExpandPanel } from "@/components/motion/ExpandPanel";
import { Stagger } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";

export interface LegalReferencesCardProps {
  references?: LegalReference[];
  laws?: LegalReport["laws"];
  onSelectSource?: (span: string) => void;
  className?: string;
}

export function LegalReferencesCard({
  references = [],
  laws,
  onSelectSource,
  className,
}: LegalReferencesCardProps) {
  const items = laws || references.map((r) => ({
    citation: r.section_or_citation,
    source: r.name,
    plainMeaning: r.simple_explanation,
    contextInDocument: r.context_in_document,
  }));

  // Track expanded state for each card; default expanded on desktop, toggleable
  const [expandedIndices, setExpandedIndices] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
  });

  if (!items || items.length === 0) return null;

  const toggleExpand = (idx: number) => {
    setExpandedIndices((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <SectionCard
      icon={<BookOpen className="h-6 w-6 text-[var(--accent-ink)]" />}
      title="Laws & Sections Explained in Simple Words"
      subtitle="Legal provisions cited in this document decoded for non-lawyers"
      className={cn("overflow-hidden", className)}
    >
      <Stagger delayStep={70} maxItems={8} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((ref, idx) => {
          const isExpanded = expandedIndices[idx] ?? true;

          return (
            <div
              key={idx}
              className="inner-tile flex flex-col justify-between p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  {ref.citation && (
                    <Chip
                      clickable={Boolean(onSelectSource)}
                      onClick={() => ref.citation && onSelectSource?.(ref.citation)}
                      title="Click to jump to this statute in original text"
                    >
                      {ref.citation}
                    </Chip>
                  )}
                  {onSelectSource && ref.citation && (
                    <button
                      type="button"
                      onClick={() => onSelectSource(ref.citation!)}
                      className="text-[11px] font-semibold text-[var(--accent-ink)] hover:underline cursor-pointer"
                    >
                      View in text →
                    </button>
                  )}
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[#1E2923] leading-snug">
                  {ref.source}
                </h3>

                {/* Plain English Meaning with ExpandPanel & Rotating Chevron */}
                <div className="mt-4 rounded-xl border border-[var(--summary-border)] bg-[var(--summary-bg)] p-3.5">
                  <button
                    type="button"
                    onClick={() => toggleExpand(idx)}
                    className="flex w-full items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[var(--accent-ink)] cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <HelpCircle className="h-3.5 w-3.5" />
                      Plain English Meaning
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-300 ease-[var(--ease-out)]",
                        isExpanded ? "rotate-180" : "rotate-0"
                      )}
                    />
                  </button>

                  <ExpandPanel isOpen={isExpanded} className="mt-2">
                    <p className="text-xs sm:text-sm leading-relaxed text-[#1E2923] pt-1 border-t border-[var(--summary-border)]/60">
                      {ref.plainMeaning}
                    </p>
                  </ExpandPanel>
                </div>
              </div>

              {ref.contextInDocument && (
                <div className="mt-4 pt-3 border-t border-[#ECEEED] text-xs text-[#5B6661]">
                  <div className="flex items-center gap-1 font-semibold text-[#1E2923] mb-1">
                    <FileText className="h-3 w-3 text-[#5B6661]" />
                    Context in this Document:
                  </div>
                  <p className="leading-relaxed">{ref.contextInDocument}</p>
                </div>
              )}
            </div>
          );
        })}
      </Stagger>
    </SectionCard>
  );
}
