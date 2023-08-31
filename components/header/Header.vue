<script setup lang="ts">
import TextMenuItems from "~/components/header/TextMenuItems.vue";
import IconsMenuItems from "~/components/header/IconsMenuItems.vue";
import Burger from "~/components/header/BurgerWhite.vue";
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/vue'
import {useIsBurgerOpenStore} from "~/stores/isBurgerOpenStore";
import TabletMobileMenu from "~/components/header/TabletMobileMenu.vue";
import Logo from "~/components/base/Logo.vue";
import {useViewportSize} from "~/composables/useViewportSize";
import HeaderMobile from "~/components/header/HeaderMobile.vue";
import HeaderTablet from "~/components/header/HeaderTablet.vue";
import HeaderDesktop from "~/components/header/HeaderDesktop.vue";

const isBurgerOpenStore = useIsBurgerOpenStore()


// set light layout

const props = defineProps({light: {type: Boolean, default: true}})
const viewport = useViewportSize();


const {locale, setLocale} = useI18n()





</script>
<template>
  <header class=" relative z-30">

    <div>
      <header-mobile :light="props.light" v-if="viewport.isMobile"  />
      <header-tablet :light="props.light" v-else-if="viewport.isTablet"  />
      <header-desktop :light="props.light" v-else-if="viewport.isDesktop" />
    </div>

  </header>


</template>
<style>

</style>
