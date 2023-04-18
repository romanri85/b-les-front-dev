<template>
  <div class="main-layout">
    <main-header :light="isLight"/>
    <button @click="isLight = !isLight">Change light</button>
    <slot/>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import MainHeader from '@/components/layout/main/MainHeader.vue'
const isLight = ref(false)
</script>
