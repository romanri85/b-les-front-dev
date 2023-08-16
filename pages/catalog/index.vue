<script setup lang="ts">

import DoorSets from "~/components/pages/door-catalog/DoorSets.vue";
import DoorItems from "~/components/pages/door-catalog/DoorItems.vue";
import DoorFilters from "~/components/pages/door-catalog/DoorFilters.vue";
import {baseURL} from "~/config.js";
import Hero from "~/components/base/hero.vue";
import {useFiltersStore} from "~/stores/filtersStore";
import {storeToRefs} from "pinia";
import DoorFiltersMobile from "~/components/pages/door-catalog/DoorFiltersMobile.vue";
import {useViewportSize} from "~/composables/useViewportSize";

const viewport = useViewportSize()
const filtersStore = useFiltersStore()
const {activeFilters, filterCount, materialColors} = storeToRefs(filtersStore)


const heroName = "catalog"
const heroDescription = "catalogPageDescription"
const heroImage = "/catalog/catalog-hero.jpg"

let products = ref([])
let page = ref(1)
const total = ref(0)
let pagesCount = ref(0)
const page_size = 12
// const filterCount = ref({})

const route = useRoute()
// filtersStore.fetchMaterialColors()




onMounted(() => {
  if (route.query.collection) {
    // If it exists, add it to the onChangeFilters
    filtersStore.activeFilters = ({...filtersStore.activeFilters, 'collection':[ parseInt(route.query.collection)] });
  }
if(!filtersStore.activeFilters.collection.color_set){
  filtersStore.activeFilters.color_set = []
}
if(!filtersStore.activeFilters.material){
  filtersStore.activeFilters.material = []
}
  filtersStore.onChangeFilters({...activeFilters.value, page: 1})
});
watch(() => route.query.collection, (newValue) => {
  if (newValue) {
    filtersStore.activeFilters = ({...filtersStore.activeFilters, 'collection': [parseInt(newValue) ]});
    filtersStore.onChangeFilters(filtersStore.activeFilters);
  }
  else {
    filtersStore.activeFilters= ({
      ordering: "",
      // min_price: Number,
      // max_price: Number,
      design: [],
      color_set: [],
      color: [],
      collection: [],
      material: [],
      glass: "",
      page: 1,
      // colorSet: [], colors: [], designs: [], collections: []
    });
    filtersStore.onChangeFilters(filtersStore.activeFilters)
  }
}, { immediate: true });
onUnmounted(() => {
  filtersStore.activeFilters= ({
    ordering: "",
    // min_price: Number,
    // max_price: Number,
    design: [],
    color_set: [],
    color: [],
    collection: [],
    material: [],
    glass: "",
    page: 1,
    // colorSet: [], colors: [], designs: [], collections: []
  });
})
</script>

<template>
  <hero :heroName="heroName" :hero-description="heroDescription" :heroImage="heroImage"/>


  <!--  <door-sets :activeFilters="activeFilters" @changeFilters="onChangeFilters"/>-->
  <div class="flex main-container md:flex-row flex-col mt-12 md:mt-24">
    <client-only>
    <door-filters v-if="viewport.isDesktop || viewport.isTablet"/>
    <door-filters-mobile v-else-if="viewport.isMobile"/>
    </client-only>
    <door-items/>
  </div>
</template>

<style scoped>

</style>