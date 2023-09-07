<script setup lang="ts">
// import {baseURL} from "~/config.js";

import {program} from "@babel/types";
import systemsModal from "~/components/pop-ups/systemsModal.vue";

const props = defineProps({
  systems: {
    type: Array,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  shouldOpenModal: {
    type:Number
  }
})


const shouldOpenModal = ref(0)

function openSystemModal() {
  shouldOpenModal.value = shouldOpenModal.value + 1
}

const systems = computed(() => props.systems.filter(item => item.opening_type.name === props.name))

const isSliderInitialized = ref(false);
const isLeftButtonDisabled = ref(true);
const isRightButtonDisabled = ref(false);
const isDragging = ref(false);


const baseURL = 'http://localhost:8000'


function disableLeftButton() {
  if (isSliderInitialized.value && !isRightButtonDisabled.value) {
    isLeftButtonDisabled.value = true;
    isRightButtonDisabled.value = false;
  }
}

function disableRightButton() {
  if (isSliderInitialized.value && !isLeftButtonDisabled.value) {
    isRightButtonDisabled.value = true;
    isLeftButtonDisabled.value = false;
  }
}


function fromEdge() {
  if (systems.value.length === 4) {
   return
    }
  else {
    isLeftButtonDisabled.value =false
    isRightButtonDisabled.value =false
  }

}

function fourElementsCase() {
  if (systems.value.length === 4) {
    isLeftButtonDisabled.value = !isLeftButtonDisabled.value
    isRightButtonDisabled.value = !isRightButtonDisabled.value
    return;
  }
  else {
   return
  }
}

onMounted(() => {
  isSliderInitialized.value = true;
})

</script>

<template>
  <section class="main-container">
    <div class="flex flex-col justify-between  pb-4 lg:pb-8  lg:ml-0 md:ml-8 ml-5 ">
      <h2 class="lg:pb-10 md:pb-8 pb-6">{{ props.name }}</h2>
      <h5 v-if="systems && systems[0] &&systems[0].opening_type">{{systems[0].opening_type.description}}</h5>
    </div>
    <div class="relative lg:ml-0 md:ml-8 ml-5 swiper-container">
      <client-only>
        <Swiper
            :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation, SwiperPagination,  SwiperScrollbar]"
            :breakpoints="{
          360: { slidesPerView: 1.2, slidesPerGroup: 1 },
          768: { slidesPerView: 2.2, slidesPerGroup: 2 },
          1440: { slidesPerView: 3, slidesPerGroup: 3},
        }"
            :space-between="5"

            :loop="false"
            @reachBeginning="disableLeftButton"
            @reachEnd="disableRightButton"
            @fromEdge="fromEdge"
            @activeIndexChange="fourElementsCase"

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
            @scrollbarDragStart="isDragging = true"
            @scrollbarDragEnd="isDragging = false"


        >
          <SwiperSlide v-if="systems" v-for="system in systems" :key="system.id">
            <!--          <NuxtLink :to="{ path: `/interior/${project.id}`}">-->

            <img @click="openSystemModal" class="cursor-pointer w-auto h-auto object-contain" :src="system.image" :alt="system.name">
            <h4 @click="openSystemModal" class="cursor-pointer pt-5">{{system.name}}</h4>
            <!--          </NuxtLink>-->
          </SwiperSlide>


          <div class="fixed-controls flex  pt-12 lg:pt-20 lg:pb-8 pb-12">
            <div :class="['swiper-scrollbar']">
              <div class="swiper-drag " :class="['swiper-scrollbar-drag', { 'enhanced-drag': isDragging }]"></div>
            </div>

            <div class="prev-slide-button hidden md:block pl-20 pr-8">
              <arrows-arrow-previous-black-and-white
                  :class="{ 'arrow-disabled': isLeftButtonDisabled }"></arrows-arrow-previous-black-and-white>
            </div>
            <div class="next-slide-button hidden md:block">
              <arrows-arrow-next-black-and-white
                  :class="{ 'arrow-disabled': isRightButtonDisabled }"></arrows-arrow-next-black-and-white>
            </div>
          </div>
        </Swiper>
        <systems-modal :should-open-modal="shouldOpenModal" :systems="systems"/>

      </client-only>
    </div>
  </section>
</template>

<style scoped>


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


.arrow-disabled {
  opacity: 0.3 !important;
  cursor: default !important;
}
</style>
