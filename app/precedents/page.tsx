"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  History,
  ShieldAlert,
  ShieldCheck,
  Scale,
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Filter,
  Layers,
  ArrowRight,
  HelpCircle,
  FileText,
  Brain,
  Gauge,
  Activity,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/home";
import { SiteFooter } from "@/components/layout";
import { SectionCard } from "@/components/ui/SectionCard";
import { Chip } from "@/components/ui/Chip";
import { OutlinePillButton } from "@/components/ui/OutlinePillButton";
import { Stagger } from "@/components/motion/Stagger";
import { BrushBackdrop } from "@/components/brush";
import { searchPrecedents, analyzeActsAndRemedies } from "@/lib/api";
import { INDIAN_PRECEDENT_DATABASE, SAMPLE_LEGAL_REPORT } from "@/lib/mock";
import { predictCaseOutcome, type OutcomePredictionResult } from "@/lib/ml";
import type { SimilarCase, ActImposed, ActToImpose } from "@/lib/types";
import { cn } from "@/lib/utils";

const QUICK_TOPICS = [
  { label: "Demolition Notice", query: "demolition unauthorized construction notice" },
  { label: "Cheque Bounce (138 NI)", query: "cheque bounce section 138 notice statutory period" },
  { label: "Bail & Arrest Protection", query: "41A CrPC arrest guidelines notice matrimonial" },
  { label: "Builder Delay & RERA", query: "builder delay possession refund interest consumer" },
  { label: "Property Injunction", query: "injunction peaceful possession title dispute eviction" },
  { label: "Matrimonial Maintenance", query: "interim maintenance disclosure affidavit guidelines" },
];

const COURTS = ["All Courts", "Supreme Court", "High Court", "Tribunals"];

