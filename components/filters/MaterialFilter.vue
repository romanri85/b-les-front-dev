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
  console.log(response, "material colors")
  return response;
}
onMounted(async () => {
  materialColors.value = await fetchMaterialColors()
  console.log(chosenMaterials, "chosenMaterials")
})




let chosenMaterials = reactive(props.material)





function chooseMaterial(material){
  if (!chosenMaterials.includes(material)) {
    chosenMaterials.push(material)
    console.log(chosenMaterials)
  } else {
    chosenMaterials.splice(chosenMaterials.indexOf(material), 1)
    console.log(chosenMaterials)
  }
  emit('changeMaterials', {"material":chosenMaterials})
}




</script>

<template class="filter-container ">
  <Disclosure default-open>
    <DisclosureButton class=" w-full">
      <filter-type filterName="Выбрать отделку"/>
    </DisclosureButton>
    <DisclosurePanel class="mb-20">
          <div class="flex justify-around w-full pr-4">
            <div v-for="(material) in materialColors" :key="material.material" class="text-darkGrey">
              <h4 @click="chooseMaterial(material.material)"  :class="{'border-b': chosenMaterials.includes(material.material), 'border-black':chosenMaterials.includes(material.material), 'text-primaryDark':chosenMaterials.includes(material.material)}" class="">{{
                  material.name
                }}</h4>
            </div>
          </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>

</style>