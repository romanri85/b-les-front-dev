<script setup lang="ts">

import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import FilterType from "~/components/filters/FilterType.vue";
// import {background} from "ipx";

const props = defineProps({

  material: {
    type: Number
  },
  color: {
    type: Number
  },
  product: {
    type: Object
  },
  modelName: {
    type: String
  }
})


const emit = defineEmits(['changeModel'])

const productFamily = ref(null)
if(props.product.product_family) {
  productFamily.value = props.product.product_family.products
}

onMounted(async () => {
console.log(props.product.product_family.products)


})


const modelActiveName = ref(props.modelName)


function chooseModel(model) {
  modelActiveName.value = model

  emit('changeModel', modelActiveName.value)
}


</script>

<template class="filter-container">
  <div v-if="product.product_family && product.product_family.products">
    <client-only>
      <Disclosure default-open>
        <DisclosureButton class=" w-full">
          <filter-type filterName="Форма"/>
        </DisclosureButton>
        <DisclosurePanel class="mb-20">
          <client-only>
            <div class="flex gap-y-6 gap-x-6 mb-3 mt-5 flex-wrap w-2/3">
                <div v-if="productFamily" v-for="model in productFamily"
                     :key="model.name" @click="chooseModel(model.name)" class="flex flex-col items-center pb-12">
                  <div class="relative pb-1"
                       :class="{'border-b': model.name === modelActiveName, 'border-black':model.name === modelActiveName}">
                    <!--            <nuxt-img width="200px" height="auto" :src="props.doorVariant.casing_variant.image"-->
                    <!--                      class="h-auto w-48"></nuxt-img>-->
                    <!--            <nuxt-img width="200px" height="auto"-->
                    <!--                      :src="props.doorVariant.leaf_image"-->
                    <!--                      class="h-auto w-48 absolute top-0"></nuxt-img>-->
                    <nuxt-img v-if="model.image" key=0 width="100px" height="auto"
                              :src="model.image"
                              class="h-auto w-16"></nuxt-img>
                  </div>
<!--                  <div class="text-center text-sm">{{ model.name }}</div>-->
              </div>
            </div>
          </client-only>
        </DisclosurePanel>
      </Disclosure>
    </client-only>

  </div>

</template>


<style scoped>

</style>