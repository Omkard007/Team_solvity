"use client";

import { useState } from "react";
import { CheckSquare, Calendar, User, ArrowRight, Check } from "lucide-react";
import type { NextStep } from "@/types/type";
import type { LegalReport } from "@/lib/types";
import { SectionCard } from "@/components/ui/SectionCard";
import { Stagger } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";

export interface NextStepsCardProps {
  steps?: NextStep[];
  nextSteps?: LegalReport["nextSteps"];
  className?: string;
}

export function NextStepsCard({ steps, nextSteps, className }: NextStepsCardProps) {
  const items = nextSteps || (steps || []).map((s) => ({
    date: s.deadline_or_date || "",
    dateNote: undefined,
    action: s.action,
    responsibleParty: s.responsible_party || "",
  }));

  const [addedCalendarIndex, setAddedCalendarIndex] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  const handleAddToCalendar = (idx: number, item: { action: string; date: string }) => {
    setAddedCalendarIndex(idx);
    setTimeout(() => setAddedCalendarIndex(null), 2500);
  };

  return (
    <SectionCard
      icon={<CheckSquare className="h-6 w-6 text-[var(--accent-ink)]" />}
      title="Actionable Next Steps & Deadlines"
      subtitle="Legal compliance requirements, filings, and upcoming dates"
      className={cn("overflow-hidden", className)}
    >
      <Stagger delayStep={70} maxItems={8} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((step, idx) => {
          const isNearestDeadline = idx === 0 && Boolean(step.date);
          const isAdded = addedCalendarIndex === idx;

          return (
            <div
              key={idx}
              className="inner-tile flex flex-col justify-between p-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent-ink)]">
                    {idx + 1}
                  </span>
                  {step.date && (
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "relative inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-bold border",
                          "bg-[var(--amber-pill,#FFF3D6)] border-[var(--amber-border,#F3E7B5)] text-[var(--amber-text,#8A4B0F)]",
                          isNearestDeadline && "animate-pulse-ring"
                        )}
                      >
                        <Calendar className="h-3 w-3 shrink-0" />
                        <span>{step.date}</span>
                        {step.dateNote && (
                          <span className="opacity-75 font-normal">({step.dateNote})</span>
                        )}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleAddToCalendar(idx, step)}
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-semibold border transition-all cursor-pointer flex items-center gap-1",
                          isAdded
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                            : "border-[#ECEEED] text-[#5B6661] hover:text-[#1E2923] hover:border-[#D0D4D2] bg-white"
                        )}
                        title="Add this legal deadline to calendar"
                      >
                        {isAdded ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600 animate-in zoom-in" />
                            <span>Added</span>
                          </>
                        ) : (
                          <span>+ Calendar</span>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <h4 className="text-sm font-bold text-[#1E2923] leading-snug flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5 transition-transform group-hover:translate-x-1" />
                  <span>{step.action}</span>
                </h4>
              </div>

              {step.responsibleParty && (
                <div className="mt-4 pt-3 border-t border-[#ECEEED] flex items-center gap-2 text-xs text-[#5B6661]">
                  <User className="h-3.5 w-3.5 text-[#5B6661] shrink-0" />
                  <span>
                    <strong className="text-[#1E2923]">Responsible Party:</strong>{" "}
                    {step.responsibleParty}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </Stagger>
    </SectionCard>
  );
}
