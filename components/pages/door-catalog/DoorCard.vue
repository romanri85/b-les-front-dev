<script setup lang="ts">

import {toNumber} from "@vue/shared";
import {baseURL} from "~/config";

const props = defineProps({
  doorVariant: Object
})

</script>

<template>
<!--    <client-only>-->
        <div class="flex flex-col items-center">
          <div class="relative px-10 pb-8 mb-4 border-b-4 border-transparent  hover:border-black">
<!--            <nuxt-img width="200px" height="auto" :src="props.doorVariant.casing_variant.image"-->
<!--                      class="h-auto w-48"></nuxt-img>-->
<!--            <nuxt-img width="200px" height="auto"-->
<!--                      :src="props.doorVariant.leaf_image"-->
<!--                      class="h-auto w-48 absolute top-0"></nuxt-img>-->
                        <nuxt-img width="160"  height="auto" :src="props.doorVariant.merged_image"
                                  class="h-auto w-48 mdLg:w-40"></nuxt-img>
          </div>

          <div class="flex flex-col items-center">
            <h4 class="pb-3">{{ props.doorVariant.product_variant.name }}</h4>

            <p class="pb-3 uppercase">{{ props.doorVariant.product_variant.collection_name }}</p>
            <div class="pb-3 inline-flex">
              <p>{{ props.doorVariant.product_variant.material.name + ", " + " " }}&nbsp;</p>
              <p>{{ props.doorVariant.color.name }}</p>
            </div>
            <p class="font-regular">
              {{ toNumber(props.doorVariant.leaf_casing_price) }}&nbsp;₽</p>
          </div>
        </div>
<!--    </client-only>-->

</template>

<style scoped>

</style>