import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InfoTileProps {
  icon?: ReactNode;
  label: string;
  value: ReactNode;
  subtext?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function InfoTile({
  icon,
  label,
  value,
  subtext,
  className,
  onClick,
}: InfoTileProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "inner-tile flex flex-col justify-between",
        onClick && "cursor-pointer hover:border-[var(--accent)]",
        className
      )}
    >
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          {icon && (
            <span className="text-[var(--accent-ink)] shrink-0" aria-hidden="true">
              {icon}
            </span>
          )}
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6661]">
            {label}
          </span>
        </div>
        <div className="text-sm sm:text-base font-bold text-[#1E2923] break-words">
          {value}
        </div>
      </div>
      {subtext && (
        <div className="mt-3 pt-2.5 border-t border-[#ECEEED] text-xs text-[#5B6661] leading-relaxed">
          {subtext}
        </div>
      )}
    </div>
  );
}
