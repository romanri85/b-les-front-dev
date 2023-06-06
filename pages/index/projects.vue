<template>
      <div class="flex flex-col justify-center items-center mt-32">
  <h2 class=" mb-8">{{ $t('ourProjects') }}</h2>
  <h5 class=" lg:w-530 mb-12 main-container text-primaryDark">{{
      $t('ourProjectsDescription')
    }} </h5>
  <!--        <div class="flex flex-row flex-wrap gap-1 justify-center lg:mb-10 md:mb-7 mb-5">-->
  <!--            <div v-for="(img,index) in projectsImages" class="lg:w-full lg:flex-1 md:w-[calc(50%-2px)] w-[calc((25%-2x)]" :key="index">-->
  <!--                <nuxt-img placeholder class="w-full h-full object-cover object-center aspect-square" :src="img"/>-->
  <!--            </div>-->
          </div>

  <div class="relative">
  <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation, SwiperPagination]"
      :slides-per-view="5"
      :slides-per-group="5"
      :loop="true"
      :free-mode="true"
      :space-between="10"
      :navigation="{
      nextEl: '.next-slide-button',
      prevEl: '.prev-slide-button',
          }"
  >
<!--    <div v-for="project in projects" :key="project.name">-->
    <SwiperSlide v-for="project in projects" :key="project.name">
      <img
          class="aspect-[1.7] object-cover"
          :src="project.url"
          :alt="project.name">
    </SwiperSlide>
<!--    </div>-->

    <div class="flex justify-between ">
      <button
          class="prev-slide-button xl:w-[80px] lg:w-[70px] md:w-[60px] w-[30px] xl:h-[80px] lg:h-[70px] md:h-[60px] h-[30px] ">
        <nuxt-img placeholder class="hidden md:block" src="/icons/prev-square-icon.svg" alt="prev"/>
        <nuxt-img placeholder class="md:hidden" src="/icons/prev-page-icon-small.svg" alt="prev"/>
      </button>
      <button
          class="next-slide-button xl:w-[80px] lg:w-[70px] md:w-[60px] w-[30px] xl:h-[80px] lg:h-[70px] md:h-[60px] h-[30px] ">
        <nuxt-img placeholder class="hidden md:block" src="/icons/next-square-icon.svg" alt="next"/>
        <nuxt-img placeholder class="md:hidden" src="/icons/next-page-icon-small.svg" alt="next"/>
      </button>

    </div>
  </Swiper>
  </div>

<!--  <ButtonsPrimaryButton>-->
<!--    {{ $t('viewMore') }}-->
<!--  </ButtonsPrimaryButton>-->
  <!--    </div>-->
</template>

<script setup>
import projects from "~/data/projects.json"

// const projects = await $fetch(`${baseURL}/api/projects/`)
// const projects = await $fetch(`/api/projects/`)
// const projectsImages = projects.map(project => project.first_image.image)
</script>

<style scoped>
.square {
  position: relative;
  width: 100%;
}

.media-element {
  width: 20%;
}


</style>