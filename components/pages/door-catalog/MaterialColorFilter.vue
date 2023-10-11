<script setup lang="js">

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
import {useViewportSize} from "~/composables/useViewportSize";

const filtersStore = useFiltersStore()
const {activeFilters, materialColors, filterCount} = storeToRefs(filtersStore)

const materialActiveindex = ref(0)

// filtersStore.fetchMaterialColors()

function removeInactiveMaterials(materialColors, id, filtersStore) {
  // Loop through each material in the array
  materialColors.forEach((mat) => {
    // Check if the material has the color ID that is being deactivated
    if (mat.color.some(color => color.id === id)) {
      // Find out if any other color in this material is still active
      const isActive = mat.color.some(color => filtersStore.activeFilters.color.includes(color.id));

      // If no colors for this material are active, remove the material from active filters
      if (!isActive) {
        const index = filtersStore.activeFilters.material.indexOf(mat.material);
        if (index > -1) {
          filtersStore.activeFilters.material.splice(index, 1);
        }
      }
    }
  });
}
function chooseColor(id) {


  if (!filtersStore.activeFilters.color.includes(id)) {
    filtersStore.onChangeFilters({ "color": [...filtersStore.activeFilters.color, id] });

    // Find the material(s) containing the color ID and add to the activeFilters.material
    // materials.forEach((mat) => {
    //   if (mat.colors.includes(id) && (!filtersStore.activeFilters.material.includes(mat.material))) {
    //     filtersStore.activeFilters.material.push(mat.material);
    //   }
    // });
  } else {
    const updatedColors = filtersStore.activeFilters.color.filter((item) => {
      return item !== id;
    });

    filtersStore.onChangeFilters({ "color": updatedColors });


    removeInactiveMaterials(materialColors.value, id, filtersStore);
  }
}


const materialMap = {
  1: 2,
  2: 1,
  3: 0
}


function isMaterialAvailable(materialValue) {
  for (let i = 0; i < filterCount.value.color.length; i++) {
    if (filterCount.value.color[i].material === materialValue) {
      for (let j = 0; j < filterCount.value.color[i].colors.length; j++) {
        if (filterCount.value.color[i].colors[j].count > 0) {
          return true;
        }
      }
    }
  }
  return false;
}

function isColorAvailable(color, material) {
  for (let item of material.colors) {
    if (item["color"] === color.color) {
      return item["count"] > 0;
    }
  }
  return false;  // return false if no matching color_set is found
}

function chooseMaterial(material) {
  // filtersStore.checkDoorSetApplied()
  materialActiveindex.value = material

}

//
// watch(() => filterCount.value.color, (newVal) => {
//
//   if (!newVal.find((material) => material.material === materialActiveindex.value)) {
//     materialActiveindex.value = newVal[newVal.length - 1]?.material;
//     console.log(materialMap[materialActiveindex] , 'materialActiveindex.value with map')
//     console.log(materialActiveindex.value , 'materialActiveindex.value')
//   }
// });
const sortColors = (material) => {
  if (material.colors) {
    material.colors.sort((a, b) => a.color - b.color);
  }
  return material;
}

const enamel = computed(() => sortColors(filterCount.value.color?.find((material) => material.material === 3) || {}));
const beech = computed(() => sortColors(filterCount.value.color?.find((material) => material.material === 2) || {}));
const oak = computed(() => sortColors(filterCount.value.color?.find((material) => material.material === 1) || {}));


const enamelColors = enamel.value.colors ? enamel.value.colors.map((color) => color.color) : [];
const beechColors = beech.value.colors ? beech.value.colors.map((color) => color.color) : [];
const oakColors = oak.value.colors ? oak.value.colors.map((color) => color.color) : [];



const enamelCount = computed(() => activeFilters.value.color?.filter((color) => enamelColors.includes(color)).length || 0);
const beechCount = computed(() => activeFilters.value.color?.filter((color) => beechColors.includes(color)).length || 0);
const oakCount = computed(() => activeFilters.value.color?.filter((color) => oakColors.includes(color)).length || 0);

watch(() => filterCount.value.color, (newVal) => {
  // Log newVal length for debugging purposes
  console.log(newVal.length, 'newVal');

  // Don't execute if newVal is an empty array
  if (newVal.length === 0) {
    return;
  }

  const lastItem = newVal[newVal.length - 1];

  // Add check for undefined last item
  if (lastItem) {
    console.log(lastItem.material, 'newVal');

    if (!newVal.find((material) => material.material === materialActiveindex.value)) {
      materialActiveindex.value = lastItem.material;

      // Log for debugging purposes
      console.log(materialActiveindex.value, 'materialActiveindex.value');
    }
  }
});
const viewport = useViewportSize()
const isNotMobile = computed(() => viewport.isDesktop === true || viewport.isTablet === true)

</script>

