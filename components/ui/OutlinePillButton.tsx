"use client";

import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface OutlinePillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  children: ReactNode;
}

export const OutlinePillButton = forwardRef<HTMLButtonElement, OutlinePillButtonProps>(
  ({ icon, children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn("outline-pill-button", className)}
        {...props}
      >
        {icon && <span className="shrink-0" aria-hidden="true">{icon}</span>}
        <span>{children}</span>
      </button>
    );
  }
);

OutlinePillButton.displayName = "OutlinePillButton";
