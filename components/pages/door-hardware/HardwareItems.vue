<script setup lang="js">
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import { storeToRefs } from 'pinia'
import Pagination from '~/components/base/pagination/Pagination.vue'
import HardwareCard from '~/components/pages/door-hardware/HardwareCard.vue'
import SortingHardware from '~/components/pages/door-hardware/SortingHardware.vue'
import { useHardwareFiltersStore } from '~/stores/hardwareFiltersStore'

definePageMeta({
  pageTransition: {
    name: 'rotate',
    delay: 1000,
  },
})
const hardwareFiltersStore = useHardwareFiltersStore()
const { total, pagesCount, products } = storeToRefs(hardwareFiltersStore)
const hardwareItemsBlock = ref(null)
const [parent] = useAutoAnimate()
function scrollToHardwareItemsBlock() {
  parent.value.scrollIntoView({ behavior: 'smooth' })
}

// const page = ref(1)
function onChangePage(page) {
  hardwareFiltersStore.page = page
  hardwareFiltersStore.onChangeFilters({ page: hardwareFiltersStore.page })
  scrollToHardwareItemsBlock()
  scrollTo(0, 500)
  // parent.animate()
}
</script>

<template>
  <div class="w-full pl-16">
    <div ref="hardwareItemsBlock" class="hidden text-primaryDark md:flex justify-between w-full">
      <!--        <p>{{props.products}}</p> -->
      <SortingHardware />
      <h6 class="font-regular">
        Всего ручек: {{ total }}
      </h6>
    </div>
    <div ref="parent" class="mt-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-7 grid">
      <div v-for="hardwareVariant in products" :key="hardwareVariant.id">
        <HardwareCard
          v-if="hardwareVariant && hardwareVariant.image" class="relative  -z-10 hover:border-b border-black"
          :hardware-variant="hardwareVariant"
        />
      </div>
    </div>
    <div class="w-full flex justify-center">
      <Pagination
        v-model:current-page="hardwareFiltersStore.page" class="pb-32"
        :total="total"
        :page_size="hardwareFiltersStore.page_size"
        :pages-count="pagesCount"
        @page-change="onChangePage"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
