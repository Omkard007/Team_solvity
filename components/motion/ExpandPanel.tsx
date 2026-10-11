"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ExpandPanelProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
}

export function ExpandPanel({ isOpen, children, className }: ExpandPanelProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: isOpen ? "1fr" : "0fr",
        transition: "grid-template-rows 300ms var(--ease-out)",
      }}
      className={cn("overflow-hidden", className)}
      aria-hidden={!isOpen}
    >
      <div className="overflow-hidden min-h-0">
        {children}
      </div>
    </div>
  );
}
