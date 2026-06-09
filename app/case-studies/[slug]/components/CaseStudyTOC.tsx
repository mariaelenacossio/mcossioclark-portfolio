'use client'

import { useEffect, useState } from 'react'

export interface TocItem {
  id:    string
  label: string
}

interface CaseStudyTOCProps {
  items: TocItem[]
}

/**
 * Sticky desktop table of contents for a case study page.
 *
 * - Hidden below `lg` (TOC sidebar is a desktop-only affordance per spec)
 * - Scroll-spy: highlights the section currently dominating the viewport
 *   using the same intersection-ratio pattern as the navbar
 * - Sits below the sticky navbar (top-24) so it never overlaps the header
 */
export default function CaseStudyTOC({ items }: CaseStudyTOCProps) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    if (items.length === 0) return

    const visible = new Map<string, number>()
    const observers: IntersectionObserver[] = []

    items.forEach(item => {
      const el = document.getElementById(item.id)
      if (!el) return

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              visible.set(item.id, entry.intersectionRatio)
            } else {
              visible.delete(item.id)
            }
          })
          if (visible.size === 0) return
          const top = [...visible.entries()].sort((a, b) => b[1] - a[1])[0]
          setActive(top[0])
        },
        {
          // Same offset pattern as Navbar — account for the sticky header
          rootMargin: '-80px 0px -40% 0px',
          threshold: [0.1, 0.3, 0.5, 0.7],
        },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [items])

  if (items.length === 0) return null

  return (
    <aside
      aria-label="On this page"
      className="sticky top-24 hidden self-start lg:block"
    >
      <p className="eyebrow text-caption">On this page</p>
      <ul role="list" className="mt-4 flex flex-col gap-2.5 border-l border-rule pl-4">
        {items.map(item => {
          const isActive = active === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`block font-body text-caption transition-colors duration-150 no-underline ${
                  isActive
                    ? 'text-ink font-medium'
                    : 'text-caption hover:text-ink'
                }`}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
