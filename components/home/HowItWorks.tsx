"use client";

import { FileUp, Sparkles, Download } from "lucide-react";
import { Section } from "@/components/layout";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { HOW_IT_WORKS_CONTENT } from "@/lib/content";

const stepIcons = [FileUp, Sparkles, Download];

export function HowItWorks() {
  return (
    <Section tone="green" id="how-it-works" className="bg-[var(--section-bg,#F6F5FA)]">
      <Reveal className="text-center max-w-3xl mx-auto">
        <p className="eyebrow-label text-[#5B6661]">
          {HOW_IT_WORKS_CONTENT.eyebrow}
        </p>
        <h2 className="mt-4 display-h2">
          {HOW_IT_WORKS_CONTENT.h2}
        </h2>
      </Reveal>

      <Stagger delayStep={80} maxItems={3} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {HOW_IT_WORKS_CONTENT.steps.map((item, idx) => {
          const Icon = stepIcons[idx] || Sparkles;
          return (
            <div
              key={item.step}
              className="relative rounded-[24px] border border-[#ECEEED] bg-white p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--accent)]/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-3xl font-extrabold text-[#ECEEED]">
                    {item.step}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold tracking-tight text-[#1E2923]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#5B6661]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </Stagger>
    </Section>
  );
}
