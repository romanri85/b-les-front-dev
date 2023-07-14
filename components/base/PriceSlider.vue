<template>
  <Slider v-if="props.filterCountPrice && filterCountPrice.min_price && props.filterCountPrice.max_price"
          v-model="value"
          :classes="{
  target: 'relative box-border select-none touch-none tap-highlight-transparent touch-callout-none disabled:cursor-not-allowed',
  focused: 'slider-focused',
  tooltipFocus: 'slider-tooltip-focus',
  tooltipDrag: 'slider-tooltip-drag',
  ltr: 'slider-ltr',
  rtl: 'slider-rtl',
  horizontal: 'slider-horizontal h-1.5',
  vertical: 'slider-vertical w-1.5 h-80',
  textDirectionRtl: 'slider-txt-rtl',
  textDirectionLtr: 'slider-txt-ltr',
  base: 'w-full h-full relative z-1 bg-gray-300 rounded',
  connects: 'w-full h-full relative overflow-hidden z-0 rounded',
  connect: 'absolute z-1 top-0 right-0 transform-origin-0 transform-style-flat h-full w-full bg-black-500 cursor-pointer tap:duration-300 tap:transition-transform disabled:bg-gray-400 disabled:cursor-not-allowed',
  origin: 'slider-origin absolute z-1 top-0 right-0 transform-origin-0 transform-style-flat h-full w-full h:h-0 v:-top-full txt-rtl-h:left-0 txt-rtl-h:right-auto v:w-0 tap:duration-300 tap:transition-transform',
  handle: 'absolute  bg-white border-0 shadow-slider cursor-grab focus:outline-none h:w-4 h:h-4 h:-top-1.5 h:-right-2 txt-rtl-h:-left-2 txt-rtl-h:right-auto v:w-4 v:h-4 v:-top-2 v:-right-1.25 disabled:cursor-not-allowed focus:ring focus:ring-green-500 focus:ring-opacity-30',
  handleLower: 'slider-hande-lower',
  handleUpper: 'slider-hande-upper',
  touchArea: 'h-full w-full',
  tooltip: 'absolute block text-sm font-semibold whitespace-nowrap py-1 px-1.5 min-w-5 text-center text-white rounded border border-green-500 bg-green-500 transform h:-translate-x-1/2 h:left-1/2 v:-translate-y-1/2 v:top-1/2 disabled:bg-gray-400 disabled:border-gray-400 merge-h:translate-x-1/2 merge-h:left-auto merge-v:-translate-x-4 merge-v:top-auto tt-focus:hidden tt-focused:block tt-drag:hidden tt-dragging:block',
  tooltipTop: 'bottom-6 h:arrow-bottom merge-h:bottom-3.5',
  tooltipBottom: 'top-6 h:arrow-top merge-h:top-5',
  tooltipLeft: 'right-6 v:arrow-right merge-v:right-1',
  tooltipRight: 'left-6 v:arrow-left merge-v:left-7',
  tooltipHidden: 'slider-tooltip-hidden',
  active: 'slider-active shadow-slider-active cursor-grabbing',
  draggable: 'cursor-ew-resize v:cursor-ns-resize',
  tap: 'slider-state-tap',
  drag: 'slider-state-drag',
}"
          :min="filterCountPrice.min_price"
          :max="filterCountPrice.max_price"
          @change="updateSliderValues"
  />
</template>

<script setup>
import Slider from '@vueform/slider'
import '@vueform/slider/themes/tailwind.scss';
import {ref} from "vue";


const props = defineProps({
  min_price: Number,
  max_price: Number,

  filterCountPrice: {
    type: Object,
    // default: () => ({}),
  },
  isSliderMoved: {
    type: Boolean,
  },
})

const minPrice = ref(0)

const maxPrice = ref(6000)

const filterCountPrice = ref({
  min_price: 0,
  max_price: 6000,
})
const isFilterCountChanged = ref(false)

const toggleFilterCountChanged = () => {
  isFilterCountChanged.value = !isFilterCountChanged.value
  console.log(isFilterCountChanged.value,'isFilterCountChanged')
}

watch(
    () => props.filterCountPrice,
    (newVal) => {

      minPrice.value = newVal.min_price
      maxPrice.value = newVal.max_price
      console.log('watch')
    }
)


watch(
    () => props.filterCountPrice,
    (newVal) => {
      if (props.isSliderMoved === true) {
        isFilterCountChanged.value
        return
      }
      isFilterCountChanged.value = true
      filterCountPrice.value = newVal
      console.log(isFilterCountChanged.value, 'isFilterCountChanged')
      console.log('watch')
    }
)

const value = ref([minPrice.value, maxPrice.value])

const emit = defineEmits(['change'])

const min_price = ref(0)
const max_price = ref(6000)


let updatePriceTimeout = 0

// function updatePriceRange() {
//   // clearTimeout(updatePriceTimeout);
//   // updatePriceTimeout = setTimeout(() => {
//   //   if (typeof min_price.value !== 'number' || typeof max_price.value !== 'number') {
//   //     console.log('min_price and max_price must be numbers');
//   //     return;
//   //   }
//   // }, 500);
//
//   console.log('updatePriceRange');
// }

function updateSliderValues([newMin, newMax]) {

  // isSliderChanging.value = true // <-- set to true when slider values are changing
  min_price.value = newMin;
  max_price.value = newMax;
  emit('change', {'min_price': min_price.value, 'max_price': max_price.value});

  // updatePriceRange();
  console.log('updateSliderValues')
  // console.log([newMin, newMax])
}
</script>

<style lang="scss">
</style>