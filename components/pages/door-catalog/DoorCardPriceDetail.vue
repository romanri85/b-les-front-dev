<script setup lang="js">
import CatalogDetailPriceDescription from "~/components/pop-ups/CatalogDetailPriceDescription.vue";
import BaseQuestionIcon from "~/components/base/icons/BaseQuestionIcon.vue";

const props = defineProps({
  doorVariantData: Object,
  product: Object,
  newGlass: Object,
  casingVariants: Array,
  productCasings: Object,
  material: Number,
  color: Number,
  actualCasing: Number,
})

const shouldOpenModal = ref(0)

const saleLeafPrice = computed(() => {
    return  parseInt(props.doorVariantData.sale.sale_leaf_price)
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
  <div class="flex">
<!--    <pre>{{props.doorVariantData}}</pre>-->
    <div class="">
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
    <div class="flex items-center" @click="openPriceDescriptionModal">
      <BaseQuestionIcon class=" ml-6 cursor-pointer"/>

      <catalog-detail-price-description :actualCasing="props.actualCasing" :product="props.product" :doorVariantData="props.doorVariantData"  :color="color" :sortedCasings="sortedCasings" :priceProps="priceProps" :should-open-modal="shouldOpenModal"/>
<!--   <pre>{{props.casingVariants}}</pre>-->
    </div>

  </div>
</template>

<style scoped>

</style>
