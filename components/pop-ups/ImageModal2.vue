<script setup>
import {computed, defineExpose, ref} from 'vue'
import {Dialog, DialogPanel, DialogTitle, TransitionRoot} from '@headlessui/vue'
import {useRoute, useRouter} from 'vue-router'

const props = defineProps({
  image: {
    type: null,
    required: true,
  },
  open: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['chooseTag', 'close'])
const router = useRouter()
const route = useRoute()

defineExpose({
  // openModal,
  closeModal,
})

const isTallImage = computed(() => props.image.height / props.image.width > 1)
const isWideImage = computed(() => props.image.height / props.image.width <= 1)


const imageUrl = ref(props.image.image)
async function load(src) {
  const imgRequest = new Request(src);

  const res = await fetch(imgRequest, {
    method: 'GET',
})
  const imageBlob = await res.blob();
  return URL.createObjectURL(imageBlob);
}

function chooseTag(tag) {
  emit('chooseTag', tag)
  closeModal()
  router.push({path: '/search-tags', query: {tags: tag.id}})
}

function closeModal() {
  emit('close')
  // isOpen.value = false
}

// function openModal() {
//   isOpen.value = true
// }

onMounted(async () => {
  imageUrl.value = await load(props.image.image)
})

watch(() => props.image, async () => {
  imageUrl.value = await load(props.image.image)
})
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
  <TransitionRoot appear :show="props.open" as="template">
    <Dialog as="div"  class="relative z-50 lg:overflow-visible overflow-auto " @close="closeModal">
      <div class="fixed inset-0 bg-black modal-background"/>
      <div class="fixed inset-0 overflow-y-auto">
        <div
            class="flex min-h-full items-center justify-center p-4 text-center"
        >

          <DialogPanel
              :class="{
              'md:w-1/2 lg:w-1/3 w-full': isTallImage,
              'md:w-3/4 lg:w-2/3 w-full': isWideImage,
            }"
              class="transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all"
          >
            <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
            />
            <div class="mt-2">
              <nuxt-img placeholder
                        :src="imageUrl" class=" w-full object-contain"
                        :alt="image.project_name"
              />
              <nuxt-link class="outline-none" :to="`/interior/${image.project}`">
                <div v-if="!route.path.startsWith('/interior')" class="outline-none text-center py-2">
                  <h2 class="inline outline-none underline underline-offset-4">
                    {{ image.project_name }}
                  </h2>
                </div>
                <div v-else class="py-2"/>
              </nuxt-link>
              <div class="inline-flex justify-start flex-wrap">
                <div v-for="tag in image.tags.sort((a, b) => a.name.localeCompare(b.name))" :key="tag.name"
                     class=" text-sm text-primaryDark cursor-pointer">
                  &nbsp;

                  &nbsp;

                  <span>&nbsp;</span>
                  <p class="inline text-lg underline-direction" @click="chooseTag(tag)">
                    #{{ tag.name }}
                  </p>
                </div>
              </div>
            </div>

            <div class="text-center mt-4">
              <div class="">
                <buttons-primary-button-big
                    @click="closeModal"
                >
                  Закрыть
                </buttons-primary-button-big>
              </div>
            </div>
          </DialogPanel>
          <!--          </TransitionChild> -->
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