<script setup lang="ts">
import DoorCard from "~/components/pages/door-catalog/DoorCard.vue";
import Pagination from "~/components/base/Pagination.vue";
import {baseURL} from "~/config";
import Sorting from "~/components/filters/Sorting.vue";
import HardwareCard from "~/components/pages/doorHardware/HardwareCard.vue";
import SortingHardware from "~/components/pages/doorHardware/SortingHardware.vue";
import { ref } from 'vue'
import { useAutoAnimate } from '@formkit/auto-animate/vue'

const props = defineProps({
  total: Number,
  pagesCount: Number,
  products: Array,
  page_size: Number
})

const emit = defineEmits(
  ['changeFilters']
)


const page = ref(1)
function onChangePage(page) {
emit("changeFilters", {page})
}

function changeSorting(sorting) {
  emit("changeFilters", sorting)
}

const [parent] = useAutoAnimate()
</script>

<template>
  <div class="w-full pl-16">
      <div class="text-primaryDark flex justify-between w-full">
<!--        <p>{{props.products}}</p>-->
       <sorting-hardware @change-sorting="changeSorting"/>
        <h6>Всего ручек: {{props.total}}</h6>
      </div>
      <div class="mt-16 grid-cols-4 grid-rows-7 grid" ref="parent">

        <div v-for="hardwareVariant in props.products" :key="hardwareVariant.id">
<!--          <NuxtLink :to="`/catalog/${doorVariant.product_variant.product.id}?material=${doorVariant.product_variant.material.id}&color=${doorVariant.color.id}`">-->
          <hardware-card class="relative -z-10 hover:border-b border-black"
                     :hardwareVariant="hardwareVariant"
          />
<!--          </NuxtLink>-->
        </div>
    </div>
    <div class="w-full flex justify-center">
        <pagination class="pb-32" :total="props.total"
                    :page_size="props.page_size"
                    :pagesCount="props.pagesCount"
                    @page-change="onChangePage"
                    v-model:current-page="page"
        />
    </div>
  </div>

</template>

<style scoped>

</style>
