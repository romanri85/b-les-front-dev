// import {i18n} from './i18n.config';

const config = {
    css: ['~/assets/styles/index.scss'],
    modules: [
        '@nuxtjs/algolia',
        'nuxt-headlessui',
        '@nuxt/image',
        '@nuxtjs/i18n',
        'nuxt-lodash',
        'nuxt-icon',
        ['nuxt-swiper', {
            // Swiper options

        }], '@pinia/nuxt',
        ['@formkit/nuxt'],
        "@hebilicious/vue-query-nuxt",
        // '@nuxtjs/eslint-module',
        "nuxt-csurf",

    ],

    algolia: {
        apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
        applicationId: process.env.ALGOLIA_APPLICATION_ID,
        instantSearch: {
            theme: 'algolia'
        }
    },
    runtimeConfig: {
        public: {
            FORMKIT_PRO_KEY: process.env.NUXT_PUBLIC_FORMKIT_PRO_KEY,
            ALGOLIA_SEARCH_API_KEY: process.env.ALGOLIA_SEARCH_API_KEY,
            ALGOLIA_APPLICATION_ID: process.env.ALGOLIA_APPLICATION_ID,
            baseURL: process.env.BASE_URL,
        },
    },
    devtools: {enabled: true},
    plugins: [
        '~/plugins/auto-animate.js',],
    vueQuery: {
        // useState key used by nuxt for the vue query state.
        stateKey: "vue-query-nuxt", // default
        // If you only want to import some functions, specify them here.
        // You can pass false or an empty array to disable this feature.
        // default: ["useQuery", "useQueries", "useInfiniteQuery", "useMutation", "useIsFetching", "useIsMutating", "useQueryClient"]
        autoImports: ["useQuery"],
        // Pass the vue query client options here ...
        queryClientOptions: {
            defaultOptions: {queries: {staleTime: 1000 * 60 * 60, cacheTime: 1000 * 60 * 60}} // default
        },
        // Pass the vue query plugin options here ....
        vueQueryPluginOptions: {}
    },


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
        vueI18n: './i18n.config.ts' // if you are using custom path, default
    },

    pinia: {
        autoImports: [
            // automatically imports `defineStore`
            'defineStore', // import { defineStore } from 'pinia'
            ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
    },
    vite: {
        define: {
            'process.env': process.env,
        },
        ssr: {
            noExternal: ['imagesloaded'],
        },
    },

};

export default config;
