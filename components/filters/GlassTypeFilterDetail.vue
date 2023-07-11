<script setup lang="ts">

import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import FilterType from "~/components/filters/FilterType.vue";
// import {background} from "ipx";

const props = defineProps({
  glass_decor: {
    type: Array
  },

})

type Props = {
  glass_decor: GlassDecorItem[];
};
const initialGlass = props.glass_decor.find((item: GlassDecorItem) => item.initial === true)

const glassTypeActiveIndex = ref(initialGlass.glass.id)
const glassDecorActiveIndex = ref(initialGlass.decor.id)

const glassDecor = ref({glass: initialGlass.glass.id, decor: initialGlass.decor.id})


type GlassDecorItem = {
  id: number;
  glass: object;
  price: string;
  decor: number;
  glass_name: string;
  decor_name: string;
  image: string;
};






const emit = defineEmits(['changeGlassDecor'])


onMounted(async () => {
})




function chooseGlass(glass: number) :void{
  if (glass === glassDecor.value.glass ) {
    return
  }
  glassTypeActiveIndex.value = glass
  glassDecor.value = {...glassDecor.value, "glass": glass}
  if (glassDecor.value.glass === initialGlass.glass.id && glassDecor.value.decor === initialGlass.decor.id) {
    emit('changeGlassDecor',  null)
    return
  }

  emit('changeGlassDecor',  {glass: glassDecor.value.glass, decor: glassDecor.value.decor})

}

function chooseDecor(decor:number) :void{
  if (decor === glassDecor.value.decor ) {
    return
  }
  glassDecorActiveIndex.value = decor
  glassDecor.value = {...glassDecor.value, "decor": decor}

  if (glassDecor.value.glass === initialGlass.glass.id && glassDecor.value.decor === initialGlass.decor.id) {
    emit('changeGlassDecor',  null)
    return
  }

  emit('changeGlassDecor',  {glass: glassDecor.value.glass, decor: glassDecor.value.decor})
}


type GlassTypeItem = {
  glass_name: string;
  glass: number;
  id: number;
  image: string;
};


const glass_types = props.glass_decor.reduce((acc: GlassTypeItem[], item: GlassDecorItem) => {
  if (!acc.find(obj => obj.glass_name === item.glass_name)) {
    acc.push({glass_name: item.glass_name, glass: item.glass.id, id: item.id, image: item.glass.image});
  }
  return acc;
}, []);

const decors = props.glass_decor.reduce((acc: GlassDecorItem[], item: GlassDecorItem) => {
  if (!acc.find(obj => obj.decor_name === item.decor_name)) {
    acc.push({decor_name: item.decor_name, decor: item.decor.id, id: item.id, image: item.decor.image});
  }
  return acc;
}, []);





</script>

<template class="filter-container ">
<!--  <div v-if="props.glass_decor && props.glass_decor.g" >-->
      <Disclosure default-open>
        <DisclosureButton class=" w-full">
          <filter-type filterName="Тип стекла и декора"/>
        </DisclosureButton>
        <DisclosurePanel class="mb-20">
          <div class="flex gap-y-6 gap-x-6 mb-3 mt-5 flex-wrap w-full">
            <div v-for="glass in glass_types" :key="glass.glass" @click="chooseGlass(glass.glass)">
              <div class="flex flex-col items-center w-20">
                <div class="pb-1"
                     :class="{'border-b': glass.glass === glassTypeActiveIndex, 'border-black':glass.glass === glassTypeActiveIndex}">
                  <div  :style="{
  backgroundImage: 'url(' + glass.image + ')',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center'
}"
                        class="w-12 h-12 shadow-darkGrey shadow-sm cursor-pointer"></div>
                </div>
                <p class="pt-2 cursor-pointer" :class="{'font-regular':glass.glass === glassTypeActiveIndex}">
                  {{ glass.glass_name }}</p>
              </div>
            </div>
          </div>
          <div class="flex gap-y-6 gap-x-6 mb-3 mt-5 flex-wrap w-full">
            <div v-for="decor in decors" :key="decor.decor" @click="chooseDecor(decor.decor)">
              <div class="flex flex-col items-center w-20">
                <div class="pb-1"
                     :class="{'border-b': decor.decor === glassDecorActiveIndex, 'border-black':decor.decor ===  glassDecorActiveIndex}">
                  <div  :style="{
  backgroundImage: 'url(' + decor.image + ')',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center'
}"
                        class="w-12 h-12 shadow-darkGrey shadow-sm cursor-pointer"></div>
                </div>
                <p class="pt-2 cursor-pointer" :class="{'font-regular':decor.decor ===  glassDecorActiveIndex  }">
                  {{ decor.decor_name }}</p>
              </div>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>

<!--  </div>-->

</template>


<style scoped>

</style>