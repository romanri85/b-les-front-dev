<script setup lang="ts">
import PrimaryButtonSmall from '~/components/buttons/PrimaryButtonSmall.vue'
import { useFiltersStore } from '~/stores/filtersStore'
import SecondaryButton from '~/components/buttons/SecondaryButton.vue'
import PriceFilterHardware from '~/components/pages/door-hardware/PriceFilterHardware.vue'
import ColorCollectionFilterHardware from '~/components/pages/door-hardware/ColorCollectionFilterHardware.vue'
import DesignFilterHardware from '~/components/pages/door-hardware/DesignFilterHardware.vue'
import { useHardwareFiltersStore } from '~/stores/hardwareFiltersStore'
import SortingHardwareMobile from '~/components/pages/door-hardware/SortingHardwareMobile.vue'

const hardwareFiltersStore = useHardwareFiltersStore()
const filtersStore = useFiltersStore()
const isFiltersOpen = ref(false)
const isSortingOpen = ref(false)

function toggleFiltersOpen() {
  isFiltersOpen.value = !isFiltersOpen.value
  if (isFiltersOpen.value)
    isSortingOpen.value = false
}

function toggleSortingOpen() {
  isSortingOpen.value = !isSortingOpen.value
  if (isSortingOpen.value)
    isFiltersOpen.value = false
}
</script>

<template>
  <client-only>
    <section class="">
      <div class="main-container" />
      <div class=" lg:mb-[80px] md:mb-[70px] flex justify-center md:justify-start gap-3">
        <SecondaryButton
          class="p-2 w-40 h-16"
          :class="{ 'bg-primaryDark text-white': isFiltersOpen }"
          @click="toggleFiltersOpen"
        >
          <div class="inline-flex items-center gap-x-3">
            <svg
              class="w-[30px] h-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth="{1.5}" stroke="currentColor" className="w-6 h-6"
            >
              <path
                strokeLinecap="round" strokeLinejoin="round"
                d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
              />
            </svg>
            <h3>Фильтры</h3>
          </div>
        </SecondaryButton>
        <div>
          <SecondaryButton
            class="w-40 h-16 r" :class="{ 'bg-primaryDark text-white': isSortingOpen }"
            @click="toggleSortingOpen"
          >
            <h3>Сортировка</h3>
          </SecondaryButton>
        </div>
      </div>
      <div v-if="isSortingOpen">
        <SortingHardwareMobile @close-sorting="isSortingOpen = false" />
      </div>
      <div class="w-full flex justify-center pt-12 ">
        <buttons-primary-button-small class="">
          <h4>Всего ручек: {{ hardwareFiltersStore.total }}</h4>
        </buttons-primary-button-small>
      </div>

      <div v-if="isFiltersOpen" class=" mt-16 filter-container relative z-20">
        <PriceFilterHardware />

        <ColorCollectionFilterHardware />
        <DesignFilterHardware />
        <PrimaryButtonSmall class="w-full text-start " @click="hardwareFiltersStore.onResetFilters">
          <h3 class="inline underline-static">
            Все ручки
          </h3>
        </PrimaryButtonSmall>
      </div>
    </section>
  </client-only>
</template>

<style scoped>

</style>
