"use client";

import Link from "next/link";
import { Languages, CheckCircle2, Copy, Smartphone } from "lucide-react";
import { Section } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { BrushUnderline } from "@/components/brush";
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
    <div className="relative rounded-[16px] bg-white p-8 shadow-[0_20px_45px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(91,79,214,0.12)]">
      <div className="flex items-start justify-between">
        {/* 72px icon circle */}
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)] transition-transform duration-300 hover:scale-105">
          <IconComponent className="h-8 w-8" aria-hidden="true" />
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

      <p className="mt-2.5 text-sm leading-relaxed text-[#4B5651]">
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
        </div>

        {/* Right Column: 2x2 Staggered Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
          {/* Column 1 */}
          <div className="flex flex-col gap-6 sm:gap-7">
            <BenefitCard item={cards[0]} />
            <BenefitCard item={cards[2]} />
          </div>

          {/* Column 2 (staggered downward) */}
          <div className="flex flex-col gap-6 sm:gap-7 sm:translate-y-10">
            <BenefitCard item={cards[1]} />
            <BenefitCard item={cards[3]} />
          </div>
        </div>
      </div>
    </Section>
  );
}
