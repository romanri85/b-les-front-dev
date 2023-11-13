<script setup lang="ts">
import {useIntersectionObserver, useInterval} from '@vueuse/core'
import FactoryVideoModal from "~/components/pop-ups/FactoryVideoModal.vue";

const target = ref(null)
const targetIsVisible = ref(false)

const employeeReachedTarget = ref(false)
const yearsReachedTarget = ref(false)
const shopsReachedTarget = ref(false)

const {counter: employeeCounter, pause: pauseEmployees, resume: resumeEmployees} = useInterval(5, {controls: true, immediate: false})
const {counter: yearsCounter, pause: pauseYears, resume: resumeYears} = useInterval(30, {controls: true, immediate: false})
const {counter: shopsCounter, pause: pauseShops, resume: resumeShops} = useInterval(100, {controls: true, immediate: false})

const shouldOpenModal = ref(0)

const {stop} = useIntersectionObserver(
    target,
    ([{isIntersecting}]) => {
      targetIsVisible.value = isIntersecting
    },
)

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

function openFactoryVideoModal() {
  shouldOpenModal.value = shouldOpenModal.value + 1
}

const heroName = 'aboutUs'
const heroDescription = ''
const heroImage = '/aboutUs/aboutUs-bg.webp'
</script>

<template>
  <Head>
    <title>Брянский лес - О нас</title>
  </Head>
  <BaseHeroWithoutDescription :hero-name="heroName" :hero-image="heroImage"/>
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
        <img class="h-[345px] lg:h-[665px] object-cover w-full" src="/aboutUs/about-us-2.webp" alt="aboutUs-1"/>
      </div>
    </div>
  </section>

  <section class="main-container">
    <div ref="target"
         class="flex flex-col md:flex-row gap-8 md:gap-0 items-center justify-between px-[60px] md:px-[105px] lg:px-[270px]">
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
        <img class="h-[345px] lg:h-[665px] object-cover w-full" src="/aboutUs/about-us-3.webp" alt="aboutUs-1"/>
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
  <section class="main-container"><h1 class="text-center">3 года гарантии</h1></section>
  <section class="main-container ">
    <div class="main-container flex md:flex-row flex-col  justify-between  gap-x-16 lg:gap-x-24">
      <div class="flex flex-col mt-12 md:mt-0 justify-center md:w-1/2 gap-y-4  lg:gap-y-10">
        <h2>Мы уверены в качестве своего продукта</h2>
        <h5 class="">
          Высокие стандарты качества и контроль на всех этапах производства позволяют нам давать 3-х летнюю гарантию на
          двери из массива дуба и бука.
        </h5>
      </div>
      <div class="relative cursor-pointer py-20 lg:py-28 md:w-1/2">
        <div @click="openFactoryVideoModal" class=" px-8 h-[345px] lg:h-[665px] object-contain w-full bg-primaryDark"
        />
        <div class=" absolute top-1/2 text-white left-1/2 transform -translate-x-1/2 -translate-y-1/2"
             @click="openFactoryVideoModal"><h2 class="text-center">Видео о производстве</h2>

          <BasePlaySymbol

              class="play mx-auto pt-8 h-auto "/>
        </div>
      </div>
      <FactoryVideoModal :shouldOpenModal="shouldOpenModal"/>
    </div>
  </section>
</template>

<style scoped>
.play {
  border-color: white !important;
  min-width: 30px;
  max-width: 60px;
  width: calc(6vw);

}
</style>
