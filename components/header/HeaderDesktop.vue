<script setup lang="ts">

import BaseLogo from "~/components/base/BaseLogo.vue";
import TextMenuItems from "~/components/header/TextMenuItems.vue";
import IconsMenuItems from "~/components/header/IconsMenuItems.vue";


const {locale, setLocale} = useI18n()

async function toggleLocale() {

  const newLocale = locale.value === 'en' ? 'ru' : 'en'
  await setLocale(newLocale)
  await nextTick()

}

const props = defineProps({
  light: {
    type: Boolean,
    default: true
  }
});

</script>

<template>


  <!--    <header class="header relative z-30">-->
  <client-only>
    <div
        class=" bg-transparent main-container font-mono whitespace-nowrap flex  justify-between items-center">
      <!--            logo-->
      <NuxtLink to="/">
        <base-logo :light="props.light"/>
      </NuxtLink>

      <text-menu-items :light="props.light"/>

      <!--            contact us, favourite, search menu items-->

      <icons-menu-items class="flex " :light="props.light"/>

      <!--            change language menu item-->
      <div>
<!--        <button type="button" class=" font-mono text-sm " @click="toggleLocale">-->
<!--          <h3 :class="{ 'text-white': props.light }">-->
<!--            {{ locale === 'en' ? "EN" : "RU" }}-->
<!--          </h3>-->
<!--        </button>-->
      </div>
    </div>
    <!--    thin line between header and content-->

    <div class="border-b w-full border-white"></div>


  </client-only>
  <!--    </header>-->


</template>

<style scoped>

</style>