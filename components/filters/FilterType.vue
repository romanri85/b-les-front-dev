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
  <div class=" flex justify-between cursor-pointer mt-4 mb-4" @click="toggleArrow">
    <h3 class="pr-8">
      {{ $props.filterName }}
    </h3>
    <ArrowToClick :class="{ '-rotate-180': isClicked }" class="border" />
  </div>
</template>

<style scoped>

</style>
