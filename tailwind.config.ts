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

        // ── dark-redesign (DESIGN.md), additive only ─────────────
        // Prefixed dr- so it can never collide with the Milan Reed
        // tokens above. Only the homepage uses these so far; every
        // other page is untouched. gradient-coral dropped per review
        // (DESIGN.md documents it but the homepage only uses one tile).
        'dr-primary':          '#ffffff',
        'dr-on-primary':       '#000000',
        'dr-accent-blue':      '#0099ff',
        'dr-ink':              '#ffffff',
        'dr-ink-muted':        '#999999',
        'dr-canvas':           '#090909',
        'dr-surface-1':        '#141414',
        'dr-surface-2':        '#1c1c1c',
        'dr-hairline':         '#262626',
        'dr-hairline-soft':    '#1a1a1a',
        'dr-gradient-violet':  '#6a4cf5',
        'dr-gradient-magenta': '#d44df0',
        'dr-gradient-orange':  '#ff7a3d',
        'dr-success':          '#22c55e',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        // dark-redesign: Mona Sans in place of GT Walsheim (not licensed);
        // Inter Variable for body, feature settings applied via globals.css
        // scoped to .dr-root so it never touches existing pages.
        'dr-display': ['"Mona Sans Variable"', 'ui-sans-serif', 'system-ui'],
        'dr-body':    ['var(--font-dr-body)', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        'hero':    ['clamp(3.5rem, 8vw, 7.5rem)',   { lineHeight: '1.0',  letterSpacing: '-0.03em' }],
        'display': ['clamp(2rem, 5vw, 4rem)',       { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'title':   ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem',                     { lineHeight: '1.75' }],
        'body':    ['1rem',                         { lineHeight: '1.7'  }],
        'caption': ['0.8125rem',                    { lineHeight: '1.5', letterSpacing: '0.04em' }],

        // ── dark-redesign type scale (DESIGN.md) ──────────────────
        // xxl/xl/lg are fluid (clamp); letter-spacing is in em, not a fixed
        // px, because DESIGN.md requires tracking to scale WITH size ("keep
        // the percentage") - -5.5px/110px = -4.25px/85px = -3.1px/62px is
        // exactly -5% at every one of those three tiers, so -0.05em
        // reproduces the documented ratio at any size the clamp lands on.
        'dr-display-xxl': ['clamp(3.5rem, 9vw, 6.875rem)', { lineHeight: '0.85', letterSpacing: '-0.05em', fontWeight: '500' }],
        'dr-display-xl':  ['clamp(2.75rem, 7vw, 5.3125rem)', { lineHeight: '0.95', letterSpacing: '-0.05em', fontWeight: '500' }],
        'dr-display-lg':  ['clamp(2.25rem, 5vw, 3.875rem)', { lineHeight: '1.00', letterSpacing: '-0.05em', fontWeight: '500' }],
        'dr-display-md':  ['2rem',   { lineHeight: '1.13', letterSpacing: '-1.0px', fontWeight: '500' }],
        'dr-subhead':     ['1.5rem', { lineHeight: '1.30', letterSpacing: '-0.01px' }],
        'dr-body-lg':     ['1.125rem', { lineHeight: '1.30', letterSpacing: '-0.18px' }],
        'dr-body':        ['0.9375rem', { lineHeight: '1.30', letterSpacing: '-0.15px' }],
        'dr-caption':     ['0.8125rem', { lineHeight: '1.20', letterSpacing: '-0.13px', fontWeight: '500' }],
      },
      borderRadius: {
        'dr-xs':  '4px',
        'dr-sm':  '6px',
        'dr-md':  '10px',
        'dr-lg':  '15px',
        'dr-xl':  '20px',
        'dr-xxl': '30px',
        'dr-pill': '100px',
      },
      spacing: {
        'dr-xxs':     '4px',
        'dr-xs':      '8px',
        'dr-sm':      '12px',
        'dr-md':      '15px',
        'dr-lg':      '20px',
        'dr-xl':      '30px',
        'dr-xxl':     '40px',
        'dr-section': '96px',
      },
      boxShadow: {
        'warm':       '0 4px 24px -4px rgba(15,15,15,0.08)',
        'warm-hover': '0 12px 40px -8px rgba(15,15,15,0.14)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        // dark-redesign's one signature curve (pass two). Same shape as
        // out-expo above - kept as its own dr- token rather than reusing
        // the Milan Reed name, so the two systems' motion stays independent
        // even though the curve itself is intentionally the same.
        'dr-ease': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        // dark-redesign's three durations (pass two). Each maps to a kind
        // of motion, not a fixed "small/medium/large" scale:
        //  - fast: micro-interaction feedback (hover/press)
        //  - base: enter/exit transitions (reveals, panel open, headline load)
        //  - slow: ambient/looping motion (the scroll cue)
        'dr-fast': '150ms',
        'dr-base': '400ms',
        'dr-slow': '2000ms',
      },
      keyframes: {
        'reveal-sweep': {
          from: { clipPath: 'inset(0 100% 0 0)' },
          to:   { clipPath: 'inset(0 0% 0 0)' },
        },
        'success-pulse': {
          '0%':   { transform: 'scale(1)' },
          '50%':  { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)' },
        },
        'error-shake': {
          '0%':   { transform: 'translateX(0)' },
          '25%':  { transform: 'translateX(-4px)' },
          '50%':  { transform: 'translateX(4px)' },
          '75%':  { transform: 'translateX(-4px)' },
          '100%': { transform: 'translateX(0)' },
        },
        'dr-scroll-cue': {
          '0%':   { transform: 'translateY(-100%)', opacity: '0' },
          '20%':  { opacity: '1' },
          '80%':  { opacity: '1' },
          '100%': { transform: 'translateY(300%)', opacity: '0' },
        },
        // Hero text load (pass two, last item). One-shot - 'both' fill
        // mode holds the 0% state before each element's delay starts and
        // the 100% state after, so nothing needs JS to track "has it run".
        'dr-headline-in': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'reveal-sweep':    'reveal-sweep 500ms cubic-bezier(0.16, 1, 0.3, 1) 300ms both',
        'success-pulse':   'success-pulse 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        'error-shake':     'error-shake 300ms linear',
        // dr-slow (2000ms) + dr-ease, matching the named tokens above.
        'dr-scroll-cue':   'dr-scroll-cue 2000ms cubic-bezier(0.16, 1, 0.3, 1) infinite',
        // dr-base (400ms) duration, staggered dr-fast (150ms) apart.
        'dr-headline-in-0': 'dr-headline-in 400ms cubic-bezier(0.16, 1, 0.3, 1) 0ms both',
        'dr-headline-in-1': 'dr-headline-in 400ms cubic-bezier(0.16, 1, 0.3, 1) 150ms both',
        'dr-headline-in-2': 'dr-headline-in 400ms cubic-bezier(0.16, 1, 0.3, 1) 300ms both',
        'dr-headline-in-3': 'dr-headline-in 400ms cubic-bezier(0.16, 1, 0.3, 1) 450ms both',
      },
    },
  },
  plugins: [],
}

export default config
