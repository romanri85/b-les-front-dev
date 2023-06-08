<script setup lang="ts">
import PriceFilter from "~/pages/catalog/priceFilter.vue";
import ColorFilter from "~/pages/catalog/colorSetFilter.vue";
import DesignFilter from "~/pages/catalog/designFilter.vue";
import MaterialColorFilter from "~/pages/catalog/materialColorFilter.vue";
import CollectionsFilter from "~/pages/catalog/collectionsFilter.vue";
import PrimaryButton from "~/components/buttons/PrimaryButtonSmall.vue";
import PrimaryButtonSmall from "~/components/buttons/PrimaryButtonSmall.vue";

const emit = defineEmits(['changeFilters'])
const props = defineProps({
  activeFilters: Object
})


const oBarMinValue = ref(0);
const oBarMaxValue = ref(100000);

function update_oBarValues(e) {
  oBarMinValue.value = e.minValue;
  oBarMaxValue.value = e.maxValue;
}





function onChangePrice(price) {
  emit('changeFilters', price)
}

function onChangeColorSet(colorSet) {
  emit('changeFilters', colorSet)
}

function onChangeColors(colors) {
  emit('changeFilters', colors)
}

function onChangeDesigns(designs) {
emit('changeFilters', designs)
}

function onChangeCollections(collections) {
emit('changeFilters', collections)
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
      <price-filter :value="props.activeFilters.price" @change="onChangePrice" />
      <color-filter :value="props.activeFilters.colorSet" @change="onChangeColorSet"/>
      <design-filter :value="props.activeFilters.designs" @change="onChangeDesigns"/>
      <material-color-filter :value="props.activeFilters.colors" @change="onChangeColors"/>
      <collections-filter :value="props.activeFilters.collections" @change="onChangeCollections"/>
      <primary-button-small class="w-full text-start mt-16">
        <h3>Очистить</h3>
      </primary-button-small>
    </div>

  </section>
</template>

<style scoped>

</style>