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
  collectionProducts: {
    type: Array,
  },
  product:
      {
        type: Object,
      }
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






onMounted(() => {


})

</script>

<template>

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
                Все модели коллекции
              </DialogTitle>
              <div class="flex gap-y-6 gap-x-8 mb-2 mt-0 flex-nowrap justify-center w-full">
                <div v-if="props.collectionProducts" v-for="product in collectionProducts"
                     :key="product.id" @click="chooseProduct(product)" class="flex flex-col items-center">
                  <div class="relative pb-2 border-b"
                       :class="{'border-b': product.id === props.product.id, 'border-black':product.id === props.product.id, 'border-transparent': product.id!== props.product.id}">
                    <!--            <nuxt-img width="200px" height="auto" :src="props.doorVariant.casing_variant.image"-->
                    <!--                      class="h-auto w-48"></nuxt-img>-->
                    <!--            <nuxt-img width="200px" height="auto"-->
                    <!--                      :src="props.doorVariant.leaf_image"-->
                    <!--                      class="h-auto w-48 absolute top-0"></nuxt-img>-->

                    <nuxt-img v-if="product.merged_image" key=0 width="100px" height="auto"
                              :src="product.merged_image"
                              class="h-auto w-32"></nuxt-img>

                  </div>
                  <h3 class="pt-4">{{ product.name }}</h3>
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


