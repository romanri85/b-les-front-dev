<script setup lang="ts">
import {getCasingVariants, getMaterialColorVariantsByColorId, getProductCasings} from "~/utils/catalogUtils";
import {baseURL} from "~/config";
import DoorCardDetail from "~/components/pages/door-catalog/DoorCardDetail.vue";
import MaterialColorFilterDetail from "~/components/pages/door-catalog/MaterialColorFilterDetail.vue";
import CasingFilterDetail from "~/components/filters/CasingFilterDetail.vue";
import {toNumber} from "@vue/shared";
import AllCollectionsModalDetail from "~/components/pop-ups/AllCollectionsModalDetail.vue";
import Pagination from "~/components/base/pagination/Pagination.vue";
import {ref} from "vue";
import ImageModal from "~/components/pop-ups/ImageModal.vue";
import {useRouter} from 'vue-router'
import {adjustLayoutForNarrowImages, classifyImageLayout} from '~/services/imageLayoutService';
import SaleInfoDetail from "~/components/pages/door-catalog/SaleInfoDetail.vue";
import ContactUsModal from "~/components/pop-ups/ContactUsModal.vue";
import {useViewportSize} from "~/composables/useViewportSize";
import {useWindowScroll} from '@vueuse/core'
import {ArrowDownIcon} from '@heroicons/vue/24/solid'
import DoorCardPriceDetail from "~/components/pages/door-catalog/DoorCardPriceDetail.vue";

const {x, y} = useWindowScroll()

const viewport = useViewportSize()


const router = useRouter()

definePageMeta({layout: "dark-header"});

let route = useRoute()

const product = ref({})
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

const shouldOpenModal = ref(0)

const imagesBlock = ref(null)
const scrollToImagesBlock = () => {
  imagesBlock.value.scrollIntoView({behavior: 'smooth'});
};

function openContactUsModal() {
  shouldOpenModal.value = shouldOpenModal.value + 1
}


onMounted(
    async () => {
      await fetchDoorVariantData();
      if (product.value && product.value.images) {
        // product.value = data.value
        total.value = product.value.images.count
        if (product.value.images.page_links)
        {
          pagesCount.value = product.value.images.page_links.length
        }
      }


      if (product.value && productMaterials.value.length === 0 && product.value.product_variants) {
        productMaterials.value = product.value.product_variants.map((item) => {
          // Filter material_colors for the current item
          const relevantColors = item.material_colors.filter(color =>
              item.material_color_product_variants.some(variant => variant.color.id === color.id)
          );
          return {
            'material': item.material,
            'name': item.material_name,
            'color': relevantColors
          };
        });
      }



      if (Object.keys(casingVariants.value).length === 0) {
        casingVariants.value = getCasingVariants(product.value);
      }
      if (productCasings.value.length === 0) {
        productCasings.value = getProductCasings(product.value);
      }

      getActualDoorVariantData();
    }
)

type productMaterials = productMaterialsObject[]

interface productMaterialsObject {
  material: string
  name: string
  color: []
}


const layoutImages = computed(() => {
  if (product.value && product.value.images) {
    let images = product.value.images.images.map(classifyImageLayout);

    const numberOfNarrowImages = images.filter(image => image.layout === 'narrow').length;

    adjustLayoutForNarrowImages(images, numberOfNarrowImages);

    return images;
  }
  return [];
});

const imgModal = ref(null);
const selectedImage = ref(null);

const triggerModal = (image) => {
  selectedImage.value = image;
  if (imgModal.value && imgModal.value.openModal) {
    imgModal.value.openModal();
  } else {
    console.error('Method not available or component not initialized.');
  }
};

