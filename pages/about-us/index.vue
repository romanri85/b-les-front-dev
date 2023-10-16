<script setup lang="ts">
import { useInterval } from '@vueuse/core'
import BaseHero from '~/components/base/BaseHero.vue'

const target = ref(null)
const targetIsVisible = ref(false)

const employeeReachedTarget = ref(false)
const yearsReachedTarget = ref(false)
const shopsReachedTarget = ref(false)

const { counter: employeeCounter, pause: pauseEmployees, resume: resumeEmployees } = useInterval(5, { controls: true, immediate: false })
const { counter: yearsCounter, pause: pauseYears, resume: resumeYears } = useInterval(30, { controls: true, immediate: false })
const { counter: shopsCounter, pause: pauseShops, resume: resumeShops } = useInterval(100, { controls: true, immediate: false })

watch(targetIsVisible, (isVisible) => {
  if (isVisible) {
    if (!employeeReachedTarget.value)
      resumeEmployees()
    if (!yearsReachedTarget.value)
      resumeYears()
    if (!shopsReachedTarget.value)
      resumeShops()
  }
})

watch(employeeCounter, (newCounterValue) => {
  if (newCounterValue === 150) {
    pauseEmployees()
    employeeReachedTarget.value = true
  }
})

watch(yearsCounter, (newCounterValue) => {
  if (newCounterValue === 25) {
    pauseYears()
    yearsReachedTarget.value = true
  }
})

watch(shopsCounter, (newCounterValue) => {
  if (newCounterValue === 10) {
    pauseShops()
    shopsReachedTarget.value = true
  }
})

const heroName = 'aboutUs'
const heroDescription = 'aboutUsPageDescription'
const heroImage = '/aboutUs/aboutUs-bg.webp'
</script>

<template>
  <BaseHero :hero-name="heroName" :hero-description="heroDescription" :hero-image="heroImage" />
  <section class="main-container ">
    <div class="main-container flex md:flex-row flex-col  justify-between  gap-x-16 lg:gap-x-24">
      <div class="flex flex-col mt-12 md:mt-0 justify-center md:w-1/2 gap-y-4  lg:gap-y-10">
        <h2>{{ $t('naturalMaterialsBeautyTitle') }}</h2>
        <h5 class="">
          {{
            $t('naturalMaterialsBeautyContent')
          }}
        </h5>
      </div>
      <div class="py-20 lg:py-28 md:w-1/2">
        <nuxt-img class="h-[345px] lg:h-[665px] object-cover w-full" src="/aboutUs/about-us-2.webp" alt="aboutUs-1" />
      </div>
    </div>
  </section>
  <section class="main-container">
    <div ref="target" class="flex flex-col md:flex-row gap-8 md:gap-0 items-center justify-between px-[60px] md:px-[105px] lg:px-[270px]">
      <div class="flex flex-col items-center md:items-start justify-between">
        <h1>{{ yearsCounter }} </h1>
        <h5>{{ $t('yearsOnMarketNumber') }}</h5>
      </div>
      <div class="flex flex-col items-center md:items-start justify-between">
        <h1>{{ employeeCounter }}</h1>
        <h5>{{ $t('employeesNumber') }}</h5>
      </div>
      <div class="flex flex-col items-center md:items-start justify-between">
        <h1>{{ shopsCounter }} </h1>
        <h5>{{ $t('shopsNumber') }}</h5>
      </div>
    </div>
  </section>

  <section class="main-container">
    <div class="main-container flex md:flex-row flex-col-reverse justify-between gap-x-16 lg:gap-x-24">
      <div class="py-24 md:py-20 lg:py-28 md:w-1/2 flex items-center">
        <nuxt-img class="h-[345px] lg:h-[665px] object-cover w-full" src="/aboutUs/about-us-3.webp" alt="aboutUs-1" />
      </div>
      <div class="flex flex-col pt-24 md:pt-0 justify-center md:w-1/2 gap-y-4 lg:gap-y-10">
        <h2> {{ $t('woodWorkingTechnologiesTitle') }}</h2>
        <h5 class="">
          {{
            $t('woodWorkingTechnologiesContent')
          }}
        </h5>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
