import { FileUp, Sparkles, Download } from "lucide-react";
import { Section } from "@/components/layout";
import { HOW_IT_WORKS_CONTENT } from "@/lib/content";

const stepIcons = [FileUp, Sparkles, Download];

export function HowItWorks() {
  return (
    <Section tone="purple" id="how-it-works" className="bg-[var(--section-bg)]">
      <div className="text-center max-w-3xl mx-auto">
        <p className="eyebrow-label text-[#4B5651]">
          {HOW_IT_WORKS_CONTENT.eyebrow}
        </p>
        <h2 className="mt-4 display-h2">
          {HOW_IT_WORKS_CONTENT.h2}
        </h2>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {HOW_IT_WORKS_CONTENT.steps.map((item, idx) => {
          const Icon = stepIcons[idx] || Sparkles;
          return (
            <div
              key={item.step}
              className="relative rounded-[16px] bg-white p-8 shadow-[0_20px_45px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(91,79,214,0.12)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-3xl font-extrabold text-[#E6E8E7]">
                    {item.step}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold tracking-tight text-[#1E2923]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#4B5651]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
