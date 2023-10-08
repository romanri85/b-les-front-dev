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
  },
  activeCasing: {
    type: Number
  },
})


const emit = defineEmits(['changeModel'])


onMounted(async () => {


})


// was replaced with nuxtlink

// function chooseModel(model) {
//
//   emit('changeModel', model)
// }


</script>

<template class="filter-container">
  <div v-if="props.product.product_family && props.product.product_family.products" class="w-full lg:w-1/3">
    <client-only>
      <Disclosure default-open>
        <DisclosureButton class="w-full">
          <filter-type filterName="Форма"/>
        </DisclosureButton>
        <DisclosurePanel class="mb-10 ">
          <div class="flex mb-2 mt-0 lg:flex-wrap flex-nowrap  w-full justify-start">
            <div v-if="props.product.product_family.products" v-for="model in props.product.product_family.products"
                 :key="model.name" class="flex flex-col items-center flex-item lg:mt-8 mt-0">
              <div v-if="model.image !== null"
                   class="relative flex flex-col justify-center pb-1  cursor-pointer border-b-4"
                   :class="{'border-transparent': model.name !== props.product.name, 'border-black':model.name === props.product.name}">
                <!--            <nuxt-img width="200px" height="auto" :src="props.doorVariant.casing_variant.image"-->
                <!--                      class="h-auto w-48"></nuxt-img>-->
                <!--            <nuxt-img width="200px" height="auto"-->
                <!--                      :src="props.doorVariant.leaf_image"-->
                <!--                      class="h-auto w-48 absolute top-0"></nuxt-img>-->
                <nuxt-link :to="{path: `/catalog/${model.id}`, query: {color: props.color, material: props.material}}">
                  <nuxt-img v-if="model.image" key=0 width="100px" height="auto"
                            :src="model.image"
                            class="h-auto w-16 pb-3"></nuxt-img>
                </nuxt-link>
              </div>
              <!--                  <div class="text-center text-sm">{{ model.name }}</div>-->
            </div>
            <!-- -->
          </div>
        </DisclosurePanel>
      </Disclosure>
    </client-only>

  </div>

</template>


<style scoped>
.flex-item {
  @media screen and (min-width: 1440px) {
    margin-right: 20px;
    padding-right: 20px;
  }

  @media screen and (min-width: 768px) and (max-width: 1439px) {
    margin-right: 10px;
    padding-right: 20px;
  }


  @media screen and (min-width: 420px) and (max-width: 768px) {
  margin-right: 10px ;
  padding-right: 20px ;
}

  @media screen and (max-width: 419px) {
    margin-right: 0px ;
    padding-right: 10px ;
  }
}
</style>