<template>
    <slider/>
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

definePageMeta({layout: "default"});

</script>


