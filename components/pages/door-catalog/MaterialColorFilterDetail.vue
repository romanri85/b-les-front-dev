<script setup lang="js">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/vue'
import FilterType from '~/components/filters/FilterType.vue'
import { useFiltersStore } from '~/stores/filtersStore'

// import {background} from "ipx";

const props = defineProps({
  activeFilters: {
    type: Object,
  },
  productMaterials: {
    type: Array,
  },
  material: {
    type: Number,
  },
  color: {
    type: Number,
  },

})

const emit = defineEmits(['changeFilter', 'changeMaterials'])

//
// onMounted(async () => {
//
//
// })

const filtersStore = useFiltersStore()

const materialActiveindex = ref(props.material)
const colorActiveindex = ref(props.color)

function chooseColor(id) {
  colorActiveindex.value = id

  emit('changeFilter', { material: materialActiveindex.value, color: id })
}

function chooseMaterial(material) {
  materialActiveindex.value = material
}

const materialMap = { 3: 0, 2: 1, 1: 2 }
const index = materialMap[props.material]
</script>

<template class="filter-container ">
  <!-- <p>{{materialMap[props.material]}}</p> -->
  <div v-if="props.productMaterials[0]" class="w-full lg:w-1/2 min-h-0 mdLg:min-h-[350px] md:min-h-[440px] lg:min-h-0">
    <client-only>
      <Disclosure default-open>
        <DisclosureButton class=" w-full">
          <FilterType filter-name="Выбрать цвет" />
        </DisclosureButton>
        <DisclosurePanel class="lg:mb-6 mb-10">
          <TabGroup v-if="props.productMaterials" :default-index="index">
            <TabList>
              <div class="flex justify-start gap-x-12 lg:gap-x-20 w-full">
                <div
                  v-for="material in props.productMaterials.sort((a, b) => {
                    if (a.material < b.material) { return 1; }
                    if (a.material > b.material) { return -1; }
                    return 0;
                  })" :key="material.material"
                >
                  <Tab
                    v-slot="{ selected }" as="template"
                    class="text-primaryDark cursor-pointer"
                  >
                    <h4
                      :class="{ '': selected, 'selected-color ': selected, 'text-primaryDark': selected }"
                      @click="chooseMaterial(material.material)"
                    >
                      {{
                        material.name
                      }}
                    </h4>
                  </Tab>
                </div>
              </div>
            </TabList>
            <TabPanels v-if="props.productMaterials">
              <TabPanel v-for="material of props.productMaterials" v-if="material" :key="material.material">
                <div v-if="material" class="flex gap-y-6 gap-x-6 mb-3 mt-5 flex-wrap w-full">
                  <div v-for="color in material.color" :key="color.id" @click="chooseColor(color.id)">
                    <div class="flex flex-col items-start w-24">
                      <div
                        class="pb-1 border-b-4"
                        :class="{  'border-black': color.id === colorActiveindex, 'border-transparent': color.id !== colorActiveindex}"
                      >
                        <div
                          :style="color.image ? `background-image: url(${color.image})` : `background-color: ${color.hex_code}`"
                          class="w-12 h-12 shadow-darkGrey shadow-sm cursor-pointer"
                        />
                      </div>
                      <h5 class=" pt-2 cursor-pointer whitespace-nowrap">
                        {{ color.name }}
                      </h5>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </DisclosurePanel>
      </Disclosure>
    </client-only>
  </div>
</template>

<style scoped>
.selected-color {

  border-bottom: 1px solid #000000;
}
</style>
