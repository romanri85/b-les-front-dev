<script setup lang="js">
import Cookies from 'js-cookie'
import {onMounted} from 'vue'
import WhereToBuyMap from '~/components/pages/where-to-buy/WhereToBuyMap.vue'
import CityDialog from '~/components/pop-ups/CityDialog.vue'
import {baseURL} from '~/config'
import {findCity} from '~/utils/helpers'

definePageMeta({layout: 'dark-header'})

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
  try {
    addresses.value = await $fetch(`${baseURL}/api/shops/`)
  } catch (error) {
    console.error('Failed to fetch addresses:', error)
  }
}

async function getCities() {
  geo.value = Cookies.get('geolocation') || {country: 'Russia', city: 'Moscow', region: 'Moscow'}
  geo.value = typeof geo.value === 'object' ? geo.value : JSON.parse(geo.value)
  cities.value = await $fetch(`${baseURL}/api/shops/cities`).then(res => res.cities)
  // cities.value = cities.value.cities
  city.value = findCity(cities.value, geo.value.region)
  isCityFound.value = city.value.isFound
  city.value = city.value.city
}

onMounted(async () => {
  await getCities()
  await getAddresses()
})

function changeCity(newCityId) {
  city.value = cities.value.find(city => city.id === newCityId)
}

function openCityModal() {
  shouldOpenModal.value = shouldOpenModal.value + 1
}
const isAddressesLoaded = computed(() => addresses.value.addresses)

</script>

<template>
  <Head>
    <title>Брянский лес - Где купить</title>
  </Head>
  <div class=" relative z-10 main-container">
    <div class="mt-10 lg:pr-72">
      <div class=" flex justify-start items-end">
        <h4>Главная / Где купить</h4>
      </div>
    </div>

    <h2 v-if="isCityLoaded && city" class=" mt-10 pb-8" @click="openCityModal">
      Салоны в <span
        class="border-b-2 whitespace-nowrap border-b-black cursor-pointer"
    >{{ city.dative_case_name || 'Москве' }}</span>
    </h2>

    <!--    <h5 class="pb-4" v-if="!isCityFound">К сожалению, в вашем регионе нет наших магазинов, или представителей. Но мы можем доставить двери в любой регион России.</h5> -->

    <CityDialog :should-open-modal="shouldOpenModal" :city="city" :cities="cities" @change-city="changeCity"/>
    <WhereToBuyMap v-if="isAddressesLoaded && geo.region && city" :city="city" :addresses="addresses" :geo="geo"/>
  </div>
</template>

<style scoped>

</style>
