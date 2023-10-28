<script setup lang="js">
import { baseURL } from '~/config'
import { useRouter } from 'vue-router'

const router = useRouter()
const projects = ref([])



projects.value = await $fetch(`${baseURL}/api/projects/projects-without-pagination`)
</script>

<template>
  <div class="flex flex-col justify-center items-center lg:mt-32 md:mt-20 mt-24 lg:mx-48 md:mx-10  main-container">
    <h2 class="">
      {{ $t('ourProjects') }}
    </h2>
    <div class="lg:mt-4 md:mt-3 mt-5 lg:mb-12 md:mb-8 mb-5">
      <h5 class=" text-primaryDark md:text-center">
        {{
          $t('ourProjectsDescription')
        }}
      </h5>
    </div>
    <!--        <div class="flex flex-row flex-wrap gap-1 justify-center lg:mb-10 md:mb-7 mb-5"> -->
    <!--            <div v-for="(nuxt-img,index) in projectsImages" class="lg:w-full lg:flex-1 md:w-[calc(50%-2px)] w-[calc((25%-2x)]" :key="index"> -->
    <!--                <nuxt-img placeholder class="w-full h-full object-cover object-center aspect-square" :src="nuxt-img"/> -->
    <!--            </div> -->
  </div>

  <div class="relative lg:ml-0 md:ml-8 ml-5">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation, SwiperPagination]"
      :breakpoints="{
        360: {
          slidesPerView: 2.2,
          slidesPerGroup: 1,
        },

        768: {
          slidesPerView: 3.2,
          slidesPerGroup: 1,
        },
        1440: {
          slidesPerView: 4,
          slidesPerGroup: 1,
        },
      }"
      :space-between="5"
      :loop="true"
      :navigation="{
        nextEl: '.next-slide-button',
        prevEl: '.prev-slide-button',
      }"
    >
      <!--    <div v-for="project in projects" :key="project.name"> -->
      <SwiperSlide v-for="project in projects" v-if="projects" :key="project.id">
        <nuxt-link :to="`/interior/${project.id}`">

          <nuxt-img
            loading="lazy" placeholder quality="20"
            class="w-[480px] lg:h-96 md:h-60 h-48 object-cover cursor-pointer"
            :src="project.first_image.image"
            :alt="project.name"
          />
        </nuxt-link>

      </SwiperSlide>
      <!--    </div> -->

      <arrows-arrow-previous-black-and-white
        class="prev-slide-button absolute z-10 left-10 top-1/2 -translate-y-1/2 hidden lg:block"
      />
      <arrows-arrow-next-black-and-white
        class="next-slide-button absolute z-10 right-10 top-1/2 -translate-y-1/2  hidden lg:block"
      />
    </Swiper>
  </div>
  <!--  <ButtonsPrimaryButton> -->
  <!--    {{ $t('viewMore') }} -->
  <!--  </ButtonsPrimaryButton> -->
  <!--    </div> -->
</template>

<style scoped>
.square {
  position: relative;
  width: 100%;
}

.media-element {
  width: 20%;
}
</style>
