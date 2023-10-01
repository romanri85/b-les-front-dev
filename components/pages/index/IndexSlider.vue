<template>

  <div class="lg:mt-[-87px] md:mt-[-65px] mt-[-65px] w-screen">
    <div class="hero bg-cover bg-center h-screen w-screen  bg-gray-400">

    <client-only>

      <Swiper class="h-screen"
          :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation]"
          :slides-per-view="1"
          :navigation="{
      nextEl: '.next-slide-button',
      prevEl: '.prev-slide-button',
    }"
          :loop="true"
          :effect="'creative'"
          :autoplay="{
      delay: 8000,
      disableOnInteraction: true,
    }"
          :creative-effect="{
      prev: {
        shadow: false,
        translate: ['-20%', 0, -1],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    }"

      >
        <SwiperSlide  v-for="(collection, index) in collections" :key="collection.name">
            <div>

              <nuxt-img placeholder :src="collection.image"
                        class="absolute h-screen w-screen object-cover -z-10" />
            </div>

            <div class="flex flex-col justify-between relative w-full h-full">
              <div
                  class="text-left relative main-container md:pb-0 pb-16 text-white lg:mt-[200px]  md:mb-[60px] lg:max-w-screen flex md:flex-row flex-col justify-between items-center lg:order-1 order-2">
                <div class="md:text-left text-center  ">

                  <h2 class="mb-5 lg:text-[23px]">{{ $t('aboutCollection') }}</h2>
                  <h5 class="lg:w-[448px] md:w-[350px] font-light">{{ $t(collection.description) }}</h5>
                </div>
                <div class="relative w-[75px] h-[64px] my:mb-0 my-[30px]">
                  <svg class="absolute w-full h-full" viewBox="0 0 100 100"
                       preserveAspectRatio="none">
                    <line x1="80" y1="20" x2="20" y2="80" stroke="white" stroke-width="1"/>
                  </svg>
                  <p class="absolute top-0 left-0 flex items-center justify-center w-1/2 h-1/2 text-sm text-white">
                    {{ index + 1 }} <!-- slider count -->
                  </p>
                  <p class="absolute bottom-0 right-0 flex items-center justify-center w-1/2 h-1/2 text-sm text-white">
                    {{ collections.length }} <!-- total slides -->
                  </p>
                </div>
              </div>

              <div
                  class="relative main-container  flex md:justify-between justify-evenly lg:mt-[130px] md:mt-64 mt-40 lg:order-2">
                <button
                    class="prev-slide-button xl:w-[80px] lg:w-[70px] md:w-[60px] w-[40px] xl:h-[80px] lg:h-[70px] md:h-[60px] h-[40px]">
                  <nuxt-img placeholder width="130" class="hidden md:block" src="/icons/prev-square-icon.svg"
                            alt="prev"/>
                  <!--                  <nuxt-img placeholder class="md:hidden" src="/icons/prev-page-icon-small.svg" alt="prev"/>-->
                  <chevron-left-icon class="md:hidden w-8 h-8 text-white"/>

                </button>
                <div class="lg:ml-[228px] lg:mb-[100px] text-center md:text-left">
                  <h1 class="text-white md:mb-8 mb-[20px]">{{ $t(collection.name) }}</h1>
                  <nuxt-link :to="`/catalog?collection=${collection.id}`" class="text-white"><h3 class="underline px-1">{{
                      $t('viewCollection')
                    }}</h3></nuxt-link>
                </div>
                <button
                    class="next-slide-button xl:w-[80px] lg:w-[70px] md:w-[60px] w-[40px] xl:h-[80px] lg:h-[70px] md:h-[60px] h-[40px]">
                  <nuxt-img placeholder width="130" class="hidden md:block" src="/icons/next-square-icon.svg"
                            alt="next"/>
                  <!--                  <nuxt-img placeholder class="md:hidden" src="/icons/next-page-icon-small.svg" alt="next"/>-->
                  <chevron-right-icon class="md:hidden w-8 h-8 text-white"/>
                </button>
              </div>
          </div>

        </SwiperSlide>
      </Swiper>
    </client-only>
    </div>

  </div>
</template>

<script setup lang="ts">
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/vue/24/solid";

// import {useSliderCollectionStore} from "~/stores/mainSliderCollectionStore.js";
// const sliderCollectionStore = useSliderCollectionStore()
// sliderCollectionStore.fillSliderCollections()
import collections from "~/data/SliderCollections.json";
</script>

<style scoped>

</style>