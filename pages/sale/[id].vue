<script setup lang="ts">
import { useRoute } from 'vue-router'
import VueCountdown from '@chenfengyuan/vue-countdown'
import { useSaleStore } from '~/stores/saleStore'
import BaseHeroWithoutDescription from '~/components/base/BaseHeroWithoutDescription.vue'
import { pluralizeDays, pluralizeHours, pluralizeMinutes, pluralizeSeconds } from '~/utils/saleUtils'

const route = useRoute()
const sale = ref({})
const saleStore = useSaleStore()
await saleStore.getSales()
sale.value = saleStore.sales.find(sale => sale.id == route.params.id)
const heroName = sale.value.name
const heroImage = sale.value.image

const now = new Date()
const saleEndDate = new Date(sale.value.end_date)
const time = saleEndDate - now

function formatDate(input) {
  return new Date(input)
}

const sentences = computed(() => {
  const description = sale.value.sale_type_description
  return description ? description.match(/[^\.!\?]+[\.!\?]+/g) || [] : []
})
</script>

<template>
  <Head>
    <title>Брянский лес - Акции</title>
  </Head>
  <BaseHeroWithoutDescription :hero-name="heroName" :hero-image="heroImage" />
  <main class="main-container pb-32">
    <h1 class="md:whitespace-nowrap pt-16 lg:pt-24">
      <!-- Check if doorVariantData.sale is equal to 1 -->
      <span v-if="sale.sale_type === 1">
        - {{ sale.discount }}% на полотно
      </span>
      <!-- Check if doorVariantData.sale is equal to 2 -->
      <span v-else-if="sale.sale_type === 2">
        - {{ sale.discount }}% на комплект
      </span>
      <!-- Optional: Add a default case if you need it -->
      <span v-else>
        - {{ sale.discount }}%
      </span>
    </h1>

    <h4 class="pt-5">
      Предложение действительно
      {{ ($t('saleFrom')).toLowerCase() }}
      {{ formatDate(sale.start_date).getDate() }}
      <span
        v-if="formatDate(sale.start_date).getMonth() !== formatDate(sale.end_date).getMonth()"
      >{{
        $t(`month_${formatDate(sale.start_date).getMonth()}`)
      }} </span>

      <span
        v-if="formatDate(sale.start_date).getFullYear() !== formatDate(sale.end_date).getFullYear()"
      >{{
        formatDate(sale.start_date).getFullYear()
      }} </span>
      {{ $t('saleTo') }}
      {{ formatDate(sale.end_date).getDate() }}
      {{ $t(`month_${formatDate(sale.end_date).getMonth()}`) }}

      {{ formatDate(sale.end_date).getFullYear() }}
    </h4>

    <h5 class="pt-10">
      {{ sale.description }}
    </h5>
    <ul class="pt-10">
      <li v-for="(sentence, index) in sentences" :key="index">
        <p class="pt-1">
          {{ sentence.trim() }}
        </p>
      </li>
    </ul>
    <client-only>
      <div class="pt-5">
        <VueCountdown v-slot="{ days, hours, minutes, seconds }" :time="time">
          <h2 class="pb-10">
            До окончания акции осталось：
          </h2>
          <div class=" ">
            <h1 class="w-full flex md:flex-row flex-col gap-10 justify-center">
              <span class="fixed-width">
                <div>{{ days }}</div>
                <div>{{ pluralizeDays(days) }}</div>
              </span>

              <span class="fixed-width">
                <div>{{ hours }}</div>
                <div>{{ pluralizeHours(hours) }}</div>
              </span>

              <span class="fixed-width">
                <div>{{ minutes }}</div>
                <div>{{ pluralizeMinutes(minutes) }}</div>
              </span>

              <span class="fixed-width">
                <div>{{ seconds }}</div>
                <div>{{ pluralizeSeconds(seconds) }}</div>
              </span>
            </h1>
          </div>
        </VueCountdown>
      </div>
    </client-only>
  </main>
</template>

<style scoped>
.fixed-width, .long-fixed-width {
  display: flex;
  flex-direction: column;
  align-items: center;

}

/* Add padding or margin if needed */
.fixed-width > div {
  padding: 2px;
}
</style>
