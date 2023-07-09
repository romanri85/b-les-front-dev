<script setup lang="ts">

import {baseURL} from "~/config";
import DoorCardDetail from "~/components/pages/door-catalog/DoorCardDetail.vue";
import MaterialColorFilterDetail from "~/components/pages/door-catalog/MaterialColorFilterDetail.vue";
import CasingFilterDetail from "~/components/filters/CasingFilterDetail.vue";
import {func} from "ts-interface-checker";
import {filter} from "domutils";

definePageMeta({layout: "dark-header"});

let route = useRoute()

const product = ref({})
const doorVariantData = ref({})
const productVariantsData = ref({})
const productMaterials = ref([])
const productCasings = ref([])
const activeFilters = ref({})
const casingVariants = ref({})
const color= ref(Number(route.query.color))
const material = ref(Number(route.query.material))
const actualCasing = ref(null)




async function fetchDoorVariantData(query = `/${route.params.id}`) {

  product.value = await $fetch(`${baseURL}/api/product${query}`)

  productMaterials.value = product.value.product_variants.map((item) => ({
    'material': item.material,
    'name': item.material_name,
    'color': item.material_colors
  }));

  getProductCasings()
  getCasingVariants()


  getActualDoorVariantData()

  // window.scrollTo(0, 0);

}
let target = ref(null)
function getActualDoorVariantData(filterData = {material : material.value, color: color.value}) {
  color.value = filterData.color
  material.value = filterData.material

  productVariantsData.value = product.value.product_variants.find((item) => item.material === material.value)
  target.value = productVariantsData.value.material_color_product_variants.sort()

  doorVariantData.value = productVariantsData.value.material_color_product_variants.find((item) => item.color.id === Number(color.value))
  if (actualCasing.value !== null) {
    changeCasing(actualCasing.value)
  }





}

function changeCasing(casing) {



  doorVariantData.value.casing_variant = casingVariants.value[casing][color.value][0]
  actualCasing.value = casing




}

// TO DO: get casing variants from product^ not from collection
function getCasingVariants() {

  let data = product.value.collection

  let output = {};

  for (let casing of data.casings) {
    let casingValue = casing.casing;
    if (!(casingValue in output)) {
      output[casingValue] = {};
    }
    for (let variant of casing.casing_variants) {
      let colorValue = variant.color;
      if (!(colorValue in output[casingValue])) {
        output[casingValue][colorValue] = [];
      }
      output[casingValue][colorValue].push(variant);
    }
  }
  casingVariants.value = output;

}

function getProductCasings() {
  let data = product.value.collection.casings
  let materialMap = new Map();

  data.forEach(item => {
    if (materialMap.has(item.material)) {
      materialMap.get(item.material).push(item);
    } else {
      materialMap.set(item.material, [item]);
    }
  });
  productCasings.value = Object.fromEntries(materialMap);
}

// let casingMap = {3: 1, 6: 2, 11: 3, 8: 7}

onMounted(() => {
  fetchDoorVariantData()
})


</script>

<template>
<!--  <client-only>-->
  <p>{{}}</p>
    <div v-if="doorVariantData && doorVariantData.casing_variant" class="main-container">
      <div class="h-24 flex justify-start items-center"><h4>Главная / Каталог / {{ product.name }}</h4></div>
      <div class="flex gap-20">
        <div class="left w-[38%]">
          <door-card-detail :doorVariant="doorVariantData" :product="product" />
        </div>
        <div class="right w-full">
          <div class="h-60 flex flex-col justify-start items-start">

            <h4 v-if="product && product.collection" class="pb-5">{{ product.collection.name }}</h4>
            <h1 class="pb-5">{{ product.name }}</h1>
            <p v-if="product && product.collection">{{ product.collection.description }}</p>
          </div>
          <material-color-filter-detail @change-filter="getActualDoorVariantData" :activeFilters="activeFilters"
                                        :material="material"
                                        :color="color" :productMaterials="productMaterials"/>
          <casing-filter-detail v-if="doorVariantData" @change-filter="changeCasing" :material="material" :productCasings="productCasings"
                                :casingVariants="casingVariants" :color="color" :startCasing="doorVariantData.casing_variant.casing"/>
        </div>
      </div>
    </div>

</template>

<style scoped>

</style>