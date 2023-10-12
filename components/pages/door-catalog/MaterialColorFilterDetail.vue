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

// import {background} from "ipx";


const props = defineProps({
  activeFilters: {
    type: Object,
  },
  productMaterials: {
    type: Array,
  },
  material: {
    type: Number
  },
  color: {
    type: Number
  }

})

const emit = defineEmits(['changeFilter', 'changeMaterials'])

//
// onMounted(async () => {
//
//
// })

const filtersStore = useFiltersStore()
const {activeFilters, materialColors, filterCount} = storeToRefs(filtersStore)

const materialActiveindex = ref(props.material)
const colorActiveindex = ref(props.color)
const productMaterials = ref(props.productMaterials)


function chooseColor(id) {

  colorActiveindex.value = id

  emit('changeFilter', {"material": materialActiveindex.value, "color": id})
}

function chooseMaterial(material) {
  materialActiveindex.value = material

}

let materialMap = {3: 0, 2: 1, 1: 2}
let index = materialMap[props.material]

</script>

<template class="filter-container ">
<!--<p>{{materialMap[props.material]}}</p>-->
<div v-if="props.productMaterials[0]" class="w-full lg:w-1/2 ">
  <client-only>
  <Disclosure default-open>
    <DisclosureButton class=" w-full">
      <filter-type filterName="Выбрать цвет"/>
    </DisclosureButton>
    <DisclosurePanel class="lg:mb-6 mb-10">
      <TabGroup v-if="props.productMaterials" :defaultIndex="index">
        <TabList>

          <div class="flex justify-start gap-x-12 lg:gap-x-20 w-full">
            <div v-for="material in props.productMaterials.sort((a,b)=>{
              if(a.material < b.material) { return 1; }
              if(a.material > b.material) { return -1; }
              return 0;
            })" :key="material.material">

              <Tab as="template" v-slot="{ selected }"
                   class="text-darkGrey cursor-pointer"><h4
                  @click="chooseMaterial(material.material)"
                  :class="{'border-b': selected, 'border-black':selected, 'text-primaryDark':selected}">{{
                  material.name
                }}</h4></Tab>


            </div>

          </div>
        </TabList>
        <TabPanels v-if="props.productMaterials">
          <TabPanel v-if="material" v-for="material of props.productMaterials" :key="material.material">
            <div v-if="material" class="flex gap-y-6 gap-x-6 mb-3 mt-5 flex-wrap w-full">
              <div v-for="color in material.color" :key="color.id" @click="chooseColor(color.id)">
                <div class="flex flex-col items-start w-24">
                  <div class="pb-1 border-b-4"
                       :class="{'border-transparent': color.id === !colorActiveindex,'border-black': color.id === colorActiveindex, 'border-b border-transparent': color.id !== colorActiveindex}">
                    <div :style="color.image ? `background-image: url(${color.image})` : `background-color: ${color.hex_code}`"
                         class="w-12 h-12 shadow-darkGrey shadow-sm cursor-pointer">
                    </div>
                  </div>
                  <h5  class=" pt-2 cursor-pointer whitespace-nowrap">
                    {{ color.name }}
                  </h5>
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