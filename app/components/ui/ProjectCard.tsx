import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
}

/**
 * Project card. Mist surface, warm shadow, real screenshot at the top
 * (brand-tint fallback), italic serif title that warms to coral on
 * hover. Whole card lifts on hover; image scales gently.
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/case-studies/${project.id}`}
      aria-label={`Read case study: ${project.title}`}
      className="group block overflow-hidden rounded-2xl bg-mist shadow-warm transition-all duration-300 hover:-translate-y-2 hover:shadow-warm-hover no-underline"
    >
      {/* Image */}
      <div
        className="relative h-60 overflow-hidden"
        style={{ backgroundColor: project.brand + '15' }}
      >
        {project.images?.[0] && (
          <Image
            src={project.images[0].src}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <span className="font-body text-caption text-ghost">
            {project.year}
          </span>
          <span className="text-caption text-ghost/50" aria-hidden="true">·</span>
          <span className="font-body text-caption text-ghost">
            {project.category}
          </span>
        </div>

        <h3 className="mt-2 font-display text-title italic leading-tight text-ink transition-colors duration-200 group-hover:text-coral">
          {project.title}
        </h3>

        <p className="mt-2 line-clamp-2 font-body text-caption leading-relaxed text-ghost">
          {project.shortDescription}
        </p>

        {/* Metrics */}
        <div className="mt-5 flex gap-3">
          {project.metrics.slice(0, 2).map(m => (
            <div
              key={m.label}
              className="flex-1 rounded-xl bg-paper px-4 py-2.5 text-center shadow-sm"
            >
              <div className="font-display text-xl leading-none text-ink">
                {m.value}
              </div>
              <div className="mt-1 font-body text-[0.7rem] text-ghost">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-5 flex items-center gap-1.5 font-body text-sm font-medium text-coral">
          Read case study
          <ArrowRight
            size={13}
            aria-hidden="true"
            className="transition-transform duration-150 group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  )
}
