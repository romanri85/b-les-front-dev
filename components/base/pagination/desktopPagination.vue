<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'
import { computed } from 'vue'
import { VueAwesomePaginate } from 'vue-awesome-paginate'

const props = defineProps({
  total: Number,
  currentPage: Number,
  page_size: Number,
})
const emitPagination = defineEmits(['update:currentPage', 'pageChange'])

const currentPage = computed({
  get: () => props.currentPage,
  set: value => emitPagination('update:currentPage', value),
})

function HandleNewPage(current) {
  emitPagination('update:currentPage', current)
  emitPagination('pageChange', current)
  const totalHeight = document.documentElement.scrollHeight
  const viewportHeight = window.innerHeight
}
</script>

<template>
  <div class="example-six">
    <VueAwesomePaginate
      v-model="currentPage"
      :total-items="props.total"
      :items-per-page="props.page_size"
      :max-pages-shown="5"
      :on-click="HandleNewPage"
    >
      <template #prev-button>
        <span>
          <ChevronLeftIcon class="w-6 h-6 mx-auto" />
        </span>
      </template>

      <template #next-button>
        <span>
          <ChevronRightIcon class="w-6 h-6 mx-auto" />
        </span>
      </template>
    </VueAwesomePaginate>
  </div>
</template>

<style>
.pagination-container {
  column-gap: 10px;
  align-items: center;
}

.paginate-buttons {
  height: 60px;
  width: 60px;
  cursor: pointer;
  background-color: transparent;
  border: black 1px solid;
  color: black;
  @apply shadow-darkGrey shadow-sm;
}

.back-button,
.next-button {
  background-color: white;
  color: black;
  height: 60px;
  width: 60px;
  border: black 1px solid;
  margin-inline: 35px;
  @apply shadow-darkGrey shadow-sm;
}

.active-page {
  @apply bg-black text-white;
}

.paginate-buttons:hover {
}

.active-page:hover {
}

.back-button:hover,
.next-button:hover {
  background-color: rgb(45, 45, 45);
}

.back-button:active,
.next-button:active {

}

.back-button:hover,
.next-button:hover {
  background-color: white;
}
</style>
