import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SectionCardProps {
  icon?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  badgeClassName?: string;
}

export function SectionCard({
  icon,
  title,
  subtitle,
  action,
  children,
  className,
  headerClassName,
  bodyClassName,
  badgeClassName,
}: SectionCardProps) {
  return (
    <section className={cn("section-card", className)}>
      <header className={cn("section-card-header", headerClassName)}>
        {icon && (
          <div
            className={cn("section-card-badge", badgeClassName)}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h2 className="text-base sm:text-lg font-bold text-[#1E2923] tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#5B6661] mt-0.5 truncate">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </header>
      <div className={cn("p-6 sm:p-7", bodyClassName)}>{children}</div>
    </section>
  );
}
