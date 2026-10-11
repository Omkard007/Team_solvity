import type { NyayaAIOutput } from "@/types/type";

export type Level = "simple";

export interface SimplifyResult {
  data?: NyayaAIOutput;
  simplifiedText?: string;
  originalText?: string;
  wordCount?: number;
}

export type SelectedSource =
  | { type: "file"; file: File }
  | { type: "sample" }
  | null;
