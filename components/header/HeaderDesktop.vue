<script setup lang="ts">
import BaseLogo from '~/components/base/BaseLogo.vue'
import TextMenuItems from '~/components/header/TextMenuItems.vue'
import IconsMenuItems from '~/components/header/IconsMenuItems.vue'

const props = defineProps({
  light: {
    type: Boolean,
    default: true,
  },
})

const { locale, setLocale } = useI18n()

// async function toggleLocale() {
//   const newLocale = locale.value === 'en' ? 'ru' : 'en'
//   await setLocale(newLocale)
//   await nextTick()
// }
</script>

<template>
  <!--    <header class="header relative z-30"> -->
  <!--  <client-only> -->
  <div
    class=" bg-transparent main-container font-mono whitespace-nowrap flex  justify-between items-center"
  >
    <!--            logo -->
    <NuxtLink to="/">
      <BaseLogo :light="props.light" />
    </NuxtLink>

    <TextMenuItems :light="props.light" />

    <!--            contact us, favourite, search menu items -->

    <IconsMenuItems class="flex " :light="props.light" />

    <!--            change language menu item -->
<!--    <div>-->
      <!--        <button type="button" class=" font-mono text-sm " @click="toggleLocale"> -->
      <!--          <h3 :class="{ 'text-white': props.light }"> -->
      <!--            {{ locale === 'en' ? "EN" : "RU" }} -->
      <!--          </h3> -->
      <!--        </button> -->
<!--    </div>-->
  </div>
  <!--    thin line between header and content -->

  <div class="border-b w-full border-white! white-header" />

<!--  </client-only> -->
  <!--    </header> -->
</template>

<style scoped>
.white-header{
  border-color: #ffffff!important;
}
</style>
