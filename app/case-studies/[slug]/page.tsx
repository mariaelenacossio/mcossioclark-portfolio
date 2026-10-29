import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects, getProject } from '@/data/projects'
import type { ProjectImage } from '@/lib/types'
import DarkCaseStudyShowcase from '@/app/components/dark/case-study/DarkCaseStudyShowcase'
import DarkNextProjectCta from '@/app/components/dark/case-study/DarkNextProjectCta'

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
 * Case-study page. Every project renders showcase-first: strongest
 * visual leads, one-line outcome under it, ≤3 sentences of framing,
 * then meta/CTAs/metrics and the supporting screenshots, with all the
 * deep content behind a single "Read the full breakdown" expand. No
 * sticky TOC.
 *
 * All three projects now migrated to the dark-redesign system (see
 * lib/darkRedesign.ts's git history for the per-slug dispatch this
 * used during the migration) - this page always renders the dark
 * tree. An unresolved slug (e.g. /case-studies/nope) calls notFound(),
 * which renders the root app/not-found.tsx - dark chrome, same as
 * every other page, not a blank or mismatched one.
 */
export default function CaseStudyPage(
  { params }: { params: { slug: string } },
) {
  const project = getProject(params.slug)
  if (!project) notFound()

  const images = existingImages(project.images)

  return (
    <div className="dr-root min-h-dvh">
      <main id="main-content">
        <DarkCaseStudyShowcase project={project} images={images} />
        <DarkNextProjectCta currentSlug={project.slug} />
      </main>
    </div>
  )
}
