"use client";

import { CheckCircle2, Scale, ShieldAlert, ArrowRight } from "lucide-react";
import { Typewriter } from "@/components/motion/Typewriter";
import { Stagger } from "@/components/motion/Stagger";
import { StatusDot } from "@/components/ui/StatusDot";
import { cn } from "@/lib/utils";

export interface DecisionBannerProps {
  outcomeBadge?: { label: string; description: string; tone: "green" | "amber" | "red" | "neutral" };
  plainRuling: string;
  directions?: string[];
  conditions?: string[];
  className?: string;
}

const TONE_CLASSES = {
  green: {
    badge: "bg-emerald-50 text-emerald-800 border-emerald-200",
    headerBg: "bg-emerald-50/30",
    dot: "green" as const,
  },
  amber: {
    badge: "bg-amber-50 text-amber-900 border-amber-200",
    headerBg: "bg-amber-50/30",
    dot: "amber" as const,
  },
  red: {
    badge: "bg-rose-50 text-rose-800 border-rose-200",
    headerBg: "bg-rose-50/30",
    dot: "red" as const,
  },
  neutral: {
    badge: "bg-zinc-100 text-zinc-800 border-zinc-200",
    headerBg: "bg-[#FAFAFA]",
    dot: "neutral" as const,
  },
};

export function DecisionBanner({
  outcomeBadge = {
    label: "Interim Stay Granted",
    description: "The court issued temporary directions while the final case continues.",
    tone: "green",
  },
  plainRuling,
  directions = [],
  conditions = [],
  className,
}: DecisionBannerProps) {
  const toneCfg = TONE_CLASSES[outcomeBadge.tone] || TONE_CLASSES.green;

  return (
    <div className={cn("section-card", className)}>
      {/* Header Band */}
      <div className={cn("flex flex-wrap items-center justify-between gap-3 border-b border-[#ECEEED] px-6 py-4.5", toneCfg.headerBg)}>
        <div className="flex items-center gap-3">
          {/* Outcome Badge with scale-pop spring and icon tilt */}
          <span
            className={cn(
              "animate-pop-in inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-bold uppercase tracking-wider shadow-2xs",
              toneCfg.badge
            )}
          >
            <Scale className="h-3.5 w-3.5 animate-balance-tilt text-current" aria-hidden="true" />
            <StatusDot status={toneCfg.dot} pulse />
            <span>{outcomeBadge.label}</span>
          </span>
        </div>
        <span className="text-xs font-medium text-[#5B6661]">{outcomeBadge.description}</span>
      </div>

      <div className="p-6 sm:p-7 space-y-6">
        {/* Plain English Ruling with Typewriter Reveal and Marker Swipes */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#5B6661]">
            Plain English Ruling
          </h3>
          <Typewriter
            text={plainRuling}
            className="text-lg sm:text-xl font-bold leading-relaxed text-[#1E2923]"
          />
        </div>

        {/* Directions & Conditions Staggered Lists */}
        {(directions.length > 0 || conditions.length > 0) && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-6 border-t border-[#ECEEED]">
            {directions.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    ✓
                  </span>
                  Court Directions & Orders Issued
                </div>
                <Stagger delayStep={60} maxItems={8} className="space-y-2.5">
                  {directions.map((direction, idx) => (
                    <div
                      key={idx}
                      className="group inner-tile flex items-start gap-3 p-3.5"
                    >
                      <ArrowRight className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5 group-hover:translate-x-1 transition-transform" />
                      <span className="text-sm font-medium text-[#1E2923] leading-snug">
                        {direction}
                      </span>
                    </div>
                  ))}
                </Stagger>
              </div>
            )}

            {conditions.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                    !
                  </span>
                  Mandatory Conditions Imposed
                </div>
                <Stagger delayStep={60} maxItems={8} className="space-y-2.5">
                  {conditions.map((condition, idx) => (
                    <div
                      key={idx}
                      className="group inner-tile flex items-start gap-3 p-3.5 bg-amber-50/30 border-amber-200/70"
                    >
                      <ShieldAlert className="h-4 w-4 shrink-0 text-amber-800 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-[#1E2923] leading-snug">
                        {condition}
                      </span>
                    </div>
                  ))}
                </Stagger>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function DirectionsList({
  directions,
  className,
}: {
  directions: string[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          ✓
        </span>
        Court Directions & Orders Issued
      </div>
      <Stagger delayStep={60} maxItems={8} className="space-y-2.5">
        {directions.map((direction, idx) => (
          <div
            key={idx}
            className="group inner-tile flex items-start gap-3 p-3.5"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent-ink)]">
              {idx + 1}
            </span>
            <span className="pt-0.5 text-xs sm:text-sm font-semibold text-[#1E2923] leading-relaxed flex-1">
              {direction}
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-[#5B6661] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
          </div>
        ))}
      </Stagger>
    </div>
  );
}

export { DecisionBanner as RulingCard };
