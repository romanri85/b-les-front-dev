<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  hit: Object,
})

const imageDiv = ref(null)

function mouseOver() {
  if (imageDiv.value)
    imageDiv.value.classList.add('hover:border-black')
}

function mouseLeave() {
  if (imageDiv.value)
    imageDiv.value.classList.remove('hover:border-black')
}
</script>

<template>
  <Head>
    <title>Брянский лес - Поиск</title>
  </Head>
  <!--    <client-only> -->
  <div
    class="relative flex flex-col items-center"
    @mouseover="mouseOver" @mouseleave="mouseLeave"
  >
    <!--    <div -->
    <!--        v-if="props.doorVariant.sale" -->
    <!--        class="absolute top-0 left-4  p-1"> -->
    <!--      <h4 class="font-regular">Акция</h4> -->
    <!--    </div> -->

    <div ref="imageDiv" class="relative top-4 w-full flex justify-center pb-8 mb-5 border-b-2 border-transparent transition-all duration-300 ease-in-out">
      <nuxt-img
        width="160" height="auto" :src="`https://b-les-storage.ams3.digitaloceanspaces.com/media/${props.hit.merged_image}`"
        class="h-auto w-48 mdLg:w-40"
      />
    </div>

    <div class="flex flex-col items-center pt-5">
      <h3 class="pb-3">
        {{ props.hit.product_variant.name }}
      </h3>

      <p class="pb-3 uppercase">
        {{ props.hit.product_variant.collection }}
      </p>
      <div class="pb-3 inline-flex">
        <p>{{ `${props.hit.color.material_display}, ` + ` ` }}&nbsp;</p>
        <p>{{ props.hit.color.name }}</p>
      </div>
      <p class="font-regular">
        <!-- First span: Displayed only if is_sale_active is true -->
        <span
          v-if="props.hit.sale"
        >
          {{ parseInt(props.hit.sale.sale_leaf_casing_price) }}₽&nbsp;&nbsp;
        </span>

        <!-- Second span: Line-through and gray color only if is_sale_active is true -->
        <span
          :class="props.hit.sale ? 'line-through text-gray-400' : ''"
        >
          {{ parseInt(props.hit.leaf_casing_price) }}&nbsp;₽
        </span>
      </p>
    </div>
  </div>
  <!--    </client-only> -->
</template>

<style scoped>
.hover\:border-black {
  border-color: black !important;
}
</style>
