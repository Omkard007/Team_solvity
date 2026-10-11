import { cn } from "@/lib/utils";

export type BrushEdgeProps = {
  fillColor?: string;
  className?: string;
  flip?: boolean;
};

export function BrushEdge({
  fillColor = "var(--section-bg, #F6F5FB)",
  className,
  flip = false,
}: BrushEdgeProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none relative -mb-1 w-full overflow-hidden leading-none select-none bg-white dark:bg-zinc-950",
        className
      )}
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className={cn("h-12 sm:h-16 md:h-20 w-full block", flip && "scale-x-[-1]")}
        style={{ filter: "url(#brush-edge)" }}
      >
        {/* Rough torn brush edge transitioning downward into the section background */}
        <path
          d="M 0,45 Q 120,25 260,42 T 560,30 T 840,48 T 1140,28 T 1440,40 L 1440,90 L 0,90 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
