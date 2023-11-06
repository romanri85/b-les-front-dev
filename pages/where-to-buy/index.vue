<script setup lang="js">
import {onMounted} from 'vue'
import WhereToBuyMap from '~/components/pages/where-to-buy/WhereToBuyMap.vue'
import CityDialog from '~/components/pop-ups/CityDialog.vue'
import {baseURL} from '~/config'
import {findCity} from '~/utils/helpers'
import {useCityStore} from "~/stores/cityStore";
import {useStorage} from '@vueuse/core';

const storageCityStore = useStorage('storage-city-store', {city: null, geo: null, isCityFound: false});


definePageMeta({layout: 'dark-header'})

const cityStore = useCityStore()
const city = ref({})
const cities = ref([])
const addresses = ref({})
const geo = ref({
  country: 'Russia',
  city: 'Moscow',
  region: 'Moscow',
})
const shouldOpenModal = ref(0)
const showConfirmation = ref(true);

const isCityLoaded = computed(() => Object.keys(city.value).length > 0)
const isCityFound = ref(true)

const geoArray = ref([])


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

function confirmCity(confirm) {
  showConfirmation.value = false;
  if (confirm) {
    cityStore.city = city.value
    cityStore.geo = geo.value
    isCityFound.value = true
    storageCityStore.value.city = city.value
    storageCityStore.value.geo = geo.value
    storageCityStore.value.isCityFound = true
    // Cookies.set('geolocation', JSON.stringify(geo.value), {expires: 365})
  }
  if (!confirm) {
    openCityModal();
  }
}

async function getAddresses() {
  try {
    addresses.value = await $fetch(`${baseURL}/api/shops/`)
  } catch (error) {
    console.error('Failed to fetch addresses:', error)
  }
}

async function getCities() {
  if (!storageCityStore.value.city || !storageCityStore.value.geo) {

    // geo.value = Cookies.get('geolocation') || {country: 'Russia', city: 'Moscow', region: 'Moscow'}
    geo.value = {country: null, city: null, region: null}
    // geo.value = typeof geo.value === 'object' ? geo.value : JSON.parse(geo.value)
    cities.value = await $fetch(`${baseURL}/api/shops/cities`).then(res => res.cities)
    geoArray.value = cities.value.map(city => city.ip_check_names).flat();
    if (geoArray.value.includes(geo.value.region)) {
      city.value = findCity(cities.value, geo.value.region)
      isCityFound.value = city.value.isFound
      city.value = city.value.city
    } else {
      geo.value = {country: 'Russia', city: 'Moscow', region: 'Moscow'}
      city.value = findCity(cities.value, geo.value.region)
      isCityFound.value = city.value.isFound
      city.value = city.value.city

    }
    console.log(geo.value, 'geo after find city')

  } else {
    cities.value = await $fetch(`${baseURL}/api/shops/cities`).then(res => res.cities)
    city.value = storageCityStore.value.city
    geo.value = storageCityStore.value.geo
    isCityFound.value = true
  }

}

onMounted(async () => {
  if (!storageCityStore.value.city) {
    await getCities()
    await getAddresses()
  } else {
    city.value = storageCityStore.value.city
    geo.value = storageCityStore.value.geo
    isCityFound.value = true
    await getCities()
    await getAddresses()

  }
  // await getCities()
  // await getAddresses()
})

function changeCity(newCityId) {
  city.value = cities.value.find(city => city.id === newCityId)

  cityStore.city = city.value
  cityStore.geo = geo.value
  isCityFound.value = true
  storageCityStore.value.city = city.value
  storageCityStore.value.geo = geo.value
  storageCityStore.value.isCityFound = true


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
    <div v-if="showConfirmation && !storageCityStore.city"
         class="confirmation-button shadow-md shadow-primaryDark bg-white">

      <span class="font-sans">Ваш город {{ city.name || 'Москва' }}?</span>
      <button class="font-sans underline-static" @click="confirmCity(true)">Да</button>
      <button class="font-sans underline-static" @click="confirmCity(false)">Нет</button>
    </div>
    <div class="mt-10 lg:pr-72">
      <div class=" flex justify-start items-end">
        <h4>Главная / Где купить</h4>
      </div>
    </div>

    <h1 v-if="isCityLoaded && city" class="text-2xl md:text-4xl mt-10 pb-8" @click="openCityModal">
      Магазины в <span
        class="border-b-2 whitespace-nowrap border-b-black cursor-pointer"
    >{{ city.dative_case_name || 'Москве' }}</span>
    </h1>

    <!--    <h5 class="pb-4" v-if="!isCityFound">К сожалению, в вашем регионе нет наших магазинов, или представителей. Но мы можем доставить двери в любой регион России.</h5> -->

    <CityDialog :should-open-modal="shouldOpenModal" :city="city" :cities="cities" @change-city="changeCity"/>
    <WhereToBuyMap v-if="isAddressesLoaded && geo.region && city" :city="city" :addresses="addresses" :geo="geo"/>
  </div>
</template>

<style scoped>
.confirmation-button {
  position: absolute;
  z-index: 100;
  top: 0;
  right: 0;
  max-width: 600px;
  min-width: 300px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

