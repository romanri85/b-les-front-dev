<script setup lang="ts">
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'

const isClicked = ref(false)
const toggleArrow = () => {
  isClicked.value = !isClicked.value
}


</script>

<template>
  <Menu>
    <MenuButton>
      <div class="flex" @click="toggleArrow">
        <h3>Сортировка</h3>
        <arrows-arrow-to-click :class="{'-rotate-180': isClicked}"/>
      </div>
    </MenuButton>
    <div class="absolute">
      <MenuItems>
        <div
            class="whitespace-nowrap  shadow-sm shadow-darkGrey bg-white p-4 mt-10 [&>a]:p-2 min-w-[320px]">
          <MenuItem v-slot="{ active }">
            <a href="/account-settings">
              <h6 :class='{ "font-regular": active }'>По умолчанию</h6>
            </a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a href="/account-settings">
              <h6 :class='{ "font-regular": active }'>По возрастанию цены</h6>
            </a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a href="/account-settings">
              <h6 :class='{ "font-regular": active }'> По убыванию цены</h6>
            </a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a href="/account-settings">
              <h6 :class='{ "font-regular": active }'>По названию продукта: с начала</h6>
            </a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a href="/account-settings">
              <h6 :class='{ "font-regular": active }'> По названию продукта: с конца</h6>
            </a>
          </MenuItem>

        </div>
      </MenuItems>
    </div>

  </Menu>
</template>

<style scoped>

</style>