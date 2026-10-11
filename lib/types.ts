export type Level = "simple";

export interface SimplifyResult {
  simplifiedText: string; // paragraphs separated by \n\n
  originalText?: string; // extracted text from the PDF
  wordCount?: number;
}

export type SelectedSource =
  | { type: "file"; file: File }
  | { type: "sample" }
  | null;