async function fetchDoorVariantData(query = `/${route.params.id}`) {
  // const {data} = await useFetch(`${baseURL}/api/product${query}`, {key: query});
  // product.value = data.value
  product.value = await $fetch(`${baseURL}/api/product${query}`)
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


function changeModel(model) {
  console.log(model, 'model')
  router.push({path: `/catalog/${model.id}`, query: {color: color.value, material: material.value}})

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


const isCollectionModelOpen = ref(false)

function openCollection() {
  isCollectionModelOpen.value = true
}

function closeCollection() {
  isCollectionModelOpen.value = false
}

function onChangePage(page) {
  fetchDoorVariantData(`/${product.value.id}?page=${page}`)
  scrollToImagesBlock()

}
</script>

<template>

  <div v-if="doorVariantData && doorVariantData.casing_variant" class=" main-container">
    <div class="hidden lg:flex justify-between">
      <div class="h-12 flex justify-start items-end"><h4>Главная / Каталог / {{ product.name }}</h4></div>
    </div>

    <!-- door image and filters block    -->

    <!--    desktop and tablet screen-->

    <div v-if="!viewport.isMobile" class="block md:flex gap-10 lg:gap-20">
      <div class="left md:w-[38%]">
        <door-card-detail class="door-card-detail" :doorVariant="doorVariantData" :product="product"
                          :newGlass="newGlass"/>
        <div class="flex md:hidden  flex-col justify-start items-start mb-2 md:mb-3">
          <buttons-primary-button-big @click="openCollection"
                                      class="pt-4 lg:pt-0 flex flex-col lg:flex-row items-start justify-between w-full pb-4">
            <h2 class="underline-static font-regular">
              {{ product.collection.name }}</h2>

          </buttons-primary-button-big>
          <h1 class="pb-5">{{ product.name }}</h1>
          <div class="flex justify-between">
            <p v-if="product && product.collection">{{ product.collection.description }}</p>
          </div>
          <sale-info-detail class="pt-6 pb-4" :door-variant-data="doorVariantData" v-if="doorVariantData.sale"/>

        </div>
        <casing-filter-detail class="lg:mb-8 md:mb-0 lg:pt-2" v-if="doorVariantData" @change-filter="changeCasing"
                              :material="material"
                              :productCasings="productCasings"
                              :casingVariants="casingVariants" :color="color"
                              :startCasing="doorVariantData.casing_variant.casing"/>
      </div>
      <div class="right w-full ">
        <div class="hidden md:flex h-40 flex-col justify-start items-start mb-3">
          <div class="flex w-full">
            <buttons-primary-button-big @click="openCollection"
                                        class="pt-4 lg:pt-0 flex flex-col lg:flex-row items-start justify-between w-full pb-4">
              <h2 class="underline-static font-regular">
                {{ product.collection.name }}</h2>

            </buttons-primary-button-big>
            <sale-info-detail :door-variant-data="doorVariantData" v-if="doorVariantData.sale"/>
          </div>
          <all-collections-modal-detail v-if="isCollectionModelOpen" @close="isCollectionModelOpen = false"
                                        @close-modal="closeCollection" @change-model="changeModel" :color="color"
                                        :material="material"
                                        :collectionProducts="collectionProducts" :product="product"/>
          <h1 class="pb-5">{{ product.name }}</h1>
          <div class="flex justify-between">
            <p v-if="product && product.collection">{{ product.collection.description }}</p>
          </div>
        </div>
        <div class="lg:min-h-[430px]">
          <div class="flex flex-col lg:flex-row justify-start ">

            <filters-model-family-filter-detail class="lg:min-w-[200px]" @change-model="changeModel" :product="product"
                                                :productVariantsData="productVariantsData"
                                                :modelName="product.name" :material="material" :color="color"
                                                :activeCasing="actualCasing"/>
            <material-color-filter-detail class="pt-0 md:pt-12 lg:pt-0  lg:pl-16"
                                          @change-filter="getActualDoorVariantData"
                                          :activeFilters="activeFilters"
                                          :material="material"
                                          :color="color" :productMaterials="productMaterials"/>

          </div>

          <!--          <glass-type-filter-detail @change-glass-decor="changeGlass" :glass_decor="product.glass_decor"-->
          <!--                                    v-if="product.glass_decor && product.glass_decor[0]" :newGlass="newGlass"/>-->
        </div>
        <div class="w-full flex flex-col justify-between items-start">
          <door-card-price-detail class="pb-8" :doorVariantData="doorVariantData" :product="product" :newGlass="newGlass"/>
          <div @click="openContactUsModal" class="flex justify-start lg:flex-row gap-x-10 lg:gap-x-20 w-full ">
            <buttons-primary-button-big class="w-1/2 lg:w-60 max-w-[240px] h-16 bg-primaryDark text-white">Купить
            </buttons-primary-button-big>
            <!--            <buttons-primary-button-big class="w-1/2 lg:w-60 h-16 bg-primaryDark whitespace-nowrap text-white">В-->
            <!--              избранное-->
            <!--            </buttons-primary-button-big>-->
          </div>


        </div>
      </div>
    </div>

    <!--mobile screen-->

    <div v-if="viewport.isMobile" class=" block md:flex gap-10 lg:gap-20">
      <div class="door-card-detail" :class="{'border-b border-gray-300': y !== 0}">
      <door-card-detail class="" :doorVariant="doorVariantData" :product="product"

                        :newGlass="newGlass"/>
        <door-card-price-detail class="pb-2 md:pb-4 flex justify-center" :doorVariantData="doorVariantData" :product="product" :newGlass="newGlass"/>

      </div>

      <div class="h-4 flex justify-end">
        <ArrowDownIcon v-if="y===0" class="h-8"></ArrowDownIcon>
        <div v-else class="h-4  ">
        </div>
      </div>
      <div class="left md:w-[38%]">

        <div class="flex md:hidden  flex-col justify-start items-start mb-2 md:mb-3">
          <div
                                      class="pt-4 lg:pt-0 inline-flex flex-col lg:flex-row items-start justify-between w-full pb-2">
            <h2  @click="openCollection" class=" py-2 mb-2   c font-regular">
             <span class="underline-static"> {{ product.collection.name }}</span></h2>

          </div>
          <h1 class="pb-5">{{ product.name }}</h1>


          <sale-info-detail class="pt-6 pb-4" :door-variant-data="doorVariantData" v-if="doorVariantData.sale"/>

        </div>
        <casing-filter-detail class="lg:mb-8 md:mb-0 lg:pt-2 md:pl-0 pl-1" v-if="doorVariantData"
                              @change-filter="changeCasing"
                              :material="material"
                              :productCasings="productCasings"
                              :casingVariants="casingVariants" :color="color"
                              :startCasing="doorVariantData.casing_variant.casing"/>

      </div>
      <div class="right w-full ">
        <div class="hidden md:flex h-40 flex-col justify-start items-start mb-3">
          <div class="flex w-full">
            <buttons-primary-button-big @click="openCollection"
                                        class="pt-4 lg:pt-0 flex flex-col lg:flex-row items-start justify-between w-full pb-4">
              <h2 class="underline-static font-regular">
                {{ product.collection.name }}</h2>

            </buttons-primary-button-big>
            <sale-info-detail :door-variant-data="doorVariantData" v-if="doorVariantData.sale"/>
          </div>
          <all-collections-modal-detail v-if="isCollectionModelOpen" @close="isCollectionModelOpen = false"
                                        @close-modal="closeCollection" @change-model="changeModel" :color="color"
                                        :material="material"
                                        :collectionProducts="collectionProducts" :product="product"/>
          <h1 class="pb-5">{{ product.name }}</h1>
          <div class="flex justify-between">
            <p v-if="product && product.collection">{{ product.collection.description }}</p>
          </div>
        </div>
        <div class="lg:min-h-[430px]">
          <div class="flex flex-col lg:flex-row justify-start ">

            <filters-model-family-filter-detail class="lg:min-w-[200px]" @change-model="changeModel" :product="product"
                                                :productVariantsData="productVariantsData"
                                                :modelName="product.name" :material="material" :color="color"
                                                :activeCasing="actualCasing"/>
            <material-color-filter-detail class="pt-0 md:pt-12 lg:pt-0  lg:pl-8  md:pl-0 pl-1"
                                          @change-filter="getActualDoorVariantData"
                                          :activeFilters="activeFilters"
                                          :material="material"
                                          :color="color" :productMaterials="productMaterials"/>

          </div>

          <!--          <glass-type-filter-detail @change-glass-decor="changeGlass" :glass_decor="product.glass_decor"-->
          <!--                                    v-if="product.glass_decor && product.glass_decor[0]" :newGlass="newGlass"/>-->
        </div>
        <div class="w-full flex flex-col justify-between items-start">

          <div @click="openContactUsModal"
               class="flex justify-start lg:flex-row gap-x-10 lg:gap-x-20 w-full md:pl-0 pl-1">
            <buttons-primary-button-big class="w-1/2 max-w-[200px] lg:w-60 h-16 bg-primaryDark text-white ">Купить
            </buttons-primary-button-big>
            <!--            <buttons-primary-button-big class="w-1/2 lg:w-60 h-16 bg-primaryDark whitespace-nowrap text-white">В-->
            <!--              избранное-->
            <!--            </buttons-primary-button-big>-->
          </div>


        </div>
      </div>
    </div>

    <!-- door image and filters block end  -->

    <div ref="imagesBlock" class="layout-images pt-16 lg:pt-24">
      <div class="image-container">
        <div v-for="(image, index) in layoutImages" :key="image.id" class="cursor-pointer"
             :class="`image-wrapper ${image.layout}${image.square ? ' square' : ''}`">
          <nuxt-img @click="triggerModal(image)" :src="image.image" class="object-cover" :alt="image.project_name"/>
        </div>
      </div>
    </div>
    <image-modal :image="selectedImage" ref="imgModal"/>
    <contact-us-modal :should-open-modal="shouldOpenModal"/>
    <pagination v-if="total > 0" class="pt-12 pb-32 flex justify-center" :total="total"
                :page_size="page_size"
                :pagesCount="pagesCount"
                @page-change="onChangePage"
                v-model:current-page="page"/>
  </div>

</template>

<style scoped>

.door-card-detail {
  @media screen and (max-width: 768px) {
    position: sticky !important;
    top: 0;
    z-index: 2;
    background-color: white;
  }


}
</style>