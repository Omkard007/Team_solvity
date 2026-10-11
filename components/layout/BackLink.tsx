import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export type BackLinkProps = {
  href?: string;
  label?: string;
  className?: string;
};

export function BackLink({
  href = "/",
  label = "Back",
  className,
}: BackLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-semibold text-[#4B5651] transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-md px-1 py-0.5",
        className
      )}
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}
