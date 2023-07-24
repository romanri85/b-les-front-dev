<script setup>
import {useFiltersStore} from "~/stores/filtersStore.js";
import {storeToRefs} from "pinia";

const filtersStore = useFiltersStore()
const {activeFilters, filterCount} = storeToRefs(filtersStore)


function updateSliderValues([newMin, newMax]) {

  filtersStore.onChangeFilters({'min_price': newMin, 'max_price': newMax});


}


</script>
<template>
  <div class="mx-10">
    <FormKit v-if="filterCount && filterCount.price && filterCount.price[0]"
             type="slider"
             name="slider"
             tooltip="true"
             :value="[2800, 6000]"
             :key="filterCount.price[0]['min_price'] + filterCount.price[0]['max_price']"
             :min="filterCount.price[0]['min_price'] || 2800"
             :max="filterCount.price[0]['max_price'] || 6000"
             @input="updateSliderValues"
    />
  </div>
</template>


<style lang="scss">
</style>