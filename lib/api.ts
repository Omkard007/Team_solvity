import type { Level, SimplifyResult } from "./types";
import { getMockResult } from "./mock";

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
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

  if (useMock) {
    // 1.5 - 2.5s delay
    const delay = 1500 + Math.random() * 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return getMockResult(opts.level);
  }

  const formData = new FormData();
  if (file === "sample") {
    formData.append("sample", "true");
  } else {
    formData.append("file", file);
  }
  formData.append("level", opts.level);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);

  try {
    const res = await fetch("/api/simplify", {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      let errorMsg = `Server returned status ${res.status}`;
      try {
        const errorJson = await res.json();
        if (errorJson && typeof errorJson.message === "string") {
          errorMsg = errorJson.message;
        }
      } catch {
        // use default status error
      }
      throw new ApiError(errorMsg, {
        statusCode: res.status,
        code: "HTTP_ERROR",
      });
    }

    const data = (await res.json()) as SimplifyResult;
    return data;
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof ApiError) {
      throw err;
    }

    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ApiError("The request timed out after 60 seconds. Please try again.", {
        code: "TIMEOUT",
      });
    }

    if (err instanceof TypeError && err.message.toLowerCase().includes("fetch")) {
      throw new ApiError(
        "Network connection error. Please verify your internet connection and try again.",
        { code: "NETWORK_ERROR" }
      );
    }

    const message = err instanceof Error ? err.message : "An unexpected error occurred.";
    throw new ApiError(message, { code: "UNKNOWN" });
  }
}
