/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        'secondary': '#3A6B88',
        'neutral': '#FAFAFA',
        'neutral-drop-zone': '#F6F6F6'
      }
    },

  },
  plugins: [],
}

