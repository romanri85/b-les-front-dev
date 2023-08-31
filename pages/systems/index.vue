<script setup lang="ts">
import HeroSystems from "~/components/pages/systems/heroSystems.vue";
import buttons from "~/data/systemsButtons.json";
import {useInteriorStore} from "~/stores/interiorStore";
import {storeToRefs} from "pinia";

const heroName = "systemsPageHeader"
const heroImage = "/systems/systems-bg.png"

const interiorStore = useInteriorStore()
const {projects} = storeToRefs(interiorStore)
interiorStore.getProjects()
</script>

<template>
  <hero-systems :heroName="heroName" :heroImage="heroImage" :buttons="buttons"/>
  <section class="">
    <div class="relative lg:ml-0 md:ml-8 ml-5 pb-32 swiper-container">
      <Swiper
          :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation, SwiperPagination,  SwiperScrollbar]"
          :breakpoints="{
          360: { slidesPerView: 2.2, slidesPerGroup: 2 },
          768: { slidesPerView: 3.2, slidesPerGroup: 3 },
          1440: { slidesPerView: 4, slidesPerGroup: 4 }
        }"
          :space-between="5"
          :loop="true"
          :navigation="{
          nextEl: '.next-slide-button',
          prevEl: '.prev-slide-button',
        }"
          :scrollbar="{ el: '.swiper-scrollbar', hide: false, draggable: true }"

      >
        <SwiperSlide v-if="interiorStore && interiorStore.projects" v-for="project in interiorStore.projects" :key="project.id">
          <NuxtLink :to="{ path: `/interior/${project.id}`}">
            <img class="w-[480px] lg:h-96 md:h-60 h-48 object-cover" :src="project.first_image.image" :alt="project.name">
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
      <div class="swiper-scrollbar"></div>

      <div class="absolute z-10 right-0 bottom-0 flex gap-2 items-end space-y-2">
        <div class="prev-slide-button hidden lg:block">
          <arrows-arrow-previous-black-and-white></arrows-arrow-previous-black-and-white>
        </div>
        <div class="next-slide-button hidden lg:block">
          <arrows-arrow-next-black-and-white></arrows-arrow-next-black-and-white>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.square {
  position: relative;
  width: 100%;
}

.media-element {
  width: 20%;
}
.swiper-scrollbar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 10px;
  background: rgba(0, 0, 0, 0.1);
}
.swiper-scrollbar-drag {
  background: rgba(0, 0, 0, 0.5);
}

</style>