import type { Level, SimplifyResult, LegalReport, SimilarCase } from "./types";
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
  actsImposed: [
    {
      actName: "Maharashtra Regional and Town Planning Act, 1966 (MRTP)",
      section: "Section 53(1)",
      imposedBy: "Pune Municipal Corporation (Zone 4 Town Planning Officer)",
      allegationOrClaim:
        "Emergency demolition order issued alleging 12.4% excess FSI deviation beyond sanctioned limits on 11th & 12th floors.",
      potentialPenalty: "Summary demolition within 48 hours without compensation.",
      defenseAngle:
        "Notice unlawfully compressed statutory 15 days to 48 hours, violating Audi Alteram Partem and depriving right of regularisation under Sec 53(3).",
    },
    {
      actName: "Maharashtra Municipal Corporations Act, 1949 (MMC Act)",
      section: "Section 260",
      imposedBy: "Municipal Commissioner",
      allegationOrClaim: "Summary removal of alleged unauthorized structure on ground of safety hazard.",
      potentialPenalty: "Demolition and recovery of structural removal costs from property owner.",
      defenseAngle:
        "No imminent structural hazard established; revised plan under Unified DCPR 2020 pending approval since January 2023 without official rejection.",
    },
  ],
  actsCanImpose: [
    {
      actName: "Constitution of India",
      section: "Article 226 (High Court Writ Jurisdiction)",
      reliefType: "Immediate Interim Stay on Demolition",
      howToInvoke:
        "File an urgent Civil Writ Petition before the High Court challenging the impugned notice as ultra vires and in violation of fundamental rights and principles of natural justice.",
      whyItHelps:
        "High Court will invoke its extraordinary writ power to freeze the demolition order and compel civic authorities to maintain status quo.",
      prerequisites:
        "Must demonstrate absence of the mandatory 15-day statutory notice and show ongoing revised plan application.",
      strength: "High",
    },
    {
      actName: "Maharashtra Regional and Town Planning Act, 1966 (MRTP)",
      section: "Section 53(3) (Statutory Regularisation)",
      reliefType: "Statutory Freeze Pending Regularisation",
      howToInvoke:
        "Submit a formal application for compounding and regularisation with architect's revised drawings under UDCPR Regulations.",
      whyItHelps:
        "Under Section 53(3), submitting a regularisation application automatically stays demolition action until the planning authority officially decides the compounding.",
      prerequisites: "Must apply within the statutory notice period with prescribed compounding fees.",
      strength: "High",
    },
    {
      actName: "Code of Civil Procedure, 1908 (CPC)",
      section: "Order 39 Rules 1 & 2",
      reliefType: "Temporary Injunction & Status Quo Restraint",
      howToInvoke:
        "File an application for temporary injunction in court to restrain municipal officers from creating irreversible structural damage.",
      whyItHelps:
        "Protects property rights and third-party buyer interests while joint structural survey is conducted.",
      prerequisites: "Petitioner must deposit security deposit (e.g., ₹25,00,000) as ordered by the court.",
      strength: "Medium",
    },
    {
      actName: "Right to Fair Administrative Procedure / Natural Justice Doctrine",
      section: "Audi Alteram Partem",
      reliefType: "Order for Joint Site Inspection & Fair Hearing",
      howToInvoke:
        "Cite the Full Bench precedent in Sopan Maruti Thopte v. PMC requiring joint structural measurements before coercive action.",
      whyItHelps:
        "Compels the municipal chief structural engineer and petitioner's architect to jointly verify measurements rather than unilateral civic inspection.",
      prerequisites: "Provide sanctioned architectural drawings and structural audit report.",
      strength: "Strategic",
    },
  ],
  similarCases: [
    {
      id: "case-1",
      title: "Sopan Maruti Thopte & Anr. v. Pune Municipal Corporation",
      court: "High Court of Judicature at Bombay (Full Bench)",
      year: 1996,
      citation: "1996 (1) Mah LJ 473 / AIR 1996 Bom 127",
      similarityScore: 98,
      matchReason:
        "Landmark Full Bench ruling directly binding on Pune Municipal Corporation for Section 53 demolition notices.",
      bench: "Hon'ble Full Bench (3 Judges)",
      keyRuling:
        "The Bombay High Court laid down mandatory guidelines that municipal bodies cannot demolish structures without serving a minimum 15-day show-cause notice and must give another 15 days window to appeal before initiating demolition.",
      howItHelpsYou:
        "Directly strikes down the 48-hour PMC notice as illegal and contrary to binding Full Bench guidelines. Cite Paragraph 8 to obtain an immediate stay.",
      outcome: "favorable",
      relevantActs: ["Section 53 MRTP Act", "Section 260 MMC Act"],
      url: "https://indiankanoon.org/doc/1449832/",
    },
    {
      id: "case-2",
      title: "Municipal Corporation of Greater Mumbai v. Sunbeam High Tech Developers Pvt. Ltd.",
      court: "Supreme Court of India",
      year: 2019,
      citation: "(2019) 20 SCC 641",
      similarityScore: 94,
      matchReason:
        "Demolition executed with undue haste without verifying sanctioned regularisation applications.",
      bench: "Hon'ble Supreme Court of India",
      keyRuling:
        "The Supreme Court held that authorities must not act precipitously. If civic officers execute demolition without giving fair statutory opportunity, the officers can be held personally accountable for compensatory damages.",
      howItHelpsYou:
        "Places strong legal deterrence against civic officers, forcing them to participate in joint measurements before taking any physical steps.",
      outcome: "favorable",
      relevantActs: ["Article 226 Constitution", "Section 53 MRTP Act"],
      url: "https://indiankanoon.org/doc/8123945/",
    },
    {
      id: "case-3",
      title: "Makarand Deshpande v. State of Maharashtra & Pune Municipal Corp.",
      court: "High Court of Judicature at Bombay",
      year: 2021,
      citation: "2021 SCC OnLine Bom 3120",
      similarityScore: 89,
      matchReason:
        "Disputed FSI deviations where revised plans under UDCPR 2020 were pending municipal scrutiny.",
      bench: "Hon'ble Bombay High Court",
      keyRuling:
        "Where an owner has submitted revised building plans under UDCPR, municipal authorities must formally dispose of the compounding representation before issuing coercive demolition notices.",
      howItHelpsYou:
        "Protects the 11th & 12th floors while the January 2023 revised sanctioned plan is processed by the Town Planning Department.",
      outcome: "favorable",
      relevantActs: ["UDCPR Regulations", "Section 53(3) MRTP Act"],
      url: "https://indiankanoon.org/doc/1638201/",
    },
  ],
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
    actsImposed: SAMPLE_LEGAL_REPORT.actsImposed,
    actsCanImpose: SAMPLE_LEGAL_REPORT.actsCanImpose,
    similarCases: SAMPLE_LEGAL_REPORT.similarCases,
  };
}

