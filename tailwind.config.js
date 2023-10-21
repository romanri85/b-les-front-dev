const FormKitVariants = require('@formkit/themes/tailwindcss')

module.exports = {
  content: [
    './tailwind-theme.js',
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './default.vue',
    './assets/**/*.{css,scss}',
    './assets/scss/**/*.{css,scss}',
    './assets/styles/**/*.{css,scss}',
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: 'hsl(0, 0%, 11%)',
        secondaryDark: '#211D1D',
        darkGrey: 'hsl(0, 0%, 46%)',
        lightGrey: 'hsl(0, 0%, 98%)',
        normalGrey: 'hsl(0, 0%, 61%)',
        normalBeige: 'hsl(45, 33%, 95%)',
      },
      fontFamily: {
        sans: [
          'HelveticaNeueLTPro-Roman',
          'Helvetica Neue',
          'Arial',
          'Roboto',
        ],
        mono: [
          'abchanel-corpo',
          'Arial',
          'Roboto',
        ],
      },
      fontSize: {

        'h1-lg': ['40px', { lineHeight: '45px' }],
        '40-mono': ['40px', { lineHeight: '45px' }],
        '30-mono': ['30px', { lineHeight: '36px' }],
        '25-mono': ['25px', { lineHeight: '31px' }],
        'h2-lg': ['20px', { lineHeight: '26px' }],
        '18-mono': ['18px', { lineHeight: '35px' }],
        '16-mono': ['16px', { lineHeight: '24px' }],
        'h3-lg': ['14px', { lineHeight: '20px' }],
        'h4-lg': ['12px', { lineHeight: '18px' }],
        'h5-lg': ['16px', { lineHeight: '23px' }],
        'h6-lg': ['11px', { lineHeight: '14px' }],
        'p-lg': ['14px', { lineHeight: '18px' }],

        'h1-md': ['30px', { lineHeight: '43px' }],
        'h2-md': ['22px', { lineHeight: '30px' }],
        'h3-md': ['14px', { lineHeight: '20px' }],
        'h4-md': ['13px', { lineHeight: '18px' }],
        'h5-md': ['15px', { lineHeight: '21px' }],
        // 'p-md': ['15px', {lineHeight: '21px'}],
        'p-md': ['14px', { lineHeight: '21px' }],

        'h1-sm': ['29px', { lineHeight: '41px' }],
        'h2-sm': ['23px', { lineHeight: '33px' }],
        'h3-sm': ['14px', { lineHeight: '20px' }],
        'h4-sm': ['13px', { lineHeight: '18px' }],
        'h5-sm': ['15px', { lineHeight: '21px' }],
        // 'p-sm': ['15px', {lineHeight: '21px'}],
        'p-sm': ['14px', { lineHeight: '21px' }],
      },
      fontWeight: {
        bold: 700,
        semibold: 600,
        regular: 400,
        light: 300,
        lighter: 200,
        thin: 100,

      },
      screens: {
        sm: '362px',
        md: '770px',
        mdLg: '1024px',
        lg: '1442px',
        xl: '1922px',
      },

    },
  },
  plugins: [FormKitVariants, require('tailwindcss-important')()],

}
