<script setup lang="ts">
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import DoorCard from "~/pages/catalog/DoorCard.vue";

const props = defineProps({
  value: {
    type: Array,
    // required: true
  }
})

let buttons = [
  {
    id: 1,
    name: "1",
    path: "/CasingOakEnamelBeige/PNG/Дуб брашированный Бежевый - Карниз 120.webp",
  },
  {
    id: 2,
    name: "2",
    path: "/CasingOakEnamelBeige/PNG/Дуб брашированный Бежевый -  Карниз 88.webp",
  },
  {
    id: 3,
    name: "3",
    path: "/CasingOakEnamelBeige/PNG/Дуб брашированный Бежевый -  Карниз 90.webp",
  },
  {
    id: 4,
    name: "4",
    path: "/CasingOakEnamelBeige/PNG/Дуб брашированный Бежевый -  76 плоский 90гр.webp",
  },
  {
    id: 5,
    name: "5",
    path: "/CasingOakEnamelBeige/PNG/Дуб брашированный Бежевый -  76 тип 1.webp",
  }
]

const activeCasing = ref("/CasingOakEnamelBeige/PNG/Дуб брашированный Бежевый - Карниз 120.png")

// function changeCasing(path) {
//   // const module = await import(/* @vite-ignore */ `../assets/${iconName}.svg`)
//   // return module.default.replace(/^\/@fs/, '')
//   activeCasing.value = path
// }

const isClicked = ref(false)
const toggleArrow = () => {
  isClicked.value = !isClicked.value
}

</script>

<template>
  <div class="w-full pl-16">

    <div class="text-primaryDark flex justify-between w-full">
      <Menu>
        <MenuButton>
          <div class="flex" @click="toggleArrow">
            <h3>Сортировка</h3>
            <arrows-arrow-to-click :class="{'-rotate-180': isClicked}"/>
          </div>
        </MenuButton>
        <div class="absolute">
        <MenuItems >
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
      <h6>Всего дверей: 245</h6>
    </div>


    <div class="mt-16 grid-cols-3 grid-rows-7 grid">
<!--      <div class="flex">-->
<!--        <button v-for="button in buttons" :key="button.id" class="flex  px-[30px]">-->
<!--          <button @click="changeCasing(button.path)" class="w-[50px] border-2">{{ button.name }}</button>-->
<!--        </button>-->
<!--      </div>-->
      <div v-for="door in [...Array(21).keys()]">
        <door-card class="relative -z-10 hover:border-b border-black"
                   :value="activeCasing"

        />
      </div>


    </div>
  </div>
</template>

<style scoped>

</style>
