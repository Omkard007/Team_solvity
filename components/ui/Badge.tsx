import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeTone = "green" | "amber" | "red" | "neutral";
export type BadgeVariant = "default" | "pill" | "neutral" | "icon";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  tone?: BadgeTone;
  children: ReactNode;
};

const toneClasses: Record<BadgeTone, string> = {
  green: "bg-emerald-50 text-emerald-800 border-emerald-200",
  amber: "bg-amber-50 text-amber-900 border-amber-200",
  red: "bg-rose-50 text-rose-800 border-rose-200",
  neutral: "bg-zinc-100 text-zinc-800 border-zinc-200",
};

export function Badge({
  variant = "default",
  tone,
  className,
  children,
  ...props
}: BadgeProps) {
  if (tone) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border",
          toneClasses[tone],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }

  if (variant === "icon") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center h-10 w-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] shrink-0",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }

  if (variant === "neutral") {
    return (
      <span
        className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-normal text-[#5B6661] bg-[#F6F5FA] border border-[#ECEEED]",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-soft)] text-[var(--accent-ink)]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
