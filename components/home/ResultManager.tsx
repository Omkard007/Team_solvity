"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Copy,
  Download,
  Printer,
} from "lucide-react";
import { Section } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { RulingCard, DirectionsList } from "@/components/report";
import { Chip } from "@/components/ui/Chip";
import { OutlinePillButton } from "@/components/ui/OutlinePillButton";
import { Reveal } from "@/components/motion/Reveal";
import { SAMPLE_LEGAL_REPORT } from "@/lib/mock";
import { RESULT_MANAGER_CONTENT } from "@/lib/content";

export function ResultManager() {
  return (
    <Section tone="green" id="result-manager" className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Live Results Preview rendering REAL results components */}
        <div className="lg:col-span-7 relative flex justify-center order-2 lg:order-1 w-full">
          <Reveal className="w-full max-w-[620px] space-y-4">
            {/* Live RulingCard */}
            <RulingCard
              outcomeBadge={SAMPLE_LEGAL_REPORT.outcomeBadge}
              plainRuling={SAMPLE_LEGAL_REPORT.plainRuling}
              directions={SAMPLE_LEGAL_REPORT.directions.slice(0, 2)}
              conditions={SAMPLE_LEGAL_REPORT.conditions.slice(0, 1)}
              className="shadow-xl shadow-zinc-200/60"
            />

            {/* Quick Actions & Statute Chips Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#ECEEED] bg-[#FAFAFA] p-3.5 shadow-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6661] mr-1">
                  Statutes:
                </span>
                <Chip>Sec 53 MRTP Act</Chip>
                <Chip>Art 226 Constitution</Chip>
              </div>

              <div className="flex items-center gap-2">
                <OutlinePillButton
                  icon={<Copy className="h-3 w-3" />}
                  className="text-xs"
                >
                  Copy Summary
                </OutlinePillButton>
                <OutlinePillButton
                  icon={<Download className="h-3 w-3" />}
                  className="text-xs"
                >
                  Export
                </OutlinePillButton>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: H2, Paragraph, Green Button */}
        <div className="lg:col-span-5 flex flex-col items-start order-1 lg:order-2">
          <Reveal delay={100}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-bold text-[var(--accent-ink)] mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Live Output Preview
            </span>
            <h2 className="display-h2">
              {RESULT_MANAGER_CONTENT.h2}
            </h2>

            <p className="mt-6 lead-body">
              {RESULT_MANAGER_CONTENT.lead}
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Link href="/analyze">
                <Button variant="accent" size="lg" className="gap-2">
                  <span>{RESULT_MANAGER_CONTENT.cta}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
