import { TRUST_COURTS } from "@/lib/content";

export function TrustStrip() {
  return (
    <div className="w-full border-y border-[#E6E8E7]/70 bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-[1180px] px-6 md:px-8 text-center">
        <p className="eyebrow-label text-[#4B5651]/80">
          WORKS WITH DOCUMENTS FROM
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 sm:gap-x-14 md:gap-x-16 gap-y-6">
          {TRUST_COURTS.map((court) => (
            <span
              key={court}
              className="text-lg sm:text-2xl font-extrabold tracking-tight text-[#4B5651]/60 hover:text-[#1E2923] transition-colors duration-200 select-none"
            >
              {court}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
