import Vue from 'vue'
import YmapPlugin from 'vue-yandex-maps'

const settings = {
    apiKey: '4b36a04b-c3bd-460a-b5ad-72f6766c8765',
    lang: 'ru_RU',
    coordorder: 'latlong',
    enterprise: false,
    version: '2.1'
} // plugin settings


export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(ymapPlugin, settings);
});