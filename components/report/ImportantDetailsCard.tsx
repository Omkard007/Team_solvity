"use client";

import { Info } from "lucide-react";
import type { ImportantDetail } from "@/types/type";
import type { LegalReport } from "@/lib/types";
import { SectionCard } from "@/components/ui/SectionCard";
import { CountUp } from "@/components/motion/CountUp";
import { Stagger } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";

export interface ImportantDetailsCardProps {
  details?: ImportantDetail[];
  facts?: LegalReport["facts"];
  className?: string;
}

export function ImportantDetailsCard({ details, facts, className }: ImportantDetailsCardProps) {
  const items = facts || (details || []).map((d) => ({
    label: d.label,
    value: d.value,
    whyItMatters: d.importance,
  }));

  if (!items || items.length === 0) return null;

  // Helper to parse numbers and currency out of string value
  const parseNumericValue = (val: string) => {
    // Check if rupee: ₹25,00,000 or Rs. 25,00,000
    const rupeeMatch = val.match(/[₹|Rs\.\s*]+([\d,]+)/i);
    if (rupeeMatch) {
      const num = parseInt(rupeeMatch[1].replace(/,/g, ""), 10);
      if (!isNaN(num)) {
        return { isNumber: true, end: num, prefix: "₹", suffix: val.replace(rupeeMatch[0], "").trim() };
      }
    }
    // Check general number
    const numMatch = val.match(/^([\d,]+)(.*)$/);
    if (numMatch) {
      const num = parseInt(numMatch[1].replace(/,/g, ""), 10);
      if (!isNaN(num)) {
        return { isNumber: true, end: num, prefix: "", suffix: numMatch[2] };
      }
    }
    return { isNumber: false, end: 0, prefix: "", suffix: "" };
  };

  return (
    <SectionCard
      icon={<Info className="h-6 w-6 text-[var(--accent-ink)]" />}
      title="Important Facts & Specifics"
      subtitle="Key financial figures, critical limits, and procedural specifics"
      className={cn("overflow-hidden", className)}
    >
      <Stagger delayStep={70} maxItems={8} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, idx) => {
          const parsed = parseNumericValue(item.value);

          return (
            <div
              key={idx}
              className="inner-tile flex flex-col justify-between p-4"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6661]">
                  {item.label}
                </span>
                <div className="mt-1.5 text-base sm:text-lg font-bold text-[#1E2923] break-words">
                  {parsed.isNumber ? (
                    <span className="inline-flex items-center gap-1">
                      {parsed.prefix && <span>{parsed.prefix}</span>}
                      <CountUp end={parsed.end} isCurrency={parsed.prefix === "₹"} />
                      {parsed.suffix && <span className="text-xs font-semibold text-[#5B6661] ml-1">{parsed.suffix}</span>}
                    </span>
                  ) : (
                    <span className="animate-in fade-in duration-500">{item.value}</span>
                  )}
                </div>
              </div>

              {item.whyItMatters && (
                <div
                  className="mt-3.5 pt-2.5 border-t border-[#ECEEED] text-xs text-[#5B6661] leading-relaxed animate-in slide-in-from-bottom-1 duration-500"
                  style={{ animationDelay: `${idx * 80 + 150}ms` }}
                >
                  <span className="font-semibold text-[#1E2923]">Why it matters: </span>
                  {item.whyItMatters}
                </div>
              )}
            </div>
          );
        })}
      </Stagger>
    </SectionCard>
  );
}
