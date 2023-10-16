<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import searchByParameters from '~/data/searchByParameters.json'
import PrimaryButtonSmall from '~/components/buttons/PrimaryButtonSmall.vue'
import { useFiltersStore } from '~/stores/filtersStore'

const key = ref(0)

const filtersStore = useFiltersStore()
const { activeFilters, isDoorSetApplied } = storeToRefs(filtersStore)

const doorSets = reactive(searchByParameters)
const activeDoorSetIndex = ref(null)

const initialFilters = {
  design: [],
  color_set: [],
  color: [],
  collection: [],
  material: [],
  glass: '',
  ordering: '',
}

onMounted(() => {
  const router = useRouter()
  const filtersId = router.currentRoute.value.query.filters

  if (filtersId) {
    // Use the find method to get the doorSet by its id
    const doorSet = doorSets.find(doorset => doorset.id === filtersId)

    // Check if doorSet was found, then execute the function
    if (doorSet) {
      chooseDoorSet(doorSet)
      checkToUnderline(doorSet)

      router.replace({ path: '/catalog' }).then(() => {
      }).catch((err) => {
        throw new Error(err)
      })
    }
    else {
      throw new Error('Invalid doorSet id provided')
    }
  }
})

function changeDoorset(doorSet) {
  const filterKeys = Object.keys(doorSet.filter)

  filterKeys.forEach((filterType) => {
    const currentValue = doorSet.filter[filterType]

    if (!activeFilters.value.hasOwnProperty(filterType))
      throw new Error(`Invalid filter type provided: ${filterType}`)

    if (Array.isArray(currentValue)) { // Handle Array values
      currentValue.forEach((value) => {
        const index = activeFilters.value[filterType].indexOf(value)

        if (index !== -1)
          activeFilters.value[filterType].splice(index, 1) // Remove the value
        else
          activeFilters.value[filterType].push(value) // Add the value
      })
    }
    else { // Handle String values
      activeFilters.value[filterType] = activeFilters.value[filterType] === currentValue ? initialFilters[filterType] : currentValue
    }
  })

  // Call this only once after the loop
  filtersStore.onChangeFilters(activeFilters.value)
  filtersStore.isDoorSetApplied = true
  activeDoorSetIndex.value = doorSets.indexOf(doorSet)
}

function chooseDoorSet(doorSet) {
  key.value++
  // Reset activeFilters to its initial state
  if (filtersStore.isDoorSetApplied) {
    if (activeDoorSetIndex.value === doorSets.indexOf(doorSet)) {
      filtersStore.onResetFilters()

      return
    }
    else {
      filtersStore.isDoorSetApplied = false

      isDoorSetApplied.value = false
      activeFilters.value = {
        design: [],
        color_set: [],
        color: [],
        collection: [],
        material: [],
        glass: '',
        ordering: '',
      }
      changeDoorset(doorSet)
      return
    }
  }
  isDoorSetApplied.value = false
  activeFilters.value = {
    design: [],
    color_set: [],
    color: [],
    collection: [],
    material: [],
    glass: '',
    ordering: '',
  }
  changeDoorset(doorSet)
}

function checkToUnderline(doorSet) {
  if (!filtersStore.isDoorSetApplied)
    return false

  for (const filterKey in doorSet.filter) {
    const filterValue = activeFilters.value[filterKey]

    if (Array.isArray(doorSet.filter[filterKey])) {
      if (!filterValue || !doorSet.filter[filterKey].every(val => filterValue.includes(val)))
        return false
    }
    else {
      if (filterValue !== doorSet.filter[filterKey])
        return false
    }
  }

  // Checking that activeFilters matches the initial state or the values from doorSet
  for (const filterKey in initialFilters) {
    if (Array.isArray(initialFilters[filterKey])) {
      if (!activeFilters.value[filterKey].every(val => initialFilters[filterKey].includes(val) || (doorSet.filter[filterKey] && doorSet.filter[filterKey].includes(val))))
        return false
    }
    else {
      if (activeFilters.value[filterKey] !== initialFilters[filterKey] && activeFilters.value[filterKey] !== doorSet.filter[filterKey])
        return false
    }
  }
  return true
}

const showAll = ref(false)
function toggleDoorSetsVisibility() {
  showAll.value = !showAll.value
}
const plusIcon = `
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
  <path d="M10.5 4.75a.5.5 0 00-1 0v4.5h-4.5a.5.5 0 000 1h4.5v4.5a.5.5 0 001 0v-4.5h4.5a.5.5 0 000-1h-4.5v-4.5z" />
</svg>
`

const minusIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
  <path fill-rule="evenodd" d="M4 9.5a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H4.5A.5.5 0 014 9.5z" clip-rule="evenodd" />
</svg>


`
</script>

<template>
  <div class=" lg:pb-24 lg:pt-12 md:py-16 py-14">
    <div class="md:inline-flex flex md:flex-row flex-col-reverse items-start">
      <div class="hidden md:block pr-16 whitespace-nowrap" @click="filtersStore.onResetFilters()">
        <h3 class="cursor-pointer underline-static">
          Все двери
        </h3>
      </div>

      <div
        :key="key" class="flex justify-start items-start gap-x-3 gap-y-3 text-darkGrey flex-wrap doorsets-container"
        :class="{ 'show-all': showAll }"
      >
        <p
          v-for="doorSet in doorSets" :key="doorSet.name"

          class="border-black cursor-pointer whitespace-nowrap text-primaryDark text-16-mono"
          :class="{ 'underline-static': checkToUnderline(doorSet) }"
          @click="chooseDoorSet(doorSet)"
        >
          #{{ doorSet.name }}
        </p>
        <div class="h-[30px]" />
      </div>
    </div>
    <PrimaryButtonSmall class="mt-4 lg:mt-0" @click="toggleDoorSetsVisibility">
      <h4>
        {{ showAll ? 'Свернуть' : 'Показать все' }}&nbsp;
        <span v-if="showAll" class="inline-block relative top-1" v-html="minusIcon" />
        <span v-else class="inline-block relative top-1" v-html="plusIcon" />
      </h4>
    </PrimaryButtonSmall>
    <div class="block md:hidden pr-16 pt-8 whitespace-nowrap" @click="filtersStore.onResetFilters()">
      <h3 class="">
        <buttons-primary-button-big>Все двери</buttons-primary-button-big>
      </h3>
    </div>
  </div>
</template>

<style scoped>
.doorsets-container {
  height: 65px; /* Assuming each row is 55px. Adjust this accordingly. */
  overflow: hidden;
  transition: height .3s ease; /* Add this line */
}

.doorsets-container.show-all {
  @media screen and (min-width: 1440px) {
    height: 100px; /* Set height to 100px */
  }

  @media screen and (max-width: 1439px) and (min-width: 1025px) {
    height: 150px; /* Set height to 200px */
  }

  @media screen and (max-width: 1024px) and (min-width: 768px) {
    height: 200px; /* Set height to 200px */
  }

  @media screen and (max-width: 767px) and (min-width: 480px) {
    height: 250px; /* Set height to 200px */
  }

  @media screen and (max-width: 479px) {
    height: 320px; /* Set height to 200px */
  }

}
</style>
