<script setup lang="ts">

import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import FilterType from "~/pages/catalog/components/FilterType.vue";
import {useCollectionsStore} from "~/stores/collectionsStore";
const props = defineProps({
  value: {
    type: Array,
  }
})
const emit = defineEmits(['change'])

const collectionsStore = useCollectionsStore()
collectionsStore.fetchCollections()





let chosenCollections = reactive(props.value)
function chooseCollection(name){
  if(!chosenCollections.includes(name)){
    chosenCollections.push(name)
  } else {
    chosenCollections.splice(chosenCollections.indexOf(name), 1)
  }
  emit('change', chosenCollections)
}



</script>

<template class="filter-container ">
  <Disclosure default-open>
    <DisclosureButton class=" w-full">
      <filter-type filterName="Коллекции"/>
    </DisclosureButton>
    <DisclosurePanel class="mb-20">
      <div v-for="collection in collectionsStore.collections.results" :key=collection.id class="flex gap-x-4 items-center mb-3">

        <h5 class="underline-offset-4 cursor-pointer" @click="chooseCollection(collection.name)" :class="{'underline':chosenCollections.includes(collection.name)}">{{collection.name}}</h5>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>

</style>