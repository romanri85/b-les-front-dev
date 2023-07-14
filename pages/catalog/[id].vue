<script setup lang="ts">

import {baseURL} from "~/config";
import DoorCardDetail from "~/components/pages/door-catalog/DoorCardDetail.vue";
import MaterialColorFilterDetail from "~/components/pages/door-catalog/MaterialColorFilterDetail.vue";
import CasingFilterDetail from "~/components/filters/CasingFilterDetail.vue";
import GlassTypeFilterDetail from "~/components/filters/GlassTypeFilterDetail.vue";
import {toNumber} from "@vue/shared";
import AllCollectionsModalDetail from "~/components/pop-ups/allCollectionsModalDetail.vue";

definePageMeta({layout: "dark-header"});

let route = useRoute()

const product = ref<product>({
  product_variants: [],
  collection: {
    products: []
  }
})
const doorVariantData = ref({})
const productVariantsData = ref({})
const productMaterials = ref<productMaterials>([])
const productCasings = ref([])
const activeFilters = ref({})
const casingVariants = ref({})
const color = ref(Number(route.query.color))
const material = ref(Number(route.query.material))
const actualCasing = ref(null)
const newGlass = ref({})
const collectionProducts = ref([])


type productMaterials = productMaterialsObject[]

interface productMaterialsObject {
  material: string
  name: string
  color: []
}

interface product {
  product_variants: []
  collection: {
    products: []
  }
}

async function fetchDoorVariantData(query = `/${route.params.id}`) {

  product.value = await $fetch(`${baseURL}/api/product${query}`);

  if (productMaterials.value.length === 0) {
    productMaterials.value = product.value.product_variants.map((item) => ({
      'material': item.material,
      'name': item.material_name,
      'color': item.material_colors
    }));
  }

  if (Object.keys(casingVariants.value).length === 0) {
    await getCasingVariants();
  }
  if (productCasings.value.length === 0) {
    await getProductCasings();
  }

  await getActualDoorVariantData();

}

let target = ref(null)

function getActualDoorVariantData(filterData = {material: material.value, color: color.value}) {
  color.value = filterData.color
  material.value = filterData.material
  productVariantsData.value = product.value.product_variants.find((item) => item.material === material.value)
  doorVariantData.value = productVariantsData.value.material_color_product_variants.find((item) => item.color.id === Number(color.value))
  collectionProducts.value = getMaterialColorVariantsByColorId(product.value.collection.products, color.value)

  if (actualCasing.value !== null) {
    changeCasing(actualCasing.value)
  }
}

function getMaterialColorVariantsByColorId(products: [], colorId: number) {
  return products.reduce((output, product) => {
    product.product_variants.forEach(variant => {
      const matchingColors = variant.material_color_variant.filter(item => item.color === colorId);
      matchingColors.forEach(color => {
        output.push({
          name: product.name,
          material: variant.material,
          color: color.color,
          price: color.price,
          id: product.id,
          leaf_image: color.leaf_image,
          merged_image: color.merged_image
        });
      });
    });
    return output;
  }, []);
}

function changeModel(model) {
  fetchDoorVariantData(`/${product.value.collection.products.find((item) => item.id === model.id).id}`)
  getActualDoorVariantData({material: material.value, color: color.value})
  actualCasing.value = doorVariantData.value.casing_variant.casing
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

}

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

onMounted(async () => {
  await fetchDoorVariantData();
});

const isCollectionModelOpen = ref(false)

function openCollection() {
  isCollectionModelOpen.value = true
}

function closeCollection() {
  isCollectionModelOpen.value = false
}
</script>

<template>
  <!--  <client-only>-->
  <div v-if="doorVariantData && doorVariantData.casing_variant" class="main-container">
    <div class="flex justify-between pr-72">
      <div class="h-12 flex justify-start items-end"><h4>Главная / Каталог / {{ product.name }}</h4></div>
    </div>
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
          <div class="flex justify-between w-full"><h3>
            {{ product.collection.name }}</h3>
            <buttons-primary-button-big class="pb-1" @click="openCollection">все модели коллекции
            </buttons-primary-button-big>
          </div>
          <all-collections-modal-detail v-if="isCollectionModelOpen" @close="isCollectionModelOpen = false"
                                        @close-modal="closeCollection" @change-model="changeModel" :color="color"
                                        :collectionProducts="collectionProducts" :product="product"/>
          <h1 class="pb-5">{{ product.name }}</h1>
          <div class="flex justify-between">
            <p v-if="product && product.collection">{{ product.collection.description }}</p>
          </div>
        </div>
        <div class="flex justify-start">
          <filters-model-family-filter-detail class="min-w-[200px]" @change-model="changeModel" :product="product"
                                              :productVariantsData="productVariantsData"
                                              :modelName="product.name" :material="material" :color="color"
                                              :activeCasing="actualCasing"/>
          <material-color-filter-detail class="pl-8" @change-filter="getActualDoorVariantData"
                                        :activeFilters="activeFilters"
                                        :material="material"
                                        :color="color" :productMaterials="productMaterials"/>

        </div>

        <glass-type-filter-detail @change-glass-decor="changeGlass" :glass_decor="product.glass_decor"
                                  v-if="product.glass_decor && product.glass_decor[0]" :newGlass="newGlass"/>
        <div class="w-full flex items-start">
          <div class="">
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
          <div class="flex justify-start gap-x-10 w-full pl-32 pb-8">
            <buttons-primary-button-big class="w-60 h-16 bg-primaryDark text-white">Купить</buttons-primary-button-big>
            <buttons-primary-button-big class="w-60 h-16 bg-primaryDark text-white">В избранное
            </buttons-primary-button-big>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>