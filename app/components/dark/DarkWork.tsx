import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { projects } from '@/data/projects'
import AssistantTeaserCard from '@/app/components/dark/AssistantTeaserCard'
import ScrollReveal from '@/app/components/dark/ScrollReveal'

/**
 * Dark-redesign work section. Structure:
 *   1. Mini Pancake Co. (featured: true) - full-width highlight
 *   2. BEYOND + Beauty by Amy - 2-up pair
 *   3. "Ask me about my work" - the one gradient-spotlight-card (violet),
 *      dispatches `open-assistant` so the floating Assistant panel opens.
 *      One gradient tile total, per DESIGN.md ("one or two, never three").
 *
 * Screenshot frames: all three real source images are 2560x1600 (16:10).
 * The featured tile previously used aspect-[21/9], which mismatched that
 * ratio and cropped real content - that was the "visible edge/overflow"
 * bug. Every frame now uses the same product-mockup-tile treatment
 * (surface-1, padded, rounded) at the image's true 16:10 ratio, so
 * object-cover never actually crops anything, featured or not.
 *
 * Pass two: each project card lifts slightly on hover (translateY +
 * border color, dr-ease/dr-fast), gated to hover-capable devices and to
 * prefers-reduced-motion. The image itself still doesn't zoom or crop -
 * that was the pass-one bug fix, not something to reintroduce here. The
 * whole grid also fades/slides in once on scroll (ScrollReveal).
 */

const featured = projects.find(p => p.featured)
const rest = projects.filter(p => !p.featured)

function DarkProjectCard({ project, featured: isFeatured }: { project: (typeof projects)[number]; featured?: boolean }) {
  return (
    <Link
      href={`/case-studies/${project.id}`}
      aria-label={`Read case study: ${project.title}`}
      className={`block overflow-hidden rounded-dr-xl border border-dr-hairline bg-dr-surface-1 no-underline transition duration-dr-fast ease-dr-ease motion-safe:[@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-dr-ink-muted ${isFeatured ? 'md:col-span-2' : ''}`}
    >
      {/* product-mockup-tile frame: identical surface/padding/radius on
          all three, image shown at its true 16:10 ratio - no crop. */}
      <div className="p-dr-md">
        <div className="relative aspect-[16/10] overflow-hidden rounded-dr-lg bg-dr-canvas">
          {project.images?.[0] && (
            <Image
              src={project.images[0].src}
              alt={project.title}
              fill
              className="object-cover object-top"
              sizes={isFeatured ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
            />
          )}
        </div>
      </div>

      <div className="px-dr-lg pb-dr-lg">
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
          <ArrowRight size={13} aria-hidden="true" />
        </div>
      </div>
    </Link>
  )
}

export default function DarkWork() {
  return (
    <section id="work" aria-label="Selected work" className="px-dr-xl pb-dr-section">
      <ScrollReveal className="mx-auto grid max-w-[1199px] grid-cols-1 gap-dr-lg md:grid-cols-2">
        {featured && <DarkProjectCard project={featured} featured />}
        {rest.map(p => <DarkProjectCard key={p.id} project={p} />)}
        <AssistantTeaserCard />
      </ScrollReveal>
    </section>
  )
}
