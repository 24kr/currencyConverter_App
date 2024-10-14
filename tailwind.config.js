/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
            backgroundImage: {
        'bgimg': "url('/public/bg.png')",
        'footer-texture': "url('/img/footer-texture.png')",
      }

    },

  },
  plugins: [],
  darkMode:"class",
}