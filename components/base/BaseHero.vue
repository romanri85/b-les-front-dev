<script setup lang="js">
import { defineProps, ref } from 'vue'

const props = defineProps({
  heroName: String,
  heroDescription: String,
  heroImage: String,
  buttons: Object,
})





const imageLoaded = ref(false)
</script>

<template>
  <div class="relative xl:mt-[-100px] lg:mt-[-112px] md:mt-[-65px] mt-[-65px] w-screen h-[300px] md:h-[300px] lg:h-[560px]">
    <!-- Dark overlay -->
    <div class="absolute w-full h-full bg-black opacity-25" />
    <!-- Your existing content -->
    <div
      :class="{ 'opacity-visible': imageLoaded, 'opacity-hidden': !imageLoaded }"
      class="w-full text-white absolute left-1/2 lg:top-[180px] md:top-[120px] top-[120px] -translate-x-1/2"
    >
      <h1 class="w-full hidden md:block text-center text-shadow">
        {{ $t(props.heroName) }}
      </h1>
      <h2 class="w-full md:hidden text-center text-shadow">
        {{ $t(props.heroName) }}
      </h2>
      <h6 class="hidden md:block m-auto w-[90vw] md:w-[500px] text-white text-center text-shadow pt-6">
        {{ $t(props.heroDescription) }}
      </h6>
    </div>
    <nuxt-img :src="props.heroImage" placeholder class="w-full h-full object-cover object-right " @load="imageLoaded = true" />
  </div>
</template>

<style scoped>
.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.opacity-hidden {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.opacity-visible {
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}
</style>
