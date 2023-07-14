<script setup lang="ts">

import PriceSlider from "~/components/base/PriceSlider.vue";

definePageMeta({layout: "dark-header"});
</script>

<template>
  <div class="main-container">
    <div class="mt-10 pr-72">
      <div class=" flex justify-start items-end"><h4>Главная / Где купить</h4></div>
    </div>


    <h1 class="mt-10 pb-5">Салоны в Москве</h1>

    <price-slider class="mb-24"/>

  </div>
</template>

<style scoped>

</style>