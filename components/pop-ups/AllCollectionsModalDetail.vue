<script setup>
import {ref} from 'vue'
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot,} from '@headlessui/vue'
import PrimaryButtonSmall from "~/components/buttons/PrimaryButtonSmall.vue";
import {baseURL} from "~/config.js";
import PrimaryButtonBig from "~/components/buttons/PrimaryButtonBig.vue";

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
      },
  isOpen: {
    type: Boolean,
  },
  material: {
    type: Number
  },
  color: {
    type: Number
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
  console.log('chooseProduct', product)
  activeProductId.value = product.id
  emit('changeModel', product)
  emit('closeModal')
}






onMounted(() => {


})
// TODO: add @close="closeModal" to Dialog to close modal on click outside
</script>

<template>
  <div>
    <client-only>
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
                Все модели коллекции
              </DialogTitle>
              <div class="flex flex-col md:flex-row gap-y-6 gap-x-8 mb-2 mt-0 flex-nowrap justify-center w-full">
                <div v-if="props.collectionProducts" v-for="product in collectionProducts"
                     :key="product.id"  class="flex flex-col items-center">

                  <div @click="chooseProduct(product)" class="relative pb-4 px-4 border-b-2 flex flex-col items-center cursor-pointer"
                       :class="{'border-primaryDark':product.id === props.product.id, 'border-transparent': product.id !== props.product.id}">
                    <!--            <nuxt-img width="200px" height="auto" :src="props.doorVariant.casing_variant.image"-->
                    <!--                      class="h-auto w-48"></nuxt-img>-->
                    <!--            <nuxt-img width="200px" height="auto"-->
                    <!--                      :src="props.doorVariant.leaf_image"-->
                    <!--                      class="h-auto w-48 absolute top-0"></nuxt-img>-->

                    <nuxt-img v-if="product.merged_image"  width="100px" height="auto"
                              :src="product.merged_image"
                              class="h-auto w-32 cursor-pointer"></nuxt-img>

                    <h4 class="pt-4">{{ product.name }}</h4>
                  </div>

                  <!--                  <div class="text-center text-sm">{{ model.name }}</div>-->
                </div>
                <!-- -->
              </div>

              <div class=" text-center mt-12">
                <primary-button-big
                    type="button"
                    class="inline-flex justify-center border border-transparent bg-black-100 px-4 py-2  hover:bg-black-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black-500 focus-visible:ring-offset-2"
                    @click="closeModal"
                >
                  Закрыть
                </primary-button-big>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
    </client-only>
  </div>
</template>


