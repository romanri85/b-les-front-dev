<template>


  <index-slider/>
  <lazy-pages-index-search class="mt-24 md:mt-0"/>
  <lazy-pages-index-nature/>
  <lazy-pages-index-projects/>
<!--  <quote/>-->
  <lazy-pages-index-advantages/>
</template>

<script setup lang="ts">

import IndexSearch from "~/components/pages/index/IndexSearch.vue";
import IndexProjects from "~/components/pages/index/IndexProjects.vue";
import IndexAdvantages from "~/components/pages/index/IndexAdvantages.vue";
import IndexNature from "~/components/pages/index/IndexNature.vue";
import IndexSlider from "~/components/pages/index/IndexSlider.vue";
import {useIsBurgerOpenStore} from "~/stores/isBurgerOpenStore";

const isBurgerOpenStore = useIsBurgerOpenStore()

import {ref} from 'vue'
import {TransitionRoot} from '@headlessui/vue'

const isShowing = ref(true)

definePageMeta({layout: "default"});

</script>


