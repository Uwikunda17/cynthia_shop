/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui'],
        sans: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        ink: '#0f172a',
        cloud: '#e2e8f0',
        blush: '#f8fafc',
        accent: '#0ea5e9',
        luxe: '#fcd34d',
        charcoal: '#111827',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [],
}
