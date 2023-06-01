<script setup lang="ts">

import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import MultiRangeSlider from "~/pages/catalog/components/MultiRangeSlider.vue";
import FilterType from "~/pages/catalog/components/FilterType.vue";
import {ref, reactive} from "vue";

const props = defineProps({
  value: {
    type: Object,
  }
})

const emit = defineEmits(['change'])




const oBarMinValue = ref(0);
const oBarMaxValue = ref(100000);

const oBarValues = reactive(props.value)

function update_oBarValues(e) {
  oBarMinValue.value = e.minValue;
  oBarMaxValue.value = e.maxValue;
  oBarValues.minValue = e.minValue;
  oBarValues.maxValue = e.maxValue;
  emit('change', oBarValues)
}

const priceMinMax = ref([oBarMinValue.value, oBarMaxValue.value])


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
            :max="100000"
            :min="30000"
            :step="1"
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