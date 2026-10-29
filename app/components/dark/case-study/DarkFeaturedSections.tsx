import type { Project } from '@/lib/types'
import DarkPivotSection from './DarkPivotSection'
import ScrollReveal from '@/app/components/dark/ScrollReveal'

interface DarkFeaturedSectionsProps {
  project: Project
}

/**
 * Dark-redesign featured case-study body - used for Mini Pancake Co.,
 * the only project with `pivots`/`techStack` defined so far. Same
 * content/order as the light FeaturedSections: brief -> pivots -> tech
 * stack -> outcome -> learnings. This is the deep content behind the
 * showcase page's "Read the full breakdown" expand.
 *
 * Each top-level section gets its own ScrollReveal, same granularity as
 * the homepage sections.
 */
export default function DarkFeaturedSections({ project }: DarkFeaturedSectionsProps) {
  return (
    <>
      <ScrollReveal>
        <section id="brief" className="scroll-mt-24">
          <h2 className="mb-dr-lg font-dr-display text-dr-subhead font-medium text-dr-ink">
            The brief
          </h2>

          <div className="mb-dr-md rounded-dr-lg border border-dr-hairline bg-dr-surface-1 p-dr-lg">
            <p className="mb-dr-xs font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
              The problem
            </p>
            <p className="font-dr-body text-dr-body leading-relaxed text-dr-ink">
              {project.problem}
            </p>
          </div>

          <div className="rounded-dr-lg border border-dr-hairline bg-dr-surface-1 p-dr-lg">
            <p className="mb-dr-xs font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
              The goal
            </p>
            <p className="font-dr-body text-dr-body leading-relaxed text-dr-ink">
              {project.goal}
            </p>
          </div>
        </section>
      </ScrollReveal>

      {project.pivots?.map(pivot => (
        <DarkPivotSection key={pivot.n} pivot={pivot} id={`pivot-${pivot.n}`} />
      ))}

      {project.techStack && project.techStack.length > 0 && (
        <ScrollReveal>
          <section id="tech-stack" className="scroll-mt-24">
            <h2 className="mb-dr-lg font-dr-display text-dr-subhead font-medium text-dr-ink">
              The stack
            </h2>
            <p className="mb-dr-lg font-dr-body text-dr-body leading-relaxed text-dr-ink-muted">
              Each tool earned its place. Here&apos;s why.
            </p>
            <div className="grid gap-dr-sm md:grid-cols-2">
              {project.techStack.map((t, i) => (
                <article key={t.name} className="rounded-dr-lg border border-dr-hairline bg-dr-surface-1 p-dr-lg">
                  <div className="flex items-start gap-dr-sm">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-dr-md bg-dr-surface-2 font-dr-display text-dr-ink-muted">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-dr-body font-semibold text-dr-ink">{t.name}</p>
                      <p className="mt-dr-xxs font-dr-body text-dr-body leading-relaxed text-dr-ink-muted">
                        {t.why}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}

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
