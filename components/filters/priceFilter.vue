<script setup>
import {useFiltersStore} from "~/stores/filtersStore.js";
import {storeToRefs} from "pinia";
import FilterType from "~/components/filters/FilterType.vue";
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";

const filtersStore = useFiltersStore()
const {activeFilters, filterCount} = storeToRefs(filtersStore)


function updateSliderValues([newMin, newMax]) {

  filtersStore.onChangeFilters({'min_price': newMin, 'max_price': newMax});


}


</script>

<template class="filter-container ">

  <Disclosure default-open>
    <DisclosureButton class="w-full">
      <filter-type filterName="Цена"/>
    </DisclosureButton>
    <DisclosurePanel class="mb-20 mt-8" >
      <div class="px-5">

        <FormKit  v-if="filterCount && filterCount.price && filterCount.price[0]"
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

  </Disclosure>
  <div>
<!--    <div class="h-24"></div>-->
  </div>
</template>

<style scoped src="@vueform/slider/themes/default.css">

</style>