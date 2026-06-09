import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'

/**
 * /sitemap.xml generator.
 *
 * Built dynamically from the projects array so new case studies are
 * picked up automatically on every deploy.
 *
 * Priorities:
 *   1.0  homepage
 *   0.8  case studies
 */
const BASE = 'https://www.mariaelena-cossioclark.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url:           BASE,
      lastModified:  now,
      changeFrequency: 'monthly',
      priority:      1.0,
    },
    ...projects.map(p => ({
      url:           `${BASE}/case-studies/${p.slug}`,
      lastModified:  now,
      changeFrequency: 'yearly' as const,
      priority:      0.8,
    })),
  ]
}
