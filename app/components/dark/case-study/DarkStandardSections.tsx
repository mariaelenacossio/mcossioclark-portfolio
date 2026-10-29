import type { Project } from '@/lib/types'
import ScrollReveal from '@/app/components/dark/ScrollReveal'

interface DarkStandardSectionsProps {
  project: Project
}

/**
 * Dark-redesign standard case-study body - used for projects without the
 * featured pivots structure (BEYOND Skincare, Beauty by Amy once it
 * migrates too). Same content/order as the light StandardSections:
 * Problem -> Goal -> Research -> Insights -> Design (iterations + design
 * system) -> Outcome -> Learnings. Overview is intentionally omitted,
 * same reasoning as the light version - the showcase hero's framing
 * already covers it.
 *
 * Every card reuses the bg-dr-surface-1/text-dr-ink-muted pairing
 * already load-bearing across the rest of the dark system (About's
 * pillar cards, HowIWork/Process cards) - verified contrast, not a new
 * pairing. Insight badges are bg-dr-surface-2/text-dr-ink with a
 * dr-hairline ring (not solid white) - solid white is reserved for CTAs
 * and the chosen-option state so it keeps meaning something. Design
 * system swatches keep the project's real hex colors (that's documented
 * fact about BEYOND's own palette, not site decoration - same reasoning
 * as "colors inside screenshots stay") with the hex shown as visible
 * text next to each swatch, so nothing depends on color alone, and a
 * dr-hairline ring instead of the light border.
 *
 * No coral, no invented accent color: the hypothesis callout's border,
 * the iteration version pill, and the "key components" bullet marker
 * all drop their coral in favor of plain dr-hairline/dr-ink-muted.
 */
