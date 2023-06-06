<template>
  <div
      class=" main-container flex flex-col lg:flex-row lg:justify-center justify-around items-center h-screen">

    <div class="lg:w-[50vw] w-[80vw] text-center flex flex-col justify-between items-center">
      <h2 class="text-25-mono mb-7">{{ $t('searchByParameters') }}</h2>
      <div class="lg:block flex flex-wrap">
        <div v-for="parameter in parameters" :key="parameter.name" class="">
          <h3 class=" lg:pb-4 pb-5 lg:pr-0 pr-7 ">
            <span
                class="md:text-darkGrey hover:text-black  hover:border-black border-b-2 md:border-transparent border-b-black hover:cursor-pointer">
              {{ parameter.name }}</span>
          </h3>
        </div>
      </div>
    </div>
    <div class=" lg:w-[50vw] w-[100vw] flex justify-center lg:h-2/3 h-1/2 items-center">
      <div
          class="mx-9 bg-[url('/parameters-search.jpg')] bg-cover bg-center lg:w-2/3 w-full h-full flex justify-center items-center ">
        <buttons-secondary-button class="md:w-64 md:h-20 w-full h-16
                md:bg-white sm:bg-primaryDark md:text-black text-white cursor-pointer">{{ $t('searchPhotoByTag') }}
        </buttons-secondary-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import parameters from "~/data/searchByParameters.json"
// import {useTagsStore} from "~/stores/tagsStore";
//
// const tagsStore = useTagsStore()
// tagsStore.fetchTags()


</script>

<style scoped>

</style>