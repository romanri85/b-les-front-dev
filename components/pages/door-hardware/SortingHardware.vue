<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useHardwareFiltersStore } from '~/stores/hardwareFiltersStore'

const hardwareFiltersStore = useHardwareFiltersStore()
const isClicked = ref(false)

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

function toggleArrow() {
  isClicked.value = !isClicked.value
}

function sortHardware(sorting: string) {
  console.log('sortProducts')
  hardwareFiltersStore.onChangeFilters({ ordering: sorting })
}
</script>

<template>
  <Menu>
    <MenuButton>
      <div class="flex" @click="toggleArrow">
        <h3>Сортировка</h3>
        <arrows-arrow-to-click :class="{ '-rotate-180': isClicked }" />
      </div>
    </MenuButton>
    <div class="absolute">
      <MenuItems class="mt-10 absolute z-10">
        <div
          v-for="sorting in sortFilters"
          class="whitespace-nowrap  shadow-sm shadow-darkGrey bg-white p-4 [&>a]:p-2 min-w-[320px]"
        >
          <MenuItem v-slot="{ active }" class="cursor-pointer" @click="sortHardware(sorting.value)">
            <h6 :class="{ &quot;font-regular&quot;: active }">
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
    </div>
  </Menu>
</template>

<style scoped>

</style>
