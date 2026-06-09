import { ImageResponse } from 'next/og'
import { getProject } from '@/data/projects'

/**
 * Per-slug Open Graph image, generated at build time.
 *
 * Uses Next's <ImageResponse> (Vercel's @vercel/og under the hood)
 * to produce a 1200x630 PNG branded with the project's accent color.
 * No external fonts loaded — we use the runtime default to keep the
 * generation fast and free of network calls.
 */

export const runtime  = 'edge'
export const alt      = 'Case study cover'
export const size     = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug)

  // Brand color background with a darker overlay panel for the copy.
  // Fallback to coral if a project couldn't be resolved (shouldn't
  // happen — every slug here is statically generated).
  const brand = project?.brand ?? '#E8502A'
  const title    = project?.title             ?? 'Mariaelena Cossio Clark'
  const subtitle = project?.shortDescription  ?? 'UX/UI Designer & Frontend Engineer'
  const category = project?.category          ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: `linear-gradient(135deg, ${brand} 0%, #0D0D0D 100%)`,
          color: '#FAFAF8',
          fontFamily: 'system-ui, -apple-system, Helvetica, Arial, sans-serif',
        }}
      >
        {/* Top: small eyebrow */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            letterSpacing: 4,
            textTransform: 'uppercase',
            opacity: 0.85,
          }}
        >
          <span>{category}</span>
          <span style={{ fontWeight: 700 }}>MC</span>
        </div>

        {/* Center-bottom: title + subtitle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <h1
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: -3,
              margin: 0,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              maxWidth: 900,
              opacity: 0.9,
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Bottom: byline */}
        <div
          style={{
            fontSize: 22,
            opacity: 0.8,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          mariaelena-cossioclark.com
        </div>
      </div>
    ),
    { ...size },
  )
}
