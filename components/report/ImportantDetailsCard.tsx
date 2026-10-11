"use client";

import { Info } from "lucide-react";
import type { ImportantDetail } from "@/types/type";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface ImportantDetailsCardProps {
  details: ImportantDetail[];
  className?: string;
}

export function ImportantDetailsCard({ details, className }: ImportantDetailsCardProps) {
  if (!details || details.length === 0) return null;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="flex items-center gap-3 border-b border-[#E6E8E7] bg-[#FAFAFA] px-6 py-4">
        <Badge variant="icon">
          <Info className="h-4 w-4" />
        </Badge>
        <div>
          <h2 className="text-base font-bold text-[#1E2923]">Important Facts & Specifics</h2>
          <p className="text-xs text-[#4B5651]">Key financial figures, critical limits, and procedural specifics</p>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {details.map((detail, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-xl border border-[#E6E8E7] bg-[#FAFAFA]/70 p-4 transition-colors hover:bg-white hover:border-[var(--accent)]/40"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B5651]">
                  {detail.label}
                </span>
                <p className="mt-1 text-base font-bold text-[#1E2923] break-words">
                  {detail.value}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#E6E8E7]/60 text-xs text-[#4B5651]">
                <span className="font-semibold text-[#1E2923]">Why it matters: </span>
                {detail.importance}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
