"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Sparkles, Scale, Clock, BookOpen } from "lucide-react";
import { SectionCard } from "@/components/ui/SectionCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "read", label: "Reading court document & extracting text", icon: Scale },
  { id: "identify", label: "Identifying case, authority & parties", icon: Sparkles },
  { id: "simplify", label: "Simplifying legal ruling into plain English", icon: BookOpen },
  { id: "laws", label: "Finding statutory laws, deadlines & directions", icon: Clock },
];

export function ProcessingStepper({ className }: { className?: string }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStepIndex(1), 500);
    const timer2 = setTimeout(() => setCurrentStepIndex(2), 1100);
    const timer3 = setTimeout(() => setCurrentStepIndex(3), 1700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className={cn("space-y-6 animate-in fade-in-50 duration-300", className)} aria-live="polite">
      {/* Live Stepper Card */}
      <SectionCard
        icon={<Sparkles className="h-6 w-6 text-[var(--accent)] animate-spin" />}
        title="Analyzing Court Document…"
        subtitle="Extracting verified rulings, statutory sections, timeline, and plain English translation"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={step.id}
                className={cn(
                  "inner-tile flex items-center gap-3 p-3.5 transition-all",
                  isCompleted
                    ? "border-emerald-200 bg-emerald-50/50 text-emerald-900"
                    : isCurrent
                    ? "border-[var(--accent)] bg-white text-[#1E2923] shadow-xs"
                    : "border-[#ECEEED] bg-[#FAFAFA] text-[#5B6661]"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="h-5 w-5 text-[var(--accent)] animate-spin shrink-0" />
                ) : (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ECEEED] text-[10px] font-bold text-[#5B6661] shrink-0">
                    {idx + 1}
                  </span>
                )}
                <span className="text-xs font-semibold leading-tight">{step.label}</span>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* Shimmering Skeleton of the Report Underneath */}
      <div className="space-y-6 opacity-70 pointer-events-none">
        {/* Ruling banner skeleton */}
        <div className="rounded-[24px] border border-[#ECEEED] bg-white p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-44 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-4/5" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>

        {/* Metadata card skeleton */}
        <div className="rounded-[24px] border border-[#ECEEED] bg-white p-7 shadow-xs space-y-4">
          <Skeleton className="h-7 w-60" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-20 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
