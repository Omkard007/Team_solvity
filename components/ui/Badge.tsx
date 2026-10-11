import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "neutral" | "icon";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  children: ReactNode;
};

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-soft)] text-[var(--accent-ink)]",
  neutral:
    "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-normal text-[#4B5651] bg-[#F6F5FB] border border-[#E6E8E7]",
  icon:
    "inline-flex items-center justify-center h-10 w-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] shrink-0",
};

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </span>
  );
}