<template class="filter-container ">
<!--  <client-only>-->
    <Disclosure :key="isNotMobile" :default-open="isNotMobile">
      <DisclosureButton class=" w-full">
        <filter-type filterName="Выбрать цвет"/>
      </DisclosureButton>
      <transition
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-300 ease-out"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
      >
      <DisclosurePanel class="mb-10 mt-6" >
        <TabGroup :selectedIndex="materialMap[materialActiveindex] ">
          <TabList>

            <div class="flex justify-start gap-x-12 lg:gap-x-20 w-full pr-4">
              <Tab  class="text-primaryDark">
                <div class="relative">
                  <span v-if="enamelCount > 0 " class="text-primaryDark absolute text-xs -right-2 -top-1">{{
                      enamelCount
                    }}</span>
                  <h4 @click="!isMaterialAvailable(3) ? null : chooseMaterial(3)"
                      :class="{'underline': materialActiveindex===3,'cursor-default': materialActiveindex===3, 'text-gray-400':!isMaterialAvailable(3)}"
                      class="underline-offset-4 font-light">ЭМАЛЬ</h4>
                </div>
              </Tab>
              <Tab  class="text-primaryDark">
                <div class="relative">
                  <span v-if="beechCount > 0 " class="text-primaryDark absolute text-xs -right-2 -top-1">{{
                      beechCount
                    }}</span>
                  <h4 @click="!isMaterialAvailable(2) ? null : chooseMaterial(2)"
                      :class="{'underline': materialActiveindex===2,'cursor-default': materialActiveindex===2, 'text-gray-400':!isMaterialAvailable(2)}"
                      class="underline-offset-4 font-light">БУК</h4>
                </div>
              </Tab>
              <Tab   class="text-primaryDark">
                <div class="relative">
                  <span v-if="oakCount > 0 " class="text-primaryDark absolute text-xs -right-2 -top-1">{{
                      oakCount
                    }}</span>
                  <h4 @click="!isMaterialAvailable(1) ? null : chooseMaterial(1)"
                      :class="{'underline': materialActiveindex===1,'cursor-default': materialActiveindex===1, 'text-gray-400':!isMaterialAvailable(1)}"
                      class="underline-offset-4 font-light">ДУБ</h4>
                </div>
              </Tab>
            </div>
          </TabList>


          <TabPanels>
            <TabPanel>

<!--              <pre>{{filtersStore.activeFilters.color}}</pre>-->
              <div v-if="enamel && enamel.colors" class="grid custom-grid-cols gap-x-8 lg:gap-x-16 gap-y-6 mb-3 mt-5">
                <div v-for="(color) in enamel.colors" :key="color.color" @click="chooseColor(color.color)">
                  <div v-if="isColorAvailable(color, enamel)" class="flex flex-col items-start max-w-[52px]">
                    <div class="pb-1 border-b-4"
                         :class="{'border-transparent': !activeFilters.color.includes(color.color), 'border-black':activeFilters.color.includes(color.color)}">
                      <div
                          :style="{ backgroundColor: color.hex_code }"                          class="w-12 h-12 shadow-darkGrey shadow-sm cursor-pointer"></div>

                    </div>
                    <h5 class="hidden lg:block pt-2 cursor-pointer whitespace-nowrap overflow-visible">
                      {{ color.name }}</h5>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div v-if="beech && beech.colors" class="grid custom-grid-cols gap-x-8 lg:gap-x-16 gap-y-6 mb-3 mt-5">
                <div v-for="(color) in beech.colors" :key="color.color" @click="chooseColor(color.color)">
                  <div v-if="isColorAvailable(color, beech)" class="flex flex-col items-start max-w-[52px]">
                    <div class="pb-1 border-b-4"
                         :class="{'border-transparent': !activeFilters.color.includes(color.color), 'border-black':activeFilters.color.includes(color.color)}">
                      <div
                          :style="{ backgroundImage: 'url(https://b-les-storage.ams3.digitaloceanspaces.com/media/' + color.image + ')' }"
                          class="w-12 h-12 shadow-darkGrey shadow-sm cursor-pointer"></div>

                    </div>
                    <h5 class="hidden lg:block pt-2 cursor-pointer whitespace-nowrap overflow-visible">
                      {{ color.name }}</h5>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div v-if="oak && oak.colors" class="grid custom-grid-cols gap-x-8 lg:gap-x-16 gap-y-6 mb-3 mt-5">
                <div v-for="(color) in oak.colors" :key="color.color" @click="chooseColor(color.color)">
                  <div v-if="isColorAvailable(color, oak)" class="flex flex-col items-start max-w-[52px]">
                    <div class="pb-1 border-b-4"
                         :class="{'border-transparent': !activeFilters.color.includes(color.color), 'border-black':activeFilters.color.includes(color.color)}">
                      <div
                          :style="{ backgroundImage: 'url(https://b-les-storage.ams3.digitaloceanspaces.com/media/' + color.image + ')' }"
                          class="w-12 h-12 shadow-darkGrey shadow-sm cursor-pointer"></div>

                    </div>
                    <h5 class="hidden lg:block pt-2 cursor-pointer whitespace-nowrap overflow-visible">
                      {{ color.name }}</h5>
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </DisclosurePanel>
      </transition>
    </Disclosure>
<!--  </client-only>-->
</template>

<style scoped>
.custom-grid-cols {
  grid-template-columns: repeat(3, 52px);
}


</style>