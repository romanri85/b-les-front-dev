<script setup lang="ts">
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import FilterType from "~/components/filters/FilterType.vue";
import {useFiltersStore} from "~/stores/filtersStore";
import {storeToRefs} from "pinia";
import {useViewportSize} from "~/composables/useViewportSize";

const filtersStore = useFiltersStore()
const {activeFilters, filterCount} = storeToRefs(filtersStore)

const withGlassDisabled = computed(() => filterCount.value.glass[0]?.with_glass === 0)
const withoutGlassDisabled = computed(() => filterCount.value.glass[0]?.without_glass === 0)

function chooseGlass(bool_str: string) {
  filtersStore.checkDoorSetApplied()
  if (filtersStore.activeFilters.glass === '') {
    filtersStore.onChangeFilters({glass: bool_str})
  } else if (filtersStore.activeFilters.glass === bool_str) {
    filtersStore.onChangeFilters({glass: ''})
  } else {

    filtersStore.onChangeFilters({glass: bool_str})

  }
}

const viewport = useViewportSize()
const isNotMobile = computed(() => viewport.isDesktop === true || viewport.isTablet === true)

</script>

<template>
  <div class="filter-container">
    <Disclosure :key="isNotMobile" :default-open="isNotMobile">
      <DisclosureButton class="w-full">
        <filter-type filterName="Стекло"/>
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
        <div class="flex flex-col gap-y-4 items-start mb-3">
          <h4
              class="underline-offset-4 font-light pb-2"
              @click="withGlassDisabled ? null : chooseGlass('true')"
              :class="{'underline': filtersStore.activeFilters.glass === 'true', 'text-gray-400': withGlassDisabled, 'cursor-pointer': !withGlassDisabled}"

          >
            СО СТЕКЛОМ
          </h4>
          <h4
              class=" underline-offset-4"
              @click="withoutGlassDisabled ? null : chooseGlass('false')"
              :class="{'underline': filtersStore.activeFilters.glass === 'false', 'text-gray-400': withoutGlassDisabled, 'cursor-pointer': !withoutGlassDisabled}"
          >
            БЕЗ СТЕКЛА
          </h4>
        </div>
      </DisclosurePanel>
      </transition>
    </Disclosure>
  </div>
</template>

<style scoped>

</style>