export default function DarkStandardSections({ project }: DarkStandardSectionsProps) {
  return (
    <>
      <ScrollReveal>
        <section id="problem" className="scroll-mt-24">
          <h2 className="mb-dr-lg font-dr-display text-dr-subhead font-medium text-dr-ink">
            The problem
          </h2>
          <p className="font-dr-body text-dr-body leading-relaxed text-dr-ink-muted">
            {project.problem}
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="goal" className="scroll-mt-24">
          <h2 className="mb-dr-lg font-dr-display text-dr-subhead font-medium text-dr-ink">
            The goal
          </h2>
          <p className="mb-dr-lg font-dr-body text-dr-body leading-relaxed text-dr-ink-muted">
            {project.goal}
          </p>
          <div className="rounded-dr-lg border border-dr-hairline bg-dr-surface-1 p-dr-lg">
            <p className="mb-dr-xs font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
              Hypothesis
            </p>
            <p className="font-dr-body text-dr-body italic leading-relaxed text-dr-ink">
              {project.hypothesis}
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="research" className="scroll-mt-24">
          <h2 className="mb-dr-lg font-dr-display text-dr-subhead font-medium text-dr-ink">
            Research
          </h2>

          <p className="mb-dr-lg font-dr-body text-dr-body leading-relaxed text-dr-ink-muted">
            <span className="font-medium text-dr-ink">Participants: </span>
            {project.research.participants}
          </p>

          <h3 className="mb-dr-md font-dr-display text-dr-body-lg font-medium text-dr-ink">
            Methods
          </h3>
          <ul role="list" className="mb-dr-xl flex flex-col gap-dr-xs">
            {project.research.methods.map(m => (
              <li key={m} className="flex gap-dr-sm font-dr-body text-dr-body leading-relaxed text-dr-ink-muted">
                <span className="shrink-0 text-dr-ink-muted">▸</span> {m}
              </li>
            ))}
          </ul>

          <h3 className="mb-dr-md font-dr-display text-dr-body-lg font-medium text-dr-ink">
            Key findings
          </h3>
          <ol role="list" className="flex flex-col gap-dr-sm">
            {project.research.keyFindings.map((f, i) => (
              <li key={i} className="rounded-dr-lg border border-dr-hairline bg-dr-surface-1 p-dr-lg">
                <div className="flex gap-dr-md">
                  <span className="shrink-0 font-dr-display font-medium text-dr-ink-muted">
                    0{i + 1}
                  </span>
                  <p className="font-dr-body text-dr-body leading-relaxed text-dr-ink">{f}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="insights" className="scroll-mt-24">
          <h2 className="mb-dr-lg font-dr-display text-dr-subhead font-medium text-dr-ink">
            What the research told me
          </h2>
          <div className="grid gap-dr-sm sm:grid-cols-2">
            {project.insights.map((ins, i) => (
              <div key={i} className="rounded-dr-lg border border-dr-hairline bg-dr-surface-1 p-dr-lg">
                <div className="mb-dr-xs flex items-center gap-dr-sm">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-dr-hairline bg-dr-surface-2 font-dr-body text-dr-caption font-bold text-dr-ink">
                    {i + 1}
                  </span>
                  <p className="font-dr-display font-medium text-dr-ink">{ins.label}</p>
                </div>
                <p className="font-dr-body text-dr-body leading-relaxed text-dr-ink-muted">
                  {ins.detail}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="design" className="scroll-mt-24">
          <h2 className="mb-dr-lg font-dr-display text-dr-subhead font-medium text-dr-ink">
            Design
          </h2>

          <h3 className="mb-dr-md font-dr-display text-dr-body-lg font-medium text-dr-ink">
            Iteration
          </h3>
          <div className="mb-dr-xl flex flex-col gap-dr-sm">
            {project.iterations.map((it, i) => (
              <div key={i} className="rounded-dr-lg border border-dr-hairline bg-dr-surface-1 p-dr-lg">
                <div className="mb-dr-sm flex items-center gap-dr-sm">
                  <span className="rounded-dr-pill border border-dr-hairline bg-dr-surface-2 px-dr-sm py-[2px] font-dr-body text-dr-caption font-bold uppercase text-dr-ink-muted">
                    {it.version}
                  </span>
                  <p className="font-dr-body font-semibold text-dr-ink">{it.title}</p>
                </div>
                <div className="grid gap-dr-md md:grid-cols-2">
                  <div>
                    <p className="mb-dr-xxs font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
                      User insight
                    </p>
                    <p className="font-dr-body text-dr-body italic leading-relaxed text-dr-ink-muted">
                      &quot;{it.insight}&quot;
                    </p>
                  </div>
                  <div>
                    <p className="mb-dr-xxs font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
                      Design change
                    </p>
                    <p className="font-dr-body text-dr-body leading-relaxed text-dr-ink-muted">
                      {it.change}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="mb-dr-md font-dr-display text-dr-body-lg font-medium text-dr-ink">
            Design system
          </h3>
          <div className="grid gap-dr-sm md:grid-cols-3">
            {/* Colors - real project hex values, kept as content. Hex
                shown as visible text next to each swatch so nothing
                depends on color alone. */}
            <div className="rounded-dr-lg border border-dr-hairline bg-dr-surface-1 p-dr-lg">
              <p className="mb-dr-sm font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
                Colour palette
              </p>
              <ul role="list" className="flex flex-col gap-dr-xs">
                {project.designSystem.colors.map(c => {
                  const [hex, namePart] = c.split(' (')
                  return (
                    <li key={c} className="flex items-center gap-dr-sm">
                      <span
                        className="h-5 w-5 shrink-0 rounded-dr-xs border border-dr-hairline"
                        style={{ backgroundColor: hex }}
                        aria-hidden="true"
                      />
                      <span className="font-dr-body text-dr-caption text-dr-ink-muted">
                        <span className="font-medium text-dr-ink">{hex}</span>{' '}
                        {namePart?.replace(')', '') || ''}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Typography */}
            <div className="rounded-dr-lg border border-dr-hairline bg-dr-surface-1 p-dr-lg">
              <p className="mb-dr-sm font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
                Typography
              </p>
              <p className="font-dr-body text-dr-body leading-relaxed text-dr-ink-muted">
                {project.designSystem.typography}
              </p>
            </div>

            {/* Components */}
            <div className="rounded-dr-lg border border-dr-hairline bg-dr-surface-1 p-dr-lg">
              <p className="mb-dr-sm font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
                Key components
              </p>
              <ul role="list" className="flex flex-col gap-dr-xs">
                {project.designSystem.components.map(comp => (
                  <li
                    key={comp}
                    className="flex gap-dr-xs font-dr-body text-dr-caption leading-snug text-dr-ink-muted"
                  >
                    <span className="shrink-0 text-dr-ink-muted">▸</span> {comp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="outcome" className="scroll-mt-24">
          <h2 className="mb-dr-lg font-dr-display text-dr-subhead font-medium text-dr-ink">
            Outcome
          </h2>
          <p className="font-dr-body text-dr-body leading-relaxed text-dr-ink-muted">
            {project.outcome}
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="learnings" className="scroll-mt-24">
          <h2 className="mb-dr-lg font-dr-display text-dr-subhead font-medium text-dr-ink">
            What I learned
          </h2>
          <ol role="list" className="flex flex-col gap-dr-md">
            {project.learnings.map((l, i) => (
              <li key={i} className="flex gap-dr-lg rounded-dr-lg border border-dr-hairline bg-dr-surface-1 p-dr-lg">
                <span className="shrink-0 font-dr-display text-dr-subhead font-medium leading-none text-dr-ink-muted">
                  0{i + 1}
                </span>
                <p className="font-dr-body text-dr-body leading-relaxed text-dr-ink">{l}</p>
              </li>
            ))}
          </ol>
        </section>
      </ScrollReveal>
    </>
  )
}
