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
      <h1 class="hidden md:block text-center whitespace-nowrap text-shadow main-container">{{$t(props.heroName)}}</h1>
      <h2 class="md:hidden text-center whitespace-nowrap text-shadow">{{$t(props.heroName)}}</h2>
<!--      <h6  class="hidden md:block w-[90vw] md:w-[500px] text-white text-center pt-6">{{$t(props.heroDescription)}}</h6>-->
      <div v-if="props.buttons" class="flex gap-24 justify-center pt-5 md:pt-10 lg:pt-20 md:whitespace-nowrap">
        <NuxtLink :to="props.buttons.swingDoors.link">
          <primary-button-bigger :class="{ 'underline': route.path === '/systems/swing' }" class="hidden md:block">
            <h2>{{ $t(props.buttons.swingDoors.name) }}</h2>
          </primary-button-bigger>
          <primary-button-bigger :class="{ 'underline': route.path === '/systems/swing' }" class="md:hidden pt-6 md:pt-0"><h3>{{ $t(props.buttons.swingDoors.name)}}</h3></primary-button-bigger>
        </NuxtLink>
        <NuxtLink :to="props.buttons.slidingDoors.link">
          <primary-button-bigger :class="{ 'underline': route.path === '/systems/slide' }" class="hidden md:block"><h2>{{ $t(props.buttons.slidingDoors.name) }}</h2></primary-button-bigger>
          <primary-button-bigger :class="{ 'underline': route.path === '/systems/slide' }" class="md:hidden pt-6 md:pt-0"><h3>{{ $t(props.buttons.slidingDoors.name) }}</h3></primary-button-bigger>
        </NuxtLink>
      </div>
    </div>
    <nuxt-img placeholder loading="lazy" :src="props.heroImage" class="w-full h-full object-cover object-right"></nuxt-img>
  </div>
</template>

<style scoped>
.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
.underline {
  text-decoration: underline;
  text-underline-offset: 0.3em;  /* adjust as needed */
}

</style>