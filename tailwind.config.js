/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./default.vue",
  ],
  theme: {
    extend: {
      colors: {
        'primaryDark': '#141414',
        'secondaryDark': '#211D1D',
        'primaryGrey': '#767676',
        'secondaryGrey': '#ECECEC',
        'white': '#fff'
      },
      fontFamily: {
        sans: [
          'Ag Helvetica',
          '"Helvetica Neue"',
          'Arial',
          'Roboto',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        mono: [
          'abchanel-corpo',
          'ABChanelCorpoRegular',
          'Open Sans',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
      fontSize: {
        sm: ['14px', { lineHeight: '19.85px' }],
        base: ['16px', { lineHeight: '22.7px' }],
        lg: ['25px', { lineHeight: '35.4px' }],
        xl: ['50px', { lineHeight: '70.85px' }],
        '2xl': ['70px', { lineHeight: '99.2px' }],
        'sans-sm': ['17px', { lineHeight: '19.55px' }],
        'sans-base': ['17px', { lineHeight: '30px' }],
      },
      fontWeight: {
        semibold: 600,
        bold: 700,
        regular: 400,
        'sans-bold': 800,
      },
      screens: {
        sm: '360px',
        md: '768px',
        lg: '1440px',
        xl: '1920px',
      },
      container: {
        center: true,
        screens: {
          sm: '320px',
          md: '698px',
          lg: '1260px',
          xl: '1454px',
        },
        maxWidth: '1024px',
      },
    },
    plugins: [],
  }
}
