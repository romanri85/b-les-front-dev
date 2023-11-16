<script setup>
import {defineExpose, ref} from 'vue'
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'

defineExpose({
  openModal,
  closeModal,
})

const props = defineProps({
  image: {
    type: String,
  },
})

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}

function openModal() {
  isOpen.value = true
}
</script>

<template>
  <!--  <div class=" flex items-center justify-center"> -->
  <!--    <button -->
  <!--        type="button" -->
  <!--        @click="openModal" -->
  <!--        class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" -->
  <!--    > -->
  <!--      Open dialog -->
  <!--    </button> -->
  <!--  </div> -->
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black modal-background"/>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
            class="flex min-h-full items-center justify-center text-center"
        >
          <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
          >
            <DialogPanel

                class="transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
              />
              <div class="text-center mt-4">
                <buttons-primary-button-big @click="closeModal">
                  <h3>Закрыть</h3>
                </buttons-primary-button-big>
              </div>
              <div class="mt-2">
                <nuxt-img
                    :src="props.image" class="image h-[100vh] w-full object-contain"
                    :alt="props.image"
                />
              </div>


            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<style scoped>
.modal-background {
  opacity: 25%;
}

@media screen and (min-width: 680px) and (max-width: 767px) {
  .image {
    height: 140vh;
  }
}


@media screen and (min-width: 620px) and (max-width: 679px) {
  .image {
    height: 120vh;
  }
}


@media screen and (min-width: 580px) and (max-width: 619px) {
  .image {
    height: 110vh;
  }
}

@media screen and (min-width: 499px) and (max-width: 579px) {
  .image {
    height: 100vh;
  }
}

@media screen and (min-width: 460px) and (max-width: 499px) {
  .image {
    height: 90vh;
  }
}

@media screen and (min-width: 400px) and (max-width: 459px) {
  .image {
    height: 80vh;
  }
}

@media screen and (min-width: 360px) and (max-width: 399px) {
  .image {
    height: 70vh;
  }
}


</style>