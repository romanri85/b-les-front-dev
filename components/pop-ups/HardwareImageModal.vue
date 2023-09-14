<template>
  <!--  <div class=" flex items-center justify-center">-->
  <!--    <button-->
  <!--        type="button"-->
  <!--        @click="openModal"-->
  <!--        class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"-->
  <!--    >-->
  <!--      Open dialog-->
  <!--    </button>-->
  <!--  </div>-->
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25"/>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
            class="flex min-h-full items-center justify-center p-4 text-center"
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

                class="transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
              >

              </DialogTitle>
              <div class="mt-2">
                <nuxt-img :src="image" class=" h-[30vh] w-full object-contain"
                          :alt="image"></nuxt-img>
              </div>

              <div class="text-center mt-4">
                <buttons-primary-button-small @click="closeModal"><h3>Закрыть</h3></buttons-primary-button-small>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {computed, defineExpose, ref} from 'vue'
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot,} from '@headlessui/vue'
import { useRouter } from 'vue-router'


const router = useRouter()

const emit = defineEmits(['chooseTag'])

defineExpose({
  openModal,
  closeModal
});

const props = defineProps({
  image: {
    type: null,
    required: true
  }
})




const isOpen = ref(false)



function closeModal() {
  isOpen.value = false
}

function openModal() {
  isOpen.value = true
}
</script>
