import Image from 'next/image'
import type { ProjectImage } from '@/lib/types'

interface ImageGalleryProps {
  /** Pre-filtered list - only images whose files actually exist. */
  images: ProjectImage[]
}

/**
 * Stacked screenshot gallery for a case-study page.
 *
 *  - Each image: full-width, rounded-2xl, soft shadow
 *  - Caption: ghost color, centered, font-body text-caption
 *  - 8 unit gap (32px) between figures
 *  - Static: the project-grid card hover is the site's single signature
 *    interaction, so the gallery renders without entrance motion.
 */
export default function ImageGallery({ images }: ImageGalleryProps) {
  if (images.length === 0) return null

  return (
    <section
      aria-label="Project screenshots"
      className="mt-12 mb-12 flex flex-col gap-8"
    >
      {images.map(img => (
        <figure key={img.src} className="m-0">
          <Image
            src={img.src}
            alt={img.alt}
            width={1280}
            height={800}
            className="h-auto w-full rounded-2xl shadow-sm"
            sizes="(max-width: 1024px) 100vw, 880px"
          />
          <figcaption className="mt-3 text-center font-body text-caption text-ghost">
            {img.caption}
          </figcaption>
        </figure>
      ))}
    </section>
  )
}
