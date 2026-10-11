"use client";

import Link from "next/link";
import { Languages, CheckCircle2, Copy, Smartphone } from "lucide-react";
import { Section } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { BrushUnderline } from "@/components/brush";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { BENEFITS_CONTENT, type BenefitItem } from "@/lib/content";

const iconMap = {
  languages: Languages,
  checkCircle: CheckCircle2,
  copy: Copy,
  smartphone: Smartphone,
};

function BenefitCard({ item }: { item: BenefitItem }) {
  const IconComponent = iconMap[item.iconName];

  return (
    <div className="relative rounded-[24px] border border-[#ECEEED] bg-white p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        {/* 64px icon circle */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] transition-transform duration-300 hover:scale-105">
          <IconComponent className="h-7 w-7" aria-hidden="true" />
        </div>

        {/* FREE badge */}
        {item.badge && (
          <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">
            {item.badge}
          </span>
        )}
      </div>

      <h3 className="mt-6 text-xl font-bold tracking-tight text-[#1E2923]">
        {item.title}
      </h3>

      <p className="mt-2.5 text-sm leading-relaxed text-[#5B6661]">
        {item.description}
      </p>
    </div>
  );
}

export function BenefitsGrid() {
  const cards = BENEFITS_CONTENT.cards;

  return (
    <Section tone="purple" id="benefits" className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading, Lead, Button */}
        <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28">
          <Reveal>
            <h2 className="display-h2">
              {BENEFITS_CONTENT.h2Prefix}
              <span className="relative inline-block text-[var(--accent)] whitespace-nowrap">
                {BENEFITS_CONTENT.h2Highlight}
                <BrushUnderline />
              </span>
            </h2>

            <p className="mt-6 lead-body">
              {BENEFITS_CONTENT.lead}
            </p>

            <div className="mt-8">
              <Link href="/analyze">
                <Button variant="accent" size="lg">
                  {BENEFITS_CONTENT.cta}
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Right Column: 2x2 Staggered Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
          {/* Column 1 */}
          <Reveal delay={80} className="flex flex-col gap-6 sm:gap-7">
            <BenefitCard item={cards[0]} />
            <BenefitCard item={cards[2]} />
          </Reveal>

          {/* Column 2 (staggered downward) */}
          <Reveal delay={160} className="flex flex-col gap-6 sm:gap-7 sm:translate-y-10">
            <BenefitCard item={cards[1]} />
            <BenefitCard item={cards[3]} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
