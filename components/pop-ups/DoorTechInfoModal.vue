<script setup>
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { ref, toRefs, watch } from 'vue'
import { baseURL } from '~/config'


const props = defineProps({
  isOpen: Boolean,
  shouldOpenModal: Number,
  data: Array,
  product:
      {
        type: Object,
      },
  // systems: Array,
})

const techVariants = ref([])

// const hoveredSystem = ref('')
const { shouldOpenModal } = toRefs(props)
// const isPlaying = ref(false);



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

async function fetchTechVariants() {
  techVariants.value = await $fetch(`${baseURL}/api/product/tech-variants`)
}


const targetTechVariant = computed(() => {
  const material = props.data.color.material;
  console.log(material, 'material');
  const collectionId = props.product.collection.id;
  console.log(collectionId, 'collectionId');

  const matchingTechVariant = techVariants.value?.find(
      techVariant =>
          techVariant.materials.includes(material) &&
          techVariant.collections.includes(collectionId)
  );

  return matchingTechVariant || {};
});

onMounted(() => {
  fetchTechVariants()
})
// const playingStates = reactive({});
// const previousSystem = ref(null);  // New ref to keep track of the previous system

// function toggleActiveSystem(id) {
//   if (previousSystem.value !== null && previousSystem.value !== id) {
//     playingStates[previousSystem.value] = false;  // Reset the playing state of the previous system
//   }
//
//   if (hoveredSystem.value === id) {
//     clearActiveSystem();
//     playingStates[id] = false;  // Update playing state
//   } else {
//     setActiveSystem(id);
//     playingStates[id] = true;  // Update playing state
//   }
//
//   previousSystem.value = id;  // Update the previous system
// }
// function setActiveSystem(id) {
//   hoveredSystem.value = id;
//   const videoElement = document.getElementById(`video-${id}`);
//   if (videoElement) {
//     videoElement.loop = true;  // Ensure the video loops while the cursor is on the system
//     videoElement.play();
//
//   }
//   isPlaying.value = true;
//
// }

// function clearActiveSystem() {
//   const id = hoveredSystem.value;
//   const videoElement = document.getElementById(`video-${id}`);
//   if (videoElement) {
//     videoElement.loop = false;  // Stop the video from looping once the cursor leaves the system
//     videoElement.onended = () => {
//       hoveredSystem.value = '';
//     };
//   } else {
//     hoveredSystem.value = '';
//   }
//   isPlaying.value = false;
// }
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
                class="fixed right-0 top-0 h-screen w-full max-w-[700px] md:w-[60%] lg:w-[40%] overflow-y-auto bg-white p-6 text-left align-middle shadow-xl transition-all"
            >

              <!--              <DialogTitle -->
              <!--                  as="h3" -->
              <!--                  class="text-lg font-medium leading-6 text-gray-900" -->
              <!--              > -->
              <!--                Выберите город -->
              <!--              </DialogTitle> -->
              <div class="">
                <button
                    type="button"
                    class="inline-flex justify-center border border-transparent bg-primaryDark px-4 py-2 text-xs font-mono  text-white  focus:outline-none "
                    @click="closeModal"
                >
                  Закрыть
                </button>
              </div>
              <div class="mt-16 mb-8">
                <h3 class="pb-2 inline-block">{{props.product.name}}</h3>&nbsp;&nbsp;
                <h3 class="inline-block pb-2"> {{props.data.color.material_name}} {{props.data.color.name}}</h3>

                <h5 class="uppercase">{{product.collection.name}}</h5>
                <div>
                  <h4 class="pt-8">Описание:</h4>
                  <p class="pt-4">{{targetTechVariant.description}}</p>
                </div>
<!--                <h6 class="pt-1">Техническая информация о двери </h6>-->
<!--                <pre>{{props.data}}</pre>-->
                <div class="pt-16 flex flex-col justify-center">
                  <h2>{{targetTechVariant.title}}</h2>

                  <div v-if="targetTechVariant.image" class="pt-16">
                    <nuxt-img placeholder :src="targetTechVariant.image" class="w-full h-auto object-contain" :alt="targetTechVariant.title" />
                  </div>
                </div>

                <div>
                  <h4 class="pt-16">Конструкция полотна:</h4>
                  <p class="pt-4">{{targetTechVariant.leaf_description}}</p>
                </div>
                <div>
                  <h4 class="pt-16">Конструкция короба:</h4>
                  <p class="pt-4">{{targetTechVariant.frame_description}}</p>
                </div>
                <div>
                  <h4 class="pt-16">Конструкция наличника:</h4>
                  <p class="pt-4">{{targetTechVariant.casing_description}}</p>
                </div>
                <div>
                  <h4 class="pt-16">Конструкция добора:</h4>
                  <p class="pt-4">{{targetTechVariant.platband_description}}</p>
                </div>
<!--                                <pre>{{targetTechVariant}}</pre>-->
<!--<pre>{{techVariants}}</pre>-->
<!--                <div v-for="system in systems" :key="system.id">-->
<!--                  <h2 class="cursor-pointer mb-8 inline-block">-->
<!--                    {{ system.name }}-->
<!--                  </h2>-->
<!--                  <div-->
<!--                      class="relative cursor-pointer"-->
<!--                      v-on:click="() => toggleActiveSystem(system.id)"-->
<!--                  >-->

<!--                    <nuxt-img placeholder :src="system.image" class="w-full h-auto object-contain" :alt="system.name" />-->
<!--                    <video-->
<!--                        v-if="hoveredSystem === system.id"-->
<!--                        :id="`video-${system.id}`"-->
<!--                        :src="system.video"-->
<!--                        autoplay-->
<!--                        playsinline-->
<!--                        loop-->
<!--                        muted-->
<!--                        class="absolute top-0 left-0 w-full h-auto"-->
<!--                    ></video>-->
<!--                    <div class="symbol-container">-->
<!--                      <BasePlaySymbol v-if="!playingStates[system.id]" />-->
<!--                      <BasePauseSymbol v-else />-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <h5 class="pt-5 pb-20">-->
<!--                    {{ system.description }}-->
<!--                  </h5>-->
<!--                </div>-->
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
.symbol-container {
  position: absolute;
  width: 30px;
  height: 30px;
  top: 10px;
  right: 10px;
  z-index: 10; /* Adjust this value if necessary to ensure the symbols are on top of all other elements */
}
</style>
