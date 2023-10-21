<script setup>
import {storeToRefs} from 'pinia'
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/vue'
import {useFiltersStore} from '~/stores/filtersStore'
import FilterType from '~/components/filters/FilterType.vue'
import {useViewportSize} from '~/composables/useViewportSize'

const filtersStore = useFiltersStore()
const {filterCount} = storeToRefs(filtersStore)
// await filtersStore.checkFilters
console.log(filterCount.value)
const min = ref(filterCount.value.price?.[0]?.min_price )
const max = ref(filterCount.value.price?.[0]?.max_price)
// const value = ref([min.value, max.value])
// const value = ref([0, 79000])
const range = ref([
  filterCount.value.price?.[0]?.min_price || 0,
  filterCount.value.price?.[0]?.max_price
])
const viewport = useViewportSize()

function changeMinMax() {
  const newMin = ref(filterCount.value.price[0]?.min_price);
  const newMax = ref(filterCount.value.price[0]?.max_price);
  if (newMin !== min.value || newMax !== max.value) {
    min.value = newMin.value;
    max.value = newMax.value;
    // value.value = [min.value, max.value];  // Update value to reflect new min and max
    range.value = [min.value, max.value];  // Update value to reflect new min and max
  }

}

let isSliderUpdate = ref(false);

function updateSliderValues([newMin, newMax]) {
  isSliderUpdate.value = true;  // Set the flag
  filtersStore.onChangeFilters({min_price: newMin, max_price: newMax});
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
        // console.log('changed');
        await changeMinMax();


      }
    },
    {deep: true}
);


const isNotMobile = computed(() => viewport.isDesktop === true || viewport.isTablet === true)
</script>

<template class="filter-container">
  <div>
    <Disclosure :key="isNotMobile" :default-open="isNotMobile">
      <DisclosureButton class="w-full">
        <FilterType filter-name="Цена"/>
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
          <div class="">
            <v-row no-gutters>
              <v-col cols="12">
                <v-range-slider
                    v-model="range"
                    :max="max"
                    track-size="3"
                    thumb-size="17"
                    :min="min"
                    :step="1"
                    class="align-center"
                    @end="updateSliderValues"
                >
                </v-range-slider>
              </v-col>
            </v-row>
            <v-row no-gutters justify="space-between">
              <v-col cols="5">
                <!-- Text field for minimum value -->
                <v-text-field
                    rounded="0"
                    v-model.number="range[0]"
                    :max="range[1]"
                    :min="min"
                    font-mono="font-mono"
                    bg-color="white"
                    type="number"
                    label="От"
                >
                </v-text-field>
              </v-col>
              <v-col cols="5">
                <!-- Text field for maximum value -->
                <v-text-field
                    rounded="0"
                    v-model.number="range[1]"
                    :max="max"
                    :min="range[0]"
                    bg-color="white"
                    type="number"
                    label="До"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </div>
        </DisclosurePanel>
      </transition>
    </Disclosure>
    <div>
    </div>
  </div>
</template>


<style scoped>
  /* Hide the spin button on the number inputs */
.v-text-field input[type="number"] {
  -moz-appearance: textfield; /* For Firefox */
  appearance: textfield; /* Standard */
}

/* Hide the spin button on the number inputs for Webkit browsers like Chrome and Safari */
.v-text-field input[type="number"]::-webkit-inner-spin-button,
.v-text-field input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
