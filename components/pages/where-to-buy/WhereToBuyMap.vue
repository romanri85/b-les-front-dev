<template>
  <div style="display: flex;">
    <div id="map" style="width: 50%; height: 700px;"></div>
    <div class="pl-10" id="placemark-list" style="width: 50%; height: 800px; overflow: scroll;">
      <filter-bar :total="totalPlacemarks"
                  @filter-change="filterChange"
      />
      <place-mark-info v-if="visibleAddressData.length" v-for="address in visibleAddressData" :key="address.id"
                       :address="address"/>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from 'vue'
import {baseURL} from "~/config.js";
import PlaceMarkInfo from "~/components/pages/where-to-buy/PlaceMarkInfo.vue";
import FilterBar from "~/components/pages/where-to-buy/FilterBar.vue";
import {generateAddressData} from '~/utils/helpers.js';

let myMap; // Moved to global scope
let clusterer; // Moved to global scope
let placemarks = []; // New: Moved to global scope

const filter = ref('all')

const addresses = ref({})

async function getAddresses() {
  addresses.value = await $fetch(`${baseURL}/api/shops/`)
}

let visibleAddressData = reactive([])
let visiblePlacemarks = reactive([])


let totalPlacemarks = computed(() => {
  return visibleAddressData.length;
})

// dynamically add the Yandex Maps JavaScript API
useHead({
  script: [
    {
      src: 'https://api-maps.yandex.ru/2.1/?apikey=4b36a04b-c3bd-460a-b5ad-72f6766c8765&lang=en_US',
      async: true,
    },
  ],
})

onMounted(async () => {
  await getAddresses()
  await initMap()

})

// Move declaration outside
async function initMap() {
  // Make sure the API is loaded
  if (typeof ymaps === 'undefined') {
    setTimeout(initMap, 300)
    return
  }

  ymaps.ready(function () {
    myMap = new ymaps.Map('map', { // <-- here
      center: [55.751574, 37.573856],
      zoom: 11
    }, {
      searchControlProvider: 'yandex#search'
    });

    updatePlacemarks();

    myMap.events.add('boundschange', updateVisiblePlacemarks);

    // Run once to initialize
    updateVisiblePlacemarks();
  });
}



function updateVisiblePlacemarks() {
  let mapBounds = myMap.getBounds();
  visiblePlacemarks.length = 0;
  visibleAddressData.length = 0;

  for (let placemark of placemarks) {
    let placemarkCoordinates = placemark.geometry.getCoordinates();
    if (placemarkCoordinates[0] > mapBounds[0][0] && placemarkCoordinates[0] < mapBounds[1][0] && placemarkCoordinates[1] > mapBounds[0][1] && placemarkCoordinates[1] < mapBounds[1][1]) {

      let address = addresses.value.addresses.find(a => a.latitude == placemarkCoordinates[0] && a.longitude == placemarkCoordinates[1]);
      if (address) {
        let addressData = generateAddressData(address); // Using generateAddressData function here

        // Apply the filter
        if (filter.value === 'open' && addressData.isOpenData.isOpen !== "Открыто") continue;
        if (filter.value === 'monobrand' && !addressData.isMonoBrand) continue;
        if (filter.value === 'openAndMonobrand' && (addressData.isOpenData.isOpen !== "Открыто" || !addressData.isMonoBrand)) continue;

        visiblePlacemarks.push(placemark);
        visibleAddressData.push(addressData);

      }
    }
  }
}

