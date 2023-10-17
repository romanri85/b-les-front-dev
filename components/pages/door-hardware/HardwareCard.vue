<script setup lang="ts">
import { ref } from 'vue'
import HardwareImageModal from '~/components/pop-ups/HardwareImageModal.vue'

const props = defineProps({
  hardwareVariant: Object,
})

const nuxt-imgModal = ref(null)

function triggerModal() {
  if (nuxt-imgModal.value && nuxt-imgModal.value.openModal)
    nuxt-imgModal.value.openModal()
  else
    console.error('Method not available or component not initialized.')
}
</script>

<template>
  <client-only>
    <div class="flex flex-col items-center pb-12 cursor-pointer" @click=" triggerModal(props.hardwareVariant.image)">
      <div class="relative pb-8">
        <nuxt-nuxt-img
          v-if="props.hardwareVariant && props.hardwareVariant.image" width="200px" height="auto" :src="props.hardwareVariant.image"
          class="h-auto w-36 lg:w-48"
        />
      </div>
      <HardwareImageModal ref="nuxt-imgModal" :image="props.hardwareVariant.image" />

      <div class="flex flex-col items-center">
        <h3 class="pb-3">
          {{ props.hardwareVariant.hardware.name }}
        </h3>

        <div class="pb-3 inline-flex">
          <p>{{ props.hardwareVariant.color.color }}</p>
        </div>
        <p class="font-regular">
          {{ parseInt(props.hardwareVariant.price) }}&nbsp;₽
        </p>
      </div>
    </div>
  </client-only>
</template>

<style scoped>

</style>
