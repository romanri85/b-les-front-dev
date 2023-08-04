<script setup lang="ts">

import {baseURL} from "~/config.js";
import Hero from "~/components/base/hero.vue";
import {string} from "postcss-selector-parser";
import HardwareFilters from "~/components/pages/doorHardware/HardwareFilters.vue";
import HardwareItems from "~/components/pages/doorHardware/HardwareItems.vue";
import {useHardwareFiltersStore} from "~/stores/hardwareFiltersStore";
import {storeToRefs} from "pinia";

const hardwareFiltersStore = useHardwareFiltersStore()
const {activeFilters, filterCount} = storeToRefs(hardwareFiltersStore)


const heroName = "doorHardware"
const heroDescription = "doorHardwarePageDescription"
const heroImage = "/doorHardware/doorHardware.jpg"

let products = ref([])
let page = ref(1)
const total = ref(0)
let pagesCount = ref(0)
const page_size = 20

const route = useRoute()



onMounted(() => {
  if(route.query.material){
    activeFilters.value.material = route.query.material
    const query = "&" + new URLSearchParams(activeFilters.value).toString();
    hardwareFiltersStore.onChangeFilters({page: 1})
    return
  }

  hardwareFiltersStore.onChangeFilters({page: 1})


})

</script>

<template>
  <hero :heroName="heroName" :hero-description="heroDescription" :heroImage="heroImage"  />
  <div class="flex main-container pt-32">
    <hardware-filters/>
    <hardware-items />
  </div>
</template>

<style scoped>

</style>