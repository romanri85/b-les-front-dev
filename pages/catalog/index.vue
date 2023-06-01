<script setup lang="js">

import Hero from "~/pages/catalog/hero.vue";
import DoorSets from "~/pages/catalog/doorSets.vue";
import Items from "~/pages/catalog/Items.vue";
import Filters from "~/pages/catalog/Filters.vue";

const activeFilters = ref({
  price:{}, colorSet: [], colors: [], designs: [], collections: []
})

const items = reactive([])

async function onChangeFilters(filters) {
  activeFilters.value = {...activeFilters.value, ...filters}
  console.log(activeFilters.value)
  const query = "?" + new URLSearchParams(activeFilters.value).toString();
  // const response = await fetch(`/api/catalog${query}`)
  // const items = ref([])
  // await response.json()
// filter = {price:{}, colorSets: [], colors:[]}
//   https://www.ozon.ru/travel/flight/search?Dlts=1&ServiceClass=ECONOMY&airlines=ey&dates=d2023-11-07&departureTime=163%2C1091&mwc_campaign=oztravel_selftravel_etihad_shelf_flight_main_et_tr&route=mowbkk&step=search
//   console.log(query)

}


</script>

<template>
  <hero/>
  <door-sets  :activeFilters="activeFilters" @changeFilters="onChangeFilters"/>
  <div class="flex main-container">
    <filters :activeFilters="activeFilters" @changeFilters="onChangeFilters"/>
    <items/>
  </div>
  <!--  <items :value="items"/>-->
</template>

<style scoped>

</style>