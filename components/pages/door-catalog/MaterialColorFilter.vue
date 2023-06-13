<script setup lang="ts">

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels
} from "@headlessui/vue";
import FilterType from "~/components/filters/FilterType.vue";

const props = defineProps({
  value: {
    type: Array,
  },
  material: Number
})

const emit = defineEmits(['change','changeMaterials'])

let materialColors = [{
  name: "Эмаль",
  id: 1,
  colors: [
    {
      name: 'Белый',
      id: 1,
      colorHex: 'bg-[#85898C]'
    },
    {
      name: 'Черный',
      id: 2,
      colorHex: 'bg-[#EDEDED]'
    },
    {
      name: 'Красный',
      id: 3,
      colorHex: 'bg-[#DCD4C9]'
    },
    {
      name: 'Синий',
      id: 4,
      colorHex: 'bg-[#A69480]'
    },
    {
      name: 'Зеленый',
      id: 5,
      colorHex: 'bg-[#85898C]'
    },
    {
      name: 'Желтый',
      id: 6,
      colorHex: 'bg-[#DCD4C9]'
    },
    {
      name: 'Оранжевый',
      id: 7,
      colorHex: 'bg-[#A69480]'
    },
    {
      name: 'Фиолетовый',
      id: 8,
      colorHex: 'bg-[#85898C]'
    },
    {
      name: 'Розовый',
      id: 9,
      colorHex: 'bg-[#DCD4C9]'
    }
  ]
},
  {
    name: "Дуб",
    id: 2,
    colors: [
      {
        name: 'Светлый',
        id: 4,
        colorHex: 'bg-[#A69480]'
      },
      {
        name: 'Медовый',
        id: 5,
        colorHex: 'bg-[#DCD4C9]'
      },
      {
        name: 'Табачный',
        id: 6,
        colorHex: 'bg-[#85898C]'
      }
    ]
  },
  {
    name: "Бук",
    id:3,
    colors: [
      {
        name: 'Беленый',
        id: 7,
        colorHex: 'bg-[#A69480]'
      },
      {
        name: 'Вишня',
        id: 8,
        colorHex: 'bg-[#85898C]'
      },
      {
        name: 'Темный',
        id: 9,
        colorHex: 'bg-[#DCD4C9]'
      }
    ]
  }]


let chosenColors = reactive(props.value)
let chosenMaterial = reactive(props.material)

function chooseColor(name) {
  if (!chosenColors.includes(name)) {
    chosenColors.push(name)
    console.log(chosenColors)
  } else {
    chosenColors.splice(chosenColors.indexOf(name), 1)
    console.log(chosenColors)
  }
  emit('change', chosenColors)
}


function chooseMaterial(material){
  emit('changeMaterials', {material:material})
}
const activeItem = ref(0)

const setActiveItem = (index: number) => {
  activeItem.value = index
  console.log(activeItem.value)

}


</script>

<template class="filter-container ">
  <Disclosure default-open>
    <DisclosureButton class=" w-full">
      <filter-type filterName="Отделка и цвет"/>
    </DisclosureButton>
    <DisclosurePanel class="mb-20">
      <TabGroup>
        <TabList>
          <div class="flex justify-around w-full pr-4">
            <div v-for="(material, index) in materialColors" :key="material.name" class="text-darkGrey">
              <Tab><h4 @click="setActiveItem(index);chooseMaterial(material.id)" :class="{'text-black':activeItem === index }" class="">{{
                  material.name
                }}</h4></Tab>
            </div>
          </div>
        </TabList>
        <TabPanels>
          <TabPanel v-for="(material, index) in  materialColors" :key="material.name">
            <div class="grid grid-cols-3 gap-y-6 mb-3 mt-5">
              <div v-for="(color,index) in material.colors" :key="color.id"
                   @click="chooseColor(color.name)">
                <div class="flex flex-col items-center">

                  <div class="pb-1"
                       :class="{'border-b': chosenColors.includes(color.name), 'border-black':chosenColors.includes(color.name)}">
                    <div class="w-12 h-12 shadow-darkGrey shadow-sm cursor-pointer" :class="color.colorHex">
                    </div>
                  </div>
                  <h5 class="pt-2 cursor-pointer" :class="{'font-regular':chosenColors.includes(color.name)}">{{ color.name }}</h5>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>

</style>