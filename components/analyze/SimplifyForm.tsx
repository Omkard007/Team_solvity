"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { FileUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { StepCard } from "./StepCard";
import { FileField } from "./FileField";
import { ResultCard } from "./ResultCard";
import { ProcessingStepper } from "@/components/report";
import GoogleTranslate from "@/components/GoogleTranslate";
import { useSimplify } from "@/hooks/useSimplify";
import type { Level, SelectedSource } from "@/lib/types";

export function SimplifyForm() {
  const [selectedSource, setSelectedSource] = useState<SelectedSource>(null);
  const level: Level = "simple";
  const [fileError, setFileError] = useState<string | null>(null);

  const { isLoading, error, result, simplify, resetError, clearResult } = useSimplify();
  const resultRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedSource) return;

    const source = selectedSource.type === "file" ? selectedSource.file : "sample";
    await simplify(source, level);
  };

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const canSubmit = Boolean(selectedSource) && !isLoading;

  // Processing state with live stepper
  if (isLoading) {
    return (
      <div className="animate-in fade-in-50 duration-300 py-4">
        <ProcessingStepper />
      </div>
    );
  }

  // Once a result is generated, transition seamlessly to the full Legal Dashboard
  if (result) {
    return (
      <div ref={resultRef} className="relative animate-in fade-in-50 duration-300">
        <GoogleTranslate className="absolute -top-14 sm:-top-16 right-0 z-30" />
        <ResultCard
          result={result}
          isLoading={false}
          level={level}
          onReset={() => {
            clearResult();
            setSelectedSource(null);
          }}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <StepCard
        icon={<FileUp className="h-4 w-4" />}
        title="Upload Legal Document PDF"
        subtitle="Upload a Legal judgment or order up to 20 MB, or load a sample"
      >
        <FileField
          selectedSource={selectedSource}
          onSelectFile={(file) => setSelectedSource({ type: "file", file })}
          onSelectSample={() => setSelectedSource({ type: "sample" })}
          onClear={() => setSelectedSource(null)}
          error={fileError}
          onErrorChange={setFileError}
        />
      </StepCard>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={!canSubmit}
        isLoading={isLoading}
        className="w-full text-base font-bold shadow-sm"
      >
        {isLoading ? (
          "Simplifying Document…"
        ) : (
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Simplify Document
          </span>
        )}
      </Button>

      {error && (
        <Alert
          title="Simplification Failed"
          message={error}
          onRetry={() => {
            resetError();
            if (selectedSource) {
              const src = selectedSource.type === "file" ? selectedSource.file : "sample";
              simplify(src, level);
            }
          }}
        />
      )}

      {isLoading && (
        <div ref={resultRef} className="pt-2 animate-in fade-in-50 duration-300">
          <ResultCard result={null} isLoading={true} level={level} />
        </div>
      )}
    </form>
  );
}
