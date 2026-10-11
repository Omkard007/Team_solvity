import type { Level, SimplifyResult } from "./types";
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
  short_summary:
    "The Bombay High Court stopped an urgent 48-hour demolition order issued by the Pune Municipal Corporation against the 11th and 12th floors of a residential building. The court found that the municipal authority did not give the builder the mandatory 15-day notice required by state law. The demolition is paused until the next hearing on 15th November 2024, provided the builder deposits ₹25,00,000 security and does not sell or alter the disputed floors.",
  why_this_happened:
    "The Pune Municipal Corporation claimed that Arjun Builders constructed beyond approved building height limits and issued an emergency order to demolish the top two floors within 48 hours. The builder filed an urgent writ petition arguing that the municipal notice gave only 48 hours instead of the legally required 15-day warning, denying them a fair opportunity to show their approved plans.",
  what_happened: [
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
      name: "Arjun Builders & Developers Pvt. Ltd.",
      role: "Petitioner",
      position:
        "Argued that the building conforms to regulations and that giving only 48 hours notice instead of 15 days is illegal and unconstitutional.",
    },
    {
      name: "State of Maharashtra (Urban Development Dept.)",
      role: "Respondent No. 1",
      position:
        "Maintained that municipal authorities have the duty to enforce urban planning bylaws and prevent structural safety risks.",
    },
    {
      name: "Pune Municipal Corporation (PMC)",
      role: "Respondent No. 2 & 3",
      position:
        "Claimed that site inspections showed unauthorized construction exceeding permitted limits by 12.4%.",
    },
  ],
  main_issues: [
    "Did the Municipal Corporation violate Section 53 of the MRTP Act by giving only 48 hours notice instead of the statutory 15 days?",
    "Can a municipal authority demolish residential floors before allowing the owner a chance to apply for regularisation?",
    "Should an interim stay be granted to prevent irreversible damage while the building measurements are verified?",
  ],
  arguments: [
    {
      party: "Petitioner (Arjun Builders)",
      argument:
        "The municipal officer illegally compressed a 15-day legal period into 48 hours. Demolition before a fair inspection would cause irreparable harm to buyers.",
    },
    {
      party: "Respondent (Municipal Corporation)",
      argument:
        "The builder exceeded approved floor space by 12.4%. Immediate action was needed to discourage unauthorized construction in the zone.",
    },
  ],
  legal_references: [
    {
      name: "Maharashtra Regional and Town Planning Act, 1966",
      section_or_citation: "Section 53 & Section 54",
      simple_explanation:
        "The state law governing municipal planning. It requires authorities to give property owners at least 15 days written notice before taking any demolition action.",
      context_in_document:
        "The court held that the 48-hour notice violated this statutory requirement and deprived the petitioner of the right to apply for regularisation.",
    },
    {
      name: "Constitution of India",
      section_or_citation: "Article 226",
      simple_explanation:
        "The constitutional power of High Courts to issue orders and writs protecting citizens when government authorities act unfairly or arbitrarily.",
      context_in_document:
        "Used by the petitioner to invoke High Court protection against unfair administrative action.",
    },
    {
      name: "Principles of Natural Justice",
      section_or_citation: "Audi Alteram Partem (Hear the other side)",
      simple_explanation:
        "A foundational legal rule that no authority can penalize someone without giving them a reasonable notice and opportunity to explain their position.",
      context_in_document:
        "The primary legal reason why the High Court paused the demolition notice.",
    },
  ],
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
    simple_explanation:
      "The High Court temporarily blocked the demolition order. The judges ruled that the government cannot demolish a building without first giving the owner the mandatory 15-day notice to present their side and submit regularisation plans.",
    directions: [
      "The demolition notice dated 28th August 2024 is stayed until 15th November 2024.",
      "A joint site inspection between the Municipal Chief Structural Engineer and the Petitioner's Architect must take place on 10th October 2024 at 11:00 AM.",
      "The Municipal Corporation must submit the joint inspection report to the court by 30th October 2024.",
      "The Petitioner must deposit ₹25,00,000 security in the High Court Registry within 14 days.",
    ],
    conditions: [
      "No further construction or alteration of the structure shall take place until final disposal.",
      "No third-party rights, sales, or leases can be executed for the 11th and 12th floors.",
      "Security deposit of ₹25,00,000 must be deposited within 14 days, failing which the stay will be vacated.",
    ],
  },
  next_steps: [
    {
      action: "Deposit ₹25,00,000 security with High Court Registry",
      responsible_party: "Petitioner (Arjun Builders)",
      deadline_or_date: "02 October 2024 (Within 14 days)",
    },
    {
      action: "Joint site measurement and structural inspection",
      responsible_party: "Both Parties (PMC Engineer & Architect)",
      deadline_or_date: "10 October 2024 at 11:00 AM",
    },
    {
      action: "Submit joint inspection report to High Court",
      responsible_party: "Pune Municipal Corporation",
      deadline_or_date: "30 October 2024",
    },
    {
      action: "Next court hearing for final arguments",
      responsible_party: "All Parties / Advocates",
      deadline_or_date: "15 November 2024",
    },
  ],
  important_details: [
    {
      label: "Security Deposit Required",
      value: "₹25,00,000 (Twenty-Five Lakhs)",
      importance: "Must be deposited within 14 days to keep the demolition protection active.",
    },
    {
      label: "Disputed Floors",
      value: "11th and 12th Floors",
      importance: "No apartments on these floors can be sold or leased during court proceedings.",
    },
    {
      label: "Statutory Notice Defect",
      value: "48-Hour notice instead of 15 days",
      importance: "The core legal error made by the authority that justified court intervention.",
    },
    {
      label: "Next Hearing Date",
      value: "15th November 2024",
      importance: "The date when the court will review the joint inspection and decide the final outcome.",
    },
  ],
  uncertainties: [
    "Whether the developer had submitted fire safety clearances before the initial inspection remains disputed by the municipal engineer.",
    "The exact square footage of the alleged structural deviation will only be clarified after the joint inspection report is submitted on 30th October 2024.",
  ],
  disclaimer: NYAYA_AI_DISCLAIMER,
};

export function getMockResult(level: Level = "simple"): SimplifyResult {
  return {
    data: SAMPLE_NYAYA_AI_OUTPUT,
    simplifiedText: SAMPLE_NYAYA_AI_OUTPUT.short_summary,
    originalText: ORIGINAL_COURT_DOCUMENT,
    wordCount: countWords(SAMPLE_NYAYA_AI_OUTPUT.short_summary),
  };
}
