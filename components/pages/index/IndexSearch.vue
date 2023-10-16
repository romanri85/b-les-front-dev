<script setup lang="ts">
import { onMounted, ref } from 'vue' // Ensure to import ref and onMounted

import parameters from '~/data/searchByParameters.json'

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
// import {useTagsStore} from "~/stores/tagsStore";
//
// const tagsStore = useTagsStore()
// tagsStore.fetchTags()
</script>

<template>
  <div
    class="  flex flex-col lg:flex-row lg:justify-center justify-around items-center md:h-screen"
  >
    <div class="lg:w-[50vw] w-[80vw] text-center flex flex-col justify-between items-center">
      <h2 class="text-25-mono mb-7">
        {{ $t('searchByParameters') }}
      </h2>
      <div class="lg:block text-left flex flex-wrap">
        <div v-for="parameter in parameters" :key="parameter.name" class="py-2">
          <!-- If the page is initiated, render the NuxtLink -->
          <NuxtLink
            v-if="isPageInitiated"
            :to="{ path: '/catalog', query: { filters: parameter.id } }"
            class="lg:pb-4 pb-5 lg:pr-0 pr-7"
          >
            <h3 class="inline-block">
              {{ parameter.name }}
            </h3>
          </NuxtLink>
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
      class=" lg:w-[50vw] w-[100vw] flex justify-center lg:h-2/3 md:h-1/2 h-[240px] items-center mb-24 md:mb-0 mt-10 md:mt-0"
    >
      <div
        class=" bg-[url('/parameters-search.webp')] bg-cover bg-center lg:w-2/3 w-full h-full flex justify-center items-center main-container"
      >
        <nuxt-link class="w-full flex justify-center" to="/search-tags">
          <buttons-secondary-button
            class="md:w-64 md:h-20 w-full h-16
                md:bg-white bg-black md:text-black text-white cursor-pointer"
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
