import type { Level, SimplifyResult, LegalReport } from "./types";
import type { NyayaAIOutput } from "@/types/type";
import { NYAYA_AI_DISCLAIMER } from "@/types/type";
import { countWords } from "./utils";

export const ORIGINAL_COURT_DOCUMENT = `IN THE HIGH COURT OF JUDICATURE AT BOMBAY
APPELLATE SIDE, CIVIL JURISDICTION
WRIT PETITION (ST.) NO. 4821 OF 2024

IN THE MATTER OF:
Arjun Builders & Developers Pvt. Ltd.
through its Managing Director, Arjun Deshmukh
Office at: Senapati Bapat Marg, Pune - 411016
... Petitioner

VERSUS

1. State of Maharashtra,
   Through Department of Urban Development, Mantralaya, Mumbai.
2. Pune Municipal Corporation,
   Through Municipal Commissioner, Shivajinagar, Pune.
3. Assistant Town Planning Officer, Zone 4, PMC.
... Respondents

CORAM: HON'BLE MR. JUSTICE RAMESHWAR RAO &
       HON'BLE SMT. JUSTICE SUNITA KULKARNI, JJ.
DATE OF ORDER: 18TH SEPTEMBER, 2024

ORAL ORDER (PER RAMESHWAR RAO, J.):

1. Rule. Rule made returnable forthwith with consent of learned counsel appearing for respective parties.

2. The Petitioner company challenges the Impugned Demolition Notice dated 28th August 2024 bearing Reference No. PMC/TP/2024/774 issued by Respondent No. 3 under Section 53(1) of the Maharashtra Regional and Town Planning Act, 1966 (MRTP Act), directing demolition of the 11th and 12th floors of the residential project "Skyline Crest" situated at Survey No. 42, Hissa No. 3, Baner, Pune within 48 hours.

3. Learned Senior Counsel appearing for Petitioner submits that the construction strictly aligns with the revised sanctioned plan submitted on 12th January 2023 under the Unified Development Control and Promotion Regulations (UDCPR). It is vehemently contended that the statutory period of 15 days mandated under Section 53 was arbitrarily shortened to 48 hours, thereby violating the cardinal principles of natural justice and audi alteram partem.

4. Learned Counsel appearing for Respondent Nos. 2 and 3 submits that the site inspection revealed structural deviations exceeding permissible FSI norms by 12.4%, endangering structural safety.

5. Having heard learned counsel and perused the affidavits, we find prima facie substance in the contention that the statutory 15-day notice contemplated under Section 53 of the MRTP Act was denied to the Petitioner. Summary demolition without adequate opportunity would render the remedy of regularisation under Section 53(3) nugatory.

6. ACCORDINGLY, WE PASS THE FOLLOWING ORDER:
(i) Demolition Notice dated 28th August 2024 is hereby STAYED until the next date of hearing (15th November 2024);
(ii) A joint site inspection by the PMC Chief Structural Engineer and Petitioner's Architect shall be conducted on 10th October 2024 at 11:00 AM;
(iii) Respondent No. 2 shall submit the joint inspection report to this Court on or before 30th October 2024;
(iv) The Petitioner shall deposit an amount of Rs. 25,00,000/- (Rupees Twenty Five Lakhs Only) with the Registrar of this Court within two weeks as security;
(v) The Petitioner shall maintain strict status quo and shall neither carry out further construction nor create third-party rights over the 11th and 12th floors pending disposal of this petition.
7. Stand over to 15th November 2024.`;

