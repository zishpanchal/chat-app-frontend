/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {"open" :["Open Sans", "sans-serif"],}
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}

