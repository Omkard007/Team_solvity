import type { ReactNode } from "react";
import { BrushBackdrop, type BrushVariant } from "@/components/brush";
import { cn } from "@/lib/utils";

export type SectionTone = "green" | "purple" | "neutral";

export type SectionProps = {
  tone?: SectionTone;
  backdrop?: BrushVariant;
  flip?: boolean;
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

export function Section({
  tone = "neutral",
  backdrop = "none",
  flip = false,
  id,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={cn(
        "relative isolate overflow-x-clip transition-colors duration-300",
        tone === "neutral" ? "bg-[var(--section-bg)]" : "bg-white",
        className
      )}
    >
      {backdrop !== "none" && <BrushBackdrop variant={backdrop} flip={flip} />}
      <div
        className={cn(
          "relative z-10 mx-auto max-w-[1180px] px-6 md:px-8 py-24 md:py-32",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
