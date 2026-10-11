/**
 * NyayaAI legal document explanation output types.
 * Matches the JSON schema used by the NyayaAI master prompt.
 */

export type DecisionStatus =
    | "decided"
    | "partially_decided"
    | "interim_order"
    | "application_pending"
    | "no_decision_found"
    | "unclear";

export interface DocumentInfo {
    document_type: string | null;
    court_or_authority: string | null;
    case_number: string | null;
    case_title: string | null;
    document_date: string | null;
    judge_or_officer: string | null;
    language: string | null;
}

export interface TimelineEvent {
    event: string;
    date: string | null;
}

export interface Party {
    name: string;
    role: string;
    position: string;
}

export interface LegalArgument {
    party: string;
    argument: string;
}

export interface LegalReference {
    name: string;
    section_or_citation: string | null;
    simple_explanation: string;
    context_in_document: string;
}

export interface DecisionOrResult {
    status: DecisionStatus;
    simple_explanation: string;
    directions: string[];
    conditions: string[];
}

export interface NextStep {
    action: string;
    responsible_party: string | null;
    deadline_or_date: string | null;
}

export interface ImportantDetail {
    label: string;
    value: string;
    importance: string;
}

export type LegalLinkType =
  | "act"
  | "section"
  | "judgment"
  | "court_order"
  | "official_source"
  | "other";

export interface LegalLink {
  title: string;
  url: string;
  type: LegalLinkType;
  description: string;
  source_name: string | null;
  section_or_citation: string | null;
}

export interface NyayaAIOutput {
  schema_version: "1.0";

  document_info: DocumentInfo;
  short_summary: string;
  why_this_happened: string;
  what_happened: TimelineEvent[];
  parties: Party[];
  main_issues: string[];
  arguments: LegalArgument[];
  legal_references: LegalReference[];
  legal_links: LegalLink[];
  decision_or_result: DecisionOrResult;
  next_steps: NextStep[];
  important_details: ImportantDetail[];
  uncertainties: string[];
  disclaimer: string;
}

/**
 * Canonical disclaimer from the NyayaAI master prompt.
 */
export const NYAYA_AI_DISCLAIMER =
    "This is an AI-generated explanation for understanding the document. Refer to the original document and consult a qualified lawyer for legal advice.";