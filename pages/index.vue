

<script setup>
definePageMeta({layout: "default"});



const data = await $fetch('http:////64.225.66.244/api/product/collections')
const collections = data.results

</script>

<template>
    <div class="-z-50 top-0 absolute w-screen">
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
                <div class="hero bg-cover bg-center h-screen w-screen text-left"
                     :style="{ backgroundImage: `url(${collection.image})` }">
                    <div class="relative container xl:top-[378px] lg:top-[299px] md:top-[393px] sm:top-[315px] text-white " >
                        <h2 class="mb-5">About collection</h2>
                        <p class="lg:w-[448px]">{{ collection.description }}</p>
                    </div>
                    <div class="relative container xl:bottom-[805px] lg:top-[676px] md:top-[240px] sm:top-[224px] flex justify-between">
                        <button class="prev-slide-button xl:w-[80px] lg:w-[70px] md:w-[60px] sm:w-[30px] xl:h-[80px] lg:h-[70px] md:h-[60px] sm:h-[30px]">
                            <img src="/icons/prev-square-icon.svg" alt="prev">
                        </button>
                        <div class="ml-[228px]">
                            <h1 class="text-white mb-8">{{ collection.name }}</h1>
                            <a class="text-white" :href="collection.slug"><h3 class="underline px-1">View
                                collection</h3></a>
                        </div>
                        <button class="next-slide-button xl:w-[80px] lg:w-[70px] md:w-[60px] sm:w-[30px] xl:h-[80px] lg:h-[70px] md:h-[60px] sm:h-[30px]">
                            <img src="/icons/next-square-icon.svg" alt="next">
                        </button>
                    </div>

                </div>

            </SwiperSlide>
        </Swiper>
    </div>
</template>

