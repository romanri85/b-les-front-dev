<script setup lang="js">

import Hero from "~/pages/catalog/hero.vue";
import DoorSets from "~/pages/catalog/doorSets.vue";
import Items from "~/pages/catalog/Items.vue";
import Filters from "~/pages/catalog/Filters.vue";
import {baseURL} from "~/config.js";

const activeFilters = ref({
  price:{}, colorSet: [], colors: [], designs: [], collections: []
})


let products = ref([])
let page = ref(1)
const total = ref(0)
let pagesCount = ref(0)

const route = useRoute()

async function fetchProducts(query = "") {
  const response = await $fetch(`${baseURL}/api/product/product-variants${query}`);
  total.value = response.count
  pagesCount.value = response.page_links.length
  products.value = response.results
  console.log(response, "response")
  window.scrollTo(0, 0);

}

async function onChangeFilters(filters) {
  if (!Object.keys(filters).includes("page")) {
    filters = {...filters, page: 1}

  }

  activeFilters.value = {...activeFilters.value, ...filters}
  console.log(activeFilters.value)
  const query = "?" + new URLSearchParams(activeFilters.value).toString();
  fetchProducts(query)
}


onMounted(() => {
  if(route.query.material){
    activeFilters.value.material = route.query.material
    const query = "?" + new URLSearchParams(activeFilters.value).toString();
    fetchProducts(query)
    return
  }

  fetchProducts()
})

</script>

<template>
  <hero/>
  <door-sets  :activeFilters="activeFilters" @changeFilters="onChangeFilters"/>
  <div class="flex main-container">
    <filters :activeFilters="activeFilters" @changeFilters="onChangeFilters"/>
    <items :total="total" :pagesCount="pagesCount" :products="products" @changeFilters="onChangeFilters"/>
  </div>
</template>

<style scoped>

</style>