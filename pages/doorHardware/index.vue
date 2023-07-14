<script setup lang="ts">

import {baseURL} from "~/config.js";
import Hero from "~/components/base/hero.vue";
import {string} from "postcss-selector-parser";
import HardwareFilters from "~/components/pages/doorHardware/HardwareFilters.vue";
import HardwareItems from "~/components/pages/doorHardware/HardwareItems.vue";

const activeFilters = ref({
  min_price: 500, max_price: 2000, design:[], color_collection: [], ordering: ""
})

const heroName = "doorHardware"
const heroDescription = "doorHardwarePageDescription"
const heroImage = "/doorHardware/doorHardware.jpg"

let products = ref([])
let page = ref(1)
const total = ref(0)
let pagesCount = ref(0)
const page_size = 20

const route = useRoute()

async function fetchProducts(query = "") {
  const response = await $fetch(`${baseURL}/api/hardware/hardware-variants?page_size=${page_size + query}`);
  total.value = response.count
  pagesCount.value = response.page_links.length
  products.value = response.results
  // window.scrollTo(0, 0);

}

async function onChangeFilters(filters) {
  if (!Object.keys(filters).includes("page")) {
    filters = {...filters, page: 1}

  }console.log(filters)
  console.log(activeFilters.value), 'activeFilters.value'

  activeFilters.value = {...activeFilters.value, ...filters}
  const query = "&" + new URLSearchParams(activeFilters.value).toString();


  fetchProducts(query)
}

async function onResetFilters(){
  activeFilters.value = {
    min_price: 500, max_price: 2000, design:[], color_collection: [], ordering: ""  }
  const query = "&" + new URLSearchParams(activeFilters.value).toString();
  fetchProducts(query)
}


onMounted(() => {
  if(route.query.material){
    activeFilters.value.material = route.query.material
    const query = "&" + new URLSearchParams(activeFilters.value).toString();
    fetchProducts(query)
    return
  }

  fetchProducts()
})

</script>

<template>
  <hero :heroName="heroName" :hero-description="heroDescription" :heroImage="heroImage"  />
  <div class="flex main-container pt-32">
    <hardware-filters :activeFilters="activeFilters" @changeFilters="onChangeFilters" @resetFilters="onResetFilters"/>
    <hardware-items :total="total"  :page_size="page_size" :pagesCount="pagesCount" :products="products" @changeFilters="onChangeFilters"/>
  </div>
</template>

<style scoped>

</style>