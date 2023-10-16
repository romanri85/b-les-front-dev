<script setup>
import { watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['show', 'hide'])
watch(
  () => props.show,
  (show) => {
    if (show)
      emit('show')
    else
      emit('hide')
  },
)
</script>

<template>
  <div v-show="false" />
</template>
