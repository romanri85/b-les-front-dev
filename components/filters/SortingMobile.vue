<script setup lang="ts">
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {useFiltersStore} from "~/stores/filtersStore";
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
    name: 'По названию продукта: с начала',
    value: 'product_variant__name'
  },
  {
    name: 'По названию продукта: с конца',
    value: '-product_variant__name'
  },
  {
    name: 'По названию цвета: с начала',
    value: 'color__name'
  },
  {
    name: 'По названию цвета: с конца',
    value: '-color__name'
  },
  {
    name: 'По названию материала: с начала',
    value: 'material_order'
  },
  {
    name: 'По названию материала: с конца',
    value: '-material_order'
  },
  {
    name: "По названию коллекции: с начала",
    value: "product_variant__product__collection__name"
  },
  {
    name: "По названию коллекции: с конца",
    value: "-product_variant__product__collection__name"
  }
]

const filtersStore = useFiltersStore()

const emit = defineEmits(['closeSorting'])

function sortDoors(sorting: string) {
  filtersStore.onChangeFilters({ordering: sorting})
  emit('closeSorting')

}

</script>

<template>
  <client-only>



          <div class="mt-10">
            <div v-for="sorting in sortFilters"
                 class="whitespace-nowrap bg-white  p-4 [&>a]:p-2 w-[100vw]">
              <div @click="sortDoors(sorting.value)"  class="cursor-pointer">
                <h6 class="text-black" :class='{ "font-regular": true }'>{{ sorting.name }}</h6>
              </div>
            </div>
          </div>


  </client-only>
</template>

<style scoped>

</style>