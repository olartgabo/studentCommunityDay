/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef1f8',
          100: '#d4daea',
          200: '#a6b3d2',
          300: '#6b7eb0',
          400: '#364f8c',
          500: '#06175D',
          600: '#051349',
          700: '#040f3a',
          800: '#030a29',
          900: '#02071a',
          950: '#01040f',
        },
        cyan: {
          50: '#e6fbff',
          100: '#b8f3ff',
          200: '#7ee7ff',
          300: '#38d6ff',
          400: '#00bff0',
          500: '#009dc8',
          600: '#007ea3',
          700: '#035e7a',
        },
        ink: {
          0: '#ffffff',
          25: '#fbfcfd',
          50: '#f5f7fa',
          100: '#eceff5',
          200: '#dde2ec',
          300: '#c2cad9',
          400: '#8a93a6',
          500: '#5b6478',
          600: '#3d4557',
          700: '#262d3d',
          800: '#161b29',
          900: '#0a0d17',
          950: '#04060c',
        },
        signal: {
          success: '#16a36a',
          warning: '#d68a14',
          danger: '#d8425a',
          live: '#5fe39d',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'hero': '-0.035em',
      },
      fontSize: {
        'display-1': ['clamp(60px, 9vw, 128px)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        'display-2': ['clamp(48px, 7vw, 96px)', { lineHeight: '0.94', letterSpacing: '-0.035em' }],
      },
      backgroundImage: {
        'blueprint': 'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
        'blueprint-light': 'linear-gradient(rgba(6,23,93,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(6,23,93,0.06) 1px, transparent 1px)',
        'dot-field': 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
        'aurora': 'radial-gradient(60% 80% at 80% 20%, rgba(0,191,240,0.32), transparent 60%), radial-gradient(50% 60% at 10% 90%, rgba(56,214,255,0.18), transparent 60%)',
      },
      animation: {
        'pulse-live': 'pulseLive 1.6s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'cursor-blink': 'cursorBlink 1.1s steps(2, start) infinite',
        'shimmer': 'shimmer 6s ease-in-out infinite',
        'drift': 'drift 18s ease-in-out infinite alternate',
      },
      keyframes: {
        pulseLive: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(95, 227, 157, 0.55)' },
          '50%': { boxShadow: '0 0 0 10px rgba(95, 227, 157, 0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        drift: {
          '0%': { transform: 'translate3d(0,0,0) scale(1)' },
          '100%': { transform: 'translate3d(40px,-30px,0) scale(1.08)' },
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 0 1px rgba(0,191,240,0.4), 0 12px 32px -6px rgba(0,191,240,0.45)',
        'glow-strong': '0 0 40px rgba(0,191,240,0.5), 0 0 80px rgba(0,191,240,0.25)',
      },
    },
  },
  plugins: [],
};
