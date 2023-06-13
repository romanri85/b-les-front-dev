<script setup lang="ts">

import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import FilterType from "~/components/filters/FilterType.vue";
import {valueToNode} from "@babel/types";

const  props = defineProps({
  value: {
    type: Array,
  },
  colorSets: {
    type: Array,
  }
})
const emit = defineEmits(['change'])
// console.log(value)





// let chosenColorSets = reactive(props.value)
function chooseColorSet(name){
  if(!props.value.includes(name)){
    emit('change', {colorSet:[...props.value, name]})
  } else {
    const updatedColorSets = props.value.filter((set)=>{
      return set !== name
    })
    emit('change', {colorSet: updatedColorSets})
  }
  // console.log(chosenColorSets, 'chosen')
}

</script>

<template class="filter-container ">
  <Disclosure default-open>
    <DisclosureButton class=" w-full">
      <filter-type filterName="Наборы цветов"/>
    </DisclosureButton>
    <DisclosurePanel class="mb-20">
      <div v-for="colorSet in props.colorSets" :key=colorSet.id class="flex gap-x-4 items-center mb-3" @click="chooseColorSet(colorSet.name)">
        <div class="cursor-pointer pb-1" :class="{'border-b': props.value.includes(colorSet.name), 'border-black':props.value.includes(colorSet.name)}">
          <div :class="colorSet.colorCode" class="w-12 h-12 shadow-darkGrey shadow-sm"></div>
        </div>
        <h5 class="cursor-pointer" :class="{'font-regular':props.value.includes(colorSet.name)}">{{colorSet.name}}</h5>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>

</style>