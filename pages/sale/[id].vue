<script setup lang="ts">
import {useRoute} from "vue-router";
import {useSaleStore} from "~/stores/saleStore";
import HeroWithoutDescription from "~/components/base/heroWithoutDescription.vue";
import VueCountdown from '@chenfengyuan/vue-countdown';
import {pluralizeDays, pluralizeHours, pluralizeMinutes, pluralizeSeconds} from "~/utils/saleUtils";

const route = useRoute()
const sale = ref({})
const saleStore = useSaleStore()
await saleStore.getSales()
sale.value = saleStore.sales.find(sale => sale.id == route.params.id)
const heroName = sale.value.name
const heroImage = sale.value.image

const now = new Date();
const saleEndDate = new Date(sale.value.end_date)
const time = saleEndDate - now


function formatDate(input) {
  return new Date(input)
}
const sentences = computed(() => {
  const description = sale.value.sale_type_description;
  return description ? description.match(/[^\.!\?]+[\.!\?]+/g) || [] : [];
})
</script>

<template>
  <hero-without-description :heroName="heroName" :heroImage="heroImage"/>
  <main class="main-container">
  <h1 class="whitespace-nowrap pt-4" >
    <!-- Check if doorVariantData.sale is equal to 1 -->
    <span v-if="sale.sale_type === 1">
    - {{sale.discount }}% на полотно
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

  <p>Предложение действительно
    {{ ($t('saleFrom')).toLowerCase() }}
    {{ formatDate(sale.start_date).getDate() }}
    <span
        v-if="formatDate(sale.start_date).getMonth() !== formatDate(sale.end_date).getMonth()">{{
        $t(`month_${formatDate(sale.end_date).getMonth()}`)
      }} </span>

    <span
        v-if="formatDate(sale.start_date).getFullYear()!==formatDate(sale.end_date).getFullYear()">{{
        formatDate(sale.start_date).getFullYear()
      }} </span>
    {{ $t('saleTo') }}
    {{ formatDate(sale.end_date).getDate() }}
    {{ $t(`month_${formatDate(sale.start_date).getMonth()}`) }}

    {{ formatDate(sale.end_date).getFullYear() }}
  </p>
  <p>{{sale.description}}</p>
  <ul>
    <li v-for="(sentence, index) in sentences" :key="index">
      <h5>{{ sentence.trim() }}</h5>
    </li>
  </ul>
        <client-only>
          <vue-countdown :time="time" v-slot="{ days, hours, minutes, seconds }">
          <h2>  До окончания акции осталось：{{ days }} {{ pluralizeDays(days) }}, {{ hours }} {{ pluralizeHours(hours) }}, {{ minutes }}
            {{ pluralizeMinutes(minutes) }}, {{ seconds }} {{ pluralizeSeconds(seconds) }}.</h2>
          </vue-countdown>
        </client-only>
  </main>
</template>

<style scoped>

</style>