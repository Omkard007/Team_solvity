import Link from "next/link";
import { cn } from "@/lib/utils";
import { FOOTER_CONTENT } from "@/lib/content";

export type SiteFooterProps = {
  className?: string;
};

export function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer
      data-tone="neutral"
      className={cn(
        "w-full border-t border-[#E6E8E7] bg-white text-[#4B5651]",
        className
      )}
    >
      <div className="mx-auto max-w-[1180px] px-6 md:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] font-bold text-base leading-none select-none">
                §
              </span>
              <span className="text-lg tracking-tight">
                <strong className="font-extrabold text-[#1E2923]">Legal</strong>{" "}
                <span className="font-medium text-[#4B5651]">Aid</span>
              </span>
            </Link>
            <p className="mt-4 text-xs sm:text-sm text-[#4B5651] leading-relaxed max-w-sm">
              {FOOTER_CONTENT.tagline}
            </p>
          </div>

          {/* Product Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E2923]">
              Product
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs font-medium">
              {FOOTER_CONTENT.productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-[#1E2923] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E2923]">
              Resources
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs font-medium">
              {FOOTER_CONTENT.resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-[#1E2923] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Notice Column */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E2923]">
              Legal Notice
            </h4>
            <p className="mt-4 text-xs text-[#4B5651]/90 leading-relaxed">
              {FOOTER_CONTENT.legalNotice}
            </p>
            <div className="mt-3 inline-block rounded-md bg-[#F6F5FB] px-2.5 py-1 text-[11px] font-semibold text-[#1E2923] border border-[#E6E8E7]">
              {FOOTER_CONTENT.disclaimer}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 border-t border-[#E6E8E7] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4B5651]/80">
          <p>{FOOTER_CONTENT.copyright}</p>
          <p className="font-medium text-[#1E2923]">
            {FOOTER_CONTENT.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
