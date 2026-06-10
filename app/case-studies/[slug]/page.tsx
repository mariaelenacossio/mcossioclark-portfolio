import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { projects, getProject } from '@/data/projects'
import type { Project } from '@/lib/types'
import CaseStudyTOC, { type TocItem } from './components/CaseStudyTOC'
import FeaturedSections from './components/FeaturedSections'
import StandardSections from './components/StandardSections'
import ImageGallery from './components/ImageGallery'

/* ───────────────────────────────────────────────────────────────────────
   Static generation
   ─────────────────────────────────────────────────────────────────────── */
export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

/* ───────────────────────────────────────────────────────────────────────
   Per-slug metadata (incl. OG tags — image comes from opengraph-image.tsx)
   ─────────────────────────────────────────────────────────────────────── */
export function generateMetadata(
  { params }: { params: { slug: string } },
): Metadata {
  const project = getProject(params.slug)
  if (!project) return {}

  const url = `https://www.mariaelena-cossioclark.com/case-studies/${project.slug}`
  const title = `${project.title} — Case study · Mariaelena Cossio Clark`

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

/* ───────────────────────────────────────────────────────────────────────
   TOC builder — declares the section anchor map for both render modes
   ─────────────────────────────────────────────────────────────────────── */
function buildToc(project: Project): TocItem[] {
  if (project.featured && project.pivots && project.pivots.length > 0) {
    return [
      { id: 'overview', label: 'Overview' },
      { id: 'brief',    label: 'The brief' },
      ...project.pivots.map(p => ({
        id: `pivot-${p.n}`,
        label: `Pivot ${p.n} — ${p.challenge}`,
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

/* ───────────────────────────────────────────────────────────────────────
   Page
   ─────────────────────────────────────────────────────────────────────── */
export default function CaseStudyPage(
  { params }: { params: { slug: string } },
) {
  const project = getProject(params.slug)
  if (!project) notFound()

  const toc = buildToc(project)
  const isFeatured = !!(project.featured && project.pivots?.length)

  return (
    <main id="main-content" className="pt-24">
      {/* ── Back link ─────────────────────────────────────────────────── */}
      <div className="container-content pt-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-body text-caption text-caption transition-colors duration-150 hover:text-ink no-underline"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to work
        </Link>
      </div>

      {/* ── Hero block ────────────────────────────────────────────────── */}
      <header className="container-content pt-8 pb-12 md:pt-12 md:pb-16">
        <p
          className="eyebrow"
          style={{ color: project.brand }}
        >
          {project.category}
        </p>

        <h1 className="mt-4 max-w-[820px] font-display text-display-lg font-bold text-ink">
          {project.title}
        </h1>

        <p className="mt-6 max-w-[640px] font-body text-body-lg text-muted leading-[1.55]">
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
              className="inline-flex items-center gap-1.5 rounded-pill border border-rule bg-mist px-3 py-1 font-body text-caption text-caption"
            >
              <span className="text-ink font-medium">{k}:</span> {v}
            </li>
          ))}
        </ul>

        {/* External CTAs — Live + Source */}
        {(project.liveUrl || project.repoUrl) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-button border-[1.5px] border-ink bg-transparent px-5 py-2.5 font-body text-[0.9375rem] text-ink transition-colors duration-150 hover:bg-ink hover:text-paper no-underline"
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
                className="inline-flex items-center gap-2 rounded-button border-[1.5px] border-rule bg-transparent px-5 py-2.5 font-body text-[0.9375rem] text-ink transition-colors duration-150 hover:border-ink no-underline"
              >
                <Github size={14} aria-hidden="true" />
                View source
              </a>
            )}
          </div>
        )}
      </header>

      {/* ── Metrics row ───────────────────────────────────────────────── */}
      <div className="container-content mb-16 md:mb-20">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {project.metrics.map(m => (
            <div
              key={m.label}
              className="rounded-card border border-rule bg-paper p-5 text-center shadow-card"
            >
              <div className="font-display text-[1.5rem] font-bold leading-none text-coral">
                {m.value}
              </div>
              <div className="mt-2 font-body text-caption uppercase text-caption">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Screenshot gallery ───────────────────────────────────────── */}
      {project.images && project.images.length > 0 && (
        <ImageGallery images={project.images} />
      )}

      {/* ── Body — 65 / 35 split with sticky TOC ──────────────────────── */}
      <div className="container-content pb-24 md:pb-32">
        <div className="grid gap-12 lg:grid-cols-[65fr_35fr] lg:gap-16">
          {/* Content */}
          <div className="flex flex-col gap-16">
            {isFeatured
              ? <FeaturedSections project={project} />
              : <StandardSections project={project} />
            }
          </div>

          {/* Sticky TOC */}
          <CaseStudyTOC items={toc} />
        </div>
      </div>

      {/* ── Next case study CTA ──────────────────────────────────────── */}
      <NextProjectCta currentSlug={project.slug} />
    </main>
  )
}

/* ───────────────────────────────────────────────────────────────────────
   Next project card — sits at the bottom of every case study
   ─────────────────────────────────────────────────────────────────────── */
function NextProjectCta({ currentSlug }: { currentSlug: string }) {
  const idx  = projects.findIndex(p => p.slug === currentSlug)
  const next = projects[(idx + 1) % projects.length]
  if (!next || next.slug === currentSlug) return null

  return (
    <section className="border-t border-rule bg-mist">
      <div className="container-content py-16 md:py-20">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div>
            <p className="eyebrow text-caption">Next case study</p>
            <h2 className="mt-3 font-display text-display-md font-semibold text-ink">
              {next.title}
            </h2>
            <p className="mt-3 max-w-md font-body text-body text-muted">
              {next.category}
            </p>
          </div>
          <div className="md:justify-self-end">
            <Link
              href={`/case-studies/${next.slug}`}
              className="inline-flex items-center gap-2 rounded-button border-[1.5px] border-ink bg-transparent px-6 py-3 font-body text-[0.9375rem] text-ink transition-colors duration-150 hover:bg-ink hover:text-paper no-underline"
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
