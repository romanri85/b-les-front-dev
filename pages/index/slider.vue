<template>
    <div class="relative z-10 xl:mt-[-100px] lg:mt-[-86px] md:mt-[-60px] mt-[-65px] w-screen">
        <client-only>
            <Swiper
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
                <SwiperSlide v-for="(collection, index) in collections" :key="index">
                    <div class="hero bg-cover bg-center h-screen w-screen">
                        <nuxt-img format="webp" quality="50" :src="collection.image"
                                  class="absolute h-screen w-screen object-cover -z-10" alt="slider-pic"/>
                        <div class="flex flex-col justify-between relative w-screen h-screen">
                            <div class="text-left relative main-container  text-white lg:mt-[200px] xl:mt-[278px] md:mb-[60px] mt-[100px] lg:max-w-screen flex md:flex-row flex-col justify-between items-center lg:order-1 order-2">
                                <div>
                                    <h2 class="mb-5 lg:text-[23px] md:text-[14px]">About collection</h2>
                                    <p class="lg:w-[448px]">{{ collection.description }}</p>
                                </div>
                                <div class="relative w-[75px] h-[64px] my:mb-0 my-[30px]">
                                    <svg class="absolute w-full h-full" viewBox="0 0 100 100"
                                         preserveAspectRatio="none">
                                        <line x1="80" y1="20" x2="20" y2="80" stroke="white" stroke-width="1"/>
                                    </svg>
                                    <p class="absolute top-0 left-0 flex items-center justify-center w-1/2 h-1/2 text-sm text-white">
                                        {{ index + 1 }} <!-- Текущий номер слайда -->
                                    </p>
                                    <p class="absolute bottom-0 right-0 flex items-center justify-center w-1/2 h-1/2 text-sm text-white">
                                        {{ collections.length }} <!-- Общее количество слайдов -->
                                    </p>
                                </div>
                            </div>
                            <div class="relative main-container  flex md:justify-between sm:justify-evenly mt-[130px] lg:order-2">
                                <button class="prev-slide-button xl:w-[80px] lg:w-[70px] md:w-[60px] sm:w-[30px] xl:h-[80px] lg:h-[70px] md:h-[60px] sm:h-[30px]">
                                    <img class="hidden md:block" src="/icons/prev-square-icon.svg" alt="prev">
                                    <img class="md:hidden" src="/icons/prev-page-icon-small.svg" alt="prev">
                                </button>
                                <div class="lg:ml-[228px] xl:mb-[145px] lg:mb-[100px]">
                                    <h1 class="text-white md:mb-8 sm:mb-[30px]">{{ collection.name }}</h1>
                                    <a class="text-white" :href="collection.slug"><h3 class="underline px-1">View
                                        collection</h3></a>
                                </div>
                                <button class="next-slide-button xl:w-[80px] lg:w-[70px] md:w-[60px] sm:w-[30px] xl:h-[80px] lg:h-[70px] md:h-[60px] sm:h-[30px]">
                                    <img class="hidden md:block" src="/icons/next-square-icon.svg" alt="next">
                                    <img class="md:hidden" src="/icons/next-page-icon-small.svg" alt="next">
                                </button>
                            </div>
                        </div>
                    </div>

                </SwiperSlide>
            </Swiper>
        </client-only>
    </div>
</template>

<script setup>
import {baseURL} from "~/config";

const data = await $fetch(`${baseURL}/api/product/collections`)
const collections = data.results
</script>

<style scoped>

</style>