/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary': '#FFD370',
        'secondary': '#333333',
      },
    },
    container: {
      padding: '32px',
      center: true,
    },
  },
  plugins: [],
}
