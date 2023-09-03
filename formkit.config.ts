import {fr} from '@formkit/i18n'
import {defineFormKitConfig} from '@formkit/vue'
import {generateClasses} from '@formkit/themes'
import myTailwindTheme from './tailwind-theme.js'
import {genesisIcons} from "@formkit/icons";
import {createProPlugin, inputs} from '@formkit/pro'
// import '@formkit/themes/genesis'
// import '@formkit/pro/genesis'
// formkit.config.js
// import FORMKIT_PRO_KEY from '@/.env'


export default defineFormKitConfig(() => {
    // here we can access `useRuntimeConfig` because
    // our function will be called by Nuxt.
    const config = useRuntimeConfig()
    const classes = generateClasses(myTailwindTheme)
    // and we can use the variables to import secrets
    const pro = createProPlugin(config.public.FORMKIT_PRO_KEY, inputs)
    const icons = {
        ...genesisIcons,
    }

    return {
        plugins: [pro],
        locales: {fr},
        locale: 'fr',
        config: {
            classes, icons
        }
    }
})

