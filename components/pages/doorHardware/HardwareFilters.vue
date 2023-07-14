<script setup lang="ts">
import PriceFilter from "~/components/filters/priceFilter.vue";
import ColorSetFilter from "~/components/filters/colorSetFilter.vue";
import DesignFilter from "~/components/filters/designFilter.vue";
import MaterialColorFilter from "~/components/pages/door-catalog/MaterialColorFilter.vue";
import DoorCollectionsFilter from "~/components/pages/door-catalog/DoorCollectionsFilter.vue";
import PrimaryButtonSmall from "~/components/buttons/PrimaryButtonSmall.vue";
import {baseURL} from "~/config";
import PriceFilterHardware from "~/components/pages/doorHardware/priceFilterHardware.vue";
import ColorCollectionFilterHardware from "~/components/pages/doorHardware/colorCollectionFilterHardware.vue";
import DesignFilterHardware from "~/components/pages/doorHardware/designFilterHardware.vue";
import HardwareCollectionsFilter from "~/components/pages/doorHardware/HardwareCollectionsFilter.vue";

const emit = defineEmits(['changeFilters', 'resetFilters'])
const props = defineProps({
  activeFilters: Object
})





let design = [
  {
    name: 'Classic',
    id: 1
  },
  {
    name: 'Modern',
    id: 2
  }

]

const colorCollections = ref([])

async function fetchColorCollections() {
  return await $fetch(`${baseURL}/api/hardware/hardware-color-sets`);
}
onMounted(async () => {
  colorCollections.value = await fetchColorCollections()
})


// window.scrollTo(0, 0);



// function update_oBarValues(e) {
//   oBarMinValue.value = e.minValue;
//   oBarMaxValue.value = e.maxValue;
// }





function onChangePrice(min_price, max_price) {
  emit('changeFilters', {'max_price':max_price, 'min_price':min_price})
}

function onChangeColorCollection(colorCollection) {
  emit('changeFilters', colorCollection)
}


function onChangeDesigns(design) {
  emit('changeFilters', design)
}




function resetFilters() {
  emit('resetFilters', {})
}
</script>

<template>

  <section class="">
    <div class=" lg:mb-[80px] md:mb-[70px] flex gap-">
      <div class="inline-flex gap-x-3">
        <svg class="w-[20px] h-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"/>
        </svg>
        <h3>Фильтры</h3>
      </div>
    </div>
    <div class="filter-container">
      <price-filter-hardware :min_price="props.activeFilters.min_price" :max_price="props.activeFilters.max_price"  @change="onChangePrice"/>
      <color-collection-filter-hardware :value="props.activeFilters.color_collection" @change="onChangeColorCollection" :colorCollection="colorCollections"/>
      <design-filter-hardware :value="props.activeFilters.design" @change="onChangeDesigns" :design="design"/>
      <primary-button-small class="w-full text-start " @click="resetFilters">
        <h3>Очистить</h3>
      </primary-button-small>
    </div>

  </section>
</template>

<style scoped>

</style>