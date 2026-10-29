import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ChevronDown, ExternalLink, Github } from 'lucide-react'
import type { Project, ProjectImage } from '@/lib/types'
import DarkImageGallery from './DarkImageGallery'
import DarkFeaturedSections from './DarkFeaturedSections'
import DarkStandardSections from './DarkStandardSections'
import ScrollReveal from '@/app/components/dark/ScrollReveal'

interface DarkCaseStudyShowcaseProps {
  project: Project
  images: ProjectImage[]
}

/**
 * Dark-redesign showcase-first case-study body. Same structure/content
 * as the light ShowcaseCaseStudy: hero visual leads, one-line outcome,
 * framing, meta/CTAs/metrics, supporting gallery, then everything
 * deeper behind a single native <details> "Read the full breakdown" -
 * same mechanism as the light page (no JS, no sticky TOC), restyled on
 * dr- tokens with the chevron's rotate transition on the motion tokens.
 *
 * Branches the same way the light ShowcaseCaseStudy does: a project
 * with pivots (Mini Pancake Co.) gets DarkFeaturedSections, everyone
 * else gets DarkStandardSections (BEYOND Skincare, and Beauty by Amy
 * once it migrates).
 *
 * Color notes (no coral, no invented accents):
 *  - category eyebrow was per-project brand hex -> dr-ink-muted, same
 *    as every other eyebrow on the dark system
 *  - "Outcome" label/metric values were coral -> dr-ink-muted label,
 *    dr-ink value, no color-coding
 */
export default function DarkCaseStudyShowcase({ project, images }: DarkCaseStudyShowcaseProps) {
  const showcase   = project.showcase
  const hero       = (showcase?.heroSrc && images.find(i => i.src === showcase.heroSrc)) || images[0]
  const supporting = images.filter(i => i !== hero)
  const hasPivots  = !!(project.featured && project.pivots?.length)

  return (
    <>
      <div className="px-dr-xl pt-dr-xl">
        <Link
          href="/#work"
          className="inline-flex items-center gap-dr-xxs font-dr-body text-dr-caption text-dr-ink-muted no-underline transition duration-dr-fast ease-dr-ease [@media(hover:hover)]:hover:text-dr-ink"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to work
        </Link>
      </div>

      <ScrollReveal className="px-dr-xl pb-dr-xl pt-dr-lg md:pb-dr-xxl">
        <div className="mx-auto max-w-[1040px]">
          <p className="font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
            {project.category}
          </p>

          <h1 className="mt-dr-sm font-dr-display text-dr-display-lg text-dr-ink">
            {project.title}
          </h1>

          {hero && (
            <figure className="m-0 mt-dr-xl">
              <div className="rounded-dr-xl border border-dr-hairline bg-dr-surface-1 p-dr-md">
                <div className="relative aspect-[16/10] overflow-hidden rounded-dr-lg bg-dr-canvas">
                  <Image
                    src={hero.src}
                    alt={hero.alt}
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 1040px"
                  />
                </div>
              </div>
              <figcaption className="mt-dr-sm text-center font-dr-body text-dr-caption text-dr-ink-muted">
                {hero.caption}
              </figcaption>
            </figure>
          )}

          {showcase?.outcome && (
            <>
              <p className="mt-dr-xxl font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
                Outcome
              </p>
              <p className="mt-dr-xs max-w-[760px] font-dr-display text-dr-display-md text-dr-ink">
                {showcase.outcome}
              </p>
            </>
          )}

          <p className="mt-dr-md max-w-[640px] font-dr-body text-dr-body-lg leading-relaxed text-dr-ink-muted">
            {showcase?.framing ?? project.shortDescription}
          </p>

          <ul role="list" className="mt-dr-lg flex flex-wrap gap-dr-xs">
            {[
              { k: 'Year',     v: project.year     },
              { k: 'Duration', v: project.duration },
              { k: 'Team',     v: project.team     },
              { k: 'Role',     v: project.role     },
            ].map(({ k, v }) => (
              <li
                key={k}
                className="rounded-dr-pill border border-dr-hairline bg-dr-surface-1 px-dr-md py-dr-xxs font-dr-body text-dr-caption text-dr-ink-muted"
              >
                <span className="font-medium text-dr-ink">{k}:</span> {v}
              </li>
            ))}
          </ul>

          {(project.liveUrl || project.repoUrl) && (
            <div className="mt-dr-lg flex flex-wrap gap-dr-sm">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-dr-xs rounded-dr-pill bg-dr-primary px-dr-lg py-dr-sm font-dr-body text-dr-caption font-medium text-dr-on-primary no-underline transition duration-dr-fast ease-dr-ease [@media(hover:hover)]:hover:bg-dr-ink-muted active:scale-95"
                >
                  {project.liveLabel ?? 'View live site'}
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-dr-xs rounded-dr-pill border border-dr-hairline px-dr-lg py-dr-sm font-dr-body text-dr-caption text-dr-ink no-underline transition duration-dr-fast ease-dr-ease [@media(hover:hover)]:hover:border-dr-ink-muted active:scale-95"
                >
                  <Github size={14} aria-hidden="true" />
                  View source
                </a>
              )}
            </div>
          )}

          <div className="mt-dr-xl grid grid-cols-2 gap-dr-md rounded-dr-xl border border-dr-hairline bg-dr-surface-1 p-dr-lg md:grid-cols-4">
            {project.metrics.map(m => (
              <div key={m.label}>
                <div className="font-dr-display text-dr-subhead font-medium leading-none text-dr-ink">
                  {m.value}
                </div>
                <div className="mt-dr-xxs font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {supporting.length > 0 && (
        <ScrollReveal className="mx-auto max-w-[1040px] px-dr-xl">
          <DarkImageGallery images={supporting} />
        </ScrollReveal>
      )}

      <div className="px-dr-xl pb-dr-xxl pt-dr-xl md:pb-[128px]">
        <div className="mx-auto max-w-[760px]">
          <details className="group border-t border-dr-hairline pt-dr-lg">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-dr-md rounded-dr-md py-dr-xs font-dr-display text-dr-subhead font-medium text-dr-ink transition duration-dr-fast ease-dr-ease [@media(hover:hover)]:hover:text-dr-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dr-accent-blue [&::-webkit-details-marker]:hidden">
              Read the full breakdown
              <ChevronDown
                size={24}
                aria-hidden="true"
                className="shrink-0 text-dr-ink-muted motion-safe:transition-transform motion-safe:duration-dr-fast motion-safe:ease-dr-ease group-open:rotate-180"
              />
            </summary>
            <div className="hidden group-open:block">
              <div className="mt-dr-xl flex flex-col gap-dr-xxl">
                {hasPivots
                  ? <DarkFeaturedSections project={project} />
                  : <DarkStandardSections project={project} />
                }
              </div>
            </div>
          </details>
        </div>
      </div>
    </>
  )
}
