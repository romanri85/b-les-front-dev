<template>
  <div class="filter-bar mb-4">
    <div class="pb-4">
      <h3>{{props.total }} {{ getStoreWordForm(props.total) }}</h3>
    </div>

    <FormKit
        decoratorIcon="check"
        v-model="isOpen"
        type="checkbox"
        :options="{ open: 'Только открытые магазины', monoBrand: 'Только монобрендовые магазины' }"
        @input="changeFilter"
    />


<!--    <pre wrap>{{ filter }}</pre>-->
  </div>
</template>

<script setup>

import {ref} from 'vue'

let isOpen = ref(false)

const filterKey = ref(0)

const props = defineProps({
  total: Number,

})


const emit = defineEmits(['filter-change'])

let filterState = ref('all')

function getStoreWordForm(count) {
  let mod100 = count % 100;
  if (mod100 > 10 && mod100 < 20) {
    return 'магазинов';
  }

  switch (count % 10) {
    case 1:
      return 'магазин';
    case 2:
    case 3:
    case 4:
      return 'магазина';
    default:
      return 'магазинов';
  }
}



function changeFilter(value) {
  filterKey.value++


  if (value.length ===2) {
    filterState.value = 'openAndMonobrand'
  } else if (value.length ===1 && value[0] === 'open') {
    filterState.value = 'open'
  } else if (value.length === 1 && value[0] === 'monoBrand') {
    filterState.value = 'monobrand'
  } else {
    filterState.value = 'all'
  }

  emit('filter-change', filterState.value)
}




</script>
