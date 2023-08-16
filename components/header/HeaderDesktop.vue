<script setup lang="ts">

// import Header from "~/components/header/Header.vue";
import Logo from "~/components/base/Logo.vue";
import TextMenuItems from "~/components/header/TextMenuItems.vue";
import IconsMenuItems from "~/components/header/IconsMenuItems.vue";


const {locale, setLocale} = useI18n()


const props = defineProps({
  toggleLocale: {
    type: Function,
    required: true
  }
});

</script>

<template>


  <!--    <header class="header relative z-30">-->
<!--  <client-only>-->
    <div
        class=" bg-transparent main-container font-mono whitespace-nowrap flex  justify-between items-center">
      <!--            logo-->
      <NuxtLink to="/">
        <logo :light="true"/>
      </NuxtLink>

      <text-menu-items :light="true"/>

      <!--            contact us, favourite, search menu items-->

      <icons-menu-items class="flex " :light="true"/>

      <!--            change language menu item-->
      <div>
        <button type="button" class=" font-mono text-sm " @click="props.toggleLocale">
          <h3 :class="'text-white'">
            {{ locale === 'en' ? "EN" : "RU" }}
          </h3>
        </button>
      </div>
    </div>
    <!--    thin line between header and content-->

    <div class="border-b w-full border-white"></div>


<!--  </client-only>-->
  <!--    </header>-->


</template>

<style scoped>

</style>