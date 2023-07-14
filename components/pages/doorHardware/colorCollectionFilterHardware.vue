<script setup lang="ts">

import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import FilterType from "~/components/filters/FilterType.vue";
import {valueToNode} from "@babel/types";

const  props = defineProps({
  value: {
    type: Array,
  },
  colorCollection: {
    type: Array,
  }
})
const emit = defineEmits(['change'])
// console.log(value)






// let chosenColorSets = reactive(props.value)
function chooseColorCollection(id){
  if(!props.value.includes(id)){
    console.log({color_set:[...props.value, id]})
    emit('change', {color_collection:[...props.value, id]})

  } else {
    const updatedColorCollections = props.value.filter((set)=>{
      return set !== id
    })
    console.log({color_collection: updatedColorCollections})
    emit('change', {color_collection: updatedColorCollections})
  }
}

</script>

<template class="filter-container ">
  <Disclosure default-open>
    <DisclosureButton class=" w-full">
      <filter-type filterName="Наборы цветов"/>
    </DisclosureButton>
    <DisclosurePanel class="mb-20">
      <div v-for="collection in props.colorCollection" :key=collection.id class="flex gap-x-4 items-center mb-3" @click="chooseColorCollection(collection.id)">
        <div class="cursor-pointer pb-1" :class="{'border-b': props.value.includes(collection.id), 'border-black':props.value.includes(collection.id)}">
          <div :style="{ backgroundColor: collection.hex_code }" class="w-12 h-12 shadow-darkGrey shadow-sm"></div>
        </div>
        <h5 class="cursor-pointer" :class="{'font-regular':props.value.includes(collection.id)}">{{collection.name}}</h5>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>

</style>