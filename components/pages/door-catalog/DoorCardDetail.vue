<script setup lang="ts">

import {toNumber} from "@vue/shared";
import {baseURL} from "~/config";

const props = defineProps({
  doorVariant: Object,
  product: Object
})

</script>

<template>
<!--  <client-only>-->
    <div v-if="props.doorVariant" class="flex flex-col items-center pb-12">
      <div v-if="props.doorVariant.casing_variant" class="relative pb-8">
        <nuxt-img width="290px" height="auto" :src="props.doorVariant.casing_variant.image"
                  class="h-auto w-72"></nuxt-img>
        <nuxt-img width="290px" height="auto"
                  :src="props.doorVariant.leaf_image"
                  class="h-auto w-72 absolute top-0"></nuxt-img>
      </div>

      <div class="flex flex-col items-center">
        <h3 class="pb-3">{{ props.product.name }}</h3>

        <h6 v-if="props.product.collection" class="pb-3 uppercase">{{ props.product.collection.name }}</h6>
        <div v-if="props.doorVariant.color" class="pb-3 inline-flex">
          <p>{{ props.doorVariant.color.material_name + ", " + " " }}&nbsp;</p>
          <p>{{ props.doorVariant.color.name }}</p>
        </div>
        <p v-if="props.doorVariant && props.doorVariant.casing_variant" class="font-regular">
          {{ toNumber(props.doorVariant.price) + toNumber(props.doorVariant.casing_variant.price) }}&nbsp;₽</p>
      </div>
    </div>
<!--  </client-only>-->

</template>

<style scoped>

</style>