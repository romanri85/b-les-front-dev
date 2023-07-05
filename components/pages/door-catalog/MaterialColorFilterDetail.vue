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
import {filter} from "domutils";
// import {background} from "ipx";

const props = defineProps({
  activeFilters: {
    type: Object,
  },
  material: {
    type: Array,
  }
})

const emit = defineEmits(['changeFilter', 'changeMaterials'])


let materialColors = ref([])

let availableColors = ref([])


async function fetchMaterialColors() {
  const response = await $fetch(`${baseURL}/api/product/material-choices`);
  return response;
}

onMounted(async () => {
  materialColors.value = await fetchMaterialColors()

  availableColors.value = filterMaterial(materialColors.value, props.material)




})


function filterMaterial(inputArr, argArr) {
  const ids = argArr.map(arg => arg.material); // get the material ids from argument array
  return inputArr.filter(input => ids.includes(input.material)); // return only those materials that are in the ids array
}

// function filterByMaterial(array1, array2) {
//   // Create a set of material values from the second array
//   let materialSet = new Set(array2.map(item => item.material));
//   console.log(materialSet, 'materialSet')
//
//   // Filter the first array to only include items with a material value in the set
//   return array1.filter(item => materialSet.has(item.material));
// }
const materialActiveindex = ref(3)
const colorActiveindex = ref(1)





// let chosenColors = reactive(props.value)
// let chosenMaterials = reactive(props.material)

function chooseColor(id) {
  colorActiveindex.value = id
  // if (!chosenColors.includes(id)) {
  //   chosenColors.push(id)
  // } else {
  //   chosenColors.splice(chosenColors.indexOf(id), 1)
  // }
  emit('changeFilter', {"color": id, "material": materialActiveindex.value, "product": props.activeFilters.product})
}

function chooseMaterial(material) {
  materialActiveindex.value = material
  console.log(props.activeFilters, 'props.activeFilters')
  // if (!chosenMaterials.includes(material)) {
  //   chosenMaterials.push(material)
  //   console.log(chosenMaterials)
  // } else {
  //   chosenMaterials.splice(chosenMaterials.indexOf(material), 1)
  //   console.log(chosenMaterials)
  // }
  // emit('changeMaterials', {"material":chosenMaterials})
}


</script>

<template class="filter-container ">
<div v-if="availableColors.length==3">
    <client-only>

  <Disclosure default-open>
    <DisclosureButton class=" w-full">
      <filter-type filterName="Выбрать цвет"/>
    </DisclosureButton>
    <DisclosurePanel class="mb-20">
      <TabGroup>
        <TabList>
          <div class="flex justify-around w-full pr-4">
                          <Tab as="template" v-slot="{ selected }" v-for="material in availableColors" :key="material.material" class="text-darkGrey"><h4 @click="chooseMaterial(material.material)"  :class="{'border-b': selected, 'border-black':selected, 'text-primaryDark':selected}">{{
                              material.name
                            }}</h4></Tab>

          </div>
        </TabList>
        <TabPanels>
          <TabPanel v-for="(material, index) in  availableColors" :key="material.material">
            <div class="grid grid-cols-3 gap-y-6 mb-3 mt-5">
              <div v-for="(color) in material.color" :key="color.name" @click="chooseColor(color.id)">
                <div class="flex flex-col items-center">
                  <div class="pb-1"
                       :class="{'border-b': color.id === colorActiveindex, 'border-black':color.id === colorActiveindex}">
                    <div :style="{ backgroundImage: 'url(' + color.image + ')' }"
                         class="w-12 h-12 shadow-darkGrey shadow-sm cursor-pointer"></div>
                  </div>
                  <h5 class="pt-2 cursor-pointer" :class="{'font-regular':color.id === colorActiveindex}">
                    {{ color.name }}</h5>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </DisclosurePanel>
  </Disclosure>
        </client-only>

</div>

</template>



<style scoped>

</style>