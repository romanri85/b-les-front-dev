<script setup lang="js">
import DoorItems from "~/components/pages/door-catalog/DoorItems.vue";
import Hero from "~/components/base/hero.vue";
import {useFiltersStore} from "~/stores/filtersStore";
import {storeToRefs} from "pinia";
import {useViewportSize} from "~/composables/useViewportSize";
import DoorSets from "~/components/pages/door-catalog/DoorSets.vue";
import DoorFiltersMobile from "~/components/pages/door-catalog/DoorFiltersMobile.vue";
import {useResizeObserver} from '@vueuse/core'
import DoorFilters from "~/components/pages/door-catalog/DoorFilters.vue";
import {useIsBurgerOpenStore} from "~/stores/isBurgerOpenStore.js";

// definePageMeta({layout: "catalog"})


const viewport = useViewportSize()
const filtersStore = useFiltersStore()
const {activeFilters, filterCount, materialColors} = storeToRefs(filtersStore)
const isBurgerOpenStore = useIsBurgerOpenStore()

const heroName = "catalog"
const heroDescription = "catalogPageDescription"
const heroImage = "/catalog/catalog-hero.jpg"

const catalogElement = ref(null)
const catalogElementHeight = ref(null)
const doorFilters = ref(null)
const doorFiltersHeight = ref(null)


useResizeObserver(catalogElement, (entries) => {
  const entry = entries[0];
  const {height} = entry.contentRect;
  catalogElementHeight.value = height;
});

useResizeObserver(doorFilters, (entries) => {
  const entry = entries[0];
  const {height} = entry.contentRect;
  doorFiltersHeight.value = height;
});

let products = ref([])
let page = ref(1)
const total = ref(0)
let pagesCount = ref(0)
const page_size = 24
// const filterCount = ref({})

const route = useRoute()
// filtersStore.fetchMaterialColors()

await filtersStore.onChangeFilters({...activeFilters.value, page: 1})

const sidebar = ref(null)

setTimeout(
    () => {
      sidebar.value = new StickySidebar('.sidebar', {
        containerSelector: '.main-content',
        innerWrapperSelector: '.sidebar__inner',
        topSpacing: 50,
        bottomSpacing: 50,
        resizeSensor: true,
      });
    }, 500
)
onMounted(async () => {

  if (route.query.collection) {
    // If it exists, add it to the onChangeFilters
    filtersStore.activeFilters = ({...filtersStore.activeFilters, 'collection': [parseInt(route.query.collection)]});
  }

  // if (!filtersStore.activeFilters.collection.color_set) {
  //   filtersStore.activeFilters.color_set = []
  // }
  // if (!filtersStore.activeFilters.material) {
  //   filtersStore.activeFilters.material = []
  // }

});

watch([() => catalogElementHeight.value, () => doorFiltersHeight.value], () => {
  if (sidebar.value) {
    sidebar.value.updateSticky();

  }
});


watch(() => route.query.collection, (newValue) => {
  if (newValue) {
    filtersStore.activeFilters = ({...filtersStore.activeFilters, 'collection': [parseInt(newValue)]});
    filtersStore.onChangeFilters(filtersStore.activeFilters);
  } else {
    filtersStore.activeFilters = ({
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
}, {immediate: true});

onUnmounted(() => {
  filtersStore.activeFilters = ({
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
  <client-only>Ω
    <div ref="catalogElement">
      <hero :heroName="heroName" :heroDescription="heroDescription" :heroImage="heroImage"/>
      <door-sets/>
      <div class="main-content flex main-container md:flex-row flex-col md:mt-0 ">
        <div v-if="viewport.isDesktop || viewport.isTablet" class="md:w-[320px] sidebar">
          <div  class="sidebar__inner">
            <door-filters ref="doorFilters"  class="pb-32"/>
          </div>
        </div>
        <door-filters-mobile v-else-if="viewport.isMobile"/>
        <door-items class="md:w-[calc(100%-320px)] lg:min-h-[3540px] "/>
      </div>
    </div>
  </client-only>
</template>

<style scoped>
.sidebar {
  will-change: min-height;
}

.sidebar__inner {
  transform: translate(0, 0); /* For browsers don't support translate3d. */
  transform: translate3d(0, 0, 0);
  will-change: position, transform;
}
</style>