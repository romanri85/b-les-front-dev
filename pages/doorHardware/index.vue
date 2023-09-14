<script setup lang="js">

import BaseHero from "~/components/base/BaseHero.vue";
import HardwareFilters from "~/components/pages/doorHardware/HardwareFilters.vue";
import HardwareItems from "~/components/pages/doorHardware/HardwareItems.vue";
import {useHardwareFiltersStore} from "~/stores/hardwareFiltersStore";
import {storeToRefs} from "pinia";
import {useViewportSize} from "~/composables/useViewportSize";
import {useResizeObserver} from '@vueuse/core'
import HardwareFiltersMobile from "~/components/pages/doorHardware/HardwareFiltersMobile.vue";

const viewport = useViewportSize()
const hardwareFiltersStore = useHardwareFiltersStore()
const {activeFilters, filterCount} = storeToRefs(hardwareFiltersStore)


const heroName = "doorHardware"
const heroDescription = "doorHardwarePageDescription"
const heroImage = "/doorHardware/doorHardware.jpg"

let products = ref([])
let page = ref(1)
const total = ref(0)
let pagesCount = ref(0)
const page_size = 20

const route = useRoute()

const catalogElement = ref(null)
const catalogElementHeight = ref(null)
const hardwareFilters = ref(null)
const hardwareFiltersHeight = ref(null)

useResizeObserver(catalogElement, (entries) => {
  const entry = entries[0];
  const {height} = entry.contentRect;
  catalogElementHeight.value = height;
});

useResizeObserver(hardwareFilters, (entries) => {
  const entry = entries[0];
  const {height} = entry.contentRect;
  hardwareFiltersHeight.value = height;
});

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

watch([() => catalogElementHeight.value, () => hardwareFiltersHeight.value], () => {
  if (sidebar.value) {
    sidebar.value.updateSticky();

  }
});

onMounted(async () => {
  // if(route.query.material){
  //   activeFilters.value.material = route.query.material
  //   const query = "&" + new URLSearchParams(activeFilters.value).toString();
  //   hardwareFiltersStore.onChangeFilters({page: 1})
  //   return
  // }

  // if (!activeFilters.value.color_collection) {
  //   activeFilters.value.color_collection = []
  // }

  await hardwareFiltersStore.onChangeFilters({page: 1});

})


</script>

<template>
  <div ref="catalogElement">
    <BaseHero :heroName="heroName" class="mb-32" :hero-description="heroDescription" :heroImage="heroImage"/>
    <div class="main-content flex main-container md:flex-row flex-col">
      <div v-if="viewport.isDesktop || viewport.isTablet" class="md:w-[210px] lg:w-[320px] sidebar">
        <div class="sidebar__inner">
          <hardware-filters ref="hardwareFilters" class="pb-32"/>
        </div>
      </div>
      <hardware-filters-mobile v-else-if="viewport.isMobile"/>
      <hardware-items class="md:w-[calc(100%-210px)] lg:w-[calc(100%-320px)] min-h-[2440px]"/>

    </div>
  </div>
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