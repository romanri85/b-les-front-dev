<script setup lang="ts">
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import FilterType from "~/components/filters/FilterType.vue";
import {useFiltersStore} from "~/stores/filtersStore";
import {storeToRefs} from "pinia";


let designs = [
  {
    name: 'Classic',
    id: 1
  },
  {
    name: 'Modern',
    id: 2
  }

]

const filtersStore = useFiltersStore()
const {activeFilters,filterCount} = storeToRefs(filtersStore)


const designDisabled = (designId) => {
  return !filtersStore.filterCount.design.find(item => item.design === designId)
}

function isDesignAvailable(design) {
  for(let item of filterCount.value.design) {
    if(item["design"] === design) {
      return item["count"] > 0;
    }
  }
  return false;  // return false if no matching color_set is found
}


function chooseDesign(design) {
  filtersStore.isFilterCountPriceBlocked = false
  if (!filtersStore.activeFilters.design.includes(design)) {
    filtersStore.onChangeFilters({design: [...filtersStore.activeFilters.design, design]})
  } else {
    const updatedDesigns = filtersStore.activeFilters.design.filter((item) => {
      return item !== design
    })
    filtersStore.onChangeFilters({design: updatedDesigns})
  }
}
</script>

<template class="filter-container ">
  <Disclosure default-open>
    <DisclosureButton class=" w-full">
      <filter-type filterName="Дизайн"/>
    </DisclosureButton>
    <DisclosurePanel class="mb-[80px]">
      <div v-for="design in designs" :key=design.id class="flex gap-x-[15px] items-center mb-3">
        <h5 class="underline-offset-4" @click="!isDesignAvailable(design.id) ? null : chooseDesign(design.id)"
            :class="{
          'underline':filtersStore.activeFilters.design.includes(design.id), 'text-gray-400': !isDesignAvailable(design.id), 'cursor-pointer': isDesignAvailable(design.id)
        }">{{ design.name }}</h5>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>

</style>