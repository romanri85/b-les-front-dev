<script setup lang="js">
import {onMounted} from 'vue'
import WhereToBuyMap from '~/components/pages/where-to-buy/WhereToBuyMap.vue'
import CityDialog from '~/components/pop-ups/CityDialog.vue'
import {baseURL} from '~/config'
import {findCity} from '~/utils/helpers'
import {useStorage} from '@vueuse/core';

const storageCityStore = useStorage('storage-city-store', {"country":"Russia","city":"Moscow","region":"Moscow"});

definePageMeta({layout: 'dark-header'})

const city = ref({})
const cities = ref([])
const addresses = ref({})
const geo = ref(storageCityStore.value.geo || {"country":"Russia","city":"Moscow","region":"Moscow"})
const region = ref('Moscow')
const shouldOpenModal = ref(0)
const showConfirmation = ref(true);

const isCityLoaded = computed(() => Object.keys(city.value).length > 0)

const geoArray = ref([])



const langParam = 'ru_RU'
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
console.log(geo.value, 'geo before find city')
    storageCityStore.value.isCityFound = true

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
  cities.value = await $fetch(`${baseURL}/api/shops/cities`).then(res => res.cities)

    geoArray.value = cities.value.map(city => city.ip_check_names).flat();
    if (geoArray.value.includes(geo.value.region)) {
      city.value = findCity(cities.value, geo.value.region)
      city.value = city.value.city
    } else {
      city.value = findCity(cities.value, 'Moscow')
      city.value = city.value.city

    }



}

onMounted(async () => {
  await getCities()
  await getAddresses()


})

function changeCity(newCityId) {
  const cityName = cities.value.find(city => city.id === newCityId)

  region.value = cityName.ip_check_names[0]
  city.value = findCity(cities.value, region.value)
  city.value = city.value.city
  geo.value.region = region.value


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
    <div v-if="showConfirmation && !storageCityStore.isCityFound"
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

