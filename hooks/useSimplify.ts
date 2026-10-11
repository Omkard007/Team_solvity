"use client";

import { useState, useCallback } from "react";
import type { Level, SimplifyResult } from "@/lib/types";
import { simplifyDocument, ApiError } from "@/lib/api";

export function useSimplify() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SimplifyResult | null>(null);

  const simplify = useCallback(
    async (file: File | "sample", level: Level): Promise<SimplifyResult | null> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await simplifyDocument(file, { level });
        setResult(response);
        return response;
      } catch (err: unknown) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An error occurred while simplifying the document.");
        }
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    result,
    simplify,
    resetError,
    clearResult,
  };
}
