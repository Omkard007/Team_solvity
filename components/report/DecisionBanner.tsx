"use client";

import { CheckCircle2, AlertTriangle, Clock, HelpCircle, Scale, ShieldAlert, ArrowRight } from "lucide-react";
import type { DecisionOrResult, DecisionStatus } from "@/types/type";
import { cn } from "@/lib/utils";

export interface DecisionBannerProps {
  decision: DecisionOrResult;
  className?: string;
}

const STATUS_CONFIG: Record<
  DecisionStatus,
  {
    label: string;
    description: string;
    badgeBg: string;
    badgeText: string;
    cardBg: string;
    borderColor: string;
    icon: typeof CheckCircle2;
  }
> = {
  decided: {
    label: "Final Decision Rendered",
    description: "The court or authority has delivered its final ruling on the matter.",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
    badgeText: "text-emerald-800",
    cardBg: "bg-emerald-50/60",
    borderColor: "border-emerald-200",
    icon: CheckCircle2,
  },
  interim_order: {
    label: "Interim Order (Temporary Protection)",
    description: "The court issued temporary directions while the final case continues.",
    badgeBg: "bg-[var(--accent-soft)] text-[var(--accent-ink)] border-[var(--accent)]/30",
    badgeText: "text-[var(--accent-ink)]",
    cardBg: "bg-white",
    borderColor: "border-[var(--accent)]/30",
    icon: Scale,
  },
  partially_decided: {
    label: "Partially Decided",
    description: "Some requests were granted, while others were rejected or referred further.",
    badgeBg: "bg-blue-100 text-blue-800 border-blue-300",
    badgeText: "text-blue-800",
    cardBg: "bg-blue-50/50",
    borderColor: "border-blue-200",
    icon: Scale,
  },
  application_pending: {
    label: "Application Pending Hearing",
    description: "The matter remains pending for future consideration or evidence.",
    badgeBg: "bg-amber-100 text-amber-800 border-amber-300",
    badgeText: "text-amber-800",
    cardBg: "bg-amber-50/50",
    borderColor: "border-amber-200",
    icon: Clock,
  },
  no_decision_found: {
    label: "Procedural Document (No Ruling)",
    description: "This document is a petition, plaint, or notice requesting relief, not a final order.",
    badgeBg: "bg-zinc-100 text-zinc-800 border-zinc-300",
    badgeText: "text-zinc-800",
    cardBg: "bg-zinc-50/60",
    borderColor: "border-zinc-200",
    icon: HelpCircle,
  },
  unclear: {
    label: "Status Unclear in Document",
    description: "The provided text does not contain conclusive findings on the final outcome.",
    badgeBg: "bg-zinc-100 text-zinc-800 border-zinc-300",
    badgeText: "text-zinc-800",
    cardBg: "bg-zinc-50/60",
    borderColor: "border-zinc-200",
    icon: HelpCircle,
  },
};

export function DecisionBanner({ decision, className }: DecisionBannerProps) {
  const config = STATUS_CONFIG[decision.status] || STATUS_CONFIG.unclear;
  const StatusIcon = config.icon;

  return (
    <div
      className={cn(
        "rounded-2xl border p-6 sm:p-8 shadow-sm transition-all",
        config.cardBg,
        config.borderColor,
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E6E8E7] pb-4">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider",
              config.badgeBg
            )}
          >
            <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {config.label}
          </span>
        </div>
        <span className="text-xs text-[#4B5651]">{config.description}</span>
      </div>

      <div className="mt-5 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#4B5651]">
          Plain English Ruling
        </h3>
        <p className="text-lg sm:text-xl font-medium leading-relaxed text-[#1E2923]">
          {decision.simple_explanation}
        </p>
      </div>

      {(decision.directions?.length > 0 || decision.conditions?.length > 0) && (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 pt-6 border-t border-[#E6E8E7]/70">
          {decision.directions?.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1E2923]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                  ✓
                </span>
                Court Directions & Orders Issued
              </div>
              <ul className="space-y-2.5 text-sm text-[#1E2923]">
                {decision.directions.map((direction, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-[#E6E8E7] bg-white/80 p-3 shadow-2xs"
                  >
                    <ArrowRight className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                    <span>{direction}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {decision.conditions?.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-900">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                  !
                </span>
                Mandatory Conditions Imposed
              </div>
              <ul className="space-y-2.5 text-sm text-[#1E2923]">
                {decision.conditions.map((condition, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-amber-200/80 bg-amber-50/50 p-3 shadow-2xs"
                  >
                    <ShieldAlert className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
