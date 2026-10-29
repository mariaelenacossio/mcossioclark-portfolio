/**
 * Dark-redesign hero (Direction A). Poster-scale display type, white on
 * near-black canvas. Content unchanged from the live Milan Reed hero -
 * only the visual system changes. Eyebrow uses ink-muted, not
 * accent-blue: DESIGN.md is explicit that the blue is never decorative.
 */
export default function DarkHero() {
  return (
    <section
      aria-label="Intro"
      className="flex min-h-[70vh] flex-col justify-center px-dr-xl py-dr-section"
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
            className="rounded-dr-pill bg-dr-primary px-dr-lg py-dr-sm font-dr-body text-dr-caption font-medium text-dr-on-primary no-underline transition-colors duration-150 hover:bg-dr-ink-muted"
          >
            See my work
          </a>
        </div>
      </div>
    </section>
  )
}
