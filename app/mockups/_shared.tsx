import type { CSSProperties, ReactNode } from 'react'

/**
 * Shared building blocks for mockup screens.
 *
 * Every mockup page renders 3 screens stacked vertically. Each screen
 * is a fixed 1280×800 frame with a subtle drop shadow, preceded by a
 * caption ("Screen 1 of 3 — Shop", etc).
 *
 * Mockups intentionally use system-ui (not the portfolio's Clash
 * Display + Cabinet Grotesk) — they're standalone product UIs, not
 * portfolio decorations.
 */

/** Font stack for mockup pages — never load Fontshare fonts here. */
export const SYSTEM_FONT: CSSProperties = {
  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
}

interface MockupShellProps {
  /** Page title shown above the screens. */
  title:    string
  /** Brand color used in headers / accents. */
  brand:    string
  /** The screens to render. Each child should be a <Screen>. */
  children: ReactNode
}

/**
 * Outer page shell — sits on a neutral gray background that lets the
 * white 1280×800 screen frames pop with their drop shadows.
 */
export function MockupShell({ title, brand, children }: MockupShellProps) {
  return (
    <div style={{ ...SYSTEM_FONT, background: '#F5F5F4', minHeight: '100vh', padding: '64px 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px' }}>
        <header style={{ marginBottom: 48, textAlign: 'center' }}>
          <p style={{
            fontSize: 12,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#737373',
            margin: 0,
            marginBottom: 12,
            fontWeight: 600,
          }}>
            Mockup screens · noindex
          </p>
          <h1 style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#0a0a0a',
            margin: 0,
            letterSpacing: '-0.02em',
          }}>
            {title}
          </h1>
          <div style={{
            marginTop: 16,
            height: 4,
            width: 56,
            background: brand,
            margin: '16px auto 0',
            borderRadius: 2,
          }} />
        </header>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

interface ScreenProps {
  /** Numbered caption above the screen ("Screen 1 of 3 — Shop"). */
  caption: string
  /** The screen UI itself — should fill 1280×800. */
  children: ReactNode
}

/**
 * One 1280×800 screen frame. The frame has rounded corners and a soft
 * drop shadow so it reads as a product mockup. The caption sits above
 * with a small color-coded badge.
 */
export function Screen({ caption, children }: ScreenProps) {
  return (
    <figure style={{ margin: 0 }}>
      <figcaption style={{
        fontSize: 13,
        color: '#525252',
        marginBottom: 12,
        fontWeight: 500,
      }}>
        {caption}
      </figcaption>
      <div style={{
        width: 1280,
        height: 800,
        background: '#ffffff',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 24px 64px -16px rgba(13, 13, 13, 0.18), 0 2px 8px rgba(13, 13, 13, 0.06)',
        margin: '0 auto',
      }}>
        {children}
      </div>
    </figure>
  )
}
