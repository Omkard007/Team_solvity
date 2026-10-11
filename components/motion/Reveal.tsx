"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  y?: number;
}

export function Reveal({
  children,
  delay = 0,
  duration = 500,
  className,
  y = 16,
}: RevealProps) {
  const [ref, inView] = useInView({ threshold: 0.1, once: true });
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${reducedMotion ? 1 : duration}ms`,
        transitionDelay: `${reducedMotion ? 0 : delay}ms`,
        transform: inView || reducedMotion ? "none" : `translateY(${y}px)`,
        opacity: inView || reducedMotion ? 1 : 0,
      }}
      className={cn("transition-all ease-[var(--ease-out)]", className)}
    >
      {children}
    </div>
  );
}
