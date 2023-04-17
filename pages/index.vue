<template>
  <div>
    <client-only>
      <masonry-wall :items="items" :ssr-columns="1" :column-width="300" :gap="16">
        <template #default="{ item, index }">
          <div :style="{ height: `300px` }">
            <img :src="item"/>
          </div>
        </template>
      </masonry-wall>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const items = reactive(['https://media.istockphoto.com/id/1197750837/nl/foto/interieur-behang-mockup.jpg?s=2048x2048&w=is&k=20&c=HBiw5PT05GBHcMgR_4ZBDTlInGp99FbUe8VnufOU2Yg=','https://media.istockphoto.com/id/1197750837/nl/foto/interieur-behang-mockup.jpg?s=2048x2048&w=is&k=20&c=HBiw5PT05GBHcMgR_4ZBDTlInGp99FbUe8VnufOU2Yg=','https://media.istockphoto.com/id/1197750837/nl/foto/interieur-behang-mockup.jpg?s=2048x2048&w=is&k=20&c=HBiw5PT05GBHcMgR_4ZBDTlInGp99FbUe8VnufOU2Yg=','https://media.istockphoto.com/id/1197750837/nl/foto/interieur-behang-mockup.jpg?s=2048x2048&w=is&k=20&c=HBiw5PT05GBHcMgR_4ZBDTlInGp99FbUe8VnufOU2Yg=','https://media.istockphoto.com/id/1197750837/nl/foto/interieur-behang-mockup.jpg?s=2048x2048&w=is&k=20&c=HBiw5PT05GBHcMgR_4ZBDTlInGp99FbUe8VnufOU2Yg=','https://media.istockphoto.com/id/1197750837/nl/foto/interieur-behang-mockup.jpg?s=2048x2048&w=is&k=20&c=HBiw5PT05GBHcMgR_4ZBDTlInGp99FbUe8VnufOU2Yg=','https://media.istockphoto.com/id/1197750837/nl/foto/interieur-behang-mockup.jpg?s=2048x2048&w=is&k=20&c=HBiw5PT05GBHcMgR_4ZBDTlInGp99FbUe8VnufOU2Yg=','https://media.istockphoto.com/id/1197750837/nl/foto/interieur-behang-mockup.jpg?s=2048x2048&w=is&k=20&c=HBiw5PT05GBHcMgR_4ZBDTlInGp99FbUe8VnufOU2Yg=','https://media.istockphoto.com/id/1197750837/nl/foto/interieur-behang-mockup.jpg?s=2048x2048&w=is&k=20&c=HBiw5PT05GBHcMgR_4ZBDTlInGp99FbUe8VnufOU2Yg='])
</script>
<!--<template>-->
<!--  <div class="relative z-10 lg:mt-[-86px] w-screen">-->
<!--    <client-only>-->
<!--      <Swiper-->
<!--          :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation]"-->
<!--          :slides-per-view="1"-->
<!--          :navigation="{-->
<!--      nextEl: '.next-slide-button',-->
<!--      prevEl: '.prev-slide-button',-->
<!--    }"-->
<!--          :loop="true"-->
<!--          :effect="'creative'"-->
<!--          :autoplay="{-->
<!--      delay: 8000,-->
<!--      disableOnInteraction: true,-->
<!--    }"-->
<!--          :creative-effect="{-->
<!--      prev: {-->
<!--        shadow: false,-->
<!--        translate: ['-20%', 0, -1],-->
<!--      },-->
<!--      next: {-->
<!--        translate: ['100%', 0, 0],-->
<!--      },-->
<!--    }"-->

