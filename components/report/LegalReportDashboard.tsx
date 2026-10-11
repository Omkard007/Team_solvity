"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Copy,
  Download,
  Printer,
  Check,
  Sparkles,
} from "lucide-react";
import type { NyayaAIOutput } from "@/types/type";
import type { LegalReport } from "@/lib/types";
import { mapNyayaToLegalReport } from "@/lib/mock";
import { Tabs, type TabItem } from "@/components/ui/Tabs";
import { OutlinePillButton } from "@/components/ui/OutlinePillButton";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
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
import { BrushBackdrop } from "@/components/brush";
import { cn } from "@/lib/utils";

export interface LegalReportDashboardProps {
  data?: NyayaAIOutput;
  report?: LegalReport;
  originalText?: string;
  onReset?: () => void;
  className?: string;
}

const REPORT_TABS: readonly TabItem[] = [
  { id: "all", label: "Full Report" },
  { id: "decision", label: "Decision & Orders" },
  { id: "timeline", label: "Timeline & Parties" },
  { id: "law", label: "Laws & Next Steps" },
  { id: "original", label: "Original Text" },
] as const;

export function LegalReportDashboard({
  data,
  report: explicitReport,
  originalText,
  onReset,
  className,
}: LegalReportDashboardProps) {
  // Resolve report contract
  const report: LegalReport = explicitReport || (data ? mapNyayaToLegalReport(data, originalText) : ({} as LegalReport));

  // Tab state synced with URL hash
  const [activeTab, setActiveTab] = useState<string>("all");
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [highlightSpan, setHighlightSpan] = useState<string | undefined>(undefined);
  const [isScrolledPastHeader, setIsScrolledPastHeader] = useState(false);

  // Sync tab with URL hash on mount and hashchange
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (REPORT_TABS.some((t) => t.id === hash)) {
        setActiveTab(hash);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Monitor scroll for tab bar shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledPastHeader(window.scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabChange = (newTabId: string) => {
    const prevIndex = REPORT_TABS.findIndex((t) => t.id === activeTab);
    const nextIndex = REPORT_TABS.findIndex((t) => t.id === newTabId);
    setSlideDirection(nextIndex > prevIndex ? "right" : "left");
    setActiveTab(newTabId);
    window.history.replaceState(null, "", `#${newTabId}`);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleCopySummary = async () => {
    const summaryText = `[${report.identification?.court || "Court Order"}]
Case: ${report.identification?.caseTitle || report.identification?.caseNumber || "Legal Document"}
Date: ${report.identification?.date || "N/A"}

DECISION:
${report.plainRuling}

EXECUTIVE SUMMARY:
${report.executiveSummary}

NEXT STEPS:
${(report.nextSteps || []).map((s) => `• ${s.action} (${s.date || "Upcoming"})`).join("\n")}`;

    await navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    triggerToast("Summary copied to clipboard!");
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleDownloadReport = () => {
    const jsonStr = JSON.stringify(report, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `legal-report-${report.identification?.caseNumber?.replace(/[^a-zA-Z0-9]/g, "-") || "analysis"}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerToast("Exported JSON report!");
  };

  const handlePrint = () => {
    triggerToast("Preparing print view…");
    setTimeout(() => window.print(), 200);
  };

  // Jump from reference/party to original text with highlight
  const handleSelectSource = (span: string) => {
    setHighlightSpan(span);
    handleTabChange("original");
  };

  const panelAnimationClass = cn(
    "space-y-8 animate-in fade-in-50 duration-300",
    slideDirection === "right" ? "slide-in-from-right-3" : "slide-in-from-left-3"
  );

  return (
    <div className={cn("space-y-8 relative", className)}>
      {/* 2px green ScrollProgress bar at very top of viewport */}
      <ScrollProgress />

      {/* Header with Brush Backdrop behind title */}
      <div className="relative overflow-hidden rounded-[24px] border border-[#ECEEED] bg-white p-6 sm:p-8 shadow-sm">
        {/* Subtle Brush Backdrop */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <BrushBackdrop variant="hero" />
        </div>

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--accent-ink)] hover:underline mb-2.5 cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                Upload Another Document
              </button>
            )}

            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-ink)] shadow-2xs"
                style={{
                  animation: "pop-in 450ms var(--ease-spring) both",
                }}
              >
                <Sparkles className="h-4 w-4" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E2923] tracking-[-0.03em] animate-in fade-in duration-500">
                {report.title || "Legal Document Analysis"}
              </h1>

              {report.isSample && (
                <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
                  Sample result
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[#5B6661] mt-1">
              Plain English explanation of rights, rulings, timeline, and statutory provisions
            </p>
          </div>

          {/* Three Action Buttons with 60ms stagger slide-in from right */}
          <div className="flex flex-wrap items-center gap-2.5">
            <OutlinePillButton
              icon={
                copiedSummary ? (
                  <Check className="h-3.5 w-3.5 text-emerald-600 animate-in zoom-in" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )
              }
              onClick={handleCopySummary}
              className="text-xs font-bold animate-in slide-in-from-right-4 duration-400"
              style={{ animationDelay: "60ms" }}
            >
              {copiedSummary ? "Copied!" : "Copy Summary"}
            </OutlinePillButton>

            <OutlinePillButton
              icon={<Download className="h-3.5 w-3.5" />}
              onClick={handleDownloadReport}
              className="text-xs font-bold animate-in slide-in-from-right-4 duration-400"
              style={{ animationDelay: "120ms" }}
            >
              Export JSON
            </OutlinePillButton>

            <OutlinePillButton
              icon={<Printer className="h-3.5 w-3.5" />}
              onClick={handlePrint}
              className="text-xs font-bold animate-in slide-in-from-right-4 duration-400"
              style={{ animationDelay: "180ms" }}
            >
              Print Report
            </OutlinePillButton>
          </div>
        </div>
      </div>

      {/* Sticky Tab Bar: Opaque --section-bg (~90%) with backdrop-blur and dynamic shadow */}
      <div
        className={cn(
          "sticky top-2 z-20 rounded-2xl bg-[var(--section-bg,#F6F5FA)]/95 backdrop-blur-md px-4 py-2 border border-[#ECEEED] transition-shadow duration-300",
          isScrolledPastHeader && "shadow-md shadow-zinc-200/50"
        )}
      >
        <Tabs tabs={REPORT_TABS} activeTab={activeTab} onChange={handleTabChange} />
      </div>

      {/* Main Tab Panels */}
      {activeTab === "all" && (
        <div className={panelAnimationClass} id="tab-panel-all" role="tabpanel">
          {/* 1. Prime Decision Banner */}
          <DecisionBanner
            outcomeBadge={report.outcomeBadge}
            plainRuling={report.plainRuling}
            directions={report.directions}
            conditions={report.conditions}
          />

          {/* 2. Document Meta Identification */}
          <DocumentMetaCard identification={report.identification} />

          {/* 3. Executive Summary & Why it Happened */}
          <SummaryCard
            executiveSummary={report.executiveSummary}
            background={report.background}
          />

          {/* 4. Actionable Next Steps */}
          {report.nextSteps?.length > 0 && (
            <NextStepsCard nextSteps={report.nextSteps} />
          )}

          {/* 5. Important Facts & Figures */}
          {report.facts?.length > 0 && (
            <ImportantDetailsCard facts={report.facts} />
          )}

          {/* 6. Chronological Timeline */}
          {report.timeline?.length > 0 && (
            <TimelineCard timeline={report.timeline} />
          )}

          {/* 7. Parties and Arguments */}
          {report.parties?.length > 0 && (
            <PartiesAndArgumentsCard
              reportParties={report.parties}
              onSelectSource={handleSelectSource}
            />
          )}

          {/* 8. Legal References & Statutory Acts */}
          {report.laws?.length > 0 && (
            <LegalReferencesCard
              laws={report.laws}
              onSelectSource={handleSelectSource}
            />
          )}

          {/* 9. Citations & Official Links */}
          {data?.legal_links && data.legal_links.length > 0 && (
            <LegalLinksCard links={data.legal_links} />
          )}

          {/* 10. Uncertainties & Caveats */}
          {data?.uncertainties && data.uncertainties.length > 0 && (
            <UncertaintiesCard uncertainties={data.uncertainties} />
          )}

          {/* 11. Disclaimer */}
          <LegalDisclaimerCard disclaimer={data?.disclaimer} />
        </div>
      )}

      {activeTab === "decision" && (
        <div className={panelAnimationClass} id="tab-panel-decision" role="tabpanel">
          <DecisionBanner
            outcomeBadge={report.outcomeBadge}
            plainRuling={report.plainRuling}
            directions={report.directions}
            conditions={report.conditions}
          />
          {report.nextSteps?.length > 0 && (
            <NextStepsCard nextSteps={report.nextSteps} />
          )}
          <SummaryCard
            executiveSummary={report.executiveSummary}
            background={report.background}
          />
          {report.facts?.length > 0 && (
            <ImportantDetailsCard facts={report.facts} />
          )}
          <LegalDisclaimerCard disclaimer={data?.disclaimer} />
        </div>
      )}

      {activeTab === "timeline" && (
        <div className={panelAnimationClass} id="tab-panel-timeline" role="tabpanel">
          {report.timeline?.length > 0 && (
            <TimelineCard timeline={report.timeline} />
          )}
          {report.parties?.length > 0 && (
            <PartiesAndArgumentsCard
              reportParties={report.parties}
              onSelectSource={handleSelectSource}
            />
          )}
          <LegalDisclaimerCard disclaimer={data?.disclaimer} />
        </div>
      )}

      {activeTab === "law" && (
        <div className={panelAnimationClass} id="tab-panel-law" role="tabpanel">
          {report.laws?.length > 0 && (
            <LegalReferencesCard
              laws={report.laws}
              onSelectSource={handleSelectSource}
            />
          )}
          {report.nextSteps?.length > 0 && (
            <NextStepsCard nextSteps={report.nextSteps} />
          )}
          {data?.legal_links && data.legal_links.length > 0 && (
            <LegalLinksCard links={data.legal_links} />
          )}
          <LegalDisclaimerCard disclaimer={data?.disclaimer} />
        </div>
      )}

      {activeTab === "original" && (
        <div className={panelAnimationClass} id="tab-panel-original" role="tabpanel">
          <OriginalTextCard
            originalText={report.originalText || originalText}
            highlightSpan={highlightSpan}
          />
          <LegalDisclaimerCard disclaimer={data?.disclaimer} />
        </div>
      )}

      {/* Floating Toast Notification */}
      {showToast && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#1E2923] text-white px-4 py-2 text-xs font-semibold shadow-xl animate-in slide-in-from-bottom-2 duration-300"
        >
          <Check className="h-3.5 w-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </aside>
      )}
    </div>
  );
}
