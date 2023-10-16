<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import FilterType from '~/components/filters/FilterType.vue'

// import {background} from "ipx";

const props = defineProps({
  glass_decor: {
    type: Array,
  },
  newGlass: {
    type: Object,
  },

})

const emit = defineEmits(['changeGlassDecor'])

const initialGlass = props.glass_decor.find((item: GlassDecorItem) => item.initial === true)

const glassTypeActiveIndex = ref(initialGlass.glass.id)
const glassDecorActiveIndex = ref(initialGlass.decor.id)
const glassDecor = ref({ glass: initialGlass.glass.id, decor: initialGlass.decor.id })

if (props.glass_decor?.find((item) => {
  return ((item.glass.id === props.newGlass.glass?.id) && (item.decor.id === props.newGlass.decor?.id))
})) {
  glassTypeActiveIndex.value = props.newGlass.glass.id
  glassDecorActiveIndex.value = props.newGlass.decor.id
  glassDecor.value = { glass: props.newGlass.glass.id, decor: props.newGlass.decor.id }
}

interface GlassDecorItem {
  id: number
  glass: object
  price: string
  decor: number
  glass_name: string
  decor_name: string
  image: string
}

onMounted(async () => {
})

function chooseGlass(glass: number): void {
  console.log('changeGlassDecor')
  if (glass === glassDecor.value.glass)
    return

  glassTypeActiveIndex.value = glass
  glassDecor.value = { ...glassDecor.value, glass }
  if (glassDecor.value.glass === initialGlass.glass.id && glassDecor.value.decor === initialGlass.decor.id) {
    emit('changeGlassDecor', null)
    return
  }

  emit('changeGlassDecor', { glass: glassDecor.value.glass, decor: glassDecor.value.decor })
}

function chooseDecor(decor: number): void {
  if (decor === glassDecor.value.decor)
    return

  glassDecorActiveIndex.value = decor
  glassDecor.value = { ...glassDecor.value, decor }

  if (glassDecor.value.glass === initialGlass.glass.id && glassDecor.value.decor === initialGlass.decor.id) {
    emit('changeGlassDecor', null)
    return
  }

  emit('changeGlassDecor', { glass: glassDecor.value.glass, decor: glassDecor.value.decor })
}

interface GlassTypeItem {
  glass_name: string
  glass: number
  id: number
  image: string
}

const glass_types = props.glass_decor.reduce((acc: GlassTypeItem[], item: GlassDecorItem) => {
  if (!acc.find(obj => obj.glass_name === item.glass_name))
    acc.push({ glass_name: item.glass_name, glass: item.glass.id, id: item.id, image: item.glass.image })

  return acc
}, [])

const decors = props.glass_decor.reduce((acc: GlassDecorItem[], item: GlassDecorItem) => {
  if (!acc.find(obj => obj.decor_name === item.decor_name))
    acc.push({ decor_name: item.decor_name, decor: item.decor.id, id: item.id, image: item.decor.image })

  return acc
}, [])
</script>

<template class="filter-container ">
  <!--  <div v-if="props.glass_decor && props.glass_decor.g" > -->
  <Disclosure default-open>
    <DisclosureButton class=" w-full">
      <FilterType filter-name="Тип стекла и декора" />
    </DisclosureButton>
    <DisclosurePanel class="mb-16">
      <div class="flex justify-start  items-start gap-x-20">
        <div class="flex gap-y-6 gap-x-6 mb-3  flex-wrap">
          <div v-for="glass in glass_types" :key="glass.glass" @click="chooseGlass(glass.glass)">
            <div class="flex flex-col items-center w-20">
              <div
                v-if="glassTypeActiveIndex" class="pb-1 border-b-4"
                :class="{ 'border-transparent': glass.glass !== glassTypeActiveIndex, 'border-black': glass.glass === glassTypeActiveIndex }"
              >
                <div
                  :style="{
                    backgroundImage: `url(${glass.image})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                  }"
                  class="w-12 h-12 shadow-darkGrey shadow-sm cursor-pointer"
                />
              </div>
              <p class="pt-2 cursor-pointer">
                {{ glass.glass_name }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex gap-y-6 gap-x-6 mb-3 flex-wrap">
          <div v-for="decor in decors" :key="decor.decor" @click="chooseDecor(decor.decor)">
            <div class="flex flex-col items-center w-20">
              <div
                v-if="glassDecorActiveIndex" class="pb-1 border-b-4"
                :class="{ 'border-transparent': decor.decor !== glassDecorActiveIndex, 'border-black': decor.decor === glassDecorActiveIndex }"
              >
                <div
                  :style="{
                    backgroundImage: `url(${decor.image})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                  }"
                  class="w-12 h-12 shadow-darkGrey shadow-sm cursor-pointer"
                />
              </div>
              <p class="pt-2 cursor-pointer">
                {{ decor.decor_name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>

  <!--  </div> -->
</template>

<style scoped>

</style>
