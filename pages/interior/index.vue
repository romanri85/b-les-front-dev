<script setup lang="ts">

import Hero from "~/components/base/hero.vue";
import {onMounted} from "vue";
import {useInteriorStore} from "~/stores/interiorStore";
import {storeToRefs} from "pinia";
import Pagination from "~/components/base/pagination/Pagination.vue";
import buttons from "~/data/interiorButtons.json";
import {useRoute, useRouter} from 'vue-router';
import HeroInteriour from "~/components/pages/interiour/heroInteriour.vue";

const interiorStore = useInteriorStore()
const {projects} = storeToRefs(interiorStore)

const heroName = "interiorHeader"
const heroDescription = ""
const heroImage = "/interior/bg-interior.png"
const route = useRoute();
const router = useRouter();
const currentPage = ref(route.query.page ? parseInt(route.query.page as string) : 1);

let products = ref([])


await interiorStore.getProjects(currentPage.value);
watch(() => route.query.page, (newPage) => {
  currentPage.value = parseInt(newPage as string); // Update currentPage value
  interiorStore.getProjects(currentPage.value);
});

function onChangePage(page) {
  router.push({query: {page: page.toString()}}); // Ensure page is a string
  interiorStore.getProjects(page)
}

</script>

<template>
  <hero-interiour :heroName="heroName" :hero-description="heroDescription" :heroImage="heroImage" :buttons="buttons"/>
  <div v-if="projects" class="main-container mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    <div v-for="project in projects" class="min-w-80">
      <div class="relative group">
        <div class="w-full h-60 cursor-pointer">
          <NuxtLink :to="`/interior/${project.id}`">
            <nuxt-img :src="project.first_image.image" :alt="project.name"
                      class="w-full h-full transition-all duration-500 ease-in-out group-hover:brightness-50 object-cover"/>
            <div
                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
              <div class="text-center">
                <h2 class="text-white">{{ project.collection.name }}</h2>
                <p class="text-white">{{ project.name }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="pb-4">
        <div v-for="tag in project.tags" class="inline-block">
          <NuxtLink :to="{ path: '/search-tags', query: { tags: tag.id } }">
            <p class="underline-direction inline">#{{ tag.name }}&nbsp;</p><span>&nbsp;&nbsp;</span>
          </NuxtLink>
        </div>

      </div>
    </div>
  </div>
  <pagination class="pb-32 flex justify-center" :total="interiorStore.total"
              :page_size="interiorStore.page_size"
              :pagesCount="interiorStore.pagesCount"
              @page-change="onChangePage"
              v-model:current-page="currentPage"/>
</template>


<style scoped>

</style>