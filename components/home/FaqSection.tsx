"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/layout";
import { FAQ_CONTENT } from "@/lib/content";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <Section id="faq" tone="neutral" className="bg-[var(--section-bg)]">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="eyebrow-label text-[#4B5651]">
            {FAQ_CONTENT.eyebrow}
          </p>
          <h2 className="mt-4 display-h2">
            {FAQ_CONTENT.h2}
          </h2>
        </div>

        <div className="mt-14 space-y-4">
          {FAQ_CONTENT.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-[16px] border border-[#E6E8E7] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between p-6 text-left font-bold text-base text-[#1E2923] hover:text-[#4B5651] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <span className="pr-4">{item.question}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F6F5FB] transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[var(--accent-soft)] text-[var(--accent)]" : "text-[#4B5651]"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-[#F0F2F1] px-6 pt-4 pb-6 text-sm leading-relaxed text-[#4B5651]">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
