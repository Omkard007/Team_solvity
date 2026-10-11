import { BRUSH_SHAPES, type BrushVariant } from "./brush-shapes";
import { cn } from "@/lib/utils";

export type BrushBackdropProps = {
  variant: Exclude<BrushVariant, "none">;
  flip?: boolean;
  className?: string;
};

export function BrushBackdrop({ variant, flip = false, className }: BrushBackdropProps) {
  const shapes = BRUSH_SHAPES[variant] || [];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none",
        className
      )}
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className={cn(
          "h-full w-full transform-gpu transition-opacity duration-300",
          flip && "scale-x-[-1]"
        )}
        style={{
          // Use filter with dry-bristle rough edges
          filter: "url(#brush-rough)",
        }}
      >
        <g fill="var(--brush)">
          {shapes.map((shape, index) => (
            <path
              key={`${variant}-${index}`}
              d={shape.d}
              opacity={shape.opacity ?? 1}
              transform={shape.transform}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
