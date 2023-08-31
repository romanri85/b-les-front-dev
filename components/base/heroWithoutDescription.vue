<script setup lang="ts">
import PrimaryButtonBigger from "~/components/buttons/PrimaryButtonBigger.vue";
const props = defineProps({
  heroName: String,
  heroImage: String,
  buttons: Object,
})

</script>

<template>
  <div
      class="xl:mt-[-100px] lg:mt-[-112px] md:mt-[-65px] mt-[-65px] w-screen h-[300px] md:h-[300px] lg:h-[560px]">
    <div class="text-white absolute left-1/2 lg:top-[180px] md:top-[120px] top-[120px] -translate-x-1/2">
      <h1 class="hidden md:block text-center whitespace-nowrap text-shadow">{{$t(props.heroName)}}</h1>
      <h2 class="md:hidden text-center whitespace-nowrap text-shadow">{{$t(props.heroName)}}</h2>
    </div>
    <nuxt-img :src="props.heroImage" class="w-full h-full object-cover"></nuxt-img>
  </div>
</template>

<style scoped>
.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

</style>