"use client";

import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

export type CopyButtonProps = {
  text: string;
  className?: string;
};

export function CopyButton({ text, className }: CopyButtonProps) {
  const { isCopied, copy } = useCopyToClipboard(2000);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => copy(text)}
      aria-label={isCopied ? "Copied to clipboard" : "Copy text to clipboard"}
      className={className}
    >
      {isCopied ? (
        <>
          <Check className="mr-1.5 h-3.5 w-3.5 text-zinc-950 dark:text-zinc-50" aria-hidden="true" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="mr-1.5 h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" aria-hidden="true" />
          <span>Copy</span>
        </>
      )}
    </Button>
  );
}
