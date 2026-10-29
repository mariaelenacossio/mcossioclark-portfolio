import ScrollCue from '@/app/components/dark/ScrollCue'
import HeroGraphic from '@/app/components/dark/HeroGraphic'

/**
 * Dark-redesign hero (Direction A). Poster-scale display type, white on
 * near-black canvas. Content unchanged from the live Milan Reed hero -
 * only the visual system changes. Eyebrow uses ink-muted, not
 * accent-blue: DESIGN.md is explicit that the blue is never decorative.
 *
 * Fills the viewport below the 56px sticky header (100svh so mobile
 * browser chrome doesn't clip it) as a min-height, not a fixed height -
 * the graphic stacked below the text at 375px can legitimately need more
 * room than the viewport, and min-height lets it grow instead of
 * clipping. A scroll cue links to #about. The CTA pill's hover/press
 * uses the dr-ease/dr-fast motion tokens, hover gated to hover-capable
 * devices. The eyebrow/headline/paragraph/CTA fade+slide in once on
 * load, staggered dr-fast apart (pure CSS - no JS needed since it's
 * always above the fold, nothing to observe).
 */
export default function DarkHero() {
  return (
    <section
      aria-label="Intro"
      className="relative flex min-h-[calc(100svh-56px)] flex-col justify-center px-dr-xl py-dr-section"
    >
      <div className="mx-auto grid w-full max-w-[1199px] grid-cols-1 items-center gap-dr-xl lg:grid-cols-[1fr_auto] lg:gap-dr-xxl">
        <div>
          <p className="mb-dr-md font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted motion-safe:animate-dr-headline-in-0">
            AI-Native Designer &amp; Developer
          </p>

          <h1 className="max-w-[900px] font-dr-display text-dr-display-xxl text-dr-ink motion-safe:animate-dr-headline-in-1">
            I design things
            <br className="hidden sm:block" />
            {' '}and then build them.
          </h1>

          <p className="mt-dr-lg max-w-[520px] font-dr-body text-dr-body-lg leading-relaxed text-dr-ink-muted motion-safe:animate-dr-headline-in-2">
            Most designers hand off to developers. I skip that step.
            Three-plus years of research, Figma, and shipping real code,
            usually all in the same sprint.
          </p>

          <div className="mt-dr-xl flex flex-wrap gap-dr-sm motion-safe:animate-dr-headline-in-3">
            <a
              href="#work"
              className="rounded-dr-pill bg-dr-primary px-dr-lg py-dr-sm font-dr-body text-dr-caption font-medium text-dr-on-primary no-underline transition duration-dr-fast ease-dr-ease [@media(hover:hover)]:hover:bg-dr-ink-muted active:scale-95"
            >
              See my work
            </a>
          </div>
        </div>

        <HeroGraphic />
      </div>

      <ScrollCue />
    </section>
  )
}
