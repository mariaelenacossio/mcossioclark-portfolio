'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
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
 *  - Framer Motion fade-up: opacity 0→1, translateY 16→0, once-only
 */
export default function ImageGallery({ images }: ImageGalleryProps) {
  const reduce = useReducedMotion()

  if (images.length === 0) return null

  return (
    <section
      aria-label="Project screenshots"
      className="mt-12 mb-12 flex flex-col gap-8"
    >
      {images.map(img => (
        <motion.figure
          key={img.src}
          className="m-0"
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration: reduce ? 0.001 : 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
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
        </motion.figure>
      ))}
    </section>
  )
}
