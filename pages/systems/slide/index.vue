<script setup lang="js">
import { baseURL } from '~/config'
import HeroSystems from '~/components/pages/systems/heroSystems.vue'
import buttons from '~/data/systemsButtons.json'
import OpeningType from '~/components/pages/systems/OpeningType.vue'

const heroName = 'systemsPageHeader'
const heroImage = '/systems/systems-bg.webp'

const swingSystems = ref([])

async function fetchSwingSystems() {
  const allSystems = await $fetch(`${baseURL}/api/product/systems`)
  swingSystems.value = allSystems.filter(item => item.opening_type.opening === 'Раздвижные')
}

onMounted(() => {
  fetchSwingSystems()
})
</script>

<template>
  <div class="pb-32">
    <HeroSystems :hero-name="heroName" :hero-image="heroImage" :buttons="buttons" />
    <h1 class="flex justify-center pl-5 md:pl-0  pt-12 md:pt-20 pb-12 main-container">
      Раздвижные двери
    </h1>
    <OpeningType class="md:mt-8 lg:mt-12" name="Вдоль стены" :systems="swingSystems" />
    <OpeningType class="md:mt-8 lg:mt-12" name="Внутри проема" :systems="swingSystems" />
    <OpeningType class="md:mt-8 lg:mt-12" name="В пенал" :systems="swingSystems" />
  </div>
</template>

<style scoped>

</style>
