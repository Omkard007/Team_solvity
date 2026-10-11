export function BrushFilters() {
  return (
    <svg
      width="0"
      height="0"
      className="pointer-events-none absolute"
      style={{ position: "absolute", width: 0, height: 0 }}
      aria-hidden="true"
    >
      <defs>
        {/* Full dry-bristle rough filter for giant section brush strokes */}
        <filter
          id="brush-rough"
          x="-15%"
          y="-15%"
          width="130%"
          height="130%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.04"
            numOctaves={4}
            seed={3}
            result="warp"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale={60}
            xChannelSelector="R"
            yChannelSelector="G"
            result="rough"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.004 0.6"
            numOctaves={2}
            seed={8}
            result="streaks"
          />
          <feColorMatrix
            in="streaks"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  5 0 0 0 -1.6"
            result="bristle"
          />
          <feComposite in="rough" in2="bristle" operator="in" />
        </filter>

        {/* Lighter scale rough filter for headline marks & underlines */}
        <filter
          id="brush-rough-soft"
          x="-10%"
          y="-15%"
          width="120%"
          height="130%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03 0.08"
            numOctaves={3}
            seed={5}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={12}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Dedicated torn painted divider filter for section edges */}
        <filter
          id="brush-edge"
          x="0%"
          y="-20%"
          width="100%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.025 0.05"
            numOctaves={3}
            seed={9}
            result="edgeNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="edgeNoise"
            scale={16}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