<!--      >-->
<!--        <SwiperSlide v-for="(collection, index) in collections" :key="index">-->
<!--          <div class="hero bg-cover bg-center h-screen w-screen  "-->
<!--               :style="{ backgroundImage: `url(${collection.image})` }">-->
<!--            <div class="flex flex-col justify-between relative w-screen h-screen">-->
<!--              <div class="text-left relative main-container  text-white lg:mt-[200px] xl:mt-[278px] mt-[100px] xl:max-w-[550px] lg:max-w-screen flex justify-between">-->
<!--                <div>-->
<!--                  <h2 class="mb-5">About collection</h2>-->
<!--                  <p class="lg:w-[448px]">{{ collection.description }}</p>-->
<!--                </div>-->
<!--                <div class="relative w-[75px] h-[64px]">-->
<!--                  <svg class="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">-->
<!--                    <line x1="80" y1="20" x2="20" y2="80" stroke="white" stroke-width="1"/>-->
<!--                  </svg>-->
<!--                  <p class="absolute top-0 left-0 flex items-center justify-center w-1/2 h-1/2 text-sm text-white">-->
<!--                    {{ index + 1 }} &lt;!&ndash; Текущий номер слайда &ndash;&gt;-->
<!--                  </p>-->
<!--                  <p class="absolute bottom-0 right-0 flex items-center justify-center w-1/2 h-1/2 text-sm text-white">-->
<!--                    {{ collections.length }} &lt;!&ndash; Общее количество слайдов &ndash;&gt;-->
<!--                  </p>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="relative main-container  flex justify-between">-->
<!--                <button class="prev-slide-button xl:w-[80px] lg:w-[70px] md:w-[60px] sm:w-[30px] xl:h-[80px] lg:h-[70px] md:h-[60px] sm:h-[30px]">-->
<!--                  <img class="hidden md:block" src="/icons/prev-square-icon.svg" alt="prev">-->
<!--                  <img class="md:hidden" src="/icons/prev-page-icon-small.svg" alt="prev">-->
<!--                </button>-->
<!--                <div class="ml-[228px] xl:mb-[145px] lg:mb-[100px]">-->
<!--                  <h1 class="text-white mb-8">{{ collection.name }}</h1>-->
<!--                  <a class="text-white" :href="collection.slug"><h3 class="underline px-1">View-->
<!--                    collection</h3></a>-->
<!--                </div>-->
<!--                <button class="next-slide-button xl:w-[80px] lg:w-[70px] md:w-[60px] sm:w-[30px] xl:h-[80px] lg:h-[70px] md:h-[60px] sm:h-[30px]">-->
<!--                  <img class="hidden md:block" src="/icons/next-square-icon.svg" alt="next">-->
<!--                  <img class="md:hidden" src="/icons/next-page-icon-small.svg" alt="next">-->
<!--                </button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

<!--        </SwiperSlide>-->
<!--      </Swiper>-->
<!--    </client-only>-->
<!--  </div>-->
<!--  <div class=" main-container h-[100vh] bg-white flex justify-center items-center">-->

<!--    <div class="w-[50vw] xl:h-[815px] lg:h-[730px] text-center flex flex-col justify-between flex-1 items-center">-->
<!--      <h1 class="xl:text-50-mono lg:text-45-mono">Search by parameters</h1>-->
<!--      <div v-for="item in tags" :key="item.id" class="">-->
<!--        <h3 class="text-primaryGrey">{{ item.name }}</h3>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="w-[50vw] flex flex-1 justify-center">-->
<!--      <div class="bg-[url('/parameters-search.jpg')] bg-cover bg-center xl:h-[815px] lg:h-[730px] xl:w-[630px] lg:w-[530px] flex justify-center items-center">-->
<!--        <buttons-secondary-button class="xl:w-[320px] xl:h-[80px] lg:w-[250px] lg:h-[70px]">Search photo by tag-->
<!--        </buttons-secondary-button>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="main-container bg-white flex flex-col justify-center items-center">-->
<!--    <h1 class="xl:text-50-mono lg:text-45-mono">Our projects</h1>-->
<!--    <p class="xl:w-[600px] lg:w-[530px]">Our company strives to provide our clients with the opportunity to bring-->
<!--      their design and technical solutions-->
<!--      to life. </p>-->
<!--    &lt;!&ndash;        <div class="grid grid-cols-3 gap-4 masonry">&ndash;&gt;-->
<!--    &lt;!&ndash;            <div v-for="(image, index) in projects" :key="index" class="flex items-center justify-center">&ndash;&gt;-->
<!--    &lt;!&ndash;                <img :src="baseURL+ image.first_image.image" alt="project">&ndash;&gt;-->

