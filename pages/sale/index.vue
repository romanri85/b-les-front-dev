<script setup lang="ts">
import BaseHeroWithoutDescription from '~/components/base/BaseHeroWithoutDescription.vue'
import { useSaleStore } from '~/stores/saleStore.js'

const saleStore = useSaleStore()
const heroName = 'Акции'
const heroDescription = ''
const heroImage = '/sale/sale-bg.webp'

// const now = new Date();
// const newYear = new Date(now.getFullYear() + 1, 0, 1);
// const time = computed(()=>{
//   return newYear - now
// })

function formatDate(input) {
  // const { t } = useI18n();
  // const months = t('months');

  const date = new Date(input)
  // const day = date.getDate();
  // console.log(months,'date.getMonth()')
  // const monthIndex = date.getMonth();
  // const year = date.getFullYear();

  return date
}

onMounted(() => {
  saleStore.getSales()
})
</script>

<template>
  <BaseHeroWithoutDescription :hero-name="heroName" :hero-image="heroImage" />
  <section class="pb-20 lg:pb-32">
    <div class="main-container">
      <!--            <client-only> -->
      <!--              <vue-countdown :time="time" v-slot="{ days, hours, minutes, seconds }"> -->
      <!--              <h1>  Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds.</h1> -->
      <!--              </vue-countdown> -->
      <!--            </client-only> -->
      <div v-if="saleStore.sales" class="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div v-for="sale in saleStore.sales" class="min-w-80">
          <div class="relative group">
            <div class="w-full h-60 cursor-pointer">
              <NuxtLink :to="`/sale/${sale.id}`">
                <nuxt-img
                  :src="sale.image" :alt="sale.name"
                  class="w-full h-full transition-all duration-500 ease-in-out group-hover:brightness-50 object-cover"
                />
                <div
                  class="absolute inset-0 flex items-center justify-center  transition-opacity duration-500 ease-in-out"
                >
                  <div class="text-center">
                    <h2 class="text-white">
                      {{ sale.name }}
                    </h2>
                    <!--                    <p class="text-white">{{ sale.description }}</p> -->
                  </div>
                  <!-- Sale Discount Label -->
                  <div class="absolute top-0 left-0 m-3 bg-black text-white p-2">
                    {{ sale.discount }}%
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
          <div class="pb-4 pt-5">
            <h2 class="">
              {{ sale.name }}
            </h2>
            <!--            <p class="pt-16">{{ sale.description }}</p> -->
            <div class="flex items-center gap-3 pt-6 lg:pt-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="inline-block">
                {{ $t('saleFrom') }}
                {{ formatDate(sale.start_date).getDate() }}
                <span
                  v-if="formatDate(sale.start_date).getMonth() !== formatDate(sale.end_date).getMonth()"
                >{{ $t(`month_${formatDate(sale.start_date).getMonth()}`) }} </span>

                <span
                  v-if="formatDate(sale.start_date).getFullYear() !== formatDate(sale.end_date).getFullYear()"
                >{{ formatDate(sale.start_date).getFullYear() }} </span>
                {{ $t('saleTo') }}
                {{ formatDate(sale.end_date).getDate() }}
                {{ $t(`month_${formatDate(sale.end_date).getMonth()}`) }}

                {{ formatDate(sale.end_date).getFullYear() }}
              </p>
            </div>
            <!--            <div v-for="tag in project.tags" class="inline-block"> -->
            <!--              <NuxtLink :to="{ path: '/search-tags', query: { tags: tag.id } }"> -->
            <!--                <p class="underline-direction inline">#{{ tag.name }}&nbsp;</p><span>&nbsp;&nbsp;</span> -->
            <!--              </NuxtLink> -->
            <!--            </div> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
ol {
  list-style-type: decimal; /* Use decimal numbers for list items */
}

li {
  padding-bottom: 48px
}

@media (max-width: 768px) {
  li {
    padding-bottom: 24px
  }
}

@media (max-width: 1440px) {
  li {
    padding-bottom: 36px
  }
}

.otsel {
  font-weight: normal;
}
</style>
