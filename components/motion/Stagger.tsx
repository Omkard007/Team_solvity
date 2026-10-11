"use client";

import { Children, isValidElement, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export interface StaggerProps {
  children: ReactNode;
  delayStep?: number;
  maxItems?: number;
  className?: string;
  y?: number;
}

export function Stagger({
  children,
  delayStep = 70,
  maxItems = 8,
  className,
  y = 12,
}: StaggerProps) {
  const [ref, inView] = useInView({ threshold: 0.1, once: true });
  const reducedMotion = usePrefersReducedMotion();

  const childArray = Children.toArray(children);

  return (
    <div ref={ref} className={className}>
      {childArray.map((child, index) => {
        if (!isValidElement(child)) return child;
        const delay = reducedMotion ? 0 : Math.min(index, maxItems) * delayStep;

        return (
          <div
            key={child.key || index}
            style={{
              transitionDuration: `${reducedMotion ? 1 : 450}ms`,
              transitionDelay: `${delay}ms`,
              transform: inView || reducedMotion ? "none" : `translateY(${y}px)`,
              opacity: inView || reducedMotion ? 1 : 0,
            }}
            className={cn("transition-all ease-[var(--ease-out)]", (child.props as { className?: string })?.className)}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
