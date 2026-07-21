import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green:   '#1B7A4A',
          'green-l': '#22974F',
          gold:    '#E8A020',
          dark:    '#0F1923',
          'dark-2': '#152030',
          'dark-3': '#1E2D3D',
        },
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body:    ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        xl2: '16px',
        xl3: '24px',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(27,122,74,0.18) 0%, transparent 70%)',
        'card-gradient': 'linear-gradient(160deg, rgba(27,122,74,0.12) 0%, rgba(21,32,48,1) 100%)',
      },
      animation: {
        pulse2: 'pulse2 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        pulse2: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.4', transform: 'scale(0.75)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
