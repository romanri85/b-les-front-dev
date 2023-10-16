<script setup lang="js">
import { useViewportSize } from '~/composables/useViewportSize'
import HeaderMobile from '~/components/header/HeaderMobile.vue'
import HeaderTablet from '~/components/header/HeaderTablet.vue'
import HeaderDesktop from '~/components/header/HeaderDesktop.vue'

// set light layout

const props = defineProps({ light: { type: Boolean, default: true } })
const viewport = useViewportSize()

const { locale, setLocale } = useI18n()
</script>

<template>
  <header class=" relative z-30">
    <div>
      <HeaderMobile v-if="viewport.isMobile" :light="props.light" />
      <HeaderTablet v-else-if="viewport.isTablet" :light="props.light" />
      <HeaderDesktop v-else :light="props.light" />
    </div>
  </header>
</template>

<style>

</style>
