<script setup lang="js">
import DoorCard from "~/components/pages/door-catalog/DoorCard.vue";
import Pagination from "~/components/base/Pagination.vue";
import Sorting from "~/components/filters/Sorting.vue";
import {ref} from 'vue'
import {useAutoAnimate} from '@formkit/auto-animate/vue'
import {useFiltersStore} from "~/stores/filtersStore.js";
import {storeToRefs} from "pinia";

const filtersStore = useFiltersStore()

const {total, pagesCount, products, page_size,page} = storeToRefs(filtersStore)
filtersStore.fetchProducts()


const [parent] = useAutoAnimate()

const props = defineProps({
  total: Number,
  pagesCount: Number,
  products: Array,
  page_size: Number
})




// const page = ref(1)

function onChangePage(page) {
  filtersStore.onChangeFilters({page: page})
  // parent.animate()
}





</script>

<template>
  <div class="w-full pl-16">
    <div class="text-primaryDark flex justify-between w-full">
      <!--        <p>{{props.products}}</p>-->
      <sorting/>
      <h6>Всего дверей: {{ filtersStore.total }}</h6>
    </div>
    <div class="mt-16 grid-cols-4 grid-rows-7 grid" ref="parent">

      <div v-for="doorVariant in filtersStore.products" :key="doorVariant.id">
        <NuxtLink
            :to="`/catalog/${doorVariant.product_variant.product_id}?material=${doorVariant.product_variant.material.id}&color=${doorVariant.color.id}`">
          <door-card class="relative -z-10 hover:border-b border-black"
                     :doorVariant="doorVariant"
          />
        </NuxtLink>
      </div>
    </div>
    <div class="w-full flex justify-center">
      <pagination class="pb-32" :total="filtersStore.total"
                  :page_size="filtersStore.page_size"
                  :pagesCount="filtersStore.pagesCount"
                  @page-change="onChangePage"
                  v-model:current-page="filtersStore.page"
      />
    </div>
  </div>

</template>

<style scoped>

</style>
