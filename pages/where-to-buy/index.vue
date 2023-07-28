<script setup lang="ts">

import WhereToBuyMap from "~/components/pages/where-to-buy/WhereToBuyMap.vue";
import Cookies from 'js-cookie'


definePageMeta({layout: "dark-header"});

const geo = ref({})
onMounted(() => {
  geo.value = Cookies.get('geolocation')
//   if (geo.value) {
//     geo.value = JSON.parse(geo.value);
// }
})

</script>

<template>
  <p>{{geo}}</p>
  <div class="main-container">
    <div class="mt-10 pr-72">
      <div class=" flex justify-start items-end"><h4>Главная / Где купить</h4></div>
    </div>


    <h1 class="mt-10 pb-5">Салоны в Москве</h1>

    <where-to-buy-map/>
  </div>
</template>

<style scoped>

</style>