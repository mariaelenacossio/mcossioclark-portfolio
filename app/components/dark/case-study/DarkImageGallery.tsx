import Image from 'next/image'
import type { ProjectImage } from '@/lib/types'

interface DarkImageGalleryProps {
  /** Pre-filtered list - only images whose files actually exist. */
  images: ProjectImage[]
}

/**
 * Dark-redesign case-study screenshot gallery. Same product-mockup-tile
 * frame as the homepage project grid (surface-1, padded, rounded,
 * 16:10, object-cover) - not a new treatment.
 */
export default function DarkImageGallery({ images }: DarkImageGalleryProps) {
  if (images.length === 0) return null

  return (
    <section aria-label="Project screenshots" className="mt-dr-xxl mb-dr-xxl flex flex-col gap-dr-xl">
      {images.map(img => (
        <figure key={img.src} className="m-0">
          <div className="rounded-dr-xl border border-dr-hairline bg-dr-surface-1 p-dr-md">
            <div className="relative aspect-[16/10] overflow-hidden rounded-dr-lg bg-dr-canvas">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 880px"
              />
            </div>
          </div>
          <figcaption className="mt-dr-sm text-center font-dr-body text-dr-caption text-dr-ink-muted">
            {img.caption}
          </figcaption>
        </figure>
      ))}
    </section>
  )
}
