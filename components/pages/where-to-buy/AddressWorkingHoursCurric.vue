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
  <div @click="toggleArrow" class=" flex justify-between cursor-pointer">
    <h4>{{$props.filterName}}</h4>
    <ArrowToClick :class="{'-rotate-180': isClicked}"/>
  </div>
</template>

<style scoped>

</style>