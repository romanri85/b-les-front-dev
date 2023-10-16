<script setup lang="js">
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import { storeToRefs } from 'pinia'
import DoorCard from '~/components/pages/door-catalog/DoorCard.vue'
import Sorting from '~/components/filters/Sorting.vue'
import { useFiltersStore } from '~/stores/filtersStore'
import { useViewportSize } from '~/composables/useViewportSize'

const filtersStore = useFiltersStore()

const { total, pagesCount, products, page_size, page } = storeToRefs(filtersStore)
// filtersStore.fetchProducts()
const viewport = useViewportSize()

// const parent= ref(null)
// if (viewport.isDesktop || viewport.isTablet) {
//
//   // parent.value.animate()
// }
const [parent] = useAutoAnimate()

function scrollToDoorsBlock() {
  parent.value.scrollIntoView({ behavior: 'smooth' })
}

// const page = ref(1)

function onChangePage(page) {
  filtersStore.page = page

  if (viewport.isDesktop || viewport.isTablet)
    scrollToDoorsBlock()
  else
    window.scrollTo(0, 380)

  filtersStore.onChangeFilters({ page: filtersStore.page })

  // if(viewport.isMobile && filtersStore.activeFilters.page > 1){
  //   window.scrollTo(0, 250)
  // }
  // else if(viewport.isTablet){
  //   window.scrollTo(0, 300)
  // }
  // else{
  //   window.scrollTo(0, 500)
  // }
  // parent.animate()
}
</script>

<template>
  <div class="md:pl-5 lg:pl-16">
    <div class="text-primaryDark flex justify-center md:justify-between">
      <Sorting />
      <div class="hidden md:block">
        <p class=" mt-14  md:mt-0 font-regular">
          Всего дверей: {{ filtersStore.total }}
        </p>
      </div>
    </div>
    <div
      v-if="viewport.isDesktop || viewport.isTablet"
      class="lg:min-h-[3285px]"
    >
      <div ref="parent" class=" mt-4 md:mt-16 md:gap-y-8 lg:gap-y-8 lg:grid-cols-4 mdLg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-rows-7 grid">
        <div v-for="doorVariant in filtersStore.products" :key="doorVariant.id" class="">
          <NuxtLink
            v-if="doorVariant && doorVariant.merged_image"
            :to="`/catalog/${doorVariant.product_variant.product_id}?material=${doorVariant.product_variant.material.id}&color=${doorVariant.color.id}`"
          >
            <DoorCard
              class="relative transition-all duration-300 pb-6 mb-6"
              :door-variant="doorVariant"
            />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-else class="mt-4 md:mt-16  md:gap-y-8 lg:grid-cols-4 mdLg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-rows-7 grid">
      <div v-for="doorVariant in filtersStore.products" :key="doorVariant.id">
        <NuxtLink
          v-if="doorVariant && doorVariant.merged_image"
          :to="`/catalog/${doorVariant.product_variant.product_id}?material=${doorVariant.product_variant.material.id}&color=${doorVariant.color.id}`"
        >
          <DoorCard
            class="relative  transition-all duration-300 pb-6 mb-6"
            :door-variant="doorVariant"
          />
        </NuxtLink>
      </div>
    </div>
    <div class="w-full flex justify-center">
      <base-pagination
        v-model:current-page="filtersStore.page" class="pb-32"
        :total="filtersStore.total"
        :page_size="filtersStore.page_size"
        :pages-count="filtersStore.pagesCount"
        @page-change="onChangePage"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
