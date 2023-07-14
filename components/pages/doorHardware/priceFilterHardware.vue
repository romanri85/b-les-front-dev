<script setup lang="ts">
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import MultiRangeSlider from "~/components/filters/MultiRangeSlider.vue";
import FilterType from "~/components/filters/FilterType.vue";
import {ref} from "vue";
import _ from "lodash";

const props = defineProps({
  min_price: Number,
  max_price: Number,
  min: {
    type: Number,
  },
  max: {
    type: Number,
  }
})

const emit = defineEmits(['change'])


const oBarMinValue = ref(props.min_price)
const oBarMaxValue = ref(props.max_price);
const min = props.min_price;
const max = props.max_price;
const updatePriceTimeout = ref(null)

// const oBarValues = reactive(props.value)
const min_price = ref(props.min_price)
const max_price = ref(props.max_price)

function update_oBarValues(e) {

  oBarMinValue.value = e.minValue;
  oBarMaxValue.value = e.maxValue;
  min_price.value = e.minValue;
  max_price.value = e.maxValue;
  updatePriceRange()

}

function updatePriceRange() {
  clearTimeout(updatePriceTimeout.value)
  updatePriceTimeout.value = setTimeout(() => {
    emit('change', min_price.value, max_price.value)
  }, 500)
  // emit('change', min_price.value, max_price.value)




}


</script>

<template class="filter-container ">
  <Disclosure default-open>
    <DisclosureButton class="w-full">
      <filter-type filterName="Цена"/>
    </DisclosureButton>
    <DisclosurePanel class="mb-20">
      <div class="slider-cont">
        <div class="flex justify-between mb-6">
          <div class="border border-primaryDark w-[135px] h-[50px] flex justify-center"><p
              class="inline-flex items-center"> {{ oBarMinValue }}</p>
            <Icon name="ph:currency-rub-bold" color="#141414" class="w-4 h-auto"/>
          </div>
          <div class="border border-primaryDark w-36 h-12 flex justify-center"><p
              class="inline-flex items-center">{{ oBarMaxValue }}</p>
            <Icon name="ph:currency-rub-bold" color="#141414" class="w-4 h-auto"/>
          </div>
        </div>
        <MultiRangeSlider
            baseClassName="multi-range-slider-bar-only"
            v-model:minValue="oBarMinValue"
            v-model:maxValue="oBarMaxValue"
            :max="max"
            :min="min"
            :step="100"
            :rangeMargin="0"
            @input="update_oBarValues"
            class="px-5 "
        />
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>

</style>