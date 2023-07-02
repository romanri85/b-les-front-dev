<script setup lang="ts">

import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import FilterType from "~/components/filters/FilterType.vue";
import collections from "~/data/SliderCollections.json";
const props = defineProps({
  value: {
    type: Array,
  }
})
const emit = defineEmits(['change'])


let chosenCollections = props.value || []
function chooseCollection(id: Number){
  if(!chosenCollections.includes(id)){
    chosenCollections.push(id)
  } else {
    chosenCollections.splice(chosenCollections.indexOf(id), 1)
  }
  const collection ={collection:[...chosenCollections]}
  emit('change', collection)
}



</script>

<template class="filter-container ">
  <Disclosure default-open>
    <DisclosureButton class=" w-full">
      <filter-type filterName="Коллекции"/>
    </DisclosureButton>
    <DisclosurePanel class="mb-20">
      <div v-for="collection in collections" :key=collection.id class="flex gap-x-4 items-center mb-3">

        <h5 class="underline-offset-4 cursor-pointer" @click="chooseCollection(collection.id)" :class="{'underline':chosenCollections.includes(collection.id)}">{{$t(collection.name)}}</h5>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>

</style>