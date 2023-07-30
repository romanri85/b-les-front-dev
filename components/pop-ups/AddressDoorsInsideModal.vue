<script setup>
import {ref} from 'vue'
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot,} from '@headlessui/vue'
import PrimaryButtonSmall from "~/components/buttons/PrimaryButtonSmall.vue";
import {baseURL} from "~/config.js";
import collections from "~/.output/server/chunks/app/_nuxt/SliderCollections-7749036a.mjs";

const isOpen = ref(true)
const emit = defineEmits(['closeModal', 'changeModel'])
const products = ref([])

const props = defineProps({
doorsInside: {
  type: Array,
},
  isOpen: {
    type: Boolean,
  },
  address: {
    type: Object,
  },
})

const activeProductId = ref(1)

function closeModal() {
  console.log('closed')
  isOpen.value = false
  emit('closeModal')
}

function openModal() {
  isOpen.value = true
}

function chooseProduct(product) {
  activeProductId.value = product.id
  emit('changeModel', product)
  emit('closeModal')
}





</script>

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
        <div class="fixed inset-0 bg-black bg-opacity-25"/>
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
              <DialogTitle
                  as="h3"
                  class="text-center pb-8"
              >
                Образцы дверей в магазине {{ props.address.address }}
              </DialogTitle>
              <div class="px-12  flex max-w-[100%] gap-y-6 gap-x-8 mb-2 mt-0 flex-wrap justify-center w-full">
                <div v-if="props.doorsInside" v-for="door in props.doorsInside"
                     :key="door.id"  class="flex flex-col items-center">
                  <NuxtLink class="group"
                      :to="`/catalog/${door.product_variant.product}?material=${door.product_variant.material}&color=${door.color}`">

                  <div class="relative pb-2" >
                    <nuxt-img v-if="door.merged_image" key=0 width="100px" height="auto"
                              :src="door.merged_image"
                              class="h-auto w-32"></nuxt-img>

                  </div>
                  <h4 class="pt-4  border-b border-transparent group-hover:border-black transform translate-y-2">{{ door.product_variant_name }}</h4>
                  <h5 class="pt-2">{{ door.color_name }}</h5>
                  </NuxtLink>

                  <!--                  <div class="text-center text-sm">{{ model.name }}</div>-->
                </div>
                <!-- -->
              </div>

              <div class=" text-center mt-12">
                <primary-button-small
                    type="button"
                    class="inline-flex justify-center border border-transparent bg-black-100 px-4 py-2  hover:bg-black-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black-500 focus-visible:ring-offset-2"
                    @click="closeModal"
                >
                  Закрыть
                </primary-button-small>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>


