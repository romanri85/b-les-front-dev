<script setup lang="js">

import searchByParameters from '~/data/searchByParameters.json'

const emit = defineEmits(['changeFilters'])

const props = defineProps({
  activeFilters: Object
})

const doorSets = reactive(searchByParameters)


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
    <buttons-primary-button>
      <h3 class="pr-16 whitespace-nowrap">все двери</h3>
    </buttons-primary-button>
    <div class=" flex justify-start gap-x-3 gap-y-3 text-darkGrey flex-wrap">
      <h3 v-for="doorSet in doorSets" :key="doorSet.name"
          class=" last:underline-offset-4 border-black whitespace-nowrap"
          :class="{underline: activeFilters.colorSet.includes(doorSet.filter.colorSet[0])}"
          @click="chooseDoorSet(doorSet.filter)">{{ doorSet.name }}</h3>
    </div>
  </div>
</template>

<style scoped>

</style>