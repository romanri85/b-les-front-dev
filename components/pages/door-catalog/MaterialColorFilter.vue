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


// import {background} from "ipx";

const props = defineProps({
  value: {
    type: Array,
  },
  material: {
    type: Array,
  }
})

const emit = defineEmits(['change'])


let materialColors = ref([])


async function fetchMaterialColors() {
  const response = await $fetch(`${baseURL}/api/product/material-choices`);
  return response;
}

onMounted(async () => {
  materialColors.value = await fetchMaterialColors()
  chooseMaterial(3)
  console.log(props.value, 'props.value')
})

const materialActiveindex = ref(3)


let chosenColors = reactive(props.value)
let chosenMaterials = reactive(props.material)

function chooseColor(id) {
  if (!props.value.includes(id)) {
    emit('change', {"color": [...props.value, id]})
    console.log((props.value[0]), 'color')
  } else {
    const updatedColors = props.value.filter((item) => {
      return item !== id
    })
    emit('change', {"color": updatedColors})
    console.log((props.value[0]), 'color')
  }

}


function chooseMaterial(material) {
  materialActiveindex.value = material

}


</script>

<template class="filter-container ">
  <Disclosure default-open>
    <DisclosureButton class=" w-full">
      <filter-type filterName="Выбрать цвет"/>
    </DisclosureButton>
    <DisclosurePanel class="mb-20">
      <TabGroup>
        <TabList>
          <div class="flex justify-around w-full pr-4">
            <!--            <div v-for="(material) in materialColors" :key="material.material" class="text-darkGrey">-->
            <!--              <Tab v-for="material in materialColors" :key="material.material" class="text-darkGrey"><h4 @click="chooseMaterial(material.material)"  :class="{'border-b': materialActiveindex === material.material, 'border-black':materialActiveindex === material.material, 'text-primaryDark':materialActiveindex === material.material}" class="">{{-->
            <!--                  material.name-->
            <!--                }}</h4></Tab>-->
            <!--          </div>-->
            <Tab  class="text-darkGrey"><h4 @click="chooseMaterial(3)"
                                                                               :class="{'border-b': materialActiveindex===3, 'border-black':materialActiveindex===3, 'text-primaryDark':materialActiveindex===3}"
                                                                               class="">Эмаль</h4></Tab>
            <Tab  class="text-darkGrey"><h4 @click="chooseMaterial(2)"
                                                                               :class="{'border-b': materialActiveindex===2, 'border-black':materialActiveindex===2, 'text-primaryDark':materialActiveindex===2}"
                                                                               class="">Бук</h4></Tab>
            <Tab  class="text-darkGrey"><h4 @click="chooseMaterial(1)"
                                                                               :class="{'border-b': materialActiveindex===1, 'border-black':materialActiveindex===1, 'text-primaryDark':materialActiveindex===1}"
                                                                               class="">Дуб</h4></Tab>
          </div>
        </TabList>
        <TabPanels>
          <TabPanel v-for="(material, index) in  materialColors" :key="material.material">
            <div class="grid grid-cols-3 gap-y-6 mb-3 mt-5">
              <div v-for="(color) in material.color" :key="color.name" @click="chooseColor(color.id)">
                <div class="flex flex-col items-center">
                  <div class="pb-1"
                       :class="{'border-b': props.value.includes(color.id), 'border-black':props.value.includes(color.id)}">
                    <div :style="{ backgroundImage: 'url(' + color.image + ')' }"
                         class="w-12 h-12 shadow-darkGrey shadow-sm cursor-pointer"></div>
                  </div>
                  <h5 class="pt-2 cursor-pointer" :class="{'font-regular':props.value.includes(color.id)}">
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