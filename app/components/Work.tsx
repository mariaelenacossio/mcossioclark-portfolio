import { projects } from '@/data/projects'
import ScrollReveal from '@/app/components/ui/ScrollReveal'
import ProjectCard from '@/app/components/ui/ProjectCard'

/**
 * Editorial Bold MC - Work section.
 *
 *  - bg-ink (dark)
 *  - py-28 md:py-36
 *  - Eyebrow (coral) + Bebas display headline + sub-copy
 *  - 3-col project card grid on desktop, single column mobile
 */
export default function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-ink py-28 md:py-36"
    >
      <div className="container-content">

        <ScrollReveal>
          <span className="font-body text-caption uppercase tracking-widest text-coral">
            Selected work
          </span>
          <h2
            id="work-heading"
            className="mt-3 font-display text-display uppercase leading-none text-paper"
          >
            Three projects. Real problems. Shipped.
          </h2>
          <p className="mt-4 max-w-[500px] font-body text-body-lg text-ghost">
            Each one is a full story from research through to a live product.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {projects.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
