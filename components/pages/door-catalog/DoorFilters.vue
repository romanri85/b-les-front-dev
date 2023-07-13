<script setup lang="ts">
import PriceFilter from "~/components/filters/priceFilter.vue";
import ColorSetFilter from "~/components/filters/colorSetFilter.vue";
import DesignFilter from "~/components/filters/designFilter.vue";
import MaterialColorFilter from "~/components/pages/door-catalog/MaterialColorFilter.vue";
import DoorCollectionsFilter from "~/components/pages/door-catalog/DoorCollectionsFilter.vue";
import PrimaryButton from "~/components/buttons/PrimaryButtonSmall.vue";
import PrimaryButtonSmall from "~/components/buttons/PrimaryButtonSmall.vue";
import {baseURL} from "~/config";
import MaterialFilter from "~/components/filters/MaterialFilter.vue";
import GlassFilter from "~/components/filters/GlassFilter.vue";

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

let color_sets = ref([])

async function fetchColorSets() {
  const response = await $fetch(`${baseURL}/api/product/color-sets`);
  return response;
}
onMounted(async () => {
  color_sets.value = await fetchColorSets()
})


  // window.scrollTo(0, 0);



// function update_oBarValues(e) {
//   oBarMinValue.value = e.minValue;
//   oBarMaxValue.value = e.maxValue;
// }





function onChangePrice(min_price, max_price) {
  emit('changeFilters', {'max_price':max_price, 'min_price':min_price})
}

function onChangeColorSet(color_set) {
  emit('changeFilters', color_set)
}

function onChangeColors(color) {
  emit('changeFilters', color)
}

function onChangeMaterials(materials) {
  emit('changeFilters', materials)
}

function onChangeDesigns(design) {
emit('changeFilters', design)
}

function onChangeCollections(collection) {
emit('changeFilters', collection)
}

function onChangeGlass(glass) {
  console.log(glass)
  emit('changeFilters', glass)
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
      <price-filter :min_price="props.activeFilters.min_price" :max_price="props.activeFilters.max_price"  @change="onChangePrice"/>
      <color-set-filter :value="props.activeFilters.color_set" @change="onChangeColorSet" :color_sets="color_sets"/>
      <design-filter :value="props.activeFilters.design" @change="onChangeDesigns" :design="design"/>
      <material-filter :material="props.activeFilters.material" @changeMaterials="onChangeMaterials"/>
      <material-color-filter :value="props.activeFilters.color" :material="props.activeFilters.material" @change="onChangeColors"/>
      <door-collections-filter :value="props.activeFilters.collection" @change="onChangeCollections"/>
      <glass-filter :value="props.activeFilters.glass"   @changeGlass="onChangeGlass" :design="design"/>
      <primary-button-small class="w-full text-start " @click="resetFilters">
        <h3>Очистить</h3>
      </primary-button-small>
    </div>

  </section>
</template>

<style scoped>

</style>