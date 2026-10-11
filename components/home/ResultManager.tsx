"use client";

import Link from "next/link";
import {
  Folder,
  Users,
  Scale,
  CheckCircle2,
  Copy,
  Download,
  FileText,
  Sparkles,
  Printer,
} from "lucide-react";
import { Section } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { RESULT_MANAGER_CONTENT } from "@/lib/content";

export function ResultManager() {
  return (
    <Section tone="purple" id="result-manager" className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Result List Mockup with Context Menu Popout */}
        <div className="lg:col-span-6 relative flex justify-center order-2 lg:order-1">
          <div className="relative w-full max-w-[500px]">
            {/* Background window card */}
            <div className="relative rounded-[20px] border border-[#E6E8E7] bg-white p-6 sm:p-8 shadow-2xl shadow-zinc-200/70">
              {/* Traffic light dots */}
              <div className="flex items-center justify-between border-b border-[#E6E8E7] pb-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#E0E3E1]" />
                  <span className="h-3 w-3 rounded-full bg-[#E0E3E1]" />
                  <span className="h-3 w-3 rounded-full bg-[#E0E3E1]" />
                </div>
                <span className="text-xs font-bold text-[#4B5651] tracking-wide truncate max-w-[200px] sm:max-w-none">
                  {RESULT_MANAGER_CONTENT.mockup.title}
                </span>
                <div className="w-10" />
              </div>

              {/* Rows */}
              <div className="mt-6 space-y-4 pr-0 sm:pr-12">
                {RESULT_MANAGER_CONTENT.mockup.rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 rounded-xl border border-[#F0F2F1] bg-[#FAFAFA] p-3.5 transition-colors hover:border-[#E6E8E7]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white"
                        style={{ backgroundColor: row.color }}
                      >
                        {row.label === "Case type" && <Folder className="h-3.5 w-3.5" />}
                        {row.label === "Parties" && <Users className="h-3.5 w-3.5" />}
                        {row.label === "Acts" && <Scale className="h-3.5 w-3.5" />}
                        {row.label === "Outcome" && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </span>
                      <span className="text-xs font-semibold text-[#4B5651]">
                        {row.label}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#1E2923] text-left sm:text-right">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Context menu popout on the right */}
            <div className="absolute -right-2 sm:-right-6 top-1/4 z-20 w-44 sm:w-52 rounded-2xl border border-[#E6E8E7] bg-white p-2 shadow-2xl shadow-zinc-400/30">
              <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#4B5651]/70">
                Actions
              </div>
              <div className="mt-1 flex flex-col gap-1 text-xs">
                <button
                  type="button"
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[#1E2923] hover:bg-[#F6F5FB] transition-colors text-left"
                >
                  <Copy className="h-3.5 w-3.5 text-[#4B5651]" />
                  <span>Copy summary</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[#1E2923] hover:bg-[#F6F5FB] transition-colors text-left"
                >
                  <Download className="h-3.5 w-3.5 text-[#4B5651]" />
                  <span>Download .txt</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[#1E2923] hover:bg-[#F6F5FB] transition-colors text-left"
                >
                  <FileText className="h-3.5 w-3.5 text-[#4B5651]" />
                  <span>Show original</span>
                </button>

                {/* Highlighted item in light-green accent-soft like reference */}
                <button
                  type="button"
                  className="flex items-center justify-between rounded-lg bg-[#DDF4E4] px-3 py-2 font-bold text-[#2E8F4E] shadow-xs text-left"
                >
                  <span className="flex items-center gap-2.5">
                    <Sparkles className="h-3.5 w-3.5 text-[#2E8F4E]" />
                    <span>Simplify more</span>
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2E8F4E]" />
                </button>

                <button
                  type="button"
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[#1E2923] hover:bg-[#F6F5FB] transition-colors text-left"
                >
                  <Printer className="h-3.5 w-3.5 text-[#4B5651]" />
                  <span>Print</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: H2, Paragraph, Purple Button */}
        <div className="lg:col-span-6 flex flex-col items-start order-1 lg:order-2">
          <h2 className="display-h2">
            {RESULT_MANAGER_CONTENT.h2}
          </h2>

          <p className="mt-6 lead-body">
            {RESULT_MANAGER_CONTENT.lead}
          </p>

          <div className="mt-8">
            <Link href="/analyze">
              <Button variant="accent" size="lg">
                {RESULT_MANAGER_CONTENT.cta}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
