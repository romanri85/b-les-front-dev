<script setup>
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot,} from '@headlessui/vue'
import {ref, toRefs, watch} from 'vue'
import {baseURL} from "~/config";

const props = defineProps({
  isOpen: Boolean,
  shouldOpenModal: Number,
  priceProps: Object,
  sortedCasings: Array,
  color: Number,
  doorVariantData: Object,
  product: Object,
  actualCasing: Number,

})

const colors = ref([])
const platbands = ref([])

const currentWidth = ref(100)

const maxWidth = computed(() => {
  // Map the platbands to their widths, then use Math.max to find the largest one
  const maxPlatbandWidth = Math.max(...platbands.value.map(platband => platband.platband_width + platbands.value[0].platband_additional_width));
  return maxPlatbandWidth;
});

const imageDiv = ref(null)

const filteredCasings = computed(() => {
  return props.sortedCasings.map(casing => ({
    ...casing,
    casing_variants: casing.casing_variants.filter(variant => variant.color === props.color),
  }));
});
const emits = defineEmits(['change-city'])

const {shouldOpenModal} = toRefs(props)

const totalPrice = computed(() => {
  return props.priceProps.leafPrice + props.priceProps.casingPrice + actualCasingPrice.value + props.priceProps.framePrice + currentPlatbandPrice?.value
})

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}

function openModal() {
  isOpen.value = true
  changeCasing(props.actualCasing)

}

function changeCasing(casing) {
  actualCasingIndex.value = casing
}

const casingName = computed(() => {
  return filteredCasings.value.find(casing => casing.casing === props.doorVariantData.casing_variant.casing).casing_name
})

const secondCasingName = computed(() => {
  return filteredCasings.value.find(casing => casing.casing === actualCasingIndex.value).casing_name
})
const actualCasingIndex = ref(props.actualCasing || props.doorVariantData.casing_variant.casing || filteredCasings.value[0].casing)


const actualCasingPrice = computed(() => {
  return parseInt(filteredCasings?.value.find(casing => casing.casing === actualCasingIndex.value)?.casing_variants[0]?.price)
})


async function fetchPlatbands() {
  const platbandsData = await $fetch(`${baseURL}/api/product/platband-variants`)
  platbands.value = platbandsData.platband_variants
  colors.value = platbandsData.colors

}


const currentMaterial = computed(() => {
  const colorObject = colors.value.find(color => color.id === props.color);
  return colorObject ? colorObject.material : null;
});

const currentPlatband = computed(() => {
  if (!currentMaterial.value) {
    return undefined; // or handle this case as needed
  }

  if (currentWidth.value <= (platbands.value[0].platband_additional_width + 20)) {
    return undefined;
  }

  // Now filter the platbands by the found material and find the one with the closest width
  const suitablePlatbands = platbands.value
      .filter(platband => platband.material === currentMaterial.value)
      .sort((a, b) => a.platband_width - b.platband_width);

  // Find the platband with the smallest platband_width that is greater than or equal to currentWidth
  return suitablePlatbands.find(platband => platband.platband_width + platband.platband_additional_width >= currentWidth.value);
});

const currentPlatbandPrice = computed(() => {
  if (!currentPlatband.value) {
    return 0; // or handle this case as needed
  }

  // Find the color object that matches the ID provided in props.color
  const currentColor = colors.value.find(color => color.id === props.color);

  // Check if isOakEnamel is true or false for the current color
  const isEnamelOak = currentColor ? currentColor.isOakEnamel : false;

  // Determine the price based on isOakEnamel
  return isEnamelOak
      ? parseFloat(currentPlatband.value.enamel_oak_price) // If isOakEnamel is true, use enamel_oak_price
      : parseFloat(currentPlatband.value.default_price); // If isOakEnamel is false, use default_price
});


onMounted(() => {
  fetchPlatbands()
})

