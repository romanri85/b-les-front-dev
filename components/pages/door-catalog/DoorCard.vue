<script setup lang="ts">

import {toNumber} from "@vue/shared";

const isLoading = ref(true);

// Function to set loading to false when the image is loaded
const onImageLoaded = () => {
  isLoading.value = false;
};

const props = defineProps({
  doorVariant: Object
})

import { ref } from 'vue';

const imageDiv = ref(null);

const mouseOver = () => {
  if (imageDiv.value) {
    imageDiv.value.classList.add('hover:border-black');
  }
};

const mouseLeave = () => {
  if (imageDiv.value) {
    imageDiv.value.classList.remove('hover:border-black');
  }
};

</script>

<template>
  <!--    <client-only>-->
  <div  @mouseover="mouseOver"
        @mouseleave="mouseLeave" class="relative flex flex-col items-center">
    <div
        v-if="props.doorVariant.sale"
        class="absolute top-0 left-4  p-1">
      <h4 class="font-light">Акция</h4>
    </div>

    <div ref="imageDiv" class="relative top-4 w-full flex justify-center pb-8 md:mb-5 border-b-2 border-transparent transition-all duration-300 ease-in-out">
      <!-- Preloader -->
      <div v-if="isLoading" class="hidden md:hidden lg:hidden sm:block sm:preloader">
        <div class="hidden md:hidden lg:hidden sm:block sm:spinner"></div>
      </div>

      <!-- Image -->
      <nuxt-img
          width="160"
          placeholder
          height="auto"
          :src="props.doorVariant.merged_image"
          class="h-auto w-48 mdLg:w-40"
          @load="onImageLoaded"
      ></nuxt-img>
    </div>

    <div class="flex flex-col items-center pt-5">
      <h3 class="pb-3">{{ props.doorVariant.product_variant.name }}</h3>

      <p class="pb-3 uppercase">{{ props.doorVariant.product_variant.collection_name }}</p>
      <div class="pb-3 inline-flex">
        <p>{{ props.doorVariant.product_variant.material.name + ", " + " " }}&nbsp;</p>
        <p>{{ props.doorVariant.color.name }}</p>
      </div>
      <p class="font-regular">
        <!-- First span: Displayed only if is_sale_active is true -->
        <span
            v-if="props.doorVariant.sale">
    {{ toNumber(props.doorVariant.sale.sale_leaf_casing_price) }}₽&nbsp;&nbsp;
  </span>

        <!-- Second span: Line-through and gray color only if is_sale_active is true -->
        <span
            :class="props.doorVariant.sale ? 'line-through text-gray-400' : ''">
    {{ toNumber(props.doorVariant.leaf_casing_price) }}&nbsp;₽
  </span>
      </p>

    </div>
  </div>
  <!--    </client-only>-->

</template>

<style scoped>
.hover\:border-black {
  border-color: black !important;
}


</style>