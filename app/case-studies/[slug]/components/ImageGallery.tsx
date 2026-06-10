'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import type { ProjectImage } from '@/lib/types'

interface ImageGalleryProps {
  /** Pre-filtered list — only images whose files actually exist. */
  images: ProjectImage[]
}

/**
 * Stacked screenshot gallery for a case-study page.
 *
 * Per spec:
 *  - Full content-column width (1280×800 source, rendered responsively)
 *  - Each image: rounded-[16px], soft drop shadow
 *  - Caption: text-caption (size + color), centered, 8px gap above
 *  - 40px vertical gap between figures
 *  - Framer Motion fade-up on each: opacity 0→1, translateY 16→0,
 *    viewport amount 0.1, once-only, reduced-motion respected
 */
export default function ImageGallery({ images }: ImageGalleryProps) {
  const reduce = useReducedMotion()

  if (images.length === 0) return null

  return (
    <section
      aria-label="Project screenshots"
      className="container-content mb-16 flex flex-col gap-10"
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
            className="h-auto w-full rounded-[16px]"
            style={{ boxShadow: '0 2px 12px rgba(13,13,13,0.08)' }}
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          <figcaption className="mt-2 text-center font-body text-caption text-caption">
            {img.caption}
          </figcaption>
        </motion.figure>
      ))}
    </section>
  )
}
