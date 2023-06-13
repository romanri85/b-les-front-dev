<script setup lang="ts">

import searchByParameters from '~/data/searchByParameters.json'
import PrimaryButtonSmall from "~/components/buttons/PrimaryButtonSmall.vue";

const emit = defineEmits(['changeFilters'])

const props = defineProps({
  activeFilters: Object
})

const doorSets = reactive(searchByParameters)
console.log(doorSets, 'doorSets')


function chooseDoorSet(doorSet) {
  console.log(doorSet, 'doorset')

  emit('changeFilters', doorSet)
}


// add '"All doors" and "More" buttons to tags'


const doorSetsWithButtonAll = []
// doorSetsWithButtonAll.push(...tagsStore.tags)
// doorSetsWithButtonAll.push({id: '99999998', name: 'Еще'})


</script>

<template>
  <div class="main-container inline-flex lg:py-[120px] items-start">
    <primary-button-small>
      <h3 class="pr-16 whitespace-nowrap">все двери</h3>
    </primary-button-small>
    <div class=" flex justify-start gap-x-3 gap-y-3 text-darkGrey flex-wrap">
      <h3 v-for="doorSet in doorSets" :key="doorSet.name"
          class=" last:underline-offset-4 border-black whitespace-nowrap text-primaryDark"
          :class="{underline: activeFilters.colorSet.includes(doorSet.filter.colorSet[0])}"
          @click="chooseDoorSet(doorSet.filter)">{{ doorSet.name }}</h3>
    </div>
  </div>
</template>

<style scoped>

</style>