'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Desktop custom cursor.
 *
 * Per spec:
 *  - 14px circle, 2px solid ink border, transparent fill (default)
 *  - Follows the mouse with an 80ms lerp via requestAnimationFrame
 *    (not a CSS transition — the spec is explicit about this)
 *  - Hovering links / buttons / cards → fills coral, scales to 40px
 *  - Hovering plain text   → shrinks to 6px, fills ink
 *
 * Desktop-only: bails out if the pointer is coarse or hover-incapable.
 * Disables the native cursor by setting `body[data-custom-cursor='true']`
 * (the CSS rule is in globals.css).
 */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement | null>(null)
  // Live mouse target position
  const target = useRef({ x: 0, y: 0 })
  // Eased follower position (what we actually render)
  const current = useRef({ x: 0, y: 0 })
  const raf = useRef<number | null>(null)

  const [variant, setVariant] = useState<'default' | 'link' | 'text'>('default')
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Detect fine pointer + hover (desktop). Skip on touch / coarse / no-hover.
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mq.matches) return

    setEnabled(true)
    document.body.setAttribute('data-custom-cursor', 'true')

    // Seed positions at center so the first paint isn't at (0,0)
    target.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    current.current = { ...target.current }

    const handleMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY

      // Hover-target detection — runs once per move event
      const el = e.target as HTMLElement | null
      if (!el) {
        setVariant('default')
        return
      }
      // Interactive: links, buttons, role=button, cards (tagged), inputs
      const interactive = el.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="link"]'
      )
      if (interactive) {
        setVariant('link')
        return
      }
      // Plain body text — heuristic: P / H1-H6 / SPAN / LI inside content
      const text = el.closest('p, h1, h2, h3, h4, h5, h6, li, blockquote, label')
      if (text) {
        setVariant('text')
        return
      }
      setVariant('default')
    }

    // 80ms lerp. Frame factor derived for ~60fps. Higher = faster.
    // 1 - exp(-dt / tau) gives a stable lerp at variable framerates;
    // at ~16.6ms / 80ms tau ≈ 0.187.
    const LERP_FACTOR = 0.187

    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * LERP_FACTOR
      current.current.y += (target.current.y - current.current.y) * LERP_FACTOR
      const node = ref.current
      if (node) {
        node.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`
      }
      raf.current = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', handleMouseMove)
    raf.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (raf.current !== null) cancelAnimationFrame(raf.current)
      document.body.removeAttribute('data-custom-cursor')
    }
  }, [])

  if (!enabled) return null

  // Per-variant size + colour. Smooth transitions on these properties only
  // (the position is RAF-driven and skips CSS transitions).
  const sizing =
    variant === 'link'
      ? 'w-10 h-10 bg-coral border-coral'
      : variant === 'text'
        ? 'w-1.5 h-1.5 bg-ink border-ink'
        : 'w-3.5 h-3.5 bg-transparent border-ink'

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[1000] rounded-full border-2 transition-[width,height,background-color,border-color] duration-200 ease-out ${sizing}`}
      // Initial off-screen so it never flashes at (0,0)
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
    />
  )
}
