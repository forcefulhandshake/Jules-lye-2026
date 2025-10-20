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
        // Jules's personal brand colors
        'jules-primary': '#6366F1',        // Indigo - professional yet creative
        'jules-primary-dark': '#818CF8',   // Lighter indigo for dark mode
        'jules-accent': '#F59E0B',         // Amber - warm and approachable
        'jules-accent-dark': '#FCD34D',    // Lighter amber for dark mode
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