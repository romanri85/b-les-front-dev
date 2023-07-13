<script setup lang="ts">

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/vue";
import FilterType from "~/components/filters/FilterType.vue";
import {baseURL} from "~/config";
// import {background} from "ipx";

const props = defineProps({
  value: {
    type: Array,
  },
  material: {
    type: Array,
  }
})

const emit = defineEmits(['changeMaterials'])


let materialColors = ref([])


async function fetchMaterialColors() {
  const response = await $fetch(`${baseURL}/api/product/material-choices`);
  return response;
}
onMounted(async () => {
  materialColors.value = await fetchMaterialColors()
})









function chooseMaterial(material){
  if (!props.material.includes(material)) {
    emit("changeMaterials",{material: [...props.material, material]})
  } else {
    const updatedMaterials = props.material.filter((item)=>{
      return item !== material
    })
    emit('changeMaterials', {"material": updatedMaterials})
  }
}

// function chooseColorSet(id){
//   if(!props.value.includes(id)){
//     console.log({color_set:[...props.value, id]})
//     emit('change', {color_set:[...props.value, id]})
//
//   } else {
//     const updatedColorSets = props.value.filter((set)=>{
//       return set !== id
//     })
//     console.log({color_set: updatedColorSets})
//     emit('change', {color_set: updatedColorSets})
//   }


</script>

<template class="filter-container ">
  <Disclosure default-open>
    <DisclosureButton class=" w-full">
      <filter-type filterName="Выбрать отделку"/>
    </DisclosureButton>
    <DisclosurePanel class="mb-20">
          <div class="flex justify-around w-full pr-4">
            <div v-for="(material) in materialColors" :key="material.material" class="text-darkGrey">
              <h4 @click="chooseMaterial(material.material)"  :class="{'border-b': props.material.includes(material.material), 'border-black':props.material.includes(material.material), 'text-primaryDark':props.material.includes(material.material)}" class="">{{
                  material.name
                }}</h4>
            </div>
          </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>

</style>