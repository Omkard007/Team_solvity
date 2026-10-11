import type { NyayaAIOutput } from "@/types/type";

export type Level = "simple";

export type OutcomeTone = "green" | "amber" | "red" | "neutral";

export interface ActImposed {
  actName: string;
  section: string;
  imposedBy: string;
  allegationOrClaim: string;
  potentialPenalty?: string;
  defenseAngle: string;
}

export interface ActToImpose {
  actName: string;
  section: string;
  reliefType: string; // e.g. "Immediate Stay", "Compensation", "Regularisation"
  howToInvoke: string;
  whyItHelps: string;
  prerequisites?: string;
  strength: "High" | "Medium" | "Strategic";
}

export interface SimilarCase {
  id: string;
  title: string;
  court: string;
  year: number;
  citation: string;
  similarityScore: number; // e.g. 96
  matchReason: string;
  bench?: string;
  keyRuling: string;
  howItHelpsYou: string;
  outcome: "favorable" | "caution" | "precedent";
  url?: string;
  relevantActs: string[];
}

export interface PrecedentSearchParams {
  query: string;
  court?: string;
  yearFrom?: number;
  yearTo?: number;
  legalIssue?: string;
}

export interface PrecedentSearchResult {
  query: string;
  totalFound: number;
  cases: SimilarCase[];
  analysisSummary?: string;
}

export interface ActsAnalysisResult {
  actsImposed: ActImposed[];
  actsCanImpose: ActToImpose[];
  strategicSummary?: string;
}

export interface LegalReport {
  title: string;                       // "Legal Document Analysis"
  outcomeBadge: { label: string; description: string; tone: OutcomeTone };
  plainRuling: string;
  directions: string[];                // Court Directions & Orders Issued
  conditions: string[];                // Mandatory Conditions Imposed
  identification: {
    caseTitle: string;
    court: string;
    caseNumber: string;
    date: string;
    bench: string;
    documentType: string;
    language: string;
  };
  executiveSummary: string;
  background: {
    why: string;
    issues: string[];
  };
  nextSteps: {
    date: string;
    dateNote?: string;
    action: string;
    responsibleParty: string;
  }[];
  facts: {
    label: string;
    value: string;
    whyItMatters: string;
  }[];
  timeline: {
    date: string;
    event: string;
  }[];
  parties: {
    role: string;
    name: string;
    argument?: string;
  }[];
  laws: {
    citation: string;
    source: string;
    plainMeaning: string;
    contextInDocument: string;
  }[];
  originalText: string;
  isSample?: boolean;
  // New features: Acts Imposed vs Can Impose, and Similar Past Cases
  actsImposed?: ActImposed[];
  actsCanImpose?: ActToImpose[];
  similarCases?: SimilarCase[];
}

export interface SimplifyResult {
  report?: LegalReport;
  data?: NyayaAIOutput;
  simplifiedText?: string;
  originalText?: string;
  wordCount?: number;
}

export type SelectedSource =
  | { type: "file"; file: File }
  | { type: "sample" }
  | null;
