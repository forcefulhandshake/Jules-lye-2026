/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media', // Enable dark mode based on system preference
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'franca': ['franca', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        // Jules's personal brand colors - light mode matches dark mode
        'jules-primary': '#818CF8',        // Lighter indigo (dark mode color)
        'jules-primary-dark': '#818CF8',   // Same as light mode
        'jules-accent': '#FCD34D',         // Lighter amber (dark mode color)
        'jules-accent-dark': '#FCD34D',    // Same as light mode
        'jules-gray': '#1F2937',           // Dark gray for text
        // Legacy colors (can be removed later)
        'involved-blue': '#0033ff',
        'involved-gray': '#202535',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      fontSize: {
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
} 