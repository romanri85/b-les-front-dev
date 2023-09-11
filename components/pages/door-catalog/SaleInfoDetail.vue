<script setup lang="ts">

const props = defineProps({
  doorVariantData: Object
})

</script>

<template>
<div>
  <h3 class="whitespace-nowrap pt-4" v-if="props.doorVariantData.sale">
    <!-- Check if doorVariantData.sale is equal to 1 -->
    <span v-if="props.doorVariantData.sale.sale_type === 1">
    - {{ props.doorVariantData.sale.discount }}% на полотно
  </span>
    <!-- Check if doorVariantData.sale is equal to 2 -->
    <span v-else-if="props.doorVariantData.sale.sale_type === 2">
    - {{ props.doorVariantData.sale.discount }}% на комплект
  </span>
    <!-- Optional: Add a default case if you need it -->
    <span v-else>
    - {{ props.doorVariantData.sale.discount }}%
  </span>
  </h3>
</div>
</template>

<style scoped>

</style>