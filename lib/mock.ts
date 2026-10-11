import type { Level, SimplifyResult } from "./types";
import { countWords } from "./utils";

const ORIGINAL_COURT_DOCUMENT = `IN THE HIGH COURT OF APPEAL
BEFORE: THE HONOURABLE JUSTICE STERLING
BETWEEN:
Sample Appellant
- and -
State Regulatory Authority

JUDGMENT AND ORDER

1. The Appellant petitions for an interlocutory order seeking injunctive relief against the enforcement of administrative directive No. 2024-B pursuant to Section 44 of the Municipal Administrative Procedure Act. The court has considered the averments set forth in the affidavit in support, together with the preliminary objection filed by the respondent asserting lack of justiciable controversy.

2. Having examined the statutory provisions and the record herein, the court concludes that the prerequisite showing of irreparable harm has not been satisfied on the balance of probabilities. The impugned administrative sanction remains subject to administrative review, and interlocutory intervention by this forum would undermine the statutory dispute resolution mechanism established by the legislature.

3. ACCORDINGLY, IT IS HEREBY ORDERED that the Appellant's motion for interlocutory relief is DENIED in its entirety. Costs in the cause.`;

const SIMPLIFIED_TEXT_BY_LEVEL: Record<Level, string> = {
  simple: `This is a court ruling in the dispute between Sample Appellant and the State Regulatory Authority.

The court rejected the Appellant's emergency request to immediately block a government regulation. The judge found that the Appellant did not provide enough evidence showing that serious, permanent damage would happen before the regular review process finished.

Therefore, the government rule stays in place for now, and the standard appeal process will proceed through normal administrative channels.`,
};

export function getMockResult(level: Level): SimplifyResult {
  const simplifiedText = SIMPLIFIED_TEXT_BY_LEVEL[level];
  return {
    simplifiedText,
    originalText: ORIGINAL_COURT_DOCUMENT,
    wordCount: countWords(simplifiedText),
  };
}
