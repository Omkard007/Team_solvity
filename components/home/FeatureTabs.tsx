"use client";

import { useState } from "react";
import { Check, Users, Terminal } from "lucide-react";
import { Section } from "@/components/layout";
import { Reveal } from "@/components/motion/Reveal";
import { FEATURE_TABS_CONTENT } from "@/lib/content";

export function FeatureTabs() {
  const [activeTab, setActiveTab] = useState<string>("everyone");
  const currentTab =
    FEATURE_TABS_CONTENT.tabs.find((t) => t.id === activeTab) ||
    FEATURE_TABS_CONTENT.tabs[0];

  return (
    <Section tone="purple" id="flexible-modes" className="bg-[var(--section-bg,#F6F5FA)]">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="eyebrow-label text-[#5B6661]">
            {FEATURE_TABS_CONTENT.eyebrow}
          </p>

          <h2 className="mt-4 display-h2">
            {FEATURE_TABS_CONTENT.h2}
          </h2>
        </Reveal>

        {/* Tab switch buttons */}
        <div className="mt-8 flex justify-center gap-3">
          {FEATURE_TABS_CONTENT.tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            const Icon = tab.id === "everyone" ? Users : Terminal;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
                  isActive
                    ? "bg-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20"
                    : "border border-[#E6E8E7] bg-white text-[#4B5651] hover:text-[#1E2923] shadow-xs"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Card with Reveal */}
        <Reveal delay={100} className="mt-10 rounded-[24px] border border-[#ECEEED] bg-white p-8 sm:p-10 text-left shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <h3 className="text-2xl font-bold tracking-tight text-[#1E2923]">
                {currentTab.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#4B5651]">
                {currentTab.description}
              </p>

              <div className="mt-6 space-y-3">
                {currentTab.points.map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </span>
                    <span className="text-sm font-medium text-[#1E2923]">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual or Code Snippet Mockup on the right */}
            <div className="md:col-span-5">
              {activeTab === "everyone" ? (
                <div className="rounded-2xl border border-[#ECEAFB] bg-[#F6F5FB] p-5 text-xs text-[#1E2923] space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#5B4FD6] uppercase">
                    <span>Browser Process</span>
                    <span>Zero Setup</span>
                  </div>
                  <div className="rounded-xl bg-white p-3 shadow-xs">
                    <span className="font-semibold text-[#1E2923]">1. Drag PDF</span>
                    <p className="text-[#4B5651] text-[11px] mt-0.5">Instant secure client parsing</p>
                  </div>
                  <div className="rounded-xl bg-white p-3 shadow-xs">
                    <span className="font-semibold text-[#1E2923]">2. Read Translation</span>
                    <p className="text-[#4B5651] text-[11px] mt-0.5">Plain English breakdown</p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-[#1E2923] p-5 font-mono text-[11px] text-zinc-300 leading-relaxed shadow-lg">
                  <div className="flex items-center gap-1.5 pb-3 border-b border-zinc-800 text-zinc-500">
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                    <span className="ml-2 text-[10px]">POST /api/simplify</span>
                  </div>
                  <pre className="mt-3 overflow-x-auto text-[11px]">
{`{
  "court": "Delhi_HC",
  "statutes": ["Sec_14_PHA"],
  "disposition": "stay_granted",
  "plain_english": "Demolition stayed."
}`}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
