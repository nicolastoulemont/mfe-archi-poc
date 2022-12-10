/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require('@tailwindcss/forms')],
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {},
  },
}
