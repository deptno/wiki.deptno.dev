/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./component/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    minHeight: {
      '24': '24rem',
    },
    extend: {
      screens: {
        '3xl': '1792px'
      }
    },
  },
  plugins: [],
}

