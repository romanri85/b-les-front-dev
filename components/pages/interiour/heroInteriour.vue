<script setup lang="ts">
import PrimaryButtonBigger from "~/components/buttons/PrimaryButtonBigger.vue";
import {useRoute} from "vue-router";

const route = useRoute()

const props = defineProps({
  heroName: String,
  heroDescription: String,
  heroImage: String,
  buttons: Object,
})







</script>

<template>

  <div
      class="xl:mt-[-100px] lg:mt-[-112px] md:mt-[-65px] mt-[-65px] w-screen h-[300px] md:h-[300px] lg:h-[560px]">
    <div class="text-white absolute left-1/2 lg:top-[180px] md:top-[120px] top-[120px] -translate-x-1/2">
      <h1  class="hidden md:block text-center whitespace-nowrap text-shadow">{{$t(props.heroName)}}</h1>
      <h2  class="md:hidden text-center whitespace-nowrap text-shadow">{{$t(props.heroName)}}</h2>
      <h6  class="hidden md:block w-[90vw] md:w-[500px] text-white text-shadow text-center pt-6">{{$t(props.heroDescription)}}</h6>
      <div v-if="props.buttons"  class="flex gap-10 justify-center">
        <NuxtLink :to="props.buttons.searchPicByTag.link">
          <primary-button-bigger :class="{'underline': route.path === '/search-tags'}" class="hidden md:block">
            <h2  class="text-shadow">{{ props.buttons.searchPicByTag.name }}</h2>
          </primary-button-bigger>
          <primary-button-bigger :class="{'underline': route.path === '/search-tags'}" class="md:hidden pt-6 md:pt-0">
            <h3  class="text-shadow">{{ props.buttons.searchPicByTag.name }}</h3>
          </primary-button-bigger>
        </NuxtLink>

        <NuxtLink :to="props.buttons.projects.link">
          <primary-button-bigger :class="{'underline': route.path === '/interior'}" class="hidden md:block">
            <h2  class="text-shadow">{{ props.buttons.projects.name }}</h2>
          </primary-button-bigger>
          <primary-button-bigger :class="{'underline': route.path === '/interior'}" class="md:hidden pt-6 md:pt-0">
            <h3  class="text-shadow">{{ props.buttons.projects.name }}</h3>
          </primary-button-bigger>
        </NuxtLink>

      </div>

    </div>
    <nuxt-img  :src="props.heroImage" class="w-full h-full object-cover object-right"></nuxt-img>
  </div>

</template>

<style scoped>
.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

</style>