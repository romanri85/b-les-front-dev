<script setup lang="ts">

import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import FilterType from "~/components/filters/FilterType.vue";
import {valueToNode} from "@babel/types";

const  props = defineProps({
  value: {
    type: Array,
  },
  color_sets: {
    type: Array,
  }
})
const emit = defineEmits(['change'])
// console.log(value)






// let chosenColorSets = reactive(props.value)
function chooseColorSet(id){
  if(!props.value.includes(id)){
    console.log({color_set:[...props.value, id]})
    emit('change', {color_set:[...props.value, id]})

  } else {
    const updatedColorSets = props.value.filter((set)=>{
      return set !== id
    })
    console.log({color_set: updatedColorSets})
    emit('change', {color_set: updatedColorSets})
  }
}

</script>

<template class="filter-container ">
  <Disclosure default-open>
    <DisclosureButton class=" w-full">
      <filter-type filterName="Наборы цветов"/>
    </DisclosureButton>
    <DisclosurePanel class="mb-20">
      <div v-for="color_set in props.color_sets" :key=color_set.id class="flex gap-x-4 items-center mb-3" @click="chooseColorSet(color_set.id)">
        <div class="cursor-pointer pb-1" :class="{'border-b': props.value.includes(color_set.id), 'border-black':props.value.includes(color_set.id)}">
          <div :style="{ backgroundColor: color_set.hex_code }" class="w-12 h-12 shadow-darkGrey shadow-sm"></div>
        </div>
        <h5 class="cursor-pointer" :class="{'font-regular':props.value.includes(color_set.id)}">{{color_set.name}}</h5>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>

</style>