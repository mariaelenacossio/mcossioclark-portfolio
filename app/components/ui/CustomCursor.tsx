'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Desktop custom cursor — Editorial Bold MC.
 *
 *  - Default: 10px ink dot
 *  - Over a / button / role="button" / inputs: 28px coral disc
 *  - Over reading text (p, h1-h6, span, li): 4px ink dot
 *
 * RAF lerp at factor 0.1. Disables native cursor by setting
 * body[data-custom-cursor='true'] (CSS rule in globals.css does the
 * actual hiding). Bails out on coarse / no-hover devices.
 */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement | null>(null)
  const target  = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const raf = useRef<number | null>(null)

  const [variant, setVariant] = useState<'default' | 'link' | 'text'>('default')
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mq.matches) return

    setEnabled(true)
    document.body.setAttribute('data-custom-cursor', 'true')

    target.current  = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    current.current = { ...target.current }

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY

      const el = e.target as HTMLElement | null
      if (!el) { setVariant('default'); return }

      if (el.closest('a, button, [role="button"], input, textarea, select, [data-cursor="link"]')) {
        setVariant('link');  return
      }
      if (el.closest('p, h1, h2, h3, h4, h5, h6, li, blockquote, label')) {
        setVariant('text');  return
      }
      setVariant('default')
    }

    const LERP = 0.10

    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * LERP
      current.current.y += (target.current.y - current.current.y) * LERP
      const node = ref.current
      if (node) {
        node.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`
      }
      raf.current = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf.current !== null) cancelAnimationFrame(raf.current)
      document.body.removeAttribute('data-custom-cursor')
    }
  }, [])

  if (!enabled) return null

  const sizing =
    variant === 'link'
      ? 'w-7 h-7 bg-coral'
      : variant === 'text'
        ? 'w-1 h-1 bg-ink'
        : 'w-2.5 h-2.5 bg-ink'

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[10000] rounded-full transition-[width,height,background-color] duration-200 ease-out ${sizing}`}
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
    />
  )
}
