/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        omegle: ['var(--font-omegle)', 'sans-serif'], // Añade la fuente Omegle
        montserrat: ['var(--font-montserrat)', 'sans-serif'], // Añade la fuente Montserrat
      },
    },
  },
  plugins: [],
}