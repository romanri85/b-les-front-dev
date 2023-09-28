<script setup lang="ts">

import {toNumber} from "@vue/shared";

const props = defineProps({
  doorVariantData: Object,
  product: Object,
  newGlass: Object,
})
</script>

<template>
  <div class="pb-8">
    <div v-if="product.glass_decor.length > 0">
      <h2 v-if="doorVariantData && doorVariantData.casing_variant" class="font-regular">
        <!-- Display sale price with glass price if is_sale_active is true -->
        <span v-if="doorVariantData.sale">
        {{
            toNumber(doorVariantData.sale.sale_leaf_price) + toNumber(doorVariantData.casing_variant.price) + toNumber(newGlass.price || product.glass_decor.find((item: GlassDecorItem) => item.initial === true).price)
          }}&nbsp;₽&nbsp;&nbsp;&nbsp;&nbsp;
      </span>
        <!-- Always display the original price, conditionally grayed out and line-through -->
        <span :class="doorVariantData.sale ? 'text-gray-400 line-through' : ''">
        {{
            toNumber(doorVariantData.leaf_price) + toNumber(doorVariantData.casing_variant.price) + toNumber(newGlass.price || product.glass_decor.find((item: GlassDecorItem) => item.initial === true).price)
          }}&nbsp;₽
      </span>
      </h2>
    </div>
    <div v-else>
      <h2 class="font-bold">
        <!-- Display sale price if is_sale_active is true -->
        <span v-if="doorVariantData.sale">
        {{ toNumber(doorVariantData.sale.sale_leaf_price) + toNumber(doorVariantData.casing_variant.price) }}&nbsp;₽&nbsp;&nbsp;&nbsp;&nbsp;
      </span>
        <!-- Always display the original price, conditionally grayed out and line-through -->
        <span :class="doorVariantData.sale ? 'text-gray-400 line-through' : ''">
        {{ toNumber(doorVariantData.leaf_price)  +  toNumber(doorVariantData.casing_variant.price)}}&nbsp;₽
      </span>
      </h2>
    </div>
    <!--             <pre>{{doorVariantData}}</pre>-->
  </div>
</template>

<style scoped>

</style>