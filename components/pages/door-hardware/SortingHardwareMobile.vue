<script setup lang="ts">
import { useHardwareFiltersStore } from '~/stores/hardwareFiltersStore'

const emit = defineEmits(['closeSorting'])

const sortFilters = [
  {
    name: 'По умолчанию',
    value: 'id',
  },
  {
    name: 'По возрастанию цены',
    value: 'price',
  },
  {
    name: 'По убыванию цены',
    value: '-price',
  },
  {
    name: 'По названию ручки: с начала',
    value: 'hardware__name',
  },
  {
    name: 'По названию ручки: с конца',
    value: '-hardware__name',
  },
  {
    name: 'По названию цвета: с начала',
    value: 'color__color',
  },
  {
    name: 'По названию цвета: с конца',
    value: '-color__color',
  },
]

const hardwareFiltersStore = useHardwareFiltersStore()

function sortHardware(sorting: string) {
  hardwareFiltersStore.onChangeFilters({ ordering: sorting })
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
        <div class="cursor-pointer" @click="sortHardware(sorting.value)">
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
