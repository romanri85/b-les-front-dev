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
import {baseURL} from "~/config";
import {background} from "ipx";

const props = defineProps({
  value: {
    type: Array,
  },
  material: Number
})

const emit = defineEmits(['change','changeMaterials'])


let materialColors = ref([])


async function fetchMaterialColors() {
  const response = await $fetch(`${baseURL}/api/product/material-choices`);
  console.log(response)
  return response;
}
onMounted(async () => {
  materialColors.value = await fetchMaterialColors()
})



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
const activeItem = ref(null)

const setActiveItem = (index: number) => {
  activeItem.value = index

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
              <Tab><h4 @click="setActiveItem(index);chooseMaterial(material.material)" :class="{'text-black':activeItem === index }" class="">{{
                  material.name
                }}</h4></Tab>
            </div>
          </div>
        </TabList>
        <TabPanels>
          <TabPanel v-for="(material, index) in  materialColors" :key="material.name">
<!--            <span>{{material}}</span>-->

            <div class="grid grid-cols-3 gap-y-6 mb-3 mt-5">
              <div v-for="(color,index) in material.colors" :key="color.id"
                   @click="chooseColor(color.name)">
                <div class="flex flex-col items-center">

                  <div class="pb-1"
                       :class="{'border-b': chosenColors.includes(color.name), 'border-black':chosenColors.includes(color.name)}">
                    <div :style="{ backgroundImage: 'url(' + color.image + ')' }" class="w-12 h-12 shadow-darkGrey shadow-sm cursor-pointer">
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