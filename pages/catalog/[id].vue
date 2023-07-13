<script setup lang="ts">

import {baseURL} from "~/config";
import DoorCardDetail from "~/components/pages/door-catalog/DoorCardDetail.vue";
import MaterialColorFilterDetail from "~/components/pages/door-catalog/MaterialColorFilterDetail.vue";
import CasingFilterDetail from "~/components/filters/CasingFilterDetail.vue";
import GlassTypeFilterDetail from "~/components/filters/GlassTypeFilterDetail.vue";
import {toNumber} from "@vue/shared";

definePageMeta({layout: "dark-header"});

let route = useRoute()

const product = ref({})
const doorVariantData = ref({})
const productVariantsData = ref({})
const productMaterials = ref([])
const productCasings = ref([])
const activeFilters = ref({})
const casingVariants = ref({})
const color = ref(Number(route.query.color))
const material = ref(Number(route.query.material))
const actualCasing = ref(null)
const newGlass = ref({})
// const glass_type= ref(null)
const glass_decor = ref([])


async function fetchDoorVariantData(query = `/${route.params.id}`) {

  product.value = await $fetch(`${baseURL}/api/product${query}`)
  // product.value.product_family?.products?.push({id:product.value.id, name: product.value.name, image: product.value.image})


  if (productMaterials.value.length === 0) {
    productMaterials.value = product.value.product_variants.map((item) => ({
      'material': item.material,
      'name': item.material_name,
      'color': item.material_colors
    }));
  }
  // productMaterials.value = product.value.product_variants.map((item) => ({
  //   'material': item.material,
  //   'name': item.material_name,
  //   'color': item.material_colors
  // }));


  if (Object.keys(casingVariants.value).length === 0) {
    getCasingVariants()
  }
  // getCasingVariants()
  if (productCasings.value.length === 0) {
    getProductCasings()
  }

  getActualDoorVariantData()
  // actualCasing.value =doorVariantData.value.casing_variant

  // window.scrollTo(0, 0);

}

let target = ref(null)

function getActualDoorVariantData(filterData = {material: material.value, color: color.value}) {
  color.value = filterData.color
  material.value = filterData.material
  productVariantsData.value = product.value.product_variants.find((item) => item.material === material.value)
  // target.value = productVariantsData.value.material_color_product_variants.sort()

  doorVariantData.value = productVariantsData.value.material_color_product_variants.find((item) => item.color.id === Number(color.value))

  if (actualCasing.value !== null) {
    changeCasing(actualCasing.value)
  }
}

function changeModel(model) {

  fetchDoorVariantData(`/${product.value.product_family.products.find((item) => item.name === model).id}`)

  getActualDoorVariantData({material: material.value, color: color.value})
  actualCasing.value = doorVariantData.value.casing_variant.casing

  console.log(newGlass.value, 'newGlass')
  // getActualDoorVariantData({material: material.value, color: color.value}, model)
}

function changeCasing(casing) {

  doorVariantData.value.casing_variant = casingVariants.value[casing][color.value][0]
  actualCasing.value = casing
}

function changeGlass(glass) {
  if (glass === null) {
    newGlass.value = {}
    return
  }
  newGlass.value = product.value.glass_decor.find((item) => item.glass.id === glass.glass && item.decor.id === glass.decor)
  // glass_type.value = glass.glass
  // glass_decor.value = glass.decor
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
  <div v-if="doorVariantData && doorVariantData.casing_variant" class="main-container">
    <div class="h-12 flex justify-start items-end"><h4>Главная / Каталог / {{ product.name }}</h4></div>
    <div class="flex gap-20">
      <div class="left w-[38%]">
        <door-card-detail :doorVariant="doorVariantData" :product="product" :newGlass="newGlass"/>
        <!--        <client-only>-->
        <casing-filter-detail v-if="doorVariantData" @change-filter="changeCasing" :material="material"
                              :productCasings="productCasings"
                              :casingVariants="casingVariants" :color="color"
                              :startCasing="doorVariantData.casing_variant.casing"/>
        <!--        </client-only>-->

      </div>
      <div class="right w-full">
        <div class="h-40 flex flex-col justify-start items-start mb-3">

          <h4 v-if="product && product.collection" class="pb-5">{{ product.collection.name }}</h4>
          <h1 class="pb-5">{{ product.name }}</h1>
          <p v-if="product && product.collection">{{ product.collection.description }}</p>
        </div>
        <div class="flex justify-start">
          <filters-model-family-filter-detail class="min-w-[300px]" @change-model="changeModel" :product="product"
                                              :productVariantsData="productVariantsData"
                                              :modelName="product.name" :material="material" :color="color"
                                              :activeCasing="actualCasing"/>
          <div class="w-full">
            <div class="pl-36">
              <div v-if="product.glass_decor.length > 0">
                <h2 v-if="doorVariantData && doorVariantData.casing_variant " class="font-regular">
                  {{
                    toNumber(doorVariantData.price) + toNumber(doorVariantData.casing_variant.price) + toNumber(newGlass.price || product.glass_decor.find((item: GlassDecorItem) => item.initial === true).price)
                  }}&nbsp;₽</h2>
              </div>
              <div v-else>
                <h2 class="font-bold">
                  {{ toNumber(doorVariantData.price) + toNumber(doorVariantData.casing_variant.price) }}&nbsp;₽</h2>
              </div>
            </div>
            <div class="flex justify-start gap-x-10 w-full pl-32 pt-16 pb-8">
            <buttons-primary-button-big class="w-60 h-16 bg-primaryDark text-white">Купить</buttons-primary-button-big>
            <buttons-primary-button-big class="w-60 h-16 bg-primaryDark text-white">В избранное</buttons-primary-button-big>
            </div>
          </div>
        </div>
        <material-color-filter-detail @change-filter="getActualDoorVariantData" :activeFilters="activeFilters"
                                      :material="material"
                                      :color="color" :productMaterials="productMaterials"/>
        <glass-type-filter-detail @change-glass-decor="changeGlass" :glass_decor="product.glass_decor"
                                  v-if="product.glass_decor && product.glass_decor[0]" :newGlass="newGlass"/>


        <!--          <p>{{product.glass_decor}}</p>-->

      </div>
    </div>
  </div>

</template>

<style scoped>

</style>