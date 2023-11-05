<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useFiltersStore } from '~/stores/filtersStore'
import {storeToRefs} from "pinia";

const sortFilters = [
  {
    name: 'По умолчанию',
    value: 'id',
  },
  {
    name: 'По возрастанию цены',
    value: 'effective_leaf_casing_price',
  },
  {
    name: 'По убыванию цены',
    value: '-effective_leaf_casing_price',
  },
  {
    name: 'По названию продукта: с начала',
    value: 'product_variant__name',
  },
  {
    name: 'По названию продукта: с конца',
    value: '-product_variant__name',
  },
  {
    name: 'По названию цвета: с начала',
    value: 'color__name',
  },
  {
    name: 'По названию цвета: с конца',
    value: '-color__name',
  },
  {
    name: 'По названию материала: с начала',
    value: 'material_order',
  },
  {
    name: 'По названию материала: с конца',
    value: '-material_order',
  },
  {
    name: 'По названию коллекции: с начала',
    value: 'product_variant__product__collection__name',
  },
  {
    name: 'По названию коллекции: с конца',
    value: '-product_variant__product__collection__name',
  },
]

const filtersStore = useFiltersStore()
const { activeFilters } = storeToRefs(filtersStore)

const isClicked = ref(false)

const activeSorting = computed(() => {
  return sortFilters.find((filter) => filter.value === activeFilters.value.ordering)
})

const isFiltersApplied = computed(() => {
  return activeFilters.value.ordering !== 'id' && activeFilters.value.ordering !== ''
})
function toggleArrow() {
  isClicked.value = !isClicked.value
}

function sortDoors(sorting: string) {
  filtersStore.onChangeFilters({ ordering: sorting })
}
</script>

<template>
  <client-only>
    <div class="hidden md:block">
      <Menu>
        <MenuButton>
          <div class="flex relative" @click="toggleArrow">
            <div
                class="w-4 h-4 absolute -right-5 -top-4 text-sm font-mono text-white bg-black flex items-center justify-center"
                v-if="isFiltersApplied !== false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3>Сортировка</h3>
            <arrows-arrow-to-click :class="{ '-rotate-180': isClicked }" />
          </div>
        </MenuButton>
        <div class="absolute">
          <transition
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-300 ease-out"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems class="mt-10 z-10 absolute">
              <div
                v-for="sorting in sortFilters" :key="sorting.name"
                class="whitespace-nowrap  shadow-md shadow-primaryDark bg-white p-4 [&>a]:p-2 min-w-[320px]"
              >
                <MenuItem v-slot="{ active }" class="cursor-pointer" @click="sortDoors(sorting.value)">
                  <h6 :class="{ 'font-regular': active, 'underline-static': activeSorting?.name === sorting?.name}"
                  class="inline-block">
                    {{ sorting.name }}
                  </h6>
                </MenuItem>
                <!--          <MenuItem v-slot="{ active }"> -->
                <!--              <h6 :class='{ "font-regular": active }'>По возрастанию цены</h6> -->
                <!--          </MenuItem> -->
                <!--          <MenuItem v-slot="{ active }"> -->
                <!--              <h6 :class='{ "font-regular": active }'> По убыванию цены</h6> -->
                <!--          </MenuItem> -->
                <!--          <MenuItem v-slot="{ active }"> -->
                <!--              <h6 :class='{ "font-regular": active }'>По названию продукта: с начала</h6> -->
                <!--          </MenuItem> -->
                <!--          <MenuItem v-slot="{ active }"> -->
                <!--              <h6 :class='{ "font-regular": active }'> По названию продукта: с конца</h6> -->
                <!--          </MenuItem> -->
              </div>
            </MenuItems>
          </transition>
        </div>
      </Menu>
    </div>
  </client-only>
</template>

<style scoped>

</style>
