"use client";

import type { KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
}

export type TabsProps = {
  tabs: readonly TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  ariaLabel?: string;
};

export function Tabs({
  tabs,
  activeTab,
  onChange,
  className,
  ariaLabel = "Document text tabs",
}: TabsProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    if (currentIndex === -1) return;

    let nextIndex = -1;
    if (e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== -1) {
      e.preventDefault();
      onChange(tabs[nextIndex].id);
      const targetBtn = document.getElementById(`tab-btn-${tabs[nextIndex].id}`);
      targetBtn?.focus();
    }
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      className={cn("flex border-b border-[#E6E8E7] gap-6", className)}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            id={`tab-btn-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`tab-panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative pb-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-xs",
              isActive
                ? "text-[var(--accent-ink)] font-bold border-b-2 border-[var(--accent)] -mb-[1px]"
                : "font-medium text-[#4B5651] hover:text-[#1E2923]"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
