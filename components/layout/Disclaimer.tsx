import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export type DisclaimerProps = {
  className?: string;
  showIcon?: boolean;
};

export function Disclaimer({ className, showIcon = false }: DisclaimerProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400",
        className
      )}
    >
      {showIcon && <Info className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
      <span>For information only. This is not legal advice.</span>
    </div>
  );
}
