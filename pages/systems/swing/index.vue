<script setup lang="ts">
// import {baseURL} from "~/config.js";
import HeroSystems from "~/components/pages/systems/heroSystems.vue";
import buttons from "~/data/systemsButtons.json";
import OpeningType from "~/components/pages/systems/OpeningType.vue";
import SystemsModal from "#build/components/pop-ups/systemsModal.vue";

const heroName = "systemsPageHeader"
const heroImage = "/systems/systems-bg.png"

const swingSystems = ref([])
const shouldOpenModal = ref(0)


const baseURL = 'http://localhost:8000'


async function fetchSwingSystems() {
  const allSystems = await $fetch(`${baseURL}/api/product/systems`);
  swingSystems.value = allSystems.filter(item => item.opening_type.opening === 'Распашные');
}


onMounted(() => {
  fetchSwingSystems()
})
</script>

<template>
  <div class="pb-32">
    <hero-systems :heroName="heroName" :heroImage="heroImage" :buttons="buttons"/>
    <h1 class="flex justify-center pl-5 md:pl-0  pt-12 md:pt-20 pb-12 main-container">Распашные двери</h1>
    <opening-type class="md:mt-8 lg:mt-12" :should-open-modal="shouldOpenModal" :name="'В классическом коробе'" :systems="swingSystems"/>
    <opening-type class="md:mt-8 lg:mt-12" :should-open-modal="shouldOpenModal" :name="'В компланарном коробе'" :systems="swingSystems"/>
    <opening-type class="md:mt-8 lg:mt-12" :should-open-modal="shouldOpenModal" :name="'В скрытом коробе'" :systems="swingSystems"/>

  </div>
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
