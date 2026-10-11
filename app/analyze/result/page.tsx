import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/layout";
import { Navbar } from "@/components/home";
import { LegalReportDashboard } from "@/components/report";
import GoogleTranslate from "@/components/GoogleTranslate";
import { SAMPLE_LEGAL_REPORT } from "@/lib/mock";

export const metadata: Metadata = {
  title: "Legal Document Analysis Report – Legal Aid",
  description:
    "Comprehensive plain English explanation of court orders, judgments, statutory citations, and directions.",
};

export default function ResultPage() {
  return (
    <div
      data-tone="green"
      className="flex min-h-screen flex-col bg-[var(--section-bg,#F6F5FA)] text-[#1E2923] selection:bg-[var(--accent-soft)] selection:text-[var(--accent-ink)]"
    >
      <Navbar variant="compact" />
      <main className="relative mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6 py-8 sm:py-12">
        {/* Absolutely positioned Google Translate widget in the top-right corner */}
        <div className="absolute top-6 sm:top-10 right-4 sm:right-6 z-30">
          <GoogleTranslate />
        </div>

        <div className="mb-6 pr-44 sm:pr-48">
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4B5651] hover:text-[#1E2923] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Document Analyzer
          </Link>
        </div>

        <LegalReportDashboard
          report={SAMPLE_LEGAL_REPORT}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
