import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { projects, getProject } from '@/data/projects'
import type { Project, ProjectImage } from '@/lib/types'
import CaseStudyTOC, { type TocItem } from './components/CaseStudyTOC'
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

function buildToc(project: Project): TocItem[] {
  if (project.featured && project.pivots && project.pivots.length > 0) {
    return [
      { id: 'overview', label: 'Overview' },
      { id: 'brief',    label: 'The brief' },
      ...project.pivots.map(p => ({
        id: `pivot-${p.n}`,
        label: `Pivot ${p.n} · ${p.challenge}`,
      })),
      ...(project.techStack && project.techStack.length > 0
        ? [{ id: 'tech-stack', label: 'The stack' }]
        : []),
      { id: 'outcome',   label: 'Outcome' },
      { id: 'learnings', label: 'What I learned' },
    ]
  }
  return [
    { id: 'overview',  label: 'Overview' },
    { id: 'problem',   label: 'The problem' },
    { id: 'goal',      label: 'The goal' },
    { id: 'research',  label: 'Research' },
    { id: 'insights',  label: 'Insights' },
    { id: 'design',    label: 'Design' },
    { id: 'outcome',   label: 'Outcome' },
    { id: 'learnings', label: 'What I learned' },
  ]
}

/**
 * Editorial Bold MC - Case Study page.
 *
 *  - paper background, top section centered with max-w-[880px]
 *  - Eyebrow (coral), Bebas display title, body-lg description
 *  - Stone meta pills, navbar-style CTA buttons
 *  - Stone metric tiles with coral numbers
 *  - Full-width gallery, then body content centered max-w-[720px]
 */
export default function CaseStudyPage(
  { params }: { params: { slug: string } },
) {
  const project = getProject(params.slug)
  if (!project) notFound()

  const toc = buildToc(project)
  const isFeatured = !!(project.featured && project.pivots?.length)

  return (
    <main id="main-content" className="bg-paper pt-24">
      {/* Back link */}
      <div className="container-content pt-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-body text-caption text-ghost transition-colors duration-150 hover:text-ink no-underline"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Work
        </Link>
      </div>

      {/* Hero */}
      <header className="container-content pb-12 pt-20 md:pb-16">
        <div className="mx-auto max-w-[880px]">
          <p
            className="font-body text-caption uppercase tracking-widest"
            style={{ color: project.brand }}
          >
            {project.category}
          </p>

          <h1 className="mt-3 font-display text-display uppercase leading-none text-ink">
            {project.title}
          </h1>

          <p className="mt-4 max-w-[640px] font-body text-body-lg text-ghost">
            {project.shortDescription}
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
                className="rounded-full bg-stone px-4 py-1.5 font-body text-caption text-ghost"
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
                  className="inline-flex items-center gap-2 rounded-lg border border-ink/30 bg-transparent px-5 py-2 font-body text-sm text-ink transition-colors duration-150 hover:bg-ink hover:text-paper no-underline"
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
                  className="inline-flex items-center gap-2 rounded-lg border border-ink/15 bg-transparent px-5 py-2 font-body text-sm text-ink transition-colors duration-150 hover:border-ink/40 no-underline"
                >
                  <Github size={14} aria-hidden="true" />
                  View source
                </a>
              )}
            </div>
          )}

          {/* Metrics */}
          <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl bg-stone p-6 md:grid-cols-4">
            {project.metrics.map(m => (
              <div key={m.label}>
                <div className="font-display text-[2rem] leading-none text-coral">
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

      {/* Gallery - sits in its own constrained container */}
      <div className="mx-auto max-w-[880px] px-6 md:px-16">
        <ImageGallery images={existingImages(project.images)} />
      </div>

      {/* Body */}
      <div className="container-content pb-24 md:pb-32">
        <div className="grid gap-12 lg:grid-cols-[65fr_35fr] lg:gap-16">
          <div className="flex flex-col gap-16">
            {isFeatured
              ? <FeaturedSections project={project} />
              : <StandardSections project={project} />
            }
          </div>
          <CaseStudyTOC items={toc} />
        </div>
      </div>

      {/* Next case study */}
      <NextProjectCta currentSlug={project.slug} />
    </main>
  )
}

/* ─── Next case study CTA strip ─────────────────────────────────────── */
function NextProjectCta({ currentSlug }: { currentSlug: string }) {
  const idx  = projects.findIndex(p => p.slug === currentSlug)
  const next = projects[(idx + 1) % projects.length]
  if (!next || next.slug === currentSlug) return null

  return (
    <section className="border-t border-stone bg-stone">
      <div className="container-content py-16 md:py-20">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div>
            <p className="font-body text-caption uppercase tracking-widest text-coral">
              Next case study
            </p>
            <h2 className="mt-3 font-display text-display uppercase leading-none text-ink">
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
