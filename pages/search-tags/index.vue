<script setup lang="ts">

import Hero from "~/components/base/hero.vue";
import {onMounted} from "vue";
import {useInteriorStore} from "~/stores/interiorStore";
import {storeToRefs} from "pinia";
import Pagination from "~/components/base/Pagination.vue";
import buttons from "~/data/interiorButtons.json";

const interiorStore = useInteriorStore()
const {projects} = storeToRefs(interiorStore)


const heroName = "interiorHeader"
const heroDescription = ""
const heroImage = "/interior/bg-interior.png"

let products = ref([])

const route = useRoute()



onMounted(
    async () => {
      await interiorStore.getProjects()

    }
)


function onChangePage(page) {
  console.log(page, 'page')
  interiorStore.getProjects(page)
}

</script>

<template>
  <hero :heroName="heroName" :hero-description="heroDescription" :heroImage="heroImage" :buttons="buttons"/>

  <pagination class="pb-32 flex justify-center" :total="interiorStore.total"
              :page_size="interiorStore.page_size"
              :pagesCount="interiorStore.pagesCount"
              @page-change="onChangePage"
              v-model:current-page="interiorStore.page"/>
</template>


<style scoped>

</style>