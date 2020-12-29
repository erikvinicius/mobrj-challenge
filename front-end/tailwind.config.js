module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      'primary': '#F4FAFF',
      'secondary': '#2E5EAA',
      'secondary-hover': '#275090',
      'danger': '#e3342f',
    }),
    borderColor: theme => ({
       DEFAULT: theme('colors.gray.300', 'currentColor'),
      'primary': '#2E5EAA',
    }),
    textColor: {
      'primary': '#000000',
      'secondary': '#F4FAFF',
      'danger': '#e3342f',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
