import type { Project } from '@/lib/types'

interface StandardSectionsProps {
  project: Project
}

/**
 * Standard case study body for non-featured projects.
 *
 * Section order per spec:
 *   Overview -> Problem -> Goal -> Research -> Insights ->
 *   Design (iterations + design system) -> Outcome -> Learnings
 *
 * Each section has a stable `id` matching the TOC items defined in
 * page.tsx, so the scroll-spy can highlight them.
 */
export default function StandardSections({ project }: StandardSectionsProps) {
  return (
    <>
      {/* ── Overview ─────────────────────────────────────────────────── */}
      <section id="overview" className="scroll-mt-24">
        <h2 className="font-display text-display-md font-semibold text-ink mb-6">
          Overview
        </h2>
        <p className="font-body text-body text-muted leading-[1.7]">
          {project.overview}
        </p>
      </section>

      {/* ── Problem ──────────────────────────────────────────────────── */}
      <section id="problem" className="scroll-mt-24">
        <h2 className="font-display text-display-md font-semibold text-ink mb-6">
          The problem
        </h2>
        <p className="font-body text-body text-muted leading-[1.7]">
          {project.problem}
        </p>
      </section>

      {/* ── Goal ─────────────────────────────────────────────────────── */}
      <section id="goal" className="scroll-mt-24">
        <h2 className="font-display text-display-md font-semibold text-ink mb-6">
          The goal
        </h2>
        <p className="font-body text-body text-muted leading-[1.7] mb-6">
          {project.goal}
        </p>
        <div className="rounded-card border-l-[3px] border-coral bg-mist p-6">
          <p className="eyebrow text-coral mb-2">Hypothesis</p>
          <p className="font-body text-body text-ink leading-[1.7] italic">
            {project.hypothesis}
          </p>
        </div>
      </section>

      {/* ── Research ─────────────────────────────────────────────────── */}
      <section id="research" className="scroll-mt-24">
        <h2 className="font-display text-display-md font-semibold text-ink mb-6">
          Research
        </h2>

        <p className="font-body text-body text-muted leading-[1.7] mb-6">
          <span className="font-medium text-ink">Participants: </span>
          {project.research.participants}
        </p>

        <h3 className="font-display text-[1.375rem] font-semibold text-ink mb-4">
          Methods
        </h3>
        <ul role="list" className="flex flex-col gap-2 mb-8">
          {project.research.methods.map(m => (
            <li key={m} className="flex gap-3 font-body text-body text-muted leading-[1.6]">
              <span className="text-coral shrink-0">▸</span> {m}
            </li>
          ))}
        </ul>

        <h3 className="font-display text-[1.375rem] font-semibold text-ink mb-4">
          Key findings
        </h3>
        <ol role="list" className="flex flex-col gap-3">
          {project.research.keyFindings.map((f, i) => (
            <li key={i} className="rounded-card border border-rule bg-mist p-5">
              <div className="flex gap-4">
                <span className="font-display text-coral font-bold shrink-0">
                  0{i + 1}
                </span>
                <p className="font-body text-body text-ink leading-[1.6]">{f}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Insights ─────────────────────────────────────────────────── */}
      <section id="insights" className="scroll-mt-24">
        <h2 className="font-display text-display-md font-semibold text-ink mb-6">
          What the research told me
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {project.insights.map((ins, i) => (
            <div key={i} className="rounded-card border border-rule bg-mist p-6">
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-coral font-display text-caption font-bold text-paper">
                  {i + 1}
                </span>
                <p className="font-display text-ink font-semibold">{ins.label}</p>
              </div>
              <p className="font-body text-body text-muted leading-[1.6]">
                {ins.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Design (iterations + design system) ──────────────────────── */}
      <section id="design" className="scroll-mt-24">
        <h2 className="font-display text-display-md font-semibold text-ink mb-6">
          Design
        </h2>

        <h3 className="font-display text-[1.375rem] font-semibold text-ink mb-4">
          Iteration
        </h3>
        <div className="flex flex-col gap-4 mb-10">
          {project.iterations.map((it, i) => (
            <div
              key={i}
              className="rounded-card border border-rule bg-paper p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="rounded-pill bg-coral/10 px-2.5 py-1 font-display text-caption font-bold uppercase text-coral">
                  {it.version}
                </span>
                <p className="font-display font-semibold text-ink">{it.title}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="eyebrow text-caption mb-1.5">User insight</p>
                  <p className="font-body text-body text-muted leading-[1.6] italic">
                    "{it.insight}"
                  </p>
                </div>
                <div>
                  <p className="eyebrow text-caption mb-1.5">Design change</p>
                  <p className="font-body text-body text-muted leading-[1.6]">
                    {it.change}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-display text-[1.375rem] font-semibold text-ink mb-4">
          Design system
        </h3>
        <div className="grid gap-5 md:grid-cols-3 mb-6">
          {/* Colors */}
          <div className="rounded-card border border-rule bg-mist p-5">
            <p className="eyebrow text-caption mb-3">Colour palette</p>
            <ul role="list" className="flex flex-col gap-2">
              {project.designSystem.colors.map(c => {
                const [hex, namePart] = c.split(' (')
                return (
                  <li key={c} className="flex items-center gap-2.5">
                    <span
                      className="h-5 w-5 shrink-0 rounded border border-rule"
                      style={{ backgroundColor: hex }}
                      aria-hidden="true"
                    />
                    <span className="font-body text-caption text-caption">
                      {namePart?.replace(')', '') || hex}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Typography */}
          <div className="rounded-card border border-rule bg-mist p-5">
            <p className="eyebrow text-caption mb-3">Typography</p>
            <p className="font-body text-body text-muted leading-[1.6]">
              {project.designSystem.typography}
            </p>
          </div>

          {/* Components */}
          <div className="rounded-card border border-rule bg-mist p-5">
            <p className="eyebrow text-caption mb-3">Key components</p>
            <ul role="list" className="flex flex-col gap-1.5">
              {project.designSystem.components.map(comp => (
                <li
                  key={comp}
                  className="flex gap-1.5 font-body text-caption text-caption leading-snug"
                >
                  <span className="text-coral">▸</span> {comp}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Outcome ──────────────────────────────────────────────────── */}
      <section id="outcome" className="scroll-mt-24">
        <h2 className="font-display text-display-md font-semibold text-ink mb-6">
          Outcome
        </h2>
        <p className="font-body text-body text-muted leading-[1.7]">
          {project.outcome}
        </p>
      </section>

      {/* ── Learnings ────────────────────────────────────────────────── */}
      <section id="learnings" className="scroll-mt-24">
        <h2 className="font-display text-display-md font-semibold text-ink mb-6">
          What I learned
        </h2>
        <ol role="list" className="flex flex-col gap-4">
          {project.learnings.map((l, i) => (
            <li key={i} className="flex gap-5 rounded-card border border-rule bg-mist p-6">
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
