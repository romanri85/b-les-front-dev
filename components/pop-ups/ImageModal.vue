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
    <Dialog as="div" class="relative z-50" @close="closeModal">
<!--      <TransitionChild-->
<!--          as="template"-->
<!--          enter="duration-300 ease-out"-->
<!--          enter-from="opacity-0"-->
<!--          enter-to="opacity-100"-->
<!--          leave="duration-200 ease-in"-->
<!--          leave-from="opacity-100"-->
<!--          leave-to="opacity-0"-->
<!--      >-->
        <div class="fixed inset-0 bg-black bg-opacity-25"/>
<!--      </TransitionChild>-->

      <div class="fixed inset-0 overflow-y-auto">
        <div
            class="flex min-h-full items-center justify-center p-4 text-center"
        >
<!--          <TransitionChild-->
<!--              as="template"-->
<!--              enter="duration-300 ease-out"-->
<!--              enter-from="opacity-0 scale-95"-->
<!--              enter-to="opacity-100 scale-100"-->
<!--              leave="duration-200 ease-in"-->
<!--              leave-from="opacity-100 scale-100"-->
<!--              leave-to="opacity-0 scale-95"-->
<!--          >-->
            <DialogPanel
                :class="{
    'md:w-1/2 lg:w-1/3 w-full': isTallImage,
    'md:w-3/4 lg:w-2/3 w-full': isWideImage
  }"
                class="transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
              >

              </DialogTitle>
              <div class="mt-2">
                <nuxt-img :src="image.image" class=" w-full object-contain"
                          :alt="image.project_name"></nuxt-img>
                <nuxt-link :to="`/interior/${image.project}`">
                  <div v-if="!route.path.startsWith('/interior')" class="text-center py-2">
                    <h4 class="inline">{{ image.project_name }}</h4>
                  </div>
                  <div v-else class="py-2"></div>
                </nuxt-link>
                <div class="inline-flex justify-start flex-wrap">

                  <div v-for="tag in image.tags" class=" text-sm text-primaryDark cursor-pointer">&nbsp;

                    &nbsp;


                    <span>&nbsp;</span>
                    <p class="inline" @click="chooseTag(tag)"> #{{ tag.name }}</p>
                  </div>

                </div>
              </div>

              <div class="text-center mt-4">
                <buttons-primary-button-small @click="closeModal"><h3>Закрыть</h3></buttons-primary-button-small>
              </div>
            </DialogPanel>
<!--          </TransitionChild>-->
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {computed, defineExpose, ref} from 'vue'
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot,} from '@headlessui/vue'
import {useRouter} from 'vue-router'
import {useRoute} from 'vue-router'


const router = useRouter()
const route = useRoute()

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


const isTallImage = computed(() => props.image.height / props.image.width > 1);
const isWideImage = computed(() => props.image.height / props.image.width <= 1);


const isOpen = ref(false)


function chooseTag(tag) {
  emit('chooseTag', tag)
  closeModal()
  router.push({path: '/search-tags', query: {tags: tag.id}})
}

function closeModal() {
  isOpen.value = false
}

function openModal() {
  isOpen.value = true;

  // Scroll 5px up
  window.scrollBy(0, -5);

  // Then scroll 5px down
  nextTick(() => {
    window.scrollBy(0, 5);
  });
}
</script>
