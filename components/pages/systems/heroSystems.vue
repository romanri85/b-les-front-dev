<script setup lang="ts">
import { useRoute } from 'vue-router'
import PrimaryButtonBigger from '~/components/buttons/PrimaryButtonBigger.vue'

const props = defineProps({
  heroName: String,
  heroDescription: String,
  heroImage: String,
  buttons: Object,
})

const imageLoaded = ref(false)
const route = useRoute()
</script>

<template>
  <div
    class="xl:mt-[-100px] lg:mt-[-112px] md:mt-[-65px] mt-[-65px] w-screen h-[300px] md:h-[300px] lg:h-[560px]"
  >
    <div v-if="imageLoaded"  class="text-white absolute left-1/2 lg:top-[12vh] md:top-[10vh] top-[6vh] -translate-x-1/2">
      <h1 class="hidden md:block text-center whitespace-nowrap text-shadow main-container">
        {{ $t(props.heroName) }}
      </h1>
      <h2 class="md:hidden text-center whitespace-nowrap text-shadow">
        {{ $t(props.heroName) }}
      </h2>
      <!--      <h6  class="hidden md:block w-[90vw] md:w-[500px] text-white text-center pt-6">{{$t(props.heroDescription)}}</h6> -->
      <div :class="{ 'opacity-visible': imageLoaded, 'opacity-hidden': !imageLoaded }" v-if="props.buttons && imageLoaded" class="flex gap-24 justify-center pt-5 md:pt-10 lg:pt-20 md:whitespace-nowrap">
        <NuxtLink :to="props.buttons.swingDoors.link">
          <PrimaryButtonBigger :class="{ underline: route.path === '/systems/swing' }" class="hidden md:block">
            <h2>{{ $t(props.buttons.swingDoors.name) }}</h2>
          </PrimaryButtonBigger>
          <PrimaryButtonBigger :class="{ underline: route.path === '/systems/swing' }" class="md:hidden pt-6 md:pt-0">
            <h3>{{ $t(props.buttons.swingDoors.name) }}</h3>
          </PrimaryButtonBigger>
        </NuxtLink>
        <NuxtLink :to="props.buttons.slidingDoors.link">
          <PrimaryButtonBigger :class="{ underline: route.path === '/systems/slide' }" class="hidden md:block">
            <h2>{{ $t(props.buttons.slidingDoors.name) }}</h2>
          </PrimaryButtonBigger>
          <PrimaryButtonBigger :class="{ underline: route.path === '/systems/slide' }" class="md:hidden pt-6 md:pt-0">
            <h3>{{ $t(props.buttons.slidingDoors.name) }}</h3>
          </PrimaryButtonBigger>
        </NuxtLink>
      </div>
    </div>
    <nuxt-img placeholder :src="props.heroImage" class="w-full h-full object-cover object-right" @load="imageLoaded = true" />
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
