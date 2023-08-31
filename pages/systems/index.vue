<script setup lang="ts">
import {baseURL} from "~/config.js";
import HeroSystems from "~/components/pages/systems/heroSystems.vue";
import buttons from "~/data/systemsButtons.json";
import {useInteriorStore} from "~/stores/interiorStore";
import {storeToRefs} from "pinia";

const swiperInstance = ref(null);
const heroName = "systemsPageHeader"
const heroImage = "/systems/systems-bg.png"
const shouldAllowSlide = ref(true);  // Conditionally set this to false or true based on your needs

const interiorStore = useInteriorStore()
const {projects} = storeToRefs(interiorStore)
const systems = ref([])
const swiperInitialized = ref(false);
const isLeftButtonDisabled = ref(true);
const isRightButtonDisabled = ref(false);
interiorStore.getProjects()

async function fetchSystems() {
  const allSystems = await $fetch(`${baseURL}/api/product/systems`);
  systems.value = allSystems.slice(0, 8);
}


const isDragging = ref(false);


function enhanceDrag() {
  console.log('enhance drag')
  isDragging.value = true;
}

function revertDrag() {
  console.log('enhance drag')

  isDragging.value = false;
};

function disableLeftButton() {
  if (swiperInitialized.value) {
    console.log('disable left button')

    isLeftButtonDisabled.value = true;
    isRightButtonDisabled.value = false;
  }

};

function disableRightButton() {
  if (swiperInitialized.value) {
    console.log('disable right button')

    isRightButtonDisabled.value = true;
    isLeftButtonDisabled.value = false;
  }

};

function enableLeftButton() {
  if (swiperInitialized.value && isLeftButtonDisabled.value) {
    console.log('enable right left buttons')

    isLeftButtonDisabled.value = false;
  }

}

function enableRightButton() {
  if (swiperInitialized.value && isRightButtonDisabled.value) {
    console.log('enable right left buttons')

    isRightButtonDisabled.value = false;
  }

}

function dragStart() {
  enhanceDrag()

}

function fromEdge() {
  console.log('from edge')
  enableRightButton()
  enableLeftButton()
}



onMounted(() => {
  fetchSystems()
  swiperInitialized.value = true;
})
</script>

<template>
  <hero-systems :heroName="heroName" :heroImage="heroImage" :buttons="buttons"/>
  <section class="main-container">
    <div class="relative lg:ml-0 md:ml-8 ml-5 pb-32 swiper-container">
      <!--      <client-only>-->
      <Swiper
          :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation, SwiperPagination,  SwiperScrollbar]"
          :breakpoints="{
          360: { slidesPerView: 2.2, slidesPerGroup: 2 },
          768: { slidesPerView: 3.2, slidesPerGroup: 3 },
          1440: { slidesPerView: 3},
        }"
          :space-between="5"
          :touch-ratio="1"
          :loop="false"
          :freeMode="true"
          @reachBeginning="disableLeftButton"
          @reachEnd="disableRightButton"
          @fromEdge="fromEdge"
          :freeModeMomentum="true"
          :freeModeMomentumRatio="0.1"
          :navigation="{
          nextEl: '.next-slide-button',
          prevEl: '.prev-slide-button',

        }"
          :scrollbar="{
            el: '.swiper-scrollbar',

            hide: false,
            draggable: true,
            dragSize: 'auto',
            dragClass: 'swiper-scrollbar-drag',
            snapOnRelease: true,



          }"
          @scrollbarDragStart="dragStart"
          @scrollbarDragEnd="revertDrag"


      >
        <SwiperSlide v-if="systems" v-for="system in systems" :key="system.id">
          <!--          <NuxtLink :to="{ path: `/interior/${project.id}`}">-->
          <img class="w-[480px] lg:h-96 md:h-60 h-48 object-cover" :src="system.image" :alt="system.name">
          <!--          </NuxtLink>-->
        </SwiperSlide>

        <div class="fixed-controls flex  pt-20 pb-20">

          <div :class="['swiper-scrollbar']">
            <div class="swiper-drag" :class="['swiper-scrollbar-drag', { 'enhanced-drag': isDragging }]"></div>
          </div>

          <div class="prev-slide-button hidden lg:block pl-20 pr-8">
            <arrows-arrow-previous-black-and-white
                :class="{ 'bg-red-important': isLeftButtonDisabled }"></arrows-arrow-previous-black-and-white>
          </div>
          <div class="next-slide-button hidden lg:block">
            <arrows-arrow-next-black-and-white
                :class="{ 'bg-red-important': isRightButtonDisabled }"></arrows-arrow-next-black-and-white>
          </div>
        </div>
      </Swiper>
      <!--      </client-only>-->
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
  position: relative;
  height: 3px;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  overflow: visible;
  left: 0 !important;

}

.swiper-scrollbar-drag {
  background-color: black;

}

.swiper-scrollbar-drag:hover {
  position: relative;
  top: -2px;
  cursor: pointer;
  height: 6px; /* Update based on your requirements */
  background-color: #000; /* Update based on your requirements */


}

.swiper-scrollbar-drag:before, .swiper-scrollbar-drag:after {
  content: "";
  position: absolute;
  top: -15px;
  height: 30px;
  width: 100%;
  background: transparent;
  cursor: pointer;
}


.enhanced-drag {
  position: relative;
  top: -2px;
  height: 6px;
  background-color: black;
}


.bg-red-important {
  opacity: 0.3 !important;
  cursor: not-allowed !important;
}
</style>
