<template>
  <div class="example-six">
    <mobilePagination v-if="viewport.isMobile" key="mobile" :total="props.total" :currentPage="currentPage" :page_size="props.page_size"
                      @pageChange="HandleNewPage"/>
    <desktopPagination v-else-if="viewport.isDesktop" key="desktop" :total="props.total" :currentPage="currentPage" :page_size="props.page_size"
                       @pageChange="HandleNewPage"/>
    <tabletPagination :total="props.total" v-else-if="viewport.isTablet" key="tablet" :currentPage="currentPage" :page_size="props.page_size"
                      @pageChange="HandleNewPage"/>


  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import MobilePagination from "~/components/base/pagination/mobilePagination.vue";
import DesktopPagination from "~/components/base/pagination/desktopPagination.vue";
import TabletPagination from "~/components/base/pagination/tabletPagination.vue";
import {useViewportSize} from "~/composables/useViewportSize";
const viewport = useViewportSize();

const props = defineProps({
  total: Number,
  currentPage: Number,
  page_size: Number,
})
const currentPage = computed({
  get: () => props.currentPage,
  set: (value) => emitPagination('update:currentPage', value)
})


const emitPagination = defineEmits(['update:currentPage', 'pageChange'])


const HandleNewPage = (current) => {
  emitPagination('update:currentPage', current)
  emitPagination('pageChange', current)
  // window.scrollTo(0, 500);

}
</script>
<style>
.pagination-container {
  column-gap: 10px;
  align-items: center;
}

.paginate-buttons {
  height: 52px;
  width: 52px;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid black;
  color: black;
  @apply shadow-darkGrey shadow-sm;
}

@media (min-width: 1024px) {
  .paginate-buttons {
    height: 60px;
    width: 60px;
  }
}


.back-button,
.next-button {
  background-color: white;
  color: black;
  height: 52px;
  width: 52px;

  margin-inline: 10px;
  @apply shadow-darkGrey shadow-sm;

}
@media (min-width: 1024px) {
  .back-button, .next-button {
    border: black 1px solid;
    height: 60px;
    width: 60px;
    margin-inline: 35px;
  }
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