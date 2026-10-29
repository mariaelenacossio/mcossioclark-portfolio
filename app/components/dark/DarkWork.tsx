import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { projects } from '@/data/projects'
import AssistantTeaserCard from '@/app/components/dark/AssistantTeaserCard'

/**
 * Dark-redesign work section (Direction A). No About/Process section
 * between Hero and this - work starts immediately. Structure:
 *   1. Mini Pancake Co. (featured: true) - full-width highlight
 *   2. BEYOND + Beauty by Amy - 2-up pair
 *   3. "Ask me about my work" - the one gradient-spotlight-card (violet),
 *      dispatches `open-assistant` so the floating Assistant panel opens.
 *      One gradient tile total, per DESIGN.md ("one or two, never three").
 */

const featured = projects.find(p => p.featured)
const rest = projects.filter(p => !p.featured)

function DarkProjectCard({ project, featured: isFeatured }: { project: (typeof projects)[number]; featured?: boolean }) {
  return (
    <Link
      href={`/case-studies/${project.id}`}
      aria-label={`Read case study: ${project.title}`}
      className={`group block overflow-hidden rounded-dr-xl border border-dr-hairline bg-dr-surface-1 no-underline transition-colors duration-150 hover:border-dr-ink-muted ${isFeatured ? 'md:col-span-2' : ''}`}
    >
      <div className={`relative overflow-hidden ${isFeatured ? 'aspect-[21/9]' : 'aspect-[16/10]'}`}>
        {project.images?.[0] && (
          <Image
            src={project.images[0].src}
            alt={project.title}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            sizes={isFeatured ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
          />
        )}
      </div>

      <div className="p-dr-lg">
        <div className="flex items-center gap-dr-xs font-dr-body text-dr-caption text-dr-ink-muted">
          <span>{project.year}</span>
          <span aria-hidden="true">·</span>
          <span>{project.category}</span>
        </div>

        <h3 className={`mt-dr-xs font-dr-display font-medium text-dr-ink ${isFeatured ? 'text-dr-display-md' : 'text-dr-subhead'}`}>
          {project.title}
        </h3>

        <p className="mt-dr-xs max-w-[520px] font-dr-body text-dr-body text-dr-ink-muted">
          {project.shortDescription}
        </p>

        <div className="mt-dr-md flex items-center gap-dr-xxs font-dr-body text-dr-caption font-medium text-dr-ink">
          Read case study
          <ArrowRight size={13} aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

export default function DarkWork() {
  return (
    <section id="work" aria-label="Selected work" className="px-dr-xl pb-dr-section">
      <div className="mx-auto grid max-w-[1199px] grid-cols-1 gap-dr-lg md:grid-cols-2">
        {featured && <DarkProjectCard project={featured} featured />}
        {rest.map(p => <DarkProjectCard key={p.id} project={p} />)}
        <AssistantTeaserCard />
      </div>
    </section>
  )
}
