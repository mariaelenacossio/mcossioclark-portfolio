import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // ── Editorial Bold MC palette ──────────────────────────────
        ink:   '#111110', // primary text + dark sections
        paper: '#F7F5F1', // warm off-white page background
        coral: '#D94F2B', // primary accent
        stone: '#E8E4DE', // alternate light section + pills
        ghost: '#9B9590', // muted body / labels
        card:  '#1C1B19', // dark card surface (on ink)
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)', 'sans-serif'],
      },
      fontSize: {
        // ── Editorial Bold MC type scale ───────────────────────────
        'hero':    ['clamp(5rem, 20vw, 20rem)',    { lineHeight: '0.88', letterSpacing: '0.01em' }],
        'display': ['clamp(2.5rem, 6vw, 5.5rem)',  { lineHeight: '0.92', letterSpacing: '0.02em' }],
        'title':   ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.0',  letterSpacing: '0.02em' }],
        'body-lg': ['1.125rem',                    { lineHeight: '1.7' }],
        'body':    ['1rem',                        { lineHeight: '1.7' }],
        'caption': ['0.8125rem',                   { lineHeight: '1.5', letterSpacing: '0.05em' }],
      },
      borderRadius: {
        pill:   '9999px',
        card:   '16px',
        button: '10px',
        input:  '10px',
      },
      maxWidth: {
        content: '1440px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '1',   transform: 'scale(1)'    },
          '50%':      { opacity: '0.5', transform: 'scale(0.85)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
