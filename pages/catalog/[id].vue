<script setup lang="ts">

import {baseURL} from "~/config";
import DoorCardDetail from "~/components/pages/door-catalog/DoorCardDetail.vue";
import MaterialColorFilterDetail from "~/components/pages/door-catalog/MaterialColorFilterDetail.vue";
import CasingFilterDetail from "~/components/filters/CasingFilterDetail.vue";
import GlassTypeFilterDetail from "~/components/filters/GlassTypeFilterDetail.vue";
import {toNumber} from "@vue/shared";
import AllCollectionsModalDetail from "~/components/pop-ups/allCollectionsModalDetail.vue";
import Pagination from "~/components/base/Pagination.vue";
import {ref} from "vue";
import ImageModal from "~/components/pop-ups/imageModal.vue";

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

const total = ref(0)
let pagesCount = ref(0)
const page_size = 9
const page = ref(1)


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

const layoutImages = computed(() => {
  if (product.value && product.value.images) {

    let images = product.value.images.images.map((image: { height: number; width: number }) => {
      const aspectRatio = image.height / image.width;
      if (aspectRatio > 1) {
        return {...image, layout: 'narrow'};  // Portrait images (taller than wide)
      } else {
        return {...image, layout: 'wide'};    // Landscape images (wider than tall)
      }
    });

    // Get the number of narrow images
    const numberOfNarrowImages = images.filter(image => image.layout === 'narrow').length;

    // Check if the remainder of division of the number of narrow images by 3 is equal to 1
    if (numberOfNarrowImages % 3 === 1) {
      // Check if there is at least one element with layout: wide
      const wideIndex = images.findIndex(image => image.layout === 'wide');

      // If an element with layout: wide exists, change its layout to 'narrow'
      if (wideIndex !== -1) {
        images[wideIndex].layout = '';
        images[wideIndex].square = true;
      }
    }

    return images;
  }
  return [];
});

const imgModal = ref(null);
const selectedImage = ref(null); // this will store the selected/clicked image data

const triggerModal = (image) => {
  selectedImage.value = image;
  if (imgModal.value && imgModal.value.openModal) {
    imgModal.value.openModal();
  } else {
    console.error('Method not available or component not initialized.');
  }
};
async function fetchDoorVariantData(query = `/${route.params.id}`) {

  // product.value = await $fetch(`${baseURL}/api/product${query}`);
  product.value = await $fetch(`${baseURL}/api/product${query}`);
    total.value = product.value.images.count
    pagesCount.value =product.value.images.page_links.length

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


  let casingData = product.value.collection

  let output = {};

  for (let casing of casingData.casings) {
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
  let productCasingData = product.value.collection.casings
  let materialMap = new Map();

  productCasingData.forEach(item => {
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

function onChangePage(page) {
  fetchDoorVariantData(`/${route.params.id}?page=${page}`)

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
        <casing-filter-detail v-if="doorVariantData" @change-filter="changeCasing" :material="material"
                              :productCasings="productCasings"
                              :casingVariants="casingVariants" :color="color"
                              :startCasing="doorVariantData.casing_variant.casing"/>

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

    <div class="image-container">
      <div v-for="(image, index) in layoutImages" :key="image.id"
           :class="`image-wrapper ${image.layout}${image.square ? ' square' : ''}`">
        <nuxt-img  @click="triggerModal(image)" :src="image.image" class="object-cover" :alt="image.project_name"/>
      </div>
    </div>
    <image-modal :image="selectedImage" ref="imgModal"/>
    <pagination v-if="page" class="pb-32 flex justify-center" :total="total"
                :page_size="page_size"
                :pagesCount="pagesCount"
                @page-change="onChangePage"
                v-model:current-page="page"/>
  </div>

</template>

<style scoped>
/* Add to your scoped styles */

.image-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.image-wrapper {
  flex: 0 0 auto; /* Default for non-square images */
}

.image-wrapper.narrow {
  flex: 0 0 calc(33.33% - 16px); /* 3 images in a row, consider the gap */
}

.image-wrapper.square {
  flex: 0 0 calc(66.6% - 16px);
  height: 100%;
  object-fit: contain; /* 4 images in a row, consider the gap */
}

.image-wrapper.wide {
  flex: 0 0 calc(50% - 16px); /* 2 images in a row, consider the gap */
}


.image-wrapper img {
  width: 100%;
  height: auto;
}

.image-wrapper.narrow img {
  aspect-ratio: 2/3; /* Narrow images are tall (aspect ratio of height to width is 2:3) */
}

.image-wrapper.wide img {
  object-fit: fill;
  aspect-ratio: 3/2; /* Wide images are wide (aspect ratio of width to height is 3:2) */
}

.image-wrapper.square img {
  aspect-ratio: 2.7 / 2; /* Adjust this value to desired ratio */
  width: 100%;
  height: auto;
  object-fit: cover;
}


</style>