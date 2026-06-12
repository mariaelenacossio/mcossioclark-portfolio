import type { Project } from '@/lib/types'
import PivotSection from './PivotSection'

interface FeaturedSectionsProps {
  project: Project
}

/**
 * Featured-project case study body - used for projects with
 * `pivots` + `techStack` arrays defined (Mini Pancake Co.).
 *
 * Section order:
 *   Overview -> Brief (problem + goal) -> 3 pivots ->
 *   Tech stack -> Outcome -> Learnings
 *
 * Each section gets a stable `id` that matches the TOC items
 * declared by page.tsx, so the scroll-spy sidebar lights up
 * the right entry.
 */
export default function FeaturedSections({ project }: FeaturedSectionsProps) {
  return (
    <>
      {/* ── Overview ─────────────────────────────────────────────────── */}
      <section id="overview" className="scroll-mt-24">
        <h2 className="font-display text-display uppercase text-ink mb-6">
          Overview
        </h2>
        <p className="font-body text-body text-ghost leading-[1.7]">
          {project.overview}
        </p>
      </section>

      {/* ── The brief (problem + goal stacked) ───────────────────────── */}
      <section id="brief" className="scroll-mt-24">
        <h2 className="font-display text-display uppercase text-ink mb-6">
          The brief
        </h2>

        <div className="rounded-card border-l-[3px] border-coral bg-stone p-6 mb-6">
          <p className="font-body text-caption uppercase tracking-widest text-coral mb-2">The problem</p>
          <p className="font-body text-body text-ink leading-[1.7]">
            {project.problem}
          </p>
        </div>

        <div className="rounded-card border-l-[3px] border-ink bg-stone p-6">
          <p className="eyebrow text-ghost mb-2">The goal</p>
          <p className="font-body text-body text-ink leading-[1.7]">
            {project.goal}
          </p>
        </div>
      </section>

      {/* ── Pivots ──────────────────────────────────────────────────── */}
      {project.pivots?.map(pivot => (
        <PivotSection
          key={pivot.n}
          pivot={pivot}
          id={`pivot-${pivot.n}`}
        />
      ))}

      {/* ── Tech stack ──────────────────────────────────────────────── */}
      {project.techStack && project.techStack.length > 0 && (
        <section id="tech-stack" className="scroll-mt-24">
          <h2 className="font-display text-display uppercase text-ink mb-6">
            The stack
          </h2>
          <p className="font-body text-body text-ghost leading-[1.7] mb-6">
            Each tool earned its place. Here's why.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {project.techStack.map((t, i) => (
              <article
                key={t.name}
                className="rounded-card border border-stone bg-stone p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-button bg-coral/10 font-display font-bold text-coral">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-ink">{t.name}</p>
                    <p className="mt-1 font-body text-body text-ghost leading-[1.6]">
                      {t.why}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── Outcome ──────────────────────────────────────────────────── */}
      <section id="outcome" className="scroll-mt-24">
        <h2 className="font-display text-display uppercase text-ink mb-6">
          Outcome
        </h2>
        <p className="font-body text-body text-ghost leading-[1.7]">
          {project.outcome}
        </p>
      </section>

      {/* ── Learnings ────────────────────────────────────────────────── */}
      <section id="learnings" className="scroll-mt-24">
        <h2 className="font-display text-display uppercase text-ink mb-6">
          What I learned
        </h2>
        <ol role="list" className="flex flex-col gap-4">
          {project.learnings.map((l, i) => (
            <li key={i} className="flex gap-5 rounded-card border border-stone bg-stone p-6">
              <span className="font-display text-[1.75rem] font-bold leading-none text-coral shrink-0">
                0{i + 1}
              </span>
              <p className="font-body text-body text-ink leading-[1.7]">{l}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
