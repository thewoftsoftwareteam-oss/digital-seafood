/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grill: {
          dark: '#141416',       // Deep charcoal grill
          card: '#1e1e24',       // Charcoal card
          surface: '#272730',    // Slate surface
          border: '#373742',     // Subtle border
          accent: '#ea580c',     // Ember flame orange (Solid)
          amber: '#d97706',      // Golden charcoal amber (Solid)
          yellow: '#eab308',     // Sea lemon yellow (Solid)
          light: '#f8fafc',      // Sea salt ivory (Solid)
        }
      },
      fontFamily: {
        sans: ['Inter', 'Kantumruy Pro', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
