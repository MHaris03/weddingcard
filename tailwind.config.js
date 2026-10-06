/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: { 950: '#1e040b', 900: '#3b0a14', 800: '#5c0b1e', 700: '#7a1028' },
        gold: { 200: '#f6e6b4', 300: '#ecd48a', 400: '#d4af37', 500: '#b8902a', 600: '#8a6a1f' },
        ivory: { 50: '#fffdf7', 100: '#fbf5e9', 200: '#f3e8d2' },
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        display: ['Cinzel', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        arabic: ['Amiri', 'serif'],
        urdu: ['"Noto Nastaliq Urdu"', 'Amiri', 'serif'],
      },
    },
  },
  plugins: [],
}
