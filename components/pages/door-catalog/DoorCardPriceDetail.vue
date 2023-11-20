<script setup lang="js">
import CatalogDetailPriceDescription from "~/components/pop-ups/CatalogDetailPriceDescription.vue";
import BaseCalculatorIcon from "~/components/base/icons/BaseCalculatorIcon.vue";
import {usePrompt} from '~/composables/usePrompt';
import {useViewportSize} from "~/composables/useViewportSize";

import '@vueuse/core' //

const {show, promptText, showPrompt, hidePrompt, promptStyle} = usePrompt();

const props = defineProps({
  doorVariantData: Object,
  product: Object,
  newGlass: Object,
  casingVariants: Object,
  productCasings: Object,
  material: Number,
  color: Number,
  actualCasing: Number,
})

const viewport = useViewportSize()

const shouldOpenModal = ref(0)

const saleLeafPrice = computed(() => {
  return parseInt(props.doorVariantData.sale.sale_leaf_price)
})

const leafPrice = computed(() => {
  return parseInt(props.doorVariantData.leaf_price)
})

const framePrice = computed(() => {
  return parseInt(props.doorVariantData.frame_price)
})

const casingPrice = computed(() => {
  return parseInt(props.doorVariantData.casing_variant.price)
})

const saleLeafCasingFramePrice = computed(() => {
  return saleLeafPrice.value + casingPrice.value + framePrice.value
})

const leafCasingFramePrice = computed(() => {
  return leafPrice.value + casingPrice.value + framePrice.value
})

function openPriceDescriptionModal() {
  shouldOpenModal.value = shouldOpenModal.value + 1
}

const priceProps = computed(() => {
  if (props.doorVariantData.sale) {
    return {
      leafPrice: saleLeafPrice.value,
      casingPrice: casingPrice.value,
      framePrice: framePrice.value,
      totalPrice: saleLeafCasingFramePrice.value
    };
  } else {
    return {
      leafPrice: leafPrice.value,
      casingPrice: casingPrice.value,
      framePrice: framePrice.value,
      totalPrice: leafCasingFramePrice.value
    };
  }
});

const sortedCasings = computed(() => {
  return [...props.productCasings[props.material]].sort((a, b) => a.casing_name.localeCompare(b.casing_name))
})
</script>

<template>
  <div>
    <div @mouseover="() => showPrompt('Рассчитать стоимость двери самостоятельно')"
         @mouseleave="hidePrompt"
         @click="openPriceDescriptionModal" class="flex cursor-pointer">
      <div v-if="props.doorVariantData.sale && (viewport.isTablet || viewport.isMobile)" class="">
        <div>
          <h3 class="font-regular'">

            <!-- Display sale price if is_sale_active is true -->
            <span v-if="props.doorVariantData.sale">
          {{
                saleLeafCasingFramePrice
              }}&nbsp;₽&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
            <!-- Always display the original price, conditionally grayed out and line-through -->
            <span :class="props.doorVariantData.sale ? 'text-gray-400 line-through' : ''">
          {{
                leafCasingFramePrice
              }}&nbsp;₽
        </span>
          </h3>
        </div>
      </div>
      <div v-else class="">
        <div>
          <h2 class="font-regular'">

            <!-- Display sale price if is_sale_active is true -->
            <span v-if="props.doorVariantData.sale">
          {{
                saleLeafCasingFramePrice
              }}&nbsp;₽&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
            <!-- Always display the original price, conditionally grayed out and line-through -->
            <span :class="props.doorVariantData.sale ? 'text-gray-400 line-through' : ''">
          {{
                leafCasingFramePrice
              }}&nbsp;₽
        </span>
          </h2>
        </div>
      </div>
      <div class="flex items-center">
        <BaseCalculatorIcon class=" ml-8 cursor-pointer"/>
        <h3 class="ml-3 underline-static">Расчет</h3>
        <catalog-detail-price-description
            :actualCasing="props.actualCasing || props.doorVariantData.casing_variant.casing" :product="props.product"
            :doorVariantData="props.doorVariantData" :color="color" :sortedCasings="sortedCasings"
            :priceProps="priceProps" :should-open-modal="shouldOpenModal"/>
        <!--   <pre>{{props.casingVariants}}</pre>-->
      </div>

    </div>
    <div v-if="show && viewport.isDesktop" class="prompt" :style="promptStyle">
      {{ promptText }}
    </div>
  </div>
</template>

<style scoped>
.prompt {
  @apply bg-white p-2  shadow-md shadow-primaryDark;
}
</style>
