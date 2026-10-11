import { cn } from "@/lib/utils";

export type BrushUnderlineProps = {
  className?: string;
  color?: string;
};

export function BrushUnderline({
  className,
  color = "var(--accent)",
}: BrushUnderlineProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -bottom-2 left-0 w-full overflow-visible",
        className
      )}
    >
      <svg
        viewBox="0 0 240 24"
        preserveAspectRatio="none"
        className="h-3 sm:h-4 w-full overflow-visible"
        style={{ filter: "url(#brush-rough-soft)" }}
      >
        <path
          d="M 4,14 Q 60,6 120,13 T 236,11"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          className="animate-draw-mark"
        />
      </svg>
    </span>
  );
}
