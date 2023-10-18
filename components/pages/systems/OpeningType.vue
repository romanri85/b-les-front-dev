<script setup lang="ts">
// import {baseURL} from "~/config.js";

import systemsModal from '~/components/pop-ups/SystemsModal.vue'
import SystemsOpeningTypePrevArrow from '~/components/pages/systems/SystemsOpeningTypePrevArrow.vue'
import SystemsOpeningTypeNextArrow from '~/components/pages/systems/SystemsOpeningTypeNextArrow.vue'
import {ref} from "vue";

const props = defineProps({
  systems: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  shouldOpenModal: {
    type: Number,
  },
})

const shouldOpenModal = ref(0)

function openSystemModal() {
  shouldOpenModal.value = shouldOpenModal.value + 1
}

const systems = computed(() => props.systems.filter(item => item.opening_type.name === props.name))
const hoveredSystem = ref('')

const isSliderInitialized = ref(false)
const isLeftButtonDisabled = ref(true)
const isRightButtonDisabled = ref(false)
const isDragging = ref(false)

const baseURL = 'http://localhost:8000'

function setActiveSystem(id) {
  hoveredSystem.value = id;
  const videoElement = document.getElementById(`video-${id}`);
  if (videoElement) {
    videoElement.loop = true;  // Ensure the video loops while the cursor is on the system
    videoElement.play();
  }
}

function clearActiveSystem() {
  const id = hoveredSystem.value;
  const videoElement = document.getElementById(`video-${id}`);
  if (videoElement) {
    videoElement.loop = false;  // Stop the video from looping once the cursor leaves the system
    videoElement.onended = () => {
      hoveredSystem.value = '';
    };
  } else {
    hoveredSystem.value = '';
  }
}

function disableLeftButton() {
  if (isSliderInitialized.value && !isRightButtonDisabled.value) {
    isLeftButtonDisabled.value = true
    isRightButtonDisabled.value = false
  }
}

function disableRightButton() {
  if (isSliderInitialized.value && !isLeftButtonDisabled.value) {
    isRightButtonDisabled.value = true
    isLeftButtonDisabled.value = false
  }
}

function fromEdge() {
  if (systems.value.length === 4) {

  }
  else {
    isLeftButtonDisabled.value = false
    isRightButtonDisabled.value = false
  }
}

function fourElementsCase() {
  if (systems.value.length === 4) {
    isLeftButtonDisabled.value = !isLeftButtonDisabled.value
    isRightButtonDisabled.value = !isRightButtonDisabled.value
  }
  else {

  }
}

onMounted(() => {
  isSliderInitialized.value = true
})
</script>

<template>
  <section class="main-container">
    <div class="flex flex-col justify-between  pb-4 lg:pb-8  lg:ml-0 md:ml-8 ml-5 ">
      <h2 class="lg:pb-10 md:pb-8 pb-6">
        {{ props.name }}
      </h2>
      <h5 v-if="systems && systems[0] && systems[0].opening_type">
        {{ systems[0].opening_type.description }}
      </h5>
    </div>
    <div class="relative lg:ml-0 md:ml-8 ml-5 swiper-container">
      <client-only>
        <Swiper
          :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation, SwiperPagination, SwiperScrollbar]"
          :breakpoints="{
            360: { slidesPerView: 1.2, slidesPerGroup: 1 },
            768: { slidesPerView: 2.2, slidesPerGroup: 2 },
            1440: { slidesPerView: 3, slidesPerGroup: 3 },
          }"
          :space-between="5"

          :loop="false"
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
          @reachBeginning="disableLeftButton"
          @reachEnd="disableRightButton"

          @fromEdge="fromEdge"
          @activeIndexChange="fourElementsCase"
          @scrollbarDragStart="isDragging = true"
          @scrollbarDragEnd="isDragging = false"
        >
          <SwiperSlide v-for="system in systems" v-if="systems" :key="system.id"
                       v-on:mouseenter="() => setActiveSystem(system.id)"
                       v-on:mouseleave="clearActiveSystem"
                       class="hover:cursor-pointer"
          >
            <!--          <NuxtLink :to="{ path: `/interior/${project.id}`}"> -->

            <nuxt-img placeholder class="cursor-pointer w-full h-auto object-contain" :src="system.image" :alt="system.name" @click="openSystemModal" />
            <video
                @click="openSystemModal"
                v-if="hoveredSystem === system.id"
                :id="`video-${system.id}`"
                :src="system.video"
                autoplay
                loop
                muted
                class="absolute top-0 left-0 w-full h-auto"
            ></video>
            <h4 class="cursor-pointer pt-5" @click="openSystemModal">
              {{ system.name }}
            </h4>
            <!--          </NuxtLink> -->
          </SwiperSlide>

          <div class="fixed-controls flex  pt-12 lg:pt-20 lg:pb-8 pb-12">
            <div class="swiper-scrollbar">
              <div class="swiper-drag  swiper-scrollbar-drag" :class="[{ 'enhanced-drag': isDragging }]" />
            </div>

            <div class="prev-slide-button hidden md:block pl-20 pr-8">
              <SystemsOpeningTypePrevArrow
                :class="{ 'arrow-disabled': isLeftButtonDisabled }"
              />
            </div>
            <div class="next-slide-button hidden md:block">
              <SystemsOpeningTypeNextArrow
                :class="{ 'arrow-disabled': isRightButtonDisabled }"
              />
            </div>
          </div>
        </Swiper>
        <systems-modal :should-open-modal="shouldOpenModal" :systems="systems" />
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