<!--    &lt;!&ndash;            </div>&ndash;&gt;-->
<!--    &lt;!&ndash;        </div>&ndash;&gt;-->
<!--    <ul class="list">-->
<!--      <li  v-for="(img,index) in images" :class="`item m-block-${index}`"  :key="index">-->
<!--        <img @click="checkImgSize($event)" :ref="`img-${index}`" :src="img"/>-->
<!--      </li>-->

<!--    </ul>-->
<!--  </div>-->


<!--</template>-->

<!--<script setup>-->
<!--import SecondaryButton from "~/components/buttons/SecondaryButton.vue";-->
<!--import {baseURL} from "~/config.js";-->
<!--import MasonryGrid from '~/components/MasonryGrid.vue';-->

<!--definePageMeta({layout: "default"});-->


<!--const data = await $fetch(`${baseURL}/api/product/collections`)-->
<!--const collections = data.results-->

<!--const tags = await $fetch(`${baseURL}/api/projects/tags`)-->
<!--const projects = await $fetch(`${baseURL}/api/projects`)-->
<!--const projectsImages = projects.map(project => baseURL + project.first_image.image)-->

<!--function checkSize(index){-->
<!--  return index % 2-->
<!--}-->

<!--function checkImgSize(e){-->
<!--  console.log(e.target.width)-->
<!--}-->


<!--const images = ['https://media.istockphoto.com/id/1197750837/nl/foto/interieur-behang-mockup.jpg?s=1024x1024&w=is&k=20&c=eDDwGAp_IaLRIgZl-9XIRdX4uDF_bZFFYlW1JfgVzFM=','https://media.istockphoto.com/id/1197750837/nl/foto/interieur-behang-mockup.jpg?s=1024x1024&w=is&k=20&c=eDDwGAp_IaLRIgZl-9XIRdX4uDF_bZFFYlW1JfgVzFM=','https://media.istockphoto.com/id/1197750837/nl/foto/interieur-behang-mockup.jpg?s=1024x1024&w=is&k=20&c=eDDwGAp_IaLRIgZl-9XIRdX4uDF_bZFFYlW1JfgVzFM=','https://media.istockphoto.com/id/1197750837/nl/foto/interieur-behang-mockup.jpg?s=1024x1024&w=is&k=20&c=eDDwGAp_IaLRIgZl-9XIRdX4uDF_bZFFYlW1JfgVzFM=']-->
<!--</script>-->

<!--<style lang="scss">-->

<!--.list {-->
<!--  display: grid;-->
<!--  grid-template-columns: repeat(4, 1fr);-->
<!--  grid-template-rows: repeat(2, 1fr);-->
<!--  gap: 15px;-->
<!--}-->

<!--.item {-->
<!--  &.m-block-0 {-->
<!--    grid-column: 1 / 1;-->
<!--    grid-row: 1 / 1;-->
<!--   }-->

<!--  &.m-block-1{-->
<!--    grid-column: 1 / 2;-->
<!--    grid-row: 2 / 3;-->
<!--  }-->

<!--  &.m-block-2{-->
<!--    grid-column: 2/3;-->
<!--    grid-row: 1/3;-->
<!--  }-->

<!--  &.m-block-3{-->
<!--    grid-column: 3/5;-->
<!--    grid-row: 1/3;-->
<!--  }-->

<!--  &.m-tiny-1 {-->
<!--    grid-column: 1/5;-->
<!--  }-->

<!--  &.m-tiny-5 {-->
<!--    grid-column: 5/5;-->
<!--  }-->

<!--}-->
<!--</style>-->
