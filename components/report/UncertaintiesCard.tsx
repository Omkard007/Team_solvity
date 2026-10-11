"use client";

import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface UncertaintiesCardProps {
  uncertainties: string[];
  className?: string;
}

export function UncertaintiesCard({ uncertainties, className }: UncertaintiesCardProps) {
  if (!uncertainties || uncertainties.length === 0) return null;

  return (
    <div
      className={cn(
        "rounded-2xl border border-amber-200 bg-amber-50/60 p-5 sm:p-6 text-amber-950",
        className
      )}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-200 text-amber-900 font-bold text-sm">
          <AlertCircle className="h-4 w-4" />
        </span>
        <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900">
          Uncertainties & Ambiguities Noted in Document
        </h3>
      </div>
      <p className="text-xs text-amber-800/90 mb-3">
        The legal document left the following questions open or subject to future verification:
      </p>
      <ul className="space-y-2 text-sm text-amber-950">
        {uncertainties.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 rounded-lg bg-white/70 p-2.5 border border-amber-200/60">
            <span className="text-amber-700 font-bold">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
