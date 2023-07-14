<script setup lang="ts">
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import FilterType from "~/components/filters/FilterType.vue";
import {string} from "postcss-selector-parser";
const props = defineProps({
  value: {
    type: String
  },
  design: {
    type: Array,
  }
})

const emit = defineEmits(['changeGlass'])


let chosenGlass = ref(props.value)

onMounted(() => {
})

function chooseGlass(bool_str: string){
  if(props.value !== bool_str){
    chosenGlass.value = bool_str
  } else {
    chosenGlass.value = ''
  }
  emit('changeGlass', {glass: chosenGlass.value})
}


</script>

<template class="filter-container ">
  <Disclosure default-open>
    <DisclosureButton class=" w-full">
      <filter-type filterName="Стекло"/>
    </DisclosureButton>
    <DisclosurePanel class="mb-[80px]">
      <div  class="flex flex-col gap-y-4 items-start mb-3">
        <h5 class="cursor-pointer underline-offset-4" @click="chooseGlass('true')" :class="{'underline':props.value==='true'}">Со стеклом</h5>
        <h5 class="cursor-pointer underline-offset-4" @click="chooseGlass('false')" :class="{'underline':props.value==='false'}">Без стекла</h5>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>

</style>