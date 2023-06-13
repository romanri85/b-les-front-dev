<template>
  <div
      class="  flex flex-col lg:flex-row lg:justify-center justify-around items-center h-screen">

    <div class="lg:w-[50vw] w-[80vw] text-center flex flex-col justify-between items-center">
      <h2 class="text-25-mono mb-7">{{ $t('searchByParameters') }}</h2>
      <div class="lg:block flex flex-wrap">
        <div v-for="parameter in parameters" :key="parameter.name" class="">
          <primary-button-big class=" lg:pb-4 pb-5 lg:pr-0 pr-7 ">
              {{ parameter.name }}
          </primary-button-big>
        </div>
      </div>
    </div>
    <div class=" lg:w-[50vw] w-[100vw] flex justify-center lg:h-2/3 h-1/2 items-center ">
      <div
          class=" bg-[url('/parameters-search.jpg')] bg-cover bg-center lg:w-2/3 w-full h-full flex justify-center items-center main-container">
        <buttons-secondary-button class="md:w-64 md:h-20 w-full h-16
                md:bg-white sm:bg-primaryDark md:text-black text-white cursor-pointer">{{ $t('searchPhotoByTag') }}
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