<script setup lang="ts">
import Cookies from 'js-cookie'
import { onMounted } from 'vue'
import WhereToBuyMap from '~/components/pages/where-to-buy/WhereToBuyMap.vue'
import CityDialog from '~/components/pop-ups/CityDialog.vue'
import { baseURL } from '~/config'
import { findCity } from '~/utils/helpers'

definePageMeta({ layout: 'dark-header' })

const city = ref({})
const cities = ref([])
const addresses = ref({})
const geo = ref({})
const shouldOpenModal = ref(0)

const isCityLoaded = computed(() => Object.keys(city.value).length > 0)
const isCityFound = ref(true)

// const browserLang = navigator.language || navigator.userLanguage;
// const isRussian = browserLang.startsWith('ru');
// const langParam = isRussian ? 'ru_RU' : 'en_US';
const langParam = 'ru_RU'
//
if (typeof ymaps === 'undefined') {
  useHead({
    script: [
      {
        src: `https://api-maps.yandex.ru/2.1/?apikey=4b36a04b-c3bd-460a-b5ad-72f6766c8765&lang=${langParam}`,
        // async: true,
      },
    ],
  })
}

async function getAddresses() {
  addresses.value = await $fetch(`${baseURL}/api/shops/`)
  geo.value = Cookies.get('geolocation') || { country: 'Russia', city: 'Moscow', region: 'Moscow' }
  geo.value = typeof geo.value === 'object' ? geo.value : JSON.parse(geo.value)
  console.log(geo.value.region, 'geo object')
  cities.value = addresses.value.cities
  city.value = findCity(addresses.value.cities, geo.value.region)
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
  city.value = cities.value.find(city => city.id === newCityId)
}

function openCityModal() {
  shouldOpenModal.value = shouldOpenModal.value + 1
}
</script>

<template>
  <div class=" relative z-10 main-container">
    <div class="mt-10 lg:pr-72">
      <div class=" flex justify-start items-end">
        <h4>Главная / Где купить</h4>
      </div>
    </div>

    <h1 v-if="isCityLoaded && city" class="mt-10 pb-8" @click="openCityModal">
      Салоны в <span
        class="border-b-2 border-b-black cursor-pointer"
      >{{ city.dative_case_name || 'Москве' }}</span>
    </h1>
    <!--    <h5 class="pb-4" v-if="!isCityFound">К сожалению, в вашем регионе нет наших магазинов, или представителей. Но мы можем доставить двери в любой регион России.</h5> -->

    <CityDialog :should-open-modal="shouldOpenModal" :city="city" :cities="cities" @change-city="changeCity" />
    <client-only>
      <WhereToBuyMap v-if="addresses && geo.region && city" :city="city" :addresses="addresses" :geo="geo" />
    </client-only>
  </div>
</template>

<style scoped>

</style>
