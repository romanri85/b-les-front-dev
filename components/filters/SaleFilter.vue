<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { storeToRefs } from 'pinia'
import FilterType from '~/components/filters/FilterType.vue'
import { useFiltersStore } from '~/stores/filtersStore'
import { useViewportSize } from '~/composables/useViewportSize'

const filtersStore = useFiltersStore()
const { filterCount } = storeToRefs(filtersStore)

const withSaleDisabled = computed(() => filterCount.value.sale[0]?.with_sale === 0)

function chooseSale(bool_str: string) {
  filtersStore.checkDoorSetApplied()
  if (filtersStore.activeFilters.sale === '')
    filtersStore.onChangeFilters({ sale: bool_str })
  else if (filtersStore.activeFilters.sale === bool_str)
    filtersStore.onChangeFilters({ sale: '' })
  else

    filtersStore.onChangeFilters({ sale: bool_str })
}

const viewport = useViewportSize()
const isNotMobile = computed(() => viewport.isDesktop === true || viewport.isTablet === true)
</script>

<template>
  <div class="filter-container">
    <Disclosure :key="isNotMobile" :default-open="isNotMobile">
      <DisclosureButton class="w-full">
        <FilterType filter-name="Акция" />
      </DisclosureButton>
      <transition
        enter-active-class="transition duration-500 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-300 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <DisclosurePanel class="mb-10 mt-6">
          <div class="flex flex-col gap-y-4 items-start mb-3">
            <h4
              class="underline-offset-4 font-light"
              :class="{ 'underline': filtersStore.activeFilters.sale === 'true', 'text-gray-400': withSaleDisabled, 'cursor-pointer': !withSaleDisabled }"
              @click="withSaleDisabled ? null : chooseSale('true')"
            >
              ДВЕРИ ПО АКЦИИ
            </h4>
            <!--            <h5 -->
            <!--                class=" underline-offset-4" -->
            <!--                @click="withoutSaleDisabled ? null : chooseSale('false')" -->
            <!--                :class="{'underline': filtersStore.activeFilters.sale === 'false', 'text-gray-400': withoutSaleDisabled, 'cursor-pointer': !withoutSaleDisabled}" -->
            <!--            > -->
            <!--              Двери без акции -->
            <!--            </h5> -->
          </div>
        </DisclosurePanel>
      </transition>
    </Disclosure>
  </div>
</template>

<style scoped>

</style>