async function updatePlacemarks() {
  // clear existing placemarks
  myMap.geoObjects.removeAll();

  let MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div style="color: #000000; font-weight: normal;">$[properties.iconContent]</div>'
  );

  let originalSize = [45, 30];
  let scaledSize = [originalSize[0] * 1.1, originalSize[1] * 1.1];

  // Filter and add placemarks based on new filter value
  placemarks = addresses.value.addresses
      .filter(address => {
        let addressData = generateAddressData(address);

        if (filter.value === 'open' && addressData.isOpenData.isOpen !== "Открыто") {
          return false;
        }

        if (filter.value === 'monobrand' && !addressData.isMonoBrand) {
          return false;
        }

        if (filter.value === 'openAndMonobrand' && (addressData.isOpenData.isOpen !== "Открыто" || !addressData.isMonoBrand)) {
          return false;
        }

        return true;
      })
      .map((address, index) => {
        let addressData = generateAddressData(address);
        let placemark = new ymaps.Placemark([address.latitude, address.longitude], {
          hintContent: addressData.address,
          balloonContent: `
  <div style="display: flex; align-items: start;">
    <img src="/logoB.webp" alt="logo" style="width: 40px; height: 40px; object-fit: contain; margin-right: 10px;"/>
    <div>
      <p style="font-family: 'abchanel-corpo', monospace; font-weight: bold; font-size: 15px; line-height: 21px;">${addressData.name}</p>
      <p style="font-family: 'Helvetica Neue', serif; font-weight: normal; font-size: 15px; line-height: 21px;">${addressData.address}</p>
      <div style="height: 20px;"></div>
      ${addressData.metro_station ? `<p style="font-family: 'Helvetica Neue',serif; font-weight: normal; font-size: 15px; line-height: 25px;">метро ${addressData.metro_station}</p>` : ''}
      <a href="tel:${addressData.phone}" style="font-family: 'Helvetica Neue',serif; font-weight: normal; font-size: 15px; line-height: 25px;">${addressData.phone}</a>
      <p style="font-family: 'Helvetica Neue',serif; font-weight: normal; font-size: 15px; line-height: 25px;">${addressData.workingHours.join('<br/>')}</p>
      <div style="height: 20px;"></div>
      <p style="font-family: 'Helvetica Neue',serif; font-weight: normal; font-size: 15px; line-height: 21px; color:${addressData.isOpenData.color};">${addressData.isOpenData.isOpen}</p>
      ${addressData.isOpenData.isOpen === 'Открыто' ? '' : `<p style="font-family: 'Helvetica Neue',serif; font-weight: normal; font-size: 15px; line-height: 21px;">Откроется ${new Date().getHours() >= 15 ? 'завтра' : 'сегодня'} в ${addressData.isOpenData.tomorrowOpeningTime}</p>`}
      <div style="height: 20px;"></div>
      <button id="routeBtn_${index}" style="font-family: 'abchanel-corpo', monospace; font-weight: normal; font-size: 15px; line-height: 21px; text-decoration: underline;">Маршрут</button>
    </div>
  </div>`,
          iconContent: address.name_for_map
        }, {
          iconLayout: 'default#imageWithContent',
          iconImageHref: '/logoB.webp',
          iconImageSize: originalSize,
          iconImageOffset: [0, 0],
          iconContentOffset: [37, 16],
          iconContentLayout: MyIconContentLayout,
        });

        placemark.events.add('mouseenter', function (e) {
          e.get('target').options.set('iconImageSize', scaledSize);
        });

        placemark.events.add('mouseleave', function (e) {
          e.get('target').options.set('iconImageSize', originalSize);
        });

        placemark.phone = index; // assign an id to each placemark for Vue's key
        myMap.geoObjects.add(placemark);

        // ... rest of your placemark code ...

        return placemark;
      });

  clusterer = new ymaps.Clusterer({
    preset: 'islands#invertedBlackClusterIcons',
    groupByCoordinates: false,
    clusterDisableClickZoom: true,
    clusterHideIconOnBalloonOpen: false,
    geoObjectHideIconOnBalloonOpen: false
  });

  clusterer.add(placemarks);
  myMap.geoObjects.add(clusterer);
}


function filterChange(newFilter) {
  filter.value = newFilter
  updatePlacemarks() // call this function whenever the filter changes
  updateVisiblePlacemarks()
}


</script>


