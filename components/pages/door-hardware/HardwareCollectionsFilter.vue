<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import FilterType from '~/components/filters/FilterType.vue'
import collections from '~/data/SliderCollections.json'

const props = defineProps({
  value: {
    type: Array,
  },
})
const emit = defineEmits(['change'])

function chooseCollection(id: number) {
  if (!props.value.includes(id)) {
    emit('change', { collection: [...props.value, id] })
  }
  else {
    const updatedCollections = props.value.filter((item) => {
      return item !== id
    })
    emit('change', { collection: updatedCollections })
  }
}
</script>

<template class="filter-container ">
  <Disclosure default-open>
    <DisclosureButton class=" w-full">
      <FilterType filter-name="Коллекции" />
    </DisclosureButton>
    <DisclosurePanel class="mb-20">
      <div v-for="collection in collections" :key="collection.id" class="flex gap-x-4 items-center mb-3">
        <h5 class="underline-offset-4 cursor-pointer" :class="{ underline: props.value.includes(collection.id) }" @click="chooseCollection(collection.id)">
          {{ $t(collection.name) }}
        </h5>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>

</style>
