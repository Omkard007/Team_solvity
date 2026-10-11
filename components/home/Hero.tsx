"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Upload, Play, FileText } from "lucide-react";
import { Section } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { BrushUnderline } from "@/components/brush";
import { HERO_CONTENT } from "@/lib/content";

export function Hero() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleCardClick = () => {
    router.push("/analyze");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      router.push("/analyze");
    }
  };

  return (
    <Section tone="green" id="hero" className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Headline, Lead, Buttons */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <h1 className="display-h1">
            {HERO_CONTENT.h1Prefix}
            <span className="relative inline-block text-[var(--accent)] whitespace-nowrap">
              {HERO_CONTENT.h1Highlight}
              <BrushUnderline />
            </span>
          </h1>

          <p className="mt-8 lead-body max-w-xl">
            {HERO_CONTENT.lead}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link href="/analyze">
              <Button
                variant="accent"
                size="lg"
                className="gap-2.5 text-base"
              >
                <Upload className="h-5 w-5" aria-hidden="true" />
                <span>{HERO_CONTENT.ctaPrimary}</span>
              </Button>
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex items-center gap-3 text-sm font-semibold text-[#1E2923] hover:text-[#4B5651] transition-colors group"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1F2A24] text-white shadow-sm transition-transform group-hover:scale-105">
                <Play className="h-4 w-4 fill-white ml-0.5" aria-hidden="true" />
              </span>
              <span>{HERO_CONTENT.ctaSecondary}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Dashed Upload Card */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <div
            onClick={handleCardClick}
            className="group relative w-full max-w-[440px] rounded-[40px] border-4 border-dashed border-[#E3E6E5] bg-white p-8 sm:p-10 text-center shadow-2xl shadow-zinc-200/50 hover:border-[var(--accent)] hover:shadow-[0_20px_50px_rgba(76,175,106,0.12)] transition-all duration-300 cursor-pointer flex flex-col items-center"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
              tabIndex={-1}
            />

            {/* Three fanned document tiles: ORDER, PDF, NOTICE */}
            <div className="relative flex items-center justify-center pt-4 pb-2 w-full h-32 select-none">
              {/* Left Tile: ORDER */}
              <div className="absolute -translate-x-14 translate-y-2 -rotate-12 rounded-xl bg-white border border-[#E6E8E7] px-4 py-5 shadow-md flex flex-col items-center gap-1 w-20 transition-transform group-hover:-translate-x-16 group-hover:-rotate-16">
                <FileText className="h-5 w-5 text-[#4B5651]" />
                <span className="text-[10px] font-extrabold tracking-wider text-[#4B5651]">ORDER</span>
              </div>

              {/* Center Tile: PDF (larger, gray) */}
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

            {/* Title & Subtext */}
            <h3 className="mt-4 text-xl sm:text-2xl font-bold tracking-tight text-[#1E2923]">
              {HERO_CONTENT.dropzone.title}
            </h3>

            <p className="mt-2 text-sm text-[#4B5651]">
              {HERO_CONTENT.dropzone.subtext}
            </p>

            {/* Outline-pill Select File button */}
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
      </div>
    </Section>
  );
}
