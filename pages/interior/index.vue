<script setup lang="js">
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useInteriorStore } from '~/stores/interiorStore'
import Pagination from '~/components/base/pagination/Pagination.vue'

const interiorStore = useInteriorStore()
const { projects } = storeToRefs(interiorStore)

const route = useRoute()

const interiorsBlock = ref(null)
function scrollToInteriorsBlock() {
  interiorsBlock.value.scrollIntoView({ behavior: 'smooth' })
}

definePageMeta({ layout: 'dark-header' })
// const currentPage = ref(route.query.page ? parseInt(route.query.page as string) : 1);
const currentPage = ref(route.query.page ? Number.parseInt(route.query.page) : 1)

await interiorStore.getProjects(currentPage.value)
// watch(() => route.query.page, (newPage) => {
//   // currentPage.value = parseInt(newPage as string); // Update currentPage value
//   currentPage.value = parseInt(newPage); // Update currentPage value
//   interiorStore.getProjects(currentPage.value);
// });

function onChangePage(page) {
  // router.push({query: {page: page.toString()}}); // Ensure page is a string
  interiorStore.getProjects(page)
  scrollToInteriorsBlock()
}
</script>

<template>
  <div class="main-container">
    <div class="mt-10 lg:pr-72">
      <div class=" flex justify-start items-end">
        <h4>Главная / Проекты</h4>
      </div>
    </div>
    <div ref="interiorsBlock" class="flex justify-center mt-12">
      <h1>Проекты</h1>
    </div>
    <!--  <hero-interiour :heroName="heroName" :hero-description="heroDescription" :heroImage="heroImage" :buttons="buttons"/> -->
    <div
      v-if="projects"
      class=" pb-0 md:pb-16 mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8"
    >
      <div v-for="project in projects" :key="project.id" class="min-w-80">
        <div class="relative group">
          <div class="w-full h-60 cursor-pointer">
            <NuxtLink :to="`/interior/${project.id}`">
              <nuxt-img
                placeholder :src="project.first_image.image" :alt="project.name"
                class="w-full h-full transition-all duration-500 ease-in-out  brightness-75  lg:brightness-100 lg:group-hover:brightness-50 object-cover"
              />
              <div
                class="absolute inset-0 flex items-center justify-center lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
              >
                <div class="text-center">
                  <h2 v-if="project.collection" class="text-white">
                    {{ project.collection.name }}
                  </h2>
                  <p class="text-white">
                    {{ project.name }}
                  </p>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
        <div class="pb-4 pt-4">
          <div v-for="tag in project.tags" :key="tag.id" class="inline-block ">
            <NuxtLink :to="{ path: '/search-tags', query: { tags: tag.id } }">
              <p class="text-lg inline">
                #{{ tag.name }}&nbsp;
              </p><span>&nbsp;&nbsp;</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <Pagination
      v-model:current-page="currentPage" class="pb-32 flex justify-center"
      :total="interiorStore.total"
      :page_size="interiorStore.page_size"
      :pages-count="interiorStore.pagesCount"
      @page-change="onChangePage"
    />
  </div>
</template>

<style scoped>

</style>
