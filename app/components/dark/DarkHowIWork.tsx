import ScrollReveal from '@/app/components/dark/ScrollReveal'

/**
 * Dark-redesign "How I work with AI" section. Same content/copy as the
 * live HowIWork.tsx. Pass two: fades/slides in once on scroll (ScrollReveal).
 */
const STEPS = [
  {
    number: '01',
    title: 'Research synthesis',
    body: 'I feed raw interview transcripts into pipelines I have built. Themes surface in minutes. What I do with them takes longer.',
  },
  {
    number: '02',
    title: 'Rapid prototyping',
    body: 'Describe the interaction, get a working prototype back. Review, redirect, refine. The judgment is mine. The production layer is delegated.',
  },
  {
    number: '03',
    title: 'Shipping with agents',
    body: 'Components, copy variants, accessibility audits. I am the captain. The agents are the crew. Someone still has to know where the ship is going.',
  },
] as const

const TOOLS = ['Claude', 'Cursor', 'v0', 'Framer', 'GitHub Copilot', 'Figma AI']

export default function DarkHowIWork() {
  return (
    <section id="ai-workflow" aria-labelledby="ai-heading" className="bg-dr-surface-1 px-dr-xl py-dr-section">
      <ScrollReveal className="mx-auto max-w-[1199px]">
        <span className="font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
          How I work with AI
        </span>

        <h2 id="ai-heading" className="mt-dr-sm max-w-[680px] font-dr-display text-dr-display-md text-dr-ink">
          I use AI the way a director uses a crew.
        </h2>

        <p className="mt-dr-md max-w-[540px] font-dr-body text-dr-body-lg leading-relaxed text-dr-ink-muted">
          I&apos;m not faster because of AI. I&apos;m capable of more.
          Research synthesis, rapid prototyping, accessibility audits,
          I have agent workflows for all of it. My job is knowing what
          to build and whether the output is any good.
        </p>

        <div className="mt-dr-xl grid grid-cols-1 gap-dr-lg md:grid-cols-3">
          {STEPS.map(step => (
            <div key={step.number} className="relative overflow-hidden rounded-dr-xl bg-dr-surface-2 p-dr-xl">
              <span
                className="pointer-events-none absolute -right-1 -top-3 select-none font-dr-display text-[7rem] font-medium leading-none text-dr-ink/5"
                aria-hidden="true"
              >
                {step.number}
              </span>

              <span className="font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
                {step.number}
              </span>

              <h3 className="mt-dr-xs font-dr-display text-dr-subhead font-medium text-dr-ink">
                {step.title}
              </h3>

              <p className="mt-dr-sm font-dr-body text-dr-body leading-relaxed text-dr-ink-muted">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-dr-xl">
          <p className="mb-dr-sm font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
            Tools I direct
          </p>
          <div className="flex flex-wrap gap-dr-xs">
            {TOOLS.map(tool => (
              <span key={tool} className="rounded-dr-pill border border-dr-hairline bg-dr-canvas px-dr-md py-dr-xxs font-dr-body text-dr-caption text-dr-ink-muted">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
