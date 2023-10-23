<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { ref, toRefs, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  shouldOpenModal: Number,
  city: Object,
  cities: Array,
})

const emits = defineEmits(['change-city'])

const { shouldOpenModal } = toRefs(props)

watch(shouldOpenModal, (newValue) => {
  if (newValue)
    openModal()
})

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}

function openModal() {
  isOpen.value = true
}
function changeCity(id) {
  emits('change-city', id)
  closeModal()
}
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50" @close="closeModal">
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
              class="w-full h-auto overflow-visible max-h-screen max-w-md transform  bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Выберите город
              </DialogTitle>
              <div class="mt-8 mb-8">
                <div v-for="city in props.cities" :key="city.name">
                  <h4 class="cursor-pointer mb-4 underline-direction inline-block" @click="changeCity(city.id)">
                    {{ city.name }}
                  </h4>
                </div>
                <!--                <city-choice-autocomplete class="h-auto" :cities="props.cities" :city="props.city"/> -->
              </div>

              <div class="">
                <button
                  type="button"
                  class="inline-flex justify-center border border-transparent bg-primaryDark px-4 py-2 text-xs font-mono  text-white  focus:outline-none "
                  @click="closeModal"
                >
                  Закрыть
                </button>
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
</style>
