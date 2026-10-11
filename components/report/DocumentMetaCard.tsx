"use client";

import { Landmark, FileText, Calendar, User, FileCheck2, Globe } from "lucide-react";
import type { DocumentInfo } from "@/types/type";
import type { LegalReport } from "@/lib/types";
import { SectionCard } from "@/components/ui/SectionCard";
import { InfoTile } from "@/components/ui/InfoTile";
import { Stagger } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";

export interface DocumentMetaCardProps {
  info?: DocumentInfo;
  identification?: LegalReport["identification"];
  className?: string;
}

export function DocumentMetaCard({ info, identification, className }: DocumentMetaCardProps) {
  const ident = identification || {
    caseTitle: info?.case_title || "",
    court: info?.court_or_authority || "",
    caseNumber: info?.case_number || "",
    date: info?.document_date || "",
    bench: info?.judge_or_officer || "",
    documentType: info?.document_type || "",
    language: info?.language || "English",
  };

  const metaItems = [
    {
      icon: <Landmark className="h-4 w-4" />,
      label: "Court / Authority",
      value: ident.court,
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: "Case Number",
      value: ident.caseNumber,
    },
    {
      icon: <Calendar className="h-4 w-4" />,
      label: "Document Date",
      value: ident.date,
    },
    {
      icon: <User className="h-4 w-4" />,
      label: "Bench / Judge",
      value: ident.bench,
    },
    {
      icon: <FileCheck2 className="h-4 w-4" />,
      label: "Document Type",
      value: ident.documentType,
    },
    {
      icon: <Globe className="h-4 w-4" />,
      label: "Language",
      value: ident.language,
    },
  ].filter((item) => Boolean(item.value));

  return (
    <SectionCard
      icon={<Landmark className="h-6 w-6 text-[var(--accent-ink)]" />}
      title="Document Identification"
      subtitle="Extracted from your uploaded document"
      action={
        ident.documentType ? (
          <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-bold text-[var(--accent-ink)] border border-[var(--summary-border)]">
            {ident.documentType}
          </span>
        ) : null
      }
      className={cn("overflow-hidden", className)}
    >
      <div className="space-y-6">
        {ident.caseTitle && (
          <div className="inner-tile p-5 bg-white border border-[#ECEEED]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6661]">
              Case Title / In The Matter Of
            </span>
            <h1
              className="mt-1 text-xl sm:text-2xl font-extrabold text-[#1E2923] tracking-[-0.03em] animate-in fade-in duration-700"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
              }}
            >
              {ident.caseTitle}
            </h1>
          </div>
        )}

        <Stagger delayStep={60} maxItems={8} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metaItems.map((item, idx) => (
            <InfoTile
              key={idx}
              icon={item.icon}
              label={item.label}
              value={item.value}
            />
          ))}
        </Stagger>
      </div>
    </SectionCard>
  );
}
