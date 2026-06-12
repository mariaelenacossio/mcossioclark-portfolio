import { projects } from '@/data/projects'
import ScrollReveal from '@/app/components/ui/ScrollReveal'
import ProjectCard from '@/app/components/ui/ProjectCard'

/**
 * Work / Selected work. Paper background, warm cards with real
 * screenshots, italic serif headline.
 */
export default function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-paper py-24 md:py-32"
    >
      <div className="container-content">
        <ScrollReveal>
          <span className="font-body text-caption uppercase tracking-widest text-coral">
            Selected work
          </span>

          <h2
            id="work-heading"
            className="mt-3 font-display text-display italic leading-tight text-ink"
          >
            Three projects I&apos;m genuinely proud of.
          </h2>

          <p className="mt-4 max-w-[460px] font-body text-body-lg leading-relaxed text-ghost">
            Real problems, real products, real code. Each one took
            longer than expected and came out better than planned.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {projects.map(p => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
