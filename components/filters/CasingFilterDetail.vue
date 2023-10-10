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

  emit('changeFilter', casingActiveindex.value)
}


</script>

<template class="filter-container ">
  <div v-if="props.productCasings">
    <client-only>

      <Disclosure default-open>
        <DisclosureButton class=" w-full">
          <filter-type class="whitespace-nowrap" filterName="Оформление портала"/>
        </DisclosureButton>
        <DisclosurePanel class="">
          <div class="flex gap-y-6 gap-x-10  mb-3 flex-wrap w-full">
            <div v-for="casing in props.productCasings[props.material].sort(
            (a, b) => a.casing_name.localeCompare(b.casing_name)
            )" :key="casing.casing"
                 @click="chooseCasing(casing.casing)">
              <div class="flex flex-col items-start ">
                <div class="pb-1 border-b-4"
                     :class="{
             'border-black': casing.casing === casingActiveindex,
             'border-transparent': casing.casing !== casingActiveindex
         }">
                  <div :style="{
              backgroundImage: 'url(' + casing.image + ')',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center'
          }"
                       class="w-16 h-16 shadow-darkGrey shadow-sm cursor-pointer"></div>
                </div>

                <p class="hidden lg:block pt-2 cursor-pointer whitespace-nowrap">
                  {{ casing.casing_name }}</p>
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