<template>


  <slider/>
  <lazy-pages-index-search/>
  <lazy-pages-index-nature/>
  <lazy-pages-index-projects/>
<!--  <quote/>-->
  <lazy-pages-index-advantages/>
</template>

<script setup lang="ts">

import Slider from "~/components/pages/index/slider.vue";
import Search from "~/components/pages/index/search.vue";
import Projects from "~/components/pages/index/projects.vue";
import Advantages from "~/components/pages/index/advantages.vue";
import {useIsBurgerOpenStore} from "~/stores/isBurgerOpenStore";

const isBurgerOpenStore = useIsBurgerOpenStore()
import Welcome from "~/components/pop-ups/allCollectionsModalDetail.vue";

import {ref} from 'vue'
import {TransitionRoot} from '@headlessui/vue'
import Nature from "~/components/pages/index/nature.vue";
const isShowing = ref(true)

definePageMeta({layout: "default"});

</script>


