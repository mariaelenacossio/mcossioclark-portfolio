import fs from 'node:fs'
import path from 'node:path'
import Image from 'next/image'
import ScrollReveal from '@/app/components/ui/ScrollReveal'
import type { ProjectImage } from '@/lib/types'

interface ImageGalleryProps {
  images: ProjectImage[]
}

/**
 * Server-side existence check — only renders gallery items whose
 * source files actually exist under /public.
 *
 * Runs at build time (this is a Server Component), so the case-study
 * page automatically picks up screenshots the moment the user drops
 * them into /public/projects/<slug>/ and pushes — no code change needed.
 */
function existingOnly(images: ProjectImage[]): ProjectImage[] {
  const publicDir = path.join(process.cwd(), 'public')
  return images.filter(img => {
    try {
      return fs.existsSync(path.join(publicDir, img.src))
    } catch {
      return false
    }
  })
}

/**
 * Stacked screenshot gallery for a case-study page.
 *
 * - Renders only entries whose files are present in /public.
 * - Returns null if nothing's available — the case-study page's
 *   conditional skips this section entirely in that state.
 * - Each image sits at full content-column width, rounded-card,
 *   object-cover, with caption below in muted body and an optional
 *   heading above (display-md).
 * - Subtle fade-up via ScrollReveal, matching the rest of the site.
 */
export default function ImageGallery({ images }: ImageGalleryProps) {
  const available = existingOnly(images)
  if (available.length === 0) return null

  return (
    <section
      aria-label="Project screenshots"
      className="container-content mb-16 md:mb-20 flex flex-col gap-14"
    >
      {available.map((img, i) => (
        <ScrollReveal key={img.src} delay={i * 0.05}>
          <figure className="flex flex-col gap-3">
            {img.heading && (
              <h2 className="font-display text-display-md font-semibold text-ink">
                {img.heading}
              </h2>
            )}
            <div className="relative w-full overflow-hidden rounded-[16px] bg-mist shadow-card">
              <Image
                src={img.src}
                alt={img.alt}
                width={1280}
                height={800}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
            <figcaption className="font-body text-caption text-muted">
              {img.caption}
            </figcaption>
          </figure>
        </ScrollReveal>
      ))}
    </section>
  )
}
