<template>
  <div class="block lg:flex ">
    <div id="map" class="lg:w-[50%] w-full h-[70vh]"></div>
    <div class="lg:pl-10 lg:w-[50%] w-full h-[100vh] overflow-auto">
      <div id="placemark-list" class="lg:mt-0 relative w-full">
        <filter-bar @touchmove.stop  :total="totalPlacemarks"
                    @filter-change="filterChange"
                    style="position: sticky; top: 0; z-index: 1;" class=" lg:pt-0 pt-4 bg-white border-b border-gray-400"
        />
        <place-mark-info v-if="visibleAddressData.length" v-for="address in visibleAddressData" :key="address.id"
                         :address="address" @center-change="changeMapCenterAndZoom"/>
      </div>
    </div>
  </div>
</template>


<script setup>
import {onMounted, reactive, ref} from 'vue'
import PlaceMarkInfo from "~/components/pages/where-to-buy/PlaceMarkInfo.vue";
import FilterBar from "~/components/pages/where-to-buy/FilterBar.vue";
import {findCity, generateAddressData} from '~/utils/helpers.js';
import {getRoute} from "~/services/getRouteService.js";

const emits = defineEmits(['city-change'])



let myMap; // Moved to global scope
let clusterer; // Moved to global scope
let placemarks = []; // New: Moved to global scope

const filter = ref('all')

const addresses = ref({})

const geo = ref({})
const city = ref({})

const props = defineProps({
  city: Object,
  addresses: Object,
  geo: Object
})

watch(props, (newProps) => {
  if (newProps.city.latitude && newProps.city.longitude) {
    if (myMap) { // check if map is already initialized
      myMap.setCenter([parseFloat(newProps.city.latitude), parseFloat(newProps.city.longitude)]);
      if (newProps.city.zoom_level) {
        myMap.setZoom(parseFloat(newProps.city.zoom_level));
      }
    }
  }
});

const changeMapCenterAndZoom = (address) => {
  if (myMap && address.latitude && address.longitude) { // check if map is already initialized and coordinates are provided
    myMap.setCenter([parseFloat(address.latitude), parseFloat(address.longitude)]);
      myMap.setZoom(13);
  }
}

let visibleAddressData = reactive([])
let visiblePlacemarks = reactive([])


let totalPlacemarks = computed(() => {
  return visibleAddressData.length;
})

// dynamically add the Yandex Maps JavaScript API
// useHead({
//   script: [
//     {
//       src: 'https://api-maps.yandex.ru/2.1/?apikey=4b36a04b-c3bd-460a-b5ad-72f6766c8765&lang=en_US',
//       async: true,
//     },
//   ],
// })

onMounted(async () => {

  const browserLang = navigator.language || navigator.userLanguage;
  const isRussian = browserLang.startsWith('ru');
  const langParam = isRussian ? 'ru_RU' : 'en_US';

  if (typeof ymaps === 'undefined') {
    useHead({
      script: [
        {
          src: `https://api-maps.yandex.ru/2.1/?apikey=4b36a04b-c3bd-460a-b5ad-72f6766c8765&lang=${langParam}`,
          async: true,
        },
      ],
    });
  }


  addresses.value = props.addresses
  geo.value = props.geo
  if (geo.value.region && addresses.value) {
    city.value = findCity(addresses.value.cities, geo.value.region);
    console.log(city.value, 'city')
  }
  if (city.value.city.latitude && city.value.city.longitude) {
    await initMap();
  } else {
    console.log('city.value.latitude or city.value.longitude is not defined');
  }
})


let maxRetries = 10;
let interval = 500;  // Starting interval
async function initMap() {
  // Make sure the API is loaded
  if (typeof ymaps === 'undefined') {
    if (maxRetries > 0) {
      setTimeout(initMap, interval);
      maxRetries--;
      interval += 250;  // Increase interval by 30ms for the next retry
      return;
    } else {
      console.error('Failed to initialize ymaps after multiple attempts.');
      return;
    }
  }

  ymaps.ready(function () {
    myMap = new ymaps.Map('map', {
      center: [parseFloat(props.city.latitude), parseFloat(props.city.longitude)], // access properties directly from `city`
      zoom: city.value.city.zoom_level,
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
      '<div style="color: #000000; font-family: abchanel-corpo,monospace; font-weight: normal;">$[properties.iconContent]</div>'
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
    geoObjectHideIconOnBalloonOpen: false,
clusterBalloonContentLayout: 'cluster#balloonCarousel',
    clusterBalloonContentLayoutHeight: 350,
  });



  clusterer.add(placemarks);
  myMap.geoObjects.add(clusterer);

  myMap.geoObjects.events.add('balloonopen', function (e) {
    // Add a delay to make sure the DOM has been updated
    setTimeout(function() {
      let balloonElement = document.querySelector('.ymaps-2-1-79-balloon__content');
      if (balloonElement) {
        // Get the route button inside the balloon
        let routeBtn = balloonElement.querySelector('[id^="routeBtn_"]');
        if (routeBtn) {
          // Add event listener to the route button
          routeBtn.addEventListener('click', function () {
            let address = addresses.value.addresses[parseInt(this.id.replace('routeBtn_', ''), 10)];
            getRoute(address);
          });
        }
      }
    }, 100); // You might need to adjust this delay value
  });

}


function filterChange(newFilter) {
  filter.value = newFilter
  updatePlacemarks() // call this function whenever the filter changes
  updateVisiblePlacemarks()
}


</script>
<style scoped>
filter-bar {
  pointer-events: auto; /* Enables pointer events for the filter bar */
}
</style>


