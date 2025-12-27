/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "corona-dark": "#000000",
        "corona-card": "#191c24",
        "corona-gray": "#2A3038",
        "corona-text-primary": "#ffffff",
        "corona-text-secondary": "#6c7293",
        "corona-green": "#00d25b",
        "corona-blue": "#0090e7",
        "corona-red": "#fc424a",
        "corona-pink": "#e91e63",
        "corona-yellow": "#ffab00",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}