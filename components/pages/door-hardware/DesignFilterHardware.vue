<script setup lang="ts">
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import FilterType from "~/components/filters/FilterType.vue";
import {useHardwareFiltersStore} from "~/stores/hardwareFiltersStore.js";
import {storeToRefs} from "pinia";

let designs = [
  {
    name: 'Классика',
    id: 1
  },
  {
    name: 'Современный',
    id: 2
  }
]

const hardwareFiltersStore = useHardwareFiltersStore()
const {activeFilters, filterCount} = storeToRefs(hardwareFiltersStore)

function isDesignAvailable(design) {
  for (let item of filterCount.value.design) {
    if (item["design"] === design) {
      return item["count"] > 0;
    }
  }
  return false;  // return false if no matching color_set is found
}
function chooseDesign(design) {
  if (!hardwareFiltersStore.activeFilters.design.includes(design)) {
    hardwareFiltersStore.onChangeFilters({design: [...hardwareFiltersStore.activeFilters.design, design]})
  } else {
    const updatedDesigns = hardwareFiltersStore.activeFilters.design.filter((item) => {
      return item !== design
    })
    hardwareFiltersStore.onChangeFilters({design: updatedDesigns})
  }

}
</script>

<template class="filter-container ">
  <Disclosure default-open>
    <DisclosureButton class=" w-full">
      <filter-type filterName="Дизайн"/>
    </DisclosureButton>
    <DisclosurePanel class="mb-10 mt-6">
      <div v-for="design in designs" :key=design.id class="flex gap-x-[15px] items-center mb-3">
        <h4 class="underline-offset-4 pb-2 font-light" @click="!isDesignAvailable(design.id) ? null :chooseDesign(design.id)"
            :class="{'underline':hardwareFiltersStore.activeFilters.design.includes(design.id), 'text-gray-400': !isDesignAvailable(design.id), 'cursor-pointer': isDesignAvailable(design.id) }">{{ design.name }}</h4>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>

</style>