<script setup>
import {useHardwareFiltersStore} from "~/stores/hardwareFiltersStore.js";
import {storeToRefs} from "pinia";
import FilterType from "~/components/filters/FilterType.vue";
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";

const hardwareFiltersStore = useHardwareFiltersStore()
const {activeFilters, filterCount} = storeToRefs(hardwareFiltersStore)
// const firstUpdateSliderAfterMount = ref(true);


function updateSliderValues([newMin, newMax]) {
  // if (firstUpdateSliderAfterMount.value) {
  //   firstUpdateSliderAfterMount.value = false;
  //   return;
  // }
  hardwareFiltersStore.onChangeFilters({'min_price': newMin, 'max_price': newMax});


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
                  :value="[0, 2500]"
                  :key="filterCount.price[0]['min_price'] + filterCount.price[0]['max_price']"
                  :min="filterCount.price[0]['min_price'] || 0"
                  :max="filterCount.price[0]['max_price'] || 2500"
                  @input="updateSliderValues"


        />
      </div>
    </DisclosurePanel>

  </Disclosure>
  <div>
    <!--    <div class="h-24"></div>-->
  </div>
</template>

<style scoped >

</style>