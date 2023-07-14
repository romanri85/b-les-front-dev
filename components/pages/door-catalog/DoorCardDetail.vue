<script setup lang="ts">

import {toNumber} from "@vue/shared";
import {baseURL} from "~/config";

const props = defineProps({
  doorVariant: Object,
  product: Object,
  newGlass: Object
})


const initialGlass = props.product.glass_decor.find((item: GlassDecorItem) => item.initial === true) || {price:0}
</script>

<template>
<!--  <client-only>-->

    <div v-if="props.doorVariant" class="flex flex-col items-center pb-8 relative right-16">
      <div v-if="props.doorVariant.casing_variant" class="relative pb-8">
        <nuxt-img placeholder width="290px" height="auto" :src="props.doorVariant.casing_variant.image"
                  class="h-auto w-72"></nuxt-img>
        <nuxt-img placeholder width="290px" height="auto"
                  :src="props.doorVariant.leaf_image"
                  class="h-auto w-72 absolute top-0"></nuxt-img>
        <nuxt-img  v-if="props.newGlass && props.newGlass.image && (props.product.glass_decor.length > 0)" width="290px" height="auto"
                  :src="props.newGlass.image"
                  class="h-auto w-72 absolute top-0"></nuxt-img>

      </div>


    </div>
<!--  </client-only>-->

</template>

<style scoped>

</style>