"use client";

import { useState } from "react";
import { ShieldAlert, ShieldCheck, Scale, AlertTriangle, ArrowRight, Copy, Check, Sparkles } from "lucide-react";
import type { ActImposed, ActToImpose } from "@/lib/types";
import { SectionCard } from "@/components/ui/SectionCard";
import { Chip } from "@/components/ui/Chip";
import { Stagger } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";

export interface ActsImposedAndRemediesCardProps {
  actsImposed?: ActImposed[];
  actsCanImpose?: ActToImpose[];
  className?: string;
}

export function ActsImposedAndRemediesCard({
  actsImposed = [],
  actsCanImpose = [],
  className,
}: ActsImposedAndRemediesCardProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (actsImposed.length === 0 && actsCanImpose.length === 0) {
    return null;
  }

  const handleCopyCitation = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <SectionCard
      icon={<Scale className="h-6 w-6 text-[var(--accent-ink)]" />}
      title="Statutory Acts Breakdown: Imposed vs. Counter-Remedies"
      subtitle="Identify the laws used against you and the powerful counter-statutes you can impose in return"
      className={cn("overflow-hidden", className)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1: Acts Imposed Against You */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#ECEEED]">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                <ShieldAlert className="h-3.5 w-3.5" />
              </span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1E2923]">
                Acts Imposed Against You
              </h3>
            </div>
            <span className="rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[11px] font-bold text-rose-800">
              {actsImposed.length} Statutes
            </span>
          </div>

          <p className="text-xs text-[#5B6661]">
            Legal provisions and sections cited by authorities, police, or opponents to initiate action against you.
          </p>

          <Stagger delayStep={60} maxItems={4} className="space-y-4 pt-1">
            {actsImposed.map((item, idx) => (
              <div
                key={idx}
                className="inner-tile p-5 bg-white border border-rose-200/80 shadow-2xs hover:border-rose-400 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <span className="font-mono text-xs font-bold text-rose-900 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-md">
                    {item.section}
                  </span>
                  <span className="text-[11px] font-semibold text-[#5B6661]">
                    By: {item.imposedBy}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#1E2923] leading-snug">
                  {item.actName}
                </h4>

                <div className="mt-3 space-y-2 text-xs">
                  <div className="rounded-lg bg-[#FAFAFA] p-2.5 border border-[#ECEEED]">
                    <span className="font-bold text-[#1E2923] block mb-0.5">
                      Allegation / Charge:
                    </span>
                    <p className="text-[#5B6661] leading-relaxed">
                      {item.allegationOrClaim}
                    </p>
                  </div>

                  {item.potentialPenalty && (
                    <div className="flex items-start gap-1.5 text-rose-900 bg-rose-50/60 p-2 rounded-lg border border-rose-100">
                      <AlertTriangle className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-semibold">Potential Consequence: </strong>
                        <span>{item.potentialPenalty}</span>
                      </div>
                    </div>
                  )}

                  <div className="rounded-lg bg-emerald-50/60 p-2.5 border border-emerald-200 text-emerald-950">
                    <span className="font-bold block mb-0.5 text-emerald-900 flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-emerald-700" />
                      Key Procedural Vulnerability (Your Defense):
                    </span>
                    <p className="leading-relaxed text-[11.5px]">
                      {item.defenseAngle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>

        {/* Column 2: Acts You Can Impose (Remedies & Counter-Measures) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#ECEEED]">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-ink)] text-xs font-bold">
                <ShieldCheck className="h-3.5 w-3.5" />
              </span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1E2923]">
                Acts & Remedies You Can Impose
              </h3>
            </div>
            <span className="rounded-full bg-[var(--accent-soft)] border border-[var(--summary-border)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--accent-ink)]">
              {actsCanImpose.length} Remedies
            </span>
          </div>

          <p className="text-xs text-[#5B6661]">
            Constitutional articles, statutory protections, and court orders you can actively invoke to freeze action and win relief.
          </p>

          <Stagger delayStep={60} maxItems={4} className="space-y-4 pt-1">
            {actsCanImpose.map((item, idx) => {
              const copyKey = `remedy-${idx}`;
              const isCopied = copiedKey === copyKey;
              const copyPayload = `${item.actName} - ${item.section}\nRelief: ${item.reliefType}\nHow to invoke: ${item.howToInvoke}\nLegal reason: ${item.whyItHelps}`;

              return (
                <div
                  key={idx}
                  className="inner-tile p-5 bg-white border border-[var(--summary-border)] shadow-2xs hover:border-[var(--accent)] transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <Chip variant="mono">
                      {item.section}
                    </Chip>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/70 border border-emerald-300 px-2 py-0.5 text-[11px] font-bold text-emerald-900">
                        {item.reliefType}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyCitation(copyPayload, copyKey)}
                        className="inline-flex items-center gap-1 rounded-full border border-[#ECEEED] bg-white px-2.5 py-0.5 text-[11px] font-semibold text-[#5B6661] hover:text-[#1E2923] hover:border-[#D0D4D2] transition-colors cursor-pointer"
                        title="Copy statutory remedy argument"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Cite</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-[#1E2923] leading-snug">
                    {item.actName}
                  </h4>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="rounded-lg bg-[var(--summary-bg)] p-2.5 border border-[var(--summary-border)]">
                      <span className="font-bold text-[var(--accent-ink)] block mb-0.5">
                        💡 Why This Helps Your Position:
                      </span>
                      <p className="text-[#1E2923] leading-relaxed">
                        {item.whyItHelps}
                      </p>
                    </div>

                    <div className="rounded-lg bg-[#FAFAFA] p-2.5 border border-[#ECEEED]">
                      <span className="font-bold text-[#1E2923] block mb-0.5 flex items-center gap-1">
                        <ArrowRight className="h-3 w-3 text-[var(--accent-ink)]" />
                        How to Invoke:
                      </span>
                      <p className="text-[#5B6661] leading-relaxed">
                        {item.howToInvoke}
                      </p>
                    </div>

                    {item.prerequisites && (
                      <div className="pt-1 text-[11px] text-[#5B6661]">
                        <strong>Prerequisite: </strong> {item.prerequisites}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </Stagger>
        </div>
      </div>
    </SectionCard>
  );
}
