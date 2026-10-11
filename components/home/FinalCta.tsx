"use client";

import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import { Section } from "@/components/layout";
import { Reveal } from "@/components/motion/Reveal";
import { FINAL_CTA_CONTENT, HERO_CONTENT } from "@/lib/content";

export function FinalCta() {
  const router = useRouter();

  const handleCardClick = () => {
    router.push("/analyze");
  };

  return (
    <Section tone="green" id="final-cta" className="bg-white">
      <Reveal className="mx-auto max-w-3xl text-center flex flex-col items-center">
        <h2 className="display-h2">
          {FINAL_CTA_CONTENT.h2}
        </h2>

        <p className="mt-4 lead-body max-w-xl">
          {FINAL_CTA_CONTENT.subtitle}
        </p>

        {/* Dropzone upload card matching the hero design */}
        <div className="mt-12 w-full max-w-[480px]">
          <div
            onClick={handleCardClick}
            className="group relative w-full rounded-[40px] border-4 border-dashed border-[#E3E6E5] bg-white p-8 sm:p-10 text-center shadow-2xl shadow-zinc-200/50 hover:border-[var(--accent)] hover:shadow-[0_20px_50px_rgba(76,175,106,0.12)] transition-all duration-300 cursor-pointer flex flex-col items-center"
          >
            {/* Three fanned document tiles */}
            <div className="relative flex items-center justify-center pt-4 pb-2 w-full h-32 select-none">
              {/* Left Tile: ORDER */}
              <div className="absolute -translate-x-14 translate-y-2 -rotate-12 rounded-xl bg-white border border-[#E6E8E7] px-4 py-5 shadow-md flex flex-col items-center gap-1 w-20 transition-transform group-hover:-translate-x-16 group-hover:-rotate-16">
                <FileText className="h-5 w-5 text-[#4B5651]" />
                <span className="text-[10px] font-extrabold tracking-wider text-[#4B5651]">ORDER</span>
              </div>

              {/* Center Tile: PDF */}
              <div className="relative z-10 rounded-2xl bg-[#F0F2F1] border border-[#E0E3E1] px-6 py-6 shadow-xl flex flex-col items-center gap-1.5 w-24 transition-transform group-hover:scale-105">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-white">
                  <FileText className="h-5 w-5" />
                </span>
                <span className="text-xs font-black tracking-widest text-[#1E2923]">PDF</span>
              </div>

              {/* Right Tile: NOTICE */}
              <div className="absolute translate-x-14 translate-y-2 rotate-12 rounded-xl bg-white border border-[#E6E8E7] px-4 py-5 shadow-md flex flex-col items-center gap-1 w-20 transition-transform group-hover:translate-x-16 group-hover:rotate-16">
                <FileText className="h-5 w-5 text-[#4B5651]" />
                <span className="text-[10px] font-extrabold tracking-wider text-[#4B5651]">NOTICE</span>
              </div>
            </div>

            <h3 className="mt-4 text-xl sm:text-2xl font-bold tracking-tight text-[#1E2923]">
              {HERO_CONTENT.dropzone.title}
            </h3>

            <p className="mt-2 text-sm text-[#4B5651]">
              {HERO_CONTENT.dropzone.subtext}
            </p>

            <div className="mt-6">
              <span className="inline-flex items-center justify-center rounded-full border border-[#E6E8E7] bg-white px-7 py-2.5 text-sm font-semibold text-[#1E2923] shadow-xs group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-all">
                {HERO_CONTENT.dropzone.button}
              </span>
            </div>

            <p className="mt-6 text-xs text-[#4B5651]/75">
              {HERO_CONTENT.dropzone.footnote}
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
