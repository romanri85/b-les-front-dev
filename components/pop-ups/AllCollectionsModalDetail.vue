<script setup>
import {ref} from 'vue'
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'
import {getMaterialColorVariantsByColorId} from "~/utils/catalogUtils";
import {baseURL} from "~/config";

const props = defineProps({

  product:
      {
        type: Object,
      },
  isOpen: {
    type: Boolean,
  },
  material: {
    type: Number,
  },
  color: {
    type: Number,
  },
})
const emit = defineEmits(['closeModal', 'changeModel'])
const isOpen = ref(true)
const collectionProducts = ref([])
const activeProductId = ref(1)

onMounted(() => {
  fetchCollectionProducts()
})

async function fetchCollectionProducts() {
  const data = await $fetch(`${baseURL}/api/product/product-collection/${props.product.id}`)
  collectionProducts.value = getMaterialColorVariantsByColorId(data, props.color)
}

function closeModal() {
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
// TODO: add @close="closeModal" to Dialog to close modal on click outside
</script>

<template>
  <div>
    <client-only>
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
            <div class="fixed inset-0 bg-black modal-background"/>
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
                    class="w-full   transform overflow-hidden  bg-white p-8 text-left align-middle shadow-xl transition-all"
                >
                  <div class=" text-right md:text-right mb-12 lg:mb-0">
                    <div class="">
                      <buttons-primary-button-big
                          type="button"
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
                    Все модели коллекции
                  </DialogTitle>

                  <div class="flex flex-col md:flex-row gap-y-6 gap-x-8 mb-2 mt-0 flex-wrap justify-center w-full">
                    <div
                        v-for="product in collectionProducts" v-if="collectionProducts"
                        :key="product.id" class="flex flex-col items-center"
                    >
                      <div
                          class="relative pb-4 px-4 border-b-2 flex flex-col items-center cursor-pointer"
                          :class="{ 'border-primaryDark': product.id === props.product.id, 'border-transparent': product.id !== props.product.id }"
                          @click="chooseProduct(product)"
                      >
                        <!--            <nuxt-img width="200px" height="auto" :src="props.doorVariant.casing_variant.image" -->
                        <!--                      class="h-auto w-48"></nuxt-img> -->
                        <!--            <nuxt-img width="200px" height="auto" -->
                        <!--                      :src="props.doorVariant.leaf_image" -->
                        <!--                      class="h-auto w-48 absolute top-0"></nuxt-img> -->

                        <nuxt-img placeholder
                            v-if="product.merged_image" width="100px" height="auto"
                            :src="product.merged_image"
                            class="h-auto w-32 cursor-pointer image"
                        />

                        <h4 class="pt-4">
                          {{ product.name }}
                        </h4>
                      </div>

                      <!--                  <div class="text-center text-sm">{{ model.name }}</div> -->
                    </div>
                    <!-- -->
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
<style scoped>
.modal-background {
  opacity: 25%;
}


</style>
