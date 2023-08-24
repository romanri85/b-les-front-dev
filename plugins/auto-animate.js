// Import the package
import {autoAnimatePlugin} from "@formkit/auto-animate/vue";

// Register the package
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(autoAnimatePlugin);
});



