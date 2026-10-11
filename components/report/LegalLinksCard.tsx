"use client";

import { ExternalLink, Link2, FileCode, Scale, Landmark } from "lucide-react";
import type { LegalLink, LegalLinkType } from "@/types/type";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface LegalLinksCardProps {
  links: LegalLink[];
  className?: string;
}

const TYPE_CONFIG: Record<
  LegalLinkType,
  { label: string; icon: typeof Scale; badgeBg: string }
> = {
  act: {
    label: "Statute / Act",
    icon: Landmark,
    badgeBg: "bg-blue-50 text-blue-800 border-blue-200",
  },
  section: {
    label: "Section / Provision",
    icon: FileCode,
    badgeBg: "bg-purple-50 text-purple-800 border-purple-200",
  },
  judgment: {
    label: "Court Judgment",
    icon: Scale,
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  court_order: {
    label: "Court Order",
    icon: Scale,
    badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
  },
  official_source: {
    label: "Official Portal",
    icon: ExternalLink,
    badgeBg: "bg-zinc-100 text-zinc-800 border-zinc-200",
  },
  other: {
    label: "Reference",
    icon: Link2,
    badgeBg: "bg-zinc-100 text-zinc-800 border-zinc-200",
  },
};

export function LegalLinksCard({ links, className }: LegalLinksCardProps) {
  if (!links || links.length === 0) return null;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="flex items-center gap-3 border-b border-[#E6E8E7] bg-[#FAFAFA] px-6 py-4">
        <Badge variant="icon">
          <Link2 className="h-4 w-4" />
        </Badge>
        <div>
          <h2 className="text-base font-bold text-[#1E2923]">Official Legal Sources & Citations</h2>
          <p className="text-xs text-[#4B5651]">Direct links to official legislation, cause lists, and reference texts</p>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link, idx) => {
            const typeInfo = TYPE_CONFIG[link.type] || TYPE_CONFIG.other;
            const TypeIcon = typeInfo.icon;
            return (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-xl border border-[#E6E8E7] bg-white p-4.5 shadow-2xs transition-all hover:border-[var(--accent)] hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-bold uppercase",
                        typeInfo.badgeBg
                      )}
                    >
                      <TypeIcon className="h-3 w-3" />
                      {typeInfo.label}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-[#4B5651] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent)]" />
                  </div>

                  <h3 className="text-sm font-bold text-[#1E2923] group-hover:text-[var(--accent-ink)] transition-colors">
                    {link.title}
                  </h3>

                  {link.section_or_citation && (
                    <span className="code-chip text-[11px] mt-1.5 inline-block">
                      {link.section_or_citation}
                    </span>
                  )}

                  <p className="mt-2 text-xs text-[#4B5651] leading-relaxed line-clamp-2">
                    {link.description}
                  </p>
                </div>

                {link.source_name && (
                  <div className="mt-3.5 pt-2.5 border-t border-[#E6E8E7]/60 text-[11px] text-[#4B5651] flex items-center justify-between">
                    <span>Source:</span>
                    <span className="font-semibold text-[#1E2923] truncate max-w-[200px]">
                      {link.source_name}
                    </span>
                  </div>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
