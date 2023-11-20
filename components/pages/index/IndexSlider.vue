<script setup lang="ts">
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/vue/24/solid'
import {useViewportSize} from '~/composables/useViewportSize'

// import {useSliderCollectionStore} from "~/stores/mainSliderCollectionStore.js";
// const sliderCollectionStore = useSliderCollectionStore()
// sliderCollectionStore.fillSliderCollections()
import collections from '~/data/SliderCollectionsWithRiminiRomani.json'
import {useRouter} from 'vue-router';

const viewport = useViewportSize()

const isLinkDisabled = ref(false);
const router = useRouter();


</script>

<template>
  <div class="lg:mt-[-87px] md:mt-[-65px] mt-[-61px]">
    <div class=" bg-cover bg-center hero-image  bg-gray-300">
      <client-only>
        <Swiper
            class="hero-image"
            :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation]"
            :slides-per-view="1"
            :navigation="{
            nextEl: '.next-slide-button',
            prevEl: '.prev-slide-button',
          }"
            :loop="true"
            effect="creative"
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
          <SwiperSlide v-for="(collection, index) in collections" :key="collection.name">
            <div>
              <img alt="collection.name"
                   :src="collection.image"
                   class="hero-image absolute  w-screen object-cover object-bottom md:object-center -z-10" :class="[
                  (collection.name === 'versailles' ? 'custom-versal-position' : ''),
                ]"
              />
            </div>

            <div class="flex flex-col justify-between relative w-full h-full">
              <div
                  class="text-left relative main-container md:pb-0 pb-16 text-white lg:mt-[21vh]  md:mb-[7vh] lg:max-w-screen flex md:flex-row flex-col justify-between items-center lg:order-1 order-2"
              >
                <div class="md:text-left text-center  ">
<!--                  <h2 v-if="!viewport.isMobile" class="mb-5">-->
<!--                    {{ $t('aboutCollection') }}-->
<!--                  </h2>-->
                  <h2 v-if="!viewport.isMobile" class="lg:w-[448px] md:w-[350px]">

                    {{ $t(collection.description) }}
                  </h2>
                </div>
                <div class="relative w-[75px] h-[64px] my:mb-0 my-[30px]">
                  <svg
                      class="absolute w-full h-full" viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                  >
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
                  class="relative main-container  flex md:justify-between justify-evenly lg:mt-[130px] md:mt-40 mt-40 lg:order-2"
              >
                <button
                    class="prev-slide-button xl:w-[80px] lg:w-[70px] md:w-[60px] w-[40px] xl:h-[80px] lg:h-[70px] md:h-[60px] h-[40px]"
                >
                  <img
                      class="hidden md:block" width="130" src="/icons/prev-square-icon.svg"
                      alt="prev"
                  />
                  <!--                  <nuxt-img placeholder class="md:hidden" src="/icons/prev-page-icon-small.svg" alt="prev"/> -->
                  <ChevronLeftIcon class="md:hidden w-8 h-8 text-white"/>
                </button>
                <div class="lg:ml-[228px] lg:mb-[10vh] text-center md:text-left">
                  <h1 class="text-white lg:mb-8 mb-5">
                    {{ $t(collection.name) }}
                  </h1>
                  <nuxt-link :to="{ path: '/catalog', query: { collection: collection.id } }" v-if="collection.id" :class="{ 'text-white': true }">


                  <h3 class="underline px-1">
                      {{
                        $t('viewCollection')
                      }}
                    </h3>
                  </nuxt-link>
                </div>
                <button
                    class="next-slide-button xl:w-[80px] lg:w-[70px] md:w-[60px] w-[40px] xl:h-[80px] lg:h-[70px] md:h-[60px] h-[40px]"
                >
                  <img
                      class="hidden md:block" width="130" src="/icons/next-square-icon.svg"
                      alt="next"
                  />
                  <!--                  <nuxt-img placeholder class="md:hidden" src="/icons/next-page-icon-small.svg" alt="next"/> -->
                  <ChevronRightIcon class="md:hidden w-8 h-8 text-white"/>
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </client-only>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .custom-versal-position {
    object-position: 30% 50% !important; /* 50% is the original center, moving it 20% to the left makes it 30% */
  }
}

.hero-image {
  height: 100lvh;
}


</style>
