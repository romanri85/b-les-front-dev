<script setup lang="ts">
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import FilterType from "~/components/filters/FilterType.vue";
import {useFiltersStore} from "~/stores/filtersStore";
import {storeToRefs} from "pinia";
import {bool} from "sharp";

const filtersStore = useFiltersStore()
const {activeFilters, filterCount} = storeToRefs(filtersStore)

const withGlassDisabled = computed(() => filterCount.value.glass[0]?.with_glass === 0)
const withoutGlassDisabled = computed(() => filterCount.value.glass[0]?.without_glass === 0)

function chooseGlass(bool_str: string) {
  if (filtersStore.activeFilters.glass === '') {
    filtersStore.onChangeFilters({glass: bool_str})
  }
  else if (filtersStore.activeFilters.glass === bool_str) {
    filtersStore.onChangeFilters({glass:''})
  }
  else {

    filtersStore.onChangeFilters({glass: bool_str})

  }
}
</script>

<template>
  <div class="filter-container">
    <Disclosure default-open>
      <DisclosureButton class="w-full">
        <filter-type filterName="Стекло" />
      </DisclosureButton>
      <DisclosurePanel class="mb-[80px]">
        <div class="flex flex-col gap-y-4 items-start mb-3">
          <h5
              class="underline-offset-4"
              @click="withGlassDisabled ? null : chooseGlass('true')"
              :class="{'underline': filtersStore.activeFilters.glass === 'true', 'text-gray-400': withGlassDisabled, 'cursor-pointer': !withGlassDisabled}"
          >
            Со стеклом
          </h5>
          <h5
              class=" underline-offset-4"
              @click="withoutGlassDisabled ? null : chooseGlass('false')"
              :class="{'underline': filtersStore.activeFilters.glass === 'false', 'text-gray-400': withoutGlassDisabled, 'cursor-pointer': !withoutGlassDisabled}"
          >
            Без стекла
          </h5>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<style scoped>

</style>