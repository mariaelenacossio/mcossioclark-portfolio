'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
}

/**
 * Single project card on the Work grid.
 *
 * Per spec:
 *  - Image area 240px desktop / 200px mobile, background = brand color
 *    at 8% opacity, with a simple abstract shape (centered) in the
 *    brand color at 30% opacity. NO recreations of the old SVG mockups.
 *  - Content area: 28px padding, year badge (coral) + category tag
 *    (caption), title, 2-line short description, 2 metric tiles inline,
 *    first 3 tags as pills, "Read case study ->" link in coral.
 *  - Whole card is clickable -> /case-studies/[slug] (not a modal).
 *  - Hover: translateY(-6px) + shadow lift over 250ms. Arrow nudges
 *    right 4px.
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  const { brand } = project
  // Pre-compute hex-alpha colors to avoid runtime style flicker
  const brand08 = `${brand}14` // 8%  alpha
  const brand30 = `${brand}4D` // 30% alpha

  return (
    <Link
      href={`/case-studies/${project.slug}`}
      aria-label={`Read case study: ${project.title}`}
      className="group relative block h-full overflow-hidden rounded-card bg-paper shadow-card transition-[transform,box-shadow] duration-[250ms] ease-out hover:-translate-y-1.5 hover:shadow-card-hover no-underline"
    >
      {/* ── Image area ───────────────────────────────────────────────── */}
      <div
        className="relative flex h-[200px] w-full items-center justify-center md:h-[240px]"
        style={{ backgroundColor: brand08 }}
        aria-hidden="true"
      >
        {/* Abstract composition: large circle + small offset square +
            a thin arc — same vocabulary as the hero composition but
            tinted to the project's brand color. */}
        <svg
          viewBox="0 0 200 200"
          className="h-1/2 w-1/2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="70" fill={brand30} />
          <circle cx="100" cy="100" r="32" fill={brand} fillOpacity="0.55" />
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke={brand}
            strokeWidth="1"
            strokeOpacity="0.35"
            strokeDasharray="240 320"
          />
        </svg>
      </div>

      {/* ── Content area ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 p-7">
        {/* Year + category */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-pill px-3 py-1 font-body text-caption uppercase"
            style={{ backgroundColor: brand08, color: 'var(--color-coral)' }}
          >
            {project.year}
          </span>
          <span className="rounded-pill bg-mist px-3 py-1 font-body text-caption text-caption">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-[1.375rem] font-semibold text-ink">
          {project.title}
        </h3>

        {/* Short description, clamped to 2 lines */}
        <p
          className="font-body text-body text-muted"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.shortDescription}
        </p>

        {/* Metric tiles */}
        <div className="flex flex-wrap gap-2">
          {project.metrics.slice(0, 2).map(m => (
            <div
              key={m.label}
              className="flex-1 rounded-button bg-mist px-4 py-2.5"
            >
              <div className="font-display text-[1.25rem] font-bold leading-none text-ink">
                {m.value}
              </div>
              <div className="mt-1 font-body text-caption text-caption">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <ul role="list" className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map(t => (
            <li
              key={t}
              className="rounded-pill border border-rule bg-mist px-2.5 py-1 font-body text-caption text-caption"
            >
              {t}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-2 inline-flex items-center gap-1.5 font-body text-coral">
          <span className="font-medium">Read case study</span>
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="transition-transform duration-150 group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  )
}
