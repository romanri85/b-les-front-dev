<template>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-30">
      <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
            class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
              as="template"
              enter="transition ease-in-out duration-300 transform"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
          >
            <DialogPanel
                class="fixed right-0 top-0 h-screen w-full md:w-[60%] lg:w-[45%] overflow-y-auto bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
<!--              <DialogTitle-->
<!--                  as="h3"-->
<!--                  class="text-lg font-medium leading-6 text-gray-900"-->
<!--              >-->
<!--                Выберите город-->
<!--              </DialogTitle>-->
              <div class="">
                <button
                    type="button"
                    class="inline-flex justify-center border border-transparent bg-primaryDark px-4 py-2 text-xs font-mono  text-white  focus:outline-none "
                    @click="closeModal"
                >
                  Закрыть
                </button>
              </div>
              <div class="mt-8 mb-8">
                <div v-for="system in systems">
                  <h2 class="cursor-pointer mb-8 inline-block" >{{system.name}}</h2>
                  <nuxt-img :src="system.image" class="w-full h-auto object-contain" :alt="system.name"></nuxt-img>
                  <h5 class="pt-5 pb-20">{{system.description}}</h5>
                </div>
                <!--                <city-choice-autocomplete class="h-auto" :cities="props.cities" :city="props.city"/>-->
              </div>


            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { ref, provide } from 'vue'

import { watch, toRefs } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  shouldOpenModal: Number,
  systems: Array,
})


const { shouldOpenModal } = toRefs(props)

watch(shouldOpenModal, (newValue) => {
  if(newValue) {
    openModal()
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

