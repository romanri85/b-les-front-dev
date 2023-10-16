<script setup lang="ts">
import ArrowToClick from '~/components/arrows/ArrowToClick.vue'

defineProps({
  filterName: String,
})

const isClicked = ref(false)
function toggleArrow() {
  isClicked.value = !isClicked.value
}
</script>

<template>
  <div class=" flex justify-between cursor-pointer" @click="toggleArrow">
    <h4>{{ $props.filterName }}</h4>
    <ArrowToClick :class="{ '-rotate-180': isClicked }" />
  </div>
</template>

<style scoped>

</style>
