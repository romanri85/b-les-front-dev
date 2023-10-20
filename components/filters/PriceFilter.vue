<script setup>
import { storeToRefs } from 'pinia'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { useFiltersStore } from '~/stores/filtersStore'
import FilterType from '~/components/filters/FilterType.vue'
import { useViewportSize } from '~/composables/useViewportSize'

const filtersStore = useFiltersStore()
const { filterCount } = storeToRefs(filtersStore)

function changeMinMax() {
  min.value = filtersStore.filterCount.price[0]?.min_price || 0
  max.value = filtersStore.filterCount.price[0]?.max_price || 79000
  value.value = [min.value, max.value]
}
let isSliderUpdate = ref(false);

function updateSliderValues([newMin, newMax]) {
  isSliderUpdate.value = true;  // Set the flag
  filtersStore.onChangeFilters({ min_price: newMin, max_price: newMax });
}

watch(
    () => [
      filtersStore.activeFilters.color,
      filtersStore.activeFilters.material,
      filtersStore.activeFilters.color_set,
      filtersStore.activeFilters.design,
      filtersStore.activeFilters.sale,
    ],
    async (newValues, oldValues) => {
      if (newValues.some((value, index) => value !== oldValues[index])) {
        console.log('changed');
        await filtersStore.onChangeFilters({ /* ... */ });
        changeMinMax();
      }
    }
);



const min = ref(0)
const max = ref(79900)
// const value = ref([min.value, max.value])
const value = ref([0, 79900])
const viewport = useViewportSize()
const isNotMobile = computed(() => viewport.isDesktop === true || viewport.isTablet === true)
</script>

<template class="filter-container ">
  <div>
    <Disclosure :key="isNotMobile" :default-open="isNotMobile">
      <DisclosureButton class="w-full">
        <FilterType filter-name="Цена" />
      </DisclosureButton>
      <transition
        enter-active-class="transition duration-500 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-300 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <DisclosurePanel class="mb-10 mt-14">
          <div class="px-5">
            <FormKit
              v-if="filterCount && filterCount.price && filterCount.price[0]"
              type="slider"
              name="slider"
              v-model="value"
              tooltip="true"
              :tooltip-format="(v) => `${v} ₽`"
              :value="[0, 79000]"
              :min="min"
              :max="max"
              @input="updateSliderValues"
            />
          </div>
        </DisclosurePanel>
      </transition>
    </Disclosure>
    <div>
    </div>
  </div>
</template>

<style scoped>

</style>
