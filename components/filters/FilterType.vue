<script setup lang="ts">

defineProps({
  filterName: String,
})

import ArrowToClick from "~/components/arrows/ArrowToClick.vue";

const isClicked = ref(false)
const toggleArrow = () => {
  isClicked.value = !isClicked.value
}

</script>

<template>
  <div @click="toggleArrow" class=" flex justify-between cursor-pointer mb-[25px]">
    <h3>{{$props.filterName}}</h3>
    <ArrowToClick :class="{'-rotate-180': isClicked}"/>
  </div>
</template>

<style scoped>

</style>