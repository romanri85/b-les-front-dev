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

import {useFiltersStore} from "~/stores/filtersStore";
import {storeToRefs} from "pinia";

const filtersStore = useFiltersStore()
const {activeFilters, materialColors,filterCount} = storeToRefs(filtersStore)

const materialActiveindex = ref(0)

filtersStore.fetchMaterialColors()

function chooseColor(id) {
  if (!filtersStore.activeFilters.color.includes(id)) {
    filtersStore.onChangeFilters({"color": [...filtersStore.activeFilters.color, id]})
  } else {
    const updatedColors = filtersStore.activeFilters.color.filter((item) => {
      return item !== id
    })
    filtersStore.onChangeFilters({"color": updatedColors})
  }
}

const materialMap = {
  1: 2,
  2: 1,
  3: 0
}



function isMaterialAvailable(materialValue) {
  for(let i = 0; i < filterCount.value.color.length; i++) {
    if(filterCount.value.color[i].material === materialValue) {
      for(let j = 0; j < filterCount.value.color[i].colors.length; j++) {
        if(filterCount.value.color[i].colors[j].count > 0) {
          return true;
        }
      }
    }
  }
  return false;
}

function isColorAvailable(color, material) {
  for(let item of material.colors) {
    if(item["color"] === color.color) {
      return item["count"] > 0;
    }
  }
  return false;  // return false if no matching color_set is found
}

function chooseMaterial(material) {
  materialActiveindex.value = material

}


watch(() => filterCount.value.color, (newVal) => {
  if (!newVal.find((material) => material.material === materialActiveindex.value)) {
    materialActiveindex.value = newVal[newVal.length - 1].material;
  }
})
const enamel = computed(() => filterCount.value.color.find((material) => material.material === 3))
const beech = computed(() => filterCount.value.color.find((material) => material.material === 2))
const oak = computed(() => filterCount.value.color.find((material) => material.material === 1))

</script>

<template class="filter-container ">
  <Disclosure default-open>
    <DisclosureButton class=" w-full">
      <filter-type filterName="Выбрать цвет"/>
    </DisclosureButton>
    <DisclosurePanel class="mb-20">
      <TabGroup :selectedIndex="materialMap[materialActiveindex] ">
        <TabList>
          <div class="flex justify-around w-full pr-4">
            <Tab index=3 :disabled="!isMaterialAvailable(3)" class="text-primaryDark">
              <h5 @click="!isMaterialAvailable(3) ? null : chooseMaterial(3)"
                  :class="{'border-b': materialActiveindex===3, 'border-black':materialActiveindex===3, 'font-regular':materialActiveindex===3,'text-gray-400':!isMaterialAvailable(3)}"
                  class="">Эмаль</h5></Tab>
            <Tab index=2 :disabled="!isMaterialAvailable(2)" class="text-primaryDark">
              <h5 @click="!isMaterialAvailable(2) ? null : chooseMaterial(2)"
                  :class="{'border-b': materialActiveindex===2, 'border-black':materialActiveindex===2, 'font-regular':materialActiveindex===2, 'text-gray-400':!isMaterialAvailable(2)}"
                  class="">Бук</h5></Tab>
            <Tab index="1" :disabled="!isMaterialAvailable(1)" class="text-primaryDark">
              <h5 @click="!isMaterialAvailable(1) ? null : chooseMaterial(1)"
                  :class="{'border-b': materialActiveindex===1, 'border-black':materialActiveindex===1,'font-regular':materialActiveindex===1, 'text-gray-400':!isMaterialAvailable(1)}"
                  class="">Дуб</h5></Tab>
          </div>
        </TabList>
        <TabPanels>
          <TabPanel >
            <div v-if="enamel" class="grid grid-cols-3 gap-y-6 mb-3 mt-5">
              <div v-for="(color) in enamel.colors" :key="color.color" @click="chooseColor(color.color)">
                <div v-if="isColorAvailable(color, enamel)" class="flex flex-col items-center">
                  <div class="pb-1"
                       :class="{'border-b': activeFilters.color.includes(color.color), 'border-black':activeFilters.color.includes(color.color)}">
                    <div :style="{ backgroundImage: 'url(https://b-les-storage.ams3.digitaloceanspaces.com/media/' + color.image + ')' }"
                         class="w-12 h-12 shadow-darkGrey shadow-sm cursor-pointer"></div>

                  </div>
                  <h5 class="pt-2 cursor-pointer"
                      :class="{'font-regular':activeFilters.color.includes(color.color)}">
                    {{ color.name }}</h5>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel >
            <div v-if="beech" class="grid grid-cols-3 gap-y-6 mb-3 mt-5">
              <div v-for="(color) in beech.colors" :key="color.color" @click="chooseColor(color.color)">
                <div v-if="isColorAvailable(color, beech)" class="flex flex-col items-center">
                  <div class="pb-1"
                       :class="{'border-b': activeFilters.color.includes(color.color), 'border-black':activeFilters.color.includes(color.color)}">
                    <div :style="{ backgroundImage: 'url(https://b-les-storage.ams3.digitaloceanspaces.com/media/' + color.image + ')' }"
                         class="w-12 h-12 shadow-darkGrey shadow-sm cursor-pointer"></div>

                  </div>
                  <h5 class="pt-2 cursor-pointer"
                      :class="{'font-regular':activeFilters.color.includes(color.color)}">
                    {{ color.name }}</h5>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div v-if="oak" class="grid grid-cols-3 gap-y-6 mb-3 mt-5">
              <div v-for="(color) in oak.colors" :key="color.color" @click="chooseColor(color.color)">
                <div v-if="isColorAvailable(color, oak)" class="flex flex-col items-center">
                  <div class="pb-1"
                       :class="{'border-b': activeFilters.color.includes(color.color), 'border-black':activeFilters.color.includes(color.color)}">
                    <div :style="{ backgroundImage: 'url(https://b-les-storage.ams3.digitaloceanspaces.com/media/' + color.image + ')' }"
                         class="w-12 h-12 shadow-darkGrey shadow-sm cursor-pointer"></div>

                  </div>
                  <h5 class="pt-2 cursor-pointer"
                      :class="{'font-regular':activeFilters.color.includes(color.color)}">
                    {{ color.name }}</h5>
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