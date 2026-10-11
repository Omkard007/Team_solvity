"use client";

import { BookOpen, HelpCircle, FileText } from "lucide-react";
import type { LegalReference } from "@/types/type";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface LegalReferencesCardProps {
  references: LegalReference[];
  className?: string;
}

export function LegalReferencesCard({ references, className }: LegalReferencesCardProps) {
  if (!references || references.length === 0) return null;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="flex items-center gap-3 border-b border-[#E6E8E7] bg-[#FAFAFA] px-6 py-4">
        <Badge variant="icon">
          <BookOpen className="h-4 w-4" />
        </Badge>
        <div>
          <h2 className="text-base font-bold text-[#1E2923]">Laws & Sections Explained in Simple Words</h2>
          <p className="text-xs text-[#4B5651]">Legal provisions cited in this document decoded for non-lawyers</p>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {references.map((ref, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-xl border border-[#E6E8E7] bg-white p-5 shadow-2xs hover:border-[var(--accent)]/40 transition-colors"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  {ref.section_or_citation && (
                    <span className="code-chip text-xs">
                      {ref.section_or_citation}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-[#1E2923] leading-snug">
                  {ref.name}
                </h3>

                <div className="mt-3.5 space-y-2 rounded-lg bg-[var(--accent-soft)]/40 p-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--accent-ink)]">
                    <HelpCircle className="h-3.5 w-3.5" />
                    Plain English Meaning
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#1E2923]">
                    {ref.simple_explanation}
                  </p>
                </div>
              </div>

              {ref.context_in_document && (
                <div className="mt-3.5 pt-3 border-t border-[#E6E8E7]/60 text-xs text-[#4B5651]">
                  <div className="flex items-center gap-1 font-semibold text-[#1E2923] mb-1">
                    <FileText className="h-3 w-3 text-[#4B5651]" />
                    Context in this Document:
                  </div>
                  <p className="leading-relaxed">{ref.context_in_document}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
