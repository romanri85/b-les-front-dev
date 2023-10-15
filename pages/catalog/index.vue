<script setup lang="js">
import DoorItems from "~/components/pages/door-catalog/DoorItems.vue";
import {useFiltersStore} from "~/stores/filtersStore";
import {storeToRefs} from "pinia";
import {useViewportSize} from "~/composables/useViewportSize";
import DoorSets from "~/components/pages/door-catalog/DoorSets.vue";
import DoorFiltersMobile from "~/components/pages/door-catalog/DoorFiltersMobile.vue";
import {useResizeObserver} from '@vueuse/core'
import DoorFilters from "~/components/pages/door-catalog/DoorFilters.vue";
import {useRoute} from "vue-router";
import {watch} from "vue";


const footerElement = ref(null)


const viewport = useViewportSize()

const filtersStore = useFiltersStore()
const {activeFilters, filterCount} = storeToRefs(filtersStore)

const heroName = "catalog"
const heroDescription = "catalogPageDescription"
const heroImage = "/catalog/catalog-hero.jpg"

const catalogElement = ref(null)
const catalogElementHeight = ref(null)
const doorFilters = ref(null)
const doorFiltersHeight = ref(null)

definePageMeta({layout: "dark-header"})

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

const route = useRoute()

await filtersStore.onChangeFilters({...activeFilters.value, page: 1})

const sidebar = ref(null)


setTimeout(
    () => {
      if (viewport.isDesktop || viewport.isTablet) {
        sidebar.value = new StickySidebar('.sidebar', {
          containerSelector: '.main-content',
          innerWrapperSelector: '.sidebar__inner',
          topSpacing: 50,
          bottomSpacing: 50,
          resizeSensor: true,
        });
      }

    }, 500)

watch(() => route.query.collection, (newValue) => {
  if (newValue) {
    filtersStore.activeFilters = ({...filtersStore.activeFilters, 'collection': [parseInt(newValue)]});
    filtersStore.onChangeFilters(filtersStore.activeFilters);
  }
}, {immediate: true});

watch([() => catalogElementHeight.value, () => doorFiltersHeight.value], () => {
  if (sidebar.value && (viewport.isDesktop || viewport.isTablet)) {

    sidebar.value.updateSticky();


  }
});


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
  <div ref="catalogElement" class="min-h-[2600px] main-container">

    <!--    <base-hero :heroName="heroName" :heroDescription="heroDescription" :heroImage="heroImage"/>-->
    <div class="mt-10 lg:pr-72">
      <div class=" flex justify-start items-end"><h4>Главная / Каталог</h4></div>
    </div>
    <div class="flex justify-center mt-12">
      <h1>Каталог</h1>
    </div>
    <door-sets/>
    <div class="main-content  flex md:flex-row flex-col md:mt-0  ">
      <div v-if="viewport.isDesktop || viewport.isTablet" class="md:w-[320px] sidebar">
        <div class="sidebar__inner">
          <door-filters ref="doorFilters" class="pb-32"/>
        </div>
      </div>
      <door-filters-mobile v-else/>

      <door-items class="  md:w-[calc(100%-210px)] lg:w-[calc(100%-320px)]  "/>
    </div>
  </div>
</template>

<style scoped>

</style>