watch(shouldOpenModal, (newValue) => {
  if (newValue)
    openModal()
})


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
                class="w-full h-auto overflow-visible md:max-w-xl lg:max-w-[60vw] transform  bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
              >
                <h5 class="pb-2"> Расчет стоимости двери</h5>
                <h2>{{ props.product.name }} {{ props.doorVariantData.color.material_name }}
                  {{ props.doorVariantData.color.name }}</h2>
              </DialogTitle>
              <div class="pt-8">

                <h3> Выберите обрамление на вторую сторону. </h3>
                <h5> В этой отделке имеются следующие
                  варианты обрамления:</h5>

                <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-x-24 lg:gap-y-6 md:gap-x-24 pt-4">
                  <div v-for="casing in filteredCasings.sort((a, b) => {
        const priceA = parseInt(a.casing_variants[0]?.price);
        const priceB = parseInt(b.casing_variants[0]?.price);

        if (isNaN(priceA) && isNaN(priceB)) return 0;
        if (isNaN(priceA)) return 1;
        if (isNaN(priceB)) return -1;

        return priceA - priceB;
    })" :key="casing.id" class="flex flex-col items-start">
                    <div
                        ref="imageDiv"
                        @click="changeCasing(casing.casing)"
                        v-if="parseInt(casing.casing_variants[0]?.price)"
                        :class="{ selected: casing.casing === actualCasingIndex }"
                        class="imageDiv cursor-pointer flex justify-between items-end w-full pb-1 pt-3 border-b-2 border-transparent transition-all duration-300 ease-in-out">

                      <div>
                        <nuxt-img width="40" :src="casing.image"/>
                        <p class="pt-4">{{ casing.casing_name }}</p>
                      </div>
                      <div class="flex">
                        <h3>{{ parseInt(casing.casing_variants[0]?.price) }}&nbsp;₽ </h3>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div class="mt-16 mb-8">


                <!--<pre>{{platbands}}</pre>-->
                <!--<pre>{{colors}}</pre>-->
                <!--<pre>{{widthIntervals}}</pre>-->
                <h3>Выберите толщину стены дверного проема.</h3>
                <div class="pt-12">
                  <FormKit
                      type="slider"
                      v-model="currentWidth"
                      :tooltip-format="(v) => `${v} мм`"
                      :tooltip="true"
                      help=""
                      min="0"
                      :max="maxWidth"
                      step="1"
                  />
                </div>
                <div class="flex flex-col justify-center max-w-[80vw] pt-8">
                  <p>
                    Стоимость полотна:
                    <h3 v-if="props.doorVariantData.sale" class="inline-block pb-4">
                      <span class="text-gray-500 line-through">{{
                          parseInt(props.doorVariantData.leaf_price)
                        }}&nbsp;₽</span>&nbsp;&nbsp;
                      <span class="text-black">{{ props.priceProps.leafPrice }}&nbsp;₽</span>
                    </h3>
                    <h3 v-else class="inline-block pb-4 text-black">{{ props.priceProps.leafPrice }}&nbsp;₽</h3>
                  </p>
                  <p>Первое обрамление двери: <h3 class=" inline-block">{{ casingName }}</h3>
                    <h3 class="md:pl-4 pb-4 md:inline-block">{{ priceProps.casingPrice }} ₽</h3></p>
                  <p>Второе обрамление двери:
                    <h3 class="inline-block"> {{ secondCasingName }}</h3>
                    <h3 class="md:pl-4 pb-4 md:inline-block">{{ actualCasingPrice }} ₽</h3></p>
                  <p class="pb-4">Стоимость короба: <h3 class="inline-block ">{{ props.priceProps.framePrice }}&nbsp;₽</h3></p>
                  <p v-if="currentPlatband" class="pb-4 ">Стоимость комплекта добора
                    {{ currentPlatband.platband_width }}&nbsp;мм: <h3 class="inline-block ">{{ currentPlatbandPrice }}&nbsp;₽</h3>
                  </p>
                  <div class="h-[1px] bg-black mb-2"></div>
                  <!--                  <p>Дверь с обрамлением на одну сторону: <h2 class="inline-block pb-2">{{ props.priceProps.totalPrice }}&nbsp;₽</h2></p>-->
                  <p>Общая стоимость двери: <h2 class="inline-block pb-2">{{ totalPrice }}&nbsp;₽</h2></p>
                  <div class="pt-2"></div>
                  <h5 class="pt-6" v-if="props.product.glass===true">
                    Цена двери указана с обычным матированным стеклом без фацета, или гравировки. Стекло с фацетом или
                    гравировкой увеличивает стоимость двери.
                  </h5>
                </div>
              </div>
              <div class="">
                <h5>Дополнительно для установки двери понадобится: замок, петли, ручка. Цена в каталоге <h3 class="inline-block">{{ priceProps.totalPrice }} ₽</h3>
                  соответствует стоимости двери с обрамлением на одну сторону.
                </h5>
              </div>
              <div class="text-right pt-8">
                <buttons-primary-button-big
                    @click="closeModal"
                >
                  Закрыть
                </buttons-primary-button-big>
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

*{
  outline: none!important;
}

.selected {
  border-bottom: 2px solid black !important;

}

</style>
