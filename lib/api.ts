import type { Level, SimplifyResult } from "./types";
import type { NyayaAIOutput } from "@/types/type";
import { getMockResult, mapNyayaToLegalReport } from "./mock";
import { countWords } from "./utils";

export class ApiError extends Error {
  statusCode?: number;
  code?: "TIMEOUT" | "NETWORK_ERROR" | "HTTP_ERROR" | "UNKNOWN";

  constructor(
    message: string,
    options?: { statusCode?: number; code?: "TIMEOUT" | "NETWORK_ERROR" | "HTTP_ERROR" | "UNKNOWN" }
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = options?.statusCode;
    this.code = options?.code;
  }
}

export async function simplifyDocument(
  file: File | "sample",
  opts: { level: Level }
): Promise<SimplifyResult> {
  // If sample is requested, return the rich mock result
  if (file === "sample") {
    const delay = 1200 + Math.random() * 600;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return getMockResult(opts.level);
  }

  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";
  if (useMock) {
    const delay = 1500 + Math.random() * 800;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return getMockResult(opts.level);
  }

  const formData = new FormData();
  formData.append("file", file);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 90000);

  try {
    const res = await fetch("/api/process", {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      let errorMsg = `Server returned status ${res.status}`;
      try {
        const errorJson = await res.json();
        if (errorJson && typeof errorJson.error === "string") {
          errorMsg = errorJson.error;
        } else if (errorJson && typeof errorJson.message === "string") {
          errorMsg = errorJson.message;
        }
      } catch {
        // use default error message
      }
      throw new ApiError(errorMsg, {
        statusCode: res.status,
        code: "HTTP_ERROR",
      });
    }

    const json = await res.json();
    const data = (json.data || json) as NyayaAIOutput;
    const report = mapNyayaToLegalReport(data);

    return {
      report,
      data,
      simplifiedText: report.executiveSummary,
      wordCount: countWords(report.executiveSummary),
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof ApiError) {
      throw err;
    }

    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ApiError("The request timed out after 90 seconds. Please try again with a smaller document.", {
        code: "TIMEOUT",
      });
    }

    if (err instanceof TypeError && err.message.toLowerCase().includes("fetch")) {
      // In local dev without backend GEMINI key, fall back gracefully to sample output so user can test UI
      console.warn("Backend fetch failed, falling back to rich sample output", err);
      return getMockResult(opts.level);
    }

    const message = err instanceof Error ? err.message : "An unexpected error occurred.";
    throw new ApiError(message, { code: "UNKNOWN" });
  }
}
