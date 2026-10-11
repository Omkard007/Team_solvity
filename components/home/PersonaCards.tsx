import { UserCheck, Briefcase, Newspaper } from "lucide-react";
import { Section } from "@/components/layout";
import { PERSONA_CARDS_CONTENT } from "@/lib/content";

const personaIcons = [UserCheck, Briefcase, Newspaper];

export function PersonaCards() {
  return (
    <Section tone="purple" id="who-it-helps" className="bg-[var(--section-bg)]">
      <div className="text-center max-w-3xl mx-auto">
        <p className="eyebrow-label text-[#4B5651]">
          {PERSONA_CARDS_CONTENT.eyebrow}
        </p>
        <h2 className="mt-4 display-h2">
          {PERSONA_CARDS_CONTENT.h2}
        </h2>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {PERSONA_CARDS_CONTENT.personas.map((p, idx) => {
          const Icon = personaIcons[idx] || UserCheck;
          return (
            <div
              key={p.role}
              className="relative rounded-[16px] bg-white p-8 shadow-[0_20px_45px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(91,79,214,0.12)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--accent-ink)]">
                    {p.badge}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold tracking-tight text-[#1E2923]">
                  {p.role}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#4B5651]">
                  {p.scenario}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
