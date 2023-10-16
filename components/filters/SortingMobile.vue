<script setup lang="ts">
import { useFiltersStore } from '~/stores/filtersStore'

const emit = defineEmits(['closeSorting'])

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

function sortDoors(sorting: string) {
  filtersStore.onChangeFilters({ ordering: sorting })
  emit('closeSorting')
}
</script>

<template>
  <client-only>
    <div class="mt-10">
      <div
        v-for="sorting in sortFilters" :key="sorting.name"
        class="whitespace-nowrap bg-white  p-4 [&>a]:p-2 w-[100vw]"
      >
        <div class="cursor-pointer" @click="sortDoors(sorting.value)">
          <h6 class="text-black font-regular">
            {{ sorting.name }}
          </h6>
        </div>
      </div>
    </div>
  </client-only>
</template>

<style scoped>

</style>
