<script setup>
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot,} from '@headlessui/vue'
import {ref, toRefs, watch} from 'vue'

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
  return props.priceProps.leafPrice + props.priceProps.casingPrice + actualCasingPrice.value + props.priceProps.framePrice
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
const actualCasingIndex = ref(props.actualCasing || props.doorVariantData.casing_variant.casing)

const actualCasingPrice = computed(() => {
  return parseInt(filteredCasings?.value.find(casing => casing.casing === actualCasingIndex.value)?.casing_variants[0]?.price)
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
                class="w-full h-auto overflow-visible max-w-md md:max-w-xl transform  bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
              >
                <h5 class="pb-2"> Расчет стоимости двери</h5>
                <h2>{{ props.product.name }} {{ props.doorVariantData.color.material_name }}
                  {{ props.doorVariantData.color.name }}</h2>
              </DialogTitle>
              <div class="mt-8 mb-8">
                <div class="flex flex-col justify-center max-w-[80vw]">
                  <p>Стоимость полотна: <h3 class="inline-block pb-2">{{ props.priceProps.leafPrice }}&nbsp;₽</h3></p>
                  <p>Первое обрамление двери: <h3 class=" inline-block">{{ casingName }}</h3>
                    <h3 class="md:pl-4 pb-4 md:inline-block">{{ priceProps.casingPrice }} ₽</h3></p>
                  <p>Второе обрамление двери:
                    <h3 class="inline-block"> {{ secondCasingName }}</h3>
                    <h3 class="md:pl-4 pb-4 md:inline-block">{{ actualCasingPrice }} ₽</h3></p>
                  <p>Стоимость короба: <h3 class="inline-block ">{{ props.priceProps.framePrice }}&nbsp;₽</h3></p>
                  <div class="h-[1px] bg-black mb-2"></div>
                  <!--                  <p>Дверь с обрамлением на одну сторону: <h2 class="inline-block pb-2">{{ props.priceProps.totalPrice }}&nbsp;₽</h2></p>-->
                  <p>Общая стоимость двери: <h2 class="inline-block pb-2">{{ totalPrice }}&nbsp;₽</h2></p>
                  <div class="pt-2"></div>
                  <h5 class="pt-6" v-if="props.product.glass===true">
                    Цена двери указана с обычным матированным стеклом без фацета, или гравировки. Стекло с фацетом или
                    гравировкой увеличивает стоимость двери.
                  </h5>
                </div>
                <div class="pt-6">

                  <h5> Выберите обрамление на вторую сторону. В этой отделке имеются следующие
                    варианты обрамления: </h5>
                  <!--                  <pre>{{filteredCasings}}</pre>-->
                  <div class="grid md:grid-cols-2 grid-cols-1 lg:gap-x-24 lg:gap-y-6 md:gap-x-24 pt-8">
                    <div v-for="casing in filteredCasings.sort(
                      (a, b) => parseInt(a.casing_variants[0]?.price) - parseInt(b.casing_variants[0]?.price)
                    )" :key="casing.id" class="flex flex-col items-start">
                      <div ref="imageDiv"
                           @click="changeCasing(casing.casing)"
                           v-if="parseInt(casing.casing_variants[0]?.price)"
                           class="imageDiv cursor-pointer flex justify-between items-end w-full pb-4 border-b-2 border-transparent transition-all duration-300 ease-in-out">
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
                <div class="pt-8">
                  <h5>Примечание: цена в каталоге <h3 class="inline-block">{{ priceProps.totalPrice }} ₽</h3>
                    соответствует стоимости двери с обрамлением на одну сторону.
                  </h5>
                </div>

              </div>

              <div class="">
                <button
                    type="button"
                    class="inline-flex justify-center border border-transparent bg-primaryDark px-4 py-2 text-xs font-mono  text-white  focus:outline-none "
                    @click="closeModal"
                >
                  Закрыть
                </button>
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
@media screen and (min-width: 1440px) {
  .imageDiv:hover {
    border-bottom: 2px solid black;
  }

}

</style>
