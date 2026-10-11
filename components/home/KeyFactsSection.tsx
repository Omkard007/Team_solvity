"use client";

import Link from "next/link";
import { Copy, Download, Sparkles } from "lucide-react";
import { Section } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { HandCircle } from "@/components/brush";
import { Reveal } from "@/components/motion/Reveal";
import { KEY_FACTS_CONTENT } from "@/lib/content";

export function KeyFactsSection() {
  const { mockup } = KEY_FACTS_CONTENT;

  return (
    <Section tone="green" id="key-facts" className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Heading, HandCircle on Key, Code Chip, Green Button */}
        <div className="lg:col-span-6 flex flex-col items-start">
          <Reveal>
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
          </Reveal>
        </div>

        {/* Right Column: Overlapping Mockups with Motion Reveal */}
        <div className="lg:col-span-6 relative flex justify-center pb-10 sm:pb-12">
          <Reveal delay={150} className="relative w-full max-w-[480px]">
            {/* Background Brand Card */}
            <div className="rounded-[24px] bg-[#1E2923] p-6 sm:p-7 text-white shadow-xl shadow-zinc-900/20">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[var(--accent)]" />
                <h4 className="text-sm font-bold tracking-wide">
                  {mockup.backCard.title}
                </h4>
              </div>

              <div className="mt-4 space-y-2.5 max-w-[320px]">
                <div className="rounded-xl bg-white/10 p-3 text-xs leading-relaxed font-medium">
                  {mockup.backCard.field1}
                </div>
                <div className="rounded-xl bg-white/10 p-3 text-xs leading-relaxed font-medium">
                  {mockup.backCard.field2}
                </div>
              </div>
            </div>

            {/* Overlapping Front White Card */}
            <div className="absolute right-0 top-16 sm:top-14 w-[85%] sm:w-[80%] rounded-[24px] border border-[#ECEEED] bg-white p-6 shadow-2xl shadow-zinc-400/30">
              <div className="flex items-center justify-between border-b border-[#ECEEED] pb-3">
                <span className="text-xs font-bold text-[#1E2923]">
                  {mockup.frontCard.heading}
                </span>
                <span className="flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-[#ECEEED]/60">
                  <span className="text-[#5B6661]">Case type</span>
                  <span className="font-bold text-[#1E2923]">{mockup.frontCard.caseType}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#ECEEED]/60">
                  <span className="text-[#5B6661]">Parties</span>
                  <span className="font-bold text-[#1E2923]">{mockup.frontCard.parties}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#5B6661]">Outcome</span>
                  <span className="font-bold text-[var(--accent-ink)]">{mockup.frontCard.outcome}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#ECEEED] flex items-center justify-end gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-full border border-[#ECEEED] px-3 py-1 text-[11px] font-bold text-[#5B6661] hover:text-[#1E2923] transition-colors"
                >
                  <Copy className="h-3 w-3" />
                  Copy
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[11px] font-bold text-[var(--accent-ink)] transition-colors hover:brightness-95"
                >
                  <Download className="h-3 w-3" />
                  Save
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
