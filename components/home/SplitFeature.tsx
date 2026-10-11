"use client";

import Link from "next/link";
import { FileUp, BookOpen, Copy, FileText } from "lucide-react";
import { Section } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { BrushUnderline } from "@/components/brush";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { SPLIT_FEATURE_CONTENT } from "@/lib/content";

export function SplitFeature() {
  return (
    <Section tone="green" id="features" className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Stacked App Window Mockup */}
        <div className="lg:col-span-6 relative flex justify-center order-2 lg:order-1">
          <Reveal className="relative w-full max-w-[480px]">
            {/* Tilted background card 1 */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -rotate-3 scale-[0.96] rounded-[20px] border border-[#E6E8E7] bg-zinc-50 shadow-sm"
            />
            {/* Tilted background card 2 */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rotate-2 scale-[0.98] rounded-[20px] border border-[#E6E8E7] bg-white/90 shadow-md"
            />

            {/* Front main mockup window */}
            <div className="relative z-10 rounded-[20px] border border-[#E6E8E7] bg-white p-6 sm:p-7 shadow-2xl shadow-zinc-200/70">
              {/* Traffic light header */}
              <div className="flex items-center justify-between border-b border-[#E6E8E7] pb-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#E0E3E1]" />
                  <span className="h-3 w-3 rounded-full bg-[#E0E3E1]" />
                  <span className="h-3 w-3 rounded-full bg-[#E0E3E1]" />
                </div>
                <span className="text-xs font-bold text-[#4B5651] tracking-wide">
                  {SPLIT_FEATURE_CONTENT.mockup.title}
                </span>
                <div className="w-10" />
              </div>

              {/* Rows */}
              <div className="mt-5 space-y-3">
                {SPLIT_FEATURE_CONTENT.mockup.items.map((item, idx) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-xl border border-[#F0F2F1] bg-[#FAFAFA] p-3 sm:p-3.5 transition-colors hover:bg-white hover:border-[#E6E8E7]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#78C6EC]/20 text-[#2B79A3]">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs sm:text-sm font-semibold text-[#1E2923]">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-[#4B5651]/80">{item.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          idx === 2 ? "bg-amber-400 animate-pulse" : "bg-[var(--accent)]"
                        }`}
                      />
                      <span className="text-[11px] font-bold text-[#4B5651]">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bar at the bottom */}
              <div className="mt-6 rounded-xl bg-[#F0F2F1] p-3.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#1E2923]">
                  <span>{SPLIT_FEATURE_CONTENT.mockup.progressBar}</span>
                  <span className="text-[var(--accent-ink)]">75%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#E0E3E1]">
                  <div className="h-full w-3/4 rounded-full bg-[var(--accent)] transition-all duration-500" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: H2, Copy, Buttons, 3 Feature points */}
        <div className="lg:col-span-6 flex flex-col items-start order-1 lg:order-2">
          <Reveal delay={120}>
            <h2 className="display-h2">
              {SPLIT_FEATURE_CONTENT.h2Prefix}
              <span className="relative inline-block text-[var(--accent)] whitespace-nowrap">
                {SPLIT_FEATURE_CONTENT.h2Highlight}
                <BrushUnderline />
              </span>
              {SPLIT_FEATURE_CONTENT.h2Suffix}
            </h2>

            <p className="mt-6 lead-body">
              {SPLIT_FEATURE_CONTENT.lead}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/analyze">
                <Button variant="accent" size="lg">
                  {SPLIT_FEATURE_CONTENT.primaryBtn}
                </Button>
              </Link>
              <Button variant="disabled-gray" size="lg">
                {SPLIT_FEATURE_CONTENT.disabledBtn}
              </Button>
            </div>

            {/* Row of 3 line-icon features with captions */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#E6E8E7] w-full">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <FileUp className="h-5 w-5" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#1E2923] leading-snug">
                  {SPLIT_FEATURE_CONTENT.points[0].title}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <BookOpen className="h-5 w-5" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#1E2923] leading-snug">
                  {SPLIT_FEATURE_CONTENT.points[1].title}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Copy className="h-5 w-5" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#1E2923] leading-snug">
                  {SPLIT_FEATURE_CONTENT.points[2].title}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
