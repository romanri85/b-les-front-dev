<script setup lang="ts">
import DoorSets from "~/components/pages/door-catalog/DoorSets.vue";
import DoorItems from "~/components/pages/door-catalog/DoorItems.vue";
import DoorFilters from "~/components/pages/door-catalog/DoorFilters.vue";
import {baseURL} from "~/config.js";
import Hero from "~/components/base/hero.vue";

const activeFilters = ref({
  price:{}, colorSet: [], colors: [], designs: [], collections: []
})

const heroName = "catalog"
const heroDescription = "catalogPageDescription"
const heroImage = "/catalog/catalog-hero.jpg"

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
  <hero :heroName="heroName" :hero-description="heroDescription" :heroImage="heroImage"  />
  <door-sets :activeFilters="activeFilters" @changeFilters="onChangeFilters"/>
  <div class="flex main-container">
    <door-filters :activeFilters="activeFilters" @changeFilters="onChangeFilters"/>
    <door-items :total="total" :pagesCount="pagesCount" :products="products" @changeFilters="onChangeFilters"/>
  </div>
</template>

<style scoped>

</style>