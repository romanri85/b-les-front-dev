<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import FilterType from '~/components/filters/FilterType.vue'

const props = defineProps({
  value: {
    type: Array,
  },
  design: {
    type: Array,
  },
})

const emit = defineEmits(['change'])

// let chosenDesigns = reactive(props.value || [])
function chooseDesign(design) {
  if (!props.value.includes(design)) {
    emit('change', { design: [...props.value, design] })
  }
  else {
    const updatedDesigns = props.value.filter((item) => {
      return item !== design
    })
    emit('change', { design: updatedDesigns })
  }
}
</script>

<template class="filter-container ">
  <Disclosure default-open>
    <DisclosureButton class=" w-full">
      <FilterType filter-name="Дизайн" />
    </DisclosureButton>
    <DisclosurePanel class="mb-[80px]">
      <div v-for="design in props.design" :key="design.id" class="flex gap-x-[15px] items-center mb-3">
        <h5
          class="cursor-pointer underline-offset-4" :class="{ underline: props.value.includes(design.id) }"
          @click="chooseDesign(design.id)"
        >
          {{ design.name }}
        </h5>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>

</style>
