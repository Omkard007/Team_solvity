"use client";

import Link from "next/link";
import { Copy, Download, Sparkles } from "lucide-react";
import { Section } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { HandCircle } from "@/components/brush";
import { KEY_FACTS_CONTENT } from "@/lib/content";

export function KeyFactsSection() {
  const { mockup } = KEY_FACTS_CONTENT;

  return (
    <Section tone="purple" id="key-facts" className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Heading, HandCircle on Key, Code Chip, Purple Button */}
        <div className="lg:col-span-6 flex flex-col items-start">
          <h2 className="display-h2">
            <span className="relative inline-block px-2 text-[var(--accent)]">
              {KEY_FACTS_CONTENT.h2Circle}
              <HandCircle />
            </span>
            {KEY_FACTS_CONTENT.h2Suffix}
          </h2>

          <p className="mt-6 lead-body">
            {KEY_FACTS_CONTENT.leadBeforeCode}
            <span className="code-chip">{KEY_FACTS_CONTENT.codeChip}</span>
            {KEY_FACTS_CONTENT.leadAfterCode}
          </p>

          <div className="mt-8">
            <Link href="/analyze">
              <Button variant="accent" size="lg">
                {KEY_FACTS_CONTENT.cta}
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Overlapping Mockups */}
        <div className="lg:col-span-6 relative flex justify-center pb-10 sm:pb-12">
          <div className="relative w-full max-w-[480px]">
            {/* Background Purple Card */}
            <div className="rounded-[20px] bg-[#5B4FD6] p-6 sm:p-7 text-white shadow-xl shadow-[#5B4FD6]/20">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-white/80" />
                <h4 className="text-sm font-bold tracking-wide">
                  {mockup.backCard.title}
                </h4>
              </div>

              <div className="mt-4 space-y-2.5 max-w-[320px]">
                <div className="rounded-xl bg-white/15 p-3 text-xs leading-relaxed font-medium">
                  {mockup.backCard.field1}
                </div>
                <div className="rounded-xl bg-white/15 p-3 text-xs leading-relaxed font-medium">
                  {mockup.backCard.field2}
                </div>
              </div>
            </div>

            {/* Overlapping Front White "Case Summary" Card */}
            <div className="relative -mt-10 ml-6 sm:ml-12 rounded-[20px] border border-[#E6E8E7] bg-white p-6 sm:p-7 shadow-2xl shadow-zinc-300/60">
              <div className="flex items-center justify-between border-b border-[#E6E8E7] pb-3">
                <span className="text-xs sm:text-sm font-extrabold text-[#1E2923] tracking-tight">
                  {mockup.frontCard.heading}
                </span>
                <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-[10px] font-bold text-[var(--accent)] uppercase">
                  Verified
                </span>
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#4B5651]">Case type:</span>
                  <span className="font-semibold text-[#1E2923]">{mockup.frontCard.caseType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4B5651]">Parties:</span>
                  <span className="font-semibold text-[#1E2923]">{mockup.frontCard.parties}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4B5651]">Holding:</span>
                  <span className="font-semibold text-[#4CAF6A]">{mockup.frontCard.outcome}</span>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-[#F6F5FB] p-3 text-xs text-[#1E2923] leading-relaxed border border-[#ECEAFB]">
                <span className="font-bold text-[#5B4FD6]">Plain-English: </span>
                {mockup.frontCard.plainLine}
              </div>

              {/* Two outline buttons */}
              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#E6E8E7] bg-white py-2 text-xs font-semibold text-[#1E2923] shadow-xs hover:border-[#5B4FD6] transition-colors"
                >
                  <Copy className="h-3.5 w-3.5 text-[#5B4FD6]" />
                  <span>{mockup.frontCard.buttons[0]}</span>
                </button>
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#E6E8E7] bg-white py-2 text-xs font-semibold text-[#1E2923] shadow-xs hover:border-[#5B4FD6] transition-colors"
                >
                  <Download className="h-3.5 w-3.5 text-[#5B4FD6]" />
                  <span>{mockup.frontCard.buttons[1]}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
