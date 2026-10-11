import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export type StepCardProps = {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
};

export function StepCard({
  icon,
  title,
  subtitle,
  children,
  className,
  bodyClassName,
}: StepCardProps) {
  return (
    <Card className={className}>
      <div className="flex items-center gap-3.5 border-b border-[#E6E8E7] bg-[#FAFAFA] px-5 py-4">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]"
          aria-hidden="true"
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm sm:text-base font-bold text-[#1E2923]">
            {title}
          </h2>
          {subtitle && (
            <p className="truncate text-xs sm:text-sm text-[#4B5651]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className={cn("p-5 sm:p-6", bodyClassName)}>{children}</div>
    </Card>
  );
}
