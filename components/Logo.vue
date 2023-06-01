<script setup lang="ts">
defineProps({light: {type: Boolean, default: true}})
</script>

<template>
    <img :src="light ? '/logo-white.svg' : '/logo-black.svg'" alt="logo"
         class="hover:cursor-pointer xl:w-[246px] lg:min-w-[232px]  md:w-[182px] w-[162px] lg:order-1 md:order-2 order-1"></template>

<style scoped>

</style>