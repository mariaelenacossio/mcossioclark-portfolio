import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ChevronDown, ExternalLink, Github } from 'lucide-react'
import { projects, getProject } from '@/data/projects'
import type { Project, ProjectImage } from '@/lib/types'
import FeaturedSections from './components/FeaturedSections'
import StandardSections from './components/StandardSections'
import ImageGallery from './components/ImageGallery'

/**
 * Server-side filter - only keep images whose source files exist under
 * /public. Runs at build time. Lets the user drop a screenshot into
 * public/projects/<slug>/ and have it appear on next deploy with no
 * code change.
 */
function existingImages(images: ProjectImage[] | undefined): ProjectImage[] {
  if (!images || images.length === 0) return []
  const publicDir = path.join(process.cwd(), 'public')
  return images.filter(img => {
    try {
      return fs.existsSync(path.join(publicDir, img.src))
    } catch {
      return false
    }
  })
}

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export function generateMetadata(
  { params }: { params: { slug: string } },
): Metadata {
  const project = getProject(params.slug)
  if (!project) return {}

  const url = `https://www.mariaelena-cossioclark.com/case-studies/${project.slug}`
  const title = `${project.title} · Case study · Mariaelena Cossio Clark`

  return {
    title,
    description: project.shortDescription,
    openGraph: {
      title,
      description: project.shortDescription,
      url,
      siteName: 'Mariaelena Cossio Clark',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.shortDescription,
    },
    alternates: { canonical: url },
  }
}

/**
 * Case-study page. Every project renders showcase-first: strongest visual
 * leads, one-line outcome under it, ≤3 sentences of framing, then
 * meta/CTAs/metrics and the supporting screenshots, with all the deep
 * content behind a single "Read the full breakdown" expand. No sticky TOC.
 */
export default function CaseStudyPage(
  { params }: { params: { slug: string } },
) {
  const project = getProject(params.slug)
  if (!project) notFound()

  const images = existingImages(project.images)

  return (
    <main id="main-content" className="bg-paper pt-24">
      {/* Back link */}
      <div className="container-content pt-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-1.5 font-body text-sm text-ghost transition-colors duration-150 hover:text-coral no-underline"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to work
        </Link>
      </div>

      <ShowcaseCaseStudy project={project} images={images} />

      {/* Next case study */}
      <NextProjectCta currentSlug={project.slug} />
    </main>
  )
}

/* ─── Showcase-first layout ─────────────────────────────────────────────
   Strongest visual leads, one-line outcome under it, ≤3 sentences of
   framing, then meta/CTAs/metrics. Supporting screenshots stay on the
   default path. Everything deeper sits behind a single "Read the full
   breakdown" expand: the featured project (pivots) gets FeaturedSections,
   everyone else gets StandardSections. No sticky TOC, with the deep
   content collapsed, there's nothing for a sidebar to scaffold. */
