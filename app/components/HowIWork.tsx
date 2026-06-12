import ScrollReveal from '@/app/components/ui/ScrollReveal'

/**
 * Editorial Bold MC - How I Work With AI.
 *
 *  - bg-paper, py-28 md:py-36
 *  - Eyebrow (coral) + Bebas display headline
 *  - 3 stone cards with giant ghost numbers in the corner + content
 *  - Tool strip below: label + 6 pill chips
 */

const STEPS = [
  {
    n: '01',
    label: 'Research synthesis',
    body: "I feed raw interview transcripts into pipelines I've built. Themes and patterns surface in minutes. The judgment on what matters is still mine.",
  },
  {
    n: '02',
    label: 'Rapid prototyping',
    body: 'I describe interaction logic and get working prototypes back. I review, redirect, and refine. The thinking layer is mine. The production layer is delegated.',
  },
  {
    n: '03',
    label: 'Shipping with agents',
    body: 'Components, copy, accessibility audits. Agent workflows handle the repeatable work. I decide what gets built. Not how many hours it takes.',
  },
] as const

const TOOLS = ['Claude', 'Cursor', 'v0', 'Framer', 'GitHub Copilot', 'Figma AI']

export default function HowIWork() {
  return (
    <section
      id="ai-workflow"
      aria-labelledby="ai-heading"
      className="bg-paper py-28 md:py-36"
    >
      <div className="container-content">

        <ScrollReveal>
          <span className="font-body text-caption uppercase tracking-widest text-coral">
            AI workflow
          </span>
          <h2
            id="ai-heading"
            className="mt-3 max-w-[900px] font-display text-display uppercase leading-none text-ink"
          >
            Other designers use AI to go faster. I use it to do things I couldn&apos;t do alone.
          </h2>

          {/* Three cards */}
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {STEPS.map(s => (
              <article
                key={s.n}
                className="relative overflow-hidden rounded-2xl bg-stone p-8"
              >
                {/* Giant ghost number in the corner */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-2 select-none font-display text-[6rem] leading-none text-ink/5"
                >
                  {s.n}
                </span>

                <p className="relative font-body text-caption uppercase tracking-widest text-coral">
                  Step {s.n}
                </p>
                <h3 className="relative mt-2 font-display text-title uppercase leading-none text-ink">
                  {s.label}
                </h3>
                <p className="relative mt-3 font-body text-body leading-relaxed text-ghost">
                  {s.body}
                </p>
              </article>
            ))}
          </div>

          {/* Tool strip */}
          <div className="mt-8">
            <p className="mb-3 font-body text-caption uppercase tracking-widest text-ghost">
              Tools I direct
            </p>
            <ul role="list" className="flex flex-wrap gap-2">
              {TOOLS.map(tool => (
                <li
                  key={tool}
                  className="rounded-full border border-stone bg-stone px-4 py-1.5 font-body text-caption text-ghost"
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
