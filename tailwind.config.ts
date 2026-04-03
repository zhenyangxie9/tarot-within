import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './types/**/*.ts',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        void: {
          DEFAULT: '#0a0a0f',
          800: '#12121a',
          700: '#1a1a28',
          600: '#24243a',
          500: '#2e2e4a',
        },
        arcane: {
          DEFAULT: '#7c6fe0',
          dim: '#4a4080',
          glow: '#a89af0',
          light: '#c4b8ff',
        },
        oracle: {
          DEFAULT: '#d4af7a',
          dim: '#8a7040',
          glow: '#f0d4a0',
          light: '#f8e8c4',
        },
      },
      boxShadow: {
        'glow-arcane': '0 0 24px 4px rgba(124, 111, 224, 0.4)',
        'glow-arcane-lg': '0 0 48px 12px rgba(124, 111, 224, 0.35)',
        'glow-oracle': '0 0 24px 4px rgba(212, 175, 122, 0.4)',
        'glow-oracle-lg': '0 0 48px 12px rgba(212, 175, 122, 0.35)',
        'glow-card': '0 0 40px 8px rgba(168, 154, 240, 0.3)',
        'glow-selected': '0 0 0 2px rgba(168, 154, 240, 0.8), 0 0 32px 8px rgba(168, 154, 240, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.1' },
          '50%': { opacity: '0.9' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
