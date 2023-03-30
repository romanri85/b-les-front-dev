// import {definePageMeta} from "#imports";
// import layout from "#app/components/layout";

<script setup>
definePageMeta({layout: "light"});

const collections = [{name: 'Classic', description:'This is a classic collection', image:'/classic-hero.jpg', url:'https://google.com'},
    {name: 'Classic', description:'This is a classic collection', image:'/versal-hero.jpg', url:'https://facebook.com
]

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
            <SwiperSlide v-for="(bgImage, index) in collections" :key="index">
                <div class="hero bg-cover bg-center xl:h-screen lg:h-screen md:h-[450px] sm:h-[584px] w-screen"
                     :style="{ backgroundImage: `url(${bgImage})` }">
                    <div class="relative container xl:top-[705px] lg:top-[576px]">
                        <button class="prev-slide-button">
                            <img src="/icons/prev-square-icon.svg" alt="prev">
                        </button>
                        <button class="next-slide-button">
                            <img src="/icons/next-square-icon.svg" alt="next">
                        </button>
                    </div>
                </div>


            </SwiperSlide>
        </Swiper>
    </div>
</template>

<style scoped>
.prev-slide-button,
.next-slide-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    background: transparent;
    border: none;
    color: #fff;
}

.prev-slide-button {
    left: 10px;
}

.next-slide-button {
    right: 10px;
}

.hero {
    /*z-index: -50!important;*/
}
</style>
