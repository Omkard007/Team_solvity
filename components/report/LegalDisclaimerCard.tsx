"use client";

import { ShieldAlert } from "lucide-react";
import { NYAYA_AI_DISCLAIMER } from "@/types/type";
import { cn } from "@/lib/utils";

export interface LegalDisclaimerCardProps {
  disclaimer?: string;
  className?: string;
}

export function LegalDisclaimerCard({
  disclaimer = NYAYA_AI_DISCLAIMER,
  className,
}: LegalDisclaimerCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#E6E8E7] bg-[#FAFAFA] p-5 text-center text-xs text-[#4B5651]",
        className
      )}
    >
      <div className="flex items-center justify-center gap-2 mb-1.5 font-bold uppercase tracking-wider text-[#1E2923]">
        <ShieldAlert className="h-4 w-4 text-[var(--accent)]" />
        <span>Important Legal Information Notice</span>
      </div>
      <p className="max-w-2xl mx-auto leading-relaxed">
        {disclaimer || NYAYA_AI_DISCLAIMER}
      </p>
    </div>
  );
}
