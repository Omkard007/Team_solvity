"use client";

import { Landmark, FileText, Calendar, User, FileCheck2, Globe } from "lucide-react";
import type { DocumentInfo } from "@/types/type";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface DocumentMetaCardProps {
  info: DocumentInfo;
  className?: string;
}

export function DocumentMetaCard({ info, className }: DocumentMetaCardProps) {
  const metaItems = [
    {
      icon: Landmark,
      label: "Court / Authority",
      value: info.court_or_authority,
    },
    {
      icon: FileText,
      label: "Case Number",
      value: info.case_number,
    },
    {
      icon: Calendar,
      label: "Document Date",
      value: info.document_date,
    },
    {
      icon: User,
      label: "Bench / Judge",
      value: info.judge_or_officer,
    },
    {
      icon: FileCheck2,
      label: "Document Type",
      value: info.document_type,
    },
    {
      icon: Globe,
      label: "Language",
      value: info.language,
    },
  ].filter((item) => Boolean(item.value));

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E6E8E7] bg-[#FAFAFA] px-6 py-4">
        <div className="flex items-center gap-3">
          <Badge variant="icon">
            <Landmark className="h-4 w-4" />
          </Badge>
          <div>
            <h2 className="text-base font-bold text-[#1E2923]">Document Identification</h2>
            <p className="text-xs text-[#4B5651]">Verified metadata from the official court record</p>
          </div>
        </div>
        {info.document_type && (
          <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-ink)]">
            {info.document_type}
          </span>
        )}
      </div>

      <div className="p-6">
        {info.case_title && (
          <div className="mb-6 rounded-xl border border-[#E6E8E7] bg-white p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4B5651]">
              Case Title / In The Matter Of
            </span>
            <h1 className="mt-1 text-xl sm:text-2xl font-extrabold text-[#1E2923]">
              {info.case_title}
            </h1>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metaItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-[#E6E8E7]/80 bg-[#FAFAFA]/70 p-3.5 transition-colors hover:bg-white"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent-ink)]">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#4B5651]">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold text-[#1E2923] break-words">
                    {item.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
