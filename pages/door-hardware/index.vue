<script setup lang="js">
import { useResizeObserver } from '@vueuse/core'
import BaseHero from '~/components/base/BaseHero.vue'
import HardwareItems from '~/components/pages/door-hardware/HardwareItems.vue'
import { useHardwareFiltersStore } from '~/stores/hardwareFiltersStore'
import { useViewportSize } from '~/composables/useViewportSize'
import HardwareFilters from '~/components/pages/door-hardware/HardwareFilters.vue'
import HardwareFiltersMobile from '~/components/pages/door-hardware/HardwareFiltersMobile.vue'


const viewport = useViewportSize()
const hardwareFiltersStore = useHardwareFiltersStore()

const heroName = 'doorHardware'
const heroDescription = ''
const heroImage = '/door-hardware/door-hardware.webp'

const catalogElement = ref(null)
const catalogElementHeight = ref(null)
const hardwareFilters = ref(null)
const hardwareFiltersHeight = ref(null)

useResizeObserver(catalogElement, (entries) => {
  const entry = entries[0]
  const { height } = entry.contentRect
  catalogElementHeight.value = height
})

useResizeObserver(hardwareFilters, (entries) => {
  const entry = entries[0]
  const { height } = entry.contentRect
  hardwareFiltersHeight.value = height
})

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
      })
    }
  },

  500,
)

watch([() => catalogElementHeight.value, () => hardwareFiltersHeight.value], () => {
  if (sidebar.value && (viewport.isDesktop || viewport.isTablet)) {
    sidebar.value.updateSticky()
  }
})
await hardwareFiltersStore.onChangeFilters({ page: 1 })


</script>

<template>
  <Head>
    <title>Брянский лес - Фурнитура</title>
  </Head>
  <div ref="catalogElement">
    <BaseHeroWithoutDescription :heroName="heroName" class="mb-32" :hero-image="heroImage" />
    <div class="main-content flex main-container md:flex-row flex-col">
      <div v-if="viewport.isDesktop || viewport.isTablet" class="md:w-[210px] lg:w-[320px] sidebar">
        <div class="sidebar__inner">
          <HardwareFilters ref="hardwareFilters" class="pb-32" />
        </div>
      </div>
      <HardwareFiltersMobile v-else-if="viewport.isMobile" />
      <HardwareItems class="md:w-[calc(100%-210px)] lg:w-[calc(100%-320px)]" />
    </div>
  </div>
</template>

<style scoped>

</style>
