/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f9',
          100: '#dbe5f1',
          200: '#bacde3',
          300: '#8daed2',
          400: '#5d8ebe',
          500: '#3b71a8',
          600: '#2d588a',
          700: '#25466f',
          800: '#1e3a8a',
          900: '#0f172a',
          950: '#0a0f1d',
        },
        tea: {
          50: '#f2f8f4',
          100: '#e1efe6',
          200: '#c5e0d0',
          300: '#9bc8b0',
          400: '#6ca98a',
          500: '#488c6a',
          600: '#357154',
          700: '#2c5b45',
          800: '#254a3a',
          900: '#203d30',
          950: '#0e221b',
        }
      }
    },
  },
  plugins: [],
}