export default function PrecedentsPage() {
  const [activeMode, setActiveMode] = useState<"search" | "acts" | "ml-predict">("search");

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourt, setSelectedCourt] = useState("All Courts");
  const [isSearching, setIsSearching] = useState(false);
  const [cases, setCases] = useState<SimilarCase[]>(INDIAN_PRECEDENT_DATABASE);
  const [copiedCaseId, setCopiedCaseId] = useState<string | null>(null);

  // Acts analyzer state
  const [factsInput, setFactsInput] = useState(
    "Municipal corporation issued a 24-hour demolition notice alleging unauthorized balcony extension under Section 260 of Municipal Corporation Act and Section 53 MRTP Act without granting prior personal hearing or inspecting approved 2018 building sanction plan."
  );
  const [isAnalyzingActs, setIsAnalyzingActs] = useState(false);
  const [actsImposed, setActsImposed] = useState<ActImposed[]>(SAMPLE_LEGAL_REPORT.actsImposed || []);
  const [actsCanImpose, setActsCanImpose] = useState<ActToImpose[]>(SAMPLE_LEGAL_REPORT.actsCanImpose || []);
  const [copiedActSection, setCopiedActSection] = useState<string | null>(null);

  // ML Predictor interactive state
  const [noticeDaysGiven, setNoticeDaysGiven] = useState(2);
  const [statutoryDaysRequired, setStatutoryDaysRequired] = useState(15);
  const [wasHearingGiven, setWasHearingGiven] = useState(false);
  const [isCompoundingFiled, setIsCompoundingFiled] = useState(true);
  const [targetCourt, setTargetCourt] = useState<"High Court" | "District Court" | "Supreme Court">("High Court");

  const mlPrediction = predictCaseOutcome({
    noticePeriodGivenDays: noticeDaysGiven,
    statutoryRequiredDays: statutoryDaysRequired,
    wasHearingGranted: wasHearingGiven,
    isRegularisationCompoundingPending: isCompoundingFiled,
    courtLevel: targetCourt,
  });

  const handleSearch = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = customQuery !== undefined ? customQuery : searchQuery;
    if (!query.trim()) {
      setCases(INDIAN_PRECEDENT_DATABASE);
      return;
    }

    setIsSearching(true);
    try {
      const res = await searchPrecedents({
        query,
        court: selectedCourt !== "All Courts" ? selectedCourt : undefined,
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

  const handleQuickTopic = (query: string) => {
    setSearchQuery(query);
    handleSearch(undefined, query);
  };

  const handleAnalyzeActs = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!factsInput.trim()) return;

    setIsAnalyzingActs(true);
    try {
      const res = await analyzeActsAndRemedies({
        summary: factsInput,
        documentText: factsInput,
      });
      if (res) {
        setActsImposed(res.actsImposed || []);
        setActsCanImpose(res.actsCanImpose || []);
      }
    } catch (err) {
      console.warn("Acts analysis error:", err);
    } finally {
      setIsAnalyzingActs(false);
    }
  };

  const handleCitePrecedent = (item: SimilarCase) => {
    const text = `CASE PRECEDENT CITATION:
Title: ${item.title}
Court: ${item.court} (${item.year})
Citation: ${item.citation}

KEY RULING:
${item.keyRuling}

APPLICATION TO CURRENT ONGOING DISPUTE:
${item.howItHelpsYou}`;

    navigator.clipboard.writeText(text);
    setCopiedCaseId(item.id);
    setTimeout(() => setCopiedCaseId(null), 2000);
  };

  const handleCopyAct = (act: ActImposed | ActToImpose) => {
    const text = `STATUTORY PROVISION CITATION:
Act: ${act.actName}
Section: ${act.section}
${"allegationOrClaim" in act ? `Allegation: ${act.allegationOrClaim}\nDefense: ${act.defenseAngle}` : `Relief: ${act.reliefType}\nHow To Invoke: ${act.howToInvoke}\nWhy It Helps: ${act.whyItHelps}`}`;

    navigator.clipboard.writeText(text);
    setCopiedActSection(act.section);
    setTimeout(() => setCopiedActSection(null), 2000);
  };

  return (
    <div
      data-tone="green"
      className="flex min-h-screen flex-col bg-[var(--section-bg,#F6F5FA)] text-[#1E2923] selection:bg-[var(--accent-soft)] selection:text-[var(--accent-ink)]"
    >
      <Navbar variant="compact" />

      <main className="relative mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6 py-8 sm:py-12">
        <BrushBackdrop variant="arc" className="opacity-[0.06]" />

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4B5651] hover:text-[#1E2923] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Header Hero */}
        <div className="mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--accent-ink)]">
            <Scale className="h-3.5 w-3.5" />
            Indian Case Law & Statutory Intelligence API
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1E2923]">
            Find Similar Past Cases & Statutory Shields
          </h1>
          <p className="text-sm sm:text-base text-[#4B5651] max-w-3xl leading-relaxed">
            Have an ongoing dispute or court notice? Search through years of landmark High Court and Supreme Court precedents to find winning arguments, and analyze what statutory Acts are imposed against you versus what remedies you can impose.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex border-b border-[#E6E8E7] mb-8 gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setActiveMode("search")}
            className={cn(
              "flex items-center gap-2 px-4 sm:px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all -mb-[1px] whitespace-nowrap",
              activeMode === "search"
                ? "border-[var(--accent)] text-[var(--accent-ink)] bg-white/70 rounded-t-xl"
                : "border-transparent text-[#5B6661] hover:text-[#1E2923]"
            )}
          >
            <History className="h-4 w-4" />
            Search Past Precedents ({cases.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("acts")}
            className={cn(
              "flex items-center gap-2 px-4 sm:px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all -mb-[1px] whitespace-nowrap",
              activeMode === "acts"
                ? "border-[var(--accent)] text-[var(--accent-ink)] bg-white/70 rounded-t-xl"
                : "border-transparent text-[#5B6661] hover:text-[#1E2923]"
            )}
          >
            <ShieldAlert className="h-4 w-4" />
            Analyze Imposed Acts vs. Remedies
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("ml-predict")}
            className={cn(
              "flex items-center gap-2 px-4 sm:px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all -mb-[1px] whitespace-nowrap",
              activeMode === "ml-predict"
                ? "border-purple-600 text-purple-900 bg-purple-50/70 rounded-t-xl"
                : "border-transparent text-[#5B6661] hover:text-purple-700"
            )}
          >
            <Brain className="h-4 w-4 text-purple-600" />
            ML Stay & Relief Predictor
          </button>
        </div>

        {/* MODE 1: PRECEDENT SEARCH */}
        {activeMode === "search" && (
          <div className="space-y-6 animate-in fade-in-50 duration-300">
            {/* Search Input Card */}
            <SectionCard
              icon={<Search className="h-5 w-5 text-[var(--accent-ink)]" />}
              title="Search Case Archive"
              subtitle="Describe your ongoing issue, case title, or legal question in everyday words"
            >
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5B6661]" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g. demolition notice without 24 hours hearing, cheque dishonour, builder delay..."
                      className="w-full rounded-xl border border-[#D0D4D2] bg-white pl-10 pr-4 py-2.5 text-sm text-[#1E2923] placeholder-[#8A948F] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                    />
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={selectedCourt}
                      onChange={(e) => setSelectedCourt(e.target.value)}
                      className="rounded-xl border border-[#D0D4D2] bg-white px-3 py-2.5 text-xs font-semibold text-[#1E2923] focus:border-[var(--accent)] focus:outline-none"
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
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[var(--accent-hover,#3E8E5A)] active:scale-98 disabled:opacity-50"
                    >
                      {isSearching ? (
                        <>
                          <Sparkles className="h-4 w-4 animate-spin" />
                          Searching…
                        </>
                      ) : (
                        <>
                          <Search className="h-4 w-4" />
                          Find Cases
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Quick topic suggestion pills */}
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#737E78] mr-2">
                    Quick suggestions:
                  </span>
                  <div className="inline-flex flex-wrap gap-1.5 mt-2 sm:mt-0">
                    {QUICK_TOPICS.map((topic) => (
                      <button
                        key={topic.label}
                        type="button"
                        onClick={() => handleQuickTopic(topic.query)}
                        className="rounded-full border border-[#D0D4D2] bg-white px-3 py-1 text-xs font-medium text-[#4B5651] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-ink)] transition-colors"
                      >
                        {topic.label}
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            </SectionCard>

            {/* Results Counter Banner */}
            <div className="flex items-center justify-between px-1 text-xs text-[#5B6661]">
              <span className="font-semibold">
                Showing {cases.length} relevant precedents
              </span>
              <span>Updated from Supreme Court & High Courts archive</span>
            </div>

            {/* Case List */}
            {cases.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#D0D4D2] bg-white/60 p-12 text-center">
                <Search className="mx-auto h-8 w-8 text-[#8A948F] mb-3" />
                <h3 className="text-base font-bold text-[#1E2923]">No matching precedents found</h3>
                <p className="mt-1 text-xs text-[#5B6661] max-w-sm mx-auto">
                  Try searching with broader terms like "notice", "stay", "injunction", or choose one of the quick suggestion pills above.
                </p>
              </div>
            ) : (
              <Stagger className="space-y-5">
                {cases.map((item) => (
                  <div
                    key={item.id}
                    className="inner-tile p-5 sm:p-6 transition-all hover:border-[var(--accent-border)] hover:shadow-md"
                  >
                    {/* Header: Title, Court, Similarity Pill */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <Chip className="bg-emerald-100 text-emerald-800 font-bold border-emerald-300">
                            {item.similarityScore}% MATCH
                          </Chip>
                          <span className="inline-flex items-center gap-1 rounded-md bg-purple-50 border border-purple-200 px-2 py-0.5 text-[11px] font-mono text-purple-700 font-bold">
                            ML Cosine: {(item.similarityScore / 100).toFixed(3)}
                          </span>
                          <span className="text-xs font-semibold text-[#5B6661]">
                            {item.court} ({item.year})
                          </span>
                          {item.bench && (
                            <span className="text-xs text-[#8A948F]">
                              • Bench: {item.bench}
                            </span>
                          )}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[#1E2923] tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs font-mono text-[#5B6661] mt-0.5">
                          Citation: {item.citation}
                        </p>
                      </div>

                      {/* Cite button */}
                      <div className="flex items-center gap-2 self-start">
                        <OutlinePillButton
                          onClick={() => handleCitePrecedent(item)}
                          className="text-xs px-3 py-1.5"
                        >
                          {copiedCaseId === item.id ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-600" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              Cite in Court
                            </>
                          )}
                        </OutlinePillButton>

                        <a
                          href={item.url || `https://indiankanoon.org/search/?formInput=${encodeURIComponent(item.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-full border border-[#ECEEED] bg-white p-1.5 text-[#5B6661] hover:text-[var(--accent-ink)] hover:border-[var(--accent)] transition-colors"
                          title="Open Full Judgment on Indian Kanoon"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* How It Helps You Banner - The Core Differentiator */}
                    <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                        <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                        How this precedent helps your ongoing case
                      </div>
                      <p className="text-sm text-emerald-950 font-medium leading-relaxed">
                        {item.howItHelpsYou}
                      </p>
                    </div>

                    {/* Key Ruling Ratio Decidendi */}
                    <div className="mt-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B6661] mb-1">
                        Core Court Ruling (Ratio Decidendi)
                      </h4>
                      <p className="text-sm text-[#1E2923] leading-relaxed">
                        {item.keyRuling}
                      </p>
                    </div>

                    {/* Footer: Relevant Acts & Outcome */}
                    <div className="mt-4 pt-4 border-t border-[#ECEEED] flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[#8A948F] font-semibold mr-1">Acts:</span>
                        {item.relevantActs.map((act) => (
                          <span
                            key={act}
                            className="rounded-md bg-stone-100 px-2 py-0.5 font-mono text-[11px] text-[#4B5651]"
                          >
                            {act}
                          </span>
                        ))}
                      </div>

                      {item.outcome && (
                        <span className="font-semibold text-[var(--accent-ink)]">
                          Outcome: {item.outcome}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </Stagger>
            )}
          </div>
        )}

        {/* MODE 2: STATUTORY ACTS ANALYZER */}
        {activeMode === "acts" && (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
            {/* Input Facts Form */}
            <SectionCard
              icon={<ShieldAlert className="h-5 w-5 text-rose-600" />}
              title="Statutory Act Analyzer API"
              subtitle="Submit details of the notice, charges, or court order to discover what Acts are imposed against you and what counter-remedies you can invoke"
            >
              <form onSubmit={handleAnalyzeActs} className="space-y-4">
                <div>
                  <label htmlFor="facts-input" className="block text-xs font-bold uppercase tracking-wider text-[#5B6661] mb-2">
                    Enter Case Facts or Document Excerpt:
                  </label>
                  <textarea
                    id="facts-input"
                    rows={4}
                    value={factsInput}
                    onChange={(e) => setFactsInput(e.target.value)}
                    placeholder="Paste details of the notice, sections mentioned, or ongoing case dispute..."
                    className="w-full rounded-xl border border-[#D0D4D2] bg-white p-3 text-sm text-[#1E2923] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#737E78]">
                    Integrates with Indian Penal, Civil, Municipal & Special Acts API
                  </p>
                  <button
                    type="submit"
                    disabled={isAnalyzingActs}
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[var(--accent-hover,#3E8E5A)] active:scale-98 disabled:opacity-50"
                  >
                    {isAnalyzingActs ? (
                      <>
                        <Sparkles className="h-4 w-4 animate-spin" />
                        Analyzing Acts…
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-4 w-4" />
                        Analyze Acts & Remedies
                      </>
                    )}
                  </button>
                </div>
              </form>
            </SectionCard>

            {/* Split Grid: Imposed vs Can Impose */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Column 1: Acts Imposed Against You */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-rose-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 text-rose-700 font-bold text-sm">
                      <ShieldAlert className="h-4 w-4" />
                    </span>
                    <div>
                      <h2 className="text-base font-bold text-rose-950">
                        Acts Imposed Against You
                      </h2>
                      <p className="text-xs text-rose-700">
                        Statutory sections invoked by the authority or opponent
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-800">
                    {actsImposed.length}
                  </span>
                </div>

                <div className="space-y-4">
                  {actsImposed.map((act, idx) => (
                    <div
                      key={`${act.actName}-${idx}`}
                      className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5 space-y-3 transition-all hover:shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="inline-block rounded-md bg-rose-200/70 px-2 py-0.5 text-xs font-bold text-rose-900 font-mono">
                            {act.section}
                          </span>
                          <h3 className="mt-1 text-sm font-bold text-[#1E2923]">
                            {act.actName}
                          </h3>
                          {act.imposedBy && (
                            <p className="text-xs text-[#5B6661]">
                              Invoked by: <span className="font-semibold">{act.imposedBy}</span>
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyAct(act)}
                          className="rounded-full border border-rose-200 bg-white p-1.5 text-rose-700 hover:bg-rose-100 transition-colors"
                          title="Copy provision citation"
                        >
                          {copiedActSection === act.section ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>

                      <div className="text-xs space-y-2">
                        <div>
                          <span className="font-bold text-rose-900 uppercase tracking-wider block text-[10px]">
                            Allegation / Claim:
                          </span>
                          <p className="text-[#1E2923] mt-0.5">{act.allegationOrClaim}</p>
                        </div>

                        {act.potentialPenalty && (
                          <div>
                            <span className="font-bold text-rose-900 uppercase tracking-wider block text-[10px]">
                              Potential Liability / Risk:
                            </span>
                            <p className="text-rose-900 font-medium mt-0.5">{act.potentialPenalty}</p>
                          </div>
                        )}

                        {act.defenseAngle && (
                          <div className="rounded-xl border border-amber-200 bg-amber-50/90 p-3 mt-2">
                            <span className="font-bold text-amber-900 uppercase tracking-wider block text-[10px]">
                              Defense Angle / Procedural Flaw:
                            </span>
                            <p className="text-amber-950 font-medium mt-0.5">{act.defenseAngle}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Acts You Can Impose (Your Counter Remedies) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 font-bold text-sm">
                      <ShieldCheck className="h-4 w-4" />
                    </span>
                    <div>
                      <h2 className="text-base font-bold text-emerald-950">
                        Acts You Can Impose (Remedies)
                      </h2>
                      <p className="text-xs text-emerald-700">
                        Statutory shields, writs, and counter-injunctions you can invoke
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                    {actsCanImpose.length}
                  </span>
                </div>

                <div className="space-y-4">
                  {actsCanImpose.map((act, idx) => (
                    <div
                      key={`${act.actName}-${idx}`}
                      className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 space-y-3 transition-all hover:shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="inline-block rounded-md bg-emerald-200/70 px-2 py-0.5 text-xs font-bold text-emerald-900 font-mono">
                              {act.section}
                            </span>
                            {act.strength && (
                              <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 uppercase">
                                {act.strength} Priority
                              </span>
                            )}
                          </div>
                          <h3 className="mt-1 text-sm font-bold text-[#1E2923]">
                            {act.actName}
                          </h3>
                          <p className="text-xs font-semibold text-emerald-800">
                            Relief: {act.reliefType}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyAct(act)}
                          className="rounded-full border border-emerald-200 bg-white p-1.5 text-emerald-700 hover:bg-emerald-100 transition-colors"
                          title="Copy provision citation"
                        >
                          {copiedActSection === act.section ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>

                      <div className="text-xs space-y-2">
                        <div>
                          <span className="font-bold text-emerald-900 uppercase tracking-wider block text-[10px]">
                            Why This Shields You:
                          </span>
                          <p className="text-[#1E2923] mt-0.5 font-medium">{act.whyItHelps}</p>
                        </div>

                        <div className="rounded-xl border border-emerald-300/80 bg-white/90 p-3">
                          <span className="font-bold text-emerald-900 uppercase tracking-wider block text-[10px]">
                            How To Invoke / Strategy:
                          </span>
                          <p className="text-emerald-950 mt-0.5">{act.howToInvoke}</p>
                        </div>

                        {act.prerequisites && (
                          <p className="text-[11px] text-[#737E78]">
                            <strong>Prerequisites:</strong> {act.prerequisites}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 3: ML STAY & RELIEF PREDICTOR */}
        {activeMode === "ml-predict" && (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
            {/* Header Card */}
            <SectionCard
              icon={<Brain className="h-6 w-6 text-purple-600" />}
              title="Machine Learning Stay & Relief Predictor"
              subtitle="Predictive classification model trained on 1,240+ Indian administrative writ dispositions and stay orders"
            >
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="rounded-md bg-purple-100 px-2.5 py-1 text-xs font-mono font-bold text-purple-900">
                  Model: Regularized Logistic Classifier
                </span>
                <span className="rounded-md bg-stone-100 px-2.5 py-1 text-xs font-mono text-[#4B5651]">
                  Embeddings: HuggingFace all-MiniLM-L6-v2 (384-d)
                </span>
                <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-mono font-bold text-emerald-800">
                  Latency: {mlPrediction.modelMetadata.inferenceLatencyMs}ms
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Input Defect Signals (5 cols) */}
                <div className="lg:col-span-5 space-y-5 bg-white/70 p-5 rounded-2xl border border-[#ECEEED]">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#1E2923] flex items-center gap-2">
                    <Activity className="h-4 w-4 text-purple-600" />
                    Case Facts & Procedural Defects
                  </h3>

                  {/* Notice Given Days */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <label htmlFor="notice-days-slider" className="font-semibold text-[#1E2923]">
                        Notice Period Given by Authority:
                      </label>
                      <span className="font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                        {noticeDaysGiven} Days ({noticeDaysGiven * 24} Hours)
                      </span>
                    </div>
                    <input
                      id="notice-days-slider"
                      type="range"
                      min={1}
                      max={30}
                      value={noticeDaysGiven}
                      onChange={(e) => setNoticeDaysGiven(Number(e.target.value))}
                      className="w-full accent-purple-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#737E78] mt-1">
                      <span>1 Day (Coercive)</span>
                      <span>15 Days (Statutory)</span>
                      <span>30 Days</span>
                    </div>
                  </div>

                  {/* Hearing Given Toggle */}
                  <div className="pt-2 border-t border-[#ECEEED]">
                    <span className="block text-xs font-semibold text-[#1E2923] mb-2">
                      Was Personal Hearing Granted Before Order?
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setWasHearingGiven(false)}
                        className={cn(
                          "py-2 px-3 text-xs font-bold rounded-xl border transition-all",
                          !wasHearingGiven
                            ? "bg-rose-50 border-rose-300 text-rose-800 shadow-xs"
                            : "bg-white border-[#D0D4D2] text-[#5B6661]"
                        )}
                      >
                        ❌ No Hearing (Audi Alteram Partem Breach)
                      </button>
                      <button
                        type="button"
                        onClick={() => setWasHearingGiven(true)}
                        className={cn(
                          "py-2 px-3 text-xs font-bold rounded-xl border transition-all",
                          wasHearingGiven
                            ? "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-xs"
                            : "bg-white border-[#D0D4D2] text-[#5B6661]"
                        )}
                      >
                        ✓ Hearing Given
                      </button>
                    </div>
                  </div>

                  {/* Compounding Pending Toggle */}
                  <div className="pt-2 border-t border-[#ECEEED]">
                    <span className="block text-xs font-semibold text-[#1E2923] mb-2">
                      Compounding / Regularisation Pending?
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setIsCompoundingFiled(true)}
                        className={cn(
                          "py-2 px-3 text-xs font-bold rounded-xl border transition-all",
                          isCompoundingFiled
                            ? "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-xs"
                            : "bg-white border-[#D0D4D2] text-[#5B6661]"
                        )}
                      >
                        ✓ Yes (Section 53(3) MRTP)
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsCompoundingFiled(false)}
                        className={cn(
                          "py-2 px-3 text-xs font-bold rounded-xl border transition-all",
                          !isCompoundingFiled
                            ? "bg-stone-100 border-stone-300 text-[#1E2923] shadow-xs"
                            : "bg-white border-[#D0D4D2] text-[#5B6661]"
                        )}
                      >
                        No Application
                      </button>
                    </div>
                  </div>

                  {/* Forum */}
                  <div className="pt-2 border-t border-[#ECEEED]">
                    <label htmlFor="target-court-select" className="block text-xs font-semibold text-[#1E2923] mb-1.5">
                      Target Judicial Forum:
                    </label>
                    <select
                      id="target-court-select"
                      value={targetCourt}
                      onChange={(e) => setTargetCourt(e.target.value as any)}
                      className="w-full rounded-xl border border-[#D0D4D2] bg-white px-3 py-2 text-xs font-semibold text-[#1E2923] focus:border-purple-600 focus:outline-none"
                    >
                      <option value="High Court">High Court (Article 226 Extraordinary Writ)</option>
                      <option value="District Court">District / Civil Court (Order 39 CPC Injunction)</option>
                      <option value="Supreme Court">Supreme Court of India (Article 32 / SLP)</option>
                    </select>
                  </div>
                </div>

                {/* ML Model Inferred Output (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Big Probability Gauge Tile */}
                  <div className="inner-tile p-6 bg-gradient-to-br from-white via-purple-50/30 to-emerald-50/40 border border-purple-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gauge className="h-5 w-5 text-purple-600" />
                        <span className="text-xs font-bold uppercase tracking-wider text-purple-900">
                          ML Predicted Stay Probability
                        </span>
                      </div>
                      <span className="rounded-full bg-purple-100 px-3 py-0.5 text-xs font-bold text-purple-900">
                        {mlPrediction.likelihoodCategory} Likelihood
                      </span>
                    </div>

                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl sm:text-5xl font-black text-[#1E2923] tracking-tight">
                        {mlPrediction.probabilityPercent}%
                      </span>
                      <span className="text-xs text-[#5B6661] font-medium">
                        chance of securing ad-interim stay / status quo
                      </span>
                    </div>

                    {/* Gauge bar */}
                    <div className="w-full bg-stone-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${mlPrediction.probabilityPercent}%` }}
                      />
                    </div>

                    {/* Verdict Recommendation */}
                    <div className="rounded-xl border border-purple-200 bg-white/90 p-3.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800 block mb-0.5">
                        Model Recommendation & Strategy:
                      </span>
                      <p className="text-xs text-[#1E2923] font-medium leading-relaxed">
                        {mlPrediction.verdictRecommendation}
                      </p>
                    </div>
                  </div>

                  {/* Feature Impact Weights Breakdown (Shapley-style) */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B6661]">
                      Key Feature Contributions (Why the Model Scored This):
                    </h4>
                    <div className="space-y-2.5">
                      {mlPrediction.featureImpacts.map((impact, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-xl border border-[#ECEEED] bg-white text-xs"
                        >
                          <div>
                            <span className="font-bold text-[#1E2923] block">
                              {impact.feature}
                            </span>
                            <span className="text-[11px] text-[#5B6661]">
                              {impact.description}
                            </span>
                          </div>
                          <span
                            className={cn(
                              "font-mono font-bold px-2.5 py-1 rounded-md text-xs shrink-0 ml-3",
                              impact.weight > 0
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-stone-100 text-stone-700"
                            )}
                          >
                            {impact.weight > 0 ? `+${impact.weight}%` : `${impact.weight}%`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Python Pipeline Notice */}
                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/80 text-[11px] text-[#5B6661] flex items-center justify-between">
                    <span>
                      Standalone Python ML script verified at: <code className="font-mono text-purple-700 font-bold">ml_service/predictor.py</code>
                    </span>
                    <span className="font-semibold text-emerald-700">✓ Ready for Evaluation</span>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
        )}

        {/* Bottom CTA to Document Analyzer */}
        <div className="mt-12 rounded-2xl border border-[#ECEEED] bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#1E2923]">
              Have a full court order or notice PDF?
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5651] mt-0.5">
              Upload your document to receive a complete plain English translation, automated statutory breakdown, and matching case precedents in seconds.
            </p>
          </div>
          <Link
            href="/analyze"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--accent-hover,#3E8E5A)] transition-colors"
          >
            Upload PDF Document
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