export const SAMPLE_LEGAL_REPORT: LegalReport = {
  title: "Legal Document Analysis",
  outcomeBadge: {
    label: "Interim Stay Granted",
    description: "The court temporarily paused the demolition order until the next hearing.",
    tone: "green",
  },
  plainRuling:
    "The High Court paused the demolition order until 15th November 2024. The judges ruled that the government authority cannot demolish a building without first giving the owner a mandatory 15-day notice to explain their side. The builder must deposit ₹25,00,000 security in the registry and maintain status quo.",
  directions: [
    "Demolition Notice dated 28th August 2024 is stayed until 15th November 2024.",
    "Municipal Authority directed to conduct a joint survey with the Petitioner's structural engineer on 10th October 2024 at 11:00 AM.",
    "Municipal Corporation must submit the joint inspection report by 30th October 2024.",
    "Petitioner to deposit ₹25,00,000 as bank security in the High Court Registry within 14 days.",
  ],
  conditions: [
    "No further construction or alteration of the structure shall take place pending final disposal.",
    "No third-party rights or sale deeds to be executed for the disputed 11th and 12th floors.",
    "Security deposit of ₹25,00,000 must be deposited within 14 days, failing which the stay will be vacated.",
  ],
  identification: {
    caseTitle: "Arjun Builders & Developers Pvt. Ltd. v. State of Maharashtra & Ors.",
    court: "High Court of Judicature at Bombay (Civil Appellate Jurisdiction)",
    caseNumber: "Writ Petition (St.) No. 4821 of 2024",
    date: "18th September 2024",
    bench: "Hon'ble Mr. Justice Rameshwar Rao & Hon'ble Smt. Justice Sunita Kulkarni",
    documentType: "Judgment & Interim Order",
    language: "English",
  },
  executiveSummary:
    "The Bombay High Court stopped an urgent 48-hour demolition order issued by the Pune Municipal Corporation against the 11th and 12th floors of a residential building. The court found that the municipal authority did not give the builder the mandatory 15-day notice required by state law. The demolition is paused until the next hearing on 15th November 2024, provided the builder deposits ₹25,00,000 security and does not sell or alter the disputed floors.",
  background: {
    why: "The Pune Municipal Corporation claimed that Arjun Builders constructed beyond approved building height limits and issued an emergency order to demolish the top two floors within 48 hours. The builder filed an urgent writ petition arguing that the municipal notice gave only 48 hours instead of the legally required 15-day warning, denying them a fair opportunity to show their approved plans.",
    issues: [
      "Did the Municipal Corporation violate Section 53 of the MRTP Act by giving only 48 hours notice instead of the statutory 15 days?",
      "Can a municipal authority demolish residential floors before allowing the owner a chance to apply for regularisation?",
      "Should an interim stay be granted to prevent irreversible damage while the building measurements are verified?",
    ],
  },
  nextSteps: [
    {
      date: "02 October 2024",
      dateNote: "Within 14 days",
      action: "Deposit ₹25,00,000 security with High Court Registry",
      responsibleParty: "Petitioner (Arjun Builders)",
    },
    {
      date: "10 October 2024",
      dateNote: "11:00 AM",
      action: "Attend joint site measurement and structural inspection",
      responsibleParty: "Both Parties (PMC Engineer & Architect)",
    },
    {
      date: "30 October 2024",
      action: "Submit joint inspection report to High Court",
      responsibleParty: "Pune Municipal Corporation",
    },
    {
      date: "15 November 2024",
      action: "Next court hearing for final arguments",
      responsibleParty: "All Parties / Advocates",
    },
  ],
  facts: [
    {
      label: "Security Deposit Required",
      value: "₹25,00,000",
      whyItMatters: "Must be deposited within 14 days to keep the demolition stay active.",
    },
    {
      label: "Disputed Property",
      value: "11th & 12th Floors",
      whyItMatters: "Developer cannot sell or transfer apartments on these floors during trial.",
    },
    {
      label: "Statutory Notice Defect",
      value: "48 Hours vs 15 Days",
      whyItMatters: "The core procedural violation by the municipal corporation.",
    },
    {
      label: "Next Hearing Date",
      value: "15th November 2024",
      whyItMatters: "Final determination of building plan validity and regularisation.",
    },
  ],
  timeline: [
    {
      date: "12 Jan 2023",
      event: "Petitioner submitted revised building plans under Unified Development Control Regulations (UDCPR) for the residential tower in Baner, Pune.",
    },
    {
      date: "28 Aug 2024",
      event: "Municipal Planning Officer issued an urgent demolition notice giving only 48 hours to demolish the 11th and 12th floors.",
    },
    {
      date: "02 Sep 2024",
      event: "Developer filed an urgent writ petition in the Bombay High Court arguing violation of natural justice.",
    },
    {
      date: "18 Sep 2024",
      event: "High Court heard both sides and issued an interim stay halting the demolition subject to conditions.",
    },
  ],
  parties: [
    {
      role: "Petitioner",
      name: "Arjun Builders & Developers Pvt. Ltd.",
      argument:
        "The municipal officer illegally compressed a 15-day legal period into 48 hours. Demolition before a fair inspection would cause irreparable harm to buyers.",
    },
    {
      role: "Respondent No. 1",
      name: "State of Maharashtra (Urban Development Dept.)",
      argument:
        "Maintained that municipal authorities possess statutory duty to enforce zoning bylaws and prevent structural safety risks.",
    },
    {
      role: "Respondent No. 2 & 3",
      name: "Pune Municipal Corporation (PMC)",
      argument:
        "Claimed that site inspections showed unauthorized construction exceeding permitted limits by 12.4%. Immediate action was needed.",
    },
  ],
  laws: [
    {
      citation: "Section 53 & 54",
      source: "Maharashtra Regional and Town Planning Act, 1966",
      plainMeaning:
        "The state law governing municipal planning. It requires authorities to give property owners at least 15 days written notice before taking any demolition action.",
      contextInDocument:
        "The court held that the 48-hour notice violated this statutory requirement and deprived the petitioner of the right to apply for regularisation.",
    },
    {
      citation: "Article 226",
      source: "Constitution of India",
      plainMeaning:
        "The constitutional power of High Courts to issue orders and writs protecting citizens when government authorities act unfairly or arbitrarily.",
      contextInDocument:
        "Used by the petitioner to invoke High Court protection against unfair administrative action.",
    },
    {
      citation: "Audi Alteram Partem",
      source: "Principles of Natural Justice",
      plainMeaning:
        "A foundational legal rule that no authority can penalize someone without giving them reasonable notice and opportunity to explain their position.",
      contextInDocument:
        "The primary legal reason why the High Court paused the demolition notice.",
    },
  ],
  originalText: ORIGINAL_COURT_DOCUMENT,
  isSample: true,
};

