<script setup lang="js">

import BaseHero from "~/components/base/BaseHero.vue";
import HardwareFilters from "~/components/pages/door-hardware/HardwareFilters.vue";
import HardwareItems from "~/components/pages/door-hardware/HardwareItems.vue";
import {useHardwareFiltersStore} from "~/stores/hardwareFiltersStore";
import {storeToRefs} from "pinia";
import {useViewportSize} from "~/composables/useViewportSize";
import HardwareFiltersMobile from "~/components/pages/door-hardware/HardwareFiltersMobile.vue";
import {useElementVisibility, useResizeObserver} from '@vueuse/core'

definePageMeta({layout: "catalog"});

const footerElement = ref(null)
const viewport = useViewportSize()
const hardwareFiltersStore = useHardwareFiltersStore()
const {activeFilters, filterCount} = storeToRefs(hardwareFiltersStore)
const footerIsVisible = useElementVisibility(footerElement)


const heroName = "doorHardware"
const heroDescription = "doorHardwarePageDescription"
const heroImage = "/door-hardware/door-hardware.webp"

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
    if (footerIsVisible.value) {
      // Scroll 50px up
      window.scrollBy(0, -5);

      // Then scroll 50px down after a delay (e.g., 300 milliseconds)
      setTimeout(() => {
        window.scrollBy(0, 5);
      }, 300);
    }

  }
});

onMounted(async () => {


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
      <hardware-items class="md:w-[calc(100%-210px)] lg:w-[calc(100%-320px)]"/>

    </div>
    <Footer ref="footerElement"/>
  </div>
</template>

<style scoped>

</style>