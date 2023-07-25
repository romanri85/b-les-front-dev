<script setup lang="ts">

import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import FilterType from "~/components/filters/FilterType.vue";
import collections from "~/data/SliderCollections.json";
import {useFiltersStore} from "~/stores/filtersStore";
import {storeToRefs} from "pinia";

const filtersStore = useFiltersStore()
const {activeFilters, filterCount} = storeToRefs(filtersStore)


function chooseCollection(id: Number) {
  if (!activeFilters.value.collection.includes(id)) {
    filtersStore.onChangeFilters({collection: [...filtersStore.activeFilters.collection, id]})
  } else {
    const updatedCollections = filtersStore.activeFilters.collection.filter((item) => {
      return item !== id
    })
    filtersStore.onChangeFilters({collection: updatedCollections})
  }
}

function isCollectionAvailable(collection) {
  for (let item of filterCount.value.collection) {
    if (item["collection"] === collection) {
      return item["count"] > 0;
    }
  }
  return false;  // return false if no matching color_set is found
}


</script>

<template class="filter-container ">
  <Disclosure default-open>
    <DisclosureButton class=" w-full">
      <filter-type filterName="Коллекции"/>
    </DisclosureButton>
    <DisclosurePanel class="mb-20">
      <div v-for="collection in collections" :key=collection.id class="flex gap-x-4 items-center mb-3">

        <h5 class="underline-offset-4"
            @click="!isCollectionAvailable(collection.id) ? null :chooseCollection(collection.id)" :class="{
          'underline':activeFilters.collection.includes(collection.id), 'text-gray-400': !isCollectionAvailable(collection.id), 'cursor-pointer': isCollectionAvailable(collection.id)
        }">{{ $t(collection.name) }}</h5>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>

</style>