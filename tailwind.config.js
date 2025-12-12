/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Dark Theme Colors
        "corona-dark": "#000000",       // Main background
        "corona-card": "#191c24",       // Card/Sidebar background
        "corona-gray": "#2A3038",       // Borders/Inputs
        
        // Text Colors
        "corona-text-primary": "#ffffff",
        "corona-text-secondary": "#6c7293",
        
        // Neon Accents (Reference Image)
        "corona-green": "#00d25b",
        "corona-blue": "#0090e7",
        "corona-red": "#fc424a",
        "corona-pink": "#e91e63",       // Added for the Gradient Mix
        "corona-yellow": "#ffab00",
        
        // Legacy Kivo mappings
        "kivo-gold": "#ffab00",
        "kivo-gold-600": "#e69a00",
        "kivo-gold-soft": "rgba(255, 171, 0, 0.1)",
        "kivo-gray-900": "#ffffff",
        "kivo-gray-700": "#e5e7eb",
        "kivo-gray-500": "#6c7293",
        "kivo-gray-200": "#2A3038",
        "kivo-gray-100": "#0f1015",
        "kivo-gray-50": "#000000"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}