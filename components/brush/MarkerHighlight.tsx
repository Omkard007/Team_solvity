import { cn } from "@/lib/utils";

export type MarkerHighlightProps = {
  className?: string;
  color?: string;
};

export function MarkerHighlight({
  className,
  color = "var(--accent-soft)",
}: MarkerHighlightProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -inset-x-1.5 -z-10 h-full w-[calc(100%+12px)] overflow-hidden rounded-sm",
        className
      )}
    >
      <svg
        viewBox="0 0 200 40"
        preserveAspectRatio="none"
        className="h-full w-full"
        style={{ filter: "url(#brush-rough-soft)" }}
      >
        <path
          d="M 4,22 C 30,12 80,10 130,16 C 160,20 185,14 196,18 L 194,34 C 150,30 110,36 60,32 C 30,30 10,34 4,30 Z"
          fill={color}
        />
      </svg>
    </span>
  );
}
