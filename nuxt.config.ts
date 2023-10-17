// import {i18n} from './i18n.config';
import { sentryVitePlugin } from '@sentry/vite-plugin'

export default defineNuxtConfig({

  // build: {
  //   transpile: ['fsevents'],
  // },

  css: ['~/assets/styles/index.scss'],
  // sourcemap: {
  //   client: true,
  //   server: true,
  // },
  modules: [
    '@nuxtjs/algolia',
    'nuxt-headlessui',
    '@nuxt/image',
    '@nuxtjs/i18n',
    'nuxt-lodash',
    'nuxt-icon',
    ['nuxt-swiper', {
      // Swiper options

    }],
    '@pinia/nuxt',
    ['@formkit/nuxt'],
    // '@nuxtjs/eslint-module',

  ],

  algolia: {
    apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
    applicationId: process.env.ALGOLIA_APPLICATION_ID,
    instantSearch: {
      theme: 'algolia',
    },
    cache: true,

  },
  runtimeConfig: {
    public: {
      FORMKIT_PRO_KEY: process.env.NUXT_PUBLIC_FORMKIT_PRO_KEY,
      ALGOLIA_SEARCH_API_KEY: process.env.ALGOLIA_SEARCH_API_KEY,
      ALGOLIA_APPLICATION_ID: process.env.ALGOLIA_APPLICATION_ID,
      baseURL: process.env.BASE_URL,
    },
  },
  devtools: { enabled: true },
  plugins: [
    '~/plugins/auto-animate.js',
    // '~/plugins/sentry.plugin.js',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
        autoprefixer: {},
    },
  },
  headlessui: {
    prefix: 'Headless',
  },

  i18n: {
    vueI18n: './i18n.config.ts', // if you are using custom path, default
  },

  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  routeRules: {
    '/': { prerender: true },
  }
  // vite: {
  //   plugins: [
  //     // Setup sentry error reporting with source maps
  //     process.env.NODE_ENV === 'development'
  //       ? null
  //       : sentryVitePlugin({
  //         include: '.nuxt/dist',
  //         ignore: ['node_modules', 'nuxt.config.ts'],
  //       }),
  //   ],
  // },

  /*
     */

})
