"use client";

import { useRef, useEffect, useState, type KeyboardEvent } from "react";
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
  ariaLabel = "Document tabs",
}: TabsProps) {
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Measure active tab element position and update sliding indicator
  useEffect(() => {
    const listEl = tabListRef.current;
    if (!listEl) return;

    const activeEl = listEl.querySelector<HTMLButtonElement>(`#tab-btn-${activeTab}`);
    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1,
      });
    }
  }, [activeTab, tabs]);

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
      ref={tabListRef}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      className={cn("relative flex items-center border-b border-[#ECEEED] gap-2 sm:gap-6 overflow-x-auto no-scrollbar", className)}
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
              "relative z-10 shrink-0 pb-3.5 pt-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-xs whitespace-nowrap cursor-pointer",
              isActive
                ? "text-[var(--accent-ink)] font-bold"
                : "font-semibold text-[#5B6661] hover:text-[#1E2923]"
            )}
          >
            {tab.label}
          </button>
        );
      })}

      {/* Smooth Sliding Underline Indicator */}
      <span
        className="pointer-events-none absolute bottom-0 h-0.5 bg-[var(--accent)] transition-all duration-300 ease-[var(--ease-out)]"
        style={{
          transform: `translateX(${indicatorStyle.left}px)`,
          width: `${indicatorStyle.width}px`,
          opacity: indicatorStyle.opacity,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
