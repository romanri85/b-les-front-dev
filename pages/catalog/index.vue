<script setup lang="ts">

import DoorSets from "~/components/pages/door-catalog/DoorSets.vue";
import DoorItems from "~/components/pages/door-catalog/DoorItems.vue";
import DoorFilters from "~/components/pages/door-catalog/DoorFilters.vue";
import {baseURL} from "~/config.js";
import Hero from "~/components/base/hero.vue";

const activeFilters = ref({
  min_price: 0,
  max_price: 6000,
  design: [],
  color_set: [],
  color: [],
  collection: [],
  material: [],
  glass: "",
  ordering: ""
  // colorSet: [], colors: [], designs: [], collections: []
})

const heroName = "catalog"
const heroDescription = "catalogPageDescription"
const heroImage = "/catalog/catalog-hero.jpg"

let products = ref([])
let page = ref(1)
const total = ref(0)
let pagesCount = ref(0)
const page_size = 12
const filterCount = ref({})

const route = useRoute()

async function fetchProducts(query = "") {
  const response = await $fetch(`${baseURL}/api/product/product-variants?page_size=${page_size + query}`);
  total.value = response.count
  pagesCount.value = response.page_links.length
  products.value = response.results

  // window.scrollTo(0, 0);

}

async function checkFilters(query = "",) {
  const response = await $fetch(`${baseURL}/api/product/filters?${query}}`);

  filterCount.value = response.counts
  // window.scrollTo(0, 0);
  console.log(filterCount.value, ' checkFilters filterCount.value)')

}

async function checkFiltersForPrice(query = "", changePrice = true) {
  const response = await $fetch(`${baseURL}/api/product/filters?${query}}`);
  filterCount.value = response.counts
  // filterCount.value.material = response.counts.material
  // filterCount.value.color = response.counts.color
  // filterCount.value.color_set = response.counts.color_set
  // filterCount.value.collection = response.counts.collection
  // filterCount.value.design = response.counts.design
  // filterCount.value.glass = response.counts.glass
  console.log(filterCount.value, 'checkFiltersForPrice filterCount.value')


}

async function onChangeFilters(filters) {
  if (!Object.keys(filters).includes("page")) {
    filters = {...filters, page: 1}
  }
  activeFilters.value = {...activeFilters.value, ...filters }
  const query = "&" + new URLSearchParams(activeFilters.value).toString();

  await checkFilters(query) // Make sure this function finishes before fetchProducts
  console.log(query, 'query changeFilters')
  fetchProducts(query)
}


async function onChangePriceFilter(filters, changePrice = false) {
  if (!Object.keys(filters).includes("page")) {
    filters = {...filters, page: 1}
  }
  activeFilters.value = {...activeFilters.value, ...filters}
  const query = "&" + new URLSearchParams(activeFilters.value).toString();

  await checkFiltersForPrice(query) // Make sure this function finishes before fetchProducts
  console.log(query, 'query changePriceFilter')
  fetchProducts(query)
}


async function onResetFilters() {
  activeFilters.value = {
    min_price: 0,
    max_price: 6000,
    design: [],
    color_set: [],
    color: [],
    collection: [],
    material: [],
    glass: '',
    ordering: ''
  }
  const query = "&" + new URLSearchParams(activeFilters.value).toString();
  fetchProducts(query)
}


onMounted(() => {
  // (async () => {
  //   if(route.query.material){
  //     activeFilters.value.material = route.query.material
  //     const query = "&" + new URLSearchParams(activeFilters.value).toString();
  //     await checkFilters(query)
  //     fetchProducts(query)
  //     return
  //   }
  //
  //
  // })();
  checkFilters()
  fetchProducts()
});

</script>

<template>
  <hero :heroName="heroName" :hero-description="heroDescription" :heroImage="heroImage"/>


  <door-sets :activeFilters="activeFilters" @changeFilters="onChangeFilters"/>
  <div class="flex main-container">
    <door-filters :activeFilters="activeFilters" @changeFilters="onChangeFilters"
                  @changePrice="onChangePriceFilter($event, true)" @resetFilters="onResetFilters"
                  :filterCount="filterCount"/>
    <door-items :total="total" :page_size="page_size" :pagesCount="pagesCount" :products="products"
                @changeFilters="onChangeFilters"/>
  </div>
</template>

<style scoped>

</style>