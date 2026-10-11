"use client";

import { FileText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/analyze/CopyButton";
import { DownloadButton } from "@/components/analyze/DownloadButton";
import { countWords } from "@/lib/utils";
import { cn } from "@/lib/utils";

export interface OriginalTextCardProps {
  originalText?: string;
  className?: string;
}

export function OriginalTextCard({ originalText, className }: OriginalTextCardProps) {
  const text = originalText || "Original court document text is not available.";
  const wordCount = countWords(text);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E6E8E7] bg-[#FAFAFA] px-6 py-4">
        <div className="flex items-center gap-3">
          <Badge variant="icon">
            <FileText className="h-4 w-4" />
          </Badge>
          <div>
            <h2 className="text-base font-bold text-[#1E2923]">Original Document Text</h2>
            <p className="text-xs text-[#4B5651]">Raw text extracted directly from the court PDF or order</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CopyButton text={text} />
          <DownloadButton text={text} filename="original-court-document.txt" />
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-xs text-[#4B5651] mb-4">
          <span>{wordCount} words extracted</span>
        </div>

        <div className="max-h-[600px] overflow-y-auto rounded-xl border border-[#E6E8E7] bg-[#FAFAFA]/50 p-5 font-mono text-xs sm:text-sm leading-relaxed text-[#1E2923] whitespace-pre-wrap">
          {text}
        </div>
      </div>
    </Card>
  );
}
