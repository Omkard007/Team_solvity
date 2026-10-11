import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ChipProps {
  children: ReactNode;
  className?: string;
  variant?: "mono" | "default";
  onClick?: () => void;
  title?: string;
  clickable?: boolean;
}

export function Chip({
  children,
  className,
  variant = "mono",
  onClick,
  title,
  clickable = false,
}: ChipProps) {
  const isClickable = clickable || Boolean(onClick);

  return (
    <span
      onClick={onClick}
      title={title}
      className={cn(
        variant === "mono" ? "code-chip" : "rounded-md bg-[#F0F2F1] px-2 py-0.5 text-xs font-semibold text-[#1E2923]",
        isClickable && "cursor-pointer hover:brightness-95 active:scale-95 transition-all",
        className
      )}
    >
      {children}
    </span>
  );
}
