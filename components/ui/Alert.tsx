import type { HTMLAttributes } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
};

export function Alert({
  title = "Error",
  message,
  onRetry,
  retryLabel = "Try again",
  className,
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "rounded-xl border border-red-200 bg-red-50/70 p-4 text-zinc-900 dark:border-red-900/50 dark:bg-red-950/20 dark:text-zinc-100",
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        <AlertCircle
          className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400"
          aria-hidden="true"
        />
        <div className="flex-1">
          {title && <h4 className="text-sm font-semibold text-red-900 dark:text-red-300">{title}</h4>}
          <p className="mt-1 text-sm text-red-800 dark:text-red-200">{message}</p>
          {onRetry && (
            <div className="mt-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="border-red-300 bg-white text-red-900 hover:bg-red-50 dark:border-red-800 dark:bg-zinc-900 dark:text-red-300 dark:hover:bg-red-950/40"
              >
                {retryLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
