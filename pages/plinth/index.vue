<script setup lang="ts">
import BaseHero from '~/components/base/BaseHero.vue'
import { baseURL } from '~/config'

const heroName = 'plinthHeader'
const heroDescription = ''
const heroImage = '/plinth/plinth-bg.webp'
const plinths = ref([])

async function fetchPlinths() {
  plinths.value = await $fetch(`${baseURL}/api/product/plinth`)
}
await fetchPlinths()
</script>

<template>
  <BaseHero :hero-name="heroName" :hero-description="heroDescription" :hero-image="heroImage" />
  <article class="main-container">
    <p class="lg:px-[230px] px-[40px] py-[60px] lg:py-[90px]">
      Плинтус - декоративный элемент, позволяющий оформить интерьер в едином стиле с межкомнатными дверьми. С его помощью
      можно сделать плавный переход от стены к напольному покрытию или, наоборот, создать яркий акцент при разделении
      пространства.
    </p>
  </article>
  <!-- <pre>{{plinths}}</pre> -->
  <div v-if="plinths" class="main-container xl:mx-[228px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 gap-x-4 lg:pb-32 pb-20">
    <div v-for="plinth in plinths" :key="plinth.name" class="min-w-80">
      <div class="relative group">
        <div class="w-full h-60">
          <nuxt-img
            :src="plinth.image" :alt="plinth.name"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
      <div class=" pt-3 md:pt-4 lg:pb-12 md:pb-8 pb-8">
        <h2 class="pb-1 md:pb-2">
          {{ plinth.name }}
        </h2>
        <p class="">
          Высота {{ plinth.height }}  мм
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
