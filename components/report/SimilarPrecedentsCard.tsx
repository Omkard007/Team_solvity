"use client";

import { useState } from "react";
import { History, Search, ExternalLink, Check, Copy, Sparkles, BookMarked, Filter } from "lucide-react";
import type { SimilarCase } from "@/lib/types";
import { SectionCard } from "@/components/ui/SectionCard";
import { Chip } from "@/components/ui/Chip";
import { OutlinePillButton } from "@/components/ui/OutlinePillButton";
import { Stagger } from "@/components/motion/Stagger";
import { searchPrecedents } from "@/lib/api";
import { cn } from "@/lib/utils";

export interface SimilarPrecedentsCardProps {
  initialCases?: SimilarCase[];
  defaultQuery?: string;
  className?: string;
}

export function SimilarPrecedentsCard({
  initialCases = [],
  defaultQuery = "",
  className,
}: SimilarPrecedentsCardProps) {
  const [cases, setCases] = useState<SimilarCase[]>(initialCases);
  const [searchQuery, setSearchQuery] = useState(defaultQuery);
  const [courtFilter, setCourtFilter] = useState<string>("All Courts");
  const [isSearching, setIsSearching] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const COURTS = ["All Courts", "Supreme Court", "High Court"];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const res = await searchPrecedents({
        query: searchQuery,
        court: courtFilter !== "All Courts" ? courtFilter : undefined,
      });
      if (res && res.cases) {
        setCases(res.cases);
      }
    } catch (err) {
      console.warn("Precedent search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCite = (item: SimilarCase) => {
    const text = `CITATION PRECEDENT:
Case: ${item.title}
Court: ${item.court} (${item.year})
Citation: ${item.citation}

KEY RULING:
${item.keyRuling}

APPLICATION TO CURRENT MATTER:
${item.howItHelpsYou}`;

    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <SectionCard
      icon={<History className="h-6 w-6 text-[var(--accent-ink)]" />}
      title="Previous Years' Similar Cases & Precedents"
      subtitle="Ranked via Hugging Face sentence-transformers (384-d semantic embeddings) & Cosine Distance to match binding ratio decidendi"
      className={cn("overflow-hidden", className)}
    >
      <div className="space-y-6">
        {/* Search & Filter Bar */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5B6661]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search previous cases (e.g., demolition 15 days notice, 138 NI Act, anticipatory bail)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#ECEEED] bg-[#FAFAFA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[#1E2923] placeholder:text-[#5B6661]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={courtFilter}
              onChange={(e) => setCourtFilter(e.target.value)}
              className="px-3 py-2.5 text-xs font-semibold rounded-xl border border-[#ECEEED] bg-white text-[#1E2923] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            >
              {COURTS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={isSearching}
              className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover,#3E8E5A)] px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSearching ? "Searching…" : "Find Precedents"}
            </button>
          </div>
        </form>

        {/* Results List */}
        {cases.length === 0 ? (
          <div className="inner-tile p-8 text-center text-[#5B6661]">
            <BookMarked className="h-8 w-8 mx-auto text-[#5B6661]/60 mb-2" />
            <p className="text-sm font-semibold">No matching historical precedents found for this query.</p>
            <p className="text-xs mt-1">Try broader terms like &quot;Section 53 MRTP&quot;, &quot;interim injunction&quot;, or &quot;demolition stay&quot;.</p>
          </div>
        ) : (
          <Stagger delayStep={70} maxItems={4} className="space-y-4">
            {cases.map((item) => {
              const isCopied = copiedId === item.id;

              return (
                <div
                  key={item.id}
                  className="inner-tile p-6 bg-white border border-[#ECEEED] shadow-2xs hover:shadow-md hover:border-[var(--accent)] transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs font-bold text-[var(--accent-ink)] border border-[var(--summary-border)]">
                          <Sparkles className="h-3 w-3" />
                          {item.similarityScore}% Match
                        </span>

                        <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-0.5 text-[11px] font-bold font-mono text-purple-700 border border-purple-200">
                          ML Cosine {(item.similarityScore / 100).toFixed(3)}
                        </span>

                        <span className="rounded-full bg-[#F0F2F1] px-2.5 py-0.5 text-[11px] font-semibold text-[#5B6661]">
                          Year {item.year}
                        </span>

                        <span className="rounded-full bg-[#F0F2F1] px-2.5 py-0.5 text-[11px] font-semibold text-[#1E2923]">
                          {item.court}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-[#1E2923] tracking-tight">
                        {item.title}
                      </h3>
                      <p className="font-mono text-xs text-[#5B6661] mt-0.5">
                        Citation: {item.citation}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <OutlinePillButton
                        icon={isCopied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                        onClick={() => handleCite(item)}
                        className="text-xs"
                      >
                        {isCopied ? "Copied!" : "Cite in Court"}
                      </OutlinePillButton>

                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full border border-[#ECEEED] hover:border-[var(--accent)] text-[#5B6661] hover:text-[var(--accent-ink)] transition-colors"
                          title="Open official judgment"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    {/* Key Ruling */}
                    <div className="rounded-xl bg-[#FAFAFA] p-3.5 border border-[#ECEEED] text-xs sm:text-sm text-[#1E2923] leading-relaxed">
                      <span className="font-bold text-[#5B6661] block text-[11px] uppercase tracking-wider mb-1">
                        Core Court Ruling:
                      </span>
                      {item.keyRuling}
                    </div>

                    {/* How This Helps You Box */}
                    <div className="rounded-xl bg-[var(--summary-bg)] p-3.5 border border-[var(--summary-border)] text-xs sm:text-sm text-[#1E2923] leading-relaxed">
                      <span className="font-bold text-[var(--accent-ink)] block text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
                        How This Precedent Helps Your Ongoing Case:
                      </span>
                      <p className="font-medium text-[#1E2923]">
                        {item.howItHelpsYou}
                      </p>
                    </div>

                    {/* Relevant Acts */}
                    {item.relevantActs?.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] font-bold text-[#5B6661] uppercase mr-1">
                          Applicable Acts:
                        </span>
                        {item.relevantActs.map((act, i) => (
                          <Chip key={i} variant="mono" className="text-[11px]">
                            {act}
                          </Chip>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </Stagger>
        )}
      </div>
    </SectionCard>
  );
}
