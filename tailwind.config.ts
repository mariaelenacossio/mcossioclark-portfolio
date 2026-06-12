import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // ── Milan Reed warm palette ───────────────────────────────
        ink:   '#0F0F0F', // near-black with warmth, not pure #000
        paper: '#FAFAF8', // warm white, barely off-white
        coral: '#FF4D2E', // brighter, more energetic
        mist:  '#F2F0EB', // section alternate background
        line:  '#E5E2DC', // borders, dividers
        ghost: '#94918C', // secondary text, captions
        card:  '#EDEBE6', // card background (slightly darker than mist)
        // Legacy alias kept so unrewritten leaf components don't break.
        stone: '#EDEBE6',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero':    ['clamp(3.5rem, 8vw, 7.5rem)',   { lineHeight: '1.0',  letterSpacing: '-0.03em' }],
        'display': ['clamp(2rem, 5vw, 4rem)',       { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'title':   ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem',                     { lineHeight: '1.75' }],
        'body':    ['1rem',                         { lineHeight: '1.7'  }],
        'caption': ['0.8125rem',                    { lineHeight: '1.5', letterSpacing: '0.04em' }],
      },
      boxShadow: {
        'warm':       '0 4px 24px -4px rgba(15,15,15,0.08)',
        'warm-hover': '0 12px 40px -8px rgba(15,15,15,0.14)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
