"use client";

import { CheckSquare, Calendar, User, ArrowRight } from "lucide-react";
import type { NextStep } from "@/types/type";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface NextStepsCardProps {
  steps: NextStep[];
  className?: string;
}

export function NextStepsCard({ steps, className }: NextStepsCardProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="flex items-center gap-3 border-b border-[#E6E8E7] bg-[#FAFAFA] px-6 py-4">
        <Badge variant="icon">
          <CheckSquare className="h-4 w-4" />
        </Badge>
        <div>
          <h2 className="text-base font-bold text-[#1E2923]">Actionable Next Steps & Deadlines</h2>
          <p className="text-xs text-[#4B5651]">Legal compliance requirements, filings, and upcoming dates</p>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-xl border border-[#E6E8E7] bg-white p-4.5 shadow-2xs hover:border-[var(--accent)]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent-ink)]">
                    {idx + 1}
                  </span>
                  {step.deadline_or_date && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                      <Calendar className="h-3 w-3" />
                      {step.deadline_or_date}
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-[#1E2923] flex items-start gap-1.5">
                  <ArrowRight className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span>{step.action}</span>
                </h4>
              </div>

              {step.responsible_party && (
                <div className="mt-3.5 pt-3 border-t border-[#E6E8E7]/70 flex items-center gap-2 text-xs text-[#4B5651]">
                  <User className="h-3.5 w-3.5 text-[#4B5651]" />
                  <span>
                    <strong className="text-[#1E2923]">Responsible Party:</strong>{" "}
                    {step.responsible_party}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
