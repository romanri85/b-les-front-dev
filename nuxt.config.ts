// import {i18n} from './i18n.config';
import { sentryVitePlugin } from '@sentry/vite-plugin'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  meta: {
    title: 'Двери Брянский лес',
  },
  image:{
    provider: 'ipx',
  },

  build: {
    transpile: ['vuetify','fsevents'],
  },

  css: ['~/assets/styles/index.scss'],
  // sourcemap: {
  //   client: true,
  //   server: true,
  // },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    "@hebilicious/vue-query-nuxt",
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
    [
      'yandex-metrika-module-nuxt3',
      {
        id: '37083305',
        webvisor: true,
        // consoleLog: true,
        // clickmap: true,
        // useCDN: false,
        // trackLinks: true,
        // accurateTrackBounce: true,
      }
    ]

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
    '/about-us': { prerender: true },
    '/delivery-and-installation': { prerender: true },
    '/door-hardware': { prerender: true },
    '/plinth': { prerender: true },
    '/sale': { prerender: true },
    '/systems/slide': { prerender: true },
    '/systems/swing': { prerender: true },
    '/to-dealers': { prerender: true },
    '/to-designers': { prerender: true },
    '/interior': { prerender: true },
    '/catalog': { prerender: true },
    '/search': { prerender: true },
    '/search-tags': { prerender: true },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  vueQuery: {
    // useState key used by nuxt for the vue query state.
    stateKey: "vue-query-nuxt", // default
    // If you only want to import some functions, specify them here.
    // You can pass false or an empty array to disable this feature.
    // default: ["useQuery", "useQueries", "useInfiniteQuery", "useMutation", "useIsFetching", "useIsMutating", "useQueryClient"]
    autoImports: ["useQuery"],
    // Pass the vue query client options here ...
    queryClientOptions: {
      defaultOptions: { queries: { staleTime: 5000, refetchOnMount: false, refetchOnReconnect: false, refetchOnWindowFocus: false } } // default
    },
    // Pass the vue query plugin options here ....
    vueQueryPluginOptions: {}
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
