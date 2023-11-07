<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import PrimaryButtonBig from '~/components/buttons/PrimaryButtonBig.vue'
import { baseURL } from '~/config'

const props = defineProps({

  isOpen: {
    type: Boolean,
  },
  address: {
    type: Object,
  },
})
const emit = defineEmits(['closeModal', 'changeModel'])
const isOpen = ref(true)
// const products = ref([])
const doorsInside = ref([])

const addressId = ref(1)


async function fetchDoorsInside() {
  doorsInside.value = await $fetch(`${baseURL}/api/shops/doors-inside/?address_id=${props.address.id}`)
}
await fetchDoorsInside()

function closeModal() {
  isOpen.value = false
  emit('closeModal')
}

function openModal() {
  isOpen.value = true
}
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-30" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black modal-background" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-start justify-center  text-center"
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
              class="w-full   transform overflow-hidden  bg-white p-12 text-left align-middle shadow-xl transition-all"
            >
              <div class="">
                <div class="text-right pb-12">
                  <buttons-primary-button-big
                      @click="closeModal"
                  >
                    Закрыть
                  </buttons-primary-button-big>
                </div>
              </div>
              <DialogTitle
                as="h3"
                class="text-center pb-8"
              >
                Образцы дверей в магазине {{ props.address.address }}
              </DialogTitle>
              <div class="px-12 md:grid lg:grid-cols-4 md:grid-cols-3 block  lg:gap-y-16 gap-y-8 mb-2 mt-0 w-full">
                <div
                  v-for="door in doorsInside" v-if="doorsInside"
                  :key="door.id" class="flex flex-col items-center"
                >
                  <NuxtLink
                    class="group"
                    :to="`/catalog/${door.product_variant.product}?material=${door.product_variant.material}&color=${door.color}`"
                  >
                    <div class="relative w-full flex flex-col items-center group pb-10 md:pb-2">
                      <nuxt-img
                        v-if="door.merged_image" key="0" width="100px" height="auto"
                        :src="door.merged_image"
                        class="h-auto w-32"
                      />

                      <!-- Div element with black border that appears on hover -->
                      <div class="hidden lg:block border-b-2 w-[300px]  pt-10 border-transparent group-hover:border-black" />

                      <h4 class="pt-6 pb-4  transform translate-y-2">
                        {{ door.product_variant_name }}
                      </h4>
                      <h5 class="">
                        {{ door.color_name }}
                      </h5>
                    </div>
                  </NuxtLink>

                  <!-- <div class="text-center text-sm">{{ model.name }}</div> -->
                </div>
              </div>
              <!-- -->

              <div class=" text-right mt-12">
                <div class="">
                  <buttons-primary-button-big
                      @click="closeModal"
                  >
                    Закрыть
                  </buttons-primary-button-big>
                </div>
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
