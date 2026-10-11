"use client";

import { Users, MessageSquareQuote, Shield } from "lucide-react";
import type { Party, LegalArgument } from "@/types/type";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface PartiesAndArgumentsCardProps {
  parties: Party[];
  argumentsList: LegalArgument[];
  className?: string;
}

export function PartiesAndArgumentsCard({
  parties,
  argumentsList,
  className,
}: PartiesAndArgumentsCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="flex items-center gap-3 border-b border-[#E6E8E7] bg-[#FAFAFA] px-6 py-4">
        <Badge variant="icon">
          <Users className="h-4 w-4" />
        </Badge>
        <div>
          <h2 className="text-base font-bold text-[#1E2923]">Parties & Arguments</h2>
          <p className="text-xs text-[#4B5651]">Who is involved and what each side claimed before the court</p>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Parties Grid */}
        {parties.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#4B5651] mb-3">
              Parties to the Proceedings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {parties.map((party, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-between rounded-xl border border-[#E6E8E7] bg-white p-4 shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs font-bold text-[var(--accent-ink)]">
                        <Shield className="h-3 w-3" />
                        {party.role}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#1E2923]">{party.name}</h4>
                  </div>
                  {party.position && (
                    <div className="mt-3 pt-3 border-t border-[#E6E8E7]/60 text-xs text-[#4B5651]">
                      <span className="font-semibold text-[#1E2923]">Official Stand: </span>
                      {party.position}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Arguments Comparison */}
        {argumentsList.length > 0 && (
          <div className="pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#4B5651] mb-3">
              Arguments Presented
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {argumentsList.map((arg, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[#E6E8E7] bg-[#FAFAFA]/70 p-4 relative"
                >
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[var(--accent-ink)]">
                    <MessageSquareQuote className="h-4 w-4" />
                    <span>{arg.party}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#1E2923]">
                    {arg.argument}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
