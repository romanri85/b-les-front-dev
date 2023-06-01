<script setup lang="js">

const emit = defineEmits(['changeFilters'])

const props = defineProps({
  activeFilters: Object
})




const doorSets = reactive([
  {
    name: "white doors",
    filter: {colorSet: ['Белый']},
  },
  {
    name: "red doors",
    filter: {colorSet: ['Красный']},
  },
  {
    name: "green doors",
    filter: {colorSet: ['Зеленый']},
  },
  {
    name: "blue doors",
    filter: {colorSet: ['Синий']},
  },
  {
    name: "yellow doors",
    filter: {colorSet: ['Желтый']},
  },
])


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
      <h3 class=" last:text-black  last:underline last:underline-offset-4 border-black whitespace-nowrap"
          v-for="doorSet in doorSets" :key="doorSet.name" @click="chooseDoorSet(doorSet.filter)">{{ doorSet.name }}</h3>
    </div>
  </div>
</template>

<style scoped>

</style>