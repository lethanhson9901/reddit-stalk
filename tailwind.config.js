/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'reddit-dark': '#1a1a1b',
        orange: {
          500: '#ff4500',  // Reddit's orange
          600: '#e03d00',
        }
      }
    }
  },
  plugins: [],
}