<script setup lang="ts">

import DoorSets from "~/components/pages/door-catalog/DoorSets.vue";
import DoorItems from "~/components/pages/door-catalog/DoorItems.vue";
import DoorFilters from "~/components/pages/door-catalog/DoorFilters.vue";
import {baseURL} from "~/config.js";
import Hero from "~/components/base/hero.vue";

const activeFilters = ref({
  min_price: 0, max_price: 5000, colorSet: [], colors: [], designs: [], collections: []
})

const heroName = "catalog"
const heroDescription = "catalogPageDescription"
const heroImage = "/catalog/catalog-hero.jpg"

let products = ref([])
let page = ref(1)
const total = ref(0)
let pagesCount = ref(0)
const page_size = 12

const route = useRoute()

async function fetchProducts(query = "") {
  const response = await $fetch(`${baseURL}/api/product/product-variants?page_size=${page_size + query}`);
  total.value = response.count
  pagesCount.value = response.page_links.length
  products.value = response.results
  console.log(response, "response")
  // window.scrollTo(0, 0);

}

async function onChangeFilters(filters) {
  console.log(filters, "filters")
  if (!Object.keys(filters).includes("page")) {
    filters = {...filters, page: 1}

  }

  activeFilters.value = {...activeFilters.value, ...filters}
  const query = "&" + new URLSearchParams(activeFilters.value).toString();
  console.log(query, "query")

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
  <door-sets :activeFilters="activeFilters" @changeFilters="onChangeFilters"/>
  <div class="flex main-container">
    <door-filters :activeFilters="activeFilters" @changeFilters="onChangeFilters"/>
    <door-items :total="total"  :page_size="page_size" :pagesCount="pagesCount" :products="products" @changeFilters="onChangeFilters"/>
  </div>
</template>

<style scoped>

</style>