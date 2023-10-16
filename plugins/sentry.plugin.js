import * as Sentry from '@sentry/vue'

export default defineNuxtPlugin((nuxtApp) => {
  Sentry.init({
    app: nuxtApp.vueApp,
    dsn: 'https://ab7e48b8a9a0b5939675a7eda3081d97@o4506039434805248.ingest.sentry.io/4506039440441344',
    sampleRate: 0.25,
    tracesSampleRate: 0.5,
    logErrors: true,

  })
})
