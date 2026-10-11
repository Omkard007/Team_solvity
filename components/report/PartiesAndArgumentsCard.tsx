"use client";

import { Users, MessageSquareQuote, Shield } from "lucide-react";
import type { Party, LegalArgument } from "@/types/type";
import type { LegalReport } from "@/lib/types";
import { SectionCard } from "@/components/ui/SectionCard";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export interface PartiesAndArgumentsCardProps {
  parties?: Party[];
  argumentsList?: LegalArgument[];
  reportParties?: LegalReport["parties"];
  onSelectSource?: (span: string) => void;
  className?: string;
}

export function PartiesAndArgumentsCard({
  parties = [],
  argumentsList = [],
  reportParties,
  onSelectSource,
  className,
}: PartiesAndArgumentsCardProps) {
  const [ref, inView] = useInView({ threshold: 0.1, once: true });
  const reducedMotion = usePrefersReducedMotion();

  // Combine reportParties or fallback
  const partyItems = reportParties || parties.map((p) => {
    const match = argumentsList.find(
      (a) =>
        a.party.toLowerCase().includes(p.name.toLowerCase()) ||
        a.party.toLowerCase().includes(p.role.toLowerCase())
    );
    return {
      role: p.role,
      name: p.name,
      argument: match?.argument || p.position,
    };
  });

  if (!partyItems || partyItems.length === 0) return null;

  return (
    <SectionCard
      icon={<Users className="h-6 w-6 text-[var(--accent-ink)]" />}
      title="Parties & Arguments"
      subtitle="Who is involved and what each side claimed before the court"
      className={cn("overflow-hidden", className)}
    >
      <div ref={ref} className="space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#5B6661] mb-2">
          Parties to the Proceedings & Core Positions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {partyItems.map((party, idx) => {
            const isPetitioner = party.role.toLowerCase().includes("petitioner");
            // Petitioner slides in from left (-16px), Respondent from right (+16px)
            const initialTransform = isPetitioner ? "translateX(-16px)" : "translateX(16px)";

            return (
              <div
                key={idx}
                className="inner-tile flex flex-col justify-between p-5 transition-all duration-600 ease-[var(--ease-out)]"
                style={{
                  transform: inView || reducedMotion ? "none" : initialTransform,
                  opacity: inView || reducedMotion ? 1 : 0,
                  transitionDelay: `${reducedMotion ? 0 : idx * 90}ms`,
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs font-bold text-[var(--accent-ink)] border border-[var(--summary-border)]">
                      <Shield className="h-3 w-3" />
                      {party.role}
                    </span>
                    {onSelectSource && (
                      <button
                        type="button"
                        onClick={() => onSelectSource(party.name)}
                        className="text-[11px] font-semibold text-[var(--accent-ink)] hover:underline cursor-pointer"
                      >
                        View in text →
                      </button>
                    )}
                  </div>
                  <h4 className="text-base font-bold text-[#1E2923] tracking-tight">
                    {party.name}
                  </h4>
                </div>

                {party.argument && (
                  <div
                    className="mt-4 pt-3.5 border-t border-[#ECEEED] transition-opacity duration-500"
                    style={{
                      opacity: inView || reducedMotion ? 1 : 0,
                      transitionDelay: `${reducedMotion ? 0 : idx * 90 + 150}ms`,
                    }}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-[11px] font-bold uppercase tracking-wider text-[#5B6661]">
                      <MessageSquareQuote className="h-3.5 w-3.5 text-[var(--accent-ink)]" />
                      Legal Argument / Stand
                    </div>
                    <p className="text-xs sm:text-sm text-[#1E2923] leading-relaxed">
                      {party.argument}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </SectionCard>
  );
}
