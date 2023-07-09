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

    <div v-if="props.doorVariant" class="flex flex-col items-center pb-8">
      <div v-if="props.doorVariant.casing_variant" class="relative pb-8">
        <nuxt-img width="290px" height="auto" :src="props.doorVariant.casing_variant.image"
                  class="h-auto w-72"></nuxt-img>
        <nuxt-img width="290px" height="auto"
                  :src="props.doorVariant.leaf_image"
                  class="h-auto w-72 absolute top-0"></nuxt-img>
        <nuxt-img  v-if="props.newGlass && props.newGlass.image" width="290px" height="auto"
                  :src="props.newGlass.image"
                  class="h-auto w-72 absolute top-0"></nuxt-img>

      </div>

      <div class="flex flex-col items-center">
        <div v-if="props.newGlass.price">
        <p v-if="props.doorVariant && props.doorVariant.casing_variant " class="font-regular">

          {{ toNumber(props.doorVariant.price) + toNumber(props.doorVariant.casing_variant.price) + toNumber(props.newGlass.price)}}&nbsp;₽</p>
        </div>
        <div v-else>
        <p class="font-regular">
          {{ toNumber(props.doorVariant.price) + toNumber(props.doorVariant.casing_variant.price) + toNumber(initialGlass.price)}}&nbsp;₽</p>
        </div>
      </div>
    </div>
<!--  </client-only>-->

</template>

<style scoped>

</style>