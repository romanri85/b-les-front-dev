<script setup lang="ts">
import BaseHero from '~/components/base/BaseHero.vue'
import { baseURL } from '~/config'

const heroName = 'plinthHeader'
const heroDescription = ''
const heroImage = '/plinth/plinth-bg.webp'
const plinths = ref([])
const tags = ref([])

async function fetchPlinths() {
  plinths.value = await $fetch(`${baseURL}/api/product/plinth`)
}

async function getTags() {
  tags.value = await $fetch(`${baseURL}/api/projects/tags`)
}

await fetchPlinths()
await getTags()

const plinthTag = tags.value.find((tag) => tag.name === 'плинтус')


</script>

<template>
  <Head>
    <title>Брянский лес - Плинтус</title>
  </Head>
  <BaseHeroWithoutDescription :hero-name="heroName" :hero-image="heroImage" />
  <article class="main-container">
    <h5 class="lg:px-[230px] px-[40px] py-[60px] lg:py-[90px]">
      Плинтус - декоративный элемент, позволяющий оформить интерьер в едином стиле с межкомнатными дверьми. С его помощью
      можно сделать плавный переход от стены к напольному покрытию или, наоборот, создать яркий акцент при разделении
      пространства.
    </h5>
  </article>
  <!-- <pre>{{plinths}}</pre> -->
  <div class=" lg:pb-32 pb-20 main-container">
  <div v-if="plinths" class=" xl:mx-[228px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 gap-x-4">
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
    <div class="pt-4">
      <nuxt-link :to="`/search-tags?tags=${plinthTag.id}`" class="text-primaryDark  text-lg">

        <h2 class="md:underline-static underline inline-block">
          Фото плинтуса в интерьере
        </h2>
      </nuxt-link>
    </div>
  </div>

</template>

<style scoped>

</style>
