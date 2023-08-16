<script setup lang="ts">
import PrimaryButtonBigger from "~/components/buttons/PrimaryButtonBigger.vue";
const props = defineProps({
  heroName: String,
  heroDescription: String,
  heroImage: String,
  buttons: Object,
})

</script>

<template>
  <div
      class="xl:mt-[-100px] lg:mt-[-95px] md:mt-[-65px] mt-[-65px] w-screen h-[240px] md:h-[300px] lg:h-[500px] xl:h-[550px] relative w-full">
    <div class="text-white absolute left-1/2 top-[40%] -translate-x-1/2">
      <h1 class="text-center text-shadow">{{$t(props.heroName)}}</h1>
      <h6 class="w-[90vw] md:w-[500px] text-white text-center pt-6">{{$t(props.heroDescription)}}</h6>
      <div v-if="props.buttons" class="flex gap-10 justify-center">
        <NuxtLink :to="props.buttons.searchPicByTag.link">
          <primary-button-bigger>{{ props.buttons.searchPicByTag.name}}</primary-button-bigger>
        </NuxtLink>
        <NuxtLink :to="props.buttons.projects.link">
        <primary-button-bigger>{{ props.buttons.projects.name }}</primary-button-bigger>
        </NuxtLink>
      </div>
    </div>
    <nuxt-img :src="props.heroImage" class="w-full h-full object-cover"></nuxt-img>
  </div>
</template>

<style scoped>
.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

</style>