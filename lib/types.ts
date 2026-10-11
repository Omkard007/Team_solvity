import type { NyayaAIOutput } from "@/types/type";

export type Level = "simple";

export type OutcomeTone = "green" | "amber" | "red" | "neutral";

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
