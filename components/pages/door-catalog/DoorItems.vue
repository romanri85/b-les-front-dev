<script setup lang="js">
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import DoorCard from '~/components/pages/door-catalog/DoorCard.vue'
import Sorting from '~/components/filters/Sorting.vue'
import { useFiltersStore } from '~/stores/filtersStore'
import { useViewportSize } from '~/composables/useViewportSize'

const filtersStore = useFiltersStore()

// filtersStore.fetchProducts()
const viewport = useViewportSize()

// const parent= ref(null)
// if (viewport.isDesktop || viewport.isTablet) {
//
//   // parent.value.animate()
// }
const [parent] = useAutoAnimate()
const start = ref(null)

function scrollToDoorsBlock() {
  start.value.scrollIntoView({ behavior: 'smooth' })
}

// const page = ref(1)

function onChangePage(page) {
  filtersStore.page = page
    scrollToDoorsBlock()
  filtersStore.onChangeFilters({ page: filtersStore.page })
}
</script>

<template>
  <div ref="start"  class="md:pl-5 lg:pl-16">
    <div class="text-primaryDark flex md:justify-between">
      <Sorting />
      <div class="hidden md:block">
        <p class=" mt-14  md:mt-0 font-regular">
          Всего дверей: {{ filtersStore.total }}
        </p>
      </div>
    </div>
    <div  class="lg:min-h-[3495px]">
    <div
      v-if="viewport.isDesktop || viewport.isTablet"

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
        v-model:current-page="filtersStore.page" class=""
        :total="filtersStore.total"
        :page_size="filtersStore.page_size"
        :pages-count="filtersStore.pagesCount"
        @page-change="onChangePage"
      />
    </div>
    </div>
  </div>
</template>

<style scoped>

</style>
