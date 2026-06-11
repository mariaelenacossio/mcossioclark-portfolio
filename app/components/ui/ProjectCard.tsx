'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
}

/**
 * Editorial Bold MC project card.
 *
 *  - Dark card surface on the Work grid's dark ink background
 *  - Real mockup image (first project image) header, brand-tinted bg
 *  - Card content: year + category pills, Bebas title, body description,
 *    2 metric tiles, 3 tags, "Read case study →" coral footer
 *  - Hover: card lifts -8px, image scales 1.05, title shifts to coral
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  const { brand } = project
  const brandTint = `${brand}15` // 8% alpha background behind the image

  return (
    <Link
      href={`/case-studies/${project.slug}`}
      aria-label={`Read case study: ${project.title}`}
      className="group block overflow-hidden rounded-2xl bg-card no-underline transition-transform duration-300 hover:-translate-y-2"
    >
      {/* Image header */}
      <div
        className="relative h-52 overflow-hidden"
        style={{ backgroundColor: brandTint }}
      >
        {project.images?.[0] ? (
          <Image
            src={project.images[0].src}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="h-24 w-24 rounded-full opacity-40"
              style={{ backgroundColor: brand }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Year + category pills */}
        <div className="flex flex-wrap gap-2">
          <span
            className="rounded-full px-3 py-1 font-body text-caption"
            style={{ color: project.brand, backgroundColor: brandTint }}
          >
            {project.year}
          </span>
          <span className="rounded-full bg-paper/5 px-3 py-1 font-body text-caption text-ghost">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-3 font-display text-title uppercase leading-none text-paper transition-colors duration-200 group-hover:text-coral">
          {project.title}
        </h3>

        {/* Description — clamped to 2 lines */}
        <p
          className="mt-2 font-body text-caption text-ghost"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.shortDescription}
        </p>

        {/* Metrics */}
        <div className="mt-4 flex gap-3">
          {project.metrics.slice(0, 2).map(m => (
            <div key={m.label} className="rounded-lg bg-paper/5 px-4 py-2">
              <span className="block font-display text-xl leading-none text-paper">{m.value}</span>
              <span className="mt-1 block font-body text-[0.65rem] uppercase text-ghost">
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map(t => (
            <span
              key={t}
              className="rounded-full bg-paper/5 px-3 py-1 font-body text-[0.7rem] text-ghost"
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-5 flex items-center gap-1.5 font-body text-sm font-medium text-coral">
          Read case study
          <ArrowRight
            size={14}
            aria-hidden="true"
            className="transition-transform duration-150 group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  )
}
