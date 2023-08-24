<script setup lang="ts">

import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import FilterType from "~/components/filters/FilterType.vue";
import {useFiltersStore} from "~/stores/filtersStore";
import {storeToRefs} from "pinia";
import {baseURL} from "~/config";
import {useViewportSize} from "~/composables/useViewportSize";


const filtersStore = useFiltersStore()
const {color_sets, activeFilters, filterCount} = storeToRefs(filtersStore)

await filtersStore.fetchColorSets()

// onBeforeMount(() => {
//  filtersStore.fetchColorSets()
// })




function chooseColorSet(id) {
  filtersStore.checkDoorSetApplied()
  if (!activeFilters.value.color_set.includes(id)) {
    filtersStore.onChangeFilters({color_set: [...activeFilters.value.color_set, id]})
  } else {
    const updatedColorSets = activeFilters.value.color_set.filter((set) => {
      return set !== id
    })
    filtersStore.onChangeFilters({color_set: updatedColorSets})
    if (!activeFilters.value.color_set) {
      filtersStore.onChangeFilters({color_set: []})
    }
  }
}


function isColorSetAvailable(colorSet) {
  for (let item of filterCount.value.color_set) {
    if (item["color_set"] === colorSet) {
      return item["count"] > 0;
    }
  }
  return false;  // return false if no matching color_set is found
}


const viewport = useViewportSize()
const isNotMobile = computed(() => viewport.isDesktop === true || viewport.isTablet === true)

</script>

<template class="filter-container ">
  <Disclosure :key="isNotMobile" :default-open="isNotMobile">
    <DisclosureButton class=" w-full">
      <filter-type filterName="Наборы цветов"/>
    </DisclosureButton>
    <transition
        enter-active-class="transition duration-500 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-300 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
    >
    <DisclosurePanel class="mb-20">
      <div v-if="filtersStore.color_sets" v-for="color_set in filtersStore.color_sets" :key=color_set.id class="flex gap-x-4 items-center mb-3"
           @click="!isColorSetAvailable(color_set.id) ? null : chooseColorSet(color_set.id)">
        <div class=" pb-1 border-b-4" :class="{
          'border-b': filtersStore.activeFilters.color_set.includes(color_set.id),'border-transparent': !filtersStore.activeFilters.color_set.includes(color_set.id), 'border-black':filtersStore.activeFilters.color_set.includes(color_set.id), 'cursor-pointer': isColorSetAvailable(color_set.id)
        }">
          <div :style="{ backgroundColor: color_set.hex_code }" class="w-12 h-12 shadow-darkGrey shadow-sm"></div>
        </div>
        <h5 :class="{
            'text-gray-400': !isColorSetAvailable(color_set.id), 'cursor-pointer': isColorSetAvailable(color_set.id)
        }">{{ color_set.name }}</h5>
      </div>
    </DisclosurePanel>
    </transition>
  </Disclosure>
</template>

<style scoped>

</style>