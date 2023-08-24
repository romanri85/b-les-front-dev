<script setup lang="ts">

import { ref, reactive } from 'vue';
import searchByParameters from '~/data/searchByParameters.json'
import PrimaryButtonSmall from "~/components/buttons/PrimaryButtonSmall.vue";
import { useFiltersStore } from "~/stores/filtersStore";
import { storeToRefs } from "pinia";

const filtersStore = useFiltersStore()
const { activeFilters, filterCount, materialColors,isDoorSetApplied } = storeToRefs(filtersStore)

const doorSets = reactive(searchByParameters)
const activeDoorSetIndex = ref(0)
import { useRoute } from "vue-router";
const route = useRoute()


onMounted(() => {
  const filtersId = route.query.filters;

  if (filtersId) {
    // Use the find method to get the doorSet by its id
    const doorSet = doorSets.find(doorset => doorset.id === filtersId);

    // Check if doorSet was found, then execute the function
    if (doorSet) {
      chooseDoorSet(doorSet);
      checkToUnderline(doorSet)
    } else {
      console.warn(`No doorSet found with id ${filtersId}`);
    }
  }
});
function chooseDoorSet(doorSet) {
  // Reset activeFilters to its initial state
  if(filtersStore.isDoorSetApplied){
    filtersStore.isDoorSetApplied = false
    filtersStore.onResetFilters()
    return
  }
  filtersStore.onResetFilters()

  const filterKeys = Object.keys(doorSet.filter);

  filterKeys.forEach(filterType => {
    const currentValue = doorSet.filter[filterType];

    if (!activeFilters.value.hasOwnProperty(filterType)) {
      console.warn("Invalid filter type provided: ", filterType);
      return;
    }

    if (Array.isArray(currentValue)) {  // Handle Array values
      currentValue.forEach(value => {
        const index = activeFilters.value[filterType].indexOf(value);

        if (index !== -1) {
          activeFilters.value[filterType].splice(index, 1);  // Remove the value
        } else {
          activeFilters.value[filterType].push(value);  // Add the value
        }
      });
    } else {  // Handle String values
      activeFilters.value[filterType] = activeFilters.value[filterType] === currentValue ? initialFilters[filterType] : currentValue;
    }
    filtersStore.onChangeFilters(activeFilters.value);
    filtersStore.isDoorSetApplied = true

  });
}

const initialFilters = {
  design: [],
  color_set: [],
  color: [],
  collection: [],
  material: [],
  glass: '',
  ordering: ''
};
function checkToUnderline(doorSet) {
  for (const filterKey in doorSet.filter) {
    const filterValue = activeFilters.value[filterKey];

    if (Array.isArray(doorSet.filter[filterKey])) {
      if (!filterValue || !doorSet.filter[filterKey].every(val => filterValue.includes(val))) {
        return false;
      }
    } else {
      if (filterValue !== doorSet.filter[filterKey]) {
        return false;
      }
    }
  }

  // Checking that activeFilters matches the initial state or the values from doorSet
  for (const filterKey in initialFilters) {
    if (Array.isArray(initialFilters[filterKey])) {
      if (!activeFilters.value[filterKey].every(val => initialFilters[filterKey].includes(val) || (doorSet.filter[filterKey] && doorSet.filter[filterKey].includes(val)))) {
        return false;
      }
    } else {
      if (activeFilters.value[filterKey] !== initialFilters[filterKey] && activeFilters.value[filterKey] !== doorSet.filter[filterKey]) {
        return false;
      }
    }
  }

  return true;
}



function onScroll() {
  console.log('scroll');
}


const showAll = ref(false);
const toggleDoorSetsVisibility = () => {
  showAll.value = !showAll.value;
};
const plusIcon = `
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
  <path d="M10.5 4.75a.5.5 0 00-1 0v4.5h-4.5a.5.5 0 000 1h4.5v4.5a.5.5 0 001 0v-4.5h4.5a.5.5 0 000-1h-4.5v-4.5z" />
</svg>
`;

const minusIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
  <path fill-rule="evenodd" d="M4 9.5a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H4.5A.5.5 0 014 9.5z" clip-rule="evenodd" />
</svg>


`;
</script>

<template>
  <div class="main-container lg:py-24 md:py-16 py-14">
    <div class="inline-flex items-start">
      <div class="pr-16 whitespace-nowrap" @click="filtersStore.onResetFilters()">
        <h3 class=""><buttons-primary-button-small>все двери</buttons-primary-button-small></h3>
      </div>

      <div class="flex justify-start items-start gap-x-3 gap-y-3 text-darkGrey flex-wrap doorsets-container" :class="{ 'show-all': showAll }">
        <p v-for="doorSet in doorSets" :key="doorSet.name"
           class="underline-direction border-black cursor-pointer whitespace-nowrap text-primaryDark text-16-mono"
           :class="{'underline-static': checkToUnderline(doorSet)}"
           @click="chooseDoorSet(doorSet)">#{{ doorSet.name }}</p>
        <div class="h-[30px]"></div>
      </div>
    </div>
    <primary-button-small class="mt-4 lg:mt-0" @click="toggleDoorSetsVisibility">
      <h4>
        {{ showAll ? 'Свернуть' : 'Показать все' }}&nbsp;
        <span  v-if="showAll" class="inline-block relative top-1" v-html="minusIcon" />
        <span v-else class="inline-block relative top-1" v-html="plusIcon" />
      </h4>
    </primary-button-small>
  </div>
</template>

<style scoped>
.doorsets-container {
  height: 65px;  /* Assuming each row is 55px. Adjust this accordingly. */
  overflow: hidden;
  transition: height .3s ease; /* Add this line */
}

.doorsets-container.show-all {
  height: 100px; /* Remove max-height restriction */
  //overflow: visible;
}

</style>




