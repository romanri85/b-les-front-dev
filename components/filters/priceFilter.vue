<script setup>
import {useFiltersStore} from "~/stores/filtersStore.js";
import {storeToRefs} from "pinia";
import FilterType from "~/components/filters/FilterType.vue";
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";

const filtersStore = useFiltersStore()
const {activeFilters, filterCount} = storeToRefs(filtersStore)
const firstUpdateSliderAfterMount = ref(true);
import {useViewportSize} from "~/composables/useViewportSize";


// console.log(props.isOpen, 'props')
// console.log(open.value, 'open')
function updateSliderValues([newMin, newMax]) {
  if (firstUpdateSliderAfterMount.value) {
    firstUpdateSliderAfterMount.value = false;
    return;
  }
  filtersStore.onChangeFilters({'min_price': newMin, 'max_price': newMax});
}

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
      <DisclosurePanel class="mb-20 mt-8">
        <div class="px-5">

          <FormKit v-if="filterCount && filterCount.price && filterCount.price[0]"
                   type="slider"
                   name="slider"
                   tooltip="true"
                   :tooltip-format="(v) => `${v} ₽`"
                   :value="[2800, 6000]"
                   :key="filterCount.price[0]['min_price'] + filterCount.price[0]['max_price']"
                   :min="filterCount.price[0]['min_price'] || 2800"
                   :max="filterCount.price[0]['max_price'] || 6000"
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