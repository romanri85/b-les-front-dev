<script setup>
import {useFiltersStore} from "~/stores/filtersStore";
import {storeToRefs} from "pinia";
import FilterType from "~/components/filters/FilterType.vue";
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import {useViewportSize} from "~/composables/useViewportSize";

const filtersStore = useFiltersStore()
const {activeFilters, filterCount} = storeToRefs(filtersStore)


// console.log(props.isOpen, 'props')
// console.log(open.value, 'open')


function updateSliderValues([newMin, newMax]) {


  filtersStore.onChangeFilters({'min_price': newMin, 'max_price': newMax});
}

const min = computed(() => filtersStore.filterCount.price[0]?.['min_price'] || 0);
const max = computed(() => filtersStore.filterCount.price[0]?.['max_price'] || 99000);


const viewport = useViewportSize()
const isNotMobile = computed(() => viewport.isDesktop === true || viewport.isTablet === true)

</script>
<template class="filter-container ">
  <div>
    <Disclosure :key="isNotMobile" :default-open="isNotMobile">

      <DisclosureButton class="w-full">
        <filter-type filterName="Цена"/>
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

            <FormKit v-if="filterCount && filterCount.price && filterCount.price[0]"
                     type="slider"
                     name="slider"
                     tooltip="true"
                     :tooltip-format="(v) => `${v} ₽`"
                     :value="[0, 99000]"
                     :key="filterCount.price[0]['min_price'] + filterCount.price[0]['max_price']"
                     :min="min"
                     :max="max"
                     @input="updateSliderValues"

            />


          </div>
        </DisclosurePanel>
      </transition>
    </Disclosure>
    <div>
      <!--    <div class="h-24"></div>-->
    </div>
  </div>
</template>

<style scoped>

</style>