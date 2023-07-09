<script setup lang="ts">

import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import FilterType from "~/components/filters/FilterType.vue";
// import {background} from "ipx";

const props = defineProps({
  productCasings: {
    type: Object
  },
  material: {
    type: Number
  },
  color: {
    type: Number
  },
  casingVariants: {
    type: Object
  },
  startCasing: {
    type: Number
  }
})

const emit = defineEmits(['changeFilter'])


onMounted(async () => {
})


const casingActiveindex = ref(props.startCasing)


function chooseCasing(casing) {
  casingActiveindex.value = casing

  emit('changeFilter',  casingActiveindex.value)
}



</script>

<template class="filter-container ">
  <div v-if="props.productCasings" >
    <client-only>

      <Disclosure default-open>
        <DisclosureButton class=" w-full">
          <filter-type filterName="Оформление портала"/>
        </DisclosureButton>
        <DisclosurePanel class="mb-20">
          <div class="flex gap-y-6 gap-x-6 mb-3 mt-5 flex-wrap w-2/3">
            <div v-for="casing in props.productCasings[props.material]" :key="casing.casing" @click="chooseCasing(casing.casing)">
              <div class="flex flex-col items-center w-24">
                <div class="pb-1"
                     :class="{'border-b': casing.casing === casingActiveindex, 'border-black':casing.casing === casingActiveindex}">
                  <div  :style="{
  backgroundImage: 'url(' + casing.image + ')',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center'
}"
                       class="w-12 h-12 shadow-darkGrey shadow-sm cursor-pointer"></div>
                </div>
                <h5 class="pt-2 cursor-pointer" :class="{'font-regular':casing.casing === casingActiveindex}">
                  {{ casing.casing_name }}</h5>
              </div>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </client-only>

  </div>

</template>


<style scoped>

</style>