export const SAMPLE_NYAYA_AI_OUTPUT: NyayaAIOutput = {
  schema_version: "1.0",
  document_info: {
    document_type: "High Court Judgment & Interim Order",
    court_or_authority: "High Court of Judicature at Bombay (Civil Appellate Jurisdiction)",
    case_number: "Writ Petition (St.) No. 4821 of 2024",
    case_title: "Arjun Builders & Developers Pvt. Ltd. v. State of Maharashtra & Ors.",
    document_date: "18th September 2024",
    judge_or_officer: "Hon'ble Mr. Justice Rameshwar Rao & Hon'ble Smt. Justice Sunita Kulkarni",
    language: "English",
  },
  short_summary: SAMPLE_LEGAL_REPORT.executiveSummary,
  why_this_happened: SAMPLE_LEGAL_REPORT.background.why,
  what_happened: SAMPLE_LEGAL_REPORT.timeline,
  parties: [
    {
      name: "Arjun Builders & Developers Pvt. Ltd.",
      role: "Petitioner",
      position: SAMPLE_LEGAL_REPORT.parties[0].argument || "",
    },
    {
      name: "State of Maharashtra (Urban Development Dept.)",
      role: "Respondent No. 1",
      position: SAMPLE_LEGAL_REPORT.parties[1].argument || "",
    },
    {
      name: "Pune Municipal Corporation (PMC)",
      role: "Respondent No. 2 & 3",
      position: SAMPLE_LEGAL_REPORT.parties[2].argument || "",
    },
  ],
  main_issues: SAMPLE_LEGAL_REPORT.background.issues,
  arguments: SAMPLE_LEGAL_REPORT.parties.map((p) => ({
    party: `${p.role} (${p.name})`,
    argument: p.argument || "",
  })),
  legal_references: SAMPLE_LEGAL_REPORT.laws.map((l) => ({
    name: l.source,
    section_or_citation: l.citation,
    simple_explanation: l.plainMeaning,
    context_in_document: l.contextInDocument,
  })),
  legal_links: [
    {
      title: "Maharashtra Regional and Town Planning Act (MRTP), 1966",
      url: "https://indiacode.nic.in/handle/123456789/2296",
      type: "act",
      description: "Official text of the MRTP Act governing building permissions and municipal demolition powers.",
      source_name: "India Code (Legislative Department)",
      section_or_citation: "Section 53",
    },
    {
      title: "Constitution of India — Article 226 (Writ Jurisdiction)",
      url: "https://indiankanoon.org/doc/1712542/",
      type: "section",
      description: "High Court powers to issue directions and writs against public authorities.",
      source_name: "Indian Kanoon",
      section_or_citation: "Article 226",
    },
    {
      title: "Bombay High Court Official Order Portal",
      url: "https://bombayhighcourt.nic.in",
      type: "official_source",
      description: "Official repository of High Court cause lists, case status, and signed orders.",
      source_name: "High Court of Bombay",
      section_or_citation: "WP/4821/2024",
    },
  ],
  decision_or_result: {
    status: "interim_order",
    simple_explanation: SAMPLE_LEGAL_REPORT.plainRuling,
    directions: SAMPLE_LEGAL_REPORT.directions,
    conditions: SAMPLE_LEGAL_REPORT.conditions,
  },
  next_steps: SAMPLE_LEGAL_REPORT.nextSteps.map((s) => ({
    action: s.action,
    responsible_party: s.responsibleParty,
    deadline_or_date: s.date,
  })),
  important_details: SAMPLE_LEGAL_REPORT.facts.map((f) => ({
    label: f.label,
    value: f.value,
    importance: f.whyItMatters,
  })),
  uncertainties: [
    "Whether the developer had submitted fire safety clearances before the initial inspection remains disputed by the municipal engineer.",
    "The exact square footage of the alleged structural deviation will only be clarified after the joint inspection report is submitted on 30th October 2024.",
  ],
  disclaimer: NYAYA_AI_DISCLAIMER,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapNyayaToLegalReport(data: any, originalText?: string): LegalReport {
  if (data?.plainRuling && data?.identification) {
    return data as LegalReport;
  }

  const toneMap: Record<string, "green" | "amber" | "red" | "neutral"> = {
    decided: "green",
    interim_order: "green",
    partially_decided: "amber",
    application_pending: "amber",
    unclear: "neutral",
    no_decision_found: "neutral",
  };

  const status = data?.decision_or_result?.status || "interim_order";

  return {
    title: "Legal Document Analysis",
    outcomeBadge: {
      label: status === "interim_order" ? "Interim Stay Granted" : (status === "decided" ? "Final Ruling Rendered" : "Order Issued"),
      description: data?.decision_or_result?.simple_explanation || "The court has passed directions on the application.",
      tone: toneMap[status] || "green",
    },
    plainRuling: data?.decision_or_result?.simple_explanation || data?.short_summary || "",
    directions: data?.decision_or_result?.directions || [],
    conditions: data?.decision_or_result?.conditions || [],
    identification: {
      caseTitle: data?.document_info?.case_title || "Court Document",
      court: data?.document_info?.court_or_authority || "Court of Law",
      caseNumber: data?.document_info?.case_number || "N/A",
      date: data?.document_info?.document_date || "N/A",
      bench: data?.document_info?.judge_or_officer || "Bench of the Court",
      documentType: data?.document_info?.document_type || "Court Order",
      language: data?.document_info?.language || "English",
    },
    executiveSummary: data?.short_summary || "",
    background: {
      why: data?.why_this_happened || "",
      issues: data?.main_issues || [],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nextSteps: (data?.next_steps || []).map((s: any) => ({
      date: s.deadline_or_date || "Upcoming",
      action: s.action || "",
      responsibleParty: s.responsible_party || "Parties",
    })),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    facts: (data?.important_details || []).map((d: any) => ({
      label: d.label || "Key Detail",
      value: d.value || "",
      whyItMatters: d.importance || "",
    })),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    timeline: (data?.what_happened || []).map((t: any) => ({
      date: t.date || "Date Unspecified",
      event: t.event || "",
    })),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parties: (data?.parties || []).map((p: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const matchingArg = (data?.arguments || []).find((a: any) =>
        a.party?.toLowerCase().includes(p.name?.toLowerCase()) ||
        a.party?.toLowerCase().includes(p.role?.toLowerCase())
      );
      return {
        role: p.role || "Party",
        name: p.name || "",
        argument: matchingArg?.argument || p.position || "",
      };
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    laws: (data?.legal_references || []).map((r: any) => ({
      citation: r.section_or_citation || "Statute",
      source: r.name || "Legal Reference",
      plainMeaning: r.simple_explanation || "",
      contextInDocument: r.context_in_document || "",
    })),
    originalText: originalText || ORIGINAL_COURT_DOCUMENT,
    isSample: Boolean(data?.isSample),
  };
}

export function getMockResult(level: Level = "simple"): SimplifyResult {
  return {
    report: SAMPLE_LEGAL_REPORT,
    data: SAMPLE_NYAYA_AI_OUTPUT,
    simplifiedText: SAMPLE_LEGAL_REPORT.executiveSummary,
    originalText: ORIGINAL_COURT_DOCUMENT,
    wordCount: countWords(SAMPLE_LEGAL_REPORT.executiveSummary),
  };
}
