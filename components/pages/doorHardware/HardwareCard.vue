<script setup lang="ts">

import {toNumber} from "@vue/shared";
import {baseURL} from "~/config";

const props = defineProps({
  hardwareVariant: Object
})

</script>

<template>
<!--    <client-only>-->
        <div class="flex flex-col items-center pb-12">
          <div class="relative pb-8">
<!--            <nuxt-img width="200px" height="auto" :src="props.doorVariant.casing_variant.image"-->
<!--                      class="h-auto w-48"></nuxt-img>-->
<!--            <nuxt-img width="200px" height="auto"-->
<!--                      :src="props.doorVariant.leaf_image"-->
<!--                      class="h-auto w-48 absolute top-0"></nuxt-img>-->
                        <nuxt-img width="200px" height="auto" :src="props.hardwareVariant.image"
                                  class="h-auto w-36 lg:w-48"></nuxt-img>
          </div>

          <div class="flex flex-col items-center">
            <h3 class="pb-3">{{ props.hardwareVariant.hardware.name }}</h3>

            <div class="pb-3 inline-flex">
              <p>{{ props.hardwareVariant.color.color }}</p>
            </div>
            <p class="font-regular">
              {{ toNumber(props.hardwareVariant.price)}}&nbsp;₽</p>
          </div>
        </div>
<!--    </client-only>-->

</template>

<style scoped>

</style>