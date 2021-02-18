module.exports = {
  purge: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'sm': '350px'
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled']
    }
  },
  plugins: [],
}
