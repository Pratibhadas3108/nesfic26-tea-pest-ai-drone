/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
