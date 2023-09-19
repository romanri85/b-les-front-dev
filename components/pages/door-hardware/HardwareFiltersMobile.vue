<script setup lang="ts">
import PrimaryButtonSmall from "~/components/buttons/PrimaryButtonSmall.vue";
import {useFiltersStore} from "~/stores/filtersStore";
import SecondaryButton from "~/components/buttons/SecondaryButton.vue";
import SortingMobile from "~/components/filters/SortingMobile.vue";
import PriceFilterHardware from "~/components/pages/door-hardware/priceFilterHardware.vue";
import ColorCollectionFilterHardware from "~/components/pages/door-hardware/colorCollectionFilterHardware.vue";
import DesignFilterHardware from "~/components/pages/door-hardware/designFilterHardware.vue";
import {useHardwareFiltersStore} from "~/stores/hardwareFiltersStore";
import SortingHardwareMobile from "~/components/pages/door-hardware/SortingHardwareMobile.vue";

const hardwareFiltersStore = useHardwareFiltersStore()
const filtersStore = useFiltersStore()
const isFiltersOpen = ref(false)
const isSortingOpen = ref(false)

function toggleFiltersOpen() {
  isFiltersOpen.value = !isFiltersOpen.value
  if (isFiltersOpen.value) {
    isSortingOpen.value = false
  }
}

function toggleSortingOpen() {
  isSortingOpen.value = !isSortingOpen.value
  if (isSortingOpen.value) {
    isFiltersOpen.value = false
  }

}


</script>

<template>
  <client-only>

    <section class="">
      <div class="main-container">

      </div>
      <div class=" lg:mb-[80px] md:mb-[70px] flex justify-center md:justify-start gap-3">
        <secondary-button
            @click="toggleFiltersOpen"
            class="p-2 w-40 h-16"
            :class="{ 'bg-primaryDark text-white': isFiltersOpen }">
          <div class="inline-flex items-center gap-x-3">
            <svg class="w-[30px] h-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"/>
            </svg>
            <h3>Фильтры</h3>

          </div>
        </secondary-button>
        <div>
          <secondary-button class="w-40 h-16 r" @click="toggleSortingOpen"
                            :class="{ 'bg-primaryDark text-white': isSortingOpen }">
            <h3>Сортировка</h3>
          </secondary-button>
        </div>
      </div>
      <div v-if="isSortingOpen">
        <sorting-hardware-mobile @close-sorting="isSortingOpen=false"/>
      </div>
      <div class="w-full flex justify-center pt-12 ">
      <buttons-primary-button-small class="">
        <h4>Всего ручек: {{hardwareFiltersStore.total}}</h4>
      </buttons-primary-button-small>
      </div>

      <div class=" mt-16 filter-container relative z-20" v-if="isFiltersOpen">
        <price-filter-hardware/>

        <color-collection-filter-hardware/>
        <design-filter-hardware/>
        <primary-button-small class="w-full text-start " @click="">
          <h3>Очистить</h3>
        </primary-button-small>
      </div>

    </section>
  </client-only>

</template>

<style scoped>

</style>