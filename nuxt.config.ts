import {i18n} from './i18n.config';

const config = {
    css: ['~/assets/styles/index.scss'],
    modules: [
        'nuxt-headlessui',
        '@nuxt/image-edge',
        '@nuxtjs/i18n',
        'nuxt-icon',
        ['nuxt-swiper', {
            // Swiper options
        }], '@pinia/nuxt',

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

    i18n,
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
            noExternal: ['masonry-layout', 'imagesloaded'],
        },
    },
};

export default config;
