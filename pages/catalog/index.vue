<script setup lang="ts">

import DoorSets from "~/components/pages/door-catalog/DoorSets.vue";
import DoorItems from "~/components/pages/door-catalog/DoorItems.vue";
import DoorFilters from "~/components/pages/door-catalog/DoorFilters.vue";
import {baseURL} from "~/config.js";
import Hero from "~/components/base/hero.vue";
import {useFiltersStore} from "~/stores/filtersStore";
import {storeToRefs} from "pinia";

const filtersStore = useFiltersStore()
const {activeFilters, filterCount} = storeToRefs(filtersStore)






const heroName = "catalog"
const heroDescription = "catalogPageDescription"
const heroImage = "/catalog/catalog-hero.jpg"

let products = ref([])
let page = ref(1)
const total = ref(0)
let pagesCount = ref(0)
const page_size = 12
// const filterCount = ref({})

const route = useRoute()





onMounted(() => {

  filtersStore.onChangeFilters({page: 1})
  if (!activeFilters.value.color_set) {
    activeFilters.value.color_set = []
  }
});

</script>

<template>
  <hero :heroName="heroName" :hero-description="heroDescription" :heroImage="heroImage"/>


<!--  <door-sets :activeFilters="activeFilters" @changeFilters="onChangeFilters"/>-->
  <div class="flex main-container mt-24">
    <door-filters />
    <door-items/>
  </div>
</template>

<style scoped>

</style>