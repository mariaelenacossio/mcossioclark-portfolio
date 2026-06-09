import { Search, Code2, Layers, Cpu } from 'lucide-react'
import ScrollReveal from '@/app/components/ui/ScrollReveal'

/**
 * About section.
 *
 * Per spec:
 *  - Background --color-paper
 *  - 2-col desktop (45/55), 1-col mobile
 *  - Left: eyebrow + headline (display-md, max-w 400) + 3 paragraphs
 *    of body copy + 4 pill tags
 *  - Right: 4 pillar cards in a 2x2 grid (background --color-mist,
 *    rounded-card, shadow-card, hover lift -4px)
 */

const PILLARS = [
  {
    icon: Search,
    title: 'Research first',
    desc: 'I talk to users before I touch Figma.',
  },
  {
    icon: Code2,
    title: 'Code fluency',
    desc: 'I know what\'s painful to build. It changes how I design.',
  },
  {
    icon: Layers,
    title: 'Systems thinking',
    desc: 'Components, tokens, patterns — not one-off screens.',
  },
  {
    icon: Cpu,
    title: 'AI direction',
    desc: 'I run agents. I don\'t just use tools.',
  },
] as const

const TAGS = [
  'Vancouver, BC',
  'Open to remote',
  'Bilingual EN / ES',
  'Design + Code',
]

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-paper"
    >
      <div className="container-content section">
        <div className="grid items-start gap-12 lg:grid-cols-[45fr_55fr] lg:gap-20">

          {/* ── Left column: copy ────────────────────────────────────── */}
          <div>
            <ScrollReveal>
              <p className="eyebrow text-caption">About</p>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <h2
                id="about-heading"
                className="mt-4 max-w-[400px] font-display text-display-md font-semibold text-ink"
              >
                I close the gap between how something should work and how it gets built.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="mt-8 font-body text-body text-muted">
                I'm a UX/UI Designer and Frontend Engineer based in Vancouver. I research before I open Figma, design for real constraints, and write the code when the handoff matters.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="mt-5 font-body text-body text-muted">
                I've shipped across e-commerce, SaaS, and service businesses. The industry changes. The process doesn't: understand what users actually need — not what the brief assumes — then build for that.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mt-5 font-body text-body text-muted">
                I also direct AI agents as part of my production workflow. Not as a shortcut — as a capability multiplier. It's changed what one person can ship in a sprint.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <ul role="list" className="mt-8 flex flex-wrap gap-2">
                {TAGS.map(tag => (
                  <li
                    key={tag}
                    className="rounded-pill border border-rule bg-mist px-3.5 py-1.5 font-body text-caption text-caption"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* ── Right column: 2x2 pillar grid ────────────────────────── */}
          <div className="grid gap-4 sm:grid-cols-2">
            {PILLARS.map((p, i) => {
              const Icon = p.icon
              return (
                <ScrollReveal key={p.title} delay={0.1 + i * 0.08}>
                  <article
                    className="h-full rounded-card bg-mist p-7 shadow-card transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-card-hover"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center text-coral">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-[1.125rem] font-semibold text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-2 font-body text-body text-muted">
                      {p.desc}
                    </p>
                  </article>
                </ScrollReveal>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
