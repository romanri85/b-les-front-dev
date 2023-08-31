<script setup lang="ts">
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {useHardwareFiltersStore} from "~/stores/hardwareFiltersStore";
import {storeToRefs} from "pinia";


const sortFilters = [
  {
    name: 'По умолчанию',
    value: 'id'
  },
  {
    name: 'По возрастанию цены',
    value: 'price'
  },
  {
    name: 'По убыванию цены',
    value: '-price'
  },
  {
    name: 'По названию ручки: с начала',
    value: 'hardware__name'
  },
  {
    name: 'По названию ручки: с конца',
    value: '-hardware__name'
  },
  {
    name: 'По названию цвета: с начала',
    value: 'color__color'
  },
  {
    name: 'По названию цвета: с конца',
    value: '-color__color'
  },
]

const hardwareFiltersStore = useHardwareFiltersStore()

const emit = defineEmits(['closeSorting'])

function sortHardware(sorting: string) {
  console.log('sortProducts')
  hardwareFiltersStore.onChangeFilters({ordering: sorting})
  emit('closeSorting')

}

</script>

<template>
  <client-only>



    <div class="mt-10">
      <div v-for="sorting in sortFilters"
           class="whitespace-nowrap bg-white  p-4 [&>a]:p-2 w-[100vw]">
        <div @click="sortHardware(sorting.value)"  class="cursor-pointer">
          <h6 class="text-black" :class='{ "font-regular": true }'>{{ sorting.name }}</h6>
        </div>
      </div>
    </div>


  </client-only>
</template>

<style scoped>

</style>