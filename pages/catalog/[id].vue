<script setup lang="js">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useWindowScroll } from '@vueuse/core'
import { ArrowDownIcon } from '@heroicons/vue/24/solid'
import { getCasingVariants, getProductCasings } from '~/utils/catalogUtils'
import { baseURL } from '~/config'
import DoorCardDetail from '~/components/pages/door-catalog/DoorCardDetail.vue'
import MaterialColorFilterDetail from '~/components/pages/door-catalog/MaterialColorFilterDetail.vue'
import CasingFilterDetail from '~/components/filters/CasingFilterDetail.vue'
import AllCollectionsModalDetail from '~/components/pop-ups/AllCollectionsModalDetail.vue'
import Pagination from '~/components/base/pagination/Pagination.vue'
import { adjustLayoutForNarrowImages, classifyImageLayout } from '~/services/imageLayoutService'
import SaleInfoDetail from '~/components/pages/door-catalog/SaleInfoDetail.vue'
import ContactUsModal from '~/components/pop-ups/ContactUsModal.vue'
import { useViewportSize } from '~/composables/useViewportSize'
import DoorCardPriceDetail from '~/components/pages/door-catalog/DoorCardPriceDetail.vue'
import DoorTechInfoModal from "~/components/pop-ups/DoorTechInfoModal.vue";
import ImageModal2 from "~/components/pop-ups/ImageModal2.vue";

const { y } = useWindowScroll()

const viewport = useViewportSize()

const router = useRouter()

definePageMeta({ layout: 'dark-header' })

const route = useRoute()

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
const collectionProducts = ref([])

const total = ref(0)
const pagesCount = ref(0)
const page_size = 9
const page = ref(1)

// const shouldOpenImageModal = ref(0)
const shouldOpenDoorTechInfoModal = ref(0)
const shouldOpenContactUsModal = ref(0)

const imagesBlock = ref(null)
function scrollToImagesBlock() {
  imagesBlock.value.scrollIntoView({ behavior: 'smooth' })
}

function openContactUsModal() {
  shouldOpenContactUsModal.value = shouldOpenContactUsModal.value + 1
}

function openDoorTechInfoModal() {
  shouldOpenDoorTechInfoModal.value = shouldOpenDoorTechInfoModal.value + 1
}



onMounted(
  async () => {
    await fetchDoorVariantData()
    if (product.value && product.value.images) {
      // product.value = data.value
      total.value = product.value.images.count
      if (product.value.images.page_links)
        pagesCount.value = product.value.images.page_links.length
    }

    if (product.value && productMaterials.value.length === 0 && product.value.product_variants) {
      productMaterials.value = product.value.product_variants.map((item) => {
        // Filter material_colors for the current item
        const relevantColors = item.material_colors.filter(color =>
          item.material_color_product_variants.some(variant => variant.color.id === color.id),
        )
        return {
          material: item.material,
          name: item.material_name,
          color: relevantColors,
        }
      })
    }

    if (Object.keys(casingVariants.value).length === 0)
      casingVariants.value = getCasingVariants(product.value)

    if (productCasings.value.length === 0)
      productCasings.value = getProductCasings(product.value)

    getActualDoorVariantData()
  },
)



const layoutImages = computed(() => {
  if (product.value && product.value.images) {
    const images = product.value.images.images.map(classifyImageLayout)

    const numberOfNarrowImages = images.filter(image => image.layout === 'narrow').length

    adjustLayoutForNarrowImages(images, numberOfNarrowImages)

    return images
  }
  return []
})

const selectedImage = ref(null)

function triggerModal(image) {
  selectedImage.value = image
}

async function fetchDoorVariantData(query = `/${route.params.id}`) {
  // const {data} = await useFetch(`${baseURL}/api/product${query}`, {key: query});
  // product.value = data.value
  product.value = await $fetch(`${baseURL}/api/product${query}`)
}

function getActualDoorVariantData(filterData = { material: material.value, color: color.value }) {
  color.value = filterData.color
  material.value = filterData.material
  productVariantsData.value = product.value.product_variants.find(item => item.material === material.value)
  if (productVariantsData?.value.material_color_product_variants?.length === 0) {
    alert('Дверь с такими параметрами выпускается, но пока не загружена на сайт.')
    router.go(-1)  // Navigate back to the previous page
    return;  // Exit the function early to prevent further execution
  }
  if (productVariantsData?.value.material_color_product_variants?.length === 0) {
    productVariantsData.value = product.value.product_variants[0];
  }
  doorVariantData.value = productVariantsData.value.material_color_product_variants.find(item => item.color.id === Number(color.value))
  if (!doorVariantData.value) {
    doorVariantData.value = productVariantsData.value.material_color_product_variants[0];
  }
  // collectionProducts.value = getMaterialColorVariantsByColorId(product.value.collection.products, color.value)

  if (actualCasing.value !== null)
    changeCasing(actualCasing.value)
}

function changeModel(model) {
  router.push({ path: `/catalog/${model.id}`, query: { color: color.value, material: material.value } })
}

function changeCasing(casing) {
  doorVariantData.value.casing_variant = casingVariants.value[casing][color.value][0]
  actualCasing.value = casing
}

// function changeGlass(glass) {
//   if (glass === null) {
//     newGlass.value = {}
//     return
//   }
//   newGlass.value = product.value.glass_decor.find(item => item.glass.id === glass.glass && item.decor.id === glass.decor)
// }

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
  <Head>
    <title>Двери Брянский лес</title>
  </Head>
  <div v-if="doorVariantData && doorVariantData.casing_variant" class=" main-container">
    <div class="hidden lg:flex justify-between">
      <div class="h-12 flex justify-start items-end">
        <h4>Главная / Каталог / {{ product.name }}</h4>
      </div>
    </div>

    <!-- door image and filters block    -->

    <!--    desktop and tablet screen -->

    <div v-if="!viewport.isMobile" class="block md:flex gap-10 md:gap-20">
      <div class="left md:w-[38%]">
        <DoorCardDetail
          class="door-card-detail" :door-variant="doorVariantData" :product="product"
          :new-glass="newGlass"
        />
        <div class="flex md:hidden  flex-col justify-start items-start mb-2 md:mb-3">
          <buttons-primary-button-big
            class="pt-4 lg:pt-0 flex flex-col lg:flex-row items-start justify-between w-full pb-4"
            @click="openCollection"
          >
            <h2 class="underline-static font-regular">
              {{ product.collection.name }}
            </h2>
          </buttons-primary-button-big>
          <h1 class="pb-5">
            {{ product.name }}
          </h1>
<!--          <div class="flex justify-between">-->
<!--            <p v-if="product && product.collection">-->
<!--              {{ product.collection.description }}-->
<!--            </p>-->
<!--          </div>-->
          <SaleInfoDetail v-if="doorVariantData.sale" class="pt-6 pb-4" :door-variant-data="doorVariantData" />
        </div>
        <CasingFilterDetail
          v-if="doorVariantData" class="lg:mb-8 md:mb-0 lg:pt-2" :material="material"
          :product-casings="productCasings"
          :casing-variants="casingVariants"
          :color="color" :start-casing="doorVariantData.casing_variant.casing"
          @change-filter="changeCasing"
        />
      </div>
      <div class="right w-full ">
        <div class="hidden md:flex h-40 flex-col justify-start items-start mb-3">
          <div class="flex w-full">
            <buttons-primary-button-big
              class="pt-4 lg:pt-0 flex flex-col lg:flex-row items-start justify-between w-full pb-4"
              @click="openCollection"
            >
              <h2 class="underline-static font-regular">
                {{ product.collection.name }}
              </h2>
            </buttons-primary-button-big>
            <SaleInfoDetail v-if="doorVariantData.sale" :door-variant-data="doorVariantData" />
          </div>
          <AllCollectionsModalDetail
            v-if="isCollectionModelOpen" :color="color"
            :material="material" :product="product"
            @close="isCollectionModelOpen = false"
            @close-modal="closeCollection" @change-model="changeModel"
          />
          <h1 class="pb-5">
            {{ product.name }}

          </h1>
