import { cn } from "@/lib/utils";

export interface StatusDotProps {
  status?: "green" | "amber" | "red" | "neutral";
  pulse?: boolean;
  className?: string;
}

const STATUS_COLORS = {
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
  neutral: "bg-zinc-400",
};

export function StatusDot({ status = "green", pulse = false, className }: StatusDotProps) {
  const color = STATUS_COLORS[status];

  return (
    <span className={cn("relative flex h-2.5 w-2.5 shrink-0", className)}>
      {pulse && (
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
            color
          )}
        />
      )}
      <span className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", color)} />
    </span>
  );
}
