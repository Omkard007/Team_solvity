"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/layout";
import { Reveal } from "@/components/motion/Reveal";
import { ExpandPanel } from "@/components/motion/ExpandPanel";
import { Stagger } from "@/components/motion/Stagger";
import { FAQ_CONTENT } from "@/lib/content";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <Section id="faq" tone="neutral" className="bg-[var(--section-bg,#F6F5FA)]">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="eyebrow-label text-[#5B6661]">
            {FAQ_CONTENT.eyebrow}
          </p>
          <h2 className="mt-4 display-h2">
            {FAQ_CONTENT.h2}
          </h2>
        </Reveal>

        <Stagger delayStep={60} maxItems={6} className="mt-14 space-y-4">
          {FAQ_CONTENT.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-[24px] border border-[#ECEEED] bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)] transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between p-6 text-left font-bold text-base text-[#1E2923] hover:text-[#5B6661] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
                >
                  <span className="pr-4">{item.question}</span>
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-[var(--ease-out)]",
                      isOpen
                        ? "rotate-180 bg-[var(--accent-soft)] text-[var(--accent-ink)]"
                        : "bg-[#FAFAFA] text-[#5B6661]"
                    )}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>
                <ExpandPanel isOpen={isOpen}>
                  <div className="border-t border-[#ECEEED] px-6 pt-4 pb-6 text-sm leading-relaxed text-[#5B6661]">
                    {item.answer}
                  </div>
                </ExpandPanel>
              </div>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}
