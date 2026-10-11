import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "accent"
  | "dark"
  | "disabled-gray"
  | "soft-pill"
  | "outline-pill"
  | "ghost-link"
  | "primary"
  | "secondary"
  | "outline"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg" | "default";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  accent:
    "bg-[var(--accent)] text-white font-bold rounded-[10px] shadow-lg shadow-[var(--accent)]/20 hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:brightness-100",
  dark:
    "bg-[#1F2A24] text-white font-bold rounded-[10px] shadow-md hover:bg-[#2A3831] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed",
  "disabled-gray":
    "bg-[#D5D8D7] text-white font-bold rounded-[10px] cursor-not-allowed",
  "soft-pill":
    "bg-[var(--accent-soft)] text-[var(--accent-ink)] font-bold uppercase tracking-wider text-xs rounded-xl hover:brightness-95 active:scale-98",
  "outline-pill":
    "bg-white text-[#1E2923] border border-[#E6E8E7] rounded-full font-semibold shadow-xs hover:border-[#D5D8D7] hover:-translate-y-0.5 active:translate-y-0",
  "ghost-link":
    "bg-transparent text-[#1E2923] hover:text-[#4B5651] font-semibold text-sm",
  primary:
    "bg-[var(--accent)] text-white font-bold rounded-[10px] shadow-lg shadow-[var(--accent)]/20 hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed",
  secondary:
    "bg-[#F6F5FB] text-[#1E2923] border border-[#E6E8E7] rounded-[10px] hover:bg-[#ECEAFB]",
  outline:
    "border border-[#E6E8E7] bg-white text-[#1E2923] rounded-[10px] hover:bg-[#F6F5FB] shadow-xs",
  ghost:
    "text-[#4B5651] hover:text-[#1E2923] hover:bg-[#F6F5FB] rounded-[10px]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-8 text-base",
  default: "",
};

export function Button({
  variant = "accent",
  size = "md",
  isLoading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  // If size is default or variant handles sizing (like soft-pill or outline-pill if not overridden)
  const isCustomSizedVariant =
    variant === "soft-pill" || variant === "outline-pill" || variant === "ghost-link";
  const effectiveSize =
    isCustomSizedVariant && size === "md"
      ? variant === "soft-pill"
        ? "px-5 py-2.5"
        : variant === "outline-pill"
        ? "px-6 py-2.5 text-sm"
        : "px-2 py-1 text-sm"
      : sizeClasses[size];

  const isDisabled = disabled || isLoading || variant === "disabled-gray";

  return (
    <button
      disabled={isDisabled}
      className={cn(
        "inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 select-none",
        variantClasses[variant],
        effectiveSize,
        className
      )}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
