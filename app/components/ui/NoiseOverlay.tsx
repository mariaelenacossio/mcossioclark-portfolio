/**
 * Page-wide noise texture.
 *
 * One inline SVG <feTurbulence> noise pattern rendered as a fixed,
 * pointer-events-none, 3% opacity overlay. Mounted once in the root
 * layout - sits above the background but below content thanks to z-index.
 *
 * Rendered as a Server Component (no client-side JS).
 */
export default function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03] mix-blend-multiply"
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <filter id="noise-filter">
          {/* Fractal noise - baseFrequency tuned for a subtle film-grain feel.
              numOctaves higher = denser texture. */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)" />
      </svg>
    </div>
  )
}