<!--          <div class="flex justify-between">-->
<!--            <p v-if="product && product.collection">-->
<!--              {{ product.collection.description }}-->
<!--            </p>-->
<!--          </div>-->
        </div>
        <div class="lg:min-h-[500px]">
          <div class="flex flex-col lg:flex-row justify-start ">
            <filters-model-family-filter-detail
              class="lg:min-w-[200px]" :product="product" :product-variants-data="productVariantsData"
              :model-name="product.name"
              :material="material" :color="color" :active-casing="actualCasing"
              @change-model="changeModel"
            />
            <MaterialColorFilterDetail
              class="pt-0 md:pt-12 lg:pt-0  lg:pl-16"
              :active-filters="activeFilters"
              :material="material"
              :color="color"
              :product-materials="productMaterials" @change-filter="getActualDoorVariantData"
            />
          </div>

          <!--          <glass-type-filter-detail @change-glass-decor="changeGlass" :glass_decor="product.glass_decor" -->
          <!--                                    v-if="product.glass_decor && product.glass_decor[0]" :newGlass="newGlass"/> -->
        </div>
        <div class="w-full flex flex-col justify-between items-start">
          <DoorCardPriceDetail class="pb-8" :actualCasing="actualCasing" :color="color" :material="material" :productCasings="productCasings" :casingVariants="casingVariants" :door-variant-data="doorVariantData" :product="product" :new-glass="newGlass" />
          <div class="flex justify-start lg:flex-row gap-x-10 lg:gap-x-20 w-full " >
            <buttons-primary-button-big @click="openContactUsModal" class="w-1/2 lg:w-60 max-w-[240px] h-16 bg-primaryDark text-white">
              Купить
            </buttons-primary-button-big>
            <buttons-primary-button-big @click="openDoorTechInfoModal" class="w-1/2 lg:w-60 max-w-[240px] h-16 bg-primaryDark text-white" >
              Информация
            </buttons-primary-button-big>
            <!--            <buttons-primary-button-big class="w-1/2 lg:w-60 h-16 bg-primaryDark whitespace-nowrap text-white">В -->
            <!--              избранное -->
            <!--            </buttons-primary-button-big> -->
          </div>
        </div>
      </div>
    </div>

    <!-- mobile screen -->

    <div v-if="viewport.isMobile" class=" block md:flex gap-10 lg:gap-20">
      <div class="door-card-detail" :class="{ 'border-b border-gray-300': y !== 0 }">
        <DoorCardDetail
          class="" :door-variant="doorVariantData" :product="product"

          :new-glass="newGlass"
        />
        <DoorCardPriceDetail class="pb-2 md:pb-4 flex justify-center" :actualCasing="actualCasing" :color="color" :material="material" :productCasings="productCasings" :casingVariants="casingVariants" :door-variant-data="doorVariantData" :product="product" :new-glass="newGlass" />
      </div>

      <div class="h-4 flex justify-end">
        <ArrowDownIcon v-if="y === 0" class="h-8" />
        <div v-else class="h-4  " />
      </div>
      <div class="left md:w-[38%]">
        <div class="flex md:hidden  flex-col justify-start items-start mb-2 md:mb-3">
          <div
            class="pt-4 lg:pt-0 inline-flex flex-col lg:flex-row items-start justify-between w-full pb-2"
          >
            <h2 class=" py-2 mb-2   c font-regular" @click="openCollection">
              <span class="underline-static"> {{ product.collection.name }}</span>
            </h2>
          </div>
          <h1 class="pb-5">
            {{ product.name }}
          </h1>

          <SaleInfoDetail v-if="doorVariantData.sale" class="pt-6 pb-4" :door-variant-data="doorVariantData" />
        </div>
        <CasingFilterDetail
          v-if="doorVariantData" class="lg:mb-8 md:mb-0 lg:pt-2 md:pl-0 pl-1"
          :material="material"
          :product-casings="productCasings"
          :casing-variants="casingVariants"
          :color="color" :start-casing="doorVariantData.casing_variant.casing"
          @change-filter="changeCasing"
        />
      </div>
      <div class="right w-full ">
        <div class="hidden md:flex h-40 flex-col justify-start items-start mb-3">
          <div class="flex w-full">
            <buttons-primary-button-big
              class="pt-4 lg:pt-0 flex flex-col lg:flex-row items-start justify-between w-full pb-4"
              @click="openCollection"
            >
              <h2 class="underline-static font-regular">
                {{ product.collection.name }}
              </h2>
            </buttons-primary-button-big>
            <SaleInfoDetail v-if="doorVariantData.sale" :door-variant-data="doorVariantData" />
          </div>
