<script setup lang="ts">

import {toNumber} from "@vue/shared";

const props = defineProps({
  value: String,
  doorVariant: Object
})

</script>

<template>
  <client-only>
  <div class="flex flex-col items-center pb-12">
    <div class="relative pb-8">
      <nuxt-img width="200px" height="auto" :src="props.doorVariant.casing_variant.image" class="h-auto w-48"></nuxt-img>
      <nuxt-img width="200px" height="auto"
                :src="props.doorVariant.leaf_image"
                class="h-auto w-48 absolute top-0"></nuxt-img>
    </div>

    <div class="flex flex-col items-center">
      <h3 class="pb-3">{{props.doorVariant.product_variant.product.name}}</h3>

      <h6 class="pb-3 uppercase">{{props.doorVariant.product_variant.product.collection.name}}</h6>
      <div class="pb-3 inline-flex">
        <p>{{ props.doorVariant.product_variant.material.name + ", " + " "}}&nbsp;</p>
        <p>{{ props.doorVariant.color.name}}</p>
      </div>
      <p class="font-regular">{{ toNumber(props.doorVariant.price) + toNumber(props.doorVariant.casing_variant.price)}}&nbsp;₽</p>
    </div>
  </div>
  </client-only>
</template>

<style scoped>

</style>