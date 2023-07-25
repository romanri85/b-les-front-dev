<script setup lang="ts">
import PriceFilter from "~/components/filters/priceFilter.vue";
import ColorSetFilter from "~/components/filters/colorSetFilter.vue";
import DesignFilter from "~/components/filters/designFilter.vue";
import MaterialColorFilter from "~/components/pages/door-catalog/MaterialColorFilter.vue";
import DoorCollectionsFilter from "~/components/pages/door-catalog/DoorCollectionsFilter.vue";
import PrimaryButton from "~/components/buttons/PrimaryButtonSmall.vue";
import PrimaryButtonSmall from "~/components/buttons/PrimaryButtonSmall.vue";
import {baseURL} from "~/config";
import MaterialFilter from "~/components/filters/MaterialFilter.vue";
import GlassFilter from "~/components/filters/GlassFilter.vue";
import PriceSlider from "~/components/base/PriceSlider.vue";
import {bool} from "sharp";
import {useFiltersStore} from "~/stores/filtersStore";


const filtersStore = useFiltersStore()















</script>

<template>

  <section class="">
    <div class=" lg:mb-[80px] md:mb-[70px] flex gap-">
      <div class="inline-flex gap-x-3">
        <svg class="w-[20px] h-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"/>
        </svg>
        <h3>Фильтры</h3>
      </div>
    </div>
    <div class="filter-container">
      <price-filter/>

      <color-set-filter/>
      <design-filter/>
      <material-filter/>
      <material-color-filter/>
      <door-collections-filter/>
      <glass-filter/>
      <primary-button-small class="w-full text-start " @click="">
        <h3>Очистить</h3>
      </primary-button-small>
    </div>

  </section>
</template>

<style scoped>

</style>