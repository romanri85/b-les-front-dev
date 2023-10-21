<script setup>
import { storeToRefs } from 'pinia'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { useHardwareFiltersStore } from '~/stores/hardwareFiltersStore.js'
import FilterType from '~/components/filters/FilterType.vue'

const hardwareFiltersStore = useHardwareFiltersStore()
const { filterCount } = storeToRefs(hardwareFiltersStore)
// const firstUpdateSliderAfterMount = ref(true);

const min = ref(filterCount.value.price?.[0]?.min_price )
const max = ref(filterCount.value.price?.[0]?.max_price)
// const value = ref([min.value, max.value])
// const value = ref([0, 79000])
const range = ref([
  filterCount.value.price?.[0]?.min_price || 0,
  filterCount.value.price?.[0]?.max_price
])
const viewport = useViewportSize()

async function changeMinMax() {
  const newMin = filterCount.value.price[0]?.min_price;
  const newMax = filterCount.value.price[0]?.max_price;
  if (newMin !== min.value || newMax !== max.value) {
    min.value = newMin;
    max.value = newMax;
    await nextTick()
    console.log(min.value, max.value, 'minmax in if')
    range.value = [min.value, max.value];
  }
}


let isSliderUpdate = ref(false);

function updateSliderValues([newMin, newMax]) {
  isSliderUpdate.value = true;  // Set the flag
  filtersStore.onChangeFilters({min_price: newMin, max_price: newMax});
}
// TODO: remove timeout
watch(
    () => [
      hardwareFiltersStore.activeFilters.color_collection,
      hardwareFiltersStore.activeFilters.design,
    ],
    async (newValues, oldValues) => {
      if (newValues.some((value, index) => value !== oldValues[index])) {
        // console.log('changed');
        setTimeout(() => {
          changeMinMax();
        }, 500);


      }
    },
    {deep: true}
);
</script>

<template class="filter-container ">
  <Disclosure default-open>
    <DisclosureButton class="w-full">
      <FilterType filter-name="Цена" />
    </DisclosureButton>
    <DisclosurePanel class="mb-20 mt-8">
<!--      <div class="px-5">-->
<!--        <FormKit-->
<!--          v-if="filterCount && filterCount.price && filterCount.price[0]"-->
<!--          :key="filterCount.price[0].min_price + filterCount.price[0].max_price"-->
<!--          type="slider"-->
<!--          name="slider"-->
<!--          tooltip="true"-->
<!--          :tooltip-format="(v) => `${v} ₽`"-->
<!--          :value="[0, 99000]"-->
<!--          :min="min"-->
<!--          :max="max"-->
<!--          @input="updateSliderValues"-->
<!--        />-->
<!--      </div>-->
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
                counter="5"
                v-model.number="range[0]"
                :max="range[1]"
                :min="min"
                font-mono="font-mono"
                bg-color="white"
                type="number"
                step="1000"
                prefix="От"
                suffix="₽"
                base-color="grey lighten-4"
                color="grey darken-4"

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
                step="1000"
                type="number"
                prefix="До"
                suffix="₽"
                counter="5"
                base-color="grey lighten-4"
                color="grey darken-4"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </div>
    </DisclosurePanel>
  </Disclosure>
  <div>
    <!--    <div class="h-24"></div> -->
  </div>
</template>

<style scoped>

</style>
