<script setup lang="ts">
import PriceFilter from '~/components/filters/PriceFilter.vue'
import ColorSetFilter from '~/components/filters/ColorSetFilter.vue'
import DesignFilter from '~/components/filters/DesignFilter.vue'
import MaterialColorFilter from '~/components/pages/door-catalog/MaterialColorFilter.vue'
import DoorCollectionsFilter from '~/components/pages/door-catalog/DoorCollectionsFilter.vue'
import MaterialFilter from '~/components/filters/MaterialFilter.vue'
import GlassFilter from '~/components/filters/GlassFilter.vue'
import { useFiltersStore } from '~/stores/filtersStore'
import SaleFilter from '~/components/filters/SaleFilter.vue'
import {storeToRefs} from "pinia";

const filtersStore = useFiltersStore()
const {activeFilters} = storeToRefs(filtersStore)
const filtersNumber = computed(() => {
  let count = 0;
  Object.keys(activeFilters.value).forEach(key => {
    if (!['ordering', 'page', 'min_price', 'max_price'].includes(key)) {
      const value = activeFilters.value[key];
      if (Array.isArray(value) ? value.length > 0 : value !== '') {
        count++;
      }
    }
  });
  return count;
});



</script>

<template>
  <section class="">
    <div class=" lg:mb-[80px] md:mb-[70px] filters flex  md:justify-start gap-3">
      <div class="inline-flex gap-x-3 relative">
        <div
            class="w-4 h-4 absolute -right-5 -top-4 text-sm font-mono text-white bg-black flex items-center justify-center"
            v-if="filtersNumber !== 0"
        >
          {{filtersNumber}}
        </div>
        <svg
          class="w-[20px] h-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          strokeWidth="{1.5}" stroke="currentColor" className="w-6 h-6"
        >
          <path
            strokeLinecap="round" strokeLinejoin="round"
            d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
          />
        </svg>
        <h3>Фильтры</h3>
      </div>
    </div>
    <div class="filter-container">
      <!--      <client-only> -->
<!--      TODO: Permanent PriceFilter rerender mutate activeFilters and breaks the filter logic-->
      <PriceFilter />

      <ColorSetFilter />
      <DesignFilter />
      <MaterialFilter />
      <MaterialColorFilter />
      <DoorCollectionsFilter />
      <GlassFilter />
      <SaleFilter />
      <div class="w-full text-start " @click="filtersStore.onResetFilters()">
        <h3><span class="underline-static cursor-pointer">Сбросить</span></h3>
      </div>
      <!--      </client-only> -->
    </div>
  </section>
</template>

<style scoped>
.filters{
  justify-items: start!important;
}
</style>
