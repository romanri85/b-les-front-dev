<script setup lang="js">
import { onMounted, ref } from 'vue' // Ensure to import ref and onMounted

import parameters from '~/data/searchByParameters.json'
import { useRouter } from 'vue-router'
const router = useRouter()
const isPageInitiated = ref(false)


function onPageInitiated() {
  isPageInitiated.value = true
}

onMounted(() => {
  // Your initialization code here
  // ...

  // Then call onPageInitiated
  onPageInitiated()
})

</script>

<template>
  <div
    class=" mt-24 md:mt-0 flex flex-col lg:flex-row lg:justify-center justify-around items-center md:py-20 lg:py-24"
  >
    <div class="lg:w-[50vw] w-[80vw] text-center flex flex-col justify-between items-center">
      <h2 class="text-25-mono mb-7">
        {{ $t('searchByParameters') }}
      </h2>
      <div class="lg:block text-left flex flex-wrap">
        <div v-for="parameter in parameters" :key="parameter.name" class="py-2">
          <!-- If the page is initiated, render the NuxtLink -->
          <nuxt-link :to="`/catalog?filters=${parameter.id}`"
            v-if="isPageInitiated"
            class="lg:pb-4 pb-5 lg:pr-0 pr-7"

          >
            <h3 class="inline-block">
              {{ parameter.name }}
            </h3>
          </nuxt-link>

          <!-- If the page is not initiated, render a placeholder -->
          <div v-else class="lg:pb-4 pb-5 lg:pr-0 pr-7">
            <h3 class="inline-block">
              {{ parameter.name }}
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div
      class=" lg:w-[50vw] w-[100vw] flex justify-center lg:h-2/3 md:h-[360] h-[240px] items-center mb-24 md:mb-0 mt-10 md:mt-0"
    >
      <div
          class=" bg-[url('/parameters-search.webp')] lg:bg-cover bg-cover md:bg-fit bg-center lg:w-2/3 w-full h-full flex flex-col justify-end items-center main-container"
      >
        <nuxt-link class="w-full flex justify-center" to="/search-tags">
          <buttons-secondary-button
              class="mb-5 md:w-64 md:h-20 w-full h-16 md:bg-white bg-black md:text-black text-white font-mono cursor-pointer"
          >
            {{ $t('searchPhotoByTag') }}
          </buttons-secondary-button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
