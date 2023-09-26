<template>
  <div
      class="  flex flex-col lg:flex-row lg:justify-center justify-around items-center md:h-screen">

    <div class="lg:w-[50vw] w-[80vw] text-center flex flex-col justify-between items-center">
      <h2 class="text-25-mono mb-7">{{ $t('searchByParameters') }}</h2>
      <div class="lg:block text-left flex flex-wrap">
        <div v-for="parameter in parameters" :key="parameter.name" class="py-2">
          <NuxtLink :to="{ path: '/catalog', query: { filters: parameter.id } }" class="lg:pb-4 pb-5 lg:pr-0 pr-7">
            <h3 class="inline-block">{{ parameter.name }}</h3>
          </NuxtLink>
        </div>
      </div>

    </div>
    <div class=" lg:w-[50vw] w-[100vw] flex justify-center lg:h-2/3 md:h-1/2 h-[240px] items-center mb-24 md:mb-0 mt-10 md:mt-0">
      <div
          class=" bg-[url('/parameters-search.webp')] bg-cover bg-center lg:w-2/3 w-full h-full flex justify-center items-center main-container">
        <buttons-secondary-button class="md:w-64 md:h-20 w-full h-16
                md:bg-white bg-black md:text-black text-white cursor-pointer">
          <nuxt-link to="/search-tags">
          {{ $t('searchPhotoByTag') }}
          </nuxt-link>
        </buttons-secondary-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import parameters from "~/data/searchByParameters.json"
import PrimaryButtonBig from "~/components/buttons/PrimaryButtonBig.vue";
// import {useTagsStore} from "~/stores/tagsStore";
//
// const tagsStore = useTagsStore()
// tagsStore.fetchTags()


</script>

<style scoped>

</style>