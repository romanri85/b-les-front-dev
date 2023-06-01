<template>

    <slider class="lg:hidden" v-if="isBurgerOpenStore.isBurgerOpen"/>
    <slider class="lg:block hidden"/>
    <search/>
    <projects/>
    <quote/>
    <advantages/>
</template>

<script setup>

import Slider from "~/pages/index/slider.vue";
import Search from "~/pages/index/search.vue";
import Projects from "~/pages/index/projects.vue";
import Quote from "~/pages/index/quote.vue";
import Advantages from "~/pages/index/advantages.vue";
import { useIsBurgerOpenStore} from "~/stores/isBurgerOpenStore";
const isBurgerOpenStore = useIsBurgerOpenStore()

import { ref } from 'vue'
import { TransitionRoot } from '@headlessui/vue'

const isShowing = ref(true)

definePageMeta({layout: "default"});

</script>


