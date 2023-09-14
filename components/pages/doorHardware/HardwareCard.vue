<script setup lang="ts">

import {toNumber} from "@vue/shared";
import {baseURL} from "~/config";
import HardwareImageModal from "~/components/pop-ups/HardwareImageModal.vue";
import {ref} from "vue";

const props = defineProps({
  hardwareVariant: Object
})

const imgModal = ref(null);



const triggerModal = (image) => {
  if (imgModal.value && imgModal.value.openModal) {
    imgModal.value.openModal();
  } else {
    console.error('Method not available or component not initialized.');
  }
};


</script>

<template>
    <client-only>
        <div  @click="triggerModal(props.hardwareVariant.image)" class="flex flex-col items-center pb-12 cursor-pointer">
          <div class="relative pb-8">

                        <nuxt-img width="200px" height="auto" :src="props.hardwareVariant.image"
                                  class="h-auto w-36 lg:w-48"></nuxt-img>
          </div>
          <hardware-image-modal :image="props.hardwareVariant.image" ref="imgModal"/>

          <div class="flex flex-col items-center">
            <h3 class="pb-3">{{ props.hardwareVariant.hardware.name }}</h3>

            <div class="pb-3 inline-flex">
              <p>{{ props.hardwareVariant.color.color }}</p>
            </div>
            <p class="font-regular">
              {{ toNumber(props.hardwareVariant.price)}}&nbsp;₽</p>
          </div>
        </div>
    </client-only>

</template>

<style scoped>

</style>