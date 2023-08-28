<script setup lang="ts">

import Hero from "~/components/base/hero.vue";
import { useInterval } from '@vueuse/core'
import { useIntersectionObserver } from '@vueuse/core'

const target = ref(null)
const targetIsVisible = ref(false)


const employeeReachedTarget = ref(false)
const yearsReachedTarget = ref(false)
const shopsReachedTarget = ref(false)

const { counter: employeeCounter, pause: pauseEmployees, resume: resumeEmployees } = useInterval(5, { controls: true, immediate: false })
const { counter: yearsCounter, pause: pauseYears, resume: resumeYears } = useInterval(30, { controls: true, immediate: false })
const { counter: shopsCounter, pause: pauseShops, resume: resumeShops } = useInterval(100, { controls: true, immediate: false })

const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      targetIsVisible.value = isIntersecting
    },
)

watch(targetIsVisible, (isVisible) => {
  if (isVisible) {
    if (!employeeReachedTarget.value) resumeEmployees()
    if (!yearsReachedTarget.value) resumeYears()
    if (!shopsReachedTarget.value) resumeShops()
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

const heroName = "aboutUs"
const heroDescription = "aboutUsPageDescription"
const heroImage = "/aboutUs/aboutUs-bg.png"

</script>

<template>
  <hero :heroName="heroName" :hero-description="heroDescription" :heroImage="heroImage"/>
  <section class="main-container ">
    <div class="main-container flex md:flex-row flex-col  justify-between  gap-x-16 lg:gap-x-24">
      <div class="flex flex-col justify-center md:w-1/2 gap-y-4  lg:gap-y-10">
        <h2> Совершенство
          и красота материала, созданного природой.</h2>
        <p class="">Древесина отличается надежностью и прочностью,
          она не боится любых повреждений, воздействия солнечного света, влажности, и даже огня благодаря современным
          технологиям работы с этим материалом.</p>
      </div>
      <div class="py-20 lg:py-28 md:w-1/2">
        <nuxt-img class="h-[345px] lg:h-[665px] object-cover w-full" src="/aboutUs/about-us-2.png" alt="aboutUs-1"/>
      </div>
    </div>

  </section>
  <section class="main-container">

    <div class="flex md:flex-row flex-col items-center md:justify-between px-[60px] md:px-[105px] lg:px-[270px]" ref="target">
      <div class="flex flex-col justify-between">
        <h1>{{yearsCounter}} </h1>
        <p>лет на рынке</p>
      </div>
      <div class="flex flex-col justify-between">
        <h1>{{ employeeCounter}}</h1>
        <p>сотрудников</p>
      </div>
      <div class="flex flex-col justify-between">
        <h1>{{shopsCounter}} </h1>
        <p>салонов &nbsp;&nbsp;&nbsp;&nbsp;</p>
      </div>
    </div>
  </section>
  <section class="main-container">
    <div class="main-container flex md:flex-row flex-col-reverse justify-between gap-x-16 lg:gap-x-24">
      <div class="py-20 lg:py-28 md:w-1/2 flex items-center">
        <nuxt-img class="h-[345px] lg:h-[665px] object-cover w-full" src="/aboutUs/about-us-3.png" alt="aboutUs-1"/>
      </div>
      <div class="flex flex-col justify-center md:w-1/2 gap-y-4 lg:gap-y-10">
        <h2> Передовые технологии деревообработки.</h2>
        <p class="">Компания "Брянский лес" более 25 лет занимает ведущие позиции по производству дверей премиум класса. В компании работает свыше 150 человек, создавая по-настоящему качественные двери из цельной древесины. Предприятие оснащено современным итальянским, немецким и французским оборудованием.

          Кроме дверей из массива, мы также производим белые двери, покрытые эмалью, из современных материалов.</p>
      </div>

    </div>

  </section>
</template>

<style scoped>

</style>