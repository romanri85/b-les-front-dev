<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import AddressDoorsInsideModal from '~/components/pop-ups/AddressDoorsInsideModal.vue'
import AddressWorkingHoursCurric from '~/components/pages/where-to-buy/AddressWorkingHoursCurric.vue'
import { getRoute } from '~/services/getRouteService.js'

const props = defineProps({
  address: Object,
})

const emits = defineEmits(['center-change'])

const remainingTime = ref(null)
let intervalId

function moveToAddress() {
  emits('center-change', props.address)
}

function getCorrectDeclension(number, words) {
  const cases = [2, 0, 1, 1, 1, 2]
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
}

function getTimeRemaining(closingTime) {
  const now = new Date()
  const currentHoursMinutes = now.getHours() * 60 + now.getMinutes()
  const closingHoursMinutes = Number.parseInt(closingTime.slice(0, 2)) * 60 + Number.parseInt(closingTime.slice(3, 5))

  if (currentHoursMinutes < closingHoursMinutes) {
    const remainingMinutes = closingHoursMinutes - currentHoursMinutes

    if (remainingMinutes > 60) {
      const hours = Math.floor(remainingMinutes / 60)
      const minutes = remainingMinutes % 60

      const hoursWord = getCorrectDeclension(hours, ['час', 'часа', 'часов'])
      const minutesWord = getCorrectDeclension(minutes, ['минута', 'минуты', 'минут'])

      return `${hours} ${hoursWord} ${minutes} ${minutesWord}`
    }
    else {
      const minutesWord = getCorrectDeclension(remainingMinutes, ['минута', 'минуты', 'минут'])

      return `${remainingMinutes} ${minutesWord}`
    }
  }

  return null
}

onMounted(async () => {
  let closingTime
  const currentDay = new Date().getDay()

  switch (currentDay) {
    case 0: // Sunday
      closingTime = props.address.sunday_working_hours_to
      break
    case 6: // Saturday
      closingTime = props.address.saturday_working_hours_to
      break
    default: // Weekdays
      closingTime = props.address.working_days_working_hours_to
  }

  if (props.address.isOpenData.isOpen === 'Открыто') {
    remainingTime.value = getTimeRemaining(closingTime)
    intervalId = setInterval(() => {
      remainingTime.value = getTimeRemaining(closingTime)
    }, 60000)
  }
})

onUnmounted(() => {
  clearInterval(intervalId)
})

// Computed property for open text
const openText = computed(() => {
  const currentTime = new Date().toLocaleTimeString('it-IT').slice(0, -3)
  if (currentTime > props.address.isOpenData.tomorrowOpeningTime)
    return ', откроется завтра в'
  else
    return ', откроется сегодня в'
})

const isAddressDoorsInsideModelOpen = ref(false)

function openDoorsInside() {
  isAddressDoorsInsideModelOpen.value = true
}

function closeDoorsInside() {
  isAddressDoorsInsideModelOpen.value = false
}
</script>

<template>
  <div class="placemark-data  " :class="{ closed: props.address.isOpenData.isOpen === 'Закрыто' }">
    <div class="pb-4 border-b border-darkGreyGray">
      <h3 class="pb-2 cursor-pointer" @click="moveToAddress">
        {{ props.address.name }}
      </h3>
      <p class="pb-4 cursor-pointer" @click="moveToAddress">
        {{ props.address.address }}
      </p>
      <p v-if="props.address.metro_station" class="pb-2">
        метро {{ props.address.metro_station }}
      </p>
      <a href="tel:{{props.address.phone}}">{{ props.address.phone }}</a>
      <div>
        <Disclosure>
          <DisclosureButton class="pt-4">
            <AddressWorkingHoursCurric filter-name="График работы" />
          </DisclosureButton>
          <DisclosurePanel>
            <p v-for="interval of props.address.workingHours" :key="interval" class="pt-2">
              {{ interval }}
            </p>
          </DisclosurePanel>
        </Disclosure>
      </div>
      <div class="status pt-4 pb-4">
        <div class="status-color" :style="{ backgroundColor: props.address.isOpenData.color }" />
        <p>
          {{ props.address.isOpenData.isOpen }}<span v-if="remainingTime">, будет работать еще {{ remainingTime }}</span>
          <span v-if="props.address.isOpenData.isOpen === 'Закрыто'"> {{ openText }} {{ props.address.isOpenData.tomorrowOpeningTime }}</span>
        </p>
      </div>
      <div class="flex flex-col items-start">
        <h4 class="underline-static">
          <buttons-primary-button-small @click="openDoorsInside">
            Образцы дверей в магазине
          </buttons-primary-button-small>
        </h4>

        <h4 class="hidden md:block underline-static">
          <buttons-primary-button-small class="pt-4" @click="getRoute(props.address)">
            Маршрут
          </buttons-primary-button-small>
        </h4>
      </div>
    </div>

    <AddressDoorsInsideModal
      v-if="isAddressDoorsInsideModelOpen"
      :address="props.address" @close="isAddressDoorsInsideModelOpen = false"
      @close-modal="closeDoorsInside"
    />
  </div>
</template>

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
