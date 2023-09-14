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
    value: 'effective_leaf_casing_price'
  },
  {
    name: 'По убыванию цены',
    value: '-effective_leaf_casing_price'
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

const isClicked = ref(false)
const toggleArrow = () => {
  isClicked.value = !isClicked.value
}

function sortDoors(sorting: string) {
  filtersStore.onChangeFilters({ordering: sorting})

}

</script>

<template>
<client-only>
<div class="hidden md:block">
  <Menu>

    <MenuButton>
      <div class="flex" @click="toggleArrow">
        <h3>Сортировка</h3>
        <arrows-arrow-to-click :class="{'-rotate-180': isClicked}"/>
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
        <div v-for="sorting in sortFilters"
            class="whitespace-nowrap  shadow-sm shadow-darkGrey bg-white p-4 [&>a]:p-2 min-w-[320px]">
          <MenuItem @click="sortDoors(sorting.value)" v-slot="{ active }" class="cursor-pointer">
              <h6 :class='{ "font-regular": active }'>{{ sorting.name }}</h6>
          </MenuItem>
<!--          <MenuItem v-slot="{ active }">-->
<!--              <h6 :class='{ "font-regular": active }'>По возрастанию цены</h6>-->
<!--          </MenuItem>-->
<!--          <MenuItem v-slot="{ active }">-->
<!--              <h6 :class='{ "font-regular": active }'> По убыванию цены</h6>-->
<!--          </MenuItem>-->
<!--          <MenuItem v-slot="{ active }">-->
<!--              <h6 :class='{ "font-regular": active }'>По названию продукта: с начала</h6>-->
<!--          </MenuItem>-->
<!--          <MenuItem v-slot="{ active }">-->
<!--              <h6 :class='{ "font-regular": active }'> По названию продукта: с конца</h6>-->
<!--          </MenuItem>-->

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