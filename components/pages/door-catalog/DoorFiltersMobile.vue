<script setup lang="ts">
import PriceFilter from '~/components/filters/PriceFilter.vue'
import ColorSetFilter from '~/components/filters/ColorSetFilter.vue'
import DesignFilter from '~/components/filters/DesignFilter.vue'
import MaterialColorFilter from '~/components/pages/door-catalog/MaterialColorFilter.vue'
import DoorCollectionsFilter from '~/components/pages/door-catalog/DoorCollectionsFilter.vue'
import MaterialFilter from '~/components/filters/MaterialFilter.vue'
import GlassFilter from '~/components/filters/GlassFilter.vue'
import { useFiltersStore } from '~/stores/filtersStore'
import SecondaryButton from '~/components/buttons/SecondaryButton.vue'
import SortingMobile from '~/components/filters/SortingMobile.vue'
import SaleFilter from '~/components/filters/SaleFilter.vue'
import PrimaryButtonBig from '~/components/buttons/PrimaryButtonBig.vue'

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
        <SortingMobile @close-sorting="isSortingOpen = false" />
      </div>
      <div class="w-full flex justify-center pt-12 ">
        <h4>
          Всего дверей: {{ filtersStore.total }}
        </h4>
      </div>

      <div v-if="isFiltersOpen" class=" mt-16 filter-container relative z-20">
        <PriceFilter />

        <ColorSetFilter />
        <DesignFilter />
        <MaterialFilter />
        <MaterialColorFilter />
        <DoorCollectionsFilter />
        <GlassFilter />
        <SaleFilter />
        <PrimaryButtonBig class="pb-8 pt-8 lg:pt-0 text-start " @click="filtersStore.onResetFilters">
          <h3 class="underline-static">
            Все двери
          </h3>
        </PrimaryButtonBig>
      </div>
    </section>
  </client-only>
</template>

<style scoped>

</style>
