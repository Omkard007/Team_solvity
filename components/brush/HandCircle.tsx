import { cn } from "@/lib/utils";

export type HandCircleProps = {
  className?: string;
  color?: string;
};

export function HandCircle({
  className,
  color = "var(--accent)",
}: HandCircleProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -inset-x-2 -inset-y-1.5 h-[calc(100%+12px)] w-[calc(100%+16px)] overflow-visible",
        className
      )}
    >
      <svg
        viewBox="0 0 160 60"
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
        style={{ filter: "url(#brush-rough-soft)" }}
      >
        <path
          d="M 20,32 C 18,12 80,4 135,14 C 158,19 155,44 125,52 C 85,62 14,56 12,38 C 10,24 35,16 65,12"
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          className="animate-draw-mark"
        />
      </svg>
    </span>
  );
}