function ShowcaseCaseStudy(
  { project, images }: { project: Project; images: ProjectImage[] },
) {
  const showcase   = project.showcase
  // Lead with the designated hero (or the first image), and let the rest
  // fall through to the supporting gallery in their original order.
  const hero       = (showcase?.heroSrc && images.find(i => i.src === showcase.heroSrc)) || images[0]
  const supporting = images.filter(i => i !== hero)
  const hasPivots  = !!(project.featured && project.pivots?.length)

  return (
    <>
      <header className="container-content pb-12 pt-20 md:pb-16">
        <div className="mx-auto max-w-[1040px]">
          <p
            className="font-body text-caption uppercase tracking-widest"
            style={{ color: project.brand }}
          >
            {project.category}
          </p>

          <h1 className="mt-3 font-display text-display italic leading-tight text-ink">
            {project.title}
          </h1>

          {/* Strongest visual, leads, before any prose */}
          {hero && (
            <figure className="mt-8 m-0">
              <Image
                src={hero.src}
                alt={hero.alt}
                width={1280}
                height={800}
                priority
                className="h-auto w-full rounded-2xl shadow-warm"
                sizes="(max-width: 1024px) 100vw, 1040px"
              />
              <figcaption className="mt-3 text-center font-body text-caption text-ghost">
                {hero.caption}
              </figcaption>
            </figure>
          )}

          {/* One-line outcome, the payoff, directly under the visual */}
          {showcase?.outcome && (
            <>
              <p className="mt-10 font-body text-caption uppercase tracking-widest text-coral">
                Outcome
              </p>
              <p className="mt-2 max-w-[760px] font-display text-[2rem] italic leading-[1.1] text-ink md:text-[2.75rem]">
                {showcase.outcome}
              </p>
            </>
          )}

          {/* ≤3 sentences of framing, just enough to make someone curious.
              Falls back to the short description if no framing copy exists. */}
          <p className="mt-5 max-w-[640px] font-body text-body-lg leading-[1.6] text-ghost">
            {showcase?.framing ?? project.shortDescription}
          </p>

          {/* Meta pills */}
          <ul role="list" className="mt-8 flex flex-wrap gap-2">
            {[
              { k: 'Year',     v: project.year     },
              { k: 'Duration', v: project.duration },
              { k: 'Team',     v: project.team     },
              { k: 'Role',     v: project.role     },
            ].map(({ k, v }) => (
              <li
                key={k}
                className="rounded-full border border-line bg-mist px-4 py-1.5 font-body text-caption text-ghost"
              >
                <span className="font-medium text-ink">{k}:</span> {v}
              </li>
            ))}
          </ul>

          {/* External CTAs */}
          {(project.liveUrl || project.repoUrl) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 font-body text-sm text-paper transition-colors duration-200 hover:bg-coral no-underline"
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
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-transparent px-6 py-2.5 font-body text-sm text-ink transition-colors duration-200 hover:border-ink no-underline"
                >
                  <Github size={14} aria-hidden="true" />
                  View source
                </a>
              )}
            </div>
          )}

          {/* Metrics, honest structural facts, scannable */}
          <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl bg-mist p-6 md:grid-cols-4">
            {project.metrics.map(m => (
              <div key={m.label}>
                <div className="font-display text-[1.875rem] italic leading-none text-coral">
                  {m.value}
                </div>
                <div className="mt-1 font-body text-caption uppercase tracking-wider text-ghost">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Supporting visuals, default-visible (showing the work IS the showcase) */}
      {supporting.length > 0 && (
        <div className="mx-auto max-w-[1040px] px-6 md:px-16">
          <ImageGallery images={supporting} />
        </div>
      )}

      {/* Progressive disclosure, one expand, everything deep inside */}
      <div className="container-content pb-24 md:pb-32">
        <div className="mx-auto max-w-[760px]">
          <details className="group border-t border-line pt-8">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl py-2 font-display text-2xl italic text-ink transition-colors duration-150 hover:text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral [&::-webkit-details-marker]:hidden">
              Read the full breakdown
              <ChevronDown
                size={24}
                aria-hidden="true"
                className="shrink-0 text-ghost motion-safe:transition-transform motion-safe:duration-200 group-open:rotate-180"
              />
            </summary>
            {/* Toggle visibility explicitly off the parent <details>' open
                state. Native closed-hiding varies across Chromium versions
                (older: display:none on children; newer: a ::details-content
                pseudo-element), so we don't rely on it, `hidden` keeps the
                breakdown off the default path, `group-open:block` reveals it. */}
            <div className="hidden group-open:block">
              <div className="mt-10 flex flex-col gap-16">
                {hasPivots
                  ? <FeaturedSections project={project} />
                  : <StandardSections project={project} />
                }
              </div>
            </div>
          </details>
        </div>
      </div>
    </>
  )
}

/* ─── Next case study CTA strip ─────────────────────────────────────── */
function NextProjectCta({ currentSlug }: { currentSlug: string }) {
  const idx  = projects.findIndex(p => p.slug === currentSlug)
  const next = projects[(idx + 1) % projects.length]
  if (!next || next.slug === currentSlug) return null

  return (
    <section className="border-t border-line bg-mist">
      <div className="container-content py-16 md:py-20">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div>
            <p className="font-body text-caption uppercase tracking-widest text-coral">
              Next case study
            </p>
            <h2 className="mt-3 font-display text-display italic leading-tight text-ink">
              {next.title}
            </h2>
            <p className="mt-3 max-w-md font-body text-body text-ghost">
              {next.category}
            </p>
          </div>
          <div className="md:justify-self-end">
            <Link
              href={`/case-studies/${next.slug}`}
              className="inline-flex items-center gap-2 rounded-lg border border-ink/30 px-6 py-3 font-body text-sm text-ink transition-colors duration-150 hover:bg-ink hover:text-paper no-underline"
            >
              Read case study
              <ArrowLeft size={14} className="rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
