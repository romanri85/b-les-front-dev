<template>
  <client-only>
<!--    <welcome/>-->
  </client-only>

  <slider class="lg:hidden" v-if="isBurgerOpenStore.isBurgerOpen"/>
  <slider class="lg:block hidden"/>
  <search/>
  <nature/>
  <projects/>
<!--  <quote/>-->
  <advantages/>
</template>

<script setup>

import Slider from "~/pages/index/slider.vue";
import Search from "~/pages/index/search.vue";
import Projects from "~/pages/index/projects.vue";
import Advantages from "~/pages/index/advantages.vue";
import {useIsBurgerOpenStore} from "~/stores/isBurgerOpenStore";

const isBurgerOpenStore = useIsBurgerOpenStore()
import Welcome from "~/components/pop-ups/welcome.vue";

import {ref} from 'vue'
import {TransitionRoot} from '@headlessui/vue'
import Nature from "~/pages/index/nature.vue";

const isShowing = ref(true)

definePageMeta({layout: "default"});

</script>


