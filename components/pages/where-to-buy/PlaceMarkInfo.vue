<template>
  <div class="placemark-data  " :class="{closed: props.address.isOpenData.isOpen === 'Закрыто'}">
    <div class="pb-4 border-b border-darkGreyGray">
      <h3 class="pb-2">{{ props.address.name }}</h3>
      <p class="pb-4">{{ props.address.address }}</p>
      <p class="pb-2" v-if="props.address.metro_station">метро {{props.address.metro_station}}</p>
      <a href="tel:{{props.address.phone}}">{{ props.address.phone }}</a>
      <p class="pt-2" v-for="interval of  props.address.workingHours" :key="interval">{{ interval }}</p>
      <div class="status pt-4 pb-4">
        <div class="status-color" :style="{backgroundColor: props.address.isOpenData.color}"></div>
        <p>{{ props.address.isOpenData.isOpen }}</p>
        <p v-if="remainingTime">, будет работать еще {{ remainingTime }}</p>
        <p v-if="props.address.isOpenData.isOpen === 'Закрыто'">{{ openText }} {{ props.address.isOpenData.tomorrowOpeningTime }}</p>

      </div>
      <buttons-primary-button-small class="pt-4" @click="getRoute">Маршрут</buttons-primary-button-small>

    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue';

const props = defineProps({
  address: Object,
});


const remainingTime = ref(null);
let intervalId;

function getCorrectDeclension(number, words) {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

function getTimeRemaining(closingTime) {
  let now = new Date();
  let currentHoursMinutes = now.getHours() * 60 + now.getMinutes();
  let closingHoursMinutes = parseInt(closingTime.slice(0, 2)) * 60 + parseInt(closingTime.slice(3, 5));

  if (currentHoursMinutes < closingHoursMinutes) {
    let remainingMinutes = closingHoursMinutes - currentHoursMinutes;

    if (remainingMinutes > 60) {
      let hours = Math.floor(remainingMinutes / 60);
      let minutes = remainingMinutes % 60;

      let hoursWord = getCorrectDeclension(hours, ['час', 'часа', 'часов']);
      let minutesWord = getCorrectDeclension(minutes, ['минута', 'минуты', 'минут']);

      return `${hours} ${hoursWord} ${minutes} ${minutesWord}`;
    } else {
      let minutesWord = getCorrectDeclension(remainingMinutes, ['минута', 'минуты', 'минут']);

      return `${remainingMinutes} ${minutesWord}`;
    }
  }

  return null;
}

onMounted(async () => {
  let closingTime;
  const currentDay = new Date().getDay();

  switch(currentDay) {
    case 0: // Sunday
      closingTime = props.address.sunday_working_hours_to;
      break;
    case 6: // Saturday
      closingTime = props.address.saturday_working_hours_to;
      break;
    default: // Weekdays
      closingTime = props.address.working_days_working_hours_to;
  }

  if (props.address.isOpenData.isOpen === "Открыто") {
    remainingTime.value = getTimeRemaining(closingTime);
    intervalId = setInterval(() => {
      remainingTime.value = getTimeRemaining(closingTime);
    }, 60000);
  }
});

onUnmounted(() => {
  clearInterval(intervalId);
});

// Computed property for open text
const openText = computed(() => {
  let currentTime = new Date().toLocaleTimeString('it-IT').slice(0, -3);
  if (currentTime > props.address.isOpenData.tomorrowOpeningTime) {
    return ", откроется завтра в";
  } else {
    return ", откроется сегодня в";
  }
});

async function getRoute() {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by this browser.");
    return;
  }

  try {
    navigator.geolocation.getCurrentPosition(async function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const destinationLat = props.address.latitude;
      const destinationLon = props.address.longitude;

      // Construct Yandex Maps URL with user's current location and destination
      const url = `https://maps.yandex.ru/?rtext=${lat},${lon}~${destinationLat},${destinationLon}`;

      // Open Yandex Maps in a new tab
      window.open(url, '_blank');
    });
  } catch (error) {
    console.log("Error obtaining geolocation: ", error);
  }
}
</script>

<style scoped>
.placemark-data {
  margin-bottom: 20px; /* adjust as needed */
}

.status {
  display: flex;
  align-items: center;
}

.status-color {
  width: 12px;
  height: 12px;
  margin-right: 10px;
}

</style>
