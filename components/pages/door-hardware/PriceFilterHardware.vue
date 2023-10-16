<script setup>
import { storeToRefs } from 'pinia'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { useHardwareFiltersStore } from '~/stores/hardwareFiltersStore.js'
import FilterType from '~/components/filters/FilterType.vue'

const hardwareFiltersStore = useHardwareFiltersStore()
const { activeFilters, filterCount } = storeToRefs(hardwareFiltersStore)
// const firstUpdateSliderAfterMount = ref(true);

function updateSliderValues([newMin, newMax]) {
  // if (firstUpdateSliderAfterMount.value) {
  //   firstUpdateSliderAfterMount.value = false;
  //   return;
  // }
  hardwareFiltersStore.onChangeFilters({ min_price: newMin, max_price: newMax })
}
const min = computed(() => hardwareFiltersStore.filterCount.price[0]?.min_price || 0)
const max = computed(() => hardwareFiltersStore.filterCount.price[0]?.max_price || 99000)
</script>

<template class="filter-container ">
  <Disclosure default-open>
    <DisclosureButton class="w-full">
      <FilterType filter-name="Цена" />
    </DisclosureButton>
    <DisclosurePanel class="mb-20 mt-8">
      <div class="px-5">
        <FormKit
          v-if="filterCount && filterCount.price && filterCount.price[0]"
          :key="filterCount.price[0].min_price + filterCount.price[0].max_price"
          type="slider"
          name="slider"
          tooltip="true"
          :tooltip-format="(v) => `${v} ₽`"
          :value="[0, 99000]"
          :min="min"
          :max="max"
          @input="updateSliderValues"
        />
      </div>
    </DisclosurePanel>
  </Disclosure>
  <div>
    <!--    <div class="h-24"></div> -->
  </div>
</template>

<style scoped>

</style>
