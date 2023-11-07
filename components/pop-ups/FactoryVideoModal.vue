<script setup>
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'
import {ref, toRefs, watch} from 'vue'
import {baseURL} from '~/config'

const props = defineProps({
  isOpen: Boolean,
  shouldOpenModal: Number,
})
const videoUrl = 'https://www.youtube.com/embed/C2WWQLWRrQY?autoplay=1&start=3'
const iframeRef = ref(null)

const {shouldOpenModal} = toRefs(props)

watch(shouldOpenModal, (newValue) => {
  if (newValue)
    openModal()
  iframeRef.value.src = videoUrl  // Optionally start the video when the component is mounted

})

const isOpen = ref(false)


function closeModal() {
  isOpen.value = false

}

function openModal() {
  isOpen.value = true
}


</script>

<template>
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
              class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enter-from="-translate-y-full"
                enter-to="translate-y-0"
                leave="transition ease-in-out duration-300 transform"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
              <DialogPanel
                  class="w-full bg-white  h-auto overflow-visible max-h-screen  transform  p-6 text-left align-middle shadow-xl transition-all"

              >
                <DialogTitle
                             as="h3"
                             class="text-lg font-medium leading-6 text-gray-900"
                >
                </DialogTitle>

                <div class="flex justify-end w-full ">
                  <div class="ml-auto pb-4">
                    <buttons-primary-button-big
                        @click="closeModal"
                    >
                      Закрыть
                    </buttons-primary-button-big>
                  </div>
                </div>

                <iframe
                    ref="iframeRef"
                    width="960"
                    height="315"
                    :src="'https://www.youtube.com/embed/C2WWQLWRrQY?autoplay=1&start=3'"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                ></iframe>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </client-only>
</template>
<style scoped>
.modal-background {
  opacity: 25%;
}

button {

}

.white {
  background-color: white !important;
}

.black {
  background-color: black !important;
}

.phone {
  outline: none!important;
}
.phone a:focus {
  outline: none;
}

DialogPanel {
  position: relative; /* Context for absolute positioning */
  width: 100%; /* Full width of the modal area */
  padding: 0; /* Remove padding to allow the iframe to fill the space */
}

iframe {
  min-height: calc(100vh - 8rem); /* Responsive height based on the viewport */
  width: calc(100vw - 4rem) /* Responsive width based on the viewport */
}

/* Close button style adjustments */
button {
  background-color: rgba(255, 255, 255, 0.75); /* Semi-transparent white background */
  backdrop-filter: blur(5px); /* Aesthetic background blur for the button */
}
</style>
