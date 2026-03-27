/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        bg: '#080808',
        surface: '#111111',
        surface2: '#1A1A1A',
        surface3: '#222222',
        gold: {
          DEFAULT: '#C9A96E',
          light: '#E2C689',
          dark: '#A8874E',
          muted: 'rgba(201, 169, 110, 0.12)',
        },
        border: 'rgba(255, 255, 255, 0.07)',
        text: {
          primary: '#F0EDE8',
          secondary: '#8C8C8C',
          muted: '#5A5A5A',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'gold': '0 0 30px rgba(201, 169, 110, 0.15)',
        'gold-sm': '0 0 15px rgba(201, 169, 110, 0.1)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 20px 60px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
}
