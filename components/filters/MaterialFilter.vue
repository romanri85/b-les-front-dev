<script setup lang="ts">

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/vue";
import FilterType from "~/components/filters/FilterType.vue";
import {baseURL} from "~/config";
// import {background} from "ipx";
import {useFiltersStore} from "~/stores/filtersStore";
import {storeToRefs} from "pinia";

const filtersStore = useFiltersStore()
const {activeFilters, materialColors, filterCount} = storeToRefs(filtersStore)

onMounted(async () => {
  await filtersStore.fetchMaterialColors()
})

function chooseMaterial(material){
  filtersStore.isFilterCountPriceBlocked = false
  if (!filtersStore.activeFilters.material.includes(material)) {
    filtersStore.onChangeFilters({material: [...filtersStore.activeFilters.material, material]})

  } else {
    filterCount.value.color.filter((item) =>{
      return item.material !== material


    })
    const updatedMaterials = filtersStore.activeFilters.material.filter((item)=>{
      return item !== material



      // activeFilters.value.color.filter((item) =>{
      // })
    })

    const materials= [{material:3,colors:[1,2]}, {material:2, colors:[3,4,5,6]}, {material:1,colors:[7,8,9,10,11,12,13,14,15]}]
    let materialToDelete = materials.filter((item) =>{
      return item.material === material
    })
    const updatedColors = filtersStore.activeFilters.color.filter((color) => {
      return !materialToDelete[0].colors.includes(color)
    })
    filtersStore.onChangeFilters( {"material": updatedMaterials, "color": updatedColors})

  }
}



function isMaterialAvailable(material) {
  for(let item of filterCount.value.material) {
    if(item["material"] === material) {
      return item["count"] > 0;
    }
  }
  return false;  // return false if no matching color_set is found
}
</script>



<template class="filter-container ">
  <Disclosure default-open>
    <DisclosureButton class=" w-full">
      <filter-type filterName="Выбрать отделку"/>
    </DisclosureButton>
    <DisclosurePanel class="mb-20">
          <div class="flex justify-around w-full pr-4">
            <div v-for="(material) in filtersStore.materialColors" :key="material.material" class="text-primaryDark">
              <h4 @click="!isMaterialAvailable(material.material) ? null : chooseMaterial(material.material)"  :class="{
                'border-b': filtersStore.activeFilters.material.includes(material.material) && isMaterialAvailable(material.material), 'border-black':filtersStore.activeFilters.material.includes(material.material), 'text-primaryDark':filtersStore.activeFilters.material.includes(material.material) && isMaterialAvailable(material.material), 'cursor-pointer': isMaterialAvailable(material.material), 'text-gray-400': !isMaterialAvailable(material.material)
              }" class="">{{
                  material.name
                }}</h4>
            </div>
          </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>

</style>