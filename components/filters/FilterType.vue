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
  <div @click="toggleArrow" class=" flex justify-between cursor-pointer mt-4 mb-4">
    <h3 class="pr-8">{{$props.filterName}}</h3>
    <ArrowToClick :class="{'-rotate-180': isClicked}" class="border"/>
  </div>
</template>

<style scoped>

</style>