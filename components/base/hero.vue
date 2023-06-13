<script setup lang="ts">
const props = defineProps({
  heroName: String,
  heroDescription: String,
  heroImage: String
})

</script>

<template>
  <div
      class="xl:mt-[-100px] lg:mt-[-95px] md:mt-[-65px] mt-[-65px] w-screen h-[240px] md:h-[300px] lg:h-[500px] xl:h-[550px] relative">
    <div class="text-white absolute left-1/2 top-[40%] -translate-x-1/2">
      <h1 class="text-center">{{$t(props.heroName)}}</h1>
      <h6 class="w-[500px] text-white text-center pt-6">{{$t(props.heroDescription)}}</h6>
    </div>
    <nuxt-img :src="props.heroImage" class="w-full h-full"></nuxt-img>
  </div>
</template>

<style scoped>

</style>