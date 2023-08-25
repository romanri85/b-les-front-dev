<script setup lang="ts">

import WhereToBuyMap from "~/components/pages/where-to-buy/WhereToBuyMap.vue";
import CityDialog from "~/components/pop-ups/CityDialog.vue";
import {baseURL} from "~/config";
import Cookies from "js-cookie";
import {findCity} from "~/utils/helpers";
import {onMounted} from "vue";


definePageMeta({layout: "dark-header"});

const city = ref({})
const cities = ref([])
const addresses = ref({})
const geo = ref({})
const shouldOpenModal = ref(0)


const isCityLoaded = computed(() => Object.keys(city.value).length > 0)
const isCityFound = ref(true)


async function getAddresses() {
  addresses.value = await $fetch(`${baseURL}/api/shops/`)
  geo.value = Cookies.get('geolocation') || {"country": "Netherlands", "city": "Amsterdam", "region": "North Holland"}
  geo.value = typeof geo.value === "object" ? geo.value : JSON.parse(geo.value)
  console.log(geo.value.region, 'geo object')
  cities.value = addresses.value.cities
  city.value = findCity(addresses.value.cities, geo.value.region);
  isCityFound.value = city.value.isFound
  city.value = city.value.city
  console.log(city.value, 'city')
  console.log(geo.value.region, 'region')
  console.log(addresses.value, 'addresses')
  // changeCity(city.value)
}

onMounted(async () => {
  await getAddresses()
  // console.log(cities.value, 'city')
})


function changeCity(newCityId) {
  city.value = cities.value.find(city => city.id === newCityId);
}

function onParentButtonClick() {
  shouldOpenModal.value = shouldOpenModal.value + 1
}

</script>

<template>
  <div class=" relative z-10 main-container">
    <div class="mt-10 pr-72">
      <div class=" flex justify-start items-end"><h4>Главная / Где купить</h4></div>
    </div>

    <h1 @click="onParentButtonClick" v-if="isCityLoaded && city" class="mt-10 pb-8">Салоны в <span
        class="border-b-2 border-b-black cursor-pointer">{{ city.dative_case_name || 'Москве' }}</span></h1>
    <!--    <h5 class="pb-4" v-if="!isCityFound">К сожалению, в вашем регионе нет наших магазинов, или представителей. Но мы можем доставить двери в любой регион России.</h5>-->

    <city-dialog :should-open-modal="shouldOpenModal" :city="city" :cities="cities" @change-city="changeCity"/>
    <where-to-buy-map v-if="addresses && geo.region && city" :city="city" :addresses="addresses" :geo="geo"/>
  </div>
</template>

<style scoped>

</style>