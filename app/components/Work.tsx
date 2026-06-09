import { projects } from '@/data/projects'
import ScrollReveal from '@/app/components/ui/ScrollReveal'
import ProjectCard from '@/app/components/ui/ProjectCard'

/**
 * Work / Selected work section.
 *
 * Per spec:
 *  - Background --color-mist (alternating section tone)
 *  - Eyebrow + headline (display-lg) + sub-copy
 *  - Project grid: 2 columns desktop, 1 column mobile, gap 24px
 *  - Project order is owned by `data/projects.ts` (mini-pancake first)
 */
export default function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-mist"
    >
      <div className="container-content section">
        {/* Header */}
        <ScrollReveal>
          <p className="eyebrow text-caption">Selected work</p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2
            id="work-heading"
            className="mt-4 font-display text-display-lg font-bold text-ink"
          >
            Four projects. Real problems. Shipped.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-5 max-w-xl font-body text-body-lg text-muted">
            Each one is a full story — from research through to a live product.
          </p>
        </ScrollReveal>

        {/* Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ScrollReveal key={p.id} delay={0.1 + i * 0.06}>
              <ProjectCard project={p} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
