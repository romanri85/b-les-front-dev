<script setup lang="ts">

import {baseURL} from "~/config";
import DoorCard from "~/components/pages/door-catalog/DoorCard.vue";
import DoorCardDetail from "~/components/pages/door-catalog/DoorCardDetail.vue";
import MaterialColorFilter from "~/components/pages/door-catalog/MaterialColorFilter.vue";
import MaterialColorFilterDetail from "~/components/pages/door-catalog/MaterialColorFilterDetail.vue";

definePageMeta({layout: "dark-header"});

let route = useRoute()

const doorVariantData =ref({})
const newDoorVariantData =ref({})
const productName = ref(null)
const collectionName = ref(null)
const collectionDescription = ref(null)
const collectionMaterials = ref([])
const activeFilters = ref({})


async function fetchDoorVariantData(query = `/${route.params.id}`) {

  doorVariantData.value = await $fetch(`${baseURL}/api/product/product-variants${query}`)
  productName.value = doorVariantData.value.product_variant.product.name
  collectionName.value = doorVariantData.value.product_variant.product.collection.name
  collectionDescription.value = doorVariantData.value.product_variant.product.collection.description
  collectionMaterials.value = doorVariantData.value.product_variant.product.collection.collection_materials
  activeFilters.value = {product: doorVariantData.value.product_variant.product.id }

  // window.scrollTo(0, 0);

}

async function changeDoorVariantData(query) {

  newDoorVariantData.value = await $fetch(query)
  doorVariantData.valuecre = newDoorVariantData.value.results[0]
  console.log(newDoorVariantData.value.results, 'newDoorVariantData')

  // window.scrollTo(0, 0);

}

async function onChangeFilters(filters) {

  activeFilters.value = {...activeFilters.value, ...filters}
  const query = "?" + new URLSearchParams(activeFilters.value).toString();
  console.log(`${baseURL}/api/product/product-variants${query}`, 'query')
  await changeDoorVariantData(`${baseURL}/api/product/product-variants${query}`)

  console.log(filters, 'filters')
}
// const material = doorVariantData.value.product_variant.product.collection.collection_materials
// console.log(material, 'material')

onMounted(() => {
  fetchDoorVariantData()
})
</script>

<template>
  <client-only>
  <div v-show="doorVariantData" class="main-container">
    <div class="h-24 flex justify-start items-center"><h4>Главная / Каталог / {{productName}}</h4></div>
    <div class="flex gap-20">
      <div class="left w-[38%]">
        <door-card-detail :doorVariant="doorVariantData"/>
      </div>
      <div class="right">
        <div class="h-60 flex flex-col justify-start items-start">
          <h4 class="pb-5">{{collectionName}}</h4>
          <h1 class="pb-5">{{productName}}</h1>
          <p>{{collectionDescription}}</p>
        </div>
        <material-color-filter-detail @change-filter="onChangeFilters" :activeFilters="activeFilters" :material="doorVariantData.product_variant.product.collection.collection_materials"/>

      </div>
    </div>
  </div>
  </client-only>

</template>

<style scoped>

</style>