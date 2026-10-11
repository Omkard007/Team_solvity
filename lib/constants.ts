import type { Level } from "./types";

export const APP_NAME = "Legal Aid";
export const MAX_FILE_SIZE_MB = 20;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const SAMPLE_LABEL = "Sample court order loaded";

export interface LevelOption {
  id: Level;
  label: string;
  description?: string;
}

export const LEVELS: readonly LevelOption[] = [
  { id: "simple", label: "Simple" },
] as const;
