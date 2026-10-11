"use client";

import type { KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

export interface SegmentedControlOption<T extends string = string> {
  value: T;
  label: string;
}

export type SegmentedControlProps<T extends string = string> = {
  options: readonly SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  name?: string;
  className?: string;
  ariaLabel?: string;
};

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  className,
  ariaLabel = "Select option",
}: SegmentedControlProps<T>) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = options.findIndex((opt) => opt.value === value);
    if (currentIndex === -1) return;

    let nextIndex = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % options.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + options.length) % options.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = options.length - 1;
    }

    if (nextIndex !== -1) {
      e.preventDefault();
      onChange(options[nextIndex].value);
      const targetBtn = document.getElementById(`seg-option-${options[nextIndex].value}`);
      targetBtn?.focus();
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      className={cn(
        "grid w-full grid-flow-col auto-cols-fr gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800/80",
        className
      )}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            id={`seg-option-${option.value}`}
            type="button"
            role="radio"
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex items-center justify-center rounded-md py-2 px-3 text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300",
              isSelected
                ? "bg-white text-zinc-950 shadow-xs dark:bg-zinc-900 dark:text-zinc-50"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