<!--          <AllCollectionsModalDetail-->
<!--            v-if="isCollectionModelOpen" :color="color"-->
<!--            :material="material" :collection-products="collectionProducts" :product="product"-->
<!--            @close="isCollectionModelOpen = false"-->
<!--            @close-modal="closeCollection" @change-model="changeModel"-->
<!--          />-->
          <h1 class="pb-5">
            {{ product.name }}
          </h1>
<!--          <div class="flex justify-between">-->
<!--            <p v-if="product && product.collection">-->
<!--              {{ product.collection.description }}-->
<!--            </p>-->
<!--          </div>-->
        </div>
        <div class="lg:min-h-[430px]">
          <div class="flex flex-col lg:flex-row justify-start ">
            <filters-model-family-filter-detail
              class="lg:min-w-[200px]" :product="product" :product-variants-data="productVariantsData"
              :model-name="product.name"
              :material="material" :color="color" :active-casing="actualCasing"
              @change-model="changeModel"
            />
            <MaterialColorFilterDetail
              class="pt-0 md:pt-12 lg:pt-0  lg:pl-8  md:pl-0 pl-1"
              :active-filters="activeFilters"
              :material="material"
              :color="color"
              :product-materials="productMaterials" @change-filter="getActualDoorVariantData"
            />
          </div>

          <!--          <glass-type-filter-detail @change-glass-decor="changeGlass" :glass_decor="product.glass_decor" -->
          <!--                                    v-if="product.glass_decor && product.glass_decor[0]" :newGlass="newGlass"/> -->
        </div>
        <div class="w-full flex flex-col justify-between items-start">
          <div
            class="flex justify-between lg:flex-row gap-x-10 lg:gap-x-20 w-full md:pl-0 pl-1 pt-8 md:pt-0"

          >
            <buttons-primary-button-big @click="openContactUsModal" class="w-1/2 max-w-[240px] lg:w-60 h-16 bg-primaryDark text-white ">
              Купить
            </buttons-primary-button-big>
                        <buttons-primary-button-big @click="openDoorTechInfoModal" class="w-1/2 max-w-[240px] lg:w-60 h-16 bg-primaryDark whitespace-nowrap text-white">
                          Информация
                        </buttons-primary-button-big>
          </div>
        </div>
      </div>
    </div>

    <!-- door image and filters block end  -->

    <div ref="imagesBlock" class="layout-images pt-16 lg:pt-24">
      <div class="image-container">
        <div
          v-for="image in layoutImages" :key="image.id" class="cursor-pointer"
          :class="`image-wrapper ${image.layout}${image.square ? ' square' : ''}`"
        >
          <nuxt-img :src="image.image" class="object-cover" :alt="image.project_name" @click="triggerModal(image)" />
          <ImageModal2
              class="absolute z-50 lg:overflow-visible overflow-auto" @close="selectedImage = null"
              :image="image" :open="image.image===selectedImage?.image"
          />
        </div>
      </div>
    </div>
    <ContactUsModal :should-open-modal="shouldOpenContactUsModal" />
    <DoorTechInfoModal :should-open-modal="shouldOpenDoorTechInfoModal" :data="doorVariantData" :product="product"/>
    <Pagination
      v-if="total > 0" v-model:current-page="page" class="pt-12 pb-32 flex justify-center"
      :total="total"
      :page_size="page_size"
      :pages-count="pagesCount"
      @page-change="onChangePage"
    />
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
.image-wrapper {
  background-image: linear-gradient(to bottom, #ffffff, #cccccc);
  background-size: cover;
}
</style>
