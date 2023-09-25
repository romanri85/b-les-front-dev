<script setup lang="ts">

import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import FilterType from "~/components/filters/FilterType.vue";
import {useHardwareFiltersStore} from "~/stores/hardwareFiltersStore.js";
import {storeToRefs} from "pinia";

const hardwareFiltersStore = useHardwareFiltersStore()
const {activeFilters, filterCount, colorCollections} = storeToRefs(hardwareFiltersStore)
hardwareFiltersStore.fetchColorCollections()


function chooseColorCollection(id) {
  if (!activeFilters.value.color_collection.includes(id)) {
    hardwareFiltersStore.onChangeFilters({color_collection: [...activeFilters.value.color_collection, id]})
  } else {
    const updatedColorSets = activeFilters.value.color_collection.filter((set) => {
      return set !== id
    })
    hardwareFiltersStore.onChangeFilters({color_collection: updatedColorSets})
    if (!activeFilters.value.color_collection) {
      filtersStore.onChangeFilters({color_collection: []})
    }
  }
}

function isColorSetAvailable(colorSet) {
  for (let item of filterCount.value.color_collection) {
    if (item["color_collection"] === colorSet) {
      return item["count"] > 0;
    }
  }
  return false;  // return false if no matching color_set is found
}


</script>

<template class="filter-container ">
  <Disclosure default-open>
    <DisclosureButton class=" w-full">
      <filter-type filterName="Наборы цветов"/>
    </DisclosureButton>
    <DisclosurePanel class="mb-10 mt-6">
      <div v-for="collection in colorCollections" :key=collection.id class="flex gap-x-4 items-center mb-3"
           @click="!isColorSetAvailable(collection.id) ? null : chooseColorCollection(collection.id)">
        <div class="pb-1 border-b-4"
             :class="{'border-transparent': !hardwareFiltersStore.activeFilters.color_collection.includes(collection.id), 'border-black':hardwareFiltersStore.activeFilters.color_collection.includes(collection.id), 'cursor-pointer': isColorSetAvailable(collection.id)}">
          <div :style="{ backgroundColor: collection.hex_code }" class="w-12 h-12 shadow-darkGrey shadow-sm"></div>
        </div>
        <h4 :class="{'text-gray-400': !isColorSetAvailable(collection.id), 'cursor-pointer': isColorSetAvailable(collection.id)}"
            class="font-light"
        >{{ collection.name }}</h4>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>

</style>