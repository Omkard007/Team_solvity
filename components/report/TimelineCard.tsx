"use client";

import { Clock, Calendar } from "lucide-react";
import type { TimelineEvent } from "@/types/type";
import type { LegalReport } from "@/lib/types";
import { SectionCard } from "@/components/ui/SectionCard";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export interface TimelineCardProps {
  events?: TimelineEvent[];
  timeline?: LegalReport["timeline"];
  className?: string;
}

export function TimelineCard({ events, timeline, className }: TimelineCardProps) {
  const items = timeline || (events || []).map((e) => ({
    date: e.date,
    event: e.event,
  }));

  const [ref, inView] = useInView({ threshold: 0.1, once: true });
  const reducedMotion = usePrefersReducedMotion();

  if (!items || items.length === 0) return null;

  return (
    <SectionCard
      icon={<Clock className="h-6 w-6 text-[var(--accent-ink)]" />}
      title="Timeline of Events"
      subtitle="Chronological sequence of key happenings leading to the order"
      className={cn("overflow-hidden", className)}
    >
      <div ref={ref} className="relative pl-6 sm:pl-8">
        {/* Animated Drawing Vertical Line (scaleY from top) */}
        <div
          aria-hidden="true"
          className="absolute left-3 top-3 bottom-3 w-0.5 bg-[var(--accent)] origin-top transition-transform duration-800 ease-[var(--ease-out)]"
          style={{
            transform: inView || reducedMotion ? "scaleY(1)" : "scaleY(0)",
          }}
        />

        <div className="space-y-6">
          {items.map((item, idx) => {
            const delay = reducedMotion ? 0 : idx * 90 + 100;

            return (
              <div
                key={idx}
                className="relative group transition-all duration-500 ease-[var(--ease-out)]"
                style={{
                  transform: inView || reducedMotion ? "none" : "translateX(16px)",
                  opacity: inView || reducedMotion ? 1 : 0,
                  transitionDelay: `${delay}ms`,
                }}
              >
                {/* Timeline dot popping with ease-spring */}
                <span
                  className="absolute -left-6 sm:-left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[var(--accent)] text-white shadow-xs transition-transform duration-500 ease-[var(--ease-spring)]"
                  style={{
                    transform: inView || reducedMotion ? "scale(1)" : "scale(0)",
                    transitionDelay: `${delay + 60}ms`,
                  }}
                >
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>

                <div className="inner-tile p-4 transition-all">
                  {item.date && (
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs font-bold text-[var(--accent-ink)] mb-2 border border-[var(--summary-border)]">
                      <Calendar className="h-3 w-3" />
                      {item.date}
                    </div>
                  )}
                  <p className="text-sm sm:text-base leading-relaxed text-[#1E2923]">
                    {item.event}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionCard>
  );
}
