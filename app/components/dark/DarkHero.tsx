import ScrollCue from '@/app/components/dark/ScrollCue'

/**
 * Dark-redesign hero (Direction A). Poster-scale display type, white on
 * near-black canvas. Content unchanged from the live Milan Reed hero -
 * only the visual system changes. Eyebrow uses ink-muted, not
 * accent-blue: DESIGN.md is explicit that the blue is never decorative.
 *
 * Pass two: fills the viewport below the 56px sticky header (100svh so
 * mobile browser chrome doesn't clip it), with a scroll cue linking to
 * #about. The hero load animation and headline motion are still a
 * separate, not-yet-built pass-two item.
 */
export default function DarkHero() {
  return (
    <section
      aria-label="Intro"
      className="relative flex h-[calc(100svh-56px)] flex-col justify-center px-dr-xl py-dr-section"
    >
      <div className="mx-auto w-full max-w-[1199px]">
        <p className="mb-dr-md font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
          AI-Native Designer &amp; Developer
        </p>

        <h1 className="max-w-[900px] font-dr-display text-dr-display-xxl text-dr-ink">
          I design things
          <br className="hidden sm:block" />
          {' '}and then build them.
        </h1>

        <p className="mt-dr-lg max-w-[520px] font-dr-body text-dr-body-lg leading-relaxed text-dr-ink-muted">
          Most designers hand off to developers. I skip that step.
          Three-plus years of research, Figma, and shipping real code,
          usually all in the same sprint.
        </p>

        <div className="mt-dr-xl flex flex-wrap gap-dr-sm">
          <a
            href="#work"
            className="rounded-dr-pill bg-dr-primary px-dr-lg py-dr-sm font-dr-body text-dr-caption font-medium text-dr-on-primary no-underline hover:bg-dr-ink-muted"
          >
            See my work
          </a>
        </div>
      </div>

      <ScrollCue />
    </section>
  )
}
