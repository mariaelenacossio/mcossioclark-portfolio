import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink:        '#0D0D0D', // primary text, headlines
        paper:      '#FAFAF8', // page background (warm white)
        coral:      '#E8502A', // primary accent
        'coral-dim':'#F2A48E', // soft coral for hover, tags
        mist:       '#F0EEE9', // alternate section background
        rule:       '#E2DED8', // borders, dividers
        caption:    '#8A8480', // labels, eyebrows, captions (large-text only — fails AA on body)
        muted:      '#5F5A55', // muted body paragraphs — passes WCAG AA (6.5:1 on paper, 5.8:1 on mist)
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)', 'sans-serif'],
      },
      fontSize: {
        // Display scale
        'display-xl': ['clamp(3.5rem, 8vw, 7rem)',     { lineHeight: '0.95', letterSpacing: '-0.03em'  }],
        'display-lg': ['clamp(2.5rem, 5vw, 4.5rem)',   { lineHeight: '1.0',  letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.1',  letterSpacing: '-0.02em'  }],
        // Body
        'body-lg':    ['1.25rem',  { lineHeight: '1.6'  }],
        'body':       ['1rem',     { lineHeight: '1.65' }],
        'caption':    ['0.8125rem',{ lineHeight: '1.5', letterSpacing: '0.04em' }],
      },
      borderRadius: {
        pill:   '9999px',
        card:   '16px',
        button: '10px',
        input:  '10px',
      },
      boxShadow: {
        card:        '0 2px 12px 0 rgba(13,13,13,0.06), 0 1px 3px 0 rgba(13,13,13,0.04)',
        'card-hover':'0 8px 32px 0 rgba(13,13,13,0.10)',
      },
      maxWidth: {
        content: '1200px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'orbit':     'orbit 20s linear infinite',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '1',   transform: 'scale(1)'    },
          '50%':      { opacity: '0.5', transform: 'scale(0.85)' },
        },
        orbit: {
          '0%':   { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