export const INDIAN_PRECEDENT_DATABASE: SimilarCase[] = [
  ...SAMPLE_LEGAL_REPORT.similarCases!,
  {
    id: "case-4",
    title: "Dashrath Rupsingh Rathod v. State of Maharashtra & Anr.",
    court: "Supreme Court of India",
    year: 2014,
    citation: "(2014) 9 SCC 129",
    similarityScore: 95,
    matchReason: "Jurisdiction of court in Cheque Dishonour complaints under Section 138 Negotiable Instruments Act.",
    bench: "Hon'ble Supreme Court (3-Judge Bench)",
    keyRuling: "The Supreme Court clarified where a cheque bounce complaint must be instituted, preventing harassment of accused in distant remote jurisdictions.",
    howItHelpsYou: "Can be used to seek transfer or dismissal of Section 138 complaints filed in improper territorial courts.",
    outcome: "favorable",
    relevantActs: ["Section 138 Negotiable Instruments Act", "Section 142 NI Act"],
    url: "https://indiankanoon.org/doc/157293810/",
  },
  {
    id: "case-5",
    title: "Rohitbhai Jivanlal Patel v. State of Gujarat",
    court: "Supreme Court of India",
    year: 2019,
    citation: "(2019) 18 SCC 106",
    similarityScore: 91,
    matchReason: "Rebuttal of statutory presumption under Section 139 of the Negotiable Instruments Act.",
    bench: "Hon'ble Supreme Court of India",
    keyRuling: "The court held that once execution of cheque is admitted, the accused must raise a probable defense based on preponderance of probabilities rather than proof beyond reasonable doubt.",
    howItHelpsYou: "Provides standard of proof needed to discharge burden without stepping into witness box.",
    outcome: "favorable",
    relevantActs: ["Section 139 NI Act", "Evidence Act 1872"],
    url: "https://indiankanoon.org/doc/1388902/",
  },
  {
    id: "case-6",
    title: "Arnesh Kumar v. State of Bihar & Anr.",
    court: "Supreme Court of India",
    year: 2014,
    citation: "(2014) 8 SCC 273",
    similarityScore: 96,
    matchReason: "Mandatory guidelines preventing routine or mechanical arrest in offenses punishable up to 7 years.",
    bench: "Hon'ble Supreme Court of India",
    keyRuling: "Police officers cannot arrest accused automatically without satisfying Section 41 CrPC checklist. Mandatory notice under Section 41A must be served first.",
    howItHelpsYou: "Protects against sudden arbitrary police arrest. If police violate Arnesh Kumar directions, officers face contempt of court and departmental action.",
    outcome: "favorable",
    relevantActs: ["Section 41 & 41A CrPC", "Section 498A IPC", "Article 21 Constitution"],
    url: "https://indiankanoon.org/doc/298262/",
  },
  {
    id: "case-7",
    title: "Satender Kumar Antil v. Central Bureau of Investigation",
    court: "Supreme Court of India",
    year: 2022,
    citation: "(2022) 10 SCC 51",
    similarityScore: 94,
    matchReason: "Categorization of offenses and strict guidelines for grant of anticipatory and regular bail.",
    bench: "Hon'ble Supreme Court of India",
    keyRuling: "Bail applications must strictly be decided within 2 weeks. Economic and minor offenses should not lead to custodial detention when accused cooperated with summons.",
    howItHelpsYou: "Precedent to secure prompt bail without jail detention upon appearance before magistrate.",
    outcome: "favorable",
    relevantActs: ["Section 437 & 439 CrPC", "Article 21 Constitution"],
    url: "https://indiankanoon.org/doc/1712542/",
  },
  {
    id: "case-8",
    title: "Pioneer Urban Land & Infrastructure Ltd. v. Govindan Raghavan",
    court: "Supreme Court of India",
    year: 2019,
    citation: "(2019) 5 SCC 725",
    similarityScore: 96,
    matchReason: "One-sided flat buyer builder agreements and unreasonable delay in possession.",
    bench: "Hon'ble Supreme Court of India",
    keyRuling: "A homebuyer cannot be compelled to wait indefinitely for possession. One-sided clauses in builder contracts constitute Unfair Trade Practice, entitling full refund with interest.",
    howItHelpsYou: "Entitles buyer to demand immediate 100% refund with 9-12% interest and compensation against defaulting developers under RERA and Consumer Protection Act.",
    outcome: "favorable",
    relevantActs: ["Consumer Protection Act 2019", "RERA Act 2016 Section 18"],
    url: "https://indiankanoon.org/doc/1827491/",
  },
  {
    id: "case-9",
    title: "Rame Gowda (D) by LRs. v. M. Varadappa Naidu",
    court: "Supreme Court of India",
    year: 2004,
    citation: "(2004) 1 SCC 769",
    similarityScore: 92,
    matchReason: "Settled possession of property and protection against forcible dispossession without due course of law.",
    bench: "Hon'ble Supreme Court of India",
    keyRuling: "Even a trespasser or disputed occupant in settled possession cannot be thrown out by force without following due process of law. True owner must file suit rather than self-help.",
    howItHelpsYou: "Enables immediate injunction against landlords, civic bodies, or private persons trying to dispossess you without a court order.",
    outcome: "favorable",
    relevantActs: ["Specific Relief Act Section 6", "Order 39 CPC"],
    url: "https://indiankanoon.org/doc/1029481/",
  },
  {
    id: "case-10",
    title: "Rajnesh v. Neha & Anr.",
    court: "Supreme Court of India",
    year: 2020,
    citation: "(2021) 2 SCC 324",
    similarityScore: 93,
    matchReason: "Uniform guidelines for overlapping maintenance claims and mandatory Affidavit of Assets & Liabilities.",
    bench: "Hon'ble Supreme Court of India",
    keyRuling: "Both spouses must submit standardized financial disclosure affidavits. Maintenance awards in overlapping proceedings must be adjusted against each other to avoid double payment.",
    howItHelpsYou: "Prevents unfair inflated maintenance claims by requiring audited financial asset disclosures from the opposing party.",
    outcome: "favorable",
    relevantActs: ["Section 125 CrPC", "Domestic Violence Act Section 12", "HMA Section 24"],
    url: "https://indiankanoon.org/doc/1928471/",
  },
];

export function searchPrecedentDatabase(query: string, courtFilter?: string, yearFrom?: number): SimilarCase[] {
  const cleanQ = query.toLowerCase().trim();
  if (!cleanQ) {
    return INDIAN_PRECEDENT_DATABASE;
  }

  const terms = cleanQ.split(/\s+/).filter((t) => t.length > 2);

  return INDIAN_PRECEDENT_DATABASE.filter((c) => {
    if (courtFilter && courtFilter !== "All Courts" && !c.court.toLowerCase().includes(courtFilter.toLowerCase())) {
      return false;
    }
    if (yearFrom && c.year < yearFrom) {
      return false;
    }

    const searchableText = `${c.title} ${c.matchReason} ${c.keyRuling} ${c.howItHelpsYou} ${c.relevantActs.join(" ")}`.toLowerCase();
    return terms.some((term) => searchableText.includes(term));
  }).sort((a, b) => b.similarityScore - a.similarityScore);
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
