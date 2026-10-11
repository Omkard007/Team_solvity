"use client";

import { Clock, Calendar } from "lucide-react";
import type { TimelineEvent } from "@/types/type";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface TimelineCardProps {
  events: TimelineEvent[];
  className?: string;
}

export function TimelineCard({ events, className }: TimelineCardProps) {
  if (!events || events.length === 0) return null;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="flex items-center gap-3 border-b border-[#E6E8E7] bg-[#FAFAFA] px-6 py-4">
        <Badge variant="icon">
          <Clock className="h-4 w-4" />
        </Badge>
        <div>
          <h2 className="text-base font-bold text-[#1E2923]">Timeline of Events</h2>
          <p className="text-xs text-[#4B5651]">Chronological sequence of key happenings leading to the order</p>
        </div>
      </div>

      <div className="p-6">
        <div className="relative pl-6 sm:pl-8 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E6E8E7]">
          <div className="space-y-6">
            {events.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline dot */}
                <span className="absolute -left-6 sm:-left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[var(--accent)] text-white shadow-xs">
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>

                <div className="rounded-xl border border-[#E6E8E7] bg-white p-4 transition-shadow hover:shadow-xs">
                  {item.date && (
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs font-bold text-[var(--accent-ink)] mb-2">
                      <Calendar className="h-3 w-3" />
                      {item.date}
                    </div>
                  )}
                  <p className="text-sm sm:text-base leading-relaxed text-[#1E2923]">
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
