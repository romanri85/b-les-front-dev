<script setup lang="js">
import Pagination from "~/components/base/pagination/Pagination.vue";
import HardwareCard from "~/components/pages/door-hardware/HardwareCard.vue";
import SortingHardware from "~/components/pages/door-hardware/SortingHardware.vue";
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import { useHardwareFiltersStore } from "~/stores/hardwareFiltersStore";
import { storeToRefs } from "pinia";

const hardwareFiltersStore = useHardwareFiltersStore()
const {total, pagesCount, products, page_size,page} = storeToRefs(hardwareFiltersStore)
const hardwareItemsBlock = ref(null);
const [parent] = useAutoAnimate()
const scrollToHardwareItemsBlock = () => {
  parent.value.scrollIntoView({ behavior: 'smooth' });
  console.log('scrollToHardwareItemsBlock')
};






// const page = ref(1)
function onChangePage(page) {
  hardwareFiltersStore.page = page
  hardwareFiltersStore.onChangeFilters({page: hardwareFiltersStore.page})
  scrollToHardwareItemsBlock()
  scrollTo(0, 500)
  // parent.animate()
}









</script>

<template>
  <div  class="w-full pl-16">
      <div ref="hardwareItemsBlock"  class="hidden text-primaryDark md:flex justify-between w-full">
<!--        <p>{{props.products}}</p>-->
       <sorting-hardware/>
        <h6 class="font-regular">Всего ручек: {{total}}</h6>
      </div>
      <div class="mt-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-7 grid" ref="parent">

        <div v-for="hardwareVariant in products" :key="hardwareVariant.id">
          <hardware-card  class="relative  -z-10 hover:border-b border-black"
                     :hardwareVariant="hardwareVariant"
          />
        </div>
    </div>
    <div class="w-full flex justify-center">
        <pagination class="pb-32" :total="total"
                    :page_size="hardwareFiltersStore.page_size"
                    :pagesCount="pagesCount"
                    @page-change="onChangePage"
                    v-model:current-page="hardwareFiltersStore.page"
        />
    </div>
  </div>

</template>

<style scoped>

</style>
