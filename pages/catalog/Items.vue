<script setup lang="ts">
import DoorCard from "~/pages/catalog/DoorCard.vue";
import Pagination from "~/pages/Pagination.vue";
import {baseURL} from "~/config";
import Sorting from "~/pages/catalog/components/Sorting.vue";

const props = defineProps({
  value: {
    type: Array,
    // required: true
  }
})

const activeCasing = ref("/CasingOakEnamelBeige/PNG/Дуб брашированный Бежевый - Карниз 120.png")

let products = ref({})
let page = ref(1)
const total = ref(0)
let pagesCount = ref(0)

async function fetchProducts() {
  products.value = await $fetch(`${baseURL}/api/product/product-variants?page=${page.value}`);
  total.value = products.value.count
  pagesCount.value = products.value.page_links.length

}


onMounted(() => {
  fetchProducts()
})

</script>

<template>
  <div class="w-full pl-16">
      <div class="text-primaryDark flex justify-between w-full">
       <sorting/>
        <h6>Всего дверей: {{total}}</h6>
      </div>
      <div class="mt-16 grid-cols-4 grid-rows-7 grid">

        <div v-for="doorVariant in products.results" :key="products.results.id">
          <door-card class="relative -z-10 hover:border-b border-black"
                     :value="activeCasing"
                     :doorVariant="doorVariant"
          />
        </div>
    </div>
    <div class="w-full flex justify-center">
        <pagination :total="pagesCount"
                    @page-change="fetchProducts"
                    v-model:current-page="page"
        />
    </div>
  </div>

</template>

<style scoped>

</style>
