<script setup lang="ts">
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import FilterType from "~/components/filters/FilterType.vue";
import {useFiltersStore} from "~/stores/filtersStore";
import {storeToRefs} from "pinia";
import {useViewportSize} from "~/composables/useViewportSize";


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

const filtersStore = useFiltersStore()
const {activeFilters, filterCount} = storeToRefs(filtersStore)


function isDesignAvailable(design) {
  for (let item of filterCount.value.design) {
    if (item["design"] === design) {
      return item["count"] > 0;
    }
  }
  return false;  // return false if no matching color_set is found
}


function chooseDesign(design) {
  filtersStore.checkDoorSetApplied()
  if (!filtersStore.activeFilters.design.includes(design)) {
    filtersStore.onChangeFilters({design: [...filtersStore.activeFilters.design, design]})
  } else {
    const updatedDesigns = filtersStore.activeFilters.design.filter((item) => {
      return item !== design
    })
    filtersStore.onChangeFilters({design: updatedDesigns})
  }
}

const viewport = useViewportSize()
const isNotMobile = computed(() => viewport.isDesktop === true || viewport.isTablet === true)

</script>

<template class="filter-container ">
  <Disclosure  :key="isNotMobile" :default-open="isNotMobile">
    <DisclosureButton class=" w-full">
      <filter-type filterName="Дизайн"/>
    </DisclosureButton>
    <transition
        enter-active-class="transition duration-500 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-300 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
    >
    <DisclosurePanel class="mb-10 mt-6">
      <div v-for="design in designs" :key=design.id class="flex gap-x-[15px] items-center mb-3">
        <h4 class="underline-offset-4" @click="!isDesignAvailable(design.id) ? null : chooseDesign(design.id)"
            :class="{
          'underline':filtersStore.activeFilters.design.includes(design.id), 'text-gray-400': !isDesignAvailable(design.id), 'cursor-pointer': isDesignAvailable(design.id)
        }">{{ design.name.toUpperCase() }}</h4>
      </div>
    </DisclosurePanel>
    </transition>
  </Disclosure>
</template>

<style scoped>

</style>