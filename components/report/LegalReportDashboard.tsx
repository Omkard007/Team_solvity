"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Copy,
  Download,
  Printer,
  Check,
  Scale,
  Clock,
  BookOpen,
  FileText,
  Layers,
  Sparkles,
} from "lucide-react";
import type { NyayaAIOutput } from "@/types/type";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { DecisionBanner } from "./DecisionBanner";
import { DocumentMetaCard } from "./DocumentMetaCard";
import { SummaryCard } from "./SummaryCard";
import { TimelineCard } from "./TimelineCard";
import { PartiesAndArgumentsCard } from "./PartiesAndArgumentsCard";
import { NextStepsCard } from "./NextStepsCard";
import { ImportantDetailsCard } from "./ImportantDetailsCard";
import { LegalReferencesCard } from "./LegalReferencesCard";
import { LegalLinksCard } from "./LegalLinksCard";
import { UncertaintiesCard } from "./UncertaintiesCard";
import { LegalDisclaimerCard } from "./LegalDisclaimerCard";
import { OriginalTextCard } from "./OriginalTextCard";
import { cn } from "@/lib/utils";

export interface LegalReportDashboardProps {
  data: NyayaAIOutput;
  originalText?: string;
  onReset?: () => void;
  className?: string;
}

const REPORT_TABS = [
  { id: "all", label: "Full Report" },
  { id: "decision", label: "Decision & Orders" },
  { id: "timeline", label: "Timeline & Parties" },
  { id: "law", label: "Laws & Next Steps" },
  { id: "original", label: "Original Text" },
] as const;

export function LegalReportDashboard({
  data,
  originalText,
  onReset,
  className,
}: LegalReportDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleCopySummary = async () => {
    const summaryText = `[${data.document_info.court_or_authority || "Court Order"}]
Case: ${data.document_info.case_title || data.document_info.case_number || "Legal Document"}
Date: ${data.document_info.document_date || "N/A"}

DECISION:
${data.decision_or_result.simple_explanation}

SUMMARY:
${data.short_summary}

NEXT STEPS:
${data.next_steps.map((s) => `• ${s.action} (${s.deadline_or_date || "No date"})`).join("\n")}`;

    await navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleDownloadReport = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `legal-explanation-${data.document_info.case_number?.replace(/[^a-zA-Z0-9]/g, "-") || "report"}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={cn("space-y-8", className)}>
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#E6E8E7] pb-6">
        <div>
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--accent-ink)] hover:underline mb-2 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Upload Another Document
            </button>
          )}
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-ink)]">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E2923]">
              Legal Document Analysis
            </h1>
          </div>
          <p className="text-sm text-[#4B5651] mt-0.5">
            AI-simplified explanation of rights, rulings, timeline, and statutory provisions
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopySummary}
            className="text-xs font-bold"
          >
            {copiedSummary ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy Summary
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDownloadReport}
            className="text-xs font-bold"
          >
            <Download className="h-3.5 w-3.5" />
            Export JSON
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="text-xs font-bold"
          >
            <Printer className="h-3.5 w-3.5" />
            Print Report
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-2 z-20 bg-[#F6F5FB]/90 backdrop-blur-md py-2 border-b border-[#E6E8E7]/80">
        <Tabs tabs={REPORT_TABS} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Main Tab Panels */}
      {activeTab === "all" && (
        <div className="space-y-8 animate-in fade-in-50 duration-300">
          {/* 1. Prime Decision Banner */}
          <DecisionBanner decision={data.decision_or_result} />

          {/* 2. Document Meta Identification */}
          <DocumentMetaCard info={data.document_info} />

          {/* 3. Executive Summary & Why it Happened */}
          <SummaryCard
            shortSummary={data.short_summary}
            whyThisHappened={data.why_this_happened}
            mainIssues={data.main_issues}
          />

          {/* 4. Actionable Next Steps */}
          {data.next_steps?.length > 0 && (
            <NextStepsCard steps={data.next_steps} />
          )}

          {/* 5. Important Specifics & Figures */}
          {data.important_details?.length > 0 && (
            <ImportantDetailsCard details={data.important_details} />
          )}

          {/* 6. Chronological Timeline */}
          {data.what_happened?.length > 0 && (
            <TimelineCard events={data.what_happened} />
          )}

          {/* 7. Parties and Arguments */}
          {(data.parties?.length > 0 || data.arguments?.length > 0) && (
            <PartiesAndArgumentsCard
              parties={data.parties}
              argumentsList={data.arguments}
            />
          )}

          {/* 8. Legal References & Statutory Acts */}
          {data.legal_references?.length > 0 && (
            <LegalReferencesCard references={data.legal_references} />
          )}

          {/* 9. Official Citations & Links */}
          {data.legal_links?.length > 0 && (
            <LegalLinksCard links={data.legal_links} />
          )}

          {/* 10. Uncertainties & Caveats */}
          {data.uncertainties?.length > 0 && (
            <UncertaintiesCard uncertainties={data.uncertainties} />
          )}

          {/* 11. Disclaimer */}
          <LegalDisclaimerCard disclaimer={data.disclaimer} />
        </div>
      )}

      {activeTab === "decision" && (
        <div className="space-y-8 animate-in fade-in-50 duration-300">
          <DecisionBanner decision={data.decision_or_result} />
          {data.next_steps?.length > 0 && <NextStepsCard steps={data.next_steps} />}
          <SummaryCard
            shortSummary={data.short_summary}
            whyThisHappened={data.why_this_happened}
            mainIssues={data.main_issues}
          />
          {data.important_details?.length > 0 && (
            <ImportantDetailsCard details={data.important_details} />
          )}
          <LegalDisclaimerCard disclaimer={data.disclaimer} />
        </div>
      )}

      {activeTab === "timeline" && (
        <div className="space-y-8 animate-in fade-in-50 duration-300">
          {data.what_happened?.length > 0 && (
            <TimelineCard events={data.what_happened} />
          )}
          {(data.parties?.length > 0 || data.arguments?.length > 0) && (
            <PartiesAndArgumentsCard
              parties={data.parties}
              argumentsList={data.arguments}
            />
          )}
          <LegalDisclaimerCard disclaimer={data.disclaimer} />
        </div>
      )}

      {activeTab === "law" && (
        <div className="space-y-8 animate-in fade-in-50 duration-300">
          {data.legal_references?.length > 0 && (
            <LegalReferencesCard references={data.legal_references} />
          )}
          {data.next_steps?.length > 0 && <NextStepsCard steps={data.next_steps} />}
          {data.legal_links?.length > 0 && <LegalLinksCard links={data.legal_links} />}
          {data.uncertainties?.length > 0 && (
            <UncertaintiesCard uncertainties={data.uncertainties} />
          )}
          <LegalDisclaimerCard disclaimer={data.disclaimer} />
        </div>
      )}

      {activeTab === "original" && (
        <div className="space-y-8 animate-in fade-in-50 duration-300">
          <OriginalTextCard originalText={originalText} />
          <LegalDisclaimerCard disclaimer={data.disclaimer} />
        </div>
      )}
    </div>
  );
}
