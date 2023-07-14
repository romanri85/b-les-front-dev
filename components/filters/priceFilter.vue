<script setup lang="ts">
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import MultiRangeSlider from "~/components/filters/MultiRangeSlider.vue";
import FilterType from "~/components/filters/FilterType.vue";
import {ref} from "vue";
import _ from "lodash";
import { watchEffect } from 'vue';
import PriceSlider from "~/components/base/PriceSlider.vue";

const value= [20, 40]
const props = defineProps({
  min_price: Number,
  max_price: Number,

  filterCountPrice: {
    type: Object,
    // default: () => ({}),
  },
})



const emit = defineEmits(['change'])

const min_price = ref( 0)
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
  emit('change', { 'min_price': min_price.value, 'max_price': max_price.value});

    // updatePriceRange();
  console.log('updateSliderValues')
  // console.log([newMin, newMax])
}

watch(()=>[min_price.value, max_price.value], (newVal) => {
  console.log('watch')
  console.log(newVal)
  updateSliderValues(newVal)
}, { immediate: true })

// const minPrice = ref(props.min_price || 0)
// const maxPrice = ref(props.max_price || 6000)



// watch(() => props.filterCountPrice, (newVal) => {
//   if (newVal && (props.priceChangedBySlider===false)) {
//     min_price.value = newVal.min_price ? newVal.min_price : props.filterCountPrice.min_price;
//     max_price.value = newVal.max_price ? newVal.max_price : props.filterCountPrice.max_price
//   }
// }, { immediate: true })




// //



</script>

<template class="filter-container ">

  <Disclosure default-open>
    <DisclosureButton class="w-full">
      <filter-type filterName="Цена"/>
    </DisclosureButton>
    <DisclosurePanel class="mb-20">
      <div>
        <client-only>
          <FormKit v-if="props.filterCountPrice && props.filterCountPrice.min_price && props.filterCountPrice.max_price"
              type="slider"
              :value="[min_price, max_price]"
              @input="([newMin, newMax]) => {
                min_price = newMin;
                max_price = newMax;
              }"
              :tooltip-format="(v) => `&dollar;${v}`"
              tooltip="true"
              :key="`${props.filterCountPrice.min_price}-${props.filterCountPrice.max_price}`"
              :min="props.filterCountPrice.min_price"
              :max="props.filterCountPrice.max_price"
              show-input
              step="25"
              :input-attrs="{
                floatingLabel: true,
                prefixIcon: 'dollar',
              }"
              :min-input-attrs="{
                label: 'От',
              }"
              :max-input-attrs="{
                label: 'До',
              }"
              mark-labels
          />
        </client-only>

      </div>
<!--      <p>{{props.priceChangedBySlider}}</p>-->
      <p v-if="props.filterCountPrice && props.filterCountPrice.min_price">{{props.filterCountPrice.min_price}} price count min</p>
      <p v-if="props.filterCountPrice && props.filterCountPrice.max_price">{{props.filterCountPrice.max_price}} price count max</p>
    </DisclosurePanel>

  </Disclosure>
  <div>
    <div class="h-24"></div>
  </div>
</template>

<style scoped src="@vueform/slider/themes/default.css">

</style>