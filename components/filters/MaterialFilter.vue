<script setup lang="js">

import {Disclosure, DisclosureButton, DisclosurePanel,} from "@headlessui/vue";
import FilterType from "~/components/filters/FilterType.vue";
// import {background} from "ipx";
import {useFiltersStore} from "~/stores/filtersStore";
import {storeToRefs} from "pinia";
import {useViewportSize} from "~/composables/useViewportSize";

const filtersStore = useFiltersStore()
const {activeFilters, materialColors, filterCount} = storeToRefs(filtersStore)


await filtersStore.fetchMaterialColors()
// onMounted(async () => {
//   await filtersStore.fetchMaterialColors()
// })

function chooseMaterial(material) {
  filtersStore.checkDoorSetApplied()
  filtersStore.isFilterCountPriceBlocked = false
  // const materials = [{material: 3, colors: [1, 2, 19, 20]}, {material: 2, colors: [3, 4, 5, 6]}, {
  //   material: 1,
  //   colors: [7, 8, 9, 10, 11, 12, 13, 14, 15]
  // }]
// Find the materials to delete
  let materialToDelete = filtersStore.materialColors.filter((item) => {
    return item.material === material;
  });

// Flatten the color array
  let colorsToDelete = materialToDelete.reduce((acc, current) => {
    return acc.concat(current.color);
  }, []);

// Filter out the colors from activeFilters.color
  const updatedColors = filtersStore.activeFilters.color.filter((color) => {
    return !colorsToDelete.includes(color);
  });
  if (!filtersStore.activeFilters.material.includes(material)) {
    filtersStore.onChangeFilters({material: [...filtersStore.activeFilters.material, material], color: []})
  } else {
    filterCount.value.color.filter((item) => {
      return item.material !== material


    })
    const updatedMaterials = filtersStore.activeFilters.material.filter((item) => {
      return item !== material


    })

    filtersStore.onChangeFilters({"material": updatedMaterials, "color": updatedColors})


  }

}


function isMaterialAvailable(material) {
  for (let item of filterCount.value.material) {
    if (item["material"] === material) {
      return item["count"] > 0;
    }
  }
  return false;  // return false if no matching color_set is found
}

const viewport = useViewportSize()
const isNotMobile = computed(() => viewport.isDesktop === true || viewport.isTablet === true)

</script>


<template class="filter-container ">
  <Disclosure :key="isNotMobile" :default-open="isNotMobile">
    <DisclosureButton class=" w-full">
      <filter-type filterName="Выбрать отделку"/>
    </DisclosureButton>
    <transition
        enter-active-class="transition duration-500 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-300 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
    >
      <DisclosurePanel class="mb-10 mt-6">
        <!--        <pre>{{filtersStore.materialColors}}</pre>-->

        <div class="flex justify-start gap-x-12 w-full pr-4">
          <div v-for="(material) in materialColors" :key="material.material" class="text-primaryDark">
            <h4 @click="!isMaterialAvailable(material.material) ? null : chooseMaterial(material.material)"
                :class="{
                'underline': filtersStore.activeFilters.material.includes(material.material) && isMaterialAvailable(material.material),  'text-primaryDark':filtersStore.activeFilters.material.includes(material.material) && isMaterialAvailable(material.material), 'cursor-pointer': isMaterialAvailable(material.material) , 'text-gray-400': !isMaterialAvailable(material.material)
              }" class="underline-offset-4 font-light">{{
                material.name.toUpperCase()
              }}</h4>
          </div>
        </div>
        <!--      <div v-if="activeFilters.color.length > 0">-->
        <!--        <buttons-primary-button-small class="" @click="filtersStore.onResetFilters()">-->
        <!--          <p class="uppercase">Показать все материалы</p>-->
        <!--        </buttons-primary-button-small>-->
        <!--      </div>-->
      </DisclosurePanel>
    </transition>
  </Disclosure>
</template>

<style scoped>

</style>