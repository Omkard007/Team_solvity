import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/layout";
import { LegalReportDashboard } from "@/components/report";
import { SAMPLE_NYAYA_AI_OUTPUT, ORIGINAL_COURT_DOCUMENT } from "@/lib/mock";

export const metadata: Metadata = {
  title: "Legal Document Analysis Report – Legal Aid",
  description:
    "Comprehensive plain English explanation of court orders, judgments, statutory citations, and directions.",
};

export default function ResultPage() {
  return (
    <div
      data-tone="green"
      className="flex min-h-screen flex-col bg-[#F6F5FB] text-[#1E2923] selection:bg-[var(--accent-soft)] selection:text-[var(--accent-ink)]"
    >
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-6">
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4B5651] hover:text-[#1E2923] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Document Analyzer
          </Link>
        </div>

        <LegalReportDashboard
          data={SAMPLE_NYAYA_AI_OUTPUT}
          originalText={ORIGINAL_COURT_DOCUMENT}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
