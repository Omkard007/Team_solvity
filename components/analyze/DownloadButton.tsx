"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

export type DownloadButtonProps = {
  text: string;
  filename?: string;
  className?: string;
};

export function DownloadButton({
  text,
  filename = "simplified-court-order.txt",
  className,
}: DownloadButtonProps) {
  const handleDownload = () => {
    try {
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      // ignore
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleDownload}
      aria-label="Download text as .txt file"
      className={className}
    >
      <Download className="mr-1.5 h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" aria-hidden="true" />
      <span>Download .txt</span>
    </Button>
  );
}
