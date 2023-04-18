<template>
  <div id="app">
    <nuxt-layout :name="activeLayout">
      <nuxt-page/>
    </nuxt-layout>
  </div>
</template>

<script setup>
import {ref} from 'vue'
const activeLayout = ref('main')
</script>

<style scoped>

</style>
