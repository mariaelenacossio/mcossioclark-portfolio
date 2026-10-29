import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { projects } from '@/data/projects'
import ScrollReveal from '@/app/components/dark/ScrollReveal'

interface DarkNextProjectCtaProps {
  currentSlug: string
}

/**
 * Dark-redesign "next case study" strip. The linked project may still be
 * on the light system until it migrates too - that's an expected seam
 * of migrating one case study at a time, not a bug.
 */
export default function DarkNextProjectCta({ currentSlug }: DarkNextProjectCtaProps) {
  const idx  = projects.findIndex(p => p.slug === currentSlug)
  const next = projects[(idx + 1) % projects.length]
  if (!next || next.slug === currentSlug) return null

  return (
    <section className="border-t border-dr-hairline bg-dr-surface-1">
      <ScrollReveal className="px-dr-xl py-dr-xxl">
        <div className="mx-auto grid max-w-[1199px] items-center gap-dr-lg md:grid-cols-2">
          <div>
            <p className="font-dr-body text-dr-caption uppercase tracking-[0.08em] text-dr-ink-muted">
              Next case study
            </p>
            <h2 className="mt-dr-sm font-dr-display text-dr-display-md text-dr-ink">
              {next.title}
            </h2>
            <p className="mt-dr-xs max-w-md font-dr-body text-dr-body text-dr-ink-muted">
              {next.category}
            </p>
          </div>
          <div className="md:justify-self-end">
            <Link
              href={`/case-studies/${next.slug}`}
              className="inline-flex items-center gap-dr-xs rounded-dr-pill border border-dr-hairline px-dr-lg py-dr-sm font-dr-body text-dr-caption text-dr-ink no-underline transition duration-dr-fast ease-dr-ease [@media(hover:hover)]:hover:bg-dr-surface-2 active:scale-95"
            >
              Read case study
              <ArrowLeft size={14} className="rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
