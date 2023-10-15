import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';
export default defineNuxtPlugin((nuxtApp) => {
    const { vueApp } = nuxtApp;

    Sentry.init({
        app: [vueApp],
        dsn: 'https://ab7e48b8a9a0b5939675a7eda3081d97@o4506039434805248.ingest.sentry.io/4506039440441344>',
        environment: process.dev ? 'development' : 'production',
        // integrations: [
        //     new BrowserTracing({
        //         routingInstrumentation: Sentry.vueRouterInstrumentation(nuxtApp.$router)
        //     })
        // ],
        // // Set tracesSampleRate to 1.0 to capture 100%
        // // of transactions for performance monitoring.
        // // We recommend adjusting this value in production
        // tracesSampleRate: 1.0,
        // beforeSend (event, hint) {
        //     // Check if it is an exception, and if so, log it.
        //     if (event.exception) {
        //         // eslint-disable-next-line no-console
        //         console.error(`[Exeption handled by Sentry]: (${hint.originalException})`, { event, hint });
        //     }
        //     // Continue sending to Sentry
        //     return event;
        // }
        integrations: [
            new BrowserTracing({
                routingInstrumentation: Sentry.vueRouterInstrumentation(nuxtApp.$router),
            }),
            // new Sentry.Replay(),
            new Sentry.Replay({
                // Additional SDK configuration goes in here, for example:
                maskAllText: true,
                blockAllMedia: true,
            }),
        ],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,

        // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ["localhost", /^https:\/\/romanli\.me\/api/, /^https:\/\/romanli\.me/, ],

        // Capture Replay for 10% of all sessions,
        // plus for 100% of sessions with an error
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
    });

    vueApp.mixin(Sentry.createTracingMixins({ trackComponents: true, timeout: 2000, hooks: ['activate', 'mount', 'update'] }));
    Sentry.attachErrorHandler(vueApp, { logErrors: false, attachProps: true, trackComponents: true, timeout: 2000, hooks: ['activate', 'mount', 'update'] });

    return {
        provide: {
            sentrySetContext: Sentry.setContext,
            sentrySetUser: Sentry.setUser,
            sentrySetTag: Sentry.setTag,
            sentryAddBreadcrumb: Sentry.addBreadcrumb,
            sentryCaptureException: Sentry.captureException
        }
    };
});