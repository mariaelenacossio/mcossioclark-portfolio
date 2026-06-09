import ScrollReveal from '@/app/components/ui/ScrollReveal'

/**
 * How I work with AI section.
 *
 * Per spec:
 *  - Background --color-paper
 *  - Eyebrow "AI workflow"
 *  - Headline "I don't use AI. I direct it." (display-md)
 *  - Subhead max-w 560
 *  - Three workflow cards in a row (desktop), stacked (mobile)
 *    - Background --color-mist, rounded-card, p-32px
 *    - No shadow, no border
 *    - Left-aligned: step number (coral) + heading + body
 *  - Tool strip below: label "Tools I direct" + pills with brand names
 */

const STEPS = [
  {
    n: '01',
    title: 'Research synthesis',
    body:
      'I feed raw interview transcripts and session recordings into AI pipelines I\'ve built. Themes, patterns, and contradictions surface in minutes instead of days.',
  },
  {
    n: '02',
    title: 'Rapid prototyping',
    body:
      'I describe interaction logic in plain language and get working prototypes back. I review, redirect, and refine — the judgment layer is mine. The production layer is delegated.',
  },
  {
    n: '03',
    title: 'Shipping with agents',
    body:
      'Components, copy variants, accessibility audits — I run these through agent workflows I\'ve configured. I\'m the captain. The agents are the crew.',
  },
] as const

const TOOLS = ['Claude', 'Cursor', 'Framer', 'v0', 'GitHub Copilot', 'Figma AI']

export default function HowIWork() {
  return (
    <section
      id="ai-workflow"
      aria-labelledby="ai-heading"
      className="bg-paper"
    >
      <div className="container-content section">
        {/* Header */}
        <ScrollReveal>
          <p className="eyebrow text-caption">AI workflow</p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2
            id="ai-heading"
            className="mt-4 font-display text-display-md font-semibold text-ink"
          >
            I don't use AI. I direct it.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-5 max-w-[560px] font-body text-body-lg text-muted">
            Most designers use AI to go faster. I use it to go further —
            handling research synthesis, prototype generation, and
            production code while I focus on the decisions that require
            judgment.
          </p>
        </ScrollReveal>

        {/* Three workflow cards */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <ScrollReveal key={s.n} delay={0.1 + i * 0.07}>
              <article className="h-full rounded-card bg-mist p-8">
                <p className="eyebrow text-coral">{s.n}</p>
                <h3 className="mt-3 font-display text-[1.125rem] font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 font-body text-body text-muted">
                  {s.body}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Tool strip */}
        <ScrollReveal delay={0.3}>
          <div className="mt-6 flex flex-col gap-4 rounded-card bg-mist px-8 py-6 md:flex-row md:items-center md:gap-6">
            <p className="eyebrow text-caption shrink-0">Tools I direct</p>
            <ul role="list" className="flex flex-wrap gap-2">
              {TOOLS.map(tool => (
                <li
                  key={tool}
                  className="rounded-pill border border-rule bg-paper px-3.5 py-1.5 font-body text-caption text-caption